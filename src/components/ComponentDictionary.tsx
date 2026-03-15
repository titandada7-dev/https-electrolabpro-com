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
  amazonSearch: string;
  category: Category;
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
    description: "Limita el flujo de corriente eléctrica en un circuito.",
    details: "Se mide en Ohmios (Ω). Se usa en prácticamente todos los circuitos para limitar la corriente y proteger componentes sensibles como LEDs y microcontroladores.",
    amazonSearch: "resistencias+electronica+kit",
    category: "Pasivos",
  },
  {
    name: "Condensador",
    icon: <CircuitBoard className="w-8 h-8" />,
    symbol: "⏚ —||— ⏚",
    description: "Almacena energía en un campo eléctrico y la libera cuando es necesario.",
    details: "Se mide en Faradios (F). Se usa en fuentes de alimentación, temporizadores y filtros de audio para estabilizar el voltaje y filtrar señales.",
    amazonSearch: "capacitores+electronica+kit",
    category: "Pasivos",
  },
  {
    name: "Inductor",
    icon: <Radio className="w-8 h-8" />,
    symbol: "⏚ —))))— ⏚",
    description: "Almacena energía en un campo magnético.",
    details: "Es común en filtros y fuentes de alimentación. Su valor se mide en Henrios (H). Resiste cambios bruscos de corriente.",
    amazonSearch: "inductores+electronica+kit",
    category: "Pasivos",
  },
  {
    name: "Potenciómetro",
    icon: <BatteryCharging className="w-8 h-8" />,
    symbol: "⏚ —[↕]— ⏚",
    description: "Es una resistencia variable.",
    details: "Se usa comúnmente para controlar el volumen o la intensidad de luz. Tiene 3 terminales y permite ajustar voltaje o corriente de forma manual.",
    amazonSearch: "potenciometro+electronica+kit",
    category: "Pasivos",
  },
  {
    name: "Diodo LED",
    icon: <Lightbulb className="w-8 h-8" />,
    symbol: "⏚ —▷|→ ⏚",
    description: "Un diodo que emite luz cuando la corriente pasa a través de él.",
    details: "Tiene polaridad (ánodo y cátodo). La pata larga es el positivo (+) y la corta el negativo (-). Siempre necesita una resistencia para no quemarse.",
    amazonSearch: "led+electronica+kit+colores",
    category: "Activos",
  },
  {
    name: "Transistor",
    icon: <Cpu className="w-8 h-8" />,
    symbol: "B ─┤\n    ├─ C\nE ─┘",
    description: "Funciona como un interruptor o amplificador de señales eléctricas.",
    details: "Es el cerebro de la electrónica moderna. Tiene 3 pines: Base, Colector y Emisor. Los procesadores contienen miles de millones de transistores.",
    amazonSearch: "transistores+electronica+kit",
    category: "Activos",
  },
  {
    name: "Transistor NPN 2N2222",
    icon: <Cpu className="w-8 h-8" />,
    symbol: "B ─┤\n    ├─ C\nE ─┘",
    description: "Transistor de silicio de baja potencia diseñado para aplicaciones de amplificación lineal y conmutación.",
    details: "Es uno de los componentes más utilizados por principiantes debido a su versatilidad. Pines (visto de frente): 1. Emisor, 2. Base, 3. Colector.",
    amazonSearch: "2n2222+transistor",
    category: "Activos",
  },
  {
    name: "Circuito Integrado",
    icon: <Microchip className="w-8 h-8" />,
    symbol: "⏚ —[IC]— ⏚",
    description: "Un pequeño chip que contiene miles de componentes diminutos.",
    details: "Realiza tareas complejas en un espacio reducido. Ejemplos comunes: el 555 (temporizador), amplificadores operacionales y microcontroladores.",
    amazonSearch: "circuito+integrado+electronica+kit",
    category: "Activos",
  },
  {
    name: "Pulsador",
    icon: <Power className="w-8 h-8" />,
    symbol: "⏚ —/ /— ⏚",
    description: "Un interruptor momentáneo que permite o interrumpe el paso de corriente mientras se presiona.",
    details: "Solo conduce mientras está presionado. Se usa en interfaces de usuario, teclados y proyectos con Arduino para entrada digital.",
    amazonSearch: "pulsador+boton+electronica+kit",
    category: "Pasivos",
  },
  {
    name: "Fotoresistencia",
    icon: <Thermometer className="w-8 h-8" />,
    symbol: "⏚ —[LDR]— ⏚",
    description: "Cambia su resistencia según la cantidad de luz que recibe.",
    details: "También llamada LDR (Light Dependent Resistor). Más luz = menos resistencia. Se usa en circuitos automáticos de iluminación y robots seguidores de línea.",
    amazonSearch: "fotoresistencia+ldr+electronica",
    category: "Sensores",
  },
  {
    name: "Termistor",
    icon: <Thermometer className="w-8 h-8" />,
    symbol: "⏚ —[NTC]— ⏚",
    description: "Cambia su resistencia según la temperatura.",
    details: "Los NTC disminuyen su resistencia al aumentar la temperatura. Se usa en termómetros digitales, protección térmica y control de temperatura.",
    amazonSearch: "termistor+ntc+electronica+kit",
    category: "Sensores",
  },
  {
    name: "Placa de Pruebas",
    icon: <CircuitBoard className="w-8 h-8" />,
    symbol: "⏚ —[BB]— ⏚",
    description: "Permite armar circuitos sin necesidad de soldar componentes.",
    details: "También conocida como breadboard o protoboard. Ideal para prototipar y experimentar con circuitos de forma rápida y reutilizable.",
    amazonSearch: "protoboard+placa+pruebas+electronica",
    category: "Herramientas",
  },
  {
    name: "Multímetro",
    icon: <Wrench className="w-8 h-8" />,
    symbol: "⏚ —[DMM]— ⏚",
    description: "Herramienta esencial para medir voltaje, corriente y resistencia en un circuito.",
    details: "Puede medir voltaje AC/DC, corriente, resistencia y continuidad. Indispensable para diagnosticar y depurar circuitos electrónicos.",
    amazonSearch: "multimetro+digital+electronica",
    category: "Herramientas",
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
                onClick={() => window.open(`https://www.amazon.es/s?k=${selected.amazonSearch}&tag=electrolabpro-21`, "_blank")}
              >
                <ShoppingCart className="w-4 h-4" />
                Comprar Kit de {selected.name}
              </Button>
              <Button variant="outline" className="w-full mt-1 gap-2" asChild>
                <a href={`https://www.amazon.com/s?k=${selected.name}+electronics&tag=TU_TAG`} target="_blank" rel="noopener noreferrer">
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
