import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import LedCalculator from "../components/LedCalculator";
import OhmCalculator from "../components/OhmCalculator";
import ResistorCalculator from "../components/ResistorCalculator";
import ShareButtons from "../components/ShareButtons";
import VoltageDividerCalculator from "../components/VoltageDividerCalculator";
import Timer555Calculator from "../components/Timer555Calculator";
import SmdDecoderCalculator from "../components/SmdDecoderCalculator";
import ColorBandCalculator from "../components/ColorBandCalculator";
import CapacitiveReactanceCalculator from "../components/CapacitiveReactanceCalculator";
import RCFilterCalculator from "../components/RCFilterCalculator";
import UnitConverter from "../components/UnitConverter";
import AdBannerDiscrete from "../components/AdBannerDiscrete";
import LabProRecommendations from "../components/LabProRecommendations";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Zap, ArrowLeft, Menu, X, ChevronDown } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Calculadoras", scrollTo: "calculadoras" },
  { label: "Blog Técnico", scrollTo: "blog" },
  { label: "Contacto", href: "/contacto" },
];

const CATEGORIES = [
  {
    id: "circuitos",
    title: "Calculadoras de Circuitos",
    tools: [
      { id: "ohm", label: "Ley de Ohm" },
      { id: "divisor", label: "Divisor de Voltaje" },
      { id: "reactancia", label: "Reactancia Capacitiva" },
      { id: "led", label: "Resistencia para LED" },
      { id: "filtro-rc", label: "Filtro RC" },
      { id: "conversor", label: "Conversor de Unidades" },
    ],
  },
  {
    id: "componentes",
    title: "Decodificadores y Herramientas",
    tools: [
      { id: "resistencias", label: "Código de Colores" },
      { id: "colores-visual", label: "Calculadora Visual" },
      { id: "smd", label: "Decodificador SMD" },
      { id: "555", label: "Temporizador 555" },
    ],
  },
  {
    id: "guias",
    title: "Guías Técnicas",
    tools: [
      { id: "link:/articulos/ley-de-ohm", label: "Ley de Ohm — Teoría" },
      { id: "link:/articulos/codigo-colores-resistencias", label: "Código de Colores" },
      { id: "link:/articulos/condensadores", label: "Condensadores" },
      { id: "link:/articulos/multimetro", label: "Guía del Multímetro" },
      { id: "link:/articulos/circuitos-serie-paralelo", label: "Serie vs Paralelo" },
      { id: "link:/articulos/transistores", label: "Transistores" },
      { id: "link:/articulos/diodos", label: "Diodos" },
    ],
  },
];

const ARTICLE_LINKS = [
  { label: "Ley de Ohm", to: "/articulos/ley-de-ohm" },
  { label: "Código de Colores", to: "/articulos/codigo-colores-resistencias" },
  { label: "Condensadores", to: "/articulos/condensadores" },
  { label: "Diodos", to: "/articulos/diodos" },
  { label: "Multímetro", to: "/articulos/multimetro" },
  { label: "Serie vs Paralelo", to: "/articulos/circuitos-serie-paralelo" },
  { label: "Transistores", to: "/articulos/transistores" },
  { label: "Arduino", to: "/articulos/arduino" },
];

