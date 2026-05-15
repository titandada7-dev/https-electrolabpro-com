import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gamepad2, Trophy, Brain, Zap, ChevronRight, ArrowLeft,
  Target, Clock, Award, BookOpen, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import ThemeToggle from "@/components/ThemeToggle";

const GAME_URL = "https://smart-shuffle.lovable.app";

const features = [
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Preguntas reales de electrónica",
    desc: "Resistencias, Arduino, Ley de Ohm, diodos, condensadores y mucho más.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "3 niveles de dificultad",
    desc: "Fácil, medio y difícil. Empezá tranquilo y subí cuando estés listo.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Contrarreloj y combos",
    desc: "Sumá puntos extra encadenando respuestas correctas seguidas.",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Sistema de XP y niveles",
    desc: "Progresá por 20 niveles con títulos y desbloqueá logros.",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Ranking y multijugador",
    desc: "Competí con otros, mirá tu mejor puntaje y batí tu propio récord.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Modo Aprender",
    desc: "Estudiá las preguntas con sus explicaciones antes de jugar.",
  },
];

const benefits = [
  "Refuerza conceptos clave de electrónica de forma divertida",
  "Memorizás valores comunes (resistencias, voltajes, símbolos)",
  "Te entrena para pruebas técnicas y entrevistas",
  "Mejora tu velocidad de razonamiento bajo presión",
  "100% gratis, sin registro obligatorio",
];

const AprendeJugando = () => {
  usePageMeta({
    title: "ElectroLab Play | Quiz de Electrónica Online Gratis",
    description:
      "Quiz interactivo gratis de electrónica: Arduino, resistencias, Ley de Ohm y más. 3 niveles, sistema XP, ranking y multijugador.",
  });

  // JSON-LD: Game schema
  useEffect(() => {
    const SITE_URL = "https://electrolabpro.com";
    const gameSchema = {
      "@context": "https://schema.org",
      "@type": "Game",
      name: "ElectroLab Play",
      description:
        "Quiz interactivo de electrónica con preguntas sobre Arduino, resistencias, Ley de Ohm, diodos, condensadores y protocolos de comunicación. 3 niveles de dificultad, combos, ranking y modo multijugador.",
      url: `${SITE_URL}/aprende-jugando`,
      genre: ["Quiz", "Educational", "Trivia"],
      gamePlatform: ["Web browser", "Mobile web"],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "es",
      isAccessibleForFree: true,
      author: {
        "@type": "Person",
        name: "José Andrés Sánchez",
      },
      publisher: {
        "@type": "Organization",
        name: "ElectroLab Pro",
        url: SITE_URL,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Aprende Jugando", item: `${SITE_URL}/aprende-jugando` },
      ],
    };

    const schemas = [
      { id: "schema-game", data: gameSchema },
      { id: "schema-game-breadcrumb", data: breadcrumbSchema },
    ];

    schemas.forEach(({ id, data }) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    });

    return () => {
      ["schema-game", "schema-game-breadcrumb"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar simple */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a ElectroLab Pro
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs />
      </div>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4 text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><Link to="/" className="hover:text-primary">Inicio</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-foreground font-medium">Aprende Jugando</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Nuevo · Gratis
          </motion.div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Aprende{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Jugando
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Poné a prueba tus conocimientos de electrónica con <strong className="text-foreground">ElectroLab Play</strong>:
            un quiz interactivo con preguntas reales sobre Arduino, resistencias, Ley de Ohm, diodos y más.
            Sumá XP, encadená combos y subí en el ranking.
          </p>

          {/* CTA principal */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
            >
              <Gamepad2 className="h-5 w-5" />
              Jugar Ahora
              <ChevronRight className="h-4 w-4" />
            </a>
            <span className="text-xs text-muted-foreground">
              Se abre en una nueva pestaña · No requiere registro
            </span>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="container mx-auto px-4 py-10 sm:py-14 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-extrabold text-foreground sm:text-3xl">
            ¿Qué vas a encontrar?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            ElectroLab Play está pensado para que aprendas mientras te divertís. Tiene todo lo que necesitás:
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + secondary CTA */}
      <section className="container mx-auto px-4 py-10 sm:py-14 border-t border-border bg-card/40">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Beneficios
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
                ¿Por qué jugar a ElectroLab Play?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                No es solo un juego: es una herramienta de estudio diseñada por gente que enseña electrónica.
              </p>
              <ul className="mt-5 space-y-2.5">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Zap className="h-3 w-3" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-center shadow-sm">
              <Gamepad2 className="h-10 w-10 text-primary" />
              <h3 className="mt-3 text-xl font-extrabold text-foreground">
                ¿Listo para jugar?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tirate un par de partidas y mirá hasta dónde llegás.
              </p>
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:scale-[1.03] hover:shadow-lg"
              >
                <Gamepad2 className="h-4 w-4" />
                Empezar a jugar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related content */}
      <section className="container mx-auto px-4 py-10 sm:py-14 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">
            ¿Querés repasar antes de jugar?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Estos artículos te van a ayudar a responder más rápido:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { label: "Ley de Ohm", to: "/articulos/ley-de-ohm" },
              { label: "Código de Colores", to: "/articulos/codigo-colores-resistencias" },
              { label: "Arduino", to: "/articulos/arduino" },
              { label: "Diodos", to: "/articulos/diodos" },
              { label: "Transistores", to: "/articulos/transistores" },
              { label: "Condensadores", to: "/articulos/condensadores" },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                {a.label}
              </Link>
            ))}
          </div>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} ElectroLab Pro · Por J.A. Sánchez ·{" "}
          <Link to="/privacidad" className="hover:text-primary">Privacidad</Link>
        </p>
      </footer>
    </div>
  );
};

export default AprendeJugando;
