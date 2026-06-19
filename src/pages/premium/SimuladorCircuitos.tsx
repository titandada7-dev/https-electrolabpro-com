import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cpu, AlertTriangle, Zap } from "lucide-react";
import PremiumGate from "@/components/PremiumGate";
import { useMarkPremiumVisited } from "@/hooks/usePremiumProgress";

/**
 * Premium-only: interactive LED + resistor circuit simulator.
 * Shows current, voltage drop on R, power dissipated and LED status.
 */
function CircuitSim() {
  const [vSource, setVSource] = useState("9");
  const [vLed, setVLed] = useState("2.1");
  const [iLedMax, setILedMax] = useState("20"); // mA
  const [r, setR] = useState("330"); // Ω

  const result = useMemo(() => {
    const Vs = parseFloat(vSource);
    const Vl = parseFloat(vLed);
    const R = parseFloat(r);
    const Imax = parseFloat(iLedMax) / 1000;
    if ([Vs, Vl, R, Imax].some((n) => isNaN(n)) || R <= 0) return null;
    const vR = Math.max(Vs - Vl, 0);
    const I = vR / R;
    const Pr = vR * I;
    const Pled = Vl * I;
    const ok = Vs > Vl && I <= Imax;
    const overdrive = I > Imax;
    const tooLow = Vs <= Vl;
    return { vR, I, Pr, Pled, ok, overdrive, tooLow, Imax };
  }, [vSource, vLed, iLedMax, r]);

  return (
    <Card className="tool-interactive border-border bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-mono">
          <Cpu className="w-6 h-6 text-primary glow-icon" />
          Simulador LED + Resistencia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="vs">Fuente Vcc (V)</Label>
            <Input id="vs" type="number" step="0.1" value={vSource} onChange={(e) => setVSource(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="vl">Vf del LED (V)</Label>
            <Input id="vl" type="number" step="0.1" value={vLed} onChange={(e) => setVLed(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="imax">Corriente máx LED (mA)</Label>
            <Input id="imax" type="number" step="1" value={iLedMax} onChange={(e) => setILedMax(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="r">Resistencia (Ω)</Label>
            <Input id="r" type="number" step="1" value={r} onChange={(e) => setR(e.target.value)} />
          </div>
        </div>

        {/* SVG circuit visualization */}
        <div className="rounded-lg border border-border bg-background/50 p-4">
          <svg viewBox="0 0 400 140" className="w-full h-auto">
            <rect x="10" y="50" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="30" y="75" textAnchor="middle" fontSize="10" fill="currentColor">{vSource}V</text>
            <line x1="50" y1="70" x2="140" y2="70" stroke="currentColor" strokeWidth="2" />
            <rect x="140" y="60" width="80" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="180" y="55" textAnchor="middle" fontSize="10" fill="currentColor">{r}Ω</text>
            <line x1="220" y1="70" x2="290" y2="70" stroke="currentColor" strokeWidth="2" />
            <circle cx="310" cy="70" r="14" fill={result?.ok ? "hsl(var(--primary))" : result?.overdrive ? "#ef4444" : "#666"} opacity={result?.ok ? 1 : 0.4} />
            <text x="310" y="105" textAnchor="middle" fontSize="10" fill="currentColor">LED</text>
            <line x1="324" y1="70" x2="390" y2="70" stroke="currentColor" strokeWidth="2" />
            <line x1="390" y1="70" x2="390" y2="110" stroke="currentColor" strokeWidth="2" />
            <line x1="390" y1="110" x2="30" y2="110" stroke="currentColor" strokeWidth="2" />
            <line x1="30" y1="110" x2="30" y2="90" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {result && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Stat label="Corriente" value={`${(result.I * 1000).toFixed(2)} mA`} />
            <Stat label="V en R" value={`${result.vR.toFixed(2)} V`} />
            <Stat label="P en R" value={`${(result.Pr * 1000).toFixed(1)} mW`} />
            <Stat label="P en LED" value={`${(result.Pled * 1000).toFixed(1)} mW`} />
          </div>
        )}

        {result?.tooLow && (
          <Alert kind="error">La fuente es menor que Vf del LED — el LED no encenderá.</Alert>
        )}
        {result?.overdrive && (
          <Alert kind="error">
            Corriente excede el máximo ({iLedMax} mA). Subí la resistencia a al menos{" "}
            <strong>{Math.ceil((result.vR / result.Imax))} Ω</strong> para proteger el LED.
          </Alert>
        )}
        {result?.ok && (
          <Alert kind="ok">Circuito seguro. El LED funciona dentro del rango recomendado.</Alert>
        )}

        <p className="text-xs text-muted-foreground">
          Fórmulas: I = (Vcc − Vf) / R · P = V·I · Recomendado operar al 70–80% de Imax para mayor vida útil.
        </p>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background/60 p-3">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-lg font-mono font-semibold text-primary">{value}</p>
    </div>
  );
}

function Alert({ kind, children }: { kind: "ok" | "error"; children: React.ReactNode }) {
  const cls = kind === "ok"
    ? "border-primary/40 bg-primary/5 text-foreground"
    : "border-destructive/40 bg-destructive/10 text-foreground";
  return (
    <div className={`flex items-start gap-2 p-3 rounded-md border ${cls} text-sm`}>
      {kind === "ok" ? <Zap className="h-4 w-4 mt-0.5 text-primary" /> : <AlertTriangle className="h-4 w-4 mt-0.5 text-destructive" />}
      <div>{children}</div>
    </div>
  );
}

export default function SimuladorCircuitos() {
  useMarkPremiumVisited("simulador-circuitos");
  useEffect(() => {
    document.title = "Simulador de circuitos · Premium · ElectroLab Pro";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PremiumGate
        title="Simulador interactivo de circuitos"
        intro="Modela un circuito real con fuente, resistencia y LED. Ajustá parámetros y mirá en vivo corriente, caída de tensión y potencia disipada — con alertas si quemás el LED."
        bullets={[
          "Visualización SVG en vivo del circuito",
          "Cálculo automático de corriente, V en R y potencia",
          "Alertas de sobrecorriente y recomendación de R mínima",
          "Pensado para diseñar antes de soldar",
        ]}
        preview={
          <div className="p-6">
            <CircuitSim />
          </div>
        }
      >
        <div className="container mx-auto max-w-3xl px-4 py-10">
          <CircuitSim />
        </div>
      </PremiumGate>
    </div>
  );
}
