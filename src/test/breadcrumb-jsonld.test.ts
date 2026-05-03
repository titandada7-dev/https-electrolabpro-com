import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Garantiza que el JSON-LD del BreadcrumbList SIEMPRE apunte a URLs
 * indexables (rutas reales) y nunca a anclas o fragmentos del tipo
 * "/#guias", que Google trata como duplicados de la home.
 *
 * Además valida que el componente <Breadcrumbs /> inyecte un único
 * nodo con id estable ("breadcrumbs-jsonld") y posiciones consecutivas
 * empezando en 1 ("Inicio").
 */

const SITE = "https://electrolabpro.com";

const isIndexableUrl = (url: string): boolean => {
  if (!url.startsWith("https://")) return false;
  if (url.includes("#")) return false;
  if (url.includes("?")) return false;
  return true;
};

const readBreadcrumbSchema = () => {
  const node = document.getElementById("breadcrumbs-jsonld") as HTMLScriptElement | null;
  if (!node) return null;
  try {
    return JSON.parse(node.textContent || "");
  } catch {
    return null;
  }
};

const renderAt = (pathname: string, lastLabel?: string) =>
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Breadcrumbs lastLabel={lastLabel} />
    </MemoryRouter>,
  );

describe("Breadcrumbs — JSON-LD jerárquico", () => {
  afterEach(() => {
    cleanup();
    document.getElementById("breadcrumbs-jsonld")?.remove();
  });

  it("Article: emite Home > Artículos > Página con URLs indexables", () => {
    renderAt("/articulos/ley-de-ohm", "Ley de Ohm explicada");
    const schema = readBreadcrumbSchema()!;
    expect(schema["@type"]).toBe("BreadcrumbList");
    const positions = schema.itemListElement.map((i: any) => i.position);
    expect(positions).toEqual([1, 2, 3]);
    expect(schema.itemListElement[0].name).toBe("Inicio");
    expect(schema.itemListElement[1].name).toBe("Artículos");
    expect(schema.itemListElement[2].item).toBe(`${SITE}/articulos/ley-de-ohm`);
    schema.itemListElement.forEach((item: any) => {
      expect(isIndexableUrl(item.item)).toBe(true);
    });
  });

  it("Blog: emite Home > Blog > Post", () => {
    renderAt("/blog/mi-primer-laboratorio");
    const schema = readBreadcrumbSchema()!;
    expect(schema.itemListElement[1].name).toBe("Blog");
    expect(schema.itemListElement[2].item).toBe(`${SITE}/blog/mi-primer-laboratorio`);
  });

  it("Glosario: emite Home > Glosario", () => {
    renderAt("/glosario");
    const schema = readBreadcrumbSchema()!;
    expect(schema.itemListElement.map((i: any) => i.name)).toEqual(["Inicio", "Glosario"]);
  });

  it("Guía de resistencias: incluye sección padre 'Recursos'", () => {
    renderAt("/guia-resistencias");
    const schema = readBreadcrumbSchema()!;
    const names = schema.itemListElement.map((i: any) => i.name);
    expect(names).toContain("Recursos");
    expect(names[names.length - 1]).toBe("Guía de resistencias");
  });

  it("Mantiene id estable y un único script al re-renderizar", () => {
    const { rerender } = renderAt("/articulos/diodos", "Diodos");
    rerender(
      <MemoryRouter initialEntries={["/articulos/diodos"]}>
        <Breadcrumbs lastLabel="Diodos" />
      </MemoryRouter>,
    );
    const scripts = document.querySelectorAll("script#breadcrumbs-jsonld");
    expect(scripts.length).toBe(1);
  });
});
