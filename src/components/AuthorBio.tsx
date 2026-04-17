import { User, BookOpen, Wrench } from "lucide-react";

const AuthorBio = () => {
  return (
    <div className="mt-12 p-6 rounded-2xl border border-border bg-card/80 backdrop-blur">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="shrink-0 flex items-start justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
              Escrito por
            </p>
            <h3 className="text-lg font-bold font-mono text-foreground">
              J.A. Sánchez
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Aficionado a la electrónica y estudiante de desarrollo web e informática. Creador de 
            ElectroLab Pro, un proyecto personal nacido de la frustración de saltar entre múltiples 
            páginas para hacer cálculos básicos. Combina su pasión por la electrónica con sus estudios 
            de programación para construir las herramientas gratuitas en español que le hubiera 
            gustado encontrar al empezar. Cada calculadora y guía es contrastada con documentación 
            técnica reconocida y mejorada con el feedback de la comunidad.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
              <Wrench className="w-3 h-3" /> Aficionado a la Electrónica
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
              <BookOpen className="w-3 h-3" /> Estudiante de Desarrollo Web
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
