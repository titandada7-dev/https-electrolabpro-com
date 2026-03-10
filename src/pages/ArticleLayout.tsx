import { Zap, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "@/components/AdBanner";

interface ArticleLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const ArticleLayout = ({ title, subtitle, children }: ArticleLayoutProps) => {
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
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]" style={{ background: 'hsl(199 89% 60% / 0.4)' }} />
        <div className="relative container mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Artículo Educativo
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 max-w-3xl mx-auto prose-custom space-y-6 text-muted-foreground leading-relaxed text-[15px]">
            {children}
          </article>
          <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <AdBanner slot="6666666666" format="vertical" className="min-h-[250px]" />
              <div className="p-4 rounded-xl border border-border bg-card/50 space-y-3">
                <h4 className="text-sm font-bold font-mono flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Más artículos
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/articulos/codigo-colores-resistencias" className="text-muted-foreground hover:text-primary transition-colors">Código de colores de resistencias</Link></li>
                  <li><Link to="/articulos/condensadores" className="text-muted-foreground hover:text-primary transition-colors">Qué es un condensador</Link></li>
                  <li><Link to="/articulos/diodos" className="text-muted-foreground hover:text-primary transition-colors">Guía básica de diodos</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-black/50 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A.Sanchez</span>
          </p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Contacto</Link>
          </div>
          <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic">
            "Como Afiliado de Amazon, percibo dinero por las compras elegibles."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ArticleLayout;
