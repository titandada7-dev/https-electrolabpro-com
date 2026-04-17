import { useState, useRef, useEffect } from "react";
import {
  Zap, Lightbulb, Palette, Divide, Filter, Timer,
  Hash, Activity, Ruler, Cpu, ArrowRight, Sparkles
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
  short: string;
  desc: string;
  icon: React.ReactNode;
  formula: string;
}

const TOOLS: ToolDef[] = [
  { key: "resistor", label: "Resistencias", short: "RES", desc: "Decodificá 4 y 5 bandas de colores.", icon: <Palette className="w-5 h-5" />, formula: "Ω · color → valor" },
  { key: "ohm", label: "Ley de Ohm", short: "Ω", desc: "Voltaje, corriente y resistencia.", icon: <Zap className="w-5 h-5" />, formula: "V = I × R" },
  { key: "led", label: "Resistencia LED", short: "LED", desc: "Calculá la R en serie para tu LED.", icon: <Lightbulb className="w-5 h-5" />, formula: "R = (Vs − Vled) / I" },
  { key: "divider", label: "Divisor de Voltaje", short: "DIV", desc: "Calculá Vout con dos resistencias.", icon: <Divide className="w-5 h-5" />, formula: "Vout = Vin · R2/(R1+R2)" },
  { key: "rc", label: "Filtro RC", short: "RC", desc: "Frecuencia de corte de un filtro.", icon: <Filter className="w-5 h-5" />, formula: "fc = 1 / (2π·R·C)" },
  { key: "timer", label: "555 Timer", short: "555", desc: "Astable: frecuencia y duty cycle.", icon: <Timer className="w-5 h-5" />, formula: "f = 1.44/((R1+2R2)·C)" },
  { key: "smd", label: "Código SMD", short: "SMD", desc: "Decodificá resistencias SMD 3 y 4 dígitos.", icon: <Hash className="w-5 h-5" />, formula: "ABC → AB × 10^C" },
  { key: "reactance", label: "Reactancia Capacitiva", short: "Xc", desc: "Reactancia de un capacitor en AC.", icon: <Activity className="w-5 h-5" />, formula: "Xc = 1 / (2π·f·C)" },
  { key: "units", label: "Conversor de Unidades", short: "U/Σ", desc: "mΩ, kΩ, MΩ, μF, nF, pF, mA…", icon: <Ruler className="w-5 h-5" />, formula: "× 10ⁿ" },
];

const ToolPanel = ({ tool }: { tool: ToolKey }) => {
  switch (tool) {
    case "resistor": return <ResistorCalculator />;
    case "ohm": return <OhmCalculator />;
    case "led": return <LedCalculator />;
    case "divider": return <VoltageDividerCalculator />;
    case "rc": return <RCFilterCalculator />;
    case "timer": return <Timer555Calculator />;
    case "smd": return <SmdDecoderCalculator />;
    case "reactance": return <CapacitiveReactanceCalculator />;
    case "units": return <UnitConverter />;
    default: return null;
  }
};

const CalculatorHub = () => {
  const [active, setActive] = useState<ToolKey>("resistor");
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const activeTool = TOOLS.find((t) => t.key === active)!;

  // En mobile: hacer scroll suave al panel cuando se cambia de herramienta
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
      {/* Glow neón sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, hsl(var(--primary) / 0.08), transparent 70%), radial-gradient(50% 40% at 80% 70%, hsl(190 95% 55% / 0.06), transparent 70%)",
        }}
      />

      {/* Header del Hub */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[11px] font-mono font-semibold tracking-[0.15em] uppercase mb-4">
          <Sparkles className="w-3 h-3" />
          Calculator Hub · v1.0
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Tu <span className="text-primary">Calculadora</span> Todo-en-Uno
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Tocá un botón y la herramienta se abre al instante. Sin búsquedas, sin scroll infinito.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
        {/* ═══ PANEL IZQUIERDO: CALCULADORA-MENÚ ═══ */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
            {/* Header tipo "device" */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-card to-accent/30">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs font-bold tracking-wider text-foreground">ELECTROLAB·HUB</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(var(--primary)/0.6)] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-primary/40" />
                <span className="w-2 h-2 rounded-full bg-primary/20" />
              </div>
            </div>

            {/* Pantalla LCD */}
            <div className="px-4 py-4 border-b border-border bg-gradient-to-br from-foreground/[0.02] to-primary/[0.04]">
              <div className="rounded-lg border border-primary/20 bg-background/60 backdrop-blur px-4 py-3">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  ▸ Activo
                </div>
                <div className="font-display text-lg font-bold text-foreground leading-tight">
                  {activeTool.label}
                </div>
                <div className="font-mono text-[11px] text-primary mt-1">
                  {activeTool.formula}
                </div>
              </div>
            </div>

            {/* Grid de botones (3 cols) */}
            <div className="p-3 grid grid-cols-3 gap-2">
              {TOOLS.map((tool) => {
                const isActive = tool.key === active;
                return (
                  <button
                    key={tool.key}
                    onClick={() => setActive(tool.key)}
                    aria-label={`Abrir ${tool.label}`}
                    aria-pressed={isActive}
                    className={`group relative flex flex-col items-center justify-center gap-1.5 aspect-square rounded-xl border text-center transition-all duration-200 min-h-[88px] ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_-4px_hsl(var(--primary)/0.5)]"
                        : "border-border bg-card hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "bg-accent text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                      }`}
                    >
                      {tool.icon}
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-wider leading-none">
                      {tool.short}
                    </span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))] animate-pulse"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer descriptivo */}
            <div className="px-4 py-3 border-t border-border bg-accent/30">
              <p className="text-xs text-muted-foreground leading-snug">
                <span className="font-semibold text-foreground">{activeTool.label}:</span>{" "}
                {activeTool.desc}
              </p>
            </div>
          </div>

          {/* Hint mobile */}
          <p className="lg:hidden mt-3 text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-1.5 w-full">
            <ArrowRight className="w-3 h-3 rotate-90" />
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
