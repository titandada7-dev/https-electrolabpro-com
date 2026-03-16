import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";

const OhmCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");

  const calculate = (field: "V" | "I" | "R", v: string, i: string, r: string) => {
    const V = parseFloat(v);
    const I = parseFloat(i);
    const R = parseFloat(r);

    if (field === "V" && !isNaN(I) && !isNaN(R)) {
      setVoltage((I * R).toFixed(4));
    } else if (field === "I" && !isNaN(V) && !isNaN(R) && R !== 0) {
      setCurrent((V / R).toFixed(4));
    } else if (field === "R" && !isNaN(V) && !isNaN(I) && I !== 0) {
      setResistance((V / I).toFixed(4));
    }
  };

  const handleChange = (field: "V" | "I" | "R", value: string) => {
    if (field === "V") {
      setVoltage(value);
      calculate("I", value, current, resistance);
      calculate("R", value, current, resistance);
    } else if (field === "I") {
      setCurrent(value);
      calculate("V", voltage, value, resistance);
      calculate("R", voltage, value, resistance);
    } else {
      setResistance(value);
      calculate("V", voltage, current, value);
      calculate("I", voltage, current, value);
    }
  };

  const fields = [
    { id: "V", label: "Voltaje (V)", value: voltage, unit: "Volts", setter: setVoltage },
    { id: "I", label: "Corriente (I)", value: current, unit: "Amperes", setter: setCurrent },
    { id: "R", label: "Resistencia (R)", value: resistance, unit: "Ohms (Ω)", setter: setResistance },
  ] as const;

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
  };

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Zap className="w-7 h-7 text-primary glow-icon" />
          Calculadora Ley de Ohm
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ingresa dos valores y obtén el tercero automáticamente. <strong>V = I × R</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {fields.map((f) => (
            <div key={f.id} className="space-y-2">
              <Label htmlFor={f.id} className="text-sm font-mono text-foreground">
                {f.label}
              </Label>
              <div className="relative">
                <Input
                  id={f.id}
                  type="number"
                  placeholder="0"
                  value={f.value}
                  onChange={(e) => handleChange(f.id as "V" | "I" | "R", e.target.value)}
                  className="pr-16 font-mono bg-secondary/50 border-border focus:border-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                  {f.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="gap-2 font-mono text-xs"
          >
            🔄 Limpiar / Reset
          </Button>
          <span className="text-[11px] text-primary/70 font-mono italic">
            ⚡ Herramienta Pro por J.A.Sanchez
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OhmCalculator;
