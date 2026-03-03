import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, Lightbulb, ArrowRight, CircuitBoard, Cpu, ExternalLink } from "lucide-react";

interface ComponentInfo {
  name: string;
  icon: React.ReactNode;
  symbol: string;
  description: string;
  details: string;
  amazonSearch: string;
}

const COMPONENTS: ComponentInfo[] = [
  {
    name: "Resistencia",
    icon: <Zap className="w-8 h-8" />,
    symbol: "⏚ —[/\\/\\/]— ⏚",
    description: "Limita el flujo de corriente eléctrica en un circuito.",
    details: "Se usa para proteger componentes sensibles, dividir voltaje y controlar la cantidad de corriente que pasa. Se mide en Ohmios (Ω).",
    amazonSearch: "resistencias+electronica+kit",
  },
  {
    name: "Capacitor",
    icon: <CircuitBoard className="w-8 h-8" />,
    symbol: "⏚ —||— ⏚",
    description: "Almacena y libera energía eléctrica temporalmente.",
    details: "Funciona como una pequeña batería de carga rápida. Se usa para filtrar ruido, estabilizar voltaje y en temporizadores. Se mide en Faradios (F).",
    amazonSearch: "capacitores+electronica+kit",
  },
  {
    name: "Diodo",
    icon: <ArrowRight className="w-8 h-8" />,
    symbol: "⏚ —▷|— ⏚",
    description: "Permite el paso de corriente en una sola dirección.",
    details: "Actúa como una válvula eléctrica. Se usa para proteger circuitos, rectificar corriente alterna (AC) a directa (DC) y en detectores de señal.",
    amazonSearch: "diodos+electronica+kit",
  },
  {
    name: "Transistor",
    icon: <Cpu className="w-8 h-8" />,
    symbol: "B ─┤\n    ├─ C\nE ─┘",
    description: "Amplifica señales o actúa como interruptor electrónico.",
    details: "Es el componente fundamental de toda la electrónica moderna. Los procesadores contienen miles de millones. Tiene 3 pines: Base, Colector y Emisor.",
    amazonSearch: "transistores+electronica+kit",
  },
  {
    name: "LED",
    icon: <Lightbulb className="w-8 h-8" />,
    symbol: "⏚ —▷|→ ⏚",
    description: "Emite luz cuando la corriente pasa a través de él.",
    details: "Es un diodo que emite luz (Light Emitting Diode). Consume muy poca energía. Siempre necesita una resistencia para no quemarse. Tiene polaridad (+/-).",
    amazonSearch: "led+electronica+kit+colores",
  },
];

const ComponentDictionary = () => {
  const [selected, setSelected] = useState<ComponentInfo | null>(null);

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-foreground glow-text">
          Diccionario de Componentes
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Haz clic en un componente para aprender más
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {COMPONENTS.map((comp) => (
          <button
            key={comp.name}
            onClick={() => setSelected(comp)}
            className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:glow transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3 rounded-lg bg-secondary text-primary group-hover:animate-pulse-glow transition-all">
              {comp.icon}
            </div>
            <span className="font-medium text-foreground text-sm">{comp.name}</span>
          </button>
        ))}
      </div>

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
              {/* Electronic Symbol */}
              <div className="p-4 rounded-lg bg-secondary text-center">
                <p className="text-xs text-muted-foreground mb-1">Símbolo electrónico</p>
                <pre className="font-mono text-primary text-lg whitespace-pre">{selected.symbol}</pre>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">¿Para qué sirve?</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{selected.description}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{selected.details}</p>
              </div>

              {/* Amazon button */}
              <Button
                className="w-full gap-2 font-semibold"
                onClick={() => window.open(`https://www.amazon.com/s?k=${selected.amazonSearch}`, "_blank")}
              >
                <ExternalLink className="w-4 h-4" />
                Ver en Amazon
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ComponentDictionary;
