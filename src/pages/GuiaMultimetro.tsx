import { useState } from "react";
import ArticleLayout from "@/pages/ArticleLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Gauge,
  Activity,
  Zap,
  ShieldCheck,
  Sparkles,
  Wrench,
  AlertTriangle,
  Volume2,
  Battery,
  Plug,
  Sigma,
  CircleDot,
  RotateCw,
  MonitorSmartphone,
  Cable,
} from "lucide-react";

type PartId = "screen" | "selector" | "com" | "vomega" | "amp10";

const PARTS: Record<PartId, { title: string; icon: typeof Gauge; desc: string }> = {
  screen: {
    title: "Pantalla LCD",
    icon: MonitorSmartphone,
    desc: "Muestra la lectura medida, la unidad (V, Ω, A) y símbolos auxiliares como batería baja, polaridad negativa o modo automático.",
  },
  selector: {
    title: "Selector Giratorio",
    icon: RotateCw,
    desc: "Elige la magnitud y rango a medir (Voltaje DC/AC, Resistencia, Continuidad, Corriente). Posicionarlo mal puede dañar el equipo.",
  },
  com: {
    title: "Puerto COM (negro)",
    icon: CircleDot,
    desc: "Borne común, siempre va la sonda negra. Es la referencia (negativo) para cualquier tipo de medición.",
  },
  vomega: {
    title: "Puerto VΩmA (rojo)",
    icon: Cable,
    desc: "Sonda roja para medir Voltaje, Resistencia, Continuidad, Diodos y pequeñas Corrientes (hasta 200 mA típico).",
  },
  amp10: {
    title: "Puerto 10 A (rojo)",
    icon: Zap,
    desc: "Sonda roja solo para medir corrientes altas (hasta 10 A). Generalmente sin fusible o con fusible de alto poder de corte.",
  },
};

const SYMBOLS = [
  { symbol: "V⎓", name: "Voltaje Continuo (DC)", use: "Pilas, baterías, fuentes de alimentación, salidas de Arduino." },
  { symbol: "V~", name: "Voltaje Alterno (AC)", use: "Tomas de pared (220V/110V), salida de transformadores." },
  { symbol: "Ω", name: "Resistencia (Ohmios)", use: "Medir el valor de resistencias y verificar bobinas o fusibles." },
  { symbol: "🔊 / ▶|", name: "Continuidad / Diodo", use: "Probar pistas de PCB, cables, fusibles y polaridad de diodos/LEDs." },
  { symbol: "A⎓ / A~", name: "Corriente / Amperaje", use: "Medir el consumo de un circuito. SIEMPRE en serie, nunca en paralelo." },
];

const MODELS = [
  {
    name: "DT-830B",
    tag: "Económico",
    icon: Battery,
    pros: "Ideal para iniciarse: barato, mide lo esencial (V, Ω, mA, hFE) en baja tensión.",
    cons: "Pocas protecciones internas, sin True RMS, sin auto-rango. NO usar en 220V de red.",
    accent: "from-slate-500/20 to-slate-700/10 border-slate-500/30",
  },
  {
    name: "Aneng AN8008",
    tag: "Mejor calidad/precio",
    icon: Sparkles,
    pros: "9999 cuentas, True RMS, auto-rango y NCV. Perfecto para electrónica fina y reparaciones.",
    cons: "Carcasa plástica básica; categoría de seguridad limitada para entornos industriales.",
    accent: "from-cyan-500/20 to-blue-600/10 border-cyan-500/40",
  },
  {
    name: "Fluke 101",
    tag: "Profesional",
    icon: ShieldCheck,
    pros: "Indestructible. Certificación CAT III 600V real, fiabilidad y precisión de marca Fluke.",
    cons: "No mide corriente (amperios). Precio elevado frente a alternativas asiáticas.",
    accent: "from-emerald-500/20 to-emerald-700/10 border-emerald-500/40",
  },
];

