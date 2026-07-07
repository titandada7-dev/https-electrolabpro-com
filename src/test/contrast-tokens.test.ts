import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Chequeo automatizado de accesibilidad — contraste WCAG AA sobre los
 * tokens semánticos de Tailwind (`--foreground`, `--muted-foreground`,
 * `--primary-foreground`, etc.) definidos en src/index.css.
 *
 * Motivación: el hallazgo `lighthouse:lighthouse_accessibility` puede
 * regresar si alguien baja los valores de luminosidad de los tokens.
 * Esta prueba corre en CI (bun run test) y bloquea el merge si un par
 * texto/fondo baja de la ratio requerida por WCAG 2.1.
 *
 * Umbrales:
 *   - Texto normal ...... 4.5 : 1
 *   - Texto grande ...... 3.0 : 1
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

function contrast(a: string, b: string): number {
  const parse = (v: string): [number, number, number] => {
    const [h, s, l] = v.trim().split(/\s+/).map((x) => parseFloat(x));
    return hslToRgb(h, s, l);
  };
  const la = relLuminance(parse(a));
  const lb = relLuminance(parse(b));
  const [lo, hi] = la > lb ? [lb, la] : [la, lb];
  return (hi + 0.05) / (lo + 0.05);
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
const AA_LARGE = 3.0;

const pairs = [
  { fg: "--foreground", bg: "--background", min: AA_NORMAL, label: "texto principal" },
  { fg: "--muted-foreground", bg: "--background", min: AA_NORMAL, label: "texto atenuado" },
  { fg: "--muted-foreground", bg: "--muted", min: AA_NORMAL, label: "texto atenuado sobre muted" },
  { fg: "--card-foreground", bg: "--card", min: AA_NORMAL, label: "texto en tarjeta" },
  { fg: "--primary-foreground", bg: "--primary", min: AA_LARGE, label: "botón primario" },
  { fg: "--secondary-foreground", bg: "--secondary", min: AA_NORMAL, label: "botón secundario" },
  { fg: "--accent-foreground", bg: "--accent", min: AA_NORMAL, label: "acento" },
];

describe("Contraste WCAG AA — tokens semánticos", () => {
  for (const mode of [":root", ".dark"] as const) {
    describe(`modo ${mode === ":root" ? "claro" : "oscuro"}`, () => {
      const tokens = readTokens(mode);
      for (const p of pairs) {
        it(`${p.label} (${p.fg} / ${p.bg}) ≥ ${p.min}:1`, () => {
          const fg = tokens[p.fg];
          const bg = tokens[p.bg];
          expect(fg, `Falta ${p.fg} en ${mode}`).toBeDefined();
          expect(bg, `Falta ${p.bg} en ${mode}`).toBeDefined();
          const ratio = contrast(fg, bg);
          expect(
            ratio,
            `${p.label} en ${mode}: ratio ${ratio.toFixed(2)}:1 (mínimo ${p.min}:1)`,
          ).toBeGreaterThanOrEqual(p.min);
        });
      }
    });
  }
});
