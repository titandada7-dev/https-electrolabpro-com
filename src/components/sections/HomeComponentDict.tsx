import { Suspense, lazy } from "react";

const SectionFallback = () => (
  <div className="flex justify-center py-10" aria-hidden="true">
    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const ComponentDictionary = lazy(() => import("@/components/ComponentDictionary"));

const HomeComponentDict = () => {
  return (
    <section
      id="diccionario"
      className="container mx-auto px-6 py-12 border-t border-border"
    >
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gradient-gold">
          Nivel 2
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
          Investigación de <span className="text-gradient-primary">Componentes</span>
        </h2>
        <p className="mt-3 text-base max-w-2xl mx-auto text-gradient-silver">
          Fichas técnicas con símbolo IEEE 315, encapsulado, parámetros eléctricos críticos (Vce/Ic max, Vf, Pd) y aplicaciones contrastadas con uso real en banco de pruebas.
        </p>
      </div>
      <Suspense fallback={<SectionFallback />}>
        <ComponentDictionary />
      </Suspense>
    </section>
  );
};

export default HomeComponentDict;
