import { useState } from "react";
import { Zap, ChevronDown, BookOpen, Cpu, Calculator, Users, Target, ShoppingBag, Menu, X } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import ResistorCalculator from "@/components/ResistorCalculator";
import ComponentDictionary from "@/components/ComponentDictionary";
import AdBanner from "@/components/AdBanner";
import OhmCalculator from "@/components/OhmCalculator";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Calculadora", target: "calculadora" },
];

const navPageLinks = [
  { label: "Componentes", to: "/articulos/codigo-colores-resistencias" },
  { label: "Equipamiento", to: "/articulos/multimetro" },
];

const articleLinks = [
  { label: "Código de Colores", to: "/articulos/codigo-colores-resistencias" },
  { label: "Condensadores", to: "/articulos/condensadores" },
  { label: "Diodos", to: "/articulos/diodos" },
  { label: "Ley de Ohm", to: "/articulos/ley-de-ohm" },
  { label: "Multímetro", to: "/articulos/multimetro" },
  { label: "Serie vs Paralelo", to: "/articulos/circuitos-serie-paralelo" },
  { label: "Transistores", to: "/articulos/transistores" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  usePageMeta({
    title: "ElectroLab Pro - Calculadora de Resistencias, Capacitores y Diodos Online",
    description: "Calculadora de resistencias, capacitores y diodos online. Aprende electrónica desde cero con las herramientas gratuitas de ElectroLab Pro por José Andrés Sánchez.",
  });

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Encabezado */}
      <header className="sticky top-0 z-[9999] border-b border-border bg-background backdrop-blur-none">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary glow-icon" />
            <span className="text-lg md:text-xl font-mono font-bold text-foreground">
              Electro<span className="text-primary">Lab</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            {navPageLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
                Artículos
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-[9999]">
                {articleLinks.map((a) => (
                  <Link
                    key={a.to}
                    to={a.to}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/sobre-nosotros"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Sobre Nosotros
            </Link>
            <button
              onClick={() => scrollTo("equipamiento")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-muted-foreground/30 text-muted-foreground text-sm font-medium transition-all hover:text-foreground hover:border-foreground/50"
            >
              <ShoppingBag className="w-4 h-4" />
              Herramientas
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
           <nav className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1 z-[9999]">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => { scrollTo(link.target); setMenuOpen(false); }}
                className="block w-full text-left text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors font-medium py-3 px-3 rounded-lg min-h-[44px]"
              >
                {link.label}
              </button>
            ))}
            {navPageLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors font-medium py-3 px-3 rounded-lg min-h-[44px]"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-1">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-semibold mb-1 px-3">Artículos</p>
              {articleLinks.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-left text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors font-medium py-3 px-3 rounded-lg min-h-[44px]"
                >
                  {a.label}
                </Link>
              ))}
            </div>
            <Link
              to="/sobre-nosotros"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-base text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors font-medium py-3 px-3 rounded-lg min-h-[44px]"
            >
              Sobre Nosotros
            </Link>
            <button
              onClick={() => { scrollTo("equipamiento"); setMenuOpen(false); }}
              className="flex items-center gap-1.5 w-full px-4 py-3 rounded-lg border border-muted-foreground/30 text-muted-foreground text-base font-medium transition-all hover:text-foreground hover:border-foreground/50 min-h-[44px]"
            >
              <ShoppingBag className="w-5 h-5" />
              Herramientas
            </button>
          </nav>
        )}

        {/* Banner publicitario superior - oculto en móvil */}
        <div className="container mx-auto px-4 pb-2 hidden md:block">
          <AdBanner slot="1234567890" format="horizontal" className="min-h-[90px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 sm:py-24 md:py-32" style={{ background: 'linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)' }}>
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-30 blur-[100px]" style={{ background: 'hsl(199 89% 60% / 0.4)' }} />
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent leading-tight">
            ElectroLab Pro
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            La suite definitiva para ingenieros y entusiastas de la electrónica. Calcula, aprende y diseña con precisión digital.
          </p>
          <Button
            size="lg"
            className="gap-2 text-base font-semibold animate-pulse-glow"
            onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Empezar a Calcular
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-16 border-b border-border" style={{ background: 'linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(222 47% 11%) 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: <Zap className="w-8 h-8 text-primary glow-icon" />, title: "Precisión Total", desc: "Algoritmos verificados para cálculos exactos de 4 y 5 bandas." },
              { icon: <BookOpen className="w-8 h-8 text-primary glow-icon" />, title: "Diccionario Vivo", desc: "Acceso rápido a definiciones y símbolos de componentes reales." },
              { icon: <Cpu className="w-8 h-8 text-primary glow-icon" />, title: "Modo Pro", desc: "Interfaz optimizada para ingenieros con modo oscuro de alto contraste." },
            ].map((f) => (
              <div key={f.title} className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 text-center space-y-3">
                <div className="inline-flex p-3 rounded-lg bg-secondary">{f.icon}</div>
                <h3 className="text-lg font-mono font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 sm:py-12 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-8 text-center">
            {[
              { icon: <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />, value: "+10K", valueFull: "+10,000", label: "Cálculos realizados" },
              { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />, value: "+500", valueFull: "+500", label: "Estudiantes" },
              { icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />, value: "99.9%", valueFull: "99.9%", label: "Precisión" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  {s.icon}
                  <span className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-primary glow-text">
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

      {/* AdSense Slot 1: Debajo de stats */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner slot="1111111111" format="auto" className="min-h-[90px] md:min-h-[100px]" />
      </div>

      {/* Contenido principal */}
      {/* Calculadora — Protagonista */}
      <div id="calculadora" className="container mx-auto px-4 py-10 sm:py-16">
        <ResistorCalculator />
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-20">

            {/* Guías Técnicas Destacadas */}
            <section className="space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-center flex items-center justify-center gap-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary glow-icon" />
                Guías Técnicas Destacadas
              </h2>
              <p className="text-center text-muted-foreground text-xs sm:text-sm">Artículos esenciales para dominar los fundamentos</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {[
                  {
                    emoji: "🔢",
                    title: "Ley de Ohm",
                    desc: "Aprende los fundamentos del voltaje y la corriente.",
                    to: "/articulos/ley-de-ohm",
                  },
                  {
                    emoji: "💡",
                    title: "Diodos y Semiconductores",
                    desc: "Guía práctica para principiantes.",
                    to: "/articulos/diodos",
                  },
                  {
                    emoji: "⚡",
                    title: "Condensadores",
                    desc: "Tipos, valores y aplicaciones en circuitos.",
                    to: "/articulos/condensadores",
                  },
                ].map((guide) => (
                  <Link
                    key={guide.to}
                    to={guide.to}
                    className="group flex flex-col rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)]"
                  >
                    <div className="w-full h-24 sm:h-28 bg-secondary/50 flex items-center justify-center text-4xl">
                      {guide.emoji}
                    </div>
                    <div className="flex flex-col flex-1 p-4 space-y-2">
                      <h3 className="font-mono font-bold text-foreground text-base group-hover:text-primary transition-colors">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{guide.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
                        Leer guía →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* AdSense: Entre calculadoras */}
            <AdBanner slot="2222222222" format="auto" className="min-h-[90px] md:min-h-[120px]" />

            <div>
              <OhmCalculator />
            </div>

            {/* AdSense: Entre calculadora Ohm y diccionario */}
            <AdBanner slot="3333333333" format="auto" className="min-h-[90px] md:min-h-[100px]" />

            <div id="diccionario">
              <ComponentDictionary />
            </div>

          </main>


          {/* Lateral con afiliados y publicidad */}
          <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0">
            <div className="sticky top-40 space-y-8">
              {/* Bloque de Afiliados */}
              <div className="p-4 rounded-xl border border-border bg-card/50">
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" /> Herramientas Pro
                </h4>
                <ul className="space-y-4">
                  <li className="text-xs">
                    <a href="https://www.amazon.es/s?k=multimetro+digital+autorango&tag=electrolabpro-21" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">Multímetro Digital Autorango</a>
                    <p className="text-muted-foreground mt-1">El que usamos en el lab.</p>
                  </li>
                  <li className="text-xs">
                    <a href="https://www.amazon.es/s?k=estacion+soldadura+60w&tag=electrolabpro-21" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">Estación de Soldado 60W</a>
                    <p className="text-muted-foreground mt-1">Precisión para integrados.</p>
                  </li>
                </ul>
              </div>
              {/* Banner de publicidad */}
              <AdBanner slot="0987654321" format="vertical" className="min-h-[250px]" />
            </div>
          </aside>
        </div>
      </div>

      {/* Tips de Electrónica */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-center mb-2 flex items-center justify-center gap-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary glow-icon" />
            Tips de Electrónica
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">por J.A.Sanchez</p>
          <div className="space-y-4">
            {[
              { emoji: "💡", title: "El sentido del LED", text: "Recordá que los LED tienen polaridad. La pata larga es el Ánodo (+) y la corta el Cátodo (-). Si lo ponés al revés, no prenderá." },
              { emoji: "🔗", title: "Resistencias en serie", text: "Si sumás dos resistencias una tras otra, su valor total aumenta (Rt = R1 + R2). Ideal para cuando no tenés el valor exacto que necesitás." },
              { emoji: "⚠️", title: "Cuidado con el Protoboard", text: "Las líneas laterales (roja y azul) suelen estar conectadas a lo largo para la alimentación, pero las del medio están conectadas de forma vertical. ¡No hagas cortocircuito!" },
              { emoji: "🔥", title: "Soldadura brillante", text: "Una buena soldadura debe quedar brillante y con forma de volcán. Si queda opaca o como una bola, es una 'soldadura fría' y fallará pronto." },
              { emoji: "📏", title: "El truco del multímetro", text: "Siempre empezá midiendo en la escala más alta de tu tester para no quemar el fusible si no conocés el voltaje que vas a medir." },
            ].map((tip, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card/60 hover:border-primary/40 transition-all duration-300 group">
                <span className="text-2xl shrink-0 mt-0.5">{tip.emoji}</span>
                <div>
                  <h3 className="font-mono font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Tarjeta Kit Recomendado - removed to simplify */}
        </div>
      </section>

      {/* Guías de Electrónica */}
      <section className="container mx-auto px-4 py-20 border-b border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-center mb-2 flex items-center justify-center gap-3">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary glow-icon" />
            Guías de Electrónica
          </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">Artículos esenciales para dominar los fundamentos</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              emoji: "🔢",
              title: "Ley de Ohm Explicada",
              desc: "Domina la relación entre voltaje, corriente y resistencia con ejemplos prácticos y el triángulo de Ohm.",
              to: "/articulos/ley-de-ohm",
              tag: "Fundamentos",
            },
            {
              emoji: "💡",
              title: "Tipos de Diodos",
              desc: "Guía completa sobre diodos rectificadores, LED, Zener, Schottky y fotodiodos con aplicaciones reales.",
              to: "/articulos/diodos",
              tag: "Semiconductores",
            },
            {
              emoji: "⚡",
              title: "Funciones de los Capacitores",
              desc: "Aprende a leer y diferenciar tipos de capacitores cerámicos y electrolíticos con nuestra guía completa.",
              to: "/articulos/condensadores",
              tag: "Componentes",
            },
          ].map((guide) => (
            <Link
              key={guide.to}
              to={guide.to}
              className="group flex flex-col rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)]"
            >
              <div className="w-full h-32 bg-secondary/50 flex items-center justify-center text-5xl">
                {guide.emoji}
              </div>
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">{guide.tag}</span>
                <h3 className="font-mono font-bold text-foreground text-lg group-hover:text-primary transition-colors">{guide.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{guide.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
                  Leer guía →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Aprende Electrónica */}
      <section className="container mx-auto px-4 py-20 border-b border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-center mb-2 flex items-center justify-center gap-3">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary glow-icon" />
            Aprende Electrónica
          </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">Artículos educativos escritos por J.A.Sanchez para dominar los fundamentos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              emoji: "🎨",
              title: "Código de Colores de Resistencias",
              desc: "Aprende a leer el valor de cualquier resistencia usando su código de bandas de colores. Incluye tablas, ejemplos prácticos de 4 y 5 bandas, errores comunes y trucos mnemotécnicos.",
              to: "/articulos/codigo-colores-resistencias",
              tag: "Fundamentos",
            },
            {
              emoji: "⚡",
              title: "Funciones de los Capacitores",
              desc: "Descubre cómo funcionan los condensadores, sus tipos (cerámicos, electrolíticos, tantalio, supercondensadores), aplicaciones en filtrado, desacoplamiento, temporización y más.",
              to: "/articulos/condensadores",
              tag: "Componentes",
            },
            {
              emoji: "💡",
              title: "Tipos de Diodos",
              desc: "Guía completa sobre diodos: rectificadores, LED, Zener, Schottky y fotodiodos. Aprende su funcionamiento, identificación de terminales y aplicaciones prácticas.",
              to: "/articulos/diodos",
              tag: "Semiconductores",
            },
            {
              emoji: "🔢",
              title: "Ley de Ohm Explicada",
              desc: "Domina la relación entre voltaje, corriente y resistencia. Triángulo de Ohm, fórmulas de potencia, ejemplos resueltos y aplicaciones reales en diseño electrónico.",
              to: "/articulos/ley-de-ohm",
              tag: "Fundamentos",
            },
            {
              emoji: "📟",
              title: "Cómo Usar un Multímetro",
              desc: "Guía paso a paso para medir voltaje, corriente, resistencia y continuidad. Consejos de seguridad y recomendaciones de compra para principiantes.",
              to: "/articulos/multimetro",
              tag: "Herramientas",
            },
            {
              emoji: "🔌",
              title: "Circuitos Serie vs Paralelo",
              desc: "Entiende las diferencias entre conexiones en serie y paralelo. Fórmulas, tabla comparativa, circuitos mixtos y ejemplos prácticos resueltos.",
              to: "/articulos/circuitos-serie-paralelo",
              tag: "Fundamentos",
            },
          ].map((article) => (
            <Link
              key={article.to}
              to={article.to}
              className="group flex flex-col rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)]"
            >
              <div className="w-full h-36 bg-secondary/50 flex items-center justify-center text-5xl">
                {article.emoji}
              </div>
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">{article.tag}</span>
                <h3 className="font-mono font-bold text-foreground text-lg group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{article.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">
                  Leer artículo →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Equipa tu laboratorio — Fila compacta */}
      <section id="equipamiento" className="container mx-auto px-4 py-16">
        <h2 className="text-lg sm:text-xl font-mono font-bold text-center mb-6 flex items-center justify-center gap-2 text-muted-foreground">
          <ShoppingBag className="w-4 h-4" />
          Equipa tu laboratorio
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
          {[
            { emoji: "🔧", title: "Kit de Resistencias", link: "https://www.amazon.es/s?k=kit+1000+resistencias+surtido&tag=electrolabpro-21" },
            { emoji: "📟", title: "Multímetro Digital", link: "https://www.amazon.es/s?k=multimetro+digital+economico&tag=electrolabpro-21" },
            { emoji: "🧪", title: "Breadboard + Cables", link: "https://www.amazon.es/s?k=breadboard+cables+jumper+kit&tag=electrolabpro-21" },
          ].map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex-1 flex items-center gap-3 rounded-lg border border-border bg-card/60 px-4 py-3 hover:border-muted-foreground/40 transition-all duration-300 group"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</span>
              <span className="ml-auto text-xs text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </a>
          ))}
        </div>
        <p className="text-center text-[10px] text-muted-foreground/50 mt-4 italic">
          Como Afiliado de Amazon, gano por las compras adscritas que cumplen los requisitos aplicables.
        </p>
      </section>

      {/* AdSense: Antes del footer */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="4444444444" format="auto" className="min-h-[90px] md:min-h-[120px]" />
      </div>

      {/* Pie de página */}
      <footer className="w-full py-6 sm:py-8 mt-auto bg-black/50 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
           <p className="text-muted-foreground text-xs sm:text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
             © 2026 ElectroLab Pro
             <br className="sm:hidden" />
             <span className="hidden sm:inline"> | </span>
             Diseñado por <span className="font-semibold">J.A.Sanchez</span>
          </p>
           <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4 mb-3">
             <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors min-h-[36px] flex items-center">Privacidad</Link>
             <span className="text-muted-foreground/40 text-[10px]">|</span>
             <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors min-h-[36px] flex items-center">Aviso Legal</Link>
             <span className="text-muted-foreground/40 text-[10px]">|</span>
             <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors min-h-[36px] flex items-center">Contacto</Link>
             <span className="text-muted-foreground/40 text-[10px]">|</span>
             <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors min-h-[36px] flex items-center">Sobre Nosotros</Link>
           </div>
           <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic mb-4">
            "Como Afiliado de Amazon, percibo dinero por las compras elegibles. 
            Los ingresos generados ayudan a mantener esta plataforma gratuita para estudiantes de electrónica."
           </p>
           <div className="border-t border-white/5 pt-4 mt-2">
             <p className="text-amber-400/80 text-[10px] font-semibold uppercase tracking-wider mb-1">⚠️ Aviso de Seguridad y Responsabilidad</p>
             <p className="text-muted-foreground/50 text-[9px] leading-relaxed max-w-2xl mx-auto">
               Los cálculos y datos proporcionados por ElectroLab Pro son estrictamente para fines educativos y de prototipado. 
               La electrónica implica riesgos; siempre verifica los valores de componentes (resistencias, capacitores, diodos) con un multímetro real antes de energizar un circuito. 
               J.A. Sanchez y ElectroLab Pro no se hacen responsables por daños materiales o personales derivados del uso de esta herramienta.
             </p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
