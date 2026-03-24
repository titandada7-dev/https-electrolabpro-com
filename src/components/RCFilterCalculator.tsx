import { useState, useMemo } from "react";

function formatFrequency(hz: number): string {
  if (hz >= 1_000_000) return `${+(hz / 1_000_000).toFixed(3)} MHz`;
  if (hz >= 1_000) return `${+(hz / 1_000).toFixed(3)} kHz`;
  if (hz < 1) return `${+(hz * 1000).toFixed(3)} mHz`;
  return `${+hz.toFixed(3)} Hz`;
}

export default function RCFilterCalculator() {
  const [filterType, setFilterType] = useState<"low" | "high">("low");
  const [resistance, setResistance] = useState("");
  const [rUnit, setRUnit] = useState(1); // 1=Ω, 1000=kΩ, 1e6=MΩ
  const [capacitance, setCapacitance] = useState("");
  const [cUnit, setCUnit] = useState(1e-6); // F, µF, nF, pF

  const result = useMemo(() => {
    const r = parseFloat(resistance) * rUnit;
    const c = parseFloat(capacitance) * cUnit;
    if (!r || !c || r <= 0 || c <= 0) return null;
    const fc = 1 / (2 * Math.PI * r * c);
    return { fc, formatted: formatFrequency(fc) };
  }, [resistance, rUnit, capacitance, cUnit]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground text-center">
        📡 Calculadora de Filtros RC
      </h2>

      {/* Filter type toggle */}
      <div className="flex justify-center gap-2">
        {([
          { key: "low" as const, label: "Pasa-Bajos" },
          { key: "high" as const, label: "Pasa-Altos" },
        ]).map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilterType(f.key)}
            className={`px-5 py-2.5 rounded-lg font-mono text-sm font-bold transition-all duration-200 ${
              filterType === f.key
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(185_100%_50%/0.3)]"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Circuit diagram */}
      <div className="flex justify-center py-2">
        <svg viewBox="0 0 300 120" className="w-full max-w-xs" aria-label={`Filtro ${filterType === "low" ? "pasa-bajos" : "pasa-altos"}`}>
          {/* Input */}
          <text x="5" y="18" fill="hsl(185,100%,50%)" fontSize="11" fontFamily="monospace">Vin</text>
          <line x1="5" y1="50" x2="60" y2="50" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />

          {filterType === "low" ? (
            <>
              {/* R horizontal */}
              <rect x="60" y="42" width="80" height="16" rx="3" fill="none" stroke="hsl(185,100%,50%)" strokeWidth="1.5" strokeOpacity="0.7" />
              <text x="85" y="54" fill="hsl(0,0%,98%)" fontSize="10" fontFamily="monospace" textAnchor="middle">R</text>
              <line x1="140" y1="50" x2="200" y2="50" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              {/* C vertical */}
              <line x1="200" y1="50" x2="200" y2="62" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="185" y1="62" x2="215" y2="62" stroke="hsl(100,80%,55%)" strokeWidth="2" />
              <line x1="185" y1="72" x2="215" y2="72" stroke="hsl(100,80%,55%)" strokeWidth="2" />
              <text x="222" y="70" fill="hsl(0,0%,98%)" fontSize="10" fontFamily="monospace">C</text>
              <line x1="200" y1="72" x2="200" y2="100" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              {/* GND */}
              <line x1="185" y1="100" x2="215" y2="100" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.4" />
              <line x1="190" y1="105" x2="210" y2="105" stroke="hsl(185,100%,50%)" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="195" y1="110" x2="205" y2="110" stroke="hsl(185,100%,50%)" strokeWidth="1" strokeOpacity="0.2" />
              {/* Vout */}
              <line x1="200" y1="50" x2="260" y2="50" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              <text x="262" y="18" fill="hsl(100,80%,55%)" fontSize="11" fontFamily="monospace">Vout</text>
            </>
          ) : (
            <>
              {/* C horizontal */}
              <line x1="60" y1="50" x2="85" y2="50" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="85" y1="35" x2="85" y2="65" stroke="hsl(100,80%,55%)" strokeWidth="2" />
              <line x1="95" y1="35" x2="95" y2="65" stroke="hsl(100,80%,55%)" strokeWidth="2" />
              <text x="82" y="28" fill="hsl(0,0%,98%)" fontSize="10" fontFamily="monospace">C</text>
              <line x1="95" y1="50" x2="200" y2="50" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              {/* R vertical */}
              <line x1="200" y1="50" x2="200" y2="60" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              <rect x="190" y="60" width="20" height="30" rx="3" fill="none" stroke="hsl(185,100%,50%)" strokeWidth="1.5" strokeOpacity="0.7" />
              <text x="200" y="79" fill="hsl(0,0%,98%)" fontSize="10" fontFamily="monospace" textAnchor="middle">R</text>
              <line x1="200" y1="90" x2="200" y2="100" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              {/* GND */}
              <line x1="185" y1="100" x2="215" y2="100" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.4" />
              <line x1="190" y1="105" x2="210" y2="105" stroke="hsl(185,100%,50%)" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="195" y1="110" x2="205" y2="110" stroke="hsl(185,100%,50%)" strokeWidth="1" strokeOpacity="0.2" />
              {/* Vout */}
              <line x1="200" y1="50" x2="260" y2="50" stroke="hsl(185,100%,50%)" strokeWidth="2" strokeOpacity="0.6" />
              <text x="262" y="18" fill="hsl(100,80%,55%)" fontSize="11" fontFamily="monospace">Vout</text>
            </>
          )}
        </svg>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-mono font-semibold text-muted-foreground">Resistencia (R)</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="any"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              placeholder="Ej: 10"
              className="flex-1 px-3 py-2.5 rounded-lg bg-muted text-foreground font-mono text-base border border-border focus:border-primary focus:outline-none transition-colors"
            />
            <select
              value={rUnit}
              onChange={(e) => setRUnit(Number(e.target.value))}
              className="px-2 py-2.5 rounded-lg bg-muted text-foreground font-mono text-sm border border-border focus:border-primary focus:outline-none transition-colors"
            >
              <option value={1}>Ω</option>
              <option value={1000}>kΩ</option>
              <option value={1e6}>MΩ</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-mono font-semibold text-muted-foreground">Capacitancia (C)</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="any"
              value={capacitance}
              onChange={(e) => setCapacitance(e.target.value)}
              placeholder="Ej: 100"
              className="flex-1 px-3 py-2.5 rounded-lg bg-muted text-foreground font-mono text-base border border-border focus:border-primary focus:outline-none transition-colors"
            />
            <select
              value={cUnit}
              onChange={(e) => setCUnit(Number(e.target.value))}
              className="px-2 py-2.5 rounded-lg bg-muted text-foreground font-mono text-sm border border-border focus:border-primary focus:outline-none transition-colors"
            >
              <option value={1}>F</option>
              <option value={1e-6}>µF</option>
              <option value={1e-9}>nF</option>
              <option value={1e-12}>pF</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl border border-primary/30 bg-background p-4 sm:p-6 text-center"
           style={{ boxShadow: "0 0 30px hsl(185 100% 50% / 0.08), inset 0 0 60px hsl(185 100% 50% / 0.03)" }}>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
          Frecuencia de Corte ({filterType === "low" ? "Pasa-Bajos" : "Pasa-Altos"})
        </p>
        <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-wider"
           style={{ color: "#39FF14", textShadow: "0 0 20px rgba(57,255,20,0.4), 0 0 40px rgba(57,255,20,0.2)" }}>
          {result ? result.formatted : "— Hz"}
        </p>
        <p className="text-xs font-mono text-muted-foreground mt-3">
          fc = 1 / (2π × R × C)
        </p>
      </div>

      {/* Explanation */}
      <div className="rounded-xl border border-border bg-card/60 p-4 space-y-2">
        <h3 className="font-mono font-bold text-sm text-foreground">
          {filterType === "low" ? "¿Qué hace un filtro Pasa-Bajos?" : "¿Qué hace un filtro Pasa-Altos?"}
        </h3>
        {filterType === "low" ? (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Un filtro RC pasa-bajos permite pasar las frecuencias <strong className="text-foreground">por debajo</strong> de la frecuencia de corte y atenúa las frecuencias superiores. Se usa comúnmente para eliminar ruido de alta frecuencia en señales de audio o en líneas de alimentación de circuitos.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Un filtro RC pasa-altos permite pasar las frecuencias <strong className="text-foreground">por encima</strong> de la frecuencia de corte y atenúa las frecuencias inferiores. Es ideal para eliminar la componente DC de una señal o bloquear zumbidos de baja frecuencia.
          </p>
        )}
      </div>
    </div>
  );
}
