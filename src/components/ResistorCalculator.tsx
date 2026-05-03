import { useState, useMemo } from "react";

import { Info } from "lucide-react";

const BAND_COLORS = [
  { name: "Negro", color: "#000000", value: 0, multiplier: 1, textColor: "white" },
  { name: "Marrón", color: "#8B4513", value: 1, multiplier: 10, textColor: "white" },
  { name: "Rojo", color: "#FF0000", value: 2, multiplier: 100, textColor: "white" },
  { name: "Naranja", color: "#FF8C00", value: 3, multiplier: 1000, textColor: "black" },
  { name: "Amarillo", color: "#FFD700", value: 4, multiplier: 10000, textColor: "black" },
  { name: "Verde", color: "#22C55E", value: 5, multiplier: 100000, textColor: "white" },
  { name: "Azul", color: "#3B82F6", value: 6, multiplier: 1000000, textColor: "white" },
  { name: "Violeta", color: "#8B5CF6", value: 7, multiplier: 10000000, textColor: "white" },
  { name: "Gris", color: "#6B7280", value: 8, multiplier: 100000000, textColor: "white" },
  { name: "Blanco", color: "#FFFFFF", value: 9, multiplier: 1000000000, textColor: "black" },
];

const MULTIPLIER_EXTRAS = [
  { name: "Dorado", color: "#DAA520", value: null, multiplier: 0.1, textColor: "black" },
  { name: "Plateado", color: "#C0C0C0", value: null, multiplier: 0.01, textColor: "black" },
];

const ALL_MULTIPLIERS = [...BAND_COLORS, ...MULTIPLIER_EXTRAS];

const TOLERANCE_COLORS = [
  { name: "Dorado", color: "#DAA520", tolerance: "±5%", textColor: "black" },
  { name: "Plateado", color: "#C0C0C0", tolerance: "±10%", textColor: "black" },
  { name: "Marrón", color: "#8B4513", tolerance: "±1%", textColor: "white" },
  { name: "Rojo", color: "#FF0000", tolerance: "±2%", textColor: "white" },
  { name: "Verde", color: "#22C55E", tolerance: "±0.5%", textColor: "white" },
  { name: "Azul", color: "#3B82F6", tolerance: "±0.25%", textColor: "white" },
  { name: "Violeta", color: "#8B5CF6", tolerance: "±0.1%", textColor: "white" },
  { name: "Gris", color: "#6B7280", tolerance: "±0.05%", textColor: "white" },
];

function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000_000) return `${(ohms / 1_000_000_000).toFixed(ohms % 1_000_000_000 === 0 ? 0 : 1)} GΩ`;
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(ohms % 1_000_000 === 0 ? 0 : 1)} MΩ`;
  if (ohms >= 1_000) return `${(ohms / 1_000).toFixed(ohms % 1_000 === 0 ? 0 : 1)} kΩ`;
  if (ohms < 1) return `${(ohms * 1000).toFixed(1)} mΩ`;
  return `${parseFloat(ohms.toFixed(2))} Ω`;
}

function formatOhmsRaw(ohms: number): string {
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(ohms % 1_000_000 === 0 ? 0 : 2)} millones de Ohmios`;
  if (ohms >= 1_000) return `${(ohms / 1_000).toFixed(ohms % 1_000 === 0 ? 0 : 2)} mil Ohmios`;
  if (ohms < 1) return `${(ohms * 1000).toFixed(1)} miliohmios`;
  return `${parseFloat(ohms.toFixed(2))} Ohmios`;
}

function formatMultiplier(mult: number): string {
  if (mult >= 1_000_000) return `×${(mult / 1_000_000)}M`;
  if (mult >= 1_000) return `×${(mult / 1_000)}k`;
  if (mult < 1) return `×${mult}`;
  return `×${mult}`;
}

const STEPS = [
  { label: "Paso 1", subtitle: "Primera banda (1er dígito)", key: "band1" },
  { label: "Paso 2", subtitle: "Segunda banda (2do dígito)", key: "band2" },
  { label: "Paso 3", subtitle: "Multiplicador", key: "band3" },
  { label: "Paso 4", subtitle: "Tolerancia", key: "band4" },
] as const;

