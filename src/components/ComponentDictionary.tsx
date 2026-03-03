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
    description: "Se opone al paso de la corriente para proteger otros componentes.",
    details: "Su valor se mide en Ohmios (Ω). Se usa en prácticamente todos los circuitos para limitar la corriente y proteger componentes sensibles como LEDs y microcontroladores.",
    amazonSearch: "resistencias+electronica+kit",
  },
  {
    name: "Capacitor",
    icon: <CircuitBoard className="w-8 h-8" />,
    symbol: "⏚ —||— ⏚",
    description: "Almacena energía temporalmente como una batería pequeña.",
    details: "Filtra señales y estabiliza el voltaje. Se usa en fuentes de alimentación, temporizadores y filtros de audio. Su capacidad se mide en Faradios (F).",
    amazonSearch: "capacitores+electronica+kit",
  },
  {
    name: "Diodo",
    icon: <ArrowRight className="w-8 h-8" />,
    symbol: "⏚ —▷|— ⏚",
    description: "Funciona como una válvula de una sola vía; solo deja pasar la corriente en un sentido.",
    details: "Protege contra conexiones invertidas. Se usa para rectificar corriente alterna (AC) a directa (DC) y para proteger circuitos de polaridad inversa.",
    amazonSearch: "diodos+electronica+kit",
  },
  {
    name: "Transistor",
    icon: <Cpu className="w-8 h-8" />,
    symbol: "B ─┤\n    ├─ C\nE ─┘",
    description: "Es el 'cerebro' básico de la electrónica moderna.",
    details: "Puede funcionar como un interruptor electrónico o como un amplificador de señales. Tiene 3 pines: Base, Colector y Emisor. Los procesadores contienen miles de millones de transistores.",
    amazonSearch: "transistores+electronica+kit",
  },
  {
    name: "LED",
    icon: <Lightbulb className="w-8 h-8" />,
    symbol: "⏚ —▷|→ ⏚",
    description: "Un diodo que emite luz (Light Emitting Diode).",
    details: "Recuerda que siempre necesita una resistencia para no quemarse. Consume muy poca energía y tiene polaridad: la pata larga es el positivo (+) y la corta el negativo (-).",
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
