import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import CalculatorEduLink from "@/components/CalculatorEduLink";

const OhmCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");

  const handleChange = (field: "V" | "I" | "R", value: string) => {
    // Set the field being edited and compute the single missing one.
    // Never recompute a field the user already filled — that overwrote
    // user input previously and could loop.
    const next = { V: voltage, I: current, R: resistance, [field]: value };
    const V = parseFloat(next.V);
    const I = parseFloat(next.I);
    const R = parseFloat(next.R);

    // Persist the edited field first.
    if (field === "V") setVoltage(value);
    else if (field === "I") setCurrent(value);
    else setResistance(value);

    // Determine which of the other two is empty and compute it.
    const emptyOthers = (["V", "I", "R"] as const).filter(
      (k) => k !== field && next[k].trim() === ""
    );
    if (emptyOthers.length !== 1) return; // need exactly two filled inputs

    const target = emptyOthers[0];
    if (target === "V" && !isNaN(I) && !isNaN(R)) {
      setVoltage((I * R).toFixed(4));
    } else if (target === "I" && !isNaN(V) && !isNaN(R) && R !== 0) {
      setCurrent((V / R).toFixed(4));
    } else if (target === "R" && !isNaN(V) && !isNaN(I) && I !== 0) {
      setResistance((V / I).toFixed(4));
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
      <div className="px-6 pb-6">
        <CalculatorEduLink
          intro="¿Querés entender la teoría detrás de V = I × R? Aprendé con nuestras guías técnicas."
          links={[
            { to: "/articulos/ley-de-ohm", label: "Guía completa de la Ley de Ohm con ejemplos resueltos" },
            { to: "/guia-resistencias", label: "Guía completa de resistencias eléctricas" },
            { to: "/articulos/circuitos-serie-paralelo", label: "Circuitos en serie vs paralelo" },
          ]}
        />
      </div>
    </Card>
  );
};

export default OhmCalculator;
