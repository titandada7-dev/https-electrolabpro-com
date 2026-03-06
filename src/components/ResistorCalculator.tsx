import { useState, useMemo } from "react";

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

const TOLERANCE_COLORS = [
  { name: "Dorado", color: "#DAA520", tolerance: "±5%", textColor: "black" },
  { name: "Plateado", color: "#C0C0C0", tolerance: "±10%", textColor: "black" },
  { name: "Marrón", color: "#8B4513", tolerance: "±1%", textColor: "white" },
  { name: "Rojo", color: "#FF0000", tolerance: "±2%", textColor: "white" },
];

function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000_000) return `${(ohms / 1_000_000_000).toFixed(ohms % 1_000_000_000 === 0 ? 0 : 1)} GΩ`;
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(ohms % 1_000_000 === 0 ? 0 : 1)} MΩ`;
  if (ohms >= 1_000) return `${(ohms / 1_000).toFixed(ohms % 1_000 === 0 ? 0 : 1)} kΩ`;
  return `${ohms} Ω`;
}

const ResistorCalculator = () => {
  const [band1, setBand1] = useState(1);
  const [band2, setBand2] = useState(0);
  const [band3, setBand3] = useState(2);
  const [band4, setBand4] = useState(0);

  const resistance = useMemo(() => {
    const value = (BAND_COLORS[band1].value * 10 + BAND_COLORS[band2].value) * BAND_COLORS[band3].multiplier;
    return value;
  }, [band1, band2, band3]);

  const tolerance = TOLERANCE_COLORS[band4].tolerance;

  const bandSelections = [
    { label: "Banda 1", value: band1, setter: setBand1, options: BAND_COLORS },
    { label: "Banda 2", value: band2, setter: setBand2, options: BAND_COLORS },
    { label: "Multiplicador", value: band3, setter: setBand3, options: BAND_COLORS },
  ];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-foreground glow-text">
          Calculadora de Resistencias
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Selecciona los colores de las 4 bandas para calcular el valor
        </p>
      </div>

      {/* SVG Resistor */}
      <div className="flex justify-center px-4">
        <svg viewBox="0 0 400 120" className="w-full max-w-md" aria-label="Representación visual de resistencia">
          {/* Left wire */}
          <line x1="0" y1="60" x2="80" y2="60" stroke="hsl(215, 12%, 50%)" strokeWidth="3" />
          {/* Right wire */}
          <line x1="320" y1="60" x2="400" y2="60" stroke="hsl(215, 12%, 50%)" strokeWidth="3" />

          {/* Resistor body */}
          <rect x="80" y="20" width="240" height="80" rx="40" ry="40"
            fill="hsl(30, 30%, 22%)" stroke="hsl(30, 20%, 35%)" strokeWidth="2" />
          {/* Body highlight */}
          <ellipse cx="200" cy="45" rx="100" ry="18" fill="hsl(30, 25%, 28%)" opacity="0.5" />

          {/* Band 1 */}
          <rect x="120" y="22" width="16" height="76" rx="2"
            fill={BAND_COLORS[band1].color} className="transition-all duration-300">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="118" y="20" width="20" height="80" rx="3" fill={BAND_COLORS[band1].color} opacity="0.15" />

          {/* Band 2 */}
          <rect x="160" y="22" width="16" height="76" rx="2"
            fill={BAND_COLORS[band2].color} className="transition-all duration-300">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </rect>
          <rect x="158" y="20" width="20" height="80" rx="3" fill={BAND_COLORS[band2].color} opacity="0.15" />

          {/* Band 3 - Multiplier */}
          <rect x="200" y="22" width="16" height="76" rx="2"
            fill={BAND_COLORS[band3].color} className="transition-all duration-300">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" begin="1s" repeatCount="indefinite" />
          </rect>
          <rect x="198" y="20" width="20" height="80" rx="3" fill={BAND_COLORS[band3].color} opacity="0.15" />

          {/* Band 4 - Tolerance (separated) */}
          <rect x="260" y="22" width="16" height="76" rx="2"
            fill={TOLERANCE_COLORS[band4].color} className="transition-all duration-300">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </rect>
          <rect x="258" y="20" width="20" height="80" rx="3" fill={TOLERANCE_COLORS[band4].color} opacity="0.15" />

          {/* Wire terminals */}
          <circle cx="80" cy="60" r="4" fill="hsl(215, 12%, 50%)" />
          <circle cx="320" cy="60" r="4" fill="hsl(215, 12%, 50%)" />
        </svg>
      </div>

      {/* Result */}
      <div className="text-center p-6 rounded-xl bg-card border border-glow glow">
        <p className="text-muted-foreground text-sm mb-1">Valor calculado</p>
        <p className="text-3xl md:text-5xl font-mono font-bold text-primary glow-text">
          {formatResistance(resistance)}
        </p>
        <p className="text-muted-foreground mt-2">Tolerancia: {tolerance}</p>
      </div>

      {/* Band selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bandSelections.map(({ label, value, setter, options }) => (
          <div key={label} className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <div className="grid grid-cols-5 gap-1.5">
              {options.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setter(i)}
                  className={`w-full aspect-square rounded-md border-2 transition-all duration-200 hover:scale-110 ${
                    value === i ? "border-primary glow scale-110" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={`${c.name} (${c.value})`}
                />
              ))}
            </div>
          </div>
        ))}
        {/* Tolerance */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Tolerancia</label>
          <div className="grid grid-cols-4 gap-1.5">
            {TOLERANCE_COLORS.map((c, i) => (
              <button
                key={i}
                onClick={() => setBand4(i)}
                className={`w-full aspect-square rounded-md border-2 transition-all duration-200 hover:scale-110 ${
                  band4 === i ? "border-primary glow scale-110" : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.color }}
                title={`${c.name} (${c.tolerance})`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResistorCalculator;
