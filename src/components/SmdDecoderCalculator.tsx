import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import CalculatorEduLink from "@/components/CalculatorEduLink";

function formatResistance(ohms: number): string {
  if (ohms >= 1_000_000) return `${(ohms / 1_000_000).toFixed(ohms % 1_000_000 === 0 ? 0 : 2)} MΩ`;
  if (ohms >= 1_000) return `${(ohms / 1_000).toFixed(ohms % 1_000 === 0 ? 0 : 2)} kΩ`;
  return `${ohms} Ω`;
}

function decodeSmd(code: string): string | null {
  const trimmed = code.trim();
  if (/^\d{3}$/.test(trimmed)) {
    const significand = parseInt(trimmed.substring(0, 2), 10);
    const multiplier = Math.pow(10, parseInt(trimmed[2], 10));
    return formatResistance(significand * multiplier);
  }
  if (/^\d{4}$/.test(trimmed)) {
    const significand = parseInt(trimmed.substring(0, 3), 10);
    const multiplier = Math.pow(10, parseInt(trimmed[3], 10));
    return formatResistance(significand * multiplier);
  }
  return null;
}

const SmdDecoderCalculator = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const calculate = () => {
    const decoded = decodeSmd(code);
    if (decoded) {
      setResult(decoded);
      setError(false);
    } else {
      setResult(null);
      setError(true);
    }
  };

  const reset = () => {
    setCode("");
    setResult(null);
    setError(false);
  };

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Zap className="w-7 h-7 text-primary glow-icon" />
          Decodificador SMD
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ingresa el código SMD de 3 o 4 dígitos (ej: <strong>103</strong>, <strong>4702</strong>).
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 max-w-xs mx-auto">
          <Label htmlFor="smd-code" className="text-sm font-mono text-foreground">Código SMD</Label>
          <Input
            id="smd-code"
            type="text"
            placeholder="103"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-center text-lg bg-secondary/50 border-border focus:border-primary"
          />
        </div>

        <div className="flex gap-3 max-w-xs mx-auto">
          <Button onClick={calculate} className="flex-1 font-mono">Decodificar</Button>
          <Button variant="outline" size="sm" onClick={reset} className="font-mono text-xs">🔄 Reset</Button>
        </div>

        {result && (
          <div className="text-center space-y-2 p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground font-mono">Valor real</p>
            <p className="text-3xl font-mono font-bold text-primary">{result}</p>
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-destructive font-mono">
            Código inválido. Ingresa 3 o 4 dígitos numéricos.
          </p>
        )}

        <div className="flex justify-end">
          <span className="text-[11px] text-primary/70 font-mono italic">⚡ Herramienta Pro por J.A.Sanchez</span>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <CalculatorEduLink
          intro="¿Querés decodificar también resistencias de bandas? Mirá nuestras guías:"
          links={[
            { to: "/guia-resistencias", label: "Guía completa de resistencias (SMD y through-hole)" },
            { to: "/articulos/codigo-colores-resistencias", label: "Código de colores de resistencias paso a paso" },
            { to: "/articulos/leer-datasheet", label: "Cómo leer un datasheet de componentes" },
          ]}
        />
      </div>
    </Card>
  );
};

export default SmdDecoderCalculator;
