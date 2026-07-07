import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft, Calculator } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ToolSeoSection, TOOL_SEO } from "@/data/toolSeoContent";
import {
  CALCULATOR_ROUTES,
  SITE_URL,
  type CalculatorSeoMeta,
} from "@/data/calculatorRoutes";
import CalculatorEduLink from "@/components/CalculatorEduLink";

// Cargas diferidas: cada calculadora es un chunk separado.
const ResistorCalculator = lazy(() => import("@/components/ResistorCalculator"));
const OhmCalculator = lazy(() => import("@/components/OhmCalculator"));
const LedCalculator = lazy(() => import("@/components/LedCalculator"));
const VoltageDividerCalculator = lazy(() => import("@/components/VoltageDividerCalculator"));
const RCFilterCalculator = lazy(() => import("@/components/RCFilterCalculator"));
const Timer555Calculator = lazy(() => import("@/components/Timer555Calculator"));
const SmdDecoderCalculator = lazy(() => import("@/components/SmdDecoderCalculator"));
const CapacitiveReactanceCalculator = lazy(
  () => import("@/components/CapacitiveReactanceCalculator")
);
const UnitConverter = lazy(() => import("@/components/UnitConverter"));

const CALC_COMPONENTS: Record<CalculatorSeoMeta["toolKey"], React.ComponentType> = {
  resistor: ResistorCalculator,
  ohm: OhmCalculator,
  led: LedCalculator,
  divider: VoltageDividerCalculator,
  rc: RCFilterCalculator,
  timer: Timer555Calculator,
  smd: SmdDecoderCalculator,
  reactance: CapacitiveReactanceCalculator,
  units: UnitConverter,
};

interface Props {
  meta: CalculatorSeoMeta;
}

/**
 * Página propia por calculadora con:
 * - `<Helmet>` con title/description/canonical/OG/Twitter self-referentes.
 * - JSON-LD `SoftwareApplication` en la propia ruta (además de FAQPage y
 *   BreadcrumbList que inyectan `ToolSeoSection` y `Breadcrumbs`).
 * - Breadcrumb visible Inicio > Calculadoras > [Nombre].
 * - Todo el contenido editorial (fundamentos, mecánica, ejemplos, FAQ)
 *   renderizado en el árbol React, disponible para JS-executing crawlers
 *   y para el prerender SSG.
 */
const CalculatorRoutePage = ({ meta }: Props) => {
  const canonical = `${SITE_URL}${meta.slug}`;
  const seoBlock = TOOL_SEO[meta.toolKey];
  const CalcComponent = CALC_COMPONENTS[meta.toolKey];

  // JSON-LD: SoftwareApplication + agregador de otras calculadoras relacionadas.
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: seoBlock?.title ?? meta.title,
    description: meta.description,
    url: canonical,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web browser",
    inLanguage: "es",
    isAccessibleForFree: true,
    keywords: meta.keyword,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "J.A. Sánchez",
      url: `${SITE_URL}/sobre-nosotros`,
    },
    publisher: {
      "@type": "Organization",
      name: "ElectroLab Pro",
      url: SITE_URL,
    },
  };

  const otherCalcs = CALCULATOR_ROUTES.filter((c) => c.toolKey !== meta.toolKey);

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="ElectroLab Pro" />
        <meta property="og:locale" content="es_ES" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.ogDescription} />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <script type="application/ld+json">
          {JSON.stringify(softwareJsonLd)}
        </script>
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary glow-icon" />
            <span className="text-lg md:text-xl font-mono font-bold text-foreground">
              Electro<span className="text-primary">Lab</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs lastLabel={meta.shortLabel} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-10 md:py-14 border-b border-border">
        <div className="relative container mx-auto px-4 max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            Calculadora gratuita
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent leading-tight">
            {seoBlock?.title ?? meta.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-border bg-card/40 p-10 text-center text-sm text-muted-foreground">
                Cargando calculadora…
              </div>
            }
          >
            <CalcComponent />
          </Suspense>

          {/* Enlaces educativos rápidos (redundantes con ToolSeoSection pero
              útiles como CTA visible arriba del pliegue en móvil) */}
          <CalculatorEduLink
            intro="¿Querés profundizar la teoría o comparar con otras herramientas? Empezá acá:"
            links={[
              { to: "/", label: "Ver todas las calculadoras de electrónica" },
              { to: "/guia-resistencias", label: "Guía completa de resistencias" },
              {
                to: "/documentacion-tecnica",
                label: "Documentación técnica y protocolos",
              },
            ]}
          />

          {/* Bloque SEO extenso: fundamentos, mecánica, ejemplos y FAQ */}
          <ToolSeoSection toolKey={meta.toolKey} />

          {/* Otras calculadoras (enlaces internos entre rutas nuevas) */}
          <section
            aria-label="Otras calculadoras de ElectroLab Pro"
            className="mt-8 rounded-2xl border border-border bg-card/40 p-5 sm:p-7"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">
              Explorá otras calculadoras
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {otherCalcs.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={c.slug}
                    className="block rounded-lg border border-border bg-background/40 p-3 hover:border-primary/40 hover:bg-background/70 transition-colors"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {c.shortLabel}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {c.ogDescription}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Footer mínimo — el completo vive en Home; acá referenciamos rutas legales */}
      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-3">
          <p className="text-muted-foreground text-sm">
            © 2026 ElectroLab Pro — Diseñado y desarrollado por{" "}
            <span className="font-semibold">J.A. Sánchez</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-wider">
            <Link to="/privacidad" className="text-muted-foreground hover:text-primary">
              Privacidad
            </Link>
            <span className="text-muted-foreground/70">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground hover:text-primary">
              Aviso Legal
            </Link>
            <span className="text-muted-foreground/70">|</span>
            <Link to="/contacto" className="text-muted-foreground hover:text-primary">
              Contacto
            </Link>
            <span className="text-muted-foreground/70">|</span>
            <Link
              to="/sobre-nosotros"
              className="text-muted-foreground hover:text-primary"
            >
              Sobre Nosotros
            </Link>
          </div>
          <p className="text-muted-foreground/80 text-[10px] italic max-w-xl mx-auto">
            ⚠️ Los cálculos son ideales; verificá siempre con un multímetro antes de
            energizar un circuito.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CalculatorRoutePage;
