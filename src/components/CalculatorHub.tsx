import { useState, useRef, useEffect } from "react";
import {
  Zap, Lightbulb, Palette, Divide, Filter, Timer,
  Hash, Activity, Ruler, Cpu, ArrowDown, Sparkles
} from "lucide-react";
import ResistorCalculator from "@/components/ResistorCalculator";
import OhmCalculator from "@/components/OhmCalculator";
import LedCalculator from "@/components/LedCalculator";
import VoltageDividerCalculator from "@/components/VoltageDividerCalculator";
import RCFilterCalculator from "@/components/RCFilterCalculator";
import Timer555Calculator from "@/components/Timer555Calculator";
import SmdDecoderCalculator from "@/components/SmdDecoderCalculator";
import CapacitiveReactanceCalculator from "@/components/CapacitiveReactanceCalculator";
import UnitConverter from "@/components/UnitConverter";

type ToolKey =
  | "resistor"
  | "ohm"
  | "led"
  | "divider"
  | "rc"
  | "timer"
  | "smd"
  | "reactance"
  | "units";

interface ToolDef {
  key: ToolKey;
  label: string;
  symbol: string;          // símbolo grande estilo tecla
  desc: string;
  icon: React.ReactNode;
  formula: string;
}

const TOOLS: ToolDef[] = [
  { key: "resistor", label: "Resistencias",       symbol: "Ω",   desc: "Decodificá 4 y 5 bandas de colores.",   icon: <Palette  className="w-4 h-4" />, formula: "color → valor" },
  { key: "ohm",      label: "Ley de Ohm",         symbol: "V=IR",desc: "Voltaje, corriente y resistencia.",     icon: <Zap      className="w-4 h-4" />, formula: "V = I × R" },
  { key: "led",      label: "Resistencia LED",    symbol: "💡",  desc: "Calculá la R en serie para tu LED.",    icon: <Lightbulb className="w-4 h-4" />, formula: "R = (Vs − Vled)/I" },
  { key: "divider",  label: "Divisor de Voltaje", symbol: "÷",   desc: "Calculá Vout con dos resistencias.",    icon: <Divide   className="w-4 h-4" />, formula: "Vo = Vi·R₂/(R₁+R₂)" },
  { key: "rc",       label: "Filtro RC",          symbol: "ƒc",  desc: "Frecuencia de corte de un filtro.",     icon: <Filter   className="w-4 h-4" />, formula: "fc = 1/(2π·R·C)" },
  { key: "timer",    label: "555 Timer",          symbol: "555", desc: "Astable: frecuencia y duty cycle.",     icon: <Timer    className="w-4 h-4" />, formula: "f = 1.44/((R₁+2R₂)·C)" },
  { key: "smd",      label: "Código SMD",         symbol: "#",   desc: "Decodificá resistencias SMD 3 y 4 dígitos.", icon: <Hash className="w-4 h-4" />, formula: "ABC → AB·10^C" },
  { key: "reactance",label: "Reactancia Xc",      symbol: "Xc",  desc: "Reactancia de un capacitor en AC.",     icon: <Activity className="w-4 h-4" />, formula: "Xc = 1/(2π·f·C)" },
  { key: "units",    label: "Conversor Unidades", symbol: "μ→k", desc: "mΩ, kΩ, MΩ, μF, nF, pF, mA…",           icon: <Ruler    className="w-4 h-4" />, formula: "× 10ⁿ" },
];

const ToolPanel = ({ tool }: { tool: ToolKey }) => {
  switch (tool) {
    case "resistor":  return <ResistorCalculator />;
    case "ohm":       return <OhmCalculator />;
    case "led":       return <LedCalculator />;
    case "divider":   return <VoltageDividerCalculator />;
    case "rc":        return <RCFilterCalculator />;
    case "timer":     return <Timer555Calculator />;
    case "smd":       return <SmdDecoderCalculator />;
    case "reactance": return <CapacitiveReactanceCalculator />;
    case "units":     return <UnitConverter />;
    default: return null;
  }
};

