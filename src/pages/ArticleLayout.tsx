import { Zap, ArrowLeft, BookOpen, Clock, Calendar, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdBanner from "@/components/AdBanner";
import LabProRecommendations from "@/components/LabProRecommendations";
import AuthorBio from "@/components/AuthorBio";
import { usePageMeta } from "@/hooks/use-page-meta";
import GlobalSearch from "@/components/GlobalSearch";

interface ArticleLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  slug?: string;
  datePublished?: string;
  dateModified?: string;
}

const ArticleLayout = ({ title, subtitle, children, slug, datePublished = "2026-03-01", dateModified = "2026-03-13" }: ArticleLayoutProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  usePageMeta({
    title: `${title} | ElectroLab Pro`,
    description: subtitle,
  });

  // Atajo Cmd/Ctrl+K para abrir el buscador desde cualquier artículo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const articleUrl = slug ? `https://electrolabpro.com/articulos/${slug}` : "https://electrolabpro.com";

    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": subtitle,
      "image": [
        "https://electrolabpro.com/og-image.jpg"
      ],
      "author": {
        "@type": "Person",
        "name": "J.A. Sanchez",
        "url": "https://electrolabpro.com/sobre-nosotros"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ElectroLab Pro",
        "url": "https://electrolabpro.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://electrolabpro.com/pwa-icon-512.png",
          "width": 512,
          "height": 512
        }
      },
      "datePublished": datePublished,
      "dateModified": dateModified,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "inLanguage": "es"
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://electrolabpro.com" },
        { "@type": "ListItem", "position": 2, "name": "Artículos", "item": "https://electrolabpro.com/#guias" },
        { "@type": "ListItem", "position": 3, "name": title, "item": articleUrl }
      ]
    };

    const articleScript = document.createElement("script");
    articleScript.type = "application/ld+json";
    articleScript.id = "article-jsonld";
    articleScript.textContent = JSON.stringify(articleJsonLd);
    document.getElementById("article-jsonld")?.remove();
    document.head.appendChild(articleScript);

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = "breadcrumb-jsonld";
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);
    document.getElementById("breadcrumb-jsonld")?.remove();
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.getElementById("article-jsonld")?.remove();
      document.getElementById("breadcrumb-jsonld")?.remove();
    };
  }, [title, subtitle, slug, datePublished, dateModified]);

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
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">⌘K</kbd>
            </button>
            <Link to="/sobre-nosotros" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre Nosotros</Link>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver al inicio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-4">
        <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link to="/" className="hover:text-foreground transition-colors">Inicio</Link></li>
            <li className="text-muted-foreground/40">/</li>
            <li><Link to="/#guias" className="hover:text-foreground transition-colors">Artículos</Link></li>
            <li className="text-muted-foreground/40">/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{title}</li>
          </ol>
        </nav>
      </div>

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
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60 pt-2">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(dateModified).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Lectura de 8-12 min
            </span>
          </div>
        </div>
      </section>

      {/* AdSense: Después del hero en artículos */}
      <div className="container mx-auto px-4 pt-6">
        <AdBanner slot="3756475501" format="auto" className="min-h-[90px] md:min-h-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 max-w-3xl mx-auto prose-custom space-y-6 text-muted-foreground leading-relaxed text-[15px]">
            {children}

            {/* Author Bio */}
            <AuthorBio />

            {/* 🔧 Laboratorio Pro */}
            <div className="mt-10 pt-6 border-t border-border">
              <LabProRecommendations />
            </div>

            {/* AdSense: Después del contenido del artículo */}
            <div className="mt-6">
              <AdBanner slot="3756475501" format="auto" className="min-h-[90px] md:min-h-[250px]" />
            </div>
          </article>
          <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <AdBanner slot="3756475501" format="vertical" className="min-h-[250px]" />
              <div className="p-4 rounded-xl border border-border bg-card/50 space-y-3">
                <h4 className="text-sm font-bold font-mono flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Más artículos
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/articulos/codigo-colores-resistencias" className="text-muted-foreground hover:text-primary transition-colors">Código de colores de resistencias</Link></li>
                  <li><Link to="/articulos/condensadores" className="text-muted-foreground hover:text-primary transition-colors">Qué es un condensador</Link></li>
                  <li><Link to="/articulos/diodos" className="text-muted-foreground hover:text-primary transition-colors">Guía básica de diodos</Link></li>
                  <li><Link to="/articulos/ley-de-ohm" className="text-muted-foreground hover:text-primary transition-colors">Ley de Ohm explicada</Link></li>
                  <li><Link to="/articulos/multimetro" className="text-muted-foreground hover:text-primary transition-colors">Cómo usar un multímetro</Link></li>
                  <li><Link to="/articulos/circuitos-serie-paralelo" className="text-muted-foreground hover:text-primary transition-colors">Circuitos serie vs paralelo</Link></li>
                  <li><Link to="/articulos/transistores" className="text-muted-foreground hover:text-primary transition-colors">Guía de transistores</Link></li>
                  <li><Link to="/articulos/arduino" className="text-muted-foreground hover:text-primary transition-colors">Arduino para principiantes</Link></li>
                  <li><Link to="/articulos/protocolo-i2c" className="text-muted-foreground hover:text-primary transition-colors">Protocolo I2C</Link></li>
                  <li><Link to="/articulos/sensores-arduino" className="text-muted-foreground hover:text-primary transition-colors">Sensores Arduino</Link></li>
                  <li><Link to="/articulos/pantalla-oled-ssd1306" className="text-muted-foreground hover:text-primary transition-colors">Pantallas OLED SSD1306</Link></li>
                  <li className="pt-2 border-t border-border mt-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-bold">Blog</span>
                  </li>
                  <li><Link to="/blog/mi-primer-laboratorio" className="text-muted-foreground hover:text-primary transition-colors">Mi primer laboratorio</Link></li>
                  <li><Link to="/blog/mis-5-proyectos-arduino-favoritos" className="text-muted-foreground hover:text-primary transition-colors">5 proyectos Arduino favoritos</Link></li>
                  <li><Link to="/blog/como-disene-mi-primer-pcb-kicad" className="text-muted-foreground hover:text-primary transition-colors">Mi primer PCB con KiCad</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A. Sanchez</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4 mb-3">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Contacto</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Sobre Nosotros</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/glosario" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Glosario</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/terminos-y-condiciones" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Términos</Link>
          </div>
          <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic mb-4">
            En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
          </p>
          <div className="border-t border-border pt-4 mt-2">
            <p className="text-primary/80 text-[10px] font-semibold uppercase tracking-wider mb-1">⚠️ Aviso de Seguridad</p>
            <p className="text-muted-foreground/50 text-[9px] leading-relaxed max-w-2xl mx-auto">
              La electrónica implica riesgos inherentes. Siempre verifica los valores de los componentes con un multímetro real antes de energizar un circuito para evitar daños personales o materiales.
            </p>
          </div>
        </div>
      </footer>

      {/* Buscador global ⌘K */}
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
};

export default ArticleLayout;
