import { useState, useRef, useEffect } from "react";
import {
  Zap, Lightbulb, Palette, Divide, Filter, Timer,
  Hash, Activity, Ruler, ArrowDown, Sparkles
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
import { ToolSeoSection } from "@/data/toolSeoContent";

type ToolKey =
  | "resistor" | "ohm" | "led" | "divider" | "rc"
  | "timer" | "smd" | "reactance" | "units";

type ThemeKey = "blue" | "green" | "red";

interface ToolDef {
  key: ToolKey;
  label: string;
  symbol: string;
  desc: string;
  icon: React.ReactNode;
  formula: string;
  /** Bullets cortos con consejos prácticos / contexto técnico */
  tips: string[];
  /** Caso de uso real para mostrar bajo el panel */
  useCase: string;
}

const TOOLS: ToolDef[] = [
  {
    key: "resistor", label: "Resistencias", symbol: "Ω",
    desc: "Decodificá 4 y 5 bandas de colores.",
    icon: <Palette className="w-4 h-4" />, formula: "color → valor",
    tips: [
      "4 bandas: 2 dígitos + multiplicador + tolerancia.",
      "5 bandas: 3 dígitos + multiplicador + tolerancia (más precisión).",
      "Lee siempre desde la banda más cercana al borde.",
    ],
    useCase: "Útil cuando reemplazás una resistencia quemada en una placa y solo tenés sus colores.",
  },
  {
    key: "ohm", label: "Ley de Ohm", symbol: "V=IR",
    desc: "Voltaje, corriente y resistencia.",
    icon: <Zap className="w-4 h-4" />, formula: "V = I × R",
    tips: [
      "Conocés 2 valores → calculás el tercero.",
      "Potencia: P = V × I (en watts).",
      "Mantené el consumo por debajo del 70% de la potencia nominal.",
    ],
    useCase: "Base de todo cálculo eléctrico: dimensionar fuentes, fusibles y resistencias en serie.",
  },
  {
    key: "led", label: "Resistencia LED", symbol: "LED",
    desc: "Calculá la R en serie para tu LED.",
    icon: <Lightbulb className="w-4 h-4" />, formula: "R = (Vs − Vled) / I",
    tips: [
      "LED rojo ≈ 2.0V · verde/amarillo ≈ 2.2V · azul/blanco ≈ 3.2V.",
      "Corriente típica: 10–20 mA para LEDs estándar 5mm.",
      "Elegí una resistencia de potencia ≥ 2× la calculada.",
    ],
    useCase: "Imprescindible para no quemar LEDs al conectarlos a 5V, 9V o 12V.",
  },
  {
    key: "divider", label: "Divisor de Voltaje", symbol: "÷",
    desc: "Calculá Vout con dos resistencias.",
    icon: <Divide className="w-4 h-4" />, formula: "Vo = Vi · R₂ / (R₁+R₂)",
    tips: [
      "Sirve para reducir señales antes de un ADC (ej: 12V → 3.3V).",
      "No uses divisores para alimentar cargas: caen bajo corriente.",
      "Usá resistencias del orden de kΩ para no desperdiciar energía.",
    ],
    useCase: "Adaptar un sensor de batería de 12V para que un Arduino o ESP32 lo lea con seguridad.",
  },
  {
    key: "rc", label: "Filtro RC", symbol: "ƒc",
    desc: "Frecuencia de corte de un filtro.",
    icon: <Filter className="w-4 h-4" />, formula: "fc = 1 / (2π · R · C)",
    tips: [
      "Pasa-bajos: deja pasar señales lentas (DC, audio grave).",
      "Pasa-altos: bloquea DC, deja pasar agudos.",
      "Pendiente: -20 dB por década (filtro de 1er orden).",
    ],
    useCase: "Quitar ruido de fuentes, suavizar PWM o filtrar señales de audio.",
  },
  {
    key: "timer", label: "555 Timer", symbol: "555",
    desc: "Astable: frecuencia y duty cycle.",
    icon: <Timer className="w-4 h-4" />, formula: "f = 1.44 / ((R₁+2R₂) · C)",
    tips: [
      "Modo astable = oscilador continuo (LEDs, buzzers, PWM).",
      "Modo monoestable = pulso único de duración fija.",
      "Para duty 50% usá un diodo entre R₁ y el pin de descarga.",
    ],
    useCase: "Generar señales de reloj, parpadeos, alarmas o PWM sin microcontrolador.",
  },
  {
    key: "smd", label: "Código SMD", symbol: "#",
    desc: "Decodificá resistencias SMD de 3 y 4 dígitos.",
    icon: <Hash className="w-4 h-4" />, formula: "ABC → AB · 10^C",
    tips: [
      "3 dígitos: ‘472’ = 47 · 10² = 4.7 kΩ.",
      "4 dígitos: ‘4701’ = 470 · 10¹ = 4.7 kΩ (precisión 1%).",
      "Letra R = punto decimal: ‘4R7’ = 4.7 Ω.",
    ],
    useCase: "Identificar componentes diminutos al reparar placas modernas (móviles, drones, PCBs SMD).",
  },
  {
    key: "reactance", label: "Reactancia Xc", symbol: "Xc",
    desc: "Reactancia de un capacitor en AC.",
    icon: <Activity className="w-4 h-4" />, formula: "Xc = 1 / (2π · f · C)",
    tips: [
      "A más frecuencia, menor Xc (deja pasar más AC).",
      "En DC (f=0) un capacitor es un circuito abierto.",
      "Útil para diseñar filtros, acoplos y desacoples.",
    ],
    useCase: "Calcular el valor de capacitor para acoplar etapas de audio o filtrar fuentes conmutadas.",
  },
  {
    key: "units", label: "Conversor Unidades", symbol: "μ→k",
    desc: "mΩ, kΩ, MΩ, μF, nF, pF, mA…",
    icon: <Ruler className="w-4 h-4" />, formula: "× 10ⁿ",
    tips: [
      "1 kΩ = 1000 Ω · 1 MΩ = 1.000.000 Ω.",
      "1 μF = 1000 nF = 1.000.000 pF.",
      "1 A = 1000 mA = 1.000.000 μA.",
    ],
    useCase: "Convertir rápidamente entre unidades cuando leés un datasheet o esquemático.",
  },
];

// Tema scoped al hub: cada uno define HSL para "accent" + "glow"
const THEMES: Record<ThemeKey, { name: string; accent: string; accentSoft: string; ring: string; label: string }> = {
  blue:  { name: "Azul",  accent: "217 91% 60%",  accentSoft: "217 91% 60% / 0.15", ring: "217 91% 60%",  label: "AZL" },
  green: { name: "Verde", accent: "152 76% 44%",  accentSoft: "152 76% 44% / 0.15", ring: "152 76% 44%",  label: "VRD" },
  red:   { name: "Rojo",  accent: "0 84% 60%",    accentSoft: "0 84% 60% / 0.15",   ring: "0 84% 60%",    label: "RJO" },
};

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
  const [theme, setTheme] = useState<ThemeKey>("blue");
  const [bootStep, setBootStep] = useState(0); // 0=off, 1=lcd flicker, 2=keys lighting up, 3=ready
  const [litKeyIndex, setLitKeyIndex] = useState(-1);
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasBooted = useRef(false);

  const activeTool = TOOLS.find((t) => t.key === active)!;
  const t = THEMES[theme];

  // Animación de encendido al entrar en viewport
  useEffect(() => {
    if (!containerRef.current || hasBooted.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasBooted.current) {
            hasBooted.current = true;
            obs.disconnect();
            // Secuencia: 1) LCD parpadea, 2) teclas se iluminan en cascada, 3) listo
            setBootStep(1);
            setTimeout(() => setBootStep(2), 450);
            // Cascada de teclas (50ms por tecla)
            TOOLS.forEach((_, i) => {
              setTimeout(() => setLitKeyIndex(i), 450 + i * 55);
            });
            setTimeout(() => {
              setLitKeyIndex(-1);
              setBootStep(3);
            }, 450 + TOOLS.length * 55 + 200);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll al panel al cambiar tecla en mobile
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.innerWidth < 1024 && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  // Estilos dinámicos según tema (sólo afectan al hub)
  const accentBg     = `hsl(${t.accent})`;
  const accentSoftBg = `hsl(${t.accentSoft})`;
  const accentGlow   = `hsl(${t.accent} / 0.6)`;

  return (
    <div ref={containerRef} className="relative">
      {/* Glow de fondo (cambia con el tema) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-500"
        style={{
          background: `radial-gradient(60% 50% at 20% 30%, hsl(${t.accent} / 0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, hsl(${t.accent} / 0.08), transparent 70%)`,
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

      <div className="mx-auto w-full max-w-[1180px] grid grid-cols-1 lg:grid-cols-[360px_minmax(0,720px)] gap-6 lg:gap-8 justify-center">
        {/* ═══ CALCULADORA FÍSICA ═══ */}
        <div className="lg:sticky lg:top-24 lg:self-start mx-auto w-full max-w-[420px] lg:max-w-none">
          <div
            className="relative rounded-[28px] p-4 sm:p-5"
            style={{
              background: "linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--accent)) 100%)",
              boxShadow: `0 30px 60px -20px ${accentGlow}, 0 10px 25px -5px hsl(var(--foreground) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.08), inset 0 -2px 0 hsl(var(--foreground) / 0.06)`,
              border: "1px solid hsl(var(--border))",
            }}
          >
            {/* Brand bar + selector de tema */}
            <div className="flex items-center justify-between px-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full"
                  style={{ background: "hsl(var(--border))", boxShadow: "inset 0 1px 1px hsl(var(--foreground)/0.3)" }}
                />
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-foreground/80">
                  ELECTROLAB·HUB
                </span>
              </div>
              {/* Selector de color como mini-LEDs */}
              <div className="flex items-center gap-1.5" role="group" aria-label="Color de teclas">
                {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
                  const isOn = k === theme;
                  return (
                    <button
                      key={k}
                      onClick={() => setTheme(k)}
                      aria-label={`Tema ${THEMES[k].name}`}
                      aria-pressed={isOn}
                      title={`Color: ${THEMES[k].name}`}
                      className="relative w-3 h-3 rounded-full transition-all duration-200 hover:scale-125"
                      style={{
                        background: isOn ? `hsl(${THEMES[k].accent})` : `hsl(${THEMES[k].accent} / 0.25)`,
                        boxShadow: isOn
                          ? `0 0 8px hsl(${THEMES[k].accent}), inset 0 0 2px hsl(0 0% 100% / 0.3)`
                          : "inset 0 1px 1px hsl(var(--foreground) / 0.3)",
                      }}
                    />
                  );
                })}
                <span className="ml-1 font-mono text-[9px] tracking-wider text-foreground/75 w-7 text-center">
                  {t.label}
                </span>
              </div>
            </div>

            {/* PANTALLA LCD — con animación de encendido */}
            <div
              className="rounded-2xl px-4 py-4 mb-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--accent)) 100%)",
                boxShadow: "inset 0 4px 8px hsl(var(--foreground) / 0.18), inset 0 -1px 0 hsl(0 0% 100% / 0.05)",
                border: "1px solid hsl(var(--border))",
              }}
            >
              {/* Flicker overlay durante boot */}
              {bootStep === 1 && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: accentBg,
                    animation: "lcd-flicker 0.45s ease-in-out",
                  }}
                />
              )}
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  ▸ MODO ACTIVO
                </span>
                <span className="font-mono text-[9px] tracking-wider" style={{ color: accentBg }}>
                  {bootStep < 3 ? "BOOT" : "ON"}
                </span>
              </div>
              <div
                className="font-display text-xl sm:text-2xl font-extrabold text-foreground leading-tight transition-opacity duration-300"
                style={{ opacity: bootStep < 2 ? 0.3 : 1 }}
              >
                {bootStep === 0 ? "—" : bootStep === 1 ? "INIT…" : activeTool.label}
              </div>
              <div
                className="font-mono text-xs mt-1.5 truncate transition-opacity duration-300"
                style={{ color: accentBg, opacity: bootStep < 3 ? 0.4 : 1 }}
              >
                {bootStep < 2 ? "0x00 LOADING" : activeTool.formula}
              </div>
            </div>

            {/* GRID DE TECLAS */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {TOOLS.map((tool, i) => {
                const isActive = tool.key === active && bootStep === 3;
                const isLighting = i === litKeyIndex;
                return (
                  <button
                    key={tool.key}
                    onClick={() => bootStep === 3 && setActive(tool.key)}
                    disabled={bootStep !== 3}
                    aria-label={`Abrir ${tool.label}`}
                    aria-pressed={isActive}
                    className="group relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 select-none transition-all duration-150 active:translate-y-[2px] disabled:cursor-default"
                    style={
                      isActive || isLighting
                        ? {
                            background: `linear-gradient(180deg, ${accentBg} 0%, hsl(${t.accent} / 0.85) 100%)`,
                            boxShadow: `inset 0 2px 4px hsl(var(--foreground) / 0.25), 0 0 24px -4px ${accentGlow}, 0 0 0 1px hsl(${t.accent} / 0.4)`,
                            color: "hsl(0 0% 100%)",
                            transform: isActive ? "translateY(2px)" : "translateY(0)",
                          }
                        : {
                            background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--accent)) 100%)",
                            boxShadow: "0 4px 0 hsl(var(--border)), 0 5px 8px -2px hsl(var(--foreground) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.6), inset 0 -1px 0 hsl(var(--foreground) / 0.05)",
                            border: "1px solid hsl(var(--border))",
                            opacity: bootStep < 2 ? 0.3 : 1,
                          }
                    }
                  >
                    <span
                      className={`font-mono font-extrabold leading-none ${
                        tool.symbol.length > 2 ? "text-base sm:text-lg" : "text-2xl sm:text-3xl"
                      } ${isActive || isLighting ? "" : "text-foreground"}`}
                      style={
                        isActive || isLighting
                          ? { textShadow: "0 1px 2px hsl(var(--foreground) / 0.3)" }
                          : { textShadow: "0 1px 0 hsl(0 0% 100% / 0.6)" }
                      }
                    >
                      {tool.symbol}
                    </span>
                    <span
                      className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase leading-none px-1 text-center ${
                        isActive || isLighting ? "opacity-95" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <span className="inline-block align-middle mr-0.5">{tool.icon}</span>
                    </span>
                    {!isActive && !isLighting && (
                      <span aria-hidden="true" className="pointer-events-none absolute top-1 left-1 right-1 h-1/3 rounded-t-lg opacity-40"
                        style={{ background: "linear-gradient(180deg, hsl(0 0% 100% / 0.6) 0%, transparent 100%)" }}
                      />
                    )}
                    {isActive && (
                      <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: "hsl(0 0% 100%)", boxShadow: "0 0 6px hsl(0 0% 100%)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer descriptivo */}
            <div className="mt-4 px-3 py-2.5 rounded-lg"
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

            {/* Tornillos */}
            {[
              "top-3 left-3", "top-3 right-3",
              "bottom-3 left-3", "bottom-3 right-3",
            ].map((pos) => (
              <div
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} w-2.5 h-2.5 rounded-full`}
                style={{
                  background: "radial-gradient(circle at 30% 30%, hsl(var(--muted-foreground)/0.6), hsl(var(--border)))",
                  boxShadow: "inset 0 1px 1px hsl(var(--foreground)/0.4)",
                }}
              />
            ))}
          </div>

          <p className="lg:hidden mt-3 text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-1.5 w-full">
            <ArrowDown className="w-3 h-3 animate-bounce" />
            La calculadora aparece debajo
          </p>
        </div>

        {/* ═══ PANEL DERECHO ═══ */}
        <div ref={panelRef} className="min-w-0 scroll-mt-24 w-full">
          {/* Encabezado contextual de la herramienta activa */}
          <div
            className="mb-4 rounded-2xl border border-border bg-card/60 backdrop-blur px-4 sm:px-5 py-3 flex items-center gap-3"
            style={{ boxShadow: `inset 0 0 0 1px hsl(${t.accent} / 0.08)` }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: `hsl(${t.accent} / 0.12)`,
                color: accentBg,
                border: `1px solid hsl(${t.accent} / 0.3)`,
              }}
            >
              {activeTool.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground leading-tight">
                  {activeTool.label}
                </h3>
                <span
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                  style={{
                    color: accentBg,
                    borderColor: `hsl(${t.accent} / 0.3)`,
                    background: `hsl(${t.accent} / 0.08)`,
                  }}
                >
                  {activeTool.formula}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-muted-foreground mt-0.5 leading-snug">
                {activeTool.desc}
              </p>
            </div>
          </div>

          {/* Calculadora real */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6 transition-opacity duration-300 animate-in fade-in">
            <ToolPanel tool={active} />
          </div>

          {/* Beneficios */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-4 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span style={{ color: accentBg }}>✔</span> Resultado automático</span>
            <span className="inline-flex items-center gap-1.5"><span style={{ color: accentBg }}>✔</span> Explicación simple</span>
            <span className="inline-flex items-center gap-1.5"><span style={{ color: accentBg }}>✔</span> 100% gratis</span>
          </div>

          {/* Tips + Caso de uso */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            <div
              className="sm:col-span-2 rounded-xl border border-border bg-card/60 p-4"
              style={{ boxShadow: `inset 0 0 0 1px hsl(${t.accent} / 0.06)` }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: accentBg }}
              >
                ▸ Tips rápidos
              </p>
              <ul className="space-y-1.5 text-sm text-foreground/90">
                {activeTool.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 leading-snug">
                    <span className="mt-1 inline-block w-1 h-1 rounded-full shrink-0"
                      style={{ background: accentBg, boxShadow: `0 0 4px ${accentGlow}` }}
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                ▸ Caso de uso
              </p>
              <p className="text-sm text-foreground/90 leading-snug">
                {activeTool.useCase}
              </p>
            </div>
          </div>

          {/* SEO content block — descripción extensa, ejemplos y enlaces internos */}
          <ToolSeoSection toolKey={active} />
        </div>
      </div>

      {/* Keyframes scoped */}
      <style>{`
        @keyframes lcd-flicker {
          0%   { opacity: 0; }
          15%  { opacity: 0.6; }
          25%  { opacity: 0.1; }
          40%  { opacity: 0.5; }
          60%  { opacity: 0.2; }
          80%  { opacity: 0.4; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CalculatorHub;
