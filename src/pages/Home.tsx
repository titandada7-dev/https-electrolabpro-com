import { useState } from "react";
import { Link } from "react-router-dom";
import circuitBg from "@/assets/circuit-bg.jpg";
import multimetroImg from "@/assets/multimetro.jpg";
import soldadorImg from "@/assets/soldador.jpg";
import osciloscopioImg from "@/assets/osciloscopio.jpg";
import arduinoImg from "@/assets/arduino-kit.jpg";
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
import AdBanner from "../components/AdBanner";
import LabProRecommendations from "../components/LabProRecommendations";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Zap, ArrowLeft, ExternalLink } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const CATEGORIES = [
  {
    id: "circuitos",
    icon: "🧮",
    title: "Calculadoras de Circuitos",
    tools: [
      { id: "ohm", label: "⚡ Ley de Ohm" },
      { id: "divisor", label: "🔌 Divisor de Voltaje" },
      { id: "reactancia", label: "〰️ Reactancia Capacitiva" },
      { id: "led", label: "💡 Resistencia para LED" },
      { id: "filtro-rc", label: "📡 Filtro RC (Pasa-Bajos / Altos)" },
      { id: "conversor", label: "🔄 Conversor de Unidades" },
    ],
  },
  {
    id: "componentes",
    icon: "🔌",
    title: "Componentes y Herramientas",
    tools: [
      { id: "resistencias", label: "🎨 Código de Colores" },
      { id: "colores-visual", label: "🌈 Calculadora Visual de Colores" },
      { id: "smd", label: "🔍 Decodificador SMD" },
      { id: "555", label: "⏱️ Temporizador 555" },
    ],
  },
  {
    id: "guias",
    icon: "📚",
    title: "Guías Técnicas y Tutoriales",
    tools: [
      { id: "link:/articulos/multimetro", label: "📏 Guía del Multímetro" },
      { id: "link:/articulos/condensadores", label: "🔋 Condensadores" },
      { id: "link:/articulos/circuitos-serie-paralelo", label: "🔗 Circuitos Serie vs Paralelo" },
      { id: "link:/articulos/ley-de-ohm", label: "⚡ Ley de Ohm — Teoría" },
      { id: "link:/articulos/codigo-colores-resistencias", label: "🎨 Código de Colores — Teoría" },
      { id: "link:/articulos/transistores", label: "🔀 Transistores" },
      { id: "link:/articulos/diodos", label: "💡 Diodos" },
    ],
  },
];

const RECOMMENDED_TOOLS = [
  {
    title: "Multímetro Digital Profesional",
    description: "Medición de voltaje, corriente y resistencia con precisión.",
    image: multimetroImg,
    mlLink: "#",
    amazonLink: "https://www.amazon.es/s?k=multimetro+digital&tag=electrolabpro-21",
  },
  {
    title: "Estación de Soldado",
    description: "Temperatura regulable, ideal para SMD y through-hole.",
    image: soldadorImg,
    mlLink: "#",
    amazonLink: "https://www.amazon.es/s?k=estacion+de+soldadura&tag=electrolabpro-21",
  },
  {
    title: "Osciloscopio Digital",
    description: "Visualiza señales eléctricas en tiempo real.",
    image: osciloscopioImg,
    mlLink: "#",
    amazonLink: "https://www.amazon.es/s?k=osciloscopio+digital&tag=electrolabpro-21",
  },
  {
    title: "Kit Arduino Starter",
    description: "Todo lo necesario para empezar con microcontroladores.",
    image: arduinoImg,
    mlLink: "#",
    amazonLink: "https://www.amazon.es/s?k=arduino+starter+kit&tag=electrolabpro-21",
  },
];

