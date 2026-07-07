# Supabase Function & RLS Security Checklist

Last verified: 2026-07-07 — `security--run_security_scan` confirms
`SUPA_anon_security_definer_function_executable` is fixed.

## SECURITY DEFINER function access matrix (schema `public`)

| Function | anon | authenticated | service_role | Purpose |
|---|---|---|---|---|
| `has_role(uuid, app_role)` | ❌ | ✅ | ✅ | Called by RLS policies from signed-in users. |
| `has_active_subscription(uuid, text)` | ❌ | ✅ | ✅ | Read-only helper used from client to gate premium UI. |
| `log_auth_event(text, jsonb, text, text)` | ❌ | ✅ | ✅ | Requires `auth.uid()`; raises if unauthenticated. |
| `enqueue_email(text, jsonb)` | ❌ | ❌ | ✅ | Server-side email enqueue. Called from Edge Functions only. |
| `read_email_batch(text, int, int)` | ❌ | ❌ | ✅ | Queue read — `process-email-queue` only. |
| `delete_email(text, bigint)` | ❌ | ❌ | ✅ | Queue delete — `process-email-queue` only. |
| `move_to_dlq(text, text, bigint, jsonb)` | ❌ | ❌ | ✅ | DLQ handoff — `process-email-queue` only. |
| `email_queue_dispatch()` | ❌ | ❌ | ✅ | **Trigger-only** — invoked by `pg_cron`. |
| `email_queue_wake()` | ❌ | ❌ | ✅ | **Trigger-only** — attached to `pgmq.q_*` INSERT triggers. |
| `enforce_premium_subscriber_email()` | ❌ | ❌ | ✅ | **Trigger-only** — BEFORE INSERT on `premium_content_subscribers`. |
| `audit_user_roles_change()` | ❌ | ❌ | ✅ | **Trigger-only** — AFTER on `user_roles`. |

Rules of thumb:

- `service_role` always keeps `EXECUTE`. It runs from Edge Functions and
  cron jobs, never from the browser.
- Grant `authenticated` only when the function is safe to expose to any
  signed-in user AND scopes writes with `auth.uid()`.
- Never grant `anon`, `PUBLIC`, or add functions to `public` if they
  don't need the Data API. Trigger and cron helpers must be revoked from
  `PUBLIC`.

## Email queue tables — RLS

All four tables have RLS **enabled** and every policy is scoped to
`service_role`. No `anon` or `authenticated` access.

| Table | anon | authenticated | service_role |
|---|---|---|---|
| `email_send_log` | ❌ | ❌ | SELECT / INSERT / UPDATE |
| `email_send_state` | ❌ | ❌ | ALL |
| `email_unsubscribe_tokens` | ❌ | ❌ | SELECT / INSERT / UPDATE |
| `suppressed_emails` | ❌ | ❌ | SELECT / INSERT |

## Automated verification

Run:

```bash
node scripts/security-check-email-rls.mjs
```

The script fails (non-zero exit) if any email queue table becomes
readable/writable from `anon` or `authenticated`, or if any trigger-only
function gains `EXECUTE` for `anon`/`authenticated`/`PUBLIC`.
