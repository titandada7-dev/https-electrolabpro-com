import { Link } from "react-router-dom";
import { Wrench, ArrowRight } from "lucide-react";

interface ToolLink {
  to: string;
  label: string;
  desc: string;
}

interface Props {
  title?: string;
  tools: ToolLink[];
}

/**
 * Sección "Aplicalo ahora" para artículos: tarjetas con anchor text
 * descriptivo que enlazan a las herramientas relacionadas (SEO interno).
 */
const AplicaloAhora = ({ title = "Aplicalo ahora con nuestras herramientas", tools }: Props) => (
  <section
    aria-label="Herramientas relacionadas"
    className="not-prose my-10 rounded-2xl border border-primary/20 bg-card/60 p-5 sm:p-6"
  >
    <h2 className="text-lg sm:text-xl font-mono font-bold text-foreground mb-4 flex items-center gap-2">
      <Wrench className="w-5 h-5 text-primary" />
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tools.map((t) => (
        <Link
          key={`${t.to}-${t.label}`}
          to={t.to}
          className="group block p-4 rounded-xl border border-border bg-background/60 hover:border-primary/50 hover:bg-card transition-all"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-primary group-hover:underline">
              {t.label}
            </span>
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{t.desc}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default AplicaloAhora;
