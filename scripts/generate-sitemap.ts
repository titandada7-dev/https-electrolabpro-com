// Genera public/sitemap.xml antes de `vite dev` y `vite build`.
// Mantiene todas las URLs en https://www.electrolabpro.com (canónicas www).
// Para añadir/eliminar páginas, edita el array `entries` más abajo.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://www.electrolabpro.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Rutas indexables. Excluidas: /auth, *, /not-found, /lovable/*.
const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/documentacion-tecnica", changefreq: "weekly", priority: "0.95" },
  { path: "/aprende-jugando", changefreq: "weekly", priority: "0.9" },
  { path: "/guia-resistencias", changefreq: "monthly", priority: "0.9" },
  { path: "/glosario", changefreq: "monthly", priority: "0.7" },
  { path: "/sobre-nosotros", changefreq: "monthly", priority: "0.5" },
  { path: "/contacto", changefreq: "monthly", priority: "0.5" },
  { path: "/privacidad", changefreq: "monthly", priority: "0.3" },
  { path: "/aviso-legal", changefreq: "yearly", priority: "0.3" },
  { path: "/terminos-y-condiciones", changefreq: "yearly", priority: "0.3" },

  // Artículos
  { path: "/articulos/ley-de-ohm", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/codigo-colores-resistencias", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/condensadores", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/multimetro", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/circuitos-serie-paralelo", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/diodos", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/transistores", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/arduino", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/osciloscopio", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/fuentes-de-alimentacion", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/soldadura-electronica", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/protocolo-i2c", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/sensores-arduino", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/pantalla-oled-ssd1306", changefreq: "monthly", priority: "0.8" },
  { path: "/articulos/que-arduino-comprar", changefreq: "monthly", priority: "0.9" },
  { path: "/articulos/pwm-arduino", changefreq: "monthly", priority: "0.9" },
  { path: "/articulos/reguladores-voltaje", changefreq: "monthly", priority: "0.9" },
  { path: "/articulos/leer-datasheet", changefreq: "monthly", priority: "0.9" },

  // Blog
  { path: "/blog/mi-primer-laboratorio", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/mis-5-proyectos-arduino-favoritos", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/como-disene-mi-primer-pcb-kicad", changefreq: "monthly", priority: "0.8" },
];

function generateSitemap(items: SitemapEntry[]) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml escrito (${entries.length} URLs, base ${BASE_URL})`);
