import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";

const SectionFallback = () => (
  <div className="flex justify-center py-10" aria-hidden="true">
    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

interface HomeEducationProps {
  scrollTo: (id: string) => void;
  handleAnchorClick: (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HomeEducation = ({ scrollTo, handleAnchorClick }: HomeEducationProps) => {
  const educationCards = [
    {
      to: "/guia-resistencias",
      icon: <BookOpen className="w-7 h-7 text-primary mb-3" />,
      highlighted: true,
      title: "Guía completa de resistencias",
      desc: "Qué son, cómo funcionan, código de colores y cómo calcular su valor con la Ley de Ohm.",
      tags: ["⭐ Destacado", "+1.200 palabras"],
    },
    {
      to: "/articulos/ley-de-ohm",
      icon: <span className="text-4xl mb-3">⚡</span>,
      title: "Ley de Ohm explicada",
      desc: "Voltaje, corriente y resistencia: la fórmula V = I × R con ejemplos prácticos.",
    },
    {
      to: "/articulos/codigo-colores-resistencias",
      icon: <span className="text-4xl mb-3">🎨</span>,
      title: "Código de colores de resistencias",
      desc: "Cómo decodificar resistencias de 4 y 5 bandas según el estándar IEC 60062.",
    },
    {
      to: "/articulos/multimetro",
      icon: <span className="text-4xl mb-3">📟</span>,
      title: "Cómo usar un multímetro",
      desc: "Medí voltaje, corriente, resistencia y continuidad sin dañar tu instrumento.",
    },
    {
      to: "/articulos/arduino",
      icon: <span className="text-4xl mb-3">🤖</span>,
      title: "Arduino para principiantes",
      desc: "Instalación del IDE, primer sketch, Blink y proyectos básicos paso a paso.",
    },
    {
      to: "/aprende-jugando",
      icon: <Sparkles className="w-7 h-7 text-muted-foreground mx-auto mb-3" />,
      title: "Próximas guías",
      desc: "Curso básico de electrónica, condensadores y diodos en preparación.",
      coming_soon: true,
    },
  ];

  return (
    <section
      id="aprender"
      className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 border-t border-border"
    >
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">
          Aprendé electrónica
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
          Guías educativas <span className="text-primary">paso a paso</span>
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Recursos pensados para principiantes y estudiantes: empezá por la base y combiná cada guía con nuestras calculadoras interactivas online.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {educationCards.map((card) => (
          card.coming_soon ? (
            <div
              key={card.title}
              className="flex flex-col rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center justify-center"
            >
              {card.icon}
              <h3 className="text-base font-bold text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{card.desc}</p>
              <a
                href="#guias"
                onClick={handleAnchorClick("guias")}
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold hover:underline justify-center"
              >
                Ver todas las guías técnicas →
              </a>
            </div>
          ) : (
            <Link
              key={card.to}
              to={card.to}
              className={`group flex flex-col rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-6 ${
                card.highlighted
                  ? "border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:-translate-y-1 hover:border-primary"
                  : "border border-border bg-card hover:-translate-y-1 hover:border-primary/40"
              }`}
              aria-label={`Leer ${card.title}`}
            >
              {card.highlighted && (
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                    ⭐ Destacado
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    +1.200 palabras
                  </span>
                </div>
              )}
              {card.icon}
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">{card.desc}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
                {card.highlighted ? "Leer guía de resistencias online" : "Leer"} →
              </span>
            </Link>
          )
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/guia-resistencias"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          <BookOpen className="w-4 h-4" /> Empezar por la guía de resistencias
        </Link>
      </div>
    </section>
  );
};

export default HomeEducation;
