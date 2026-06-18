import { useState, useEffect, lazy, Suspense } from "react";
import electrolabLogo from "@/assets/electrolab-logo.webp";
import {
  Zap, ChevronDown, BookOpen, Cpu, Calculator, Users, Target,
  ShoppingBag, Menu, X, CircuitBoard, Wrench, TrendingUp,
  MessageSquare, Lightbulb, Battery, Microchip, Cable, Search, Sparkles
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import AdSenseSlot from "@/components/AdSenseSlot";
import HomeAd from "@/components/sections/HomeAd";

// Componentes pesados below-the-fold: lazy para reducir el JS inicial y mejorar LCP.
const ComponentDictionary = lazy(() => import("@/components/ComponentDictionary"));
const MiniProjects = lazy(() => import("@/components/MiniProjects"));
const CalculatorHub = lazy(() => import("@/components/CalculatorHub"));
const GlobalSearch = lazy(() => import("@/components/GlobalSearch"));

const SectionFallback = () => (
  <div className="flex justify-center py-10" aria-hidden="true">
    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const articleLinks = [
  { label: "Código de Colores", to: "/articulos/codigo-colores-resistencias" },
  { label: "Condensadores", to: "/articulos/condensadores" },
  { label: "Diodos", to: "/articulos/diodos" },
  { label: "Ley de Ohm", to: "/articulos/ley-de-ohm" },
  { label: "Multímetro", to: "/articulos/multimetro" },
  { label: "Serie vs Paralelo", to: "/articulos/circuitos-serie-paralelo" },
  { label: "Transistores", to: "/articulos/transistores" },
  { label: "Arduino", to: "/articulos/arduino" },
  { label: "Osciloscopio", to: "/articulos/osciloscopio" },
  { label: "Fuentes de Alimentación", to: "/articulos/fuentes-de-alimentacion" },
  { label: "Soldadura", to: "/articulos/soldadura-electronica" },
  { label: "Protocolo I2C", to: "/articulos/protocolo-i2c" },
  { label: "Sensores Arduino", to: "/articulos/sensores-arduino" },
  { label: "Pantalla OLED", to: "/articulos/pantalla-oled-ssd1306" },
  { label: "🆕 Qué Arduino Comprar", to: "/articulos/que-arduino-comprar" },
  { label: "🆕 PWM Arduino", to: "/articulos/pwm-arduino" },
  { label: "🆕 Reguladores de Voltaje", to: "/articulos/reguladores-voltaje" },
  { label: "🆕 Cómo Leer un Datasheet", to: "/articulos/leer-datasheet" },
  { label: "🔧 Mi Primer Laboratorio", to: "/blog/mi-primer-laboratorio" },
  { label: "🤖 5 Proyectos Arduino", to: "/blog/mis-5-proyectos-arduino-favoritos" },
  { label: "🔌 Mi Primer PCB con KiCad", to: "/blog/como-disene-mi-primer-pcb-kicad" },
];

const QA_CATEGORIES = [
  {
    id: "microcontroladores",
    label: "Microcontroladores",
    icon: <Microchip className="w-4 h-4" />,
    items: [
      { q: "¿Qué es un Arduino y para qué sirve?", a: "Arduino es una plataforma de microcontroladores de código abierto. Permite crear proyectos electrónicos interactivos leyendo sensores y controlando actuadores como LEDs, motores y displays." },
      { q: "¿Cuál es la diferencia entre Arduino UNO y Nano?", a: "El Arduino UNO usa el ATmega328P con 14 pines digitales y es ideal para principiantes. El Nano tiene el mismo chip pero en formato compacto, perfecto para proyectos con espacio reducido y protoboards." },
      { q: "¿Puedo alimentar un Arduino con una batería?", a: "Sí. Podés usar una batería de 9V conectada al jack de alimentación o al pin Vin. También funciona con power banks USB de 5V conectadas al puerto USB." },
    ],
  },
  {
    id: "fuentes",
    label: "Fuentes",
    icon: <Battery className="w-4 h-4" />,
    items: [
      { q: "¿Qué diferencia hay entre una fuente lineal y una conmutada?", a: "Las fuentes lineales usan transformador + regulador (más pesadas, menos ruido). Las conmutadas (switching) son más eficientes y compactas, pero generan más ruido eléctrico." },
      { q: "¿Cómo elijo la fuente correcta para mi circuito?", a: "Sumá el consumo de todos los componentes en mA y elegí una fuente que entregue al menos un 20% más. Verificá que el voltaje coincida (5V, 12V, etc.)." },
      { q: "¿Puedo usar un cargador de celular como fuente?", a: "Sí, los cargadores USB entregan 5V regulados. Son ideales para Arduino y circuitos de baja potencia. Verificá que entregue suficiente corriente (al menos 500mA)." },
    ],
  },
  {
    id: "componentes",
    label: "Componentes",
    icon: <Cable className="w-4 h-4" />,
    items: [
      { q: "¿Cómo leo el valor de una resistencia por sus colores?", a: "Las bandas de colores codifican el valor. En una resistencia de 4 bandas: las dos primeras son dígitos, la tercera es el multiplicador y la cuarta es la tolerancia. Ej: Rojo-Violeta-Naranja = 27kΩ." },
      { q: "¿Qué pasa si pongo un LED sin resistencia?", a: "El LED recibirá demasiada corriente y se quemará casi instantáneamente. Siempre usá una resistencia en serie calculada con: R = (Vfuente - Vled) / Iled." },
      { q: "¿Para qué sirve un condensador en un circuito?", a: "Los condensadores almacenan y liberan energía. Se usan para filtrar ruido, estabilizar voltaje, acoplar/desacoplar señales y crear temporizadores junto con resistencias." },
      { q: "¿Cuál es la diferencia entre un transistor NPN y PNP?", a: "En un NPN la corriente fluye de colector a emisor cuando se aplica corriente a la base. En un PNP fluye de emisor a colector. El NPN (como el 2N2222) es el más común para principiantes." },
    ],
  },
  {
    id: "herramientas",
    label: "Herramientas",
    icon: <Wrench className="w-4 h-4" />,
    items: [
      { q: "¿Qué multímetro me recomiendan para empezar?", a: "Un multímetro digital con autorango es ideal. Que mida voltaje AC/DC, resistencia, continuidad y capacitancia. Marcas confiables: UNI-T, Fluke (gama alta) o Aneng." },
      { q: "¿Cuál es la temperatura ideal para soldar?", a: "Entre 300°C y 350°C para la mayoría de componentes through-hole. Para SMD usá 350-380°C. Siempre usá estaño con flux integrado (60/40 o sin plomo SAC305)." },
      { q: "¿Necesito un osciloscopio para empezar?", a: "No es indispensable al principio. Un multímetro es suficiente para aprender. El osciloscopio se vuelve necesario cuando trabajés con señales, PWM o debugging de comunicaciones." },
    ],
  },
  {
    id: "protocolos",
    label: "Protocolos & Seguridad",
    icon: <Zap className="w-4 h-4" />,
    items: [
      { q: "¿Qué frecuencia de PWM uso para controlar un motor DC? (ver guía PWM)", a: "Entre 4 kHz y 20 kHz para evitar zumbidos audibles y reducir pérdidas. Arduino UNO entrega 490 Hz por defecto en pines 3, 9, 10 y 11. Detalle completo y reconfiguración de Timers en /articulos/pwm-arduino." },
      { q: "¿Qué pull-ups necesita el bus I²C? (ver guía I2C)", a: "Según NXP UM10204: 4.7 kΩ para Standard-mode (100 kHz) y 2.2 kΩ para Fast-mode (400 kHz) a 5 V. A 3.3 V suelen usarse 10 kΩ. Capacitancia total del bus < 400 pF. Ver /articulos/protocolo-i2c." },
      { q: "¿Por qué se calienta el LM7805 y cómo lo dimensiono?", a: "Disipación: P = (Vin − 5 V) × Iout. Con 12 V y 500 mA disipa 3.5 W → necesita disipador. Si Vin > 9 V o Iout > 300 mA usá un buck (LM2596). Más en /articulos/reguladores-voltaje." },
      { q: "¿Cómo mido voltaje de red de 220 V de forma segura?", a: "Multímetro CAT III/IV (IEC 61010-1), puntas con dedales aislados, una sola mano apoyada y rango VAC ya seleccionado antes de tocar. Sin formación certificada, no abras tableros." },
    ],
  },
];

// Smooth-scroll que respeta href="#id" (mantiene navegación crawlable + UX suave)
const handleAnchorClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }
};

