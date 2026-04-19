import { Link } from "react-router-dom";
import { Gamepad2, Sparkles, ChevronRight } from "lucide-react";

interface PlayCTAProps {
  /** Tema del artículo donde aparece — personaliza el copy */
  topic?: "ohm" | "arduino" | "resistencias" | "general";
}

/**
 * CTA reutilizable para invitar al usuario a jugar ElectroLab Play
 * desde dentro de un artículo. Diseño coherente con el sistema (tokens semánticos),
 * fade-in only (sin transformaciones Y), totalmente responsivo.
 */
const PlayCTA = ({ topic = "general" }: PlayCTAProps) => {
  const copy: Record<NonNullable<PlayCTAProps["topic"]>, { title: string; desc: string }> = {
    ohm: {
      title: "¿Ya entendiste la Ley de Ohm?",
      desc: "Ponete a prueba con preguntas sobre V = I × R en ElectroLab Play y mirá si podés resolverlas contrarreloj.",
    },
    arduino: {
      title: "¿Te animás a un quiz sobre Arduino?",
      desc: "Probá ElectroLab Play: preguntas reales sobre pines, sensores, PWM y proyectos. Gratis y sin registro.",
    },
    resistencias: {
      title: "¿Sabés leer cualquier resistencia?",
      desc: "Demostralo en ElectroLab Play: identificá colores, valores y tolerancias contrarreloj.",
    },
    general: {
      title: "Aprende jugando",
      desc: "Poné a prueba lo que aprendiste con ElectroLab Play, el quiz interactivo de electrónica.",
    },
  };

  const { title, desc } = copy[topic];

  return (
    <aside
      aria-label="Jugá ElectroLab Play"
      className="my-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 sm:p-6 shadow-sm animate-in fade-in duration-300"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary sm:h-12 sm:w-12">
            <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              Nuevo · Gratis
            </span>
            <h3 className="mt-1.5 text-base font-extrabold leading-tight text-foreground sm:text-lg">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {desc}
            </p>
          </div>
        </div>

        <Link
          to="/aprende-jugando"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg sm:w-auto"
        >
          <Gamepad2 className="h-4 w-4" />
          Jugá ElectroLab Play
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
};

export default PlayCTA;
