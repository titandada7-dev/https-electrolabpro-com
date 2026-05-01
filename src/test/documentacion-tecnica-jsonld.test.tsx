import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DocumentacionTecnica from "@/pages/DocumentacionTecnica";

/**
 * Test de integración: renderiza /documentacion-tecnica y valida que el
 * JSON-LD REAL inyectado en <head> cumpla el contrato de BreadcrumbList:
 * URLs absolutas, indexables (sin #/?), posiciones consecutivas y nombres
 * exactos. Cubre regresiones que un test puramente unitario no detecta
 * (por ejemplo, si alguien cambia el efecto que inyecta los <script>).
 */

const SITE = "https://electrolabpro.com";

const isIndexableUrl = (url: string): boolean =>
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

describe("DocumentacionTecnica — JSON-LD renderizado en <head>", () => {
  afterEach(() => {
    cleanup();
    // Limpieza explícita de los scripts inyectados por el efecto
    ["doc-tec-faq", "doc-tec-collection", "doc-tec-breadcrumb"].forEach((id) =>
      document.getElementById(id)?.remove(),
    );
  });

  it("inyecta script BreadcrumbList con id 'doc-tec-breadcrumb'", () => {
    render(
      <MemoryRouter initialEntries={["/documentacion-tecnica"]}>
        <DocumentacionTecnica />
      </MemoryRouter>,
    );
    const schema = readJsonLd("doc-tec-breadcrumb");
    expect(schema).not.toBeNull();
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("BreadcrumbList: todas las URLs son absolutas e indexables", () => {
    render(
      <MemoryRouter initialEntries={["/documentacion-tecnica"]}>
        <DocumentacionTecnica />
      </MemoryRouter>,
    );
    const schema = readJsonLd("doc-tec-breadcrumb");
    expect(Array.isArray(schema.itemListElement)).toBe(true);
    schema.itemListElement.forEach((item: { item: string }) => {
      expect(isIndexableUrl(item.item)).toBe(true);
    });
  });

  it("BreadcrumbList: position 2 apunta a /documentacion-tecnica con nombre correcto", () => {
    render(
      <MemoryRouter initialEntries={["/documentacion-tecnica"]}>
        <DocumentacionTecnica />
      </MemoryRouter>,
    );
    const schema = readJsonLd("doc-tec-breadcrumb");
    const node = schema.itemListElement.find(
      (i: { position: number }) => i.position === 2,
    );
    expect(node.item).toBe(`${SITE}/documentacion-tecnica`);
    expect(node.name).toBe("Documentación Técnica");
  });

  it("BreadcrumbList: posiciones consecutivas empezando en 1", () => {
    render(
      <MemoryRouter initialEntries={["/documentacion-tecnica"]}>
        <DocumentacionTecnica />
      </MemoryRouter>,
    );
    const schema = readJsonLd("doc-tec-breadcrumb");
    const positions = schema.itemListElement.map(
      (i: { position: number }) => i.position,
    );
    expect(positions).toEqual([1, 2]);
  });

  it("también inyecta CollectionPage y FAQPage con URLs limpias", () => {
    render(
      <MemoryRouter initialEntries={["/documentacion-tecnica"]}>
        <DocumentacionTecnica />
      </MemoryRouter>,
    );
    const collection = readJsonLd("doc-tec-collection");
    const faq = readJsonLd("doc-tec-faq");
    expect(collection["@type"]).toBe("CollectionPage");
    expect(collection.url).toBe(`${SITE}/documentacion-tecnica`);
    expect(isIndexableUrl(collection.url)).toBe(true);
    expect(faq["@type"]).toBe("FAQPage");
    expect(Array.isArray(faq.mainEntity)).toBe(true);
    expect(faq.mainEntity.length).toBeGreaterThan(0);
  });
});
