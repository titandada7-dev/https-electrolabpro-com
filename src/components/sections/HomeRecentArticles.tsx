import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const HomeRecentArticles = () => {
  const articles = [
    {
      emoji: "🤖",
      tag: "Microcontroladores",
      title: "Cómo elegir un Arduino",
      desc: "UNO vs Nano vs Mega vs ESP32: comparativa completa con tabla y links de afiliado.",
      to: "/articulos/que-arduino-comprar",
      readTime: "8 min",
    },
    {
      emoji: "⚙️",
      tag: "Control de Motores",
      title: "PWM Explicado",
      desc: "Controlá motores y LEDs con Arduino. Teoría, código analogWrite() y FAQ.",
      to: "/articulos/pwm-arduino",
      readTime: "10 min",
    },
    {
      emoji: "🔋",
      tag: "Alimentación",
      title: "Reguladores de Voltaje",
      desc: "7805, LM317 y Buck Converters. Cálculos térmicos y esquemáticos paso a paso.",
      to: "/articulos/reguladores-voltaje",
      readTime: "12 min",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-12 space-y-6 border-t border-border">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          Nuevo · Abril 2026
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Artículos Recientes
        </h2>
        <p className="text-muted-foreground text-sm">Las guías más nuevas, recién publicadas para que las explores</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {articles.map((article) => (
          <div key={article.to}>
            <Link
              to={article.to}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
            >
              <div className="relative w-full h-28 sm:h-32 bg-gradient-to-br from-primary/10 via-accent to-primary/5 flex items-center justify-center text-5xl">
                {article.emoji}
                <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
                  🆕 Nuevo
                </span>
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {article.tag} · {article.readTime} lectura
                </span>
                <h3 className="font-semibold text-card-foreground text-base group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{article.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
                  Leer artículo →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeRecentArticles;
