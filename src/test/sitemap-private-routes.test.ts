import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * CI guard: garantiza que ninguna ruta privada, transaccional o que
 * requiera sesión aparezca en public/sitemap.xml, y que las secciones
 * 100 % públicas (calculadoras, artículos, legales) sí estén presentes.
 *
 * Fuente de verdad de rutas privadas: scripts/generate-sitemap.mjs
 * (constante `PRIVATE_ROUTES`).
 */

const PRIVATE_ROUTES = [
  "/auth",
  "/account",
  "/premium/biblioteca",
  "/unsubscribe",
  "/politica-reembolsos",
  "/paleta",
];

// Muestras de rutas 100 % públicas que SIEMPRE deben aparecer.
const PUBLIC_MUST_INCLUDE = [
  // Calculadoras interactivas
  "/ley-de-ohm",
  "/calculadora-led",
  "/calculadora-resistencias",
  "/divisor-de-voltaje",
  "/filtro-rc",
  "/temporizador-555",
  "/decodificador-smd",
  "/reactancia-capacitiva",
  "/conversor-unidades",
  // Artículos teóricos pre-renderizados (muestra)
  "/articulos/ley-de-ohm",
  "/articulos/codigo-colores-resistencias",
  "/articulos/arduino",
  // Autoridad y legales
  "/sobre-nosotros",
  "/contacto",
  "/privacidad",
  "/aviso-legal",
  "/terminos-y-condiciones",
];

describe("sitemap.xml — public-only guarantee", () => {
  let xml: string;
  let locs: string[];

  beforeAll(() => {
    const p = path.resolve(process.cwd(), "public/sitemap.xml");
    xml = readFileSync(p, "utf-8");
    locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  });

  it("no incluye ninguna ruta privada", () => {
    const leaks = PRIVATE_ROUTES.filter((r) =>
      locs.some((loc) => {
        const url = new URL(loc);
        return url.pathname === r;
      }),
    );
    expect(leaks, `Rutas privadas filtradas al sitemap: ${leaks.join(", ")}`).toEqual([]);
  });

  it("incluye todas las calculadoras, artículos clave y páginas legales", () => {
    const paths = new Set(locs.map((loc) => new URL(loc).pathname));
    const missing = PUBLIC_MUST_INCLUDE.filter((p) => !paths.has(p));
    expect(missing, `Rutas públicas ausentes del sitemap: ${missing.join(", ")}`).toEqual([]);
  });

  it("todas las <loc> apuntan al dominio canónico con www", () => {
    const bad = locs.filter((l) => !l.startsWith("https://electrolabpro.com/") && l !== "https://electrolabpro.com/");
    expect(bad, `URLs con host inesperado: ${bad.join(", ")}`).toEqual([]);
  });
});