// scrollTo se redefine dentro del componente para poder actualizar el estado activo.

// Tres niveles de investigación
const quickAccessCards = [
  { icon: <Calculator className="h-6 w-6" />, title: "Nivel 1 · Laboratorio de Cálculo", desc: "Calculadoras verificadas en banco de pruebas", target: "calculadora", color: "bg-primary/10 text-primary" },
  { icon: <Microchip className="h-6 w-6" />, title: "Nivel 2 · Investigación de Componentes", desc: "Fichas técnicas y datasheets resumidos", target: "diccionario", color: "bg-violet-500/10 text-violet-500" },
  { icon: <BookOpen className="h-6 w-6" />, title: "Nivel 3 · Protocolos y Guías", desc: "PWM, I2C, reguladores y más", target: "guias", color: "bg-emerald-500/10 text-emerald-500" },
];

const NAV_SECTIONS = ["inicio", "aprender", "guias", "calculadora", "diccionario", "mini-proyectos", "foro", "recursos"] as const;
type NavSection = typeof NAV_SECTIONS[number];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeQaTab, setActiveQaTab] = useState("microcontroladores");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSection | null>(null);

  // scrollTo: navega suavemente y marca la sección como activa de inmediato
  // (sin esperar al IntersectionObserver), además de actualizar el hash.
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    if ((NAV_SECTIONS as readonly string[]).includes(id)) {
      setActiveSection(id as NavSection);
    }
  };

  // Foco y resaltado activo: usamos `outline` (no ocupa caja) + `box-shadow`
  // glow para evitar reflow/layout-shift y mantener consistencia entre
  // teclado, touch y desktop. La transición se limita a box-shadow/outline.
  const tileFocus =
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight focus-visible:shadow-[0_0_0_4px_hsl(var(--highlight)/0.18)] transition-[box-shadow,outline-color] duration-150";
  const tileActive = (id: string) =>
    activeSection === id
      ? "outline outline-2 outline-offset-2 outline-highlight/80 shadow-[0_0_0_4px_hsl(var(--highlight)/0.15)]"
      : "";

  // Resaltado del enlace activo según la sección visible.
  // IntersectionObserver con rootMargin para considerar "activa" la sección
  // que está justo debajo del navbar sticky.
  useEffect(() => {
    const sections = NAV_SECTIONS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Tomamos la sección más arriba que esté intersectando.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as NavSection);
        }
      },
      {
        // Considera "activa" la sección a partir de unos 80px bajo el navbar
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Soporte de deep-links con hash (#aprender, #guias, etc.):
  // - En el load inicial hace scroll suave a la sección correspondiente.
  // - Reacciona a hashchange (navegación del navegador o links externos).
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if ((NAV_SECTIONS as readonly string[]).includes(id)) {
          setActiveSection(id as NavSection);
        }
      });
    };

    // Reintentos por si la sección está montada vía lazy/Suspense.
    scrollToHash();
    const t1 = window.setTimeout(scrollToHash, 300);
    const t2 = window.setTimeout(scrollToHash, 800);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  // Atajo de teclado Cmd/Ctrl+K para abrir el buscador
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
        return;
      }
      // Atajo "/" estilo GitHub/YouTube — solo si no estás escribiendo en otro input
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        const tag = target.tagName;
        const isEditable =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target.isContentEditable;
        if (!isEditable) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  usePageMeta({
    title: "ElectroLab Pro | Calculadoras y Tutoriales de Electrónica",
    description: "Calculadoras de resistencias, capacitores y diodos online. Aprende electrónica desde cero con las herramientas gratuitas de ElectroLab Pro.",
  });

  // ═══════════ JSON-LD SCHEMAS (Organization + WebSite + ItemList) ═══════════
  useEffect(() => {
    const SITE_URL = "https://electrolabpro.com";

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ElectroLab Pro",
      alternateName: "ElectroLabPro",
      url: SITE_URL,
      logo: `${SITE_URL}/electrolab-logo.webp`,
      description:
        "Plataforma educativa de electrónica con calculadoras interactivas, guías técnicas y herramientas para estudiantes, hobbistas y profesionales.",
      founder: {
        "@type": "Person",
        name: "José Andrés Sánchez",
      },
      sameAs: [
        "https://electrolabpro.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contacto@electrolabpro.com",
        availableLanguage: ["Spanish"],
      },
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ElectroLab Pro",
      url: SITE_URL,
      inLanguage: "es",
      description:
        "Calculadoras de electrónica online: Ley de Ohm, resistencias, LED, divisor de voltaje, RC, 555. Guías y artículos técnicos en español.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      publisher: {
        "@type": "Organization",
        name: "ElectroLab Pro",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/electrolab-logo.webp`,
        },
      },
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Artículos destacados de ElectroLab Pro",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: 8,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Cómo Leer un Datasheet", url: `${SITE_URL}/articulos/leer-datasheet` },
        { "@type": "ListItem", position: 2, name: "Qué Arduino Comprar", url: `${SITE_URL}/articulos/que-arduino-comprar` },
        { "@type": "ListItem", position: 3, name: "PWM con Arduino", url: `${SITE_URL}/articulos/pwm-arduino` },
        { "@type": "ListItem", position: 4, name: "Reguladores de Voltaje", url: `${SITE_URL}/articulos/reguladores-voltaje` },
        { "@type": "ListItem", position: 5, name: "Ley de Ohm", url: `${SITE_URL}/articulos/ley-de-ohm` },
        { "@type": "ListItem", position: 6, name: "Código de Colores de Resistencias", url: `${SITE_URL}/articulos/codigo-colores-resistencias` },
        { "@type": "ListItem", position: 7, name: "Sensores Arduino", url: `${SITE_URL}/articulos/sensores-arduino` },
        { "@type": "ListItem", position: 8, name: "Protocolo I2C", url: `${SITE_URL}/articulos/protocolo-i2c` },
      ],
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: QA_CATEGORIES.flatMap((cat) =>
        cat.items.map((qa) => ({
          "@type": "Question",
          name: qa.q,
          acceptedAnswer: { "@type": "Answer", text: qa.a },
        })),
      ),
    };

    const schemas = [
      { id: "schema-organization", data: organizationSchema },
      { id: "schema-website", data: websiteSchema },
      { id: "schema-itemlist", data: itemListSchema },
      { id: "schema-faqpage", data: faqSchema },
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
      ["schema-organization", "schema-website", "schema-itemlist", "schema-faqpage"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  const activeQa = QA_CATEGORIES.find((c) => c.id === activeQaTab);

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-0">
      {/* ═══════════ NAVBAR (STICKY + BACKDROP BLUR) ═══════════ */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-primary/10 transition-colors duration-200 shrink-0">
            <img src={electrolabLogo} alt="ElectrolabPRO logo" width="36" height="36" className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-cover" loading="eager" decoding="async" />
            <span className="inline-flex items-center text-base sm:text-lg font-bold tracking-tight text-foreground px-1.5 py-1 sm:px-2 rounded-md sm:rounded-lg bg-primary/10 border border-primary/20">
              Electrolab<span className="text-primary">PRO</span>
            </span>
          </Link>

          {/* Desktop nav — anchors reales para que AdSense / Googlebot los rastreen */}
          <div className="hidden items-center gap-5 lg:flex" role="menubar" aria-label="Navegación principal">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "aprender", label: "Aprender" },
              { id: "guias", label: "Guías" },
              { id: "calculadora", label: "Calculadoras" },
              { id: "mini-proyectos", label: "Proyectos" },
              { id: "foro", label: "FAQ" },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleAnchorClick(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm font-medium transition-colors px-2 py-1 rounded-md ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-primary/10 px-2 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:text-foreground"
                aria-label="Menú de artículos"
              >
                Artículos <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-64 max-h-[70vh] overflow-y-auto"
              >
                <DropdownMenuItem asChild>
                  <Link to="/guia-resistencias" className="font-semibold text-primary cursor-pointer">
                    📘 Guía completa de resistencias
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {articleLinks.map((a) => (
                  <DropdownMenuItem key={a.to} asChild>
                    <Link to={a.to} className="cursor-pointer">{a.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/documentacion-tecnica" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-primary/10 px-2 py-1 rounded-md">Documentación</Link>
            <Link to="/sobre-nosotros" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-primary/10 px-2 py-1 rounded-md">Sobre Nosotros</Link>
            <Link to="/contacto" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-primary/10 px-2 py-1 rounded-md">Contacto</Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/10"
              aria-label="Abrir buscador"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Buscar</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">⌘K</kbd>
            </button>
            <Button size="sm" onClick={() => scrollTo("guias")}>Empezar</Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="border-t border-border bg-card px-6 py-4 lg:hidden space-y-1 animate-in slide-in-from-top-2">
            {[
              { label: "Inicio", id: "inicio" },
              { label: "Aprender", id: "aprender" },
              { label: "Guías", id: "guias" },
              { label: "Calculadoras", id: "calculadora" },
              { label: "Proyectos", id: "mini-proyectos" },
              { label: "FAQ", id: "foro" },
            ].map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => { handleAnchorClick(item.id)(e); setMenuOpen(false); }}
                className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link to="/guia-resistencias" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-semibold text-primary hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
              📘 Guía completa de resistencias
            </Link>
            <Link to="/documentacion-tecnica" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
              📚 Documentación Técnica
            </Link>
            <Link to="/contacto" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
              Contacto
            </Link>
            <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
              Sobre Nosotros
            </Link>
            <Link to="/glosario" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
              📖 Glosario Técnico
            </Link>
            <div className="border-t border-border pt-3 mt-2">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-semibold mb-2 px-3">Artículos</p>
              {articleLinks.map((a) => (
                <Link key={a.to} to={a.to} onClick={() => setMenuOpen(false)} className="block w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-accent py-2.5 px-3 rounded-lg min-h-[40px] transition-colors">
                  {a.label}
                </Link>
              ))}
            </div>
            <Button size="sm" className="w-full mt-3" onClick={() => { scrollTo("guias"); setMenuOpen(false); }}>
              Empezar
            </Button>
          </div>
        )}
      </header>

      {/* ═══════════ AD SLOT BAJO EL HEADER (anti-CLS, vía HomeAd) ═══════════ */}
      <HomeAd />

      {/* ═══════════ #INICIO ═══════════ */}
      <section id="inicio" className="relative px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.2] pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:auto-rows-[minmax(160px,auto)] gap-3 sm:gap-4">


          {/* HERO — tile principal */}
          <div className="md:col-span-8 md:row-span-2 min-h-[260px] bg-card rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-end relative overflow-hidden card-glow border border-border">
            <div className="absolute top-6 right-6 text-highlight opacity-20" aria-hidden="true">
              <CircuitBoard className="w-32 h-32" strokeWidth={1} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-highlight/30 bg-highlight/10 text-highlight text-[11px] font-bold tracking-wider uppercase mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-highlight" /> Centro de Investigación Técnica
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-foreground mb-3">
              ElectroLab Pro — Investigación,<br />
              Cálculo y <span className="text-gradient-primary">Documentación</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Herramientas y guías basadas en estándares internacionales de ingeniería, validadas en banco de pruebas.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <Button size="lg" className="gap-2" onClick={() => scrollTo("calculadora")}>
                <Calculator className="h-4 w-4" /> Usar calculadoras
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-highlight/40 text-highlight hover:bg-highlight/10 hover:text-highlight" onClick={() => scrollTo("guias")}>
                <BookOpen className="h-4 w-4" /> Ver guías
              </Button>
            </div>
          </div>

          {/* CALCULADORAS */}
          <button
            onClick={() => scrollTo("calculadora")}
            aria-current={activeSection === "calculadora" ? "true" : undefined}
            className={`md:col-span-4 md:row-span-1 min-h-[140px] bg-primary rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer text-left group ${tileFocus} ${tileActive("calculadora")}`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/10 rounded-lg">
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/70 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="text-xl font-bold text-primary-foreground">Calculadoras de Ingeniería</h3>
          </button>

          {/* DICCIONARIO */}
          <button
            onClick={() => scrollTo("diccionario")}
            aria-current={activeSection === "diccionario" ? "true" : undefined}
            className={`md:col-span-4 md:row-span-1 min-h-[140px] bg-card border border-highlight/30 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:bg-card/70 transition-colors cursor-pointer text-left card-glow ${tileFocus} ${tileActive("diccionario")}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
              <span className="text-highlight text-[10px] font-bold uppercase tracking-wider">Base de datos</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Diccionario de Componentes</h3>
              <p className="text-muted-foreground text-sm">Fichas y datasheets resumidos</p>
            </div>
          </button>

          {/* HERRAMIENTAS */}
          <div className="md:col-span-3 md:row-span-2 min-h-[260px] bg-card rounded-3xl p-5 sm:p-6 flex flex-col border border-border card-glow">
            <h3 className="text-lg font-bold text-foreground mb-4">Herramientas</h3>
            <ul className="space-y-2 flex-1">
              {[
                { label: "Ley de Ohm", id: "calculadora" },
                { label: "Resistencia LED", id: "calculadora" },
                { label: "Código de colores", id: "calculadora" },
                { label: "Divisor de voltaje", id: "calculadora" },
                { label: "Filtro RC / 555", id: "calculadora" },
              ].map((t) => (
                <li key={t.label}>
                  <button
                    onClick={() => scrollTo(t.id)}
                    className="w-full flex items-center gap-3 text-muted-foreground hover:text-foreground text-sm p-2 rounded-xl bg-background/40 hover:bg-background/70 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ARTÍCULOS RECIENTES */}
          <div className="md:col-span-6 md:row-span-2 min-h-[260px] bg-background border border-border rounded-3xl p-5 sm:p-6 overflow-hidden flex flex-col card-glow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-foreground">Artículos Recientes</h3>
              <a href="#aprender" onClick={handleAnchorClick("aprender")} className="text-highlight text-sm font-medium hover:underline">
                Ver todo →
              </a>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { t: "Cómo Leer un Datasheet", s: "Guía técnica · 10 min", to: "/articulos/leer-datasheet" },
                { t: "Qué Arduino Comprar", s: "Comparativa · 8 min", to: "/articulos/que-arduino-comprar" },
                { t: "PWM con Arduino", s: "Tutorial · 12 min", to: "/articulos/pwm-arduino" },
              ].map((a) => (
                <Link key={a.to} to={a.to} className="flex gap-4 p-3 rounded-2xl bg-card/50 hover:bg-card transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-highlight" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-foreground font-medium text-sm truncate">{a.t}</h4>
                    <p className="text-muted-foreground/70 text-xs mt-1">{a.s}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* EDUCACIÓN */}
          <button
            onClick={() => scrollTo("aprender")}
            aria-current={activeSection === "aprender" ? "true" : undefined}
            className={`md:col-span-3 md:row-span-1 min-h-[120px] bg-card rounded-3xl p-5 sm:p-6 flex flex-col justify-center border border-border card-glow text-left ${tileFocus} ${tileActive("aprender")}`}
          >
            <span className="text-highlight font-bold text-2xl">21+</span>
            <p className="text-foreground font-medium">Guías técnicas</p>
            <p className="text-muted-foreground/70 text-xs">De principiante a profesional</p>
          </button>

          {/* PLAY */}
          <Link
            to="/aprende-jugando"
            className={`md:col-span-3 md:row-span-1 min-h-[120px] bg-highlight rounded-3xl p-5 sm:p-6 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform ${tileFocus}`}
            aria-label="Jugá ElectroLab Play"
          >
            <div className="flex justify-between items-start">
              <Sparkles className="w-6 h-6 text-background" />
              <span className="text-background/70 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="text-lg font-bold text-background leading-tight">
              🎮 ElectroLab Play
              <span className="block text-xs font-medium opacity-80">Quiz interactivo</span>
            </h3>
          </Link>

          {/* FAQ */}
          <button
            onClick={() => scrollTo("foro")}
            aria-current={activeSection === "foro" ? "true" : undefined}
            className={`md:col-span-9 md:row-span-1 min-h-[120px] bg-card rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-border card-glow text-left ${tileFocus} ${tileActive("foro")}`}
          >
            <div>
              <h3 className="text-xl font-bold text-foreground">Preguntas Frecuentes</h3>
              <p className="text-muted-foreground">Resolvé dudas sobre componentes, fuentes y protocolos.</p>
            </div>
            <span className="px-5 py-2 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-highlight transition-colors whitespace-nowrap shrink-0">
              Abrir FAQ
            </span>
          </button>

        </div>
      </section>

      {/* ═══════════ #SERVICIOS – TARJETAS DE ACCESO RÁPIDO ═══════════ */}
      <section id="servicios" className="py-10 sm:py-14 border-t border-border">
        <div className="container mx-auto px-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-2">
              Niveles de <span className="text-primary">Investigación</span>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-8">El sitio está organizado en tres niveles según la profundidad técnica del contenido</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {quickAccessCards.map((card, i) => (
                <button
                  key={card.target}
                  onClick={() => scrollTo(card.target)}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card shadow-sm card-glow hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} transition-transform group-hover:scale-110`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{card.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Ir a sección ↓</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ #DETALLES – TODA LA INFORMACIÓN EN ACORDEONES ═══════════ */}
      <section id="detalles" className="py-14 sm:py-20 border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Aprende <span className="text-primary">Electrónica</span>
            </h2>

            <Accordion type="multiple" defaultValue={["intro"]} className="space-y-4">
              {/* Acordeón: ¿Qué es ElectroLabPro? */}
              <AccordionItem value="intro" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <CircuitBoard className="h-5 w-5 text-primary shrink-0" />
                    ¿Qué es ElectroLabPro?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-5 pb-6">
                  <p>
                    <strong className="text-foreground">ElectroLabPro</strong> es una plataforma diseñada para estudiantes, técnicos y aficionados a la electrónica. Aquí podés encontrar herramientas útiles como calculadoras de resistencias, ley de Ohm, LEDs y más.
                  </p>
                  <p>
                    Nuestro objetivo es simplificar los cálculos y ayudarte a comprender mejor los conceptos fundamentales de la electrónica, con ejemplos claros y fáciles de aplicar en la práctica.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Acordeón: ¿Qué es la Ley de Ohm? */}
              <AccordionItem value="ley-ohm" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary shrink-0" />
                    ¿Qué es la Ley de Ohm?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-5 pb-6">
                  <p>
                    La ley de Ohm es una de las bases de la electrónica. Relaciona el voltaje (V), la corriente (I) y la resistencia (R) mediante la fórmula:
                  </p>
                  <p className="text-center">
                    <code className="px-4 py-2 rounded-lg bg-accent text-foreground font-mono text-lg font-bold">V = I × R</code>
                  </p>
                  <p>
                    Esto significa que si conocés dos de estos valores, podés calcular el tercero fácilmente usando nuestras herramientas.
                  </p>
                  <div className="text-center pt-2">
                    <Button variant="outline" className="gap-2" onClick={() => scrollTo("calculadora")}>
                      <Calculator className="h-4 w-4" /> Ir a la calculadora de Ley de Ohm
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Acordeón: ¿Cómo usar las calculadoras? */}
              <AccordionItem value="como-usar" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary shrink-0" />
                    ¿Cómo usar las calculadoras?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    {[
                      { step: "1", title: "Ingresá los valores conocidos", desc: "Completá los campos con voltaje, corriente o resistencia según lo que tengas disponible.", icon: <Target className="h-6 w-6 text-primary" /> },
                      { step: "2", title: "Seleccioná la opción de cálculo", desc: "Elegí qué querés calcular: la calculadora detecta automáticamente el valor faltante.", icon: <Calculator className="h-6 w-6 text-primary" /> },
                      { step: "3", title: "Obtené el resultado automáticamente", desc: "Las calculadoras están diseñadas para ser rápidas, precisas y fáciles de usar.", icon: <Zap className="h-6 w-6 text-primary" /> },
                    ].map((item) => (
                      <div key={item.step} className="relative rounded-2xl border border-border bg-accent/30 p-7 text-center">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md">
                          {item.step}
                        </div>
                        <div className="flex justify-center mb-4 mt-2">{item.icon}</div>
                        <h3 className="font-semibold text-foreground text-base mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Acordeón: Ejemplo práctico */}
              <AccordionItem value="ejemplo" className="rounded-2xl border border-primary/20 bg-primary/5 shadow-sm px-6 overflow-hidden">
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-primary shrink-0" />
                    Ejemplo práctico: LED con fuente de 12V
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4 pb-6">
                  <p>
                    Si tenés una fuente de <strong className="text-foreground">12V</strong> y querés conectar un LED que trabaja a <strong className="text-foreground">2V</strong> con una corriente de <strong className="text-foreground">20mA</strong>, necesitás calcular la resistencia adecuada.
                  </p>
                  <p>
                    Con nuestra calculadora podés hacerlo en segundos y evitar errores que puedan dañar tus componentes.
                  </p>
                  <div className="text-center pt-2">
                    <Button size="lg" className="gap-2" onClick={() => scrollTo("calculadora")}>
                      Probalo ahora <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Acordeón: Electrónica básica */}
              <AccordionItem value="seo-basica" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-primary shrink-0" />
                    Electrónica básica: todo lo que necesitás saber
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed space-y-5 pb-6">
                  <p>
                    La <strong className="text-foreground">electrónica básica</strong> es el estudio de los circuitos eléctricos y los componentes que los conforman. Todo circuito electrónico se basa en el flujo de electrones a través de conductores, controlado por componentes como resistencias, condensadores, diodos y transistores. Comprender estos fundamentos es esencial para cualquier persona que quiera reparar dispositivos, diseñar prototipos o simplemente entender cómo funciona la tecnología que nos rodea.
                  </p>
                  <p>
                    Entre los conceptos más importantes están: la <strong className="text-foreground">Ley de Ohm</strong> (que relaciona voltaje, corriente y resistencia), las <strong className="text-foreground">leyes de Kirchhoff</strong> (que permiten analizar circuitos complejos), y los principios de <strong className="text-foreground">potencia eléctrica</strong> (que determinan cuánta energía consume o disipa un componente). En ElectroLab Pro cubrimos cada uno de estos temas con guías claras y calculadoras interactivas que te permiten practicar sin riesgo.
                  </p>
                  <p>
                    Si estás empezando, te recomendamos explorar nuestras guías sobre <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline font-medium">Ley de Ohm</Link>, <Link to="/articulos/codigo-colores-resistencias" className="text-primary hover:underline font-medium">código de colores de resistencias</Link> y <Link to="/articulos/circuitos-serie-paralelo" className="text-primary hover:underline font-medium">circuitos serie y paralelo</Link>. Combinadas con nuestras calculadoras, vas a poder resolver problemas reales desde el primer día.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* FAQ corto y CTA intermedio — consolidados en #foro y hero respectivamente */}

      {/* ═══════════ #APRENDER · HUB EDUCATIVO ═══════════ */}
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
          {/* Card destacada: guía completa de resistencias */}
          <Link
            to="/guia-resistencias"
            className="group flex flex-col rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300"
            aria-label="Leer la guía completa de resistencias paso a paso"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                ⭐ Destacado
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                +1.200 palabras
              </span>
            </div>
            <BookOpen className="w-7 h-7 text-primary mb-3" />
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Guía completa de resistencias
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
              Qué son, cómo funcionan, código de colores y cómo calcular su valor con la Ley de Ohm.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
              Leer guía de resistencias online →
            </span>
          </Link>

          {/* Card: Ley de Ohm */}
          <Link
            to="/articulos/ley-de-ohm"
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
            aria-label="Leer la guía explicativa de la Ley de Ohm"
          >
            <Zap className="w-7 h-7 text-primary mb-3" />
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Ley de Ohm explicada
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
              Voltaje, corriente y resistencia: la fórmula V = I × R con ejemplos prácticos.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
              Aprender la Ley de Ohm →
            </span>
          </Link>

          {/* Card: Código de colores */}
          <Link
            to="/articulos/codigo-colores-resistencias"
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
            aria-label="Aprender a leer el código de colores de resistencias"
          >
            <Lightbulb className="w-7 h-7 text-primary mb-3" />
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Código de colores de resistencias
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
              Cómo decodificar resistencias de 4 y 5 bandas según el estándar IEC 60062.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
              Ver código de colores →
            </span>
          </Link>

          {/* Card: Multímetro */}
          <Link
            to="/articulos/multimetro"
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
            aria-label="Cómo usar un multímetro digital paso a paso"
          >
            <Calculator className="w-7 h-7 text-primary mb-3" />
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Cómo usar un multímetro
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
              Medí voltaje, corriente, resistencia y continuidad sin dañar tu instrumento.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
              Guía del multímetro →
            </span>
          </Link>

          {/* Card: Arduino */}
          <Link
            to="/articulos/arduino"
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
            aria-label="Curso introductorio de Arduino para principiantes"
          >
            <Cpu className="w-7 h-7 text-primary mb-3" />
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Arduino para principiantes
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
              Instalación del IDE, primer sketch, Blink y proyectos básicos paso a paso.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
              Empezar con Arduino →
            </span>
          </Link>

          {/* Card: Próximamente */}
          <div className="flex flex-col rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center justify-center">
            <Sparkles className="w-7 h-7 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">
              Próximas guías
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Curso básico de electrónica, condensadores y diodos en preparación.
            </p>
            <a
              href="#guias"
              onClick={handleAnchorClick("guias")}
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-semibold hover:underline justify-center"
            >
              Ver todas las guías técnicas →
            </a>
          </div>
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

      {/* ═══════════ NIVEL 1 · LABORATORIO DE CÁLCULO ═══════════ */}
      <section
        id="calculadora"
        className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 border-t border-border"
      >
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">
            Nivel 1
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
            Laboratorio de <span className="text-primary">Cálculo</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
            Calculadoras interactivas verificadas en banco de pruebas con multímetro Fluke 117 y osciloscopio Hantek DSO5102P. Cada fórmula deriva de datasheets de fabricante y bibliografía de referencia (Sedra/Smith, Horowitz/Hill).
          </p>
          <div className="mt-4 flex justify-center">
            <Link to="/documentacion-tecnica#nivel-1" className="text-xs font-semibold text-primary hover:underline">
              Ver metodología completa →
            </Link>
          </div>
        </div>
        <Suspense fallback={<SectionFallback />}><CalculatorHub /></Suspense>
      </section>

      {/* ═══════════ RECURSOS & INFORMACIÓN (ACCORDION UNIFICADO) ═══════════ */}
      <section
        id="recursos"
        className="py-14 sm:py-20 border-t border-border bg-card/40"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">
              Recursos
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              Recursos e <span className="text-primary">información</span>
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
              Glosario, tips, servicios y más — todo organizado en un solo lugar.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {/* Glosario */}
            <AccordionItem value="glosario" id="glosario" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary shrink-0" />
                  Glosario rápido de electrónica
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-sm text-muted-foreground mb-5">
                  Definiciones cortas y claras de los conceptos más usados en electrónica.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { term: "Voltaje (V)", def: "Diferencia de potencial eléctrico entre dos puntos. Se mide en voltios. Es lo que 'empuja' los electrones por el circuito." },
                    { term: "Corriente (I)", def: "Cantidad de carga eléctrica que fluye por unidad de tiempo. Se mide en amperios (A) o miliamperios (mA)." },
                    { term: "Resistencia (R)", def: "Oposición al paso de la corriente. Se mide en ohmios (Ω). A mayor R, menos corriente para un mismo voltaje." },
                    { term: "Capacitancia (C)", def: "Capacidad de almacenar carga eléctrica de un condensador. Se mide en faradios (F), normalmente en μF, nF o pF." },
                    { term: "Frecuencia (f)", def: "Cantidad de ciclos por segundo de una señal alterna. Se mide en hercios (Hz), kHz o MHz." },
                    { term: "Reactancia (X)", def: "Oposición al paso de corriente alterna que ofrecen capacitores e inductores. Depende de la frecuencia." },
                    { term: "PWM", def: "Modulación por Ancho de Pulso. Técnica para controlar potencia variando el tiempo encendido/apagado de una señal digital." },
                    { term: "GND (Tierra)", def: "Punto de referencia 0V del circuito. Todos los voltajes se miden respecto a GND." },
                    { term: "Vcc / Vdd", def: "Voltaje positivo de alimentación. Vcc es para circuitos bipolares, Vdd para CMOS, pero suelen usarse igual." },
                  ].map((item) => (
                    <div key={item.term} className="rounded-lg border border-border/60 bg-background/50 p-4">
                      <h4 className="font-mono font-bold text-primary text-xs uppercase tracking-wider mb-1.5">
                        {item.term}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.def}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tips de Electrónica */}
            <AccordionItem value="tips" id="tips" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-primary shrink-0" />
                  Tips de electrónica
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 space-y-3">
                {[
                  { emoji: "💡", title: "El sentido del LED", text: "Recordá que los LED tienen polaridad. La pata larga es el Ánodo (+) y la corta el Cátodo (-). Si lo ponés al revés, no prenderá." },
                  { emoji: "🔗", title: "Resistencias en serie", text: "Si sumás dos resistencias una tras otra, su valor total aumenta (Rt = R1 + R2). Ideal para cuando no tenés el valor exacto que necesitás." },
                  { emoji: "⚠️", title: "Cuidado con el Protoboard", text: "Las líneas laterales (roja y azul) suelen estar conectadas a lo largo para la alimentación, pero las del medio están conectadas de forma vertical. ¡No hagas cortocircuito!" },
                  { emoji: "🔥", title: "Soldadura brillante", text: "Una buena soldadura debe quedar brillante y con forma de volcán. Si queda opaca o como una bola, es una 'soldadura fría' y fallará pronto." },
                  { emoji: "📏", title: "El truco del multímetro", text: "Siempre empezá midiendo en la escala más alta de tu tester para no quemar el fusible si no conocés el voltaje que vas a medir." },
                ].map((tip, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-lg border border-border/60 bg-background/50">
                    <span className="text-xl shrink-0">{tip.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* ¿Para quién es? */}
            <AccordionItem value="para-quien" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary shrink-0" />
                  ¿Para quién es ElectroLab Pro?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-sm text-muted-foreground mb-5">
                  Una plataforma que crece con vos: desde el primer LED hasta el diseño de PCB.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Lightbulb className="w-5 h-5 text-primary" />,
                      title: "Sos aficionado",
                      bullets: [
                        "Querés armar tus primeros circuitos sin quemar componentes.",
                        "Necesitás respuestas claras sin teoría innecesaria.",
                        "Buscás calculadoras que funcionen al toque.",
                      ],
                    },
                    {
                      icon: <BookOpen className="w-5 h-5 text-primary" />,
                      title: "Sos estudiante",
                      bullets: [
                        "Estudiás electrónica, mecatrónica o ingeniería.",
                        "Querés validar resultados de la facu en segundos.",
                        "Necesitás un glosario y guías técnicas a mano.",
                      ],
                    },
                    {
                      icon: <Cpu className="w-5 h-5 text-primary" />,
                      title: "Sos maker / técnico",
                      bullets: [
                        "Trabajás con Arduino, ESP32, Raspberry Pi.",
                        "Diseñás PCBs y necesitás filtros RC, divisores, 555.",
                        "Querés todas las calcs en una sola pantalla.",
                      ],
                    },
                  ].map((card) => (
                    <div key={card.title} className="rounded-lg border border-border/60 bg-background/50 p-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                        {card.icon}
                      </div>
                      <h4 className="text-sm font-bold text-foreground mb-2">{card.title}</h4>
                      <ul className="space-y-1.5">
                        {card.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="text-primary mt-0.5 shrink-0">▸</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ¿Por qué elegirnos? */}
            <AccordionItem value="por-que" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0" />
                  ¿Por qué elegir ElectroLab Pro?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: <Zap className="h-4 w-4 text-primary" />, title: "100% gratuito", desc: "Todas las calculadoras y guías son completamente gratis, sin registro ni suscripciones ocultas." },
                    { icon: <Calculator className="h-4 w-4 text-primary" />, title: "Resultados instantáneos", desc: "Ingresá los valores y obtené el resultado en milisegundos, con explicación incluida." },
                    { icon: <BookOpen className="h-4 w-4 text-primary" />, title: "Contenido educativo", desc: "Más de 11 guías técnicas escritas en lenguaje claro, con ejemplos prácticos y diagramas." },
                    { icon: <Cpu className="h-4 w-4 text-primary" />, title: "Diseñado por un electrónico", desc: "Desarrollado por J.A. Sánchez a partir de la recopilación y adaptación de información técnica proveniente de especialistas, manuales y documentación profesional en electrónica." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 p-4 rounded-lg border border-border/60 bg-background/50">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Servicios detallados */}
            <AccordionItem value="servicios" id="servicios-detalle" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-primary shrink-0" />
                  Servicios detallados
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: <CircuitBoard className="w-5 h-5 text-primary" />, title: "Diseño de Circuitos", desc: "Esquemas electrónicos optimizados con calculadoras de precisión para resistencias, LEDs, filtros RC y más." },
                    { icon: <Wrench className="w-5 h-5 text-primary" />, title: "Reparación Pro", desc: "Guías técnicas detalladas para diagnóstico y reparación de equipos electrónicos con herramientas profesionales." },
                    { icon: <TrendingUp className="w-5 h-5 text-primary" />, title: "Optimización", desc: "Mejoramos el rendimiento de tus sistemas con tips, proyectos prácticos y recomendaciones de componentes." },
                  ].map((s) => (
                    <div key={s.title} className="rounded-lg border border-border/60 bg-background/50 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        {s.icon}
                      </div>
                      <h4 className="mb-1.5 text-sm font-semibold text-foreground">{s.title}</h4>
                      <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ═══════════ ARTÍCULOS RECIENTES ═══════════ */}
      <section
        className="container mx-auto px-6 py-12 space-y-6 border-t border-border"
      >
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
          {[
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
          ].map((article) => (
            <div
              key={article.to}
            >
              <Link
                to={article.to}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/40 h-full"
              >
                <div className="relative w-full h-28 sm:h-32 bg-gradient-to-br from-primary/10 via-accent to-primary/5 flex items-center justify-center text-5xl">
                  {article.emoji}
                  <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-sm">
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

      {/* Guías Técnicas Destacadas — consolidadas en sección #guias más abajo */}

      {/* Servicios detalle — consolidados en #recursos accordion */}

      {/* ═══════════ STATS ═══════════ */}
      <section
        className="py-10 sm:py-14"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            {[
              { icon: <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />, value: "+10K", valueFull: "+10,000", label: "Cálculos realizados" },
              { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />, value: "+500", valueFull: "+500", label: "Estudiantes" },
              { icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />, value: "99.9%", valueFull: "99.9%", label: "Precisión" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  {s.icon}
                  <span className="text-xl sm:text-3xl md:text-4xl font-bold text-primary">
                    <span className="sm:hidden">{s.value}</span>
                    <span className="hidden sm:inline">{s.valueFull}</span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NIVEL 2 · INVESTIGACIÓN DE COMPONENTES ═══════════ */}
      <section
        id="diccionario"
        className="container mx-auto px-6 py-12 border-t border-border"
      >
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">
            Nivel 2
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
            Investigación de <span className="text-primary">Componentes</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
            Fichas técnicas con símbolo IEEE 315, encapsulado, parámetros eléctricos críticos (Vce/Ic max, Vf, Pd) y aplicaciones contrastadas con uso real en banco de pruebas.
          </p>
        </div>
        <Suspense fallback={<SectionFallback />}><ComponentDictionary /></Suspense>
      </section>

      {/* ═══════════ MINI PROYECTOS ═══════════ */}
      <div
        id="mini-proyectos"
        className="container mx-auto px-6 py-12"
      >
        <Suspense fallback={<SectionFallback />}><MiniProjects /></Suspense>
      </div>

      {/* Tips — consolidados en #recursos accordion */}

      {/* ═══════════ FORO / Q&A CON TABS ═══════════ */}
      <section
        id="foro"
        className="container mx-auto px-6 py-16 border-t border-border"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Preguntas Frecuentes
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">Respuestas rápidas organizadas por categoría</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-start md:justify-center md:flex-wrap -mx-6 px-6 md:mx-0 md:px-0">
          {QA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveQaTab(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeQaTab === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Q&A items as Accordions */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {activeQa?.items.map((item, i) => (
              <AccordionItem key={`${activeQaTab}-${i}`} value={`qa-${i}`} className="rounded-xl border border-border bg-card shadow-sm px-5 overflow-hidden">
                <AccordionTrigger className="text-sm font-semibold text-card-foreground hover:no-underline py-4">
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {i + 1}
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-9 pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════════ GUÍAS COMPLETAS ═══════════ */}
      <section
        id="guias"
        className="container mx-auto px-6 py-16 border-t border-border"
      >
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">
            Nivel 3
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground flex items-center justify-center gap-3">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Documentación <span className="text-primary">Técnica</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
            Protocolos, guías de componentes y procedimientos contrastados con normativas vigentes (IEC 60062, IEEE 315, IEC 61010-1, NXP UM10204) y datasheets de fabricante.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link to="/documentacion-tecnica" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity">
              📚 Ver hub de Documentación Técnica
            </Link>
            <Link to="/documentacion-tecnica#faq-tecnica" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
              FAQ técnica avanzada →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { emoji: "🔢", title: "Ley de Ohm Explicada", desc: "Domina la relación entre voltaje, corriente y resistencia con ejemplos prácticos.", to: "/articulos/ley-de-ohm", tag: "Fundamentos" },
            { emoji: "🎨", title: "Código de Colores", desc: "Aprende a descifrar las bandas de colores de cualquier resistencia.", to: "/articulos/codigo-colores-resistencias", tag: "Componentes" },
            { emoji: "⚡", title: "Guía de Condensadores", desc: "Electrolíticos, cerámicos y cómo leer el código de 3 números.", to: "/articulos/condensadores", tag: "Componentes" },
            { emoji: "💡", title: "Diodos: Guía Completa", desc: "Funcionamiento, tipos y aplicaciones de los diodos.", to: "/articulos/diodos", tag: "Componentes" },
            { emoji: "📟", title: "Cómo Usar un Multímetro", desc: "Guía práctica para medir voltaje, resistencia y continuidad.", to: "/articulos/multimetro", tag: "Equipamiento" },
            { emoji: "🔗", title: "Serie vs. Paralelo", desc: "Diferencias clave con fórmulas y ejemplos prácticos.", to: "/articulos/circuitos-serie-paralelo", tag: "Fundamentos" },
            { emoji: "🔌", title: "Guía de Transistores", desc: "BJT, MOSFET y Darlington: cómo funcionan y cómo usarlos.", to: "/articulos/transistores", tag: "Componentes" },
            { emoji: "🤖", title: "Arduino para Principiantes", desc: "Primeros pasos con Arduino: instalación, código y proyectos.", to: "/articulos/arduino", tag: "Proyectos" },
            { emoji: "📊", title: "Osciloscopios", desc: "Guía completa para entender y usar un osciloscopio.", to: "/articulos/osciloscopio", tag: "Equipamiento" },
            { emoji: "🔋", title: "Fuentes de Alimentación", desc: "Tipos, regulación y cómo elegir la fuente correcta.", to: "/articulos/fuentes-de-alimentacion", tag: "Componentes" },
            { emoji: "🔥", title: "Soldadura Electrónica", desc: "Técnicas, herramientas y consejos para soldar como profesional.", to: "/articulos/soldadura-electronica", tag: "Técnicas" },
            { emoji: "🔌", title: "Protocolo I2C", desc: "Comunicación entre microcontroladores y sensores con solo 2 cables.", to: "/articulos/protocolo-i2c", tag: "Protocolos" },
            { emoji: "📡", title: "Sensores Arduino", desc: "DHT11, HC-SR04, LDR y PIR: conexión, código y proyectos prácticos.", to: "/articulos/sensores-arduino", tag: "Proyectos" },
          ].map((guide, i) => (
            <div
              key={guide.to}
            >
              <Link to={guide.to} className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <div className="w-full h-28 bg-accent flex items-center justify-center text-4xl">{guide.emoji}</div>
                <div className="flex flex-col flex-1 p-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{guide.tag}</span>
                  <h3 className="font-semibold text-card-foreground text-base group-hover:text-primary transition-colors">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{guide.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">Leer guía →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ HERRAMIENTAS RECOMENDADAS ═══════════ */}
      <section
        className="container mx-auto px-6 py-16 border-t border-border"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Herramientas Recomendadas
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">El equipamiento esencial para armar tu laboratorio</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { emoji: "📟", title: "Multímetro Digital Profesional", desc: "Ideal para medir voltaje, corriente y resistencia con alta precisión.", mlLink: "https://www.amazon.es/s?k=multimetro+digital+autorango&tag=electrolabp0c-21", amzLink: "https://www.amazon.es/s?k=multimetro+digital+autorango&tag=electrolabp0c-21" },
            { emoji: "🔧", title: "Estación de Soldadura", desc: "Temperatura regulable para trabajos con componentes SMD y PCB.", mlLink: "https://www.amazon.es/s?k=estacion+soldadura+60w&tag=electrolabp0c-21", amzLink: "https://www.amazon.es/s?k=estacion+soldadura+60w&tag=electrolabp0c-21" },
            { emoji: "🤖", title: "Kit de Inicio Arduino", desc: "Todo lo que necesitas para empezar a programar microcontroladores.", mlLink: "https://www.amazon.es/s?k=kit+arduino+starter&tag=electrolabp0c-21", amzLink: "https://www.amazon.es/s?k=kit+arduino+starter&tag=electrolabp0c-21" },
          ].map((tool) => (
            <div key={tool.title} className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-full h-28 bg-accent flex items-center justify-center text-4xl">{tool.emoji}</div>
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <h3 className="font-semibold text-card-foreground text-base">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc}</p>
                <div className="flex gap-2 pt-2">
                  <a href={tool.mlLink} target="_blank" rel="noopener noreferrer nofollow" className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
                    Ver en Mercado Libre
                  </a>
                  <a href={tool.amzLink} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:text-foreground hover:border-foreground/30 transition-all">
                    Amazon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ EQUIPA TU LABORATORIO ═══════════ */}
      <section
        id="equipamiento"
        className="container mx-auto px-6 py-12 border-t border-border"
      >
        <h2 className="text-lg sm:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-muted-foreground">
          <ShoppingBag className="w-4 h-4" />
          Equipa tu laboratorio
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
          {[
            { emoji: "🔧", title: "Kit de Resistencias", link: "https://www.amazon.es/s?k=kit+1000+resistencias+surtido&tag=electrolabp0c-21" },
            { emoji: "📟", title: "Multímetro Digital", link: "https://www.amazon.es/s?k=multimetro+digital+economico&tag=electrolabp0c-21" },
            { emoji: "🧪", title: "Breadboard + Cables", link: "https://www.amazon.es/s?k=breadboard+cables+jumper+kit&tag=electrolabp0c-21" },
          ].map((item) => (
            <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer nofollow" className="flex-1 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 group">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">{item.title}</span>
              <span className="ml-auto text-xs text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </a>
          ))}
        </div>
        <p className="text-center text-[10px] text-muted-foreground/50 mt-4 italic">
          En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
        </p>
      </section>

      {/* ¿Por qué elegir? — consolidado en #recursos accordion */}

      {/* ═══════════ AD SLOT SECUNDARIO — Banner_Principal_ElectroLab (3756475501) ═══════════ */}
      <div className="container mx-auto px-4 sm:px-6 my-6">
        <AdSenseSlot slot="3756475501" variant="inline" fallbackUrl="/" />
      </div>


      <footer className="border-t border-border py-8 px-6 bg-card/50">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-xs sm:text-sm mb-4">
            © {new Date().getFullYear()} ElectroLab Pro
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span>
            Diseñado por <span className="font-semibold">J.A.Sanchez</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4 mb-3">
            <Link to="/guia-resistencias" className="text-primary text-[10px] uppercase tracking-wider hover:underline font-semibold transition-colors min-h-[36px] flex items-center">📘 Guía de resistencias</Link>
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
            <p className="text-primary/80 text-[10px] font-semibold uppercase tracking-wider mb-1">⚠️ Aviso de Seguridad y Responsabilidad</p>
            <p className="text-muted-foreground/50 text-[9px] leading-relaxed max-w-2xl mx-auto">
              Los cálculos y datos proporcionados por ElectroLab Pro son estrictamente para fines educativos y de prototipado.
              La electrónica implica riesgos; siempre verifica los valores de componentes con un multímetro real antes de energizar un circuito.
              J.A. Sanchez y ElectroLab Pro no se hacen responsables por daños materiales o personales derivados del uso de esta herramienta.
            </p>
          </div>
        </div>
      </footer>

      {/* Buscador global ⌘K */}
      {/* Lazy: el bundle del buscador sólo se descarga cuando el usuario lo abre. */}
      {searchOpen && (
        <Suspense fallback={null}>
          <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
