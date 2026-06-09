import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap, AlertTriangle } from "lucide-react";
import CalculatorEduLink from "@/components/CalculatorEduLink";

const CAP_UNITS = [
  { label: "F", factor: 1 },
  { label: "µF", factor: 1e-6 },
  { label: "nF", factor: 1e-9 },
  { label: "pF", factor: 1e-12 },
] as const;

function formatTime(s: number): string {
  if (!isFinite(s) || s <= 0) return "—";
  if (s >= 1) return `${s.toFixed(3)} s`;
  if (s >= 1e-3) return `${(s * 1e3).toFixed(3)} ms`;
  if (s >= 1e-6) return `${(s * 1e6).toFixed(3)} µs`;
  return `${(s * 1e9).toFixed(2)} ns`;
}

function formatFreq(hz: number): string {
  if (!isFinite(hz) || hz <= 0) return "—";
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(3)} MHz`;
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(3)} kHz`;
  return `${hz.toFixed(3)} Hz`;
}

const Timer555Calculator = () => {
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [cap, setCap] = useState("");
  const [capUnit, setCapUnit] = useState<(typeof CAP_UNITS)[number]["label"]>("µF");

  const { result, warning } = useMemo(() => {
    const R1 = parseFloat(r1);
    const R2 = parseFloat(r2);
    const Craw = parseFloat(cap);
    const factor = CAP_UNITS.find((u) => u.label === capUnit)?.factor ?? 1;
    if (isNaN(R1) || isNaN(R2) || isNaN(Craw) || Craw <= 0) {
      return { result: null, warning: null };
    }
    if (R1 <= 0) {
      return {
        result: null,
        warning: "R1 debe ser mayor a 0 Ω. Con R1=0 el pin de descarga queda en corto con VCC y puede dañar el 555.",
      };
    }
    if (R2 <= 0) {
      return { result: null, warning: "R2 debe ser mayor a 0 Ω." };
    }
    const C = Craw * factor;
    const ton = 0.693 * (R1 + R2) * C;
    const toff = 0.693 * R2 * C;
    const freq = 1.44 / ((R1 + 2 * R2) * C);
    const duty = (ton / (ton + toff)) * 100;
    return {
      result: { freq, ton, toff, duty },
      warning: null,
    };
  }, [r1, r2, cap, capUnit]);

  const reset = () => {
    setR1("");
    setR2("");
    setCap("");
    setCapUnit("µF");
  };

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl font-mono flex items-center justify-center gap-3">
          <Zap className="w-7 h-7 text-primary glow-icon" />
          Temporizador 555 (Astable)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calcula frecuencia, tiempos y duty cycle. <strong>f = 1.44 / ((R1 + 2×R2) × C)</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="r1" className="text-sm font-mono text-foreground">R1</Label>
            <div className="relative">
              <Input id="r1" type="number" placeholder="0" value={r1} onChange={(e) => setR1(e.target.value)} className="pr-12 font-mono bg-secondary/50 border-border focus:border-primary" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">Ω</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="r2" className="text-sm font-mono text-foreground">R2</Label>
            <div className="relative">
              <Input id="r2" type="number" placeholder="0" value={r2} onChange={(e) => setR2(e.target.value)} className="pr-12 font-mono bg-secondary/50 border-border focus:border-primary" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">Ω</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cap" className="text-sm font-mono text-foreground">Capacitor C</Label>
            <div className="flex gap-2">
              <Input id="cap" type="number" placeholder="0" value={cap} onChange={(e) => setCap(e.target.value)} className="flex-1 font-mono bg-secondary/50 border-border focus:border-primary" />
              <select
                value={capUnit}
                onChange={(e) => setCapUnit(e.target.value as typeof capUnit)}
                className="px-2 rounded-md border border-border bg-secondary/50 font-mono text-sm"
                aria-label="Unidad del capacitor"
              >
                {CAP_UNITS.map((u) => (
                  <option key={u.label} value={u.label}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {warning && (
          <div className="flex items-start gap-2 p-3 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{warning}</span>
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={reset} className="font-mono text-xs">🔄 Reset</Button>
        </div>

        {result && (
          <div className="text-center space-y-3 p-4 rounded-lg bg-secondary/30 border border-border">
            <div>
              <p className="text-sm text-muted-foreground font-mono">Frecuencia</p>
              <p className="text-2xl font-mono font-bold text-primary">{formatFreq(result.freq)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground font-mono">Ton</p>
                <p className="text-lg font-mono font-bold text-foreground">{formatTime(result.ton)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-mono">Toff</p>
                <p className="text-lg font-mono font-bold text-foreground">{formatTime(result.toff)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-mono">Duty cycle</p>
                <p className="text-lg font-mono font-bold text-foreground">{result.duty.toFixed(1)} %</p>
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
