// Automated security check: verifies that email queue tables and
// trigger-only SECURITY DEFINER functions are NOT reachable from anon
// or authenticated roles. Exits non-zero on any regression.
//
// Uses the same PG* env vars psql picks up. Run locally or in CI:
//   node scripts/security-check-email-rls.mjs

import { execFileSync } from "node:child_process";

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

function psql(sql) {
  const out = execFileSync(
    "psql",
    ["-At", "-F", "\t", "-v", "ON_ERROR_STOP=1", "-c", sql],
    { encoding: "utf8" },
  );
  return out
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("\t"));
}

function sqlList(items) {
  return items.map((i) => `'${i.replace(/'/g, "''")}'`).join(",");
}

const failures = [];
const tables = sqlList(EMAIL_TABLES);
const fns = sqlList(TRIGGER_ONLY_FUNCTIONS);

// 1. RLS enabled on every email queue table.
const rls = psql(
  `SELECT tablename, rowsecurity::text FROM pg_tables
   WHERE schemaname='public' AND tablename IN (${tables})`,
);
const rlsMap = new Map(rls.map(([t, r]) => [t, r === "t" || r === "true"]));
for (const t of EMAIL_TABLES) {
  if (!rlsMap.has(t)) failures.push(`missing table public.${t}`);
  else if (!rlsMap.get(t)) failures.push(`RLS disabled on public.${t}`);
}

// 2. Policies must not target anon/authenticated/public.
const policies = psql(
  `SELECT tablename, policyname, array_to_string(roles, ',') FROM pg_policies
   WHERE schemaname='public' AND tablename IN (${tables})`,
);
for (const [table, policyname, rolesStr] of policies) {
  const bad = rolesStr
    .split(",")
    .filter((r) => ["anon", "authenticated", "public", "PUBLIC"].includes(r));
  if (bad.length)
    failures.push(
      `policy ${table}.${policyname} exposes roles: ${bad.join(",")}`,
    );
}

// 3. Direct table grants to anon/authenticated/PUBLIC are forbidden.
const grants = psql(
  `SELECT table_name, grantee, privilege_type
   FROM information_schema.role_table_grants
   WHERE table_schema='public' AND table_name IN (${tables})
     AND grantee IN ('anon','authenticated','PUBLIC')`,
);
for (const [table, grantee, priv] of grants) {
  failures.push(`table public.${table} granted ${priv} to ${grantee}`);
}

// 4. Trigger-only functions: no EXECUTE for anon/authenticated/PUBLIC.
const fnRows = psql(
  `SELECT p.proname,
          has_function_privilege('anon', p.oid, 'EXECUTE')::text,
          has_function_privilege('authenticated', p.oid, 'EXECUTE')::text,
          has_function_privilege('public', p.oid, 'EXECUTE')::text
   FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname='public' AND p.proname IN (${fns})`,
);
for (const [name, anonX, authX, pubX] of fnRows) {
  if (anonX === "t") failures.push(`function ${name} executable by anon`);
  if (authX === "t")
    failures.push(`function ${name} executable by authenticated`);
  if (pubX === "t") failures.push(`function ${name} executable by PUBLIC`);
}

if (failures.length) {
  console.error("❌ Email queue security check FAILED:");
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}

console.log(
  `✅ Email queue security check passed (${EMAIL_TABLES.length} tables, ${TRIGGER_ONLY_FUNCTIONS.length} functions).`,
);
