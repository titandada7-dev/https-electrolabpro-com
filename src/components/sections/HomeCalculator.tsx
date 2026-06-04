import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const SectionFallback = () => (
  <div className="flex justify-center py-10" aria-hidden="true">
    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const CalculatorHub = lazy(() => import("@/components/CalculatorHub"));

interface HomeCalculatorProps {
  // No props needed
}

const HomeCalculator = ({}: HomeCalculatorProps) => {
  return (
    <section
      id="calculadora"
      className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 border-t border-border"
    >
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">
          Nivel 1
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
          Laboratorio de <span className="text-primary">Cálculo</span>
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
          Calculadoras interactivas verificadas en banco de pruebas con multímetro Fluke 117 y osciloscopio Hantek DSO5102P. Cada fórmula deriva de datasheets de fabricante y bibliografía de referencia.
        </p>
        <div className="mt-4 flex justify-center">
          <Link to="/documentacion-tecnica#nivel-1" className="text-xs font-semibold text-primary hover:underline">
            Ver metodología completa →
          </Link>
        </div>
      </div>
      <Suspense fallback={<SectionFallback />}>
        <CalculatorHub />
      </Suspense>
    </section>
  );
};

export default HomeCalculator;
