import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, AlertTriangle } from "lucide-react";
import CalculatorEduLink from "@/components/CalculatorEduLink";

const LED_OPTIONS = [
  { label: "Rojo / Amarillo", voltage: 2.0 },
  { label: "Verde", voltage: 2.2 },
  { label: "Azul / Blanco", voltage: 3.3 },
];

const LedCalculator = () => {
  const [voltajeFuente, setVoltajeFuente] = useState("12");
  const [ledIndex, setLedIndex] = useState(0);
  const [corrienteLed, setCorrienteLed] = useState("20");

  const voltajeLed = LED_OPTIONS[ledIndex].voltage;
  const V = parseFloat(voltajeFuente) || 0;
  const I = (parseFloat(corrienteLed) || 0) / 1000;

  const resultado = useMemo(() => {
    if (V <= 0 || I <= 0) return null;

    if (V <= voltajeLed) {
      return { error: true as const };
    }

    const R = (V - voltajeLed) / I;
    const potencia = (V - voltajeLed) * I;

    let recomendacion = "Usar resistencia de 1/4W o mayor.";
    if (potencia > 0.5) {
      recomendacion = "Usar resistencia de 1W o mayor.";
    } else if (potencia > 0.25) {
      recomendacion = "Usar resistencia de 1/2W o mayor.";
    }

    return {
      error: false as const,
      resistencia: R.toFixed(2),
      potencia: potencia.toFixed(3),
      recomendacion,
    };
  }, [V, voltajeLed, I]);

  return (
    <Card className="tool-interactive rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Lightbulb className="w-7 h-7 text-primary glow-icon" />
          Calculadora Resistencia para LED
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calcula en tiempo real la resistencia necesaria para proteger tu LED.{" "}
          <strong>R = (V − V<sub>LED</sub>) / I</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Voltaje Alimentación */}
          <div className="space-y-2">
            <Label htmlFor="vfuente" className="text-sm font-mono text-foreground">
              Voltaje Alimentación (V)
            </Label>
            <div className="relative">
              <Input
                id="vfuente"
                type="number"
                min="0"
                step="0.1"
                placeholder="Ej: 9 o 12"
                value={voltajeFuente}
                onChange={(e) => setVoltajeFuente(e.target.value)}
                className="pr-12 font-mono bg-secondary/50 border-border focus:border-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">V</span>
            </div>
          </div>

          {/* Color / Voltaje del LED */}
          <div className="space-y-2">
            <Label htmlFor="ledcolor" className="text-sm font-mono text-foreground">
              Color / Voltaje del LED
            </Label>
            <select
              id="ledcolor"
              value={ledIndex}
              onChange={(e) => setLedIndex(Number(e.target.value))}
              className="flex h-10 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {LED_OPTIONS.map((opt, i) => (
                <option key={i} value={i}>
                  {opt.label} ({opt.voltage}V)
                </option>
              ))}
            </select>
          </div>

          {/* Corriente del LED */}
          <div className="space-y-2">
            <Label htmlFor="iled" className="text-sm font-mono text-foreground">
              Corriente del LED (mA)
            </Label>
            <div className="relative">
              <Input
                id="iled"
                type="number"
                min="0"
                step="1"
                placeholder="20"
                value={corrienteLed}
                onChange={(e) => setCorrienteLed(e.target.value)}
                className="pr-12 font-mono bg-secondary/50 border-border focus:border-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">mA</span>
            </div>
          </div>
        </div>

        {/* Resultado en tiempo real */}
        {resultado && !resultado.error && (
          <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 space-y-3 text-center">
            <p className="text-4xl md:text-5xl font-bold font-mono text-primary tracking-tight">
              {resultado.resistencia} Ω
            </p>
            <p className="text-sm text-foreground font-mono">
              Potencia disipada: <span className="text-primary font-semibold">{resultado.potencia} W</span>
            </p>
            <p className="text-sm text-muted-foreground font-semibold">
              {resultado.recomendacion}
            </p>
          </div>
        )}

        {/* Alerta: voltaje insuficiente */}
        {resultado && resultado.error && (
          <div className="p-4 rounded-xl border border-orange-400/50 bg-orange-50 dark:bg-orange-950/30 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
            <p className="text-sm font-mono text-orange-700 dark:text-orange-300">
              El voltaje de alimentación ({V}V) es menor o igual al voltaje del LED ({voltajeLed}V). <strong>El LED no encenderá.</strong>
            </p>
          </div>
        )}

        {/* Sin datos suficientes */}
        {!resultado && (
          <p className="text-center text-sm text-muted-foreground font-mono py-4">
            Ingresá los valores para ver el resultado en tiempo real.
          </p>
        )}

        <div className="flex justify-end">
          <span className="text-[11px] text-primary/70 font-mono italic">
            ⚡ Herramienta Pro por J.A.Sanchez
          </span>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <CalculatorEduLink
          intro="¿No sabés qué resistencia usar para tu LED? Profundizá la teoría con nuestras guías."
          links={[
            { to: "/guia-resistencias", label: "Guía completa de resistencias para LED" },
            { to: "/articulos/ley-de-ohm", label: "Ley de Ohm explicada con ejemplos" },
            { to: "/articulos/codigo-colores-resistencias", label: "Código de colores de resistencias paso a paso" },
          ]}
        />
      </div>
    </Card>
  );
};

export default LedCalculator;