export default function Home() {
  usePageMeta({
    title: "ElectroLab Pro | Calculadoras electrónicas online",
    description:
      "Herramienta online con Ley de Ohm, código de colores y calculadora de resistencia para LED.",
  });
  const [moduloActivo, setModuloActivo] = useState("menu");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const volverAlMenu = (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 font-mono mb-6 text-muted-foreground hover:text-foreground"
      onClick={() => setModuloActivo("menu")}
    >
      <ArrowLeft className="w-4 h-4" />
      Volver al menú
    </Button>
  );

  const renderTool = (id: string) => {
    const map: Record<string, React.ReactNode> = {
      ohm: <OhmCalculator />,
      resistencias: <ResistorCalculator />,
      led: <LedCalculator />,
      divisor: <VoltageDividerCalculator />,
      "555": <Timer555Calculator />,
      smd: <SmdDecoderCalculator />,
      reactancia: <CapacitiveReactanceCalculator />,
      "colores-visual": <ColorBandCalculator />,
      "filtro-rc": <RCFilterCalculator />,
      conversor: <UnitConverter />,
    };
    return map[id] ?? null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ─── Navigation ─── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-base font-mono font-bold text-foreground tracking-tight">
              ElectroLab Pro
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.href ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.scrollTo!)}
                  className="px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
            <div className="relative group">
              <button className="px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Artículos
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-52 rounded-md border border-border bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 z-50">
                {ARTICLE_LINKS.map((a) => (
                  <Link
                    key={a.to}
                    to={a.to}
                    className="block px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background px-4 py-2 space-y-1">
            {NAV_LINKS.map((link) =>
              link.href ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-3 text-sm font-mono text-muted-foreground hover:text-foreground rounded-md"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.scrollTo!)}
                  className="block w-full text-left py-2.5 px-3 text-sm font-mono text-muted-foreground hover:text-foreground rounded-md"
                >
                  {link.label}
                </button>
              )
            )}
            <div className="border-t border-border pt-2 mt-1">
              <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-mono mb-1 px-3">Artículos</p>
              {ARTICLE_LINKS.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-3 text-sm font-mono text-muted-foreground hover:text-foreground rounded-md"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* ─── Main ─── */}
      <div className="flex-1 flex items-start justify-center px-4 pt-10 pb-4">
        <div className="w-full max-w-2xl">
          {moduloActivo === "menu" && (
            <div className="space-y-20">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-2xl md:text-4xl font-mono font-bold text-foreground tracking-tight">
                  ElectroLab Pro
                </h1>
                <p className="text-muted-foreground text-sm font-mono leading-relaxed max-w-lg mx-auto">
                  Calculadoras electrónicas online para Ley de Ohm, código de colores,
                  resistencia para LED y más.
                </p>
              </div>

              {/* ─── Calculadoras ─── */}
              <section id="calculadoras">
                <Accordion type="multiple" defaultValue={["circuitos"]} className="w-full space-y-3">
                  {CATEGORIES.map((cat) => (
                    <AccordionItem
                      key={cat.id}
                      value={cat.id}
                      className="rounded-md border border-border bg-card/40"
                    >
                      <AccordionTrigger className="px-5 py-3.5 text-sm font-mono font-bold text-foreground hover:no-underline hover:text-primary transition-colors [&[data-state=open]]:text-primary">
                        {cat.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3">
                        <div className="grid gap-0.5">
                          {cat.tools.map((tool) =>
                            tool.id.startsWith("link:") ? (
                              <Link key={tool.id} to={tool.id.replace("link:", "")} className="block">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-sm font-mono rounded hover:bg-secondary/50 hover:text-foreground"
                                >
                                  {tool.label}
                                </Button>
                              </Link>
                            ) : (
                              <Button
                                key={tool.id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-sm font-mono rounded hover:bg-secondary/50 hover:text-foreground"
                                onClick={() => setModuloActivo(tool.id)}
                              >
                                {tool.label}
                              </Button>
                            )
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* ─── Ad ─── */}
              <AdBannerDiscrete slot="3756475501" format="horizontal" />

              {/* ─── Blog Técnico ─── */}
              <section id="blog" className="space-y-5">
                <h2 className="text-base font-mono font-bold text-foreground tracking-wide uppercase">
                  Blog Técnico
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ARTICLE_LINKS.map((a) => (
                    <Link
                      key={a.to}
                      to={a.to}
                      className="px-3 py-2.5 rounded border border-border bg-card/30 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-center"
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              </section>

              {/* ─── Ad ─── */}
              <AdBannerDiscrete slot="3756475501" format="rectangle" />

              {/* ─── Instrumentación Certificada ─── */}
              <section className="space-y-4 border-t border-border pt-10">
                <h2 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  Instrumentación Certificada
                </h2>
                <LabProRecommendations />
              </section>
            </div>
          )}

          {moduloActivo !== "menu" && (
            <div>
              {volverAlMenu}
              {renderTool(moduloActivo)}
              <ShareButtons />
              <AdBannerDiscrete slot="3756475501" className="mt-20" />
            </div>
          )}
        </div>
      </div>

      {/* ─── Footer ─── */}
      <footer className="w-full py-6 border-t border-border bg-card/20 mt-10">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-3">
          <p className="text-muted-foreground text-[11px] font-mono tracking-wide">
            © 2026 ElectroLab Pro — J.A. Sanchez
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/privacidad" className="text-muted-foreground/60 text-[10px] uppercase tracking-wider hover:text-foreground transition-colors font-mono">Privacidad</Link>
            <span className="text-muted-foreground/20">·</span>
            <Link to="/aviso-legal" className="text-muted-foreground/60 text-[10px] uppercase tracking-wider hover:text-foreground transition-colors font-mono">Aviso Legal</Link>
            <span className="text-muted-foreground/20">·</span>
            <Link to="/contacto" className="text-muted-foreground/60 text-[10px] uppercase tracking-wider hover:text-foreground transition-colors font-mono">Contacto</Link>
          </div>
          <a
            href="mailto:contacto@electrolabpro.com"
            className="text-muted-foreground/40 text-[10px] hover:text-foreground transition-colors block font-mono"
          >
            contacto@electrolabpro.com
          </a>
          <p className="text-muted-foreground/30 text-[9px] leading-relaxed max-w-md mx-auto font-mono">
            En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
          </p>
        </div>
      </footer>
    </div>
  );
}
