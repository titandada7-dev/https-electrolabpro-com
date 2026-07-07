# Plan: rutas propias + prerender por calculadora

## Objetivo

Cada calculadora deja de vivir solo como pestaña en `/` y pasa a tener su propia URL con:
- `<title>`, `<meta description>`, OpenGraph y Twitter Card únicos.
- HTML pre-renderizado en build (visible para Bing, DuckDuckGo, GPTBot, LinkedIn/Slack).
- Canonical y `og:url` autorreferentes.
- JSON-LD `SoftwareApplication` + `FAQPage` + `BreadcrumbList` en el HTML estático.

El home `/` mantiene el hub con tabs para no romper la UX actual; los tabs pasan a ser enlaces internos a las nuevas rutas (mejor rastreo + más "pageviews" por sesión).

## Rutas nuevas

| Ruta | Calculadora |
|------|-------------|
| `/ley-de-ohm` | Ley de Ohm (V = I × R) |
| `/calculadora-led` | Resistencia para LED |
| `/calculadora-resistencias` | Código de colores (4/5 bandas) |
| `/divisor-de-voltaje` | Divisor de voltaje |
| `/filtro-rc` | Filtro RC (fc) |
| `/temporizador-555` | Astable 555 |
| `/decodificador-smd` | Decodificador SMD |
| `/reactancia-capacitiva` | Reactancia Xc |
| `/conversor-unidades` | Conversor de unidades |

Sin colisión con artículos (viven bajo `/articulos/…`).

## Cambios técnicos

1. **Dependencias**: `bun add vite-react-ssg react-helmet-async`.
2. **`src/main.tsx`**: envolver `<App />` con `HelmetProvider`. Exportar `createRoot` como named export `entry-client` compatible con `vite-react-ssg`.
3. **Nuevo componente reusable** `src/pages/calculators/CalculatorRoutePage.tsx`: layout con Header + Breadcrumbs + Calculadora + `ToolSeoSection` + `<Helmet>` con title/desc/canonical/og/twitter + JSON-LD `SoftwareApplication`. Recibe `toolKey`.
4. **Nueve páginas finas** en `src/pages/calculators/` (una por ruta) que importan `CalculatorRoutePage` con el `toolKey` correspondiente y los metadatos SEO específicos.
5. **`src/App.tsx`**: registrar las 9 rutas nuevas dentro del `BrowserRouter` existente.
6. **`src/components/CalculatorHub.tsx`**: los tabs siguen cambiando el tab activo por defecto, pero cada tab también expone un enlace "Abrir en su propia página" que apunta a la ruta correspondiente (mejora rastreo interno). No rompe UX actual.
7. **`vite.config.ts`**: agregar plugin de `vite-react-ssg` con la lista de rutas a prerenderizar (9 calculadoras + rutas ya existentes que se beneficien).
8. **`public/robots.txt` + `public/sitemap.xml`**: agregar las 9 URLs nuevas con prioridad 0.8.
9. **`scripts/generate-sitemap.ts`**: sumar las 9 rutas a la generación automática.
10. **Redirects/canonicals**: no rompe rutas viejas; el home sigue existiendo. Cada calculadora nueva tiene canonical self-referente; el home mantiene su canonical propio.

## Metadatos por calculadora (ejemplo Ley de Ohm)

```
<title>Calculadora Ley de Ohm — V = I × R online | ElectroLab Pro</title>
<meta name="description" content="Calculadora online de la Ley de Ohm. Ingresa dos valores (V, I o R) y obtén el tercero al instante. Con ejemplos, potencia y FAQ técnica.">
<link rel="canonical" href="https://www.electrolabpro.com/ley-de-ohm">
<meta property="og:title" ...>
<meta name="twitter:card" content="summary_large_image">
```

Los otros 8 siguen el mismo patrón con keyword propia.

## Riesgos y notas

- **Prerender = build más lento**: cada ruta se renderiza en Node headless al hacer `npm run build`. Suma ~30–60 s.
- **Hidratación**: `vite-react-ssg` hidrata el bundle sobre el HTML pre-renderizado. Si hay `useEffect` con `window`, sigue funcionando (corre client-side). Componentes que dependen de APIs de navegador durante SSR se envuelven con guardas `typeof window !== "undefined"`.
- **Analytics/AdSense**: los scripts se cargan client-side igual que hoy; el prerender solo afecta al HTML/head, no altera GTM/AdSense/Amazon.
- **URLs viejas del home siguen funcionando**: el usuario que llegue a `/` con `?tab=ohm` u otro estado no rompe nada.
- **Sitemap y feed.xml** se regeneran para incluir las nuevas URLs.
- **og:image**: sin imagen propia por calculadora, Lovable hosting sirve la del proyecto. Si querés generar una imagen social por calculadora, se puede hacer después.

## Fuera de alcance

- No migro artículos ni guías (ya tienen sus propias rutas y `ArticleLayout` con JSON-LD).
- No cambio Analytics, AdSense ni Cookie Banner.
- No genero imágenes OG específicas por calculadora (podemos hacerlo en un paso posterior si querés).
