import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";

const VoltageDividerCalculator = () => {
  const [vin, setVin] = useState("");
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [vout, setVout] = useState<string | null>(null);

  const calculate = () => {
    const V = parseFloat(vin);
    const R1 = parseFloat(r1);
    const R2 = parseFloat(r2);
    if (!isNaN(V) && !isNaN(R1) && !isNaN(R2) && R1 + R2 !== 0) {
      setVout((V * (R2 / (R1 + R2))).toFixed(4));
    }
  };

  const reset = () => {
    setVin("");
    setR1("");
    setR2("");
    setVout(null);
  };

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Zap className="w-7 h-7 text-primary glow-icon" />
          Divisor de Voltaje
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calcula el voltaje de salida. <strong>Vout = Vin × (R2 / (R1 + R2))</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: "vin", label: "Voltaje Vin", value: vin, setter: setVin, unit: "V" },
            { id: "r1", label: "Resistencia R1", value: r1, setter: setR1, unit: "Ω" },
            { id: "r2", label: "Resistencia R2", value: r2, setter: setR2, unit: "Ω" },
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
          <Button onClick={calculate} className="flex-1 font-mono">Calcular Vout</Button>
          <Button variant="outline" size="sm" onClick={reset} className="font-mono text-xs">🔄 Reset</Button>
        </div>

        {vout !== null && (
          <div className="text-center space-y-2 p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground font-mono">Voltaje de salida</p>
            <p className="text-3xl font-mono font-bold text-primary">{vout} V</p>
            <p className="text-xs text-muted-foreground italic">
              ⚠️ Este valor es ideal y puede cambiar si el circuito tiene carga conectada a la salida.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <span className="text-[11px] text-primary/70 font-mono italic">⚡ Herramienta Pro por J.A.Sanchez</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDividerCalculator;
