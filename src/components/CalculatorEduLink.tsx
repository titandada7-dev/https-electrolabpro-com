import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

interface EduLink {
  to: string;
  label: string;
}

interface Props {
  intro: string;
  links: EduLink[];
}

/**
 * Bloque contextual de enlaces educativos que se inserta debajo de cada
 * calculadora para reforzar la red de enlaces internos (SEO).
 * Anchor text descriptivo, nunca "click acá".
 */
const CalculatorEduLink = ({ intro, links }: Props) => (
  <aside
    aria-label="Recursos educativos relacionados"
    className="mt-6 rounded-xl border border-primary/20 bg-card/60 p-4 space-y-3"
  >
    <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
      <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
      <span>{intro}</span>
    </p>
    <ul className="space-y-1.5">
      {links.map((l) => (
        <li key={l.to}>
          <Link
            to={l.to}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default CalculatorEduLink;
