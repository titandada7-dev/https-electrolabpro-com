import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Activity, Sigma } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PremiumGate from "@/components/PremiumGate";
import { useMarkPremiumVisited } from "@/hooks/usePremiumProgress";

function TransformerCalc() {
  const [vp, setVp] = useState("220");
  const [vs, setVs] = useState("12");
  const [np, setNp] = useState("1000");
  const [pOut, setPOut] = useState("60");
  const [eff, setEff] = useState("90");

  const res = useMemo(() => {
    const Vp = +vp, Vs = +vs, Np = +np, Po = +pOut, e = +eff / 100;
    if ([Vp, Vs, Np, Po, e].some((n) => isNaN(n) || n <= 0)) return null;
    const Ns = Math.round((Np * Vs) / Vp);
    const Is = Po / Vs;
    const Pin = Po / e;
    const Ip = Pin / Vp;
    return { Ns, Is, Ip, Pin };
  }, [vp, vs, np, pOut, eff]);

  return (
    <Card className="tool-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-mono">
          <Sigma className="w-5 h-5 text-primary glow-icon" /> Transformador monofásico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Field id="vp" label="V primario (V)" value={vp} onChange={setVp} />
          <Field id="vs" label="V secundario (V)" value={vs} onChange={setVs} />
          <Field id="np" label="Espiras primario" value={np} onChange={setNp} />
          <Field id="po" label="Potencia carga (W)" value={pOut} onChange={setPOut} />
          <Field id="ef" label="Rendimiento (%)" value={eff} onChange={setEff} />
        </div>
        {res && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <Stat label="Espiras secundario" value={`${res.Ns}`} />
            <Stat label="I secundario" value={`${res.Is.toFixed(2)} A`} />
            <Stat label="I primario" value={`${res.Ip.toFixed(2)} A`} />
            <Stat label="P entrada" value={`${res.Pin.toFixed(1)} W`} />
          </div>
        )}
        <p className="text-xs text-muted-foreground">Vp/Vs = Np/Ns · Ip = (Po/η)/Vp</p>
      </CardContent>
    </Card>
  );
}

function RLCFilterCalc() {
  const [r, setR] = useState("1000");
  const [l, setL] = useState("10"); // mH
  const [c, setC] = useState("100"); // nF

  const res = useMemo(() => {
    const R = +r, L = +l / 1000, C = +c / 1e9;
    if ([R, L, C].some((n) => isNaN(n) || n <= 0)) return null;
    const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
    const Q = (1 / R) * Math.sqrt(L / C);
    const bw = f0 / Q;
    const Z0 = Math.sqrt(L / C);
    return { f0, Q, bw, Z0 };
  }, [r, l, c]);

  const fmtHz = (v: number) =>
    v >= 1e6 ? `${(v / 1e6).toFixed(2)} MHz` : v >= 1e3 ? `${(v / 1e3).toFixed(2)} kHz` : `${v.toFixed(1)} Hz`;

  return (
    <Card className="tool-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-mono">
          <Activity className="w-5 h-5 text-primary glow-icon" /> Filtro RLC (2º orden)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <Field id="r" label="R (Ω)" value={r} onChange={setR} />
          <Field id="l" label="L (mH)" value={l} onChange={setL} />
          <Field id="c" label="C (nF)" value={c} onChange={setC} />
        </div>
        {res && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Stat label="f resonancia" value={fmtHz(res.f0)} />
            <Stat label="Factor Q" value={res.Q.toFixed(2)} />
            <Stat label="Ancho banda" value={fmtHz(res.bw)} />
            <Stat label="Z característica" value={`${res.Z0.toFixed(1)} Ω`} />
          </div>
        )}
        <p className="text-xs text-muted-foreground">f₀ = 1/(2π·√LC) · Q = (1/R)·√(L/C)</p>
      </CardContent>
    </Card>
  );
}

function ImpedanceCalc() {
  const [r, setR] = useState("100");
  const [x, setX] = useState("75");

  const res = useMemo(() => {
    const R = +r, X = +x;
    if (isNaN(R) || isNaN(X)) return null;
    const Z = Math.sqrt(R * R + X * X);
    const phi = (Math.atan2(X, R) * 180) / Math.PI;
    return { Z, phi };
  }, [r, x]);

  return (
    <Card className="tool-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-mono">
          <Calculator className="w-5 h-5 text-primary glow-icon" /> Impedancia compleja
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field id="rr" label="R (Ω)" value={r} onChange={setR} />
          <Field id="xx" label="Reactancia X (Ω)" value={x} onChange={setX} />
        </div>
        {res && (
          <div className="grid sm:grid-cols-2 gap-3">
            <Stat label="|Z|" value={`${res.Z.toFixed(2)} Ω`} />
            <Stat label="Ángulo φ" value={`${res.phi.toFixed(2)}°`} />
          </div>
        )}
        <p className="text-xs text-muted-foreground">Z = R + jX · |Z| = √(R²+X²) · φ = atan(X/R)</p>
      </CardContent>
    </Card>
  );
}

function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="number" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
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

function AllCalculators() {
  return (
    <Tabs defaultValue="trafo" className="w-full">
      <TabsList className="w-full overflow-x-auto justify-start">
        <TabsTrigger value="trafo">Transformador</TabsTrigger>
        <TabsTrigger value="rlc">Filtro RLC</TabsTrigger>
        <TabsTrigger value="z">Impedancia</TabsTrigger>
      </TabsList>
      <TabsContent value="trafo" className="mt-4"><TransformerCalc /></TabsContent>
      <TabsContent value="rlc" className="mt-4"><RLCFilterCalc /></TabsContent>
      <TabsContent value="z" className="mt-4"><ImpedanceCalc /></TabsContent>
    </Tabs>
  );
}

export default function CalculadorasAvanzadas() {
  useMarkPremiumVisited("calculadoras-avanzadas");
  useEffect(() => {
    document.title = "Calculadoras avanzadas · Premium · ElectroLab Pro";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PremiumGate
        title="Calculadoras avanzadas"
        intro="Herramientas pensadas para diseñar circuitos reales: transformadores, filtros resonantes de segundo orden e impedancia compleja en una sola pantalla."
        bullets={[
          "Diseño de transformador monofásico (espiras y corrientes)",
          "Filtro RLC: frecuencia de resonancia, Q y ancho de banda",
          "Impedancia compleja con módulo y ángulo",
          "Sin anuncios y con explicación de cada fórmula",
        ]}
        preview={<div className="p-6"><TransformerCalc /></div>}
      >
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Calculadoras avanzadas</h1>
          <p className="text-muted-foreground mb-8">Diseño profesional sin anuncios.</p>
          <AllCalculators />
        </div>
      </PremiumGate>
    </div>
  );
}