const ResistorCalculator = () => {
  const [band1, setBand1] = useState(1);
  const [band2, setBand2] = useState(0);
  const [band3, setBand3] = useState(2);
  const [band4, setBand4] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const resistance = useMemo(() => {
    return (BAND_COLORS[band1].value * 10 + BAND_COLORS[band2].value) * ALL_MULTIPLIERS[band3].multiplier;
  }, [band1, band2, band3]);

  const tolerance = TOLERANCE_COLORS[band4].tolerance;

  const stepConfigs = [
    { value: band1, setter: setBand1, options: BAND_COLORS, type: "digit" as const },
    { value: band2, setter: setBand2, options: BAND_COLORS, type: "digit" as const },
    { value: band3, setter: setBand3, options: ALL_MULTIPLIERS, type: "multiplier" as const },
    { value: band4, setter: setBand4, options: TOLERANCE_COLORS, type: "tolerance" as const },
  ];

  const handleSelect = (stepIndex: number, colorIndex: number) => {
    stepConfigs[stepIndex].setter(colorIndex);
    // Auto-advance to next step
    if (stepIndex < 3) setActiveStep(stepIndex + 1);
  };

  return (
    <section className="space-y-6 md:space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-foreground glow-text">
          Calculadora de Resistencias
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
          Sigue los 4 pasos para identificar el valor de tu resistencia
        </p>
        <p className="text-xs sm:text-sm">
          <a
            href="/guia-resistencias"
            className="text-primary hover:underline font-medium"
          >
            ¿No sabés qué valor usar? Mirá nuestra guía completa de resistencias →
          </a>
        </p>
      </div>

      {/* SVG Resistor - Interactive */}
      <div className="flex justify-center px-4">
        <svg viewBox="0 0 400 120" className="w-full max-w-md" aria-label="Representación visual de resistencia">
          <line x1="0" y1="60" x2="80" y2="60" stroke="hsl(215, 12%, 50%)" strokeWidth="3" />
          <line x1="320" y1="60" x2="400" y2="60" stroke="hsl(215, 12%, 50%)" strokeWidth="3" />
          <rect x="80" y="20" width="240" height="80" rx="40" ry="40"
            fill="hsl(30, 30%, 22%)" stroke="hsl(30, 20%, 35%)" strokeWidth="2" />
          <ellipse cx="200" cy="45" rx="100" ry="18" fill="hsl(30, 25%, 28%)" opacity="0.5" />

          {/* Band 1 */}
          <rect x="120" y="22" width="16" height="76" rx="2"
            fill={BAND_COLORS[band1].color} className="transition-all duration-300"
            stroke={activeStep === 0 ? "hsl(199, 89%, 60%)" : "none"} strokeWidth={activeStep === 0 ? 2 : 0}>
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
          </rect>

          {/* Band 2 */}
          <rect x="160" y="22" width="16" height="76" rx="2"
            fill={BAND_COLORS[band2].color} className="transition-all duration-300"
            stroke={activeStep === 1 ? "hsl(199, 89%, 60%)" : "none"} strokeWidth={activeStep === 1 ? 2 : 0}>
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </rect>

          {/* Band 3 - Multiplier */}
          <rect x="200" y="22" width="16" height="76" rx="2"
            fill={ALL_MULTIPLIERS[band3].color} className="transition-all duration-300"
            stroke={activeStep === 2 ? "hsl(199, 89%, 60%)" : "none"} strokeWidth={activeStep === 2 ? 2 : 0}>
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" begin="1s" repeatCount="indefinite" />
          </rect>

          {/* Band 4 - Tolerance */}
          <rect x="260" y="22" width="16" height="76" rx="2"
            fill={TOLERANCE_COLORS[band4].color} className="transition-all duration-300"
            stroke={activeStep === 3 ? "hsl(199, 89%, 60%)" : "none"} strokeWidth={activeStep === 3 ? 2 : 0}>
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </rect>

          {/* Labels below bands */}
          <text x="128" y="115" textAnchor="middle" fill="hsl(215, 20%, 65%)" fontSize="8" fontFamily="monospace">B1</text>
          <text x="168" y="115" textAnchor="middle" fill="hsl(215, 20%, 65%)" fontSize="8" fontFamily="monospace">B2</text>
          <text x="208" y="115" textAnchor="middle" fill="hsl(215, 20%, 65%)" fontSize="8" fontFamily="monospace">Mult</text>
          <text x="268" y="115" textAnchor="middle" fill="hsl(215, 20%, 65%)" fontSize="8" fontFamily="monospace">Tol</text>

          <circle cx="80" cy="60" r="4" fill="hsl(215, 12%, 50%)" />
          <circle cx="320" cy="60" r="4" fill="hsl(215, 12%, 50%)" />
        </svg>
      </div>

      {/* Step-by-step selectors */}
      <div className="space-y-4">
        {STEPS.map((step, stepIdx) => {
          const config = stepConfigs[stepIdx];
          const isActive = activeStep === stepIdx;
          return (
            <div
              key={step.key}
              className={`rounded-xl border p-4 transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-primary/60 bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
                  : "border-border bg-card/40 hover:border-border/80"
              }`}
              onClick={() => setActiveStep(stepIdx)}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold font-mono ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {stepIdx + 1}
                </span>
                <div>
                  <p className={`text-sm font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}: {step.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Seleccionado: <span className="font-mono font-bold text-foreground">
                      {config.type === "digit"
                        ? `${(config.options as typeof BAND_COLORS)[config.value].name} (${(config.options as typeof BAND_COLORS)[config.value].value})`
                        : config.type === "multiplier"
                        ? `${ALL_MULTIPLIERS[config.value].name} (${formatMultiplier(ALL_MULTIPLIERS[config.value].multiplier)})`
                        : `${TOLERANCE_COLORS[config.value].name} (${TOLERANCE_COLORS[config.value].tolerance})`
                      }
                    </span>
                  </p>
                </div>
              </div>

              {isActive && (
                <div className={`grid gap-2 ${config.type === "tolerance" ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-8" : "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12"}`}>
                  {config.options.map((c, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); handleSelect(stepIdx, i); }}
                      className={`flex items-center gap-2 sm:flex-col sm:gap-1 p-2 sm:p-1.5 rounded-lg border-2 transition-all duration-200 hover:scale-105 min-h-[44px] ${
                        config.value === i ? "border-primary glow scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <span
                        className="w-8 h-8 sm:w-8 sm:h-8 rounded-md border border-border/50 shrink-0"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-xs sm:text-[10px] text-muted-foreground font-medium leading-tight text-left sm:text-center">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result */}
      <div className="text-center p-6 rounded-xl bg-card border border-glow glow space-y-3">
        <p className="text-muted-foreground text-sm">Valor calculado</p>
        <p className="text-xl sm:text-3xl md:text-5xl font-mono font-bold text-primary glow-text break-all">
          {formatResistance(resistance)}
        </p>
        <p className="text-muted-foreground">Tolerancia: {tolerance}</p>

        {/* Educational description */}
        <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
          <p>
            <Info className="inline w-4 h-4 text-primary mr-1 -mt-0.5" />
            Esta resistencia de <span className="text-foreground font-semibold">{formatOhmsRaw(resistance)}</span> permite
            controlar el flujo de corriente en tu circuito. Para más detalles, lee nuestra{" "}
            <span className="text-primary font-medium">
              Guía de Código de Colores
            </span>.
          </p>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="rounded-xl border border-border bg-card/60 p-5 space-y-3">
        <h3 className="text-base font-bold font-mono text-foreground flex items-center gap-2">
          📖 Guía Rápida de Colores
        </h3>
        <p className="text-xs text-muted-foreground">Cada color representa un valor numérico (0-9) y un multiplicador específico.</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {BAND_COLORS.map((c) => (
            <div key={c.name} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40 border border-border/50">
              <span className="w-5 h-5 rounded shrink-0 border border-border/50" style={{ backgroundColor: c.color }} />
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">= {c.value} | {formatMultiplier(c.multiplier)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {MULTIPLIER_EXTRAS.map((c) => (
            <div key={c.name} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40 border border-border/50">
              <span className="w-5 h-5 rounded shrink-0 border border-border/50" style={{ backgroundColor: c.color }} />
              <div>
                <p className="text-xs font-bold text-foreground">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">Mult: {formatMultiplier(c.multiplier)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResistorCalculator;
