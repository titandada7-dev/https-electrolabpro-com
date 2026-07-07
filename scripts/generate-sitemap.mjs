// Genera public/sitemap.xml antes de `vite dev` y `vite build`.
// Usa dominio canónico https://www.electrolabpro.com (con www).
//
// Auto-discovery:
//   - Calculadoras interactivas → se leen de src/data/calculatorRoutes.ts
//   - Artículos pre-renderizados → se leen de src/data/articulos.ts
// Sin intervención manual: al añadir una entrada nueva en cualquiera de
// esos catálogos, se incluye automáticamente en el sitemap.
//
// Al finalizar imprime un reporte automático con conteo total, desglose
// por sección y ejemplos, para verificación rápida post-build.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://www.electrolabpro.com";

// -----------------------------------------------------------------------------
// REGLAS DE INDEXACIÓN
// -----------------------------------------------------------------------------
// INCLUIR (100 % públicas, sin sesión):
//   - Home, guías, glosario, documentación técnica, aprende jugando
//   - Todos los /articulos/* y /blog/*
//   - Todas las calculadoras con URL propia
//   - Páginas de autoridad y legales (privacidad, aviso legal, términos,
//     sobre-nosotros, contacto)
//   - Landings públicas de /premium (marketing, no requieren sesión)
//
// EXCLUIR intencionalmente (privadas, transaccionales o que requieren sesión):
export const PRIVATE_ROUTES = [
  "/auth",
  "/account",
  "/premium/biblioteca",
  "/unsubscribe",
  "/politica-reembolsos",
  "/paleta",
];
// -----------------------------------------------------------------------------

/** @typedef {{ path: string, changefreq?: string, priority?: string, section: string }} Entry */

// -------------------- Rutas manuales (estructura fija del sitio) -------------
/** @type {Entry[]} */
const staticEntries = [
  { path: "/", changefreq: "weekly", priority: "1.0", section: "home" },
  { path: "/documentacion-tecnica", changefreq: "weekly", priority: "0.95", section: "hub" },
  { path: "/aprende-jugando", changefreq: "weekly", priority: "0.9", section: "hub" },
  { path: "/guia-resistencias", changefreq: "monthly", priority: "0.9", section: "hub" },
  { path: "/guia-multimetro", changefreq: "monthly", priority: "0.9", section: "hub" },
  { path: "/glosario", changefreq: "monthly", priority: "0.7", section: "hub" },

  // Autoridad y legales
  { path: "/sobre-nosotros", changefreq: "monthly", priority: "0.5", section: "legal" },
  { path: "/contacto", changefreq: "monthly", priority: "0.5", section: "legal" },
  { path: "/privacidad", changefreq: "monthly", priority: "0.3", section: "legal" },
  { path: "/aviso-legal", changefreq: "yearly", priority: "0.3", section: "legal" },
  { path: "/terminos-y-condiciones", changefreq: "yearly", priority: "0.3", section: "legal" },

  // Blog
  { path: "/blog/mi-primer-laboratorio", changefreq: "monthly", priority: "0.8", section: "blog" },
  { path: "/blog/mis-5-proyectos-arduino-favoritos", changefreq: "monthly", priority: "0.8", section: "blog" },
  { path: "/blog/como-disene-mi-primer-pcb-kicad", changefreq: "monthly", priority: "0.8", section: "blog" },

  // Landings públicas de premium (marketing — sin paywall en el propio landing)
  { path: "/premium", changefreq: "monthly", priority: "0.6", section: "premium" },
  { path: "/premium/contenido", changefreq: "monthly", priority: "0.6", section: "premium" },
  { path: "/premium/simulador-circuitos", changefreq: "monthly", priority: "0.6", section: "premium" },
  { path: "/premium/calculadoras-avanzadas", changefreq: "monthly", priority: "0.6", section: "premium" },
];

// -------------------- Auto-discovery: artículos ------------------------------
function discoverArticles() {
  const src = readFileSync(resolve("src/data/articulos.ts"), "utf-8");
  // Extrae todos los `path: "/articulos/..."` y `path: "/blog/..."`
  const rx = /path:\s*"(\/(?:articulos|blog)\/[^"]+)"/g;
  const paths = new Set();
  for (const m of src.matchAll(rx)) paths.add(m[1]);
  return [...paths].map((path) => ({
    path,
    changefreq: "monthly",
    priority: path.startsWith("/blog/") ? "0.8" : "0.8",
    section: path.startsWith("/blog/") ? "blog" : "articulos",
  }));
}

// -------------------- Auto-discovery: calculadoras ---------------------------
function discoverCalculators() {
  const src = readFileSync(resolve("src/data/calculatorRoutes.ts"), "utf-8");
  // Extrae todos los `slug: "/..."` dentro de CALCULATOR_ROUTES
  const rx = /slug:\s*"(\/[a-z0-9-]+)"/g;
  const slugs = new Set();
  for (const m of src.matchAll(rx)) slugs.add(m[1]);
  return [...slugs].map((path) => ({
    path,
    changefreq: "monthly",
    priority: "0.9",
    section: "calculadora",
  }));
}

// -------------------- Ensamblado ---------------------------------------------
function assembleEntries() {
  const discoveredArticles = discoverArticles();
  const discoveredCalcs = discoverCalculators();

  // Merge sin duplicar y sin mezclar rutas privadas
  const map = new Map();
  for (const e of [...staticEntries, ...discoveredArticles, ...discoveredCalcs]) {
    if (PRIVATE_ROUTES.includes(e.path)) continue; // safety net
    if (!map.has(e.path)) map.set(e.path, e);
  }
  return [...map.values()];
}

function generateSitemap(items) {
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

function report(entries) {
  const bySection = entries.reduce((acc, e) => {
    acc[e.section] = (acc[e.section] || 0) + 1;
    return acc;
  }, {});
  const sample = (section, n = 3) =>
    entries.filter((e) => e.section === section).slice(0, n).map((e) => e.path);

  console.log("");
  console.log("──────────────────────────────────────────────────────────────");
  console.log(` sitemap.xml — reporte automático (base ${BASE_URL})`);
  console.log("──────────────────────────────────────────────────────────────");
  console.log(` Total URLs públicas   : ${entries.length}`);
  console.log(` Desglose por sección  :`);
  for (const [k, v] of Object.entries(bySection)) {
    console.log(`   · ${k.padEnd(14)} ${v}`);
  }
  console.log(` Ejemplos por sección  :`);
  console.log(`   · calculadoras : ${sample("calculadora").join(", ") || "—"}`);
  console.log(`   · artículos    : ${sample("articulos").join(", ") || "—"}`);
  console.log(`   · legales      : ${sample("legal").join(", ") || "—"}`);
  console.log(` Rutas privadas excluidas: ${PRIVATE_ROUTES.join(", ")}`);
  console.log("──────────────────────────────────────────────────────────────");
  console.log("");
}

const entries = assembleEntries();
writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
report(entries);
