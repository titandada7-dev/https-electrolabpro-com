import { Zap, ArrowLeft, Users, Target, Heart, Lightbulb, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useEffect } from "react";

const SobreNosotros = () => {
  usePageMeta({
    title: "Sobre Nosotros | ElectroLab Pro – Quiénes Somos",
    description: "Conoce a J.A. Sánchez, creador de ElectroLab Pro. Plataforma educativa de electrónica con calculadoras interactivas, guías técnicas y herramientas gratuitas para estudiantes y técnicos.",
  });

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Sobre Nosotros - ElectroLab Pro",
      "description": "Plataforma educativa de electrónica creada por J.A. Sánchez.",
      "publisher": {
        "@type": "Organization",
        "name": "ElectroLab Pro",
        "url": "https://electrolabpro.com",
        "founder": {
          "@type": "Person",
          "name": "J.A. Sánchez"
        }
      }
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    script.id = "about-jsonld";
    const existing = document.getElementById("about-jsonld");
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { document.getElementById("about-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary glow-icon" />
            <span className="text-lg md:text-xl font-mono font-bold text-foreground">
              Electro<span className="text-primary">Lab</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]" style={{ background: 'hsl(199 89% 60% / 0.4)' }} />
        <div className="relative container mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <Users className="w-3.5 h-3.5" />
            Sobre Nosotros
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            Sobre ElectroLab Pro
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Plataforma educativa de electrónica creada para estudiantes, técnicos y entusiastas.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Author Section */}
          <section className="p-6 md:p-8 rounded-2xl border border-border bg-card/80 backdrop-blur space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-mono text-foreground">J.A. Sánchez</h2>
                <p className="text-sm text-muted-foreground">Fundador y Desarrollador</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">ElectroLab Pro</strong> es un proyecto educativo desarrollado por 
              J.A. Sánchez a partir de la recopilación y adaptación de información técnica proveniente de 
              especialistas, manuales y documentación profesional en electrónica.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Con formación en desarrollo web y electrónica práctica, J.A. Sánchez combina ambas disciplinas 
              para crear herramientas digitales que simplifican el aprendizaje de conceptos complejos. Cada 
              calculadora, guía y artículo publicado en la plataforma ha sido verificado contra fuentes técnicas 
              reconocidas para garantizar la precisión de la información.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El objetivo de ElectroLab Pro es ofrecer herramientas confiables basadas en prácticas reales 
              utilizadas en el ámbito técnico, haciendo la electrónica accesible para todos sin importar su 
              nivel de experiencia.
            </p>
          </section>

          {/* What we offer */}
          <section className="space-y-5">
            <h2 className="text-lg font-bold font-mono text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              ¿Qué ofrecemos?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Calculadoras Interactivas", desc: "Herramientas de cálculo en tiempo real para resistencias, Ley de Ohm, LEDs, filtros RC y más. Resultados instantáneos sin necesidad de registrarse." },
                { title: "Guías Técnicas Completas", desc: "Más de 11 artículos educativos detallados que cubren desde fundamentos básicos hasta temas avanzados como osciloscopios y soldadura electrónica." },
                { title: "Diccionario de Componentes", desc: "Base de datos de componentes electrónicos con descripciones, usos prácticos y enlaces a proveedores verificados." },
                { title: "Proyectos Prácticos", desc: "Mini-proyectos paso a paso con diagramas, listas de materiales y explicaciones detalladas para aplicar la teoría en la práctica." },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border border-border bg-card/60 backdrop-blur space-y-2 hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-mono font-bold text-foreground text-sm">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="space-y-5">
            <h2 className="text-lg font-bold font-mono text-foreground">Nuestros Valores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: Target, title: "Precisión", text: "Cada herramienta y artículo se basa en fórmulas y datos verificados de documentación técnica profesional." },
                { icon: Heart, title: "Accesibilidad", text: "Contenido 100% gratuito y sin registro. Creemos que la educación técnica debe estar al alcance de todos." },
                { icon: Lightbulb, title: "Practicidad", text: "Priorizamos herramientas interactivas y ejemplos del mundo real sobre la teoría abstracta." },
              ].map((v) => (
                <div key={v.title} className="p-5 rounded-xl border border-border bg-card/60 backdrop-blur space-y-3 text-center hover:border-primary/40 transition-all duration-300">
                  <div className="inline-flex p-3 rounded-lg bg-secondary">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-mono font-bold text-foreground text-sm">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section className="p-6 rounded-2xl border border-border bg-card/80 backdrop-blur space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground">Nuestra Metodología</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Todo el contenido de ElectroLab Pro sigue un proceso riguroso:
            </p>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {[
                "Investigación de fuentes técnicas reconocidas (hojas de datos, manuales de fabricantes, documentación IEEE).",
                "Desarrollo de herramientas interactivas con validación matemática de fórmulas y resultados.",
                "Redacción de contenido educativo con terminología técnica precisa en español.",
                "Revisión y verificación cruzada de la información antes de publicar.",
                "Actualización periódica del contenido para mantener la relevancia y precisión.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <div className="p-6 rounded-xl border border-primary/20 bg-card/80 backdrop-blur text-center space-y-3">
            <h2 className="text-lg font-mono font-bold text-foreground">¿Tienes preguntas o sugerencias?</h2>
            <p className="text-sm text-muted-foreground">
              Nos encanta escuchar a nuestra comunidad. Escríbenos y te responderemos lo antes posible.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-all hover:scale-105"
            >
              Ir a Contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A. Sánchez</span>
          </p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Contacto</Link>
          </div>
          <a
            href="mailto:contacto@electrolabpro.com"
            className="text-muted-foreground/60 text-[10px] hover:text-foreground transition-colors block mb-3"
          >
            contacto@electrolabpro.com
          </a>
          <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic">
            En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SobreNosotros;
