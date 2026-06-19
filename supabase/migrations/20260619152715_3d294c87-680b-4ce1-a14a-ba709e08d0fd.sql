
-- Switch log_auth_event to SECURITY INVOKER and let authenticated users insert their own audit rows.
REVOKE EXECUTE ON FUNCTION public.log_auth_event(text, jsonb, text, text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.log_auth_event(
  _event_type text,
  _metadata jsonb DEFAULT '{}'::jsonb,
  _target_table text DEFAULT NULL,
  _target_id text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
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
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'authentication required';
  END IF;
  INSERT INTO public.auth_audit_log (event_type, user_id, actor_role, target_table, target_id, metadata)
  VALUES (_event_type, _uid, _role, _target_table, _target_id, COALESCE(_metadata, '{}'::jsonb))
  RETURNING id INTO _id;
  RETURN _id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.log_auth_event(text, jsonb, text, text) TO authenticated;

-- Allow authenticated users to insert their own audit rows (required now that the function runs as INVOKER).
DROP POLICY IF EXISTS "Users insert own audit rows" ON public.auth_audit_log;
CREATE POLICY "Users insert own audit rows"
ON public.auth_audit_log
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());
