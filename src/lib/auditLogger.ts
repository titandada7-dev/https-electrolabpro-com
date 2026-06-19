// Client-side audit logger.
// Records authentication and sensitive-access events into public.auth_audit_log
// via the SECURITY DEFINER RPC `log_auth_event`. Server stamps user_id from
// auth.uid(), so callers cannot impersonate other users.
import { supabase } from "@/integrations/supabase/client";

export type AuditEvent =
  | "auth.signin"
  | "auth.signout"
  | "auth.token_refreshed"
  | "auth.user_updated"
  | "auth.password_recovery"
  | "auth.initial_session"
  | "access.admin_view"
  | "access.sensitive_read"
  | "access.sensitive_write";

export async function logAuthEvent(
  eventType: AuditEvent | string,
  metadata: Record<string, unknown> = {},
  targetTable?: string,
  targetId?: string,
): Promise<void> {
  try {
    // Fire-and-forget; never throw into the UI.
    // @ts-expect-error rpc function name is generated after types regenerate
    await supabase.rpc("log_auth_event", {
      _event_type: eventType,
      _metadata: metadata,
      _target_table: targetTable ?? null,
      _target_id: targetId ?? null,
    });
  } catch {
    // Silent: auditing must not break the app.
  }
}

let installed = false;
/**
 * Install a single global listener that logs every Supabase auth state change.
 * Safe to call multiple times (idempotent).
 */
export function installAuthAuditListener(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;
  supabase.auth.onAuthStateChange((event, session) => {
    const map: Record<string, AuditEvent> = {
      SIGNED_IN: "auth.signin",
      SIGNED_OUT: "auth.signout",
      TOKEN_REFRESHED: "auth.token_refreshed",
      USER_UPDATED: "auth.user_updated",
      PASSWORD_RECOVERY: "auth.password_recovery",
      INITIAL_SESSION: "auth.initial_session",
    };
    const mapped = map[event];
    if (!mapped) return;
    // Don't spam audit log with INITIAL_SESSION when there is no session.
    if (mapped === "auth.initial_session" && !session) return;
    void logAuthEvent(mapped, {
      provider: session?.user?.app_metadata?.provider ?? null,
      email_domain: session?.user?.email?.split("@")[1] ?? null,
      ua: navigator.userAgent.slice(0, 200),
    });
  });
}