const CalculatorHub = () => {
  const [active, setActive] = useState<ToolKey>("resistor");
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const activeTool = TOOLS.find((t) => t.key === active)!;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.innerWidth < 1024 && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  return (
    <div className="relative">
      {/* Glow neón de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, hsl(var(--primary) / 0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, hsl(190 95% 55% / 0.08), transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[11px] font-mono font-semibold tracking-[0.15em] uppercase mb-4">
          <Sparkles className="w-3 h-3" />
          Calculator Hub · v1.0
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Tu <span className="text-primary">Calculadora</span> Todo-en-Uno
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Tocá una tecla y la herramienta se abre al instante.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-10">
        {/* ═══ CALCULADORA FÍSICA (PANEL IZQUIERDO) ═══ */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="relative rounded-[28px] p-4 sm:p-5"
            style={{
              background:
                "linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--accent)) 100%)",
              boxShadow:
                "0 30px 60px -20px hsl(var(--primary) / 0.25), 0 10px 25px -5px hsl(var(--foreground) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.08), inset 0 -2px 0 hsl(var(--foreground) / 0.06)",
              border: "1px solid hsl(var(--border))",
            }}
          >
            {/* Brand bar superior (atornillada) */}
            <div className="flex items-center justify-between px-2 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "hsl(var(--border))",
                    boxShadow: "inset 0 1px 1px hsl(var(--foreground)/0.3)",
                  }}
                />
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-muted-foreground">
                  ELECTROLAB·HUB
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))] animate-pulse" />
                <span className="font-mono text-[9px] tracking-wider text-muted-foreground">PWR</span>
              </div>
            </div>

            {/* PANTALLA LCD con relieve hundido */}
            <div
              className="rounded-2xl px-4 py-4 mb-4"
              style={{
                background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--accent)) 100%)",
                boxShadow:
                  "inset 0 4px 8px hsl(var(--foreground) / 0.18), inset 0 -1px 0 hsl(0 0% 100% / 0.05)",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  ▸ MODO ACTIVO
                </span>
                <span className="font-mono text-[9px] text-primary tracking-wider">ON</span>
              </div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
                {activeTool.label}
              </div>
              <div className="font-mono text-xs text-primary mt-1.5 truncate">
                {activeTool.formula}
              </div>
            </div>

            {/* GRID DE TECLAS 3 × 3 con relieve real */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {TOOLS.map((tool) => {
                const isActive = tool.key === active;
                return (
                  <button
                    key={tool.key}
                    onClick={() => setActive(tool.key)}
                    aria-label={`Abrir ${tool.label}`}
                    aria-pressed={isActive}
                    className="group relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 select-none transition-all duration-150 active:translate-y-[2px]"
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)",
                            boxShadow:
                              "inset 0 2px 4px hsl(var(--foreground) / 0.25), 0 0 24px -4px hsl(var(--primary) / 0.6), 0 0 0 1px hsl(var(--primary) / 0.4)",
                            color: "hsl(var(--primary-foreground))",
                            transform: "translateY(2px)",
                          }
                        : {
                            background:
                              "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--accent)) 100%)",
                            boxShadow:
                              "0 4px 0 hsl(var(--border)), 0 5px 8px -2px hsl(var(--foreground) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.6), inset 0 -1px 0 hsl(var(--foreground) / 0.05)",
                            border: "1px solid hsl(var(--border))",
                          }
                    }
                  >
                    {/* Símbolo grande tipo tecla */}
                    <span
                      className={`font-mono font-extrabold leading-none ${
                        tool.symbol.length > 2 ? "text-base sm:text-lg" : "text-2xl sm:text-3xl"
                      } ${isActive ? "" : "text-foreground"}`}
                      style={
                        isActive
                          ? { textShadow: "0 1px 2px hsl(var(--foreground) / 0.3)" }
                          : { textShadow: "0 1px 0 hsl(0 0% 100% / 0.6)" }
                      }
                    >
                      {tool.symbol}
                    </span>

                    {/* Etiqueta inferior */}
                    <span
                      className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase leading-none px-1 text-center ${
                        isActive ? "opacity-95" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {tool.icon && (
                        <span className="inline-block align-middle mr-0.5">
                          {tool.icon}
                        </span>
                      )}
                    </span>

                    {/* Brillo superior (highlight) */}
                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1 left-1 right-1 h-1/3 rounded-t-lg opacity-40"
                        style={{
                          background:
                            "linear-gradient(180deg, hsl(0 0% 100% / 0.6) 0%, transparent 100%)",
                        }}
                      />
                    )}

                    {/* Indicador LED activo */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary-foreground shadow-[0_0_6px_hsl(var(--primary-foreground))] animate-pulse"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer descriptivo (estilo placa) */}
            <div
              className="mt-4 px-3 py-2.5 rounded-lg"
              style={{
                background: "hsl(var(--background) / 0.5)",
                border: "1px solid hsl(var(--border))",
                boxShadow: "inset 0 1px 2px hsl(var(--foreground) / 0.05)",
              }}
            >
              <p className="text-[11px] text-muted-foreground leading-snug text-center">
                <span className="font-bold text-foreground">{activeTool.label}:</span>{" "}
                {activeTool.desc}
              </p>
            </div>

            {/* Tornillos decorativos */}
            <div aria-hidden="true" className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(var(--muted-foreground)/0.6), hsl(var(--border)))",
                boxShadow: "inset 0 1px 1px hsl(var(--foreground)/0.4)",
              }}
            />
            <div aria-hidden="true" className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(var(--muted-foreground)/0.6), hsl(var(--border)))",
                boxShadow: "inset 0 1px 1px hsl(var(--foreground)/0.4)",
              }}
            />
            <div aria-hidden="true" className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(var(--muted-foreground)/0.6), hsl(var(--border)))",
                boxShadow: "inset 0 1px 1px hsl(var(--foreground)/0.4)",
              }}
            />
            <div aria-hidden="true" className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(var(--muted-foreground)/0.6), hsl(var(--border)))",
                boxShadow: "inset 0 1px 1px hsl(var(--foreground)/0.4)",
              }}
            />
          </div>

          {/* Hint mobile */}
          <p className="lg:hidden mt-3 text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-1.5 w-full">
            <ArrowDown className="w-3 h-3 animate-bounce" />
            La calculadora aparece debajo
          </p>
        </div>

        {/* ═══ PANEL DERECHO: HERRAMIENTA ACTIVA ═══ */}
        <div ref={panelRef} className="min-w-0 scroll-mt-24">
          <div className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6 transition-opacity duration-300 animate-in fade-in">
            <ToolPanel tool={active} />
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-5 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="text-primary">✔</span> Resultado automático</span>
            <span className="inline-flex items-center gap-1.5"><span className="text-primary">✔</span> Explicación simple</span>
            <span className="inline-flex items-center gap-1.5"><span className="text-primary">✔</span> 100% gratis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorHub;
