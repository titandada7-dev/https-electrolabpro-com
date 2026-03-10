import { Zap, ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Contacto = () => {
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
            <MessageSquare className="w-3.5 h-3.5" />
            Contacto
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            Contacto
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            ¿Tienes dudas, sugerencias o quieres colaborar? Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-xl border border-border bg-card/80 backdrop-blur space-y-3 text-center hover:border-primary/40 transition-all duration-300">
              <div className="inline-flex p-3 rounded-lg bg-secondary">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold text-foreground">Email General</h3>
              <p className="text-sm text-muted-foreground">Para consultas, sugerencias y colaboraciones.</p>
              <a
                href="mailto:contacto@electrolabpro.com"
                className="inline-block text-primary hover:underline text-sm font-semibold"
              >
                contacto@electrolabpro.com
              </a>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/80 backdrop-blur space-y-3 text-center hover:border-primary/40 transition-all duration-300">
              <div className="inline-flex p-3 rounded-lg bg-secondary">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold text-foreground">Soporte Técnico</h3>
              <p className="text-sm text-muted-foreground">Reportar errores en las calculadoras o el contenido.</p>
              <a
                href="mailto:soporte@electrolabpro.com"
                className="inline-block text-primary hover:underline text-sm font-semibold"
              >
                soporte@electrolabpro.com
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h2 className="text-xl font-mono font-bold text-foreground text-center">Preguntas Frecuentes</h2>
            <div className="space-y-3">
              {[
                {
                  q: "¿Puedo usar las calculadoras de forma gratuita?",
                  a: "Sí. Todas las herramientas de ElectroLab Pro son completamente gratuitas y siempre lo serán. Nos financiamos a través de publicidad y enlaces de afiliados."
                },
                {
                  q: "¿Los cálculos son fiables?",
                  a: "Nuestros algoritmos están verificados, pero siempre recomendamos comprobar los valores con un multímetro real antes de montar un circuito. Los cálculos son para fines educativos."
                },
                {
                  q: "¿Puedo sugerir nuevas funcionalidades?",
                  a: "¡Por supuesto! Envíanos un email a contacto@electrolabpro.com con tu idea y la evaluaremos para futuras actualizaciones."
                },
                {
                  q: "¿Los enlaces de Amazon son de afiliados?",
                  a: "Sí. ElectroLab Pro participa en el Programa de Afiliados de Amazon EU. Al comprar a través de nuestros enlaces, nos ayudas a mantener la plataforma gratuita sin coste adicional para ti."
                },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-card/60 hover:border-primary/30 transition-all duration-300">
                  <h3 className="font-mono font-bold text-foreground text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="p-6 rounded-xl border border-primary/20 bg-card/80 backdrop-blur text-center space-y-3">
            <h2 className="text-lg font-mono font-bold text-foreground">Sobre ElectroLab Pro</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              ElectroLab Pro es un proyecto educativo creado por <strong className="text-foreground">J.A. Sanchez</strong> con el objetivo de proporcionar herramientas gratuitas y contenido de calidad para estudiantes y entusiastas de la electrónica. Desde calculadoras interactivas hasta artículos técnicos, todo está diseñado para hacer la electrónica más accesible.
            </p>
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

export default Contacto;
