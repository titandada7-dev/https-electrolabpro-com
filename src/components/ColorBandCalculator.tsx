import { useState, useMemo } from "react";

const DIGIT_COLORS = [
  { name: "Negro", hex: "#000000", value: 0, text: "white" },
  { name: "Marrón", hex: "#8B4513", value: 1, text: "white" },
  { name: "Rojo", hex: "#FF0000", value: 2, text: "white" },
  { name: "Naranja", hex: "#FF8C00", value: 3, text: "black" },
  { name: "Amarillo", hex: "#FFD700", value: 4, text: "black" },
  { name: "Verde", hex: "#22C55E", value: 5, text: "white" },
  { name: "Azul", hex: "#3B82F6", value: 6, text: "white" },
  { name: "Violeta", hex: "#8B5CF6", value: 7, text: "white" },
  { name: "Gris", hex: "#6B7280", value: 8, text: "white" },
  { name: "Blanco", hex: "#FFFFFF", value: 9, text: "black" },
];

const MULTIPLIER_COLORS = [
  { name: "Negro", hex: "#000000", multiplier: 1, text: "white", label: "×1" },
  { name: "Marrón", hex: "#8B4513", multiplier: 10, text: "white", label: "×10" },
  { name: "Rojo", hex: "#FF0000", multiplier: 100, text: "white", label: "×100" },
  { name: "Naranja", hex: "#FF8C00", multiplier: 1_000, text: "black", label: "×1k" },
  { name: "Amarillo", hex: "#FFD700", multiplier: 10_000, text: "black", label: "×10k" },
  { name: "Verde", hex: "#22C55E", multiplier: 100_000, text: "white", label: "×100k" },
  { name: "Azul", hex: "#3B82F6", multiplier: 1_000_000, text: "white", label: "×1M" },
  { name: "Violeta", hex: "#8B5CF6", multiplier: 10_000_000, text: "white", label: "×10M" },
  { name: "Gris", hex: "#6B7280", multiplier: 100_000_000, text: "white", label: "×100M" },
  { name: "Blanco", hex: "#FFFFFF", multiplier: 1_000_000_000, text: "black", label: "×1G" },
  { name: "Dorado", hex: "#DAA520", multiplier: 0.1, text: "black", label: "×0.1" },
  { name: "Plateado", hex: "#C0C0C0", multiplier: 0.01, text: "black", label: "×0.01" },
];

const TOLERANCE_COLORS = [
  { name: "Dorado", hex: "#DAA520", tolerance: "±5%", text: "black" },
  { name: "Plateado", hex: "#C0C0C0", tolerance: "±10%", text: "black" },
  { name: "Marrón", hex: "#8B4513", tolerance: "±1%", text: "white" },
  { name: "Rojo", hex: "#FF0000", tolerance: "±2%", text: "white" },
  { name: "Verde", hex: "#22C55E", tolerance: "±0.5%", text: "white" },
  { name: "Azul", hex: "#3B82F6", tolerance: "±0.25%", text: "white" },
  { name: "Violeta", hex: "#8B5CF6", tolerance: "±0.1%", text: "white" },
  { name: "Gris", hex: "#6B7280", tolerance: "±0.05%", text: "white" },
];

function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000_000) return `${+(ohms / 1_000_000_000).toFixed(2)} GΩ`;
  if (ohms >= 1_000_000) return `${+(ohms / 1_000_000).toFixed(2)} MΩ`;
  if (ohms >= 1_000) return `${+(ohms / 1_000).toFixed(2)} kΩ`;
  if (ohms < 1 && ohms > 0) return `${+(ohms * 1000).toFixed(2)} mΩ`;
  return `${+ohms.toFixed(2)} Ω`;
}

