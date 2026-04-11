import { useState } from "react";
import { Lightbulb, ShoppingCart, ChevronDown, ChevronUp, ExternalLink, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Material {
  name: string;
  qty: string;
  amazonSearch: string;
}

interface Project {
  title: string;
  objective: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  materials: Material[];
  steps: string[];
  tip: string;
}

const PROJECTS: Project[] = [
  {
    title: "Interruptor Táctil con 2N2222",
    objective: "Prender un LED usando tu dedo como resistencia.",
    difficulty: "Principiante",
    materials: [
      { name: "Transistor 2N2222", qty: "1x", amazonSearch: "2n2222+transistor" },
      { name: "LED (cualquier color)", qty: "1x", amazonSearch: "led+5mm+kit+colores" },
      { name: "Resistencia 330Ω", qty: "1x", amazonSearch: "resistencias+330+ohm" },
      { name: "Batería 9V + conector", qty: "1x", amazonSearch: "bateria+9v+conector+clip" },
    ],
    steps: [
      "Conecta el Emisor (E) del 2N2222 al negativo (–) de la batería.",
      "Conecta la Resistencia de 330Ω en serie con el LED (ánodo del LED → resistencia → positivo de la batería).",
      "Conecta el Cátodo del LED al Colector (C) del transistor.",
      "Deja la Base (B) del transistor con un cable libre al aire.",
      "Toca la Base con tu dedo mientras tocas el positivo (+) con la otra mano. ¡El LED se enciende!",
    ],
    tip: "Tu cuerpo actúa como una resistencia de alta impedancia (~1MΩ), dejando pasar suficiente corriente a la Base para activar el transistor y encender el LED.",
  },
];

const MiniProjects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-center flex items-center justify-center gap-3">
        <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-primary glow-icon" />
        Mini Proyectos
      </h2>
      <p className="text-center text-muted-foreground text-xs sm:text-sm">
        Aprende construyendo — circuitos simples con componentes reales
      </p>

      <div className="space-y-4">
        {PROJECTS.map((project, i) => {
          const isOpen = expandedIndex === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden transition-all duration-300 hover:border-primary/40"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-foreground text-sm sm:text-base">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.objective}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                    {project.difficulty}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 space-y-5 border-t border-border pt-4">
                  {/* Circuit diagram placeholder */}
                  <div className="p-4 rounded-lg bg-secondary text-center">
                    <p className="text-xs text-muted-foreground mb-2">Esquema del circuito</p>
                    <pre className="font-mono text-primary text-xs sm:text-sm whitespace-pre leading-relaxed">
{`     +9V
      │
    [330Ω]
      │
    [LED]
      │
      C
  B ──┤ 2N2222
      E
      │
     GND`}
                    </pre>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      📋 Pasos
                    </h4>
                    <ol className="space-y-2">
                      {project.steps.map((step, si) => (
                        <li key={si} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                            {si + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tip */}
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary font-semibold">💡 ¿Por qué funciona?</span>{" "}
                      {project.tip}
                    </p>
                  </div>

                  {/* Materials with Amazon links */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-primary" />
                      Materiales — Comprar en Amazon
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.materials.map((mat, mi) => (
                        <a
                          key={mi}
                          href={`https://www.amazon.es/s?k=${mat.amazonSearch}&tag=electrolabp0c-21`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/60 transition-all group"
                        >
                          <span className="text-sm text-foreground">
                            <span className="text-muted-foreground">{mat.qty}</span>{" "}
                            {mat.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* CTA Kit completo */}
                  <Button
                    className="w-full gap-2 font-semibold bg-[hsl(25,95%,53%)] hover:bg-[hsl(25,95%,45%)] text-[hsl(0,0%,100%)]"
                    onClick={() =>
                      window.open(
                        "https://www.amazon.es/s?k=kit+electronica+principiante+transistor+led&tag=electrolabp0c-21",
                        "_blank"
                      )
                    }
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Comprar Kit Completo en Amazon
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MiniProjects;
