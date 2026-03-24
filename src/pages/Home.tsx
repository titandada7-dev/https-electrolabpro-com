import { useState } from "react";
import { Link } from "react-router-dom";
import circuitBg from "@/assets/circuit-bg.jpg";
import LedCalculator from "../components/LedCalculator";
import OhmCalculator from "../components/OhmCalculator";
import ResistorCalculator from "../components/ResistorCalculator";
import VoltageDividerCalculator from "../components/VoltageDividerCalculator";
import Timer555Calculator from "../components/Timer555Calculator";
import SmdDecoderCalculator from "../components/SmdDecoderCalculator";
import ColorBandCalculator from "../components/ColorBandCalculator";
import CapacitiveReactanceCalculator from "../components/CapacitiveReactanceCalculator";
import RCFilterCalculator from "../components/RCFilterCalculator";
import UnitConverter from "../components/UnitConverter";
import AdBanner from "../components/AdBanner";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Zap, ArrowLeft } from "lucide-react";
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
              <h1 className="text-3xl md:text-4xl font-mono font-bold text-foreground flex items-center justify-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                ElectroLab Pro
              </h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                ElectroLab Pro es una herramienta online gratuita para realizar
                cálculos electrónicos rápidos como Ley de Ohm, códigos de
                colores de resistencias y cálculo de resistencias para LEDs.
                Diseñada para estudiantes, técnicos y entusiastas de la
                electrónica.
              </p>

              <Accordion type="multiple" className="w-full space-y-3 text-left">
                {CATEGORIES.map((cat) => (
                  <AccordionItem
                    key={cat.id}
                    value={cat.id}
                    className="border border-border/50 rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_25px_hsl(175_70%_45%/0.35),inset_0_0_15px_hsl(175_70%_45%/0.08)]"
                  >
                    <AccordionTrigger className="px-5 py-4 text-lg font-mono font-semibold text-foreground hover:no-underline hover:text-accent transition-colors [&[data-state=open]]:text-accent [&[data-state=open]]:shadow-[0_0_30px_hsl(175_70%_45%/0.4)]">
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        {cat.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                      <div className="grid gap-2">
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
                                className="w-full justify-start text-base font-mono gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
                              >
                                {tool.label}
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              key={tool.id}
                              variant="ghost"
                              size="lg"
                              className="w-full justify-start text-base font-mono gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
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

              <a
                href="https://www.amazon.es/b?node=95175938031&linkCode=ll2&tag=electrolabpro-21&linkId=14708c1f7f2b404c346c65c73385a951&ref_=as_li_ss_tl"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 p-3 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-center"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-primary">
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
              {moduloActivo !== "reactancia" && (
                <AdBanner slot="3756475501" className="mt-6" />
              )}
            </div>
          )}
        </div>
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
          <div className="flex items-center justify-center gap-4">
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
        </div>
      </footer>
    </div>
  );
}
