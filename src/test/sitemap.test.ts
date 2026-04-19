import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Tests del sitemap.xml
 * Garantizan que las URLs críticas (incluida la landing del juego)
 * estén presentes con la prioridad correcta para SEO.
 */
describe("sitemap.xml", () => {
  let xml: string;

  beforeAll(() => {
    const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
    xml = readFileSync(sitemapPath, "utf-8");
  });

  it("es un XML válido con declaración correcta", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });

  it("incluye /aprende-jugando", () => {
    expect(xml).toContain("https://electrolabpro.com/aprende-jugando");
  });

  it("la entrada /aprende-jugando tiene priority 0.9", () => {
    // Buscamos el bloque <url>...</url> que contiene /aprende-jugando
    const match = xml.match(
      /<url>\s*<loc>https:\/\/electrolabpro\.com\/aprende-jugando<\/loc>[\s\S]*?<\/url>/
    );
    expect(match).not.toBeNull();
    expect(match![0]).toContain("<priority>0.9</priority>");
  });

  it("la entrada /aprende-jugando tiene changefreq weekly (contenido del juego)", () => {
    const match = xml.match(
      /<url>\s*<loc>https:\/\/electrolabpro\.com\/aprende-jugando<\/loc>[\s\S]*?<\/url>/
    );
    expect(match![0]).toContain("<changefreq>weekly</changefreq>");
  });

  it("incluye los 3 artículos clave con CTA del juego", () => {
    expect(xml).toContain("https://electrolabpro.com/articulos/ley-de-ohm");
    expect(xml).toContain("https://electrolabpro.com/articulos/arduino");
    expect(xml).toContain("https://electrolabpro.com/articulos/codigo-colores-resistencias");
  });

  it("la home tiene priority 1.0", () => {
    const match = xml.match(
      /<url>\s*<loc>https:\/\/electrolabpro\.com\/<\/loc>[\s\S]*?<\/url>/
    );
    expect(match).not.toBeNull();
    expect(match![0]).toContain("<priority>1.0</priority>");
  });

  it("usa siempre el dominio canónico electrolabpro.com (sin www en sitemap)", () => {
    // Convención: el sitemap usa el host raíz; redirección www→raíz se maneja en hosting
    expect(xml).not.toContain("https://www.electrolabpro.com");
  });

  it("no contiene tags <url> huérfanos o malformados", () => {
    const opens = (xml.match(/<url>/g) || []).length;
    const closes = (xml.match(/<\/url>/g) || []).length;
    expect(opens).toBe(closes);
    expect(opens).toBeGreaterThan(0);
  });
});