export default function Home() {
  usePageMeta({
    title: "ElectroLab Pro | Calculadoras electrónicas online",
    description:
      "Herramienta online con Ley de Ohm, código de colores y calculadora de resistencia para LED.",
  });
  const [moduloActivo, setModuloActivo] = useState("menu");

  const volverAlMenu = (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 font-mono mb-4"
      onClick={() => setModuloActivo("menu")}
    >
      <ArrowLeft className="w-4 h-4" />
      Volver
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
    <div className="min-h-screen flex flex-col relative">
      {/* Circuit background */}
      <div className="fixed inset-0 -z-10">
        <img src={circuitBg} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {moduloActivo === "menu" && (
             <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground flex items-center gap-3 tracking-tight">
                  <Zap className="w-8 h-8 md:w-10 md:h-10 text-primary glow-accent" />
                  Electro<span className="text-primary">Lab</span> <span className="text-accent">Pro</span>
                </h1>
                <ThemeToggle />
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                ElectroLab Pro es una herramienta online gratuita para realizar
                cálculos electrónicos rápidos como Ley de Ohm, códigos de
                colores de resistencias y cálculo de resistencias para LEDs.
                Diseñada para estudiantes, técnicos y entusiastas de la
                electrónica.
              </p>

              {/* 📢 Ad Unit — TOP (debajo del menú) */}
              <div className="w-full min-h-[90px]">
                <AdBanner slot="3756475501" format="horizontal" className="mx-auto" />
              </div>

              <Accordion type="multiple" className="w-full space-y-4 text-left">
                {CATEGORIES.map((cat) => (
                  <AccordionItem
                    key={cat.id}
                    value={cat.id}
                    className="rounded-xl overflow-hidden glass border-neon neon-glow neon-glow-hover transition-all duration-500 ease-out"
                  >
                    <AccordionTrigger className="px-5 py-4 text-lg font-display font-bold text-foreground hover:no-underline hover:text-accent transition-all duration-300 [&[data-state=open]]:text-accent [&[data-state=open]]:bg-accent/5">
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        {cat.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                      <div className="grid gap-1.5">
                        {cat.tools.map((tool) =>
                          tool.id.startsWith("link:") ? (
                            <Link
                              key={tool.id}
                              to={tool.id.replace("link:", "")}
                              className="block"
                            >
                              <Button
                                variant="ghost"
                                size="lg"
                                className="w-full justify-start text-base font-mono gap-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-200"
                              >
                                {tool.label}
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              key={tool.id}
                              variant="ghost"
                              size="lg"
                              className="w-full justify-start text-base font-mono gap-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-200"
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

              {/* 🔧 Laboratorio Pro */}
              <LabProRecommendations />

              {/* 📢 Ad Unit — MEDIO */}
              <div className="w-full min-h-[250px]">
                <AdBanner slot="3756475501" format="rectangle" className="mx-auto" />
              </div>

              {/* 🛒 Herramientas Recomendadas */}
              <section className="text-left space-y-6">
                <h2 className="text-2xl font-display font-bold text-foreground text-center">
                  🛠️ Herramientas <span className="text-accent">Recomendadas</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RECOMMENDED_TOOLS.map((tool) => (
                    <div
                      key={tool.title}
                      className="rounded-xl glass border-neon neon-glow overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.2)]"
                    >
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-40 object-cover"
                        loading="lazy"
                        width={512}
                        height={512}
                      />
                      <div className="p-4 space-y-3">
                        <h3 className="font-display font-bold text-foreground">{tool.title}</h3>
                        <p className="text-muted-foreground text-sm">{tool.description}</p>
                        <div className="flex flex-col gap-2">
                          <a
                            href={tool.mlLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-display font-bold text-sm transition-all duration-200 bg-[hsl(50_100%_50%)] text-[hsl(220_80%_25%)] hover:bg-[hsl(50_100%_55%)] hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Ver precio en Mercado Libre
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={tool.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-display font-bold text-sm transition-all duration-200 bg-[hsl(0_0%_10%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(0_0%_15%)] hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Ver en Amazon
                            <span className="text-[hsl(30_100%_50%)]">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Amazon affiliate - styled button */}
              <a
                href="https://www.amazon.es/b?node=95175938031&linkCode=ll2&tag=electrolabpro-21&linkId=14708c1f7f2b404c346c65c73385a951&ref_=as_li_ss_tl"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border-neon neon-glow transition-all duration-300 hover:shadow-[0_8px_30px_hsl(38_92%_55%/0.25)] hover:-translate-y-0.5"
              >
                <span className="text-sm font-display font-semibold uppercase tracking-wider text-primary">
                  🛒 Tienda de Electrónica en Amazon
                </span>
              </a>

              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
                Estas calculadoras permiten resolver cálculos comunes en
                electrónica de forma rápida desde el celular o la computadora.
              </p>
            </div>
          )}

          {moduloActivo !== "menu" && (
            <div>
              {volverAlMenu}
              {renderTool(moduloActivo)}
              <ShareButtons />
              {moduloActivo !== "reactancia" && (
                <AdBanner slot="3756475501" className="mt-6" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🔬 Laboratorio Recomendado */}
      <section className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-xl border border-border/60 bg-muted/20 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-lg md:text-xl font-display font-bold text-foreground">
            🔬 Laboratorio Recomendado
          </h2>
          <p className="text-base font-semibold text-foreground">
            Explora las Mejores Herramientas de Medición
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Seleccionamos para ti los multímetros, osciloscopios y herramientas con la mejor relación calidad-precio del mercado.
          </p>
          <a
            href="https://www.amazon.es/b?node=95175938031&linkCode=ll2&tag=electrolabpro-21&linkId=14708c1f7f2b404c346c65c73385a951&ref_=as_li_ss_tl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[hsl(30_100%_50%)] text-white font-semibold text-sm shadow-md hover:bg-[hsl(30_100%_45%)] hover:shadow-lg transition-all duration-200"
          >
            Ver Ofertas en Amazon
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 📢 Ad Unit — FOOTER */}
      <div className="w-full max-w-2xl mx-auto px-4 pb-4">
        <AdBanner slot="3756475501" format="horizontal" className="mx-auto" />
      </div>

      <footer className="w-full py-6 border-t border-border bg-background/50">
        <div className="container mx-auto px-4 text-center">
          <p
            className="text-muted-foreground text-sm tracking-wide mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            © 2026 ElectroLab Pro | Diseñado por{" "}
            <span className="font-semibold">J.A. Sanchez</span>
          </p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <Link
              to="/privacidad"
              className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors"
            >
              Privacidad
            </Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link
              to="/aviso-legal"
              className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors"
            >
              Aviso Legal
            </Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link
              to="/contacto"
              className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors"
            >
              Contacto
            </Link>
          </div>
          <a
            href="mailto:contacto@electrolabpro.com"
            className="text-muted-foreground/60 text-[10px] hover:text-foreground transition-colors block mb-3"
          >
            contacto@electrolabpro.com
          </a>
          <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic">
            "En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables."
          </p>
        </div>
      </footer>
    </div>
  );
}
