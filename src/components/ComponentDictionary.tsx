import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, Lightbulb, ArrowRight, CircuitBoard, Cpu, ExternalLink, ShoppingCart, Search, Thermometer, Radio, BatteryCharging, Power, Wrench, Microchip } from "lucide-react";

type Category = "Todos" | "Pasivos" | "Activos" | "Sensores" | "Herramientas";

interface ComponentInfo {
  name: string;
  icon: React.ReactNode;
  symbol: string;
  description: string;
  details: string;
  highlights: string[];
  amazonSearch: string;
  category: Category;
  banner: string; // gradiente CSS para el hero del modal
}

const CATEGORIES: { label: Category; icon: React.ReactNode }[] = [
  { label: "Todos", icon: <CircuitBoard className="w-3.5 h-3.5" /> },
  { label: "Pasivos", icon: <Zap className="w-3.5 h-3.5" /> },
  { label: "Activos", icon: <Cpu className="w-3.5 h-3.5" /> },
  { label: "Sensores", icon: <Thermometer className="w-3.5 h-3.5" /> },
  { label: "Herramientas", icon: <Wrench className="w-3.5 h-3.5" /> },
];

const COMPONENTS: ComponentInfo[] = [
  {
    name: "Resistor",
    icon: <Zap className="w-8 h-8" />,
    symbol: "⏚ —[/\\/\\/]— ⏚",
    description: "Limita el flujo de corriente eléctrica en un circuito según la Ley de Ohm (V = I × R).",
    details:
      "Se mide en ohmios (Ω). Su valor se identifica por bandas de colores (4 o 5 bandas) o por código numérico SMD. Parámetros clave a considerar: valor nominal, tolerancia (típicamente ±1%, ±5%) y potencia disipable (1/8W, 1/4W, 1/2W, 1W). Aplicaciones típicas: limitar corriente en LEDs, divisores de tensión, polarización de transistores y pull-up / pull-down en entradas digitales.",
    highlights: ["Unidad: ohmio (Ω)", "Tolerancia típica: ±5%", "Potencia: 1/4 W estándar"],
    amazonSearch: "resistencias+electronica+kit",
    category: "Pasivos",
    banner: "linear-gradient(135deg, hsl(25 95% 53% / 0.35), hsl(45 95% 53% / 0.15))",
  },
  {
    name: "Condensador",
    icon: <CircuitBoard className="w-8 h-8" />,
    symbol: "⏚ —||— ⏚",
    description: "Almacena energía en un campo eléctrico entre dos placas y la libera cuando la tensión cae.",
    details:
      "Se mide en faradios (F), normalmente en μF, nF o pF. Tipos principales: cerámicos (no polarizados, alta frecuencia), electrolíticos (polarizados, alta capacidad), tantalio (estables, compactos) y de poliéster. Usos clave: filtrado de fuentes (desacoplo de Vcc con 100 nF cerca de cada IC), acoplo de señal AC, temporización en circuitos RC y arranque de motores monofásicos. Atención a la tensión máxima — exceder Vmax destruye el dieléctrico.",
    highlights: ["Unidad: faradio (F)", "Tipos: cerámico, electrolítico, tantalio", "Polaridad: depende del tipo"],
    amazonSearch: "capacitores+electronica+kit",
    category: "Pasivos",
    banner: "linear-gradient(135deg, hsl(210 95% 55% / 0.35), hsl(190 95% 55% / 0.15))",
  },
  {
    name: "Diodo LED",
    icon: <Lightbulb className="w-8 h-8" />,
    symbol: "⏚ —▷|→ ⏚",
    description: "Diodo semiconductor que emite luz cuando circula corriente directa a través de la juntura P-N.",
    details:
      "Tiene polaridad: ánodo (+) es la pata larga, cátodo (–) la corta y suele tener un chaflán plano en la cápsula. Caída de tensión típica (Vf): 1.8–2.2 V (rojo), 2.0–2.4 V (amarillo), 3.0–3.4 V (azul/blanco/verde). Corriente nominal estándar: 20 mA. SIEMPRE requiere resistencia limitadora calculada como R = (Vfuente − Vf) / If. Para alta potencia (1 W+) se necesita disipador térmico.",
    highlights: ["Corriente típica: 20 mA", "Vf: 1.8 – 3.4 V", "Requiere resistencia limitadora"],
    amazonSearch: "led+electronica+kit+colores",
    category: "Activos",
    banner: "linear-gradient(135deg, hsl(0 95% 60% / 0.35), hsl(45 95% 60% / 0.15))",
  },
  {
    name: "Transistor NPN 2N2222",
    icon: <Cpu className="w-8 h-8" />,
    symbol: "B ─┤\n    ├─ C\nE ─┘",
    description: "Transistor bipolar (BJT) de silicio de baja potencia para amplificación lineal y conmutación.",
    details:
      "Parámetros (encapsulado TO-92): Vce máx = 40 V, Ic máx = 800 mA, hFE típico 100–300, fT ≈ 250 MHz. Pinout visto de frente (lado plano hacia vos): 1) Emisor, 2) Base, 3) Colector. Aplicaciones: driver de relés (con diodo de rueda libre), amplificador de pequeña señal, oscilador, conmutación de cargas inductivas de baja potencia. Para corrientes mayores usar TIP120 (Darlington) o un MOSFET tipo IRLZ44N.",
    highlights: ["Ic máx: 800 mA", "Vce máx: 40 V", "hFE: 100 – 300"],
    amazonSearch: "2n2222+transistor",
    category: "Activos",
    banner: "linear-gradient(135deg, hsl(270 80% 60% / 0.35), hsl(210 80% 55% / 0.15))",
  },
  {
    name: "Circuito Integrado 555",
    icon: <Microchip className="w-8 h-8" />,
    symbol: "⏚ —[IC]— ⏚",
    description: "Temporizador y oscilador integrado, uno de los IC más utilizados en electrónica analógica.",
    details:
      "Encapsulado DIP-8. Funciona en tres modos: monoestable (genera un pulso de duración T = 1.1·R·C), astable (oscilador con frecuencia f = 1.44 / ((R1 + 2·R2) · C)) y biestable (flip-flop por entradas SET/RESET). Alimentación 4.5–15 V, corriente de salida hasta 200 mA — puede manejar LEDs y relés directamente. Versión CMOS (TLC555, ICM7555) consume menos y opera desde 2 V.",
    highlights: ["Encapsulado: DIP-8", "Alimentación: 4.5 – 15 V", "Modos: astable, monoestable, biestable"],
    amazonSearch: "ne555+temporizador",
    category: "Activos",
    banner: "linear-gradient(135deg, hsl(160 80% 45% / 0.35), hsl(200 80% 55% / 0.15))",
  },
  {
    name: "Fotorresistencia (LDR)",
    icon: <Thermometer className="w-8 h-8" />,
    symbol: "⏚ —[LDR]— ⏚",
    description: "Resistencia variable cuyo valor disminuye al aumentar la iluminación incidente.",
    details:
      "También llamada LDR (Light Dependent Resistor). Resistencia típica: 1 MΩ en oscuridad total, 5–20 kΩ a luz ambiente, < 1 kΩ con luz directa. Material habitual: sulfuro de cadmio (CdS), espectro de respuesta similar al ojo humano (pico ≈ 550 nm). Se usa en divisores de tensión leídos por ADC para detección de luz, control automático de iluminación, robots seguidores de línea y crepusculares. Tiempo de respuesta lento (decenas de ms): no apta para señales rápidas — para eso usar fotodiodo o fototransistor.",
    highlights: ["Oscuridad: ~1 MΩ", "Luz directa: < 1 kΩ", "Espectro: visible (550 nm)"],
    amazonSearch: "fotoresistencia+ldr+electronica",
    category: "Sensores",
    banner: "linear-gradient(135deg, hsl(45 95% 55% / 0.35), hsl(25 95% 50% / 0.15))",
  },
  {
    name: "Termistor NTC",
    icon: <Thermometer className="w-8 h-8" />,
    symbol: "⏚ —[NTC]— ⏚",
    description: "Resistencia cuyo valor disminuye al aumentar la temperatura (coeficiente negativo).",
    details:
      "Valor común: 10 kΩ a 25 °C. Su comportamiento se modela con la ecuación de Steinhart-Hart o, de forma simplificada, con el parámetro Beta (β ≈ 3950 K para NTCs típicos). Aplicaciones: medición de temperatura en impresoras 3D (hotend, cama caliente), protección térmica de fuentes y baterías, compensación térmica de circuitos. Para lectura con Arduino se conecta en divisor con una resistencia fija de 10 kΩ y se lee por ADC.",
    highlights: ["10 kΩ @ 25 °C", "Beta típico: 3950 K", "Uso: impresoras 3D, baterías"],
    amazonSearch: "termistor+ntc+10k+electronica",
    category: "Sensores",
    banner: "linear-gradient(135deg, hsl(350 80% 55% / 0.35), hsl(20 80% 55% / 0.15))",
  },
  {
    name: "Multímetro Digital",
    icon: <Wrench className="w-8 h-8" />,
    symbol: "⏚ —[DMM]— ⏚",
    description: "Instrumento esencial para medir magnitudes eléctricas en cualquier diagnóstico de circuito.",
    details:
      "Funciones básicas obligatorias: tensión DC/AC, corriente DC (mA y A), resistencia, continuidad con buzzer y prueba de diodos. Funciones recomendadas: capacitancia, frecuencia (Hz) y temperatura con termopar tipo K. Precisión típica de gama media: ±0.5 % en DCV. Categorías de seguridad (CAT II, III, IV) — para mediciones en red eléctrica usar siempre un multímetro CAT III 600 V o superior. Marcas confiables: Fluke, UNI-T, Brymen, Aneng (gama económica).",
    highlights: ["Mide: V, A, Ω, continuidad", "Precisión: ±0.5 % DCV", "Seguridad: CAT III para red"],
    amazonSearch: "multimetro+digital+autorango",
    category: "Herramientas",
    banner: "linear-gradient(135deg, hsl(140 60% 45% / 0.35), hsl(180 60% 45% / 0.15))",
  },
  {
    name: "Protoboard (Breadboard)",
    icon: <CircuitBoard className="w-8 h-8" />,
    symbol: "⏚ —[BB]— ⏚",
    description: "Placa de prototipado sin soldadura para armar y modificar circuitos rápidamente.",
    details:
      "Estructura interna: las dos filas laterales (rieles rojo y azul) están conectadas horizontalmente y se usan como buses de alimentación (Vcc y GND). Las columnas centrales están conectadas verticalmente en grupos de 5 contactos, separadas por un canal central que permite insertar circuitos integrados DIP. Limitaciones: corriente máxima ≈ 1 A por contacto, capacitancia parásita entre filas que afecta a señales > 10 MHz. No apta para circuitos definitivos — pasar a perfboard o PCB para diseños finales.",
    highlights: ["Sin soldadura", "Corriente máx: ~1 A/contacto", "Ideal para prototipos rápidos"],
    amazonSearch: "protoboard+830+puntos+kit",
    category: "Herramientas",
    banner: "linear-gradient(135deg, hsl(280 60% 55% / 0.35), hsl(320 60% 55% / 0.15))",
  },
];

