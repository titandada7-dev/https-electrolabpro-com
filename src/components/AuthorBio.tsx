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
            Desarrollador web y técnico electrónico con experiencia en diseño de circuitos, 
            programación de microcontroladores y creación de herramientas educativas. Creador de 
            ElectroLab Pro, una plataforma dedicada a hacer la electrónica accesible para 
            estudiantes y profesionales mediante calculadoras interactivas y guías prácticas 
            basadas en documentación técnica profesional.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
              <Wrench className="w-3 h-3" /> Electrónica Práctica
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
              <BookOpen className="w-3 h-3" /> Contenido Educativo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
