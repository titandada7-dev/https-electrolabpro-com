import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap, Battery, Sigma, Volume2, Activity, Gauge,
  Power, Cpu, ArrowRight, Info,
} from "lucide-react";

type DialId =
  | "off" | "vac" | "vdc" | "ohm" | "cont"
  | "diode" | "aac" | "adc" | "hfe";

interface DialPosition {
  id: DialId;
  label: string;          // shown on the dial
  short: string;          // chip/tag
  title: string;          // panel title
  unit: string;
  example: string;        // example reading
  desc: string;
  tip: string;
  icon: typeof Zap;
  color: string;          // accent class
  angle: number;          // degrees on the dial (0 = top, clockwise)
}

const POSITIONS: DialPosition[] = [
  {
    id: "off", label: "OFF", short: "Apagado",
    title: "Posición OFF",
    unit: "—", example: "----",
    desc: "Apaga el multímetro y desconecta la batería interna. Siempre dejá el selector en OFF cuando guardes el equipo.",
    tip: "Guardar el tester en otra posición consume la pila aunque no lo uses.",
    icon: Power, color: "text-slate-400 border-slate-500/50 bg-slate-500/10", angle: 0,
  },
  {
    id: "vac", label: "V~", short: "Voltaje AC",
    title: "Voltaje Alterno (V~)",
    unit: "Voltios AC", example: "220.5 V",
    desc: "Mide tensión alterna: enchufes de pared (220 V / 110 V), salida de transformadores, generadores.",
    tip: "Conectá las puntas en paralelo. Cable negro al COM, rojo al VΩmA.",
    icon: Activity, color: "text-amber-300 border-amber-500/50 bg-amber-500/10", angle: 40,
  },
  {
    id: "vdc", label: "V⎓", short: "Voltaje DC",
    title: "Voltaje Continuo (V⎓)",
    unit: "Voltios DC", example: "9.00 V",
    desc: "Mide tensión continua: pilas, baterías, fuentes de alimentación, salidas de Arduino, paneles solares.",
    tip: "Si la lectura aparece en negativo, invertí las puntas: el rojo va al positivo.",
    icon: Battery, color: "text-cyan-300 border-cyan-500/50 bg-cyan-500/10", angle: 80,
  },
  {
    id: "ohm", label: "Ω", short: "Resistencia",
    title: "Resistencia (Ω)",
    unit: "Ohmios", example: "4.7 kΩ",
    desc: "Mide la oposición al paso de la corriente. Sirve para resistencias, bobinas, fusibles y pistas de PCB.",
    tip: "REGLA DE ORO: el circuito SIEMPRE tiene que estar desenergizado antes de medir Ω.",
    icon: Sigma, color: "text-emerald-300 border-emerald-500/50 bg-emerald-500/10", angle: 120,
  },
  {
    id: "cont", label: "🔊", short: "Continuidad",
    title: "Continuidad",
    unit: "Pitido sonoro", example: "BEEP",
    desc: "Emite un pitido si la resistencia entre las puntas es menor a ~30–50 Ω. Ideal para verificar cables, pistas y fusibles.",
    tip: "Si no pita, el camino está abierto: cable roto, fusible quemado o pista cortada.",
    icon: Volume2, color: "text-lime-300 border-lime-500/50 bg-lime-500/10", angle: 160,
  },
  {
    id: "diode", label: "▶|", short: "Diodo",
    title: "Prueba de Diodos",
    unit: "Caída de tensión", example: "0.65 V",
    desc: "Mide la caída de tensión directa de un diodo o LED. Te dice si conduce y en qué polaridad.",
    tip: "Diodos de silicio: 0.55–0.75 V. LEDs rojos: ~1.8 V. LEDs azules/blancos: ~3 V.",
    icon: Zap, color: "text-fuchsia-300 border-fuchsia-500/50 bg-fuchsia-500/10", angle: 200,
  },
  {
    id: "aac", label: "A~", short: "Corriente AC",
    title: "Corriente Alterna (A~)",
    unit: "Amperios AC", example: "1.25 A",
    desc: "Mide consumo de corriente alterna del circuito. Se conecta SIEMPRE en serie, interrumpiendo el cable.",
    tip: "PELIGRO: no toques los terminales del enchufe con las puntas. Para AC alta, usá pinza amperométrica.",
    icon: Activity, color: "text-rose-300 border-rose-500/50 bg-rose-500/10", angle: 240,
  },
  {
    id: "adc", label: "A⎓", short: "Corriente DC",
    title: "Corriente Continua (A⎓)",
    unit: "Amperios DC", example: "120 mA",
    desc: "Mide el consumo de un circuito DC (Arduino, LEDs, motores). Hay que abrir el circuito y conectar el tester en serie.",
    tip: "Si la corriente supera 200 mA, pasá la sonda roja al puerto 10 A para no quemar el fusible.",
    icon: Gauge, color: "text-orange-300 border-orange-500/50 bg-orange-500/10", angle: 280,
  },
  {
    id: "hfe", label: "hFE", short: "Transistores",
    title: "Ganancia de Transistores (hFE)",
    unit: "Sin unidad (β)", example: "215",
    desc: "Mide la ganancia de corriente (β) de un transistor NPN o PNP usando el zócalo dedicado del tester.",
    tip: "Verificá la posición del Emisor/Base/Colector en el zócalo. Un transistor sano muestra entre 50 y 800.",
    icon: Cpu, color: "text-violet-300 border-violet-500/50 bg-violet-500/10", angle: 320,
  },
];

