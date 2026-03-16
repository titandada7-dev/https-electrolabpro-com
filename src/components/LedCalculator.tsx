import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";

interface Resultado {
  resistencia: string;
  potencia: string;
  recomendacion: string;
}

const LedCalculator = () => {
  const [voltajeFuente, setVoltajeFuente] = useState("");
  const [voltajeLed, setVoltajeLed] = useState("");
  const [corrienteLed, setCorrienteLed] = useState("");
  const [resultado, setResultado] = useState<Resultado | string | null>(null);

  const calcular = () => {
    const V = parseFloat(voltajeFuente);
    const Vled = parseFloat(voltajeLed);
    const I = parseFloat(corrienteLed) / 1000;

    if (!V || !Vled || !I || V <= Vled) {
      setResultado("Datos inválidos o voltaje insuficiente.");
      return;
    }

    const R = (V - Vled) / I;
    const potencia = (V - Vled) * I;

    let recomendacion = "";
    if (potencia <= 0.25) {
      recomendacion = "Usar resistencia de 1/4W o mayor.";
    } else if (potencia <= 0.5) {
      recomendacion = "Usar resistencia de 1/2W o mayor.";
    } else {
      recomendacion = "Usar resistencia de 1W o mayor.";
    }

    setResultado({
      resistencia: R.toFixed(2),
      potencia: potencia.toFixed(3),
      recomendacion,
    });
  };

  const reset = () => {
    setVoltajeFuente("");
    setVoltajeLed("");
    setCorrienteLed("");
    setResultado(null);
  };

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Lightbulb className="w-7 h-7 text-primary glow-icon" />
          Calculadora Resistencia para LED
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calcula la resistencia necesaria para proteger tu LED. <strong>R = (V - V<sub>LED</sub>) / I</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: "vfuente", label: "Voltaje Fuente (V)", value: voltajeFuente, setter: setVoltajeFuente, unit: "Volts" },
            { id: "vled", label: "Voltaje LED (V)", value: voltajeLed, setter: setVoltajeLed, unit: "Volts" },
            { id: "iled", label: "Corriente LED (mA)", value: corrienteLed, setter: setCorrienteLed, unit: "mA" },
          ].map((f) => (
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
                  onChange={(e) => f.setter(e.target.value)}
                  className="pr-16 font-mono bg-secondary/50 border-border focus:border-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                  {f.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={calcular} className="flex-1 font-mono font-bold">
            ⚡ CALCULAR
          </Button>
          <Button variant="outline" size="sm" onClick={reset} className="font-mono text-xs">
            🔄 Limpiar
          </Button>
        </div>

        {resultado && typeof resultado === "object" && (
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-2">
            <h3 className="font-mono font-bold text-foreground text-lg">Resultado</h3>
            <p className="text-sm text-foreground font-mono">
              Resistencia: <span className="text-primary font-bold">{resultado.resistencia} Ω</span>
            </p>
            <p className="text-sm text-foreground font-mono">
              Potencia disipada: <span className="text-primary font-bold">{resultado.potencia} W</span>
            </p>
            <p className="text-sm text-muted-foreground font-semibold">
              {resultado.recomendacion}
            </p>
          </div>
        )}

        {resultado && typeof resultado === "string" && (
          <p className="text-sm text-destructive font-mono mt-2">{resultado}</p>
        )}

        <div className="flex justify-end">
          <span className="text-[11px] text-primary/70 font-mono italic">
            ⚡ Herramienta Pro por J.A.Sanchez
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LedCalculator;
