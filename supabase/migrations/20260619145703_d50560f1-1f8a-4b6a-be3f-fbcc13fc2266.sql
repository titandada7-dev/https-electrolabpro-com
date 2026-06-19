
-- 1. Explicit policy on contact_submissions (resolves "RLS enabled, no policy")
CREATE POLICY "Service role manages contact submissions"
  ON public.contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.contact_submissions IS
  'Contact form submissions. Insert/select restricted to service_role (via send-contact edge function). No client access.';

-- 2. Auth + access audit log
CREATE TABLE public.auth_audit_log (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type    text NOT NULL,
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role    text,
  target_table  text,
  target_id     text,
  ip            text,
  user_agent    text,
  metadata      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX auth_audit_log_user_id_idx     ON public.auth_audit_log(user_id);
CREATE INDEX auth_audit_log_event_type_idx  ON public.auth_audit_log(event_type);
CREATE INDEX auth_audit_log_created_at_idx  ON public.auth_audit_log(created_at DESC);

GRANT SELECT ON public.auth_audit_log TO authenticated;
GRANT ALL    ON public.auth_audit_log TO service_role;

ALTER TABLE public.auth_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own audit entries"
  ON public.auth_audit_log
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit entries"
  ON public.auth_audit_log
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages audit log"
  ON public.auth_audit_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. Safe RPC for clients to write their own audit events
CREATE OR REPLACE FUNCTION public.log_auth_event(
  _event_type   text,
  _metadata     jsonb DEFAULT '{}'::jsonb,
  _target_table text DEFAULT NULL,
  _target_id    text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _id uuid;
  _uid uuid := auth.uid();
  _role text := COALESCE(current_setting('request.jwt.claim.role', true), 'anon');
BEGIN
  IF _event_type IS NULL OR length(_event_type) = 0 OR length(_event_type) > 80 THEN
    RAISE EXCEPTION 'invalid event_type';
  END IF;

  INSERT INTO public.auth_audit_log (event_type, user_id, actor_role, target_table, target_id, metadata)
  VALUES (_event_type, _uid, _role, _target_table, _target_id, COALESCE(_metadata, '{}'::jsonb))
  RETURNING id INTO _id;

  RETURN _id;
END;
$$;

REVOKE ALL ON FUNCTION public.log_auth_event(text, jsonb, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_auth_event(text, jsonb, text, text) TO anon, authenticated, service_role;

-- 4. Audit trigger on sensitive table user_roles
CREATE OR REPLACE FUNCTION public.audit_user_roles_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.auth_audit_log (event_type, user_id, actor_role, target_table, target_id, metadata)
  VALUES (
    'user_roles.' || lower(TG_OP),
    auth.uid(),
    COALESCE(current_setting('request.jwt.claim.role', true), 'system'),
    'user_roles',
    COALESCE((NEW).id::text, (OLD).id::text),
    jsonb_build_object(
      'old', CASE WHEN TG_OP <> 'INSERT' THEN row_to_json(OLD) END,
      'new', CASE WHEN TG_OP <> 'DELETE' THEN row_to_json(NEW) END
    )
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS audit_user_roles_change ON public.user_roles;
CREATE TRIGGER audit_user_roles_change
AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.audit_user_roles_change();