const TYPES = [
  {
    id: "digital",
    label: "Digital (DMM)",
    icon: Gauge,
    title: "Multímetro Digital (DMM)",
    text: "El más extendido. Lectura numérica directa en pantalla LCD, alta precisión (típicamente ±0.5%), auto-rango y funciones como True RMS, continuidad sonora y prueba de diodos. Ideal para el 95% de los trabajos de electrónica y mantenimiento.",
  },
  {
    id: "analog",
    label: "Analógico",
    icon: Activity,
    title: "Multímetro Analógico",
    text: "Usa una aguja sobre escala graduada. Su gran ventaja es visualizar variaciones o fluctuaciones rápidas (por ejemplo, descarga de un capacitor o pulsos) que un display digital no alcanza a mostrar. Requiere interpretar la escala correctamente.",
  },
  {
    id: "clamp",
    label: "Pinza Amperométrica",
    icon: Wrench,
    title: "Pinza Amperométrica",
    text: "Incorpora un gancho magnético que abraza un solo cable para medir corriente alterna sin cortar ni interrumpir el circuito. Es la forma más segura de medir consumos altos en instalaciones eléctricas vivas.",
  },
];

const GuiaMultimetro = () => {
  const [hovered, setHovered] = useState<PartId | null>("screen");
  const active = hovered ?? "screen";
  const ActiveIcon = PARTS[active].icon;

  return (
    <ArticleLayout
      title="Aprende a usar el Multímetro (Tester) desde cero"
      subtitle="Guía Definitiva del Multímetro: tipos, modelos populares, simbología, anatomía interactiva y reglas de seguridad imprescindibles."
      slug="guia-multimetro"
      datePublished="2026-06-02"
      dateModified="2026-06-02"
    >
      {/* HERO INTRO */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6 md:p-10 mb-10 not-prose">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(180 100% 50% / 0.25), transparent 40%), radial-gradient(circle at 80% 80%, hsl(220 100% 60% / 0.2), transparent 40%)" }} />
        <div className="relative flex items-start gap-4">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
            <Gauge className="h-6 w-6 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight m-0">
              Guía Definitiva del Multímetro
            </h2>
            <p className="text-slate-300 mt-3 leading-relaxed">
              El multímetro es la herramienta más importante de cualquier técnico o aficionado a la electrónica.
              Permite <span className="text-cyan-300 font-semibold">medir tensión, corriente y resistencia</span>, además de probar
              continuidad, diodos y semiconductores. Esta guía te enseña a elegirlo, leerlo y usarlo sin romperlo.
            </p>
          </div>
        </div>
      </section>

      {/* TIPOS DE MULTÍMETRO — TABS */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">Tipos de Multímetro</h2>
      <p>Compará en segundos los tres formatos más comunes para entender cuál se adapta mejor a tu trabajo.</p>

      <div className="not-prose my-6">
        <Tabs defaultValue="digital" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-900/60 border border-slate-700">
            {TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className="data-[state=active]:bg-cyan-500/15 data-[state=active]:text-cyan-300 gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {TYPES.map((t) => (
            <TabsContent key={t.id} value={t.id}>
              <Card className="bg-slate-900/40 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cyan-300 flex items-center gap-2">
                    <t.icon className="h-5 w-5" />
                    {t.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-200 leading-relaxed">{t.text}</CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* MODELOS POPULARES */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-12">3 Modelos Populares</h2>
      <p>Una comparativa honesta de tres testers que cubren todos los presupuestos y niveles.</p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
        {MODELS.map((m) => {
          const Icon = m.icon;
          return (
            <Card
              key={m.name}
              className={`bg-gradient-to-br ${m.accent} border backdrop-blur-sm transition-transform hover:-translate-y-1 duration-200`}
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-cyan-300" />
                  <span className="text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded bg-slate-900/60 text-cyan-300 border border-cyan-500/30">
                    {m.tag}
                  </span>
                </div>
                <CardTitle className="text-white text-lg">{m.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-emerald-300">
                  <span className="font-semibold">✓ </span>
                  {m.pros}
                </p>
                <p className="text-amber-300/90">
                  <span className="font-semibold">! </span>
                  {m.cons}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* TABLA DE SIMBOLOGÍA */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-12">Guía de Simbología</h2>
      <p>Los símbolos del selector pueden parecer crípticos. Esta tabla resuelve los más importantes:</p>

      <div className="not-prose rounded-xl border border-slate-700 overflow-hidden bg-slate-900/40 my-6">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-transparent">
              <TableHead className="text-cyan-300 w-32">Símbolo</TableHead>
              <TableHead className="text-cyan-300">Nombre</TableHead>
              <TableHead className="text-cyan-300">Para qué sirve</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SYMBOLS.map((s) => (
              <TableRow key={s.name} className="border-slate-700/60 hover:bg-cyan-500/5">
                <TableCell className="font-mono text-lg text-emerald-300">{s.symbol}</TableCell>
                <TableCell className="text-slate-100 font-medium">{s.name}</TableCell>
                <TableCell className="text-slate-300">{s.use}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ANATOMÍA INTERACTIVA */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-12">Anatomía del Multímetro Digital</h2>
      <p>Pasá el cursor (o tocá en móvil) sobre cada parte del tester para descubrir su función.</p>

      <div className="not-prose grid grid-cols-1 lg:grid-cols-5 gap-6 my-6">
        {/* SVG / Maqueta CSS del multímetro */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-6 flex items-center justify-center min-h-[420px]">
          <div className="relative w-full max-w-[260px] aspect-[3/5] rounded-3xl bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl p-4 border-4 border-yellow-700">
            {/* Pantalla */}
            <button
              type="button"
              onMouseEnter={() => setHovered("screen")}
              onFocus={() => setHovered("screen")}
              onClick={() => setHovered("screen")}
              aria-label="Pantalla LCD"
              className={`block w-full h-20 rounded-md bg-slate-800 border-2 transition-all ${
                active === "screen" ? "border-cyan-400 ring-4 ring-cyan-400/40" : "border-slate-900"
              }`}
            >
              <div className="h-full flex items-center justify-end pr-3">
                <span className="font-mono text-3xl text-cyan-300 tracking-wider"
                  style={{ textShadow: "0 0 12px hsl(180 100% 50% / 0.7)" }}>
                  9.99
                </span>
              </div>
            </button>

            {/* Selector giratorio */}
            <button
              type="button"
              onMouseEnter={() => setHovered("selector")}
              onFocus={() => setHovered("selector")}
              onClick={() => setHovered("selector")}
              aria-label="Selector giratorio"
              className={`mx-auto mt-4 block w-28 h-28 rounded-full bg-slate-900 border-4 transition-all relative ${
                active === "selector" ? "border-cyan-400 ring-4 ring-cyan-400/40" : "border-slate-700"
              }`}
            >
              <span className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-emerald-400 rounded-sm shadow-[0_0_8px_hsl(150_100%_50%)]" />
              <span className="absolute inset-3 rounded-full border border-slate-600" />
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-slate-500 uppercase">OFF · V · Ω · A</span>
            </button>

            {/* Puertos */}
            <div className="absolute bottom-4 left-0 right-0 px-6 flex justify-between items-end">
              <button
                type="button"
                onMouseEnter={() => setHovered("amp10")}
                onFocus={() => setHovered("amp10")}
                onClick={() => setHovered("amp10")}
                aria-label="Puerto 10A"
                className={`flex flex-col items-center gap-1 transition-all ${active === "amp10" ? "scale-110" : ""}`}
              >
                <span className={`block w-5 h-5 rounded-full bg-red-600 border-2 ${active === "amp10" ? "border-cyan-300 ring-2 ring-cyan-300/50" : "border-red-900"}`} />
                <span className="text-[8px] font-mono text-slate-900 font-bold">10A</span>
              </button>
              <button
                type="button"
                onMouseEnter={() => setHovered("vomega")}
                onFocus={() => setHovered("vomega")}
                onClick={() => setHovered("vomega")}
                aria-label="Puerto VΩmA"
                className={`flex flex-col items-center gap-1 transition-all ${active === "vomega" ? "scale-110" : ""}`}
              >
                <span className={`block w-5 h-5 rounded-full bg-red-600 border-2 ${active === "vomega" ? "border-cyan-300 ring-2 ring-cyan-300/50" : "border-red-900"}`} />
                <span className="text-[8px] font-mono text-slate-900 font-bold">VΩmA</span>
              </button>
              <button
                type="button"
                onMouseEnter={() => setHovered("com")}
                onFocus={() => setHovered("com")}
                onClick={() => setHovered("com")}
                aria-label="Puerto COM"
                className={`flex flex-col items-center gap-1 transition-all ${active === "com" ? "scale-110" : ""}`}
              >
                <span className={`block w-5 h-5 rounded-full bg-slate-900 border-2 ${active === "com" ? "border-cyan-300 ring-2 ring-cyan-300/50" : "border-slate-700"}`} />
                <span className="text-[8px] font-mono text-slate-900 font-bold">COM</span>
              </button>
            </div>
          </div>
        </div>

        {/* Panel descriptivo */}
        <div className="lg:col-span-2 rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
              <ActiveIcon className="h-5 w-5 text-cyan-300" />
            </div>
            <h3 className="text-lg font-bold text-white m-0">{PARTS[active].title}</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">{PARTS[active].desc}</p>
          <div className="mt-auto pt-6 border-t border-slate-700/60">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">
              Tocá otra parte del tester →
            </p>
          </div>
        </div>
      </div>

      {/* CHECKLIST DE SEGURIDAD */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-12">Checklist de Seguridad</h2>

      <div className="not-prose space-y-4 my-6">
        <Alert className="border-amber-500/50 bg-amber-500/10 text-amber-100">
          <ShieldCheck className="h-5 w-5 !text-amber-300" />
          <AlertTitle className="text-amber-200 font-bold">Regla de Oro</AlertTitle>
          <AlertDescription className="text-amber-100/90">
            Desenergizá <strong>siempre</strong> el circuito antes de medir resistencia u ohmios.
            Medir Ω sobre un circuito vivo arruina el multímetro y falsea la lectura.
          </AlertDescription>
        </Alert>

        <Alert className="border-red-500/60 bg-red-500/10 text-red-100">
          <AlertTriangle className="h-5 w-5 !text-red-300" />
          <AlertTitle className="text-red-200 font-bold">¡Peligro de Cortocircuito!</AlertTitle>
          <AlertDescription className="text-red-100/90">
            <strong>Nunca</strong> intentes medir corriente (amperios) conectando el tester directamente a los
            enchufes de pared. La medición de amperaje se hace <strong>en serie</strong> con la carga, jamás en paralelo:
            provocarías un cortocircuito y la voladura del fusible (o algo peor).
          </AlertDescription>
        </Alert>

        <Alert className="border-cyan-500/50 bg-cyan-500/10 text-cyan-100">
          <Sigma className="h-5 w-5 !text-cyan-300" />
          <AlertTitle className="text-cyan-200 font-bold">Buenas Prácticas</AlertTitle>
          <AlertDescription className="text-cyan-100/90">
            Revisá puntas y aislamiento antes de cada uso, empezá siempre por el rango más alto si tu tester no es
            auto-rango, y usá una mano apoyada lejos del circuito al medir tensiones peligrosas.
          </AlertDescription>
        </Alert>
      </div>
    </ArticleLayout>
  );
};

export default GuiaMultimetro;
