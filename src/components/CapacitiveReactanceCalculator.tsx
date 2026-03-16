import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";

const CapacitiveReactanceCalculator = () => {
  const [freq, setFreq] = useState("");
  const [cap, setCap] = useState("");
  const [xc, setXc] = useState<string | null>(null);

  const calculate = () => {
    const f = parseFloat(freq);
    const C = parseFloat(cap);
    if (!isNaN(f) && !isNaN(C) && f > 0 && C > 0) {
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
          {[
            { id: "freq", label: "Frecuencia", value: freq, setter: setFreq, unit: "Hz" },
            { id: "cap", label: "Capacitancia", value: cap, setter: setCap, unit: "F" },
          ].map((f) => (
            <div key={f.id} className="space-y-2">
              <Label htmlFor={f.id} className="text-sm font-mono text-foreground">{f.label}</Label>
              <div className="relative">
                <Input
                  id={f.id}
                  type="number"
                  placeholder="0"
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="pr-12 font-mono bg-secondary/50 border-border focus:border-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">{f.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 font-mono">Calcular Xc</Button>
          <Button variant="outline" size="sm" onClick={reset} className="font-mono text-xs">🔄 Reset</Button>
        </div>

        {xc !== null && (
          <div className="text-center space-y-2 p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground font-mono">Reactancia capacitiva</p>
            <p className="text-3xl font-mono font-bold text-primary">{xc} Ω</p>
          </div>
        )}

        <div className="flex justify-end">
          <span className="text-[11px] text-primary/70 font-mono italic">⚡ Herramienta Pro por J.A.Sanchez</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapacitiveReactanceCalculator;
