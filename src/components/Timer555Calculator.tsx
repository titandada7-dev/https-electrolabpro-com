import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import CalculatorEduLink from "@/components/CalculatorEduLink";

const Timer555Calculator = () => {
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [cap, setCap] = useState("");
  const [result, setResult] = useState<{ freq: string; ton: string; toff: string } | null>(null);

  const calculate = () => {
    const R1 = parseFloat(r1);
    const R2 = parseFloat(r2);
    const C = parseFloat(cap);
    if (!isNaN(R1) && !isNaN(R2) && !isNaN(C) && C > 0 && (R1 + 2 * R2) > 0) {
      const ton = 0.693 * (R1 + R2) * C;
      const toff = 0.693 * R2 * C;
      const freq = 1.44 / ((R1 + 2 * R2) * C);
      setResult({
        freq: freq.toFixed(4),
        ton: ton.toFixed(6),
        toff: toff.toFixed(6),
      });
    }
  };

  const reset = () => {
    setR1("");
    setR2("");
    setCap("");
    setResult(null);
  };

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Zap className="w-7 h-7 text-primary glow-icon" />
          Temporizador 555 (Astable)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calcula frecuencia y tiempos. <strong>f = 1.44 / ((R1 + 2×R2) × C)</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: "r1", label: "R1", value: r1, setter: setR1, unit: "Ω" },
            { id: "r2", label: "R2", value: r2, setter: setR2, unit: "Ω" },
            { id: "cap", label: "Capacitor C", value: cap, setter: setCap, unit: "F" },
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
          <Button onClick={calculate} className="flex-1 font-mono">Calcular</Button>
          <Button variant="outline" size="sm" onClick={reset} className="font-mono text-xs">🔄 Reset</Button>
        </div>

        {result && (
          <div className="text-center space-y-3 p-4 rounded-lg bg-secondary/30 border border-border">
            <div>
              <p className="text-sm text-muted-foreground font-mono">Frecuencia</p>
              <p className="text-2xl font-mono font-bold text-primary">{result.freq} Hz</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground font-mono">Ton</p>
                <p className="text-lg font-mono font-bold text-foreground">{result.ton} s</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-mono">Toff</p>
                <p className="text-lg font-mono font-bold text-foreground">{result.toff} s</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <span className="text-[11px] text-primary/70 font-mono italic">⚡ Herramienta Pro por J.A.Sanchez</span>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <CalculatorEduLink
          intro="El temporizador 555 combina resistencias y capacitores. Repasá los fundamentos:"
          links={[
            { to: "/articulos/condensadores", label: "Guía completa de condensadores en electrónica" },
            { to: "/guia-resistencias", label: "Cómo elegir y leer resistencias correctamente" },
            { to: "/articulos/pwm-arduino", label: "PWM con Arduino: alternativa digital al 555" },
          ]}
        />
      </div>
    </Card>
  );
};

export default Timer555Calculator;
