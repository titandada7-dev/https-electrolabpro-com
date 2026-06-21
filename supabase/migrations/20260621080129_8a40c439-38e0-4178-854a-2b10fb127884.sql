-- Make log_auth_event SECURITY DEFINER so authenticated users can log via the RPC
-- without needing direct INSERT on auth_audit_log.
CREATE OR REPLACE FUNCTION public.log_auth_event(_event_type text, _metadata jsonb DEFAULT '{}'::jsonb, _target_table text DEFAULT NULL::text, _target_id text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

-- Drop the overly permissive INSERT policy that lets authenticated users
-- fabricate arbitrary audit entries.
DROP POLICY IF EXISTS "Users insert own audit rows" ON public.auth_audit_log;

-- Ensure the function can be executed by authenticated users via PostgREST RPC.
GRANT EXECUTE ON FUNCTION public.log_auth_event(text, jsonb, text, text) TO authenticated;