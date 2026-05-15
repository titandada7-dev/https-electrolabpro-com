import { Zap, ArrowLeft, BookOpen, Clock, Calendar, Search, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AdBanner from "@/components/AdBanner";
import LabProRecommendations from "@/components/LabProRecommendations";
import AuthorBio from "@/components/AuthorBio";
import Breadcrumbs from "@/components/Breadcrumbs";
import { usePageMeta } from "@/hooks/use-page-meta";
import GlobalSearch from "@/components/GlobalSearch";
import { obtenerArticulosRelacionados } from "@/data/articulos";

export interface FaqItem {
  question: string;
  /** Respuesta en texto plano (sin HTML/markdown). Google requiere texto limpio. */
  answer: string;
}

interface ArticleLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  slug?: string;
  datePublished?: string;
  dateModified?: string;
  /** Si se pasan FAQs, se inyecta automáticamente schema.org FAQPage para Rich Results. */
  faqs?: FaqItem[];
  /**
   * Imagen específica para este artículo (Open Graph + Twitter + JSON-LD).
   * Acepta ruta relativa ("/og-images/ohm.jpg") o URL absoluta.
   * Si se omite, se usa el OG por defecto del sitio.
   */
  image?: string;
}

const SITE_ORIGIN = "https://electrolabpro.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

/** Resuelve a URL absoluta, devolviendo el OG por defecto si no se pasa imagen. */
const resolveArticleImage = (input?: string): string => {
  if (!input) return DEFAULT_OG_IMAGE;
  if (input.startsWith("http")) return input;
  return `${SITE_ORIGIN}${input.startsWith("/") ? input : `/${input}`}`;
};

/**
 * Convierte una fecha (YYYY-MM-DD o ISO) a ISO 8601 completo con zona horaria.
 * Google Rich Results requiere TZ explícita en datePublished/dateModified.
 * Default: 10:00 hora de Argentina (UTC-03:00) — sede del autor.
 */
const toISO8601WithTZ = (date: string): string => {
  if (!date) return new Date().toISOString();
  // Si ya viene con T y offset/Z, lo respetamos
  if (date.includes("T") && (date.includes("Z") || /[+-]\d{2}:\d{2}$/.test(date))) {
    return date;
  }
  // YYYY-MM-DD → fijamos 10:00:00 hora Argentina (UTC-03:00)
  const dateOnly = date.split("T")[0];
  return `${dateOnly}T10:00:00-03:00`;
};

const ArticleLayout = ({ title, subtitle, children, slug, datePublished = "2026-03-01", dateModified = "2026-03-13", faqs, image }: ArticleLayoutProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  // Memorizamos para que el filtrado de los 21 artículos solo se recalcule
  // cuando cambia la ruta, no en cada render (búsquedas, toggles, etc.).
  const articulosSugeridos = useMemo(
    () => obtenerArticulosRelacionados(location.pathname, 3),
    [location.pathname],
  );

  usePageMeta({
    title: `${title} | ElectroLab Pro`,
    description: subtitle,
    canonical: slug ? `/articulos/${slug}` : undefined,
    image,
    ogType: "article",
  });

  // Atajo Cmd/Ctrl+K para abrir el buscador desde cualquier artículo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
        return;
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        const tag = target.tagName;
        const isEditable =
          tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
        if (!isEditable) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Scroll al top al cambiar de artículo (mejora UX en navegación SPA).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const articleUrl = slug ? `${SITE_ORIGIN}/articulos/${slug}` : SITE_ORIGIN;
    const articleImage = resolveArticleImage(image);

    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": subtitle,
      "url": articleUrl,
      "image": [articleImage],
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
      "datePublished": toISO8601WithTZ(datePublished),
      "dateModified": toISO8601WithTZ(dateModified),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "inLanguage": "es"
    };

    // Article JSON-LD: actualizar el mismo nodo en lugar de remove+append
    // para evitar parpadeos y "cambios de IDs" entre re-renders.
    const upsertJsonLd = (id: string, payload: object) => {
      const serialized = JSON.stringify(payload);
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      if (script.textContent !== serialized) script.textContent = serialized;
    };

    upsertJsonLd("article-jsonld", articleJsonLd);

    // FAQPage schema (opcional) — solo si el artículo pasó faqs.
    // Si no hay faqs, removemos el nodo previo para no dejar schemas obsoletos.
    if (faqs && faqs.length > 0) {
      const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      };
      upsertJsonLd("faq-jsonld", faqJsonLd);
    } else {
      document.getElementById("faq-jsonld")?.remove();
    }

    return () => {
      document.getElementById("article-jsonld")?.remove();
      document.getElementById("faq-jsonld")?.remove();
    };
  }, [title, subtitle, slug, datePublished, dateModified, faqs, image]);

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

      {/* Breadcrumb dinámico (semántico para SEO) */}
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs lastLabel={title} />
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
        <AdBanner slot="3756475501" format="auto" className="min-h-[90px] md:min-h-[100px]" fallbackUrl="/" />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 max-w-3xl mx-auto prose-custom space-y-6 text-muted-foreground leading-relaxed text-[15px]">
            {children}

            {/* Artículos relacionados — fomenta retención y rastreo interno */}
            {articulosSugeridos.length > 0 && (
              <section
                className="mt-16 pt-8 border-t border-border"
                aria-labelledby="related-articles-heading"
              >
                <h2
                  id="related-articles-heading"
                  className="text-xl font-mono font-bold text-foreground mb-6 flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-primary" />
                  Continúa aprendiendo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {articulosSugeridos.map((articulo) => (
                    <Link
                      key={articulo.id}
                      to={articulo.path}
                      title={`Leer más sobre: ${articulo.titulo}`}
                      className="group block"
                    >
                      <article className="p-4 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all h-full flex flex-col">
                        <span className="inline-flex self-start text-[10px] uppercase tracking-wider font-mono font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mb-2">
                          {articulo.categoria}
                        </span>
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-start justify-between gap-2">
                          <span>{articulo.titulo}</span>
                          <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {articulo.descripcion}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

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
                  <li><Link to="/guia-resistencias" className="text-primary font-semibold hover:underline transition-colors">📘 Guía completa de resistencias</Link></li>
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
            <Link to="/guia-resistencias" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Guía de Resistencias</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
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
