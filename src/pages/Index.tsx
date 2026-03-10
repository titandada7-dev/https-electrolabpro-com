import { useState } from "react";
import { Zap, ChevronDown, BookOpen, Cpu, Calculator, Users, Target, ShoppingBag, ShoppingCart, Package, Flame, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResistorCalculator from "@/components/ResistorCalculator";
import ComponentDictionary from "@/components/ComponentDictionary";
import AdBanner from "@/components/AdBanner";
import OhmCalculator from "@/components/OhmCalculator";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Calculadora", target: "calculadora" },
  { label: "Componentes", target: "diccionario" },
  { label: "Equipamiento", target: "equipamiento" },
];

const articleLinks = [
  { label: "Código de Colores", to: "/articulos/codigo-colores-resistencias" },
  { label: "Condensadores", to: "/articulos/condensadores" },
  { label: "Diodos", to: "/articulos/diodos" },
  { label: "Ley de Ohm", to: "/articulos/ley-de-ohm" },
  { label: "Multímetro", to: "/articulos/multimetro" },
  { label: "Serie vs Paralelo", to: "/articulos/circuitos-serie-paralelo" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Encabezado */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
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
            <div className="relative group">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
                Artículos
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-lg border border-border bg-card/95 backdrop-blur-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
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
              onClick={() => scrollTo("kits-oficiales")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
            >
              <ShoppingBag className="w-4 h-4" />
              Kits de Oferta
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => { scrollTo(link.target); setMenuOpen(false); }}
                className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-border pt-2 mt-1">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-semibold mb-2">Artículos</p>
              {articleLinks.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  {a.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => { scrollTo("kits-oficiales"); setMenuOpen(false); }}
              className="flex items-center gap-1.5 w-full px-4 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white text-sm font-bold transition-all shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
            >
              <ShoppingBag className="w-4 h-4" />
              Kits de Oferta
            </button>
          </nav>
        )}

        {/* Banner publicitario superior */}
        <div className="container mx-auto px-4 pb-2">
          <AdBanner slot="1234567890" format="horizontal" className="min-h-[90px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: 'linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)' }}>
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-30 blur-[100px]" style={{ background: 'hsl(199 89% 60% / 0.4)' }} />
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            ElectroLab Pro
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
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
      <section className="py-16 border-b border-border" style={{ background: 'linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(222 47% 11%) 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="py-12 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Calculator className="w-5 h-5 text-primary" />, value: "+10,000", label: "Cálculos realizados" },
              { icon: <Users className="w-5 h-5 text-primary" />, value: "+500", label: "Estudiantes en la comunidad" },
              { icon: <Target className="w-5 h-5 text-primary" />, value: "99.9%", label: "Precisión garantizada" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  {s.icon}
                  <span className="text-3xl md:text-4xl font-mono font-bold text-primary glow-text">{s.value}</span>
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Herramientas */}
          <main className="flex-1 space-y-12">
            <div id="calculadora">
              <ResistorCalculator />
            </div>

            {/* AdSense: Entre calculadoras */}
            <AdBanner slot="2222222222" format="auto" className="min-h-[90px] md:min-h-[120px]" />

            <div>
              <OhmCalculator />
            </div>

            {/* AdSense Slot 2: Entre calculadoras y diccionario */}
            <AdBanner slot="3333333333" format="auto" className="min-h-[90px] md:min-h-[100px]" />

            <div id="diccionario">
              <ComponentDictionary />
            </div>

            {/* Equipamiento Recomendado */}
            <section id="equipamiento" className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-mono font-bold text-center flex items-center justify-center gap-3">
                <Package className="w-6 h-6 text-primary glow-icon" />
                Equipamiento Recomendado
              </h2>
              <p className="text-center text-muted-foreground text-sm">Lo que necesitás para empezar a crear</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    icon: <Zap className="w-8 h-8 text-primary" />,
                    title: "Kit de Inicio de Electrónica",
                    desc: "Ideal para principiantes. Incluye protoboard, LEDs, resistencias y cables jumper.",
                    link: "https://www.amazon.es/s?k=kit+electronica+principiantes&tag=electrolabpro-21",
                  },
                  {
                    icon: <Cpu className="w-8 h-8 text-primary" />,
                    title: "Multímetro Digital Profesional",
                    desc: "La herramienta esencial para medir voltaje, corriente y continuidad con precisión.",
                    link: "https://www.amazon.es/s?k=multimetro+digital+profesional&tag=electrolabpro-21",
                  },
                  {
                    icon: <Flame className="w-8 h-8 text-primary" />,
                    title: "Estación de Soldadura",
                    desc: "Kit completo con cautín ajustable y accesorios para tus primeros proyectos.",
                    link: "https://www.amazon.es/s?k=kit+soldador+electronica&tag=electrolabpro-21",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group flex flex-col rounded-xl border border-border bg-card/80 backdrop-blur p-5 space-y-4 hover:border-[hsl(200,100%,60%)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(200,100%,60%,0.2)]"
                  >
                    <div className="inline-flex p-3 rounded-lg bg-secondary w-fit">{item.icon}</div>
                    <h3 className="font-mono font-bold text-foreground text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)] mt-auto"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Ver en Amazon
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground/70 mt-4 italic">
                Como Afiliado de Amazon, gano por las compras adscritas que cumplen los requisitos aplicables.
              </p>
            </section>
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
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-mono font-bold text-center mb-2 flex items-center justify-center gap-3">
            <Zap className="w-6 h-6 text-primary glow-icon" />
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
          {/* Tarjeta Kit Recomendado */}
          <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-card/80 backdrop-blur max-w-lg mx-auto space-y-4">
            <h3 className="text-lg font-mono font-bold text-foreground text-center">
              🛠️ Equipamiento Recomendado por J.A.Sanchez
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✔️</span> Incluye Placa Arduino Uno Original.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✔️</span> Más de 200 componentes y sensores.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✔️</span> Manual de proyectos paso a paso.</li>
            </ul>
            <div className="text-center">
              <a
                href="https://amzn.to/3Nj6QlU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
              >
                <ShoppingCart className="w-4 h-4" />
                🚀 Aprendé más con el Kit de Inicio Oficial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Aprende Electrónica */}
      <section className="container mx-auto px-4 py-16 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-center mb-2 flex items-center justify-center gap-3">
          <BookOpen className="w-6 h-6 text-primary glow-icon" />
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

      {/* Herramientas Imprescindibles */}
      <section className="container mx-auto px-4 py-16 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-center mb-2 flex items-center justify-center gap-3">
          <Cpu className="w-6 h-6 text-primary glow-icon" />
          Herramientas Imprescindibles
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">Las herramientas que todo electrónico necesita en su mesa de trabajo</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Multímetro Digital",
              desc: "Mide voltaje, corriente, resistencia y más. Imprescindible para diagnosticar cualquier circuito.",
              link: "https://amzn.to/3Nj6QlU",
              emoji: "📟",
            },
            {
              title: "Cautín / Estación de Soldadura",
              desc: "Soldadura de precisión para tus proyectos. Temperatura regulable y punta intercambiable.",
              link: "https://amzn.to/3Nj6QlU",
              emoji: "🔥",
            },
            {
              title: "Protoboard 830 Puntos",
              desc: "La base para prototipar sin soldar. Conectá componentes rápidamente y probá tus diseños.",
              link: "https://amzn.to/3Nj6QlU",
              emoji: "🔌",
            },
          ].map((tool) => (
            <div
              key={tool.title}
              className="group flex flex-col rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)]"
            >
              <div className="w-full h-40 bg-secondary/50 flex items-center justify-center text-5xl">
                {tool.emoji}
              </div>
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <h3 className="font-mono font-bold text-foreground text-lg">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc}</p>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)] mt-auto"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ver en Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kits Oficiales ElectroLab */}
      <section id="kits-oficiales" className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-center mb-2 flex items-center justify-center gap-3">
          <ShoppingBag className="w-6 h-6 text-primary glow-icon" />
          Kits Oficiales ElectroLab
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">Equipate con lo mejor para aprender electrónica</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Kit de Inicio",
              subtitle: "Protoboard, LEDs, Cables",
              desc: "Todo lo esencial para armar tus primeros circuitos. Incluye protoboard, LEDs de colores, cables dupont y resistencias básicas.",
              link: "https://amzn.to/3Nj6QlU",
              emoji: "🔌",
              badge: "Más vendido",
            },
            {
              title: "Kit de Resistencias y Capacitores",
              subtitle: "Pack completo de componentes pasivos",
              desc: "Más de 500 resistencias y 200 capacitores en valores estándar. Organizados en caja clasificadora para acceso rápido.",
              link: "https://amzn.to/3Nj6QlU",
              emoji: "⚡",
              badge: "Recomendado",
            },
            {
              title: "Multímetro Digital Profesional",
              subtitle: "Medición de precisión",
              desc: "Multímetro autorango con medición de voltaje, corriente, resistencia, capacitancia y temperatura. Pantalla retroiluminada.",
              link: "https://amzn.to/3Nj6QlU",
              emoji: "📟",
              badge: "Recomendado",
            },
          ].map((kit) => (
            <div
              key={kit.title}
              className="relative group flex flex-col rounded-xl border border-border bg-card/80 backdrop-blur overflow-hidden hover:border-[hsl(30,90%,50%)]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(30,90%,50%,0.2)]"
            >
              {/* Badge */}
              <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-[hsl(30,90%,50%)] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                {kit.badge}
              </span>
              <div className="w-full h-40 bg-secondary/50 flex items-center justify-center text-5xl">
                {kit.emoji}
              </div>
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <h3 className="font-mono font-bold text-foreground text-lg">{kit.title}</h3>
                <p className="text-xs text-primary font-semibold uppercase tracking-wide">{kit.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{kit.desc}</p>
                <a
                  href={kit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] text-white font-bold text-sm transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)] mt-auto overflow-hidden hover:scale-105 hover:shadow-[0_0_25px_hsl(30,90%,50%,0.5)] hover:bg-[hsl(30,90%,55%)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <ShoppingCart className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Ver en Amazon</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AdSense: Antes del footer */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner slot="4444444444" format="auto" className="min-h-[90px] md:min-h-[120px]" />
      </div>

      {/* AdSense: Después de tips, antes de kits */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner slot="5555555555" format="auto" className="min-h-[90px] md:min-h-[100px]" />
      </div>

      {/* Pie de página */}
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
