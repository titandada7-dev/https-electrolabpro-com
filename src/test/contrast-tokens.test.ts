import { describe, it, expect, afterAll } from "vitest";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Chequeo automatizado de accesibilidad — contraste WCAG AA sobre los
 * tokens semánticos de Tailwind (`--foreground`, `--muted-foreground`,
 * `--primary-foreground`, etc.) definidos en src/index.css.
 *
 * Ampliado para cubrir estados interactivos:
 *   - hover     → primary/90 sobre background
 *   - focus     → ring sobre background (contraste no-text ≥ 3:1)
 *   - disabled  → foreground al 50% sobre background
 *   - más superficies: destructive, popover, sidebar, border
 *
 * Emite un reporte JSON+HTML en `reports/a11y/` para consumo por CI.
 *
 * Umbrales (WCAG 2.1):
 *   - Texto normal ...... 4.5 : 1
 *   - Texto grande / UI . 3.0 : 1
 */

// ---------------- HSL → RGB → luminance → contrast ratio --------------------
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function relLuminance([r, g, b]: [number, number, number]): number {
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function parseHsl(v: string): [number, number, number] {
  const [h, s, l] = v.trim().split(/\s+/).map((x) => parseFloat(x));
  return hslToRgb(h, s, l);
}

/** Alpha blend `fg` over `bg` and return the resulting RGB. */
function blend(
  fg: [number, number, number],
  bg: [number, number, number],
  alpha: number,
): [number, number, number] {
  return [
    Math.round(fg[0] * alpha + bg[0] * (1 - alpha)),
    Math.round(fg[1] * alpha + bg[1] * (1 - alpha)),
    Math.round(fg[2] * alpha + bg[2] * (1 - alpha)),
  ];
}

function contrastRgb(
  a: [number, number, number],
  b: [number, number, number],
): number {
  const la = relLuminance(a);
  const lb = relLuminance(b);
  const [lo, hi] = la > lb ? [lb, la] : [la, lb];
  return (hi + 0.05) / (lo + 0.05);
}

function contrast(a: string, b: string, alpha = 1): number {
  const fg = parseHsl(a);
  const bg = parseHsl(b);
  const effective = alpha < 1 ? blend(fg, bg, alpha) : fg;
  return contrastRgb(effective, bg);
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
}

// ---------------- Extract tokens from src/index.css -------------------------
function readTokens(block: ":root" | ".dark"): Record<string, string> {
  const css = readFileSync(path.resolve(process.cwd(), "src/index.css"), "utf-8");
  const rx = new RegExp(`${block.replace(".", "\\.")}\\s*\\{([\\s\\S]*?)\\}`);
  const m = css.match(rx);
  if (!m) throw new Error(`No se pudo leer el bloque ${block} de src/index.css`);
  const out: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/(--[a-z0-9-]+)\s*:\s*([^;]+);/i);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0; // Aplica también a componentes UI (WCAG 1.4.11)

interface Pair {
  fg: string;
  bg: string;
  min: number;
  label: string;
  alpha?: number;
  state?: "default" | "hover" | "focus" | "disabled";
}

const pairs: Pair[] = [
  // ------ Texto base ------
  { fg: "--foreground", bg: "--background", min: AA_NORMAL, label: "texto principal", state: "default" },
  { fg: "--muted-foreground", bg: "--background", min: AA_NORMAL, label: "texto atenuado", state: "default" },
  { fg: "--muted-foreground", bg: "--muted", min: AA_NORMAL, label: "texto atenuado sobre muted", state: "default" },
  { fg: "--card-foreground", bg: "--card", min: AA_NORMAL, label: "texto en tarjeta", state: "default" },
  { fg: "--popover-foreground", bg: "--popover", min: AA_NORMAL, label: "texto en popover", state: "default" },

  // ------ Botones (default) ------
  { fg: "--primary-foreground", bg: "--primary", min: AA_LARGE, label: "botón primario", state: "default" },
  { fg: "--secondary-foreground", bg: "--secondary", min: AA_NORMAL, label: "botón secundario", state: "default" },
  { fg: "--accent-foreground", bg: "--accent", min: AA_NORMAL, label: "acento", state: "default" },
  { fg: "--destructive-foreground", bg: "--destructive", min: AA_LARGE, label: "botón destructive", state: "default" },

  // ------ Hover (shadcn usa /90 sobre el fondo del botón; texto se mantiene) ------
  // El texto sigue siendo *-foreground contra el color base — nuestra medición no cambia
  // pero validamos también contra el color mezclado al 90% para simular el hover.
  { fg: "--primary-foreground", bg: "--primary", alpha: 0.9, min: AA_LARGE, label: "botón primario hover", state: "hover" },
  { fg: "--destructive-foreground", bg: "--destructive", alpha: 0.9, min: AA_LARGE, label: "botón destructive hover", state: "hover" },
  { fg: "--accent-foreground", bg: "--accent", alpha: 0.9, min: AA_NORMAL, label: "acento hover", state: "hover" },

  // ------ Focus ring (contorno UI, requisito 1.4.11 → 3:1) ------
  { fg: "--ring", bg: "--background", min: AA_LARGE, label: "focus ring sobre fondo", state: "focus" },
  { fg: "--ring", bg: "--card", min: AA_LARGE, label: "focus ring sobre tarjeta", state: "focus" },

  // ------ Disabled (texto al 50% de opacidad) ------
  { fg: "--foreground", bg: "--background", alpha: 0.5, min: AA_LARGE, label: "texto deshabilitado", state: "disabled" },
  { fg: "--primary-foreground", bg: "--primary", alpha: 0.5, min: AA_LARGE, label: "primario deshabilitado", state: "disabled" },

  // ------ Sidebar (superficie usada por shadcn Sidebar) ------
  { fg: "--sidebar-foreground", bg: "--sidebar-background", min: AA_NORMAL, label: "texto sidebar", state: "default" },
  { fg: "--sidebar-primary-foreground", bg: "--sidebar-primary", min: AA_LARGE, label: "botón primario sidebar", state: "default" },
  { fg: "--sidebar-accent-foreground", bg: "--sidebar-accent", min: AA_NORMAL, label: "acento sidebar", state: "default" },
];

interface ReportRow {
  mode: "light" | "dark";
  state: string;
  label: string;
  fg: string;
  bg: string;
  alpha: number;
  fgHex: string;
  bgHex: string;
  ratio: number;
  min: number;
  pass: boolean;
}

const rows: ReportRow[] = [];

describe("Contraste WCAG AA — tokens semánticos (con estados)", () => {
  for (const cssMode of [":root", ".dark"] as const) {
    const modeName = cssMode === ":root" ? "light" : "dark";
    describe(`modo ${modeName === "light" ? "claro" : "oscuro"}`, () => {
      const tokens = readTokens(cssMode);
      for (const p of pairs) {
        const suffix = p.state && p.state !== "default" ? ` [${p.state}]` : "";
        it(`${p.label}${suffix} (${p.fg} / ${p.bg}) ≥ ${p.min}:1`, () => {
          const fg = tokens[p.fg];
          const bg = tokens[p.bg];
          expect(fg, `Falta ${p.fg} en ${cssMode}`).toBeDefined();
          expect(bg, `Falta ${p.bg} en ${cssMode}`).toBeDefined();
          const alpha = p.alpha ?? 1;
          const ratio = contrast(fg, bg, alpha);
          const fgRgb = parseHsl(fg);
          const bgRgb = parseHsl(bg);
          const effectiveFg =
            alpha < 1 ? blend(fgRgb, bgRgb, alpha) : fgRgb;
          rows.push({
            mode: modeName,
            state: p.state ?? "default",
            label: p.label,
            fg: p.fg,
            bg: p.bg,
            alpha,
            fgHex: rgbToHex(effectiveFg),
            bgHex: rgbToHex(bgRgb),
            ratio: Number(ratio.toFixed(2)),
            min: p.min,
            pass: ratio >= p.min,
          });
          expect(
            ratio,
            `${p.label}${suffix} en ${modeName}: ratio ${ratio.toFixed(2)}:1 (mínimo ${p.min}:1)`,
          ).toBeGreaterThanOrEqual(p.min);
        });
      }
    });
  }

  afterAll(() => {
    // Emite reporte a reports/a11y/{json,html} (usado como artifact en CI).
    const outDir = path.resolve(process.cwd(), "reports/a11y");
    mkdirSync(outDir, { recursive: true });
    const summary = {
      generatedAt: new Date().toISOString(),
      total: rows.length,
      failed: rows.filter((r) => !r.pass).length,
      rows,
    };
    writeFileSync(
      path.join(outDir, "contrast-report.json"),
      JSON.stringify(summary, null, 2),
    );
    writeFileSync(path.join(outDir, "contrast-report.html"), renderHtml(summary));
  });
});

function renderHtml(s: { generatedAt: string; total: number; failed: number; rows: ReportRow[] }): string {
  const rowHtml = s.rows
    .map(
      (r) => `<tr class="${r.pass ? "pass" : "fail"}">
      <td>${r.mode}</td>
      <td>${r.state}</td>
      <td>${escape(r.label)}</td>
      <td><code>${r.fg}</code> / <code>${r.bg}</code></td>
      <td>${r.alpha}</td>
      <td><span class="swatch" style="background:${r.fgHex};color:${r.bgHex}">Aa</span> <code>${r.fgHex}</code></td>
      <td><span class="swatch" style="background:${r.bgHex};color:${r.fgHex}">Aa</span> <code>${r.bgHex}</code></td>
      <td><strong>${r.ratio}:1</strong></td>
      <td>${r.min}:1</td>
      <td>${r.pass ? "✅" : "❌"}</td>
    </tr>`,
    )
    .join("\n");
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
<title>Reporte de contraste — ElectroLab Pro</title>
<style>
body{font:14px/1.5 system-ui,sans-serif;margin:24px;color:#0f172a;background:#f8fafc}
h1{margin:0 0 4px}p{color:#475569;margin:0 0 16px}
table{border-collapse:collapse;width:100%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.05);border-radius:8px;overflow:hidden}
th,td{padding:8px 10px;text-align:left;border-bottom:1px solid #e2e8f0;font-size:13px;vertical-align:middle}
th{background:#f1f5f9;font-weight:600}
tr.fail{background:#fef2f2}tr.pass:hover{background:#f8fafc}
code{background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:12px}
.swatch{display:inline-block;width:32px;text-align:center;border-radius:4px;border:1px solid rgba(0,0,0,.1);font-weight:600;font-size:12px;padding:2px 0}
.stats{display:flex;gap:16px;margin:16px 0}
.stat{background:#fff;padding:12px 16px;border-radius:8px;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.stat b{font-size:22px;display:block}
</style></head><body>
<h1>Reporte de contraste WCAG AA</h1>
<p>Generado ${s.generatedAt} · tokens de <code>src/index.css</code></p>
<div class="stats">
  <div class="stat"><b>${s.total}</b>pares evaluados</div>
  <div class="stat" style="color:${s.failed ? "#b91c1c" : "#15803d"}"><b>${s.failed}</b>fallos</div>
</div>
<table><thead><tr>
<th>Modo</th><th>Estado</th><th>Par</th><th>Tokens</th><th>α</th><th>FG</th><th>BG</th><th>Ratio</th><th>Mínimo</th><th>WCAG</th>
</tr></thead><tbody>${rowHtml}</tbody></table>
</body></html>`;
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
