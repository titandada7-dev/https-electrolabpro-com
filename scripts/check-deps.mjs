#!/usr/bin/env node
/**
 * Pre-build dependency check.
 * Detects imports used in source code that are missing from package.json.
 * Run with: node scripts/check-deps.mjs
 *
 * Note: This is a lightweight static check (no extra deps required).
 * For deeper analysis you can also run: npx depcheck --skip-missing=false
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const PKG = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const declared = new Set([
  ...Object.keys(PKG.dependencies || {}),
  ...Object.keys(PKG.devDependencies || {}),
  ...Object.keys(PKG.peerDependencies || {}),
  ...Object.keys(PKG.optionalDependencies || {}),
]);

// Built-in modules and project aliases we should ignore
const BUILTIN = new Set([
  "react", "react-dom", // always present
]);
const ALIAS_PREFIXES = ["@/", "./", "../", "node:"];

const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const importRe = /(?:import\s[^'"]*?from\s+|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]/g;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, files);
    else if (exts.has(extname(full))) files.push(full);
  }
  return files;
}

function pkgNameFromImport(spec) {
  if (ALIAS_PREFIXES.some((p) => spec.startsWith(p))) return null;
  // scoped package: @scope/name
  if (spec.startsWith("@")) {
    const parts = spec.split("/");
    return parts.slice(0, 2).join("/");
  }
  return spec.split("/")[0];
}

const missing = new Map(); // pkg -> Set<file>
const files = walk(SRC);

for (const file of files) {
  const code = readFileSync(file, "utf8");
  let m;
  while ((m = importRe.exec(code))) {
    const pkg = pkgNameFromImport(m[1]);
    if (!pkg || BUILTIN.has(pkg) || declared.has(pkg)) continue;
    if (!missing.has(pkg)) missing.set(pkg, new Set());
    missing.get(pkg).add(file.replace(ROOT + "/", ""));
  }
}

if (missing.size === 0) {
  console.log(`✅ check-deps: all imports across ${files.length} source files are declared in package.json`);
  process.exit(0);
}

console.error("❌ check-deps: missing dependencies detected\n");
for (const [pkg, set] of missing) {
  console.error(`  • ${pkg}`);
  for (const f of set) console.error(`      └─ ${f}`);
}
console.error("\nFix: install with `npm i <pkg>` (or use the add_dependency tool).");
process.exit(1);
