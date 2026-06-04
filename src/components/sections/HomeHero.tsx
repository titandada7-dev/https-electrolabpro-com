import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircuitBoard, BookOpen, Calculator, Lightbulb, Cpu } from "lucide-react";

interface HomeHeroProps {
  scrollTo: (id: string) => void;
}

const HomeHero = ({ scrollTo }: HomeHeroProps) => {
  return (
    <section id="inicio" className="relative flex min-h-[55vh] flex-col items-center justify-center px-6 text-center py-16 sm:py-24 bg-hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.35] pointer-events-none" aria-hidden="true" />
      <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 sm:p-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider mb-6">
          <CircuitBoard className="w-3.5 h-3.5" />
          CENTRO DE INVESTIGACIÓN TÉCNICA
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
          ElectroLab Pro — Investigación, Cálculo y{" "}
          <span className="text-gradient-primary">Documentación Electrónica</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Herramientas y guías basadas en estándares internacionales de ingeniería, validadas en banco de pruebas.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-6 text-sm font-medium text-foreground">
          <span className="flex items-center gap-1.5">
            <Calculator className="h-4 w-4 text-primary" /> ✔ Calculadora Ley de Ohm
          </span>
          <span className="flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-primary" /> ✔ Cálculo de resistencia para LED
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-primary" /> ✔ Código de colores de resistencias
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Button size="lg" className="gap-2" onClick={() => scrollTo("guias")}>
            <BookOpen className="h-4 w-4" /> Ver guías
          </Button>
          <Button size="lg" variant="outline" className="gap-2" onClick={() => scrollTo("calculadora")}>
            <Calculator className="h-4 w-4" /> Usar calculadoras
          </Button>
        </div>

        <Link
          to="/aprende-jugando"
          className="group mt-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-5 py-3 text-sm font-semibold hover:border-primary transition-all duration-300"
          aria-label="Jugá ElectroLab Play, el quiz interactivo de electrónica"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-base">🎮</span>
          <span>
            <span className="text-primary font-bold">Nuevo:</span> Jugá ElectroLab Play
          </span>
          <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            Quiz
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;
