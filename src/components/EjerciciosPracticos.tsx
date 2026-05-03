import { GraduationCap, CheckCircle2 } from "lucide-react";

export interface Ejercicio {
  enunciado: string;
  pista?: string;
  solucion: string;
}

interface Props {
  titulo?: string;
  intro?: string;
  ejercicios: Ejercicio[];
}

/**
 * Sección de ejercicios prácticos con consignas + soluciones colapsables
 * (usa <details> nativo: SEO-friendly y sin JS extra).
 */
const EjerciciosPracticos = ({
  titulo = "Ejercicios prácticos",
  intro = "Practicá lo aprendido. Resolvé cada consigna y desplegá la solución para verificar tu resultado.",
  ejercicios,
}: Props) => (
  <section
    aria-label={titulo}
    className="not-prose my-10 rounded-2xl border border-primary/20 bg-card/60 p-5 sm:p-6 space-y-4"
  >
    <header className="space-y-1.5">
      <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-primary" />
        {titulo}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{intro}</p>
    </header>

    <ol className="space-y-3 list-none p-0">
      {ejercicios.map((e, idx) => (
        <li
          key={idx}
          className="rounded-xl border border-border bg-background/60 p-4"
        >
          <p className="text-sm sm:text-base text-foreground">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary font-mono font-bold text-xs mr-2">
              {idx + 1}
            </span>
            <span className="font-semibold">{e.enunciado}</span>
          </p>
          {e.pista && (
            <p className="text-xs text-muted-foreground mt-2 italic">
              💡 Pista: {e.pista}
            </p>
          )}
          <details className="mt-3 group">
            <summary className="cursor-pointer text-sm font-semibold text-primary hover:underline list-none flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span className="group-open:hidden">Ver solución</span>
              <span className="hidden group-open:inline">Ocultar solución</span>
            </summary>
            <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-foreground leading-relaxed font-mono whitespace-pre-line">
              {e.solucion}
            </div>
          </details>
        </li>
      ))}
    </ol>
  </section>
);

export default EjerciciosPracticos;