const InteractiveMultimeter = () => {
  const [activeId, setActiveId] = useState<DialId>("vdc");
  const active = POSITIONS.find((p) => p.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* ─── DIAL INTERACTIVO ─── */}
      <div className="lg:col-span-3 rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
            Tester · Modo demo
          </span>
          <span className="text-[10px] font-mono text-slate-500">CAT III 600V</span>
        </div>

        {/* Pantalla LCD */}
        <div className="rounded-md bg-slate-950 border-2 border-slate-800 p-4 mb-6 shadow-inner">
          <div className="flex items-end justify-between">
            <span className="text-[10px] font-mono text-cyan-500/70 uppercase">{active.short}</span>
            <span
              className="font-mono text-3xl sm:text-4xl text-cyan-300 tracking-wider"
              style={{ textShadow: "0 0 14px hsl(180 100% 50% / 0.65)" }}
            >
              {active.example}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9px] font-mono text-slate-600">AUTO</span>
            <span className="text-[10px] font-mono text-cyan-400/80">{active.unit}</span>
          </div>
        </div>

        {/* Dial circular */}
        <div className="relative mx-auto aspect-square w-full max-w-[340px]">
          {/* anillo exterior */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-4 border-slate-950 shadow-2xl" />
          {/* etiquetas alrededor */}
          {POSITIONS.map((p) => {
            const isActive = p.id === activeId;
            const Icon = p.icon;
            // posición radial — convertimos a coord polar
            const rad = ((p.angle - 90) * Math.PI) / 180;
            const radius = 46; // %
            const x = 50 + radius * Math.cos(rad);
            const y = 50 + radius * Math.sin(rad);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                aria-label={`Posición ${p.short}`}
                aria-pressed={isActive}
                style={{ left: `${x}%`, top: `${y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-200 font-mono font-bold ${
                  isActive
                    ? `${p.color} scale-110 ring-2 ring-cyan-300/60 shadow-[0_0_18px_hsl(180_100%_50%/0.45)] z-10`
                    : "bg-slate-800/80 border-slate-700 text-slate-400 hover:border-cyan-400/60 hover:text-cyan-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5 mb-0.5" aria-hidden="true" />
                <span className="text-[10px] leading-none">{p.label}</span>
              </button>
            );
          })}

          {/* Selector giratorio central con puntero rotativo */}
          <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border-4 border-slate-700 shadow-inner flex items-center justify-center">
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `rotate(${active.angle}deg)` }}
            >
              {/* flecha indicadora */}
              <span
                className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-7 rounded-full bg-cyan-300"
                style={{ boxShadow: "0 0 10px hsl(180 100% 50% / 0.9)" }}
              />
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              Selector
            </span>
          </div>
        </div>

        {/* Puertos inferiores */}
        <div className="flex justify-around mt-6 pt-4 border-t border-slate-800">
          {[
            { l: "10A", c: "bg-red-600" },
            { l: "VΩmA", c: "bg-red-600" },
            { l: "COM", c: "bg-slate-900 border border-slate-600" },
          ].map((p) => (
            <div key={p.l} className="flex flex-col items-center gap-1">
              <span className={`block w-5 h-5 rounded-full ${p.c} border-2 border-slate-700`} />
              <span className="text-[9px] font-mono text-slate-500 font-bold">{p.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PANEL EXPLICATIVO ─── */}
      <div className="lg:col-span-2 flex flex-col rounded-3xl border border-cyan-500/30 bg-slate-900/70 backdrop-blur p-6 shadow-xl">
        <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1 mb-4">
          <Info className="h-3 w-3" /> Qué se mide acá
        </span>
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${active.color}`}>
            <ActiveIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight m-0">
              {active.title}
            </h3>
            <span className="text-xs font-mono text-slate-400">{active.unit}</span>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed text-sm">{active.desc}</p>

        <div className="mt-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300">
            💡 Tip
          </span>
          <p className="text-slate-300 text-sm mt-1 leading-relaxed">{active.tip}</p>
        </div>

        <div className="mt-auto pt-5 border-t border-slate-700/60">
          <p className="text-[11px] text-slate-500 font-mono uppercase tracking-widest mb-3">
            Tocá otra posición del selector ↻
          </p>
          <Link
            to="/guia-multimetro"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:gap-3 transition-all"
          >
            Ver guía completa del multímetro <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMultimeter;
