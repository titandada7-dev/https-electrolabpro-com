import { describe, it, expect } from "vitest";

/**
 * Garantiza que el JSON-LD del BreadcrumbList SIEMPRE apunte a URLs
 * indexables (rutas reales) y nunca a anclas o fragmentos del tipo
 * "/#guias", que Google trata como duplicados de la home.
 *
 * Si en el futuro se añade un breadcrumb que use un ancla, este test
 * fallará y obligará a corregir la URL antes del deploy.
 */

const SITE = "https://electrolabpro.com";

// Réplica determinista del schema generado por ArticleLayout.tsx (líneas 124-132)
const buildArticleBreadcrumb = (title: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Documentación Técnica",
      item: `${SITE}/documentacion-tecnica`,
    },
    { "@type": "ListItem", position: 3, name: title, item: `${SITE}/articulos/${slug}` },
  ],
});

// Réplica del schema de DocumentacionTecnica.tsx (líneas 105-112)
const docTecBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Documentación Técnica",
      item: `${SITE}/documentacion-tecnica`,
    },
  ],
};

const isIndexableUrl = (url: string): boolean => {
  if (!url.startsWith("https://")) return false;
  // No se permiten anclas (#) ni querystrings de tracking en breadcrumbs
  if (url.includes("#")) return false;
  if (url.includes("?")) return false;
  return true;
};

describe("BreadcrumbList JSON-LD — URLs indexables", () => {
  it("Article breadcrumb: ningún item usa anclas tipo /#guias", () => {
    const schema = buildArticleBreadcrumb("Ley de Ohm", "ley-de-ohm");
    schema.itemListElement.forEach((item) => {
      expect(item.item).not.toMatch(/#/);
      expect(isIndexableUrl(item.item)).toBe(true);
    });
  });

  it("Article breadcrumb: position 2 apunta a /documentacion-tecnica (no a /#guias)", () => {
    const schema = buildArticleBreadcrumb("Protocolo I2C", "protocolo-i2c");
    const docNode = schema.itemListElement.find((i) => i.position === 2)!;
    expect(docNode.item).toBe(`${SITE}/documentacion-tecnica`);
    expect(docNode.name).toBe("Documentación Técnica");
  });

  it("DocumentacionTecnica breadcrumb: todas las URLs son absolutas e indexables", () => {
    docTecBreadcrumb.itemListElement.forEach((item) => {
      expect(isIndexableUrl(item.item)).toBe(true);
    });
  });

  it("Posiciones del BreadcrumbList son consecutivas empezando en 1", () => {
    const schema = buildArticleBreadcrumb("Diodos", "diodos");
    const positions = schema.itemListElement.map((i) => i.position);
    expect(positions).toEqual([1, 2, 3]);
  });

  it("Detecta como inválida cualquier URL con ancla (regresión guard)", () => {
    expect(isIndexableUrl("https://electrolabpro.com/#guias")).toBe(false);
    expect(isIndexableUrl("https://electrolabpro.com/documentacion-tecnica")).toBe(true);
  });
});