interface ColorButtonProps {
  hex: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

function ColorButton({ hex, name, selected, onClick }: ColorButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={name}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-200 shrink-0 ${
        selected
          ? "border-primary scale-110 shadow-[0_0_12px_hsl(185_100%_50%/0.5)] ring-2 ring-primary/40"
          : "border-border hover:border-muted-foreground hover:scale-105"
      }`}
      style={{ backgroundColor: hex }}
      aria-label={name}
    />
  );
}

export default function ColorBandCalculator() {
  const [bandCount, setBandCount] = useState<4 | 5>(4);
  const [band1, setBand1] = useState(1); // Marrón
  const [band2, setBand2] = useState(0); // Negro
  const [band3, setBand3] = useState(0); // Negro (5-band only)
  const [multiplierIdx, setMultiplierIdx] = useState(3); // Naranja ×1k
  const [toleranceIdx, setToleranceIdx] = useState(0); // Dorado ±5%

  const result = useMemo(() => {
    let base: number;
    if (bandCount === 4) {
      base = DIGIT_COLORS[band1].value * 10 + DIGIT_COLORS[band2].value;
    } else {
      base =
        DIGIT_COLORS[band1].value * 100 +
        DIGIT_COLORS[band2].value * 10 +
        DIGIT_COLORS[band3].value;
    }
    const ohms = base * MULTIPLIER_COLORS[multiplierIdx].multiplier;
    return {
      ohms,
      formatted: formatResistance(ohms),
      tolerance: TOLERANCE_COLORS[toleranceIdx].tolerance,
    };
  }, [bandCount, band1, band2, band3, multiplierIdx, toleranceIdx]);

  // SVG resistor band colors for preview
  const bandColors = useMemo(() => {
    const colors = [
      DIGIT_COLORS[band1].hex,
      DIGIT_COLORS[band2].hex,
    ];
    if (bandCount === 5) colors.push(DIGIT_COLORS[band3].hex);
    colors.push(MULTIPLIER_COLORS[multiplierIdx].hex);
    colors.push(TOLERANCE_COLORS[toleranceIdx].hex);
    return colors;
  }, [bandCount, band1, band2, band3, multiplierIdx, toleranceIdx]);

  const bandLabels = bandCount === 4
    ? ["Banda 1", "Banda 2", "Multiplicador", "Tolerancia"]
    : ["Banda 1", "Banda 2", "Banda 3", "Multiplicador", "Tolerancia"];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground text-center">
        🎨 Calculadora de Colores
      </h2>
      <p className="text-center text-xs sm:text-sm">
        ¿No sabés qué valor usar?{" "}
        <a href="/guia-resistencias" className="text-primary hover:underline font-medium">
          Leé nuestra guía completa de resistencias online →
        </a>
      </p>

      {/* Band count toggle */}
      <div className="flex justify-center gap-2">
        {([4, 5] as const).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setBandCount(n)}
            className={`px-5 py-2.5 rounded-lg font-mono text-sm font-bold transition-all duration-200 ${
              bandCount === n
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(185_100%_50%/0.3)]"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {n} Bandas
          </button>
        ))}
      </div>

      {/* SVG Resistor Preview */}
      <div className="flex justify-center py-2">
        <svg viewBox="0 0 320 80" className="w-full max-w-sm" aria-label="Resistencia visual">
          {/* Leads */}
          <line x1="0" y1="40" x2="60" y2="40" stroke="hsl(185, 100%, 50%)" strokeWidth="3" strokeOpacity="0.5" />
          <line x1="260" y1="40" x2="320" y2="40" stroke="hsl(185, 100%, 50%)" strokeWidth="3" strokeOpacity="0.5" />
          {/* Body */}
          <rect x="60" y="15" width="200" height="50" rx="10" fill="hsl(235, 30%, 18%)" stroke="hsl(185, 100%, 50%)" strokeWidth="1" strokeOpacity="0.3" />
          {/* Bands */}
          {bandColors.map((color, i) => {
            const total = bandColors.length;
            const spacing = 160 / (total + 1);
            const x = 80 + spacing * (i + 1) - 5;
            return (
              <rect
                key={i}
                x={x}
                y="18"
                width="10"
                height="44"
                rx="2"
                fill={color}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      {/* Digital display */}
      <div className="rounded-xl border border-primary/30 bg-background p-4 sm:p-6 text-center"
           style={{ boxShadow: "0 0 30px hsl(185 100% 50% / 0.08), inset 0 0 60px hsl(185 100% 50% / 0.03)" }}>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Valor de la Resistencia</p>
        <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-wider"
           style={{ color: "#39FF14", textShadow: "0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2)" }}>
          {result.formatted}
        </p>
        <p className="text-lg sm:text-xl font-mono mt-2"
           style={{ color: "#39FF14", textShadow: "0 0 10px rgba(57, 255, 20, 0.3)" }}>
          {result.tolerance}
        </p>
      </div>

      {/* Band selectors */}
      <div className="space-y-5">
        {/* Digit bands */}
        {[
          { label: "Banda 1", value: band1, setter: setBand1 },
          { label: "Banda 2", value: band2, setter: setBand2 },
          ...(bandCount === 5
            ? [{ label: "Banda 3", value: band3, setter: setBand3 }]
            : []),
        ].map((band) => (
          <div key={band.label} className="space-y-2">
            <label className="text-sm font-mono font-semibold text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {band.label}
              <span className="text-primary ml-auto text-xs">{DIGIT_COLORS[band.value].name} ({DIGIT_COLORS[band.value].value})</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DIGIT_COLORS.map((c, i) => (
                <ColorButton
                  key={c.name}
                  hex={c.hex}
                  name={`${c.name} (${c.value})`}
                  selected={band.value === i}
                  onClick={() => band.setter(i)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Multiplier */}
        <div className="space-y-2">
          <label className="text-sm font-mono font-semibold text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-highlight" />
            Multiplicador
            <span className="text-highlight ml-auto text-xs">{MULTIPLIER_COLORS[multiplierIdx].name} ({MULTIPLIER_COLORS[multiplierIdx].label})</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {MULTIPLIER_COLORS.map((c, i) => (
              <ColorButton
                key={c.name + c.label}
                hex={c.hex}
                name={`${c.name} (${c.label})`}
                selected={multiplierIdx === i}
                onClick={() => setMultiplierIdx(i)}
              />
            ))}
          </div>
        </div>

        {/* Tolerance */}
        <div className="space-y-2">
          <label className="text-sm font-mono font-semibold text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Tolerancia
            <span className="text-primary ml-auto text-xs">{TOLERANCE_COLORS[toleranceIdx].name} ({TOLERANCE_COLORS[toleranceIdx].tolerance})</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {TOLERANCE_COLORS.map((c, i) => (
              <ColorButton
                key={c.name + c.tolerance}
                hex={c.hex}
                name={`${c.name} (${c.tolerance})`}
                selected={toleranceIdx === i}
                onClick={() => setToleranceIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
