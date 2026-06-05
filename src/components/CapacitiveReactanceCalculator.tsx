import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import CalculatorEduLink from "@/components/CalculatorEduLink";
import AdBanner from "./AdBanner";
import { AD_SLOT_INLINE } from "@/config/adsense";

const capUnits = [
  { label: "F", factor: 1 },
  { label: "µF", factor: 1e-6 },
  { label: "nF", factor: 1e-9 },
  { label: "pF", factor: 1e-12 },
];

const CapacitiveReactanceCalculator = () => {
  const [freq, setFreq] = useState("");
  const [cap, setCap] = useState("");
  const [capUnit, setCapUnit] = useState("µF");
  const [xc, setXc] = useState<string | null>(null);

  const calculate = () => {
    const f = parseFloat(freq);
    const rawC = parseFloat(cap);
    const factor = capUnits.find((u) => u.label === capUnit)?.factor ?? 1;
    const C = rawC * factor;
    if (!isNaN(f) && !isNaN(rawC) && f > 0 && C > 0) {
      const result = 1 / (2 * Math.PI * f * C);
      setXc(result.toFixed(4));
    }
  };

  const reset = () => {
    setFreq("");
    setCap("");
    setXc(null);
  };

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Zap className="w-7 h-7 text-primary glow-icon" />
          Reactancia Capacitiva
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calcula la reactancia. <strong>Xc = 1 / (2π × f × C)</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="freq" className="text-sm font-mono text-foreground">Frecuencia</Label>
            <div className="relative">
              <Input
                id="freq"
                type="number"
                placeholder="0"
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
                className="pr-12 font-mono bg-secondary/50 border-border focus:border-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">Hz</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cap" className="text-sm font-mono text-foreground">Capacitancia</Label>
            <div className="flex gap-2">
              <Input
                id="cap"
                type="number"
                placeholder="0"
                value={cap}
                onChange={(e) => setCap(e.target.value)}
                className="font-mono bg-secondary/50 border-border focus:border-primary flex-1"
              />
              <select
                value={capUnit}
                onChange={(e) => setCapUnit(e.target.value)}
                className="font-mono text-sm bg-secondary/50 border border-border rounded-md px-2 text-foreground focus:border-primary outline-none"
              >
                {capUnits.map((u) => (
                  <option key={u.label} value={u.label}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 font-mono">Calcular Xc</Button>
          <Button variant="outline" size="sm" onClick={reset} className="font-mono text-xs">🔄 Reset</Button>
        </div>

        {xc !== null && (
          <>
            <div className="text-center space-y-2 p-4 rounded-lg bg-secondary/30 border border-border">
              <p className="text-sm text-muted-foreground font-mono">Reactancia capacitiva</p>
              <p className="text-3xl font-mono font-bold text-primary">{xc} Ω</p>
            </div>

            <AdBanner slot={AD_SLOT_INLINE} className="mt-2" fallbackUrl="/" />

            <div className="p-4 rounded-lg bg-secondary/20 border border-border space-y-2">
              <p className="text-sm font-mono font-semibold text-foreground">📘 ¿Qué es la reactancia capacitiva?</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La reactancia capacitiva (Xc) es la oposición que un condensador ofrece al paso de la corriente alterna. 
                A mayor frecuencia o mayor capacitancia, menor es la reactancia. Se calcula con <strong>Xc = 1 / (2π × f × C)</strong>.
              </p>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <span className="text-[11px] text-primary/70 font-mono italic">⚡ Herramienta Pro por J.A.Sanchez</span>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <CalculatorEduLink
          intro="Aprendé cómo se comportan los condensadores en circuitos AC y de filtrado:"
          links={[
            { to: "/articulos/condensadores", label: "Guía completa de condensadores y sus aplicaciones" },
            { to: "/articulos/ley-de-ohm", label: "Ley de Ohm aplicada a corriente alterna" },
            { to: "/guia-resistencias", label: "Guía completa de resistencias para filtros RC" },
          ]}
        />
      </div>
    </Card>
  );
};

export default CapacitiveReactanceCalculator;
