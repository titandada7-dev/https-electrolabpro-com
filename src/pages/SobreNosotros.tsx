import { Zap, ArrowLeft, Users, Target, Heart, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const SobreNosotros = () => {
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
            Sobre Nosotros
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Conoce quiénes somos y por qué creamos ElectroLab Pro.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Main text */}
          <div className="p-6 rounded-xl border border-border bg-card/80 backdrop-blur space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bienvenidos a <strong className="text-foreground">ElectroLab Pro</strong>. Este proyecto educativo es una iniciativa de <strong className="text-foreground">José Andrés Sánchez</strong>, web developer y apasionado de la electrónica.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nuestra misión es crear herramientas digitales gratuitas que ayuden a estudiantes y aficionados a identificar componentes como resistencias, capacitores y diodos sin errores.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              En ElectroLab Pro, convertimos la teoría compleja en herramientas simples y visuales.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Target, title: "Misión", text: "Hacer la electrónica accesible para todos mediante herramientas gratuitas y contenido educativo de calidad." },
              { icon: Heart, title: "Pasión", text: "Cada calculadora y artículo está creado con dedicación por un equipo que ama la tecnología y la enseñanza." },
              { icon: Lightbulb, title: "Innovación", text: "Buscamos constantemente nuevas formas de simplificar conceptos complejos con herramientas interactivas." },
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
      <footer className="w-full py-8 mt-auto bg-black/50 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A.Sanchez</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Contacto</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Sobre Nosotros</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SobreNosotros;
