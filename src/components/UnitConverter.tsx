import { useState, useMemo } from "react";

type UnitCategory = {
  name: string;
  emoji: string;
  base: string;
  units: { label: string; factor: number }[];
};

const CATEGORIES: UnitCategory[] = [
  {
    name: "Voltaje",
    emoji: "⚡",
    base: "V",
    units: [
      { label: "µV", factor: 1e-6 },
      { label: "mV", factor: 1e-3 },
      { label: "V", factor: 1 },
      { label: "kV", factor: 1e3 },
    ],
  },
  {
    name: "Corriente",
    emoji: "🔌",
    base: "A",
    units: [
      { label: "µA", factor: 1e-6 },
      { label: "mA", factor: 1e-3 },
      { label: "A", factor: 1 },
    ],
  },
  {
    name: "Resistencia",
    emoji: "🎛️",
    base: "Ω",
    units: [
      { label: "mΩ", factor: 1e-3 },
      { label: "Ω", factor: 1 },
      { label: "kΩ", factor: 1e3 },
      { label: "MΩ", factor: 1e6 },
      { label: "GΩ", factor: 1e9 },
    ],
  },
  {
    name: "Capacitancia",
    emoji: "🔋",
    base: "F",
    units: [
      { label: "pF", factor: 1e-12 },
      { label: "nF", factor: 1e-9 },
      { label: "µF", factor: 1e-6 },
      { label: "mF", factor: 1e-3 },
      { label: "F", factor: 1 },
    ],
  },
  {
    name: "Inductancia",
    emoji: "🧲",
    base: "H",
    units: [
      { label: "µH", factor: 1e-6 },
      { label: "mH", factor: 1e-3 },
      { label: "H", factor: 1 },
    ],
  },
  {
    name: "Frecuencia",
    emoji: "📡",
    base: "Hz",
    units: [
      { label: "Hz", factor: 1 },
      { label: "kHz", factor: 1e3 },
      { label: "MHz", factor: 1e6 },
      { label: "GHz", factor: 1e9 },
    ],
  },
  {
    name: "Potencia",
    emoji: "💡",
    base: "W",
    units: [
      { label: "µW", factor: 1e-6 },
      { label: "mW", factor: 1e-3 },
      { label: "W", factor: 1 },
      { label: "kW", factor: 1e3 },
    ],
  },
];

function formatNum(n: number): string {
  if (n === 0) return "0";
  if (Math.abs(n) >= 1e12 || (Math.abs(n) < 1e-12 && n !== 0)) return n.toExponential(4);
  const s = n.toPrecision(8);
  return parseFloat(s).toString();
}

export default function UnitConverter() {
  const [catIdx, setCatIdx] = useState(0);
  const [value, setValue] = useState("1");
  const [fromIdx, setFromIdx] = useState(2); // default to base unit

  const cat = CATEGORIES[catIdx];

  const conversions = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    const baseValue = v * cat.units[fromIdx].factor;
    return cat.units.map((u) => ({
      label: u.label,
      value: formatNum(baseValue / u.factor),
    }));
  }, [value, fromIdx, cat]);

  const handleCatChange = (idx: number) => {
    setCatIdx(idx);
    setValue("1");
    // Pick a sensible default unit (base unit or middle)
    const baseCat = CATEGORIES[idx];
    const baseIdx = baseCat.units.findIndex((u) => u.factor === 1);
    setFromIdx(baseIdx >= 0 ? baseIdx : 0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground text-center">
        🔄 Conversor de Unidades
      </h2>

      {/* Category selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c, i) => (
          <button
            key={c.name}
            type="button"
            onClick={() => handleCatChange(i)}
            className={`px-3 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all duration-200 ${
              catIdx === i
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(185_100%_50%/0.3)]"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-mono font-semibold text-muted-foreground">Valor a convertir</label>
        <div className="flex gap-2">
          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ej: 4.7"
            className="flex-1 px-3 py-2.5 rounded-lg bg-muted text-foreground font-mono text-base border border-border focus:border-primary focus:outline-none transition-colors"
          />
          <select
            value={fromIdx}
            onChange={(e) => setFromIdx(Number(e.target.value))}
            className="px-3 py-2.5 rounded-lg bg-muted text-foreground font-mono text-sm border border-border focus:border-primary focus:outline-none transition-colors min-w-[70px]"
          >
            {cat.units.map((u, i) => (
              <option key={u.label} value={i}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl border border-primary/30 bg-background overflow-hidden"
           style={{ boxShadow: "0 0 30px hsl(185 100% 50% / 0.08), inset 0 0 60px hsl(185 100% 50% / 0.03)" }}>
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider text-center">
            Resultados — {cat.name}
          </p>
        </div>
        <div className="divide-y divide-border">
          {conversions ? conversions.map((c) => (
            <div
              key={c.label}
              className={`flex items-center justify-between px-4 py-3 transition-colors ${
                cat.units[fromIdx].label === c.label ? "bg-primary/5" : ""
              }`}
            >
              <span className="font-mono text-sm text-muted-foreground">{c.label}</span>
              <span
                className="font-mono font-bold text-lg sm:text-xl tracking-wide"
                style={{
                  color: "#39FF14",
                  textShadow: "0 0 10px rgba(57,255,20,0.3)",
                }}
              >
                {c.value}
              </span>
            </div>
          )) : (
            <div className="px-4 py-6 text-center text-muted-foreground font-mono text-sm">
              Ingresá un valor numérico
            </div>
          )}
        </div>
      </div>

      {/* Tip */}
      <div className="rounded-xl border border-border bg-card/60 p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Tip:</strong> Ingresá el valor en cualquier unidad y el conversor calculará automáticamente todas las equivalencias. Ideal para pasar de <span className="text-primary font-mono">kΩ</span> a <span className="text-primary font-mono">Ω</span>, de <span className="text-primary font-mono">µF</span> a <span className="text-primary font-mono">pF</span>, o cualquier combinación que necesites en tu taller.
        </p>
      </div>
    </div>
  );
}
