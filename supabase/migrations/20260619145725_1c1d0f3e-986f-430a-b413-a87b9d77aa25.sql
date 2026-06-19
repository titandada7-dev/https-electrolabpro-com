
-- Tighten email queue SECURITY DEFINER helpers (backend-only)
REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb)        FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint)        FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)            TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint)            TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;

-- Make audit-log policies explicitly reject anonymous (NULL auth.uid)
DROP POLICY IF EXISTS "Users can view their own audit entries" ON public.auth_audit_log;
DROP POLICY IF EXISTS "Admins can view all audit entries"      ON public.auth_audit_log;

CREATE POLICY "Users can view their own audit entries"
  ON public.auth_audit_log
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IS NOT NULL
    AND auth.uid() = user_id
    AND COALESCE(((auth.jwt() ->> 'is_anonymous'))::boolean, false) = false
  );

CREATE POLICY "Admins can view all audit entries"
  ON public.auth_audit_log
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IS NOT NULL
    AND COALESCE(((auth.jwt() ->> 'is_anonymous'))::boolean, false) = false
    AND public.has_role(auth.uid(), 'admin')
  );
