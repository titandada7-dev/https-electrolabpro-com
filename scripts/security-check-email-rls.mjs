// Automated security check: verifies that email queue tables and
// trigger-only SECURITY DEFINER functions are NOT reachable from anon
// or authenticated roles. Exits non-zero on any regression.
//
// Uses the same PG* env vars psql picks up. Run locally or in CI:
//   node scripts/security-check-email-rls.mjs

import pg from "pg";

const EMAIL_TABLES = [
  "email_send_log",
  "email_send_state",
  "email_unsubscribe_tokens",
  "suppressed_emails",
];

// Functions that must remain trigger/cron/service-role only.
const TRIGGER_ONLY_FUNCTIONS = [
  "email_queue_dispatch",
  "email_queue_wake",
  "enqueue_email",
  "read_email_batch",
  "delete_email",
  "move_to_dlq",
  "enforce_premium_subscriber_email",
  "audit_user_roles_change",
];

const client = new pg.Client();
await client.connect();

const failures = [];

// 1. RLS enabled on every email queue table.
const rls = await client.query(
  `SELECT tablename, rowsecurity FROM pg_tables
   WHERE schemaname='public' AND tablename = ANY($1)`,
  [EMAIL_TABLES],
);
for (const t of EMAIL_TABLES) {
  const row = rls.rows.find((r) => r.tablename === t);
  if (!row) failures.push(`missing table public.${t}`);
  else if (!row.rowsecurity) failures.push(`RLS disabled on public.${t}`);
}

// 2. No policy on email tables targets anon/authenticated/public.
const policies = await client.query(
  `SELECT tablename, policyname, roles FROM pg_policies
   WHERE schemaname='public' AND tablename = ANY($1)`,
  [EMAIL_TABLES],
);
for (const p of policies.rows) {
  const bad = p.roles.filter((r) =>
    ["anon", "authenticated", "public", "PUBLIC"].includes(r),
  );
  if (bad.length) {
    failures.push(
      `policy ${p.tablename}.${p.policyname} exposes roles: ${bad.join(",")}`,
    );
  }
}

// 3. Direct table grants must not include anon/authenticated.
const grants = await client.query(
  `SELECT table_name, grantee, privilege_type
   FROM information_schema.role_table_grants
   WHERE table_schema='public' AND table_name = ANY($1)
     AND grantee IN ('anon','authenticated','PUBLIC')`,
  [EMAIL_TABLES],
);
for (const g of grants.rows) {
  failures.push(
    `table public.${g.table_name} granted ${g.privilege_type} to ${g.grantee}`,
  );
}

// 4. Trigger-only functions: revoke EXECUTE from anon/authenticated/PUBLIC.
const fns = await client.query(
  `SELECT p.proname,
          has_function_privilege('anon', p.oid, 'EXECUTE')          AS anon_x,
          has_function_privilege('authenticated', p.oid, 'EXECUTE') AS auth_x,
          has_function_privilege('public', p.oid, 'EXECUTE')        AS pub_x
   FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname='public' AND p.proname = ANY($1)`,
  [TRIGGER_ONLY_FUNCTIONS],
);
for (const fn of fns.rows) {
  if (fn.anon_x) failures.push(`function ${fn.proname} executable by anon`);
  if (fn.auth_x)
    failures.push(`function ${fn.proname} executable by authenticated`);
  if (fn.pub_x) failures.push(`function ${fn.proname} executable by PUBLIC`);
}

await client.end();

if (failures.length) {
  console.error("❌ Email queue security check FAILED:");
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}

console.log(
  `✅ Email queue security check passed (${EMAIL_TABLES.length} tables, ${TRIGGER_ONLY_FUNCTIONS.length} functions).`,
);
