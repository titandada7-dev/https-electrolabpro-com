import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LeyDeOhm from "@/pages/articles/LeyDeOhm";

/**
 * Test de integración: renderiza un artículo real (Ley de Ohm) y valida
 * que el JSON-LD de tipo Article inyectado en <head> cumpla los requisitos
 * de Google Rich Results: headline, url absoluta, image absoluta y
 * mainEntityOfPage con @id absoluto e indexable.
 */

const SITE = "https://electrolabpro.com";

const isAbsoluteIndexable = (url: string): boolean =>
  url.startsWith("https://") && !url.includes("#") && !url.includes("?");

const readJsonLd = (id: string) => {
  const node = document.getElementById(id) as HTMLScriptElement | null;
  if (!node) return null;
  try {
    return JSON.parse(node.textContent || "");
  } catch {
    return null;
  }
};

const renderArticle = () =>
  render(
    <MemoryRouter initialEntries={["/articulos/ley-de-ohm"]}>
      <LeyDeOhm />
    </MemoryRouter>,
  );

describe("Article JSON-LD — render real desde ArticleLayout", () => {
  afterEach(() => {
    cleanup();
    ["article-jsonld", "faq-jsonld"].forEach((id) =>
      document.getElementById(id)?.remove(),
    );
  });

  it("inyecta un script Article con id 'article-jsonld'", () => {
    renderArticle();
    const schema = readJsonLd("article-jsonld");
    expect(schema).not.toBeNull();
    expect(schema["@type"]).toBe("Article");
  });

  it("incluye headline no vacío que coincide con el título del artículo", () => {
    renderArticle();
    const schema = readJsonLd("article-jsonld");
    expect(typeof schema.headline).toBe("string");
    expect(schema.headline.length).toBeGreaterThan(0);
    expect(schema.headline).toMatch(/Ley de Ohm/);
  });

  it("expone url absoluta e indexable apuntando al slug del artículo", () => {
    renderArticle();
    const schema = readJsonLd("article-jsonld");
    expect(schema.url).toBe(`${SITE}/articulos/ley-de-ohm`);
    expect(isAbsoluteIndexable(schema.url)).toBe(true);
  });

  it("incluye mainEntityOfPage con @id absoluto y consistente con url", () => {
    renderArticle();
    const schema = readJsonLd("article-jsonld");
    expect(schema.mainEntityOfPage).toBeDefined();
    expect(schema.mainEntityOfPage["@type"]).toBe("WebPage");
    expect(schema.mainEntityOfPage["@id"]).toBe(`${SITE}/articulos/ley-de-ohm`);
    expect(isAbsoluteIndexable(schema.mainEntityOfPage["@id"])).toBe(true);
    expect(schema.mainEntityOfPage["@id"]).toBe(schema.url);
  });

  it("image es un array de URLs absolutas (fallback a OG por defecto)", () => {
    renderArticle();
    const schema = readJsonLd("article-jsonld");
    expect(Array.isArray(schema.image)).toBe(true);
    expect(schema.image.length).toBeGreaterThan(0);
    schema.image.forEach((url: string) => {
      expect(url.startsWith("https://")).toBe(true);
    });
  });

  it("incluye author, publisher y fechas ISO 8601 con zona horaria", () => {
    renderArticle();
    const schema = readJsonLd("article-jsonld");
    expect(schema.author?.name).toBeTruthy();
    expect(schema.publisher?.name).toBe("ElectroLab Pro");
    // Formato ISO con offset (-03:00) o Z
    expect(schema.datePublished).toMatch(/T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})/);
    expect(schema.dateModified).toMatch(/T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})/);
  });
});