const ComponentDictionary = () => {
  const [selected, setSelected] = useState<ComponentInfo | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  const filtered = useMemo(() => {
    return COMPONENTS.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "Todos" || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-foreground glow-text">
          Diccionario de Componentes
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Busca y explora componentes electrónicos
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar componente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          {CATEGORIES.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                activeCategory === label
                  ? "bg-primary text-primary-foreground border-primary glow"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((comp) => (
          <button
            key={comp.name}
            onClick={() => setSelected(comp)}
            className="group relative flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:glow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
          >
            <Badge variant="outline" className="absolute top-2 right-2 text-[10px] text-muted-foreground border-border">
              {comp.category}
            </Badge>
            <div className="p-3 rounded-lg bg-secondary text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
              {comp.icon}
            </div>
            <span className="font-medium text-foreground text-sm">{comp.name}</span>
            <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2 text-center">
              {comp.description}
            </p>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No se encontraron componentes
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-mono text-primary flex items-center gap-2">
              {selected?.icon}
              {selected?.name}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary text-center">
                <p className="text-xs text-muted-foreground mb-1">Símbolo electrónico</p>
                <pre className="font-mono text-primary text-lg whitespace-pre">{selected.symbol}</pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">¿Para qué sirve?</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{selected.description}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{selected.details}</p>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <p className="text-xs text-muted-foreground text-center">
                  ⭐ Recomendado para tus proyectos: <span className="text-foreground font-medium">Kit de inicio para principiantes</span>
                </p>
              </div>

              <Button
                className="w-full gap-2 font-semibold bg-[hsl(25,95%,53%)] hover:bg-[hsl(25,95%,45%)] text-[hsl(0,0%,100%)]"
                onClick={() => window.open(`https://www.amazon.es/s?k=${selected.amazonSearch}&tag=electrolabp0c-21`, "_blank")}
              >
                <ShoppingCart className="w-4 h-4" />
                Comprar Kit de {selected.name}
              </Button>
              <Button variant="outline" className="w-full mt-1 gap-2" asChild>
                <a href={`https://www.amazon.es/s?k=${selected.name}+electronics&tag=electrolabp0c-21`} target="_blank" rel="noopener noreferrer">
                  Ver precios en Amazon
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ComponentDictionary;
