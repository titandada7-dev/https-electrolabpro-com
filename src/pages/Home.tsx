import { useState } from "react";
import {
  Zap, ChevronDown, BookOpen, Cpu, Calculator, Users, Target,
  ShoppingBag, Menu, X, CircuitBoard, Wrench, TrendingUp,
  MessageSquare, Lightbulb, Battery, Microchip, Cable
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import ResistorCalculator from "@/components/ResistorCalculator";
import ComponentDictionary from "@/components/ComponentDictionary";
import OhmCalculator from "@/components/OhmCalculator";
import LedCalculator from "@/components/LedCalculator";
import MiniProjects from "@/components/MiniProjects";
import { Link } from "react-router-dom";

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
];

// Q&A data organized by category
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
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeQaTab, setActiveQaTab] = useState("microcontroladores");

  usePageMeta({
    title: "ElectroLab Pro - Calculadora de Resistencias, Capacitores y Diodos Online",
    description: "Calculadora de resistencias, capacitores y diodos online. Aprende electrónica desde cero con las herramientas gratuitas de ElectroLab Pro por José Andrés Sánchez.",
  });

  const activeQa = QA_CATEGORIES.find((c) => c.id === activeQaTab);

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════ NAVBAR ═══════════ */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-lg">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-3">
            {/* Logo image placeholder */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Electrolab<span className="text-primary">PRO</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-5 md:flex">
            <button onClick={() => scrollTo("servicios")} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Servicios
            </button>
            <button onClick={() => scrollTo("calculadora")} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Calculadoras
            </button>
            <button onClick={() => scrollTo("guias")} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Guías
            </button>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Artículos <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {articleLinks.map((a) => (
                  <Link key={a.to} to={a.to} className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
            <button onClick={() => scrollTo("foro")} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Preguntas
            </button>
            <Link to="/contacto" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Contacto
            </Link>
            <Button size="sm" onClick={() => scrollTo("calculadora")}>
              Empezar
            </Button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-accent transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-border bg-card px-6 py-4 md:hidden space-y-1 animate-in slide-in-from-top-2">
            {[
              { label: "Servicios", action: () => { scrollTo("servicios"); setMenuOpen(false); } },
              { label: "Calculadoras", action: () => { scrollTo("calculadora"); setMenuOpen(false); } },
              { label: "Guías", action: () => { scrollTo("guias"); setMenuOpen(false); } },
              { label: "Preguntas", action: () => { scrollTo("foro"); setMenuOpen(false); } },
            ].map((item) => (
              <button key={item.label} onClick={item.action} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
                {item.label}
              </button>
            ))}
            <Link to="/contacto" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
              Contacto
            </Link>
            <div className="border-t border-border pt-3 mt-2">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-semibold mb-2 px-3">Artículos</p>
              {articleLinks.map((a) => (
                <Link key={a.to} to={a.to} onClick={() => setMenuOpen(false)} className="block w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-accent py-2.5 px-3 rounded-lg min-h-[40px] transition-colors">
                  {a.label}
                </Link>
              ))}
            </div>
            <Button size="sm" className="w-full mt-3" onClick={() => { scrollTo("calculadora"); setMenuOpen(false); }}>
              Empezar
            </Button>
          </div>
        )}
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center py-20 sm:py-28">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider mb-8">
          <CircuitBoard className="w-3.5 h-3.5" />
          PLATAFORMA DE ELECTRÓNICA
        </div>
        <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
          Precisión electrónica al alcance de tu{" "}
          <span className="text-primary">innovación</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Soluciones técnicas de alto nivel, sin distracciones. Calcula, aprende y diseña con la suite definitiva para ingenieros y entusiastas de la electrónica.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <Button size="lg" className="gap-2" onClick={() => scrollTo("calculadora")}>
            Empezar a Calcular <ChevronDown className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2" onClick={() => scrollTo("guias")}>
            <BookOpen className="h-4 w-4" /> Ver Guías
          </Button>
        </div>
      </section>

      {/* ═══════════ SERVICIOS (CARDS) ═══════════ */}
      <section id="servicios" className="py-16 sm:py-20 border-y border-border bg-card/50">
        <div className="container mx-auto px-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-3">
            Servicios
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12 max-w-2xl mx-auto">
            Todo lo que necesitás para tus proyectos electrónicos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <CircuitBoard className="w-7 h-7 text-primary" />, title: "Diseño de Circuitos", desc: "Esquemas electrónicos optimizados con calculadoras de precisión para resistencias, LEDs, filtros RC y más." },
              { icon: <Wrench className="w-7 h-7 text-primary" />, title: "Reparación Pro", desc: "Guías técnicas detalladas para diagnóstico y reparación de equipos electrónicos con herramientas profesionales." },
              { icon: <TrendingUp className="w-7 h-7 text-primary" />, title: "Optimización", desc: "Mejoramos el rendimiento de tus sistemas con tips, proyectos prácticos y recomendaciones de componentes." },
            ].map((s) => (
              <div key={s.title} className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  {s.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-10 sm:py-14">
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

      {/* ═══════════ CALCULADORA PRINCIPAL ═══════════ */}
      <div id="calculadora" className="container mx-auto px-6 py-12 sm:py-16">
        <ResistorCalculator />
      </div>

      {/* ═══════════ GUÍAS DESTACADAS ═══════════ */}
      <section className="container mx-auto px-6 py-12 space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-3">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Guías Técnicas Destacadas
        </h2>
        <p className="text-center text-muted-foreground text-sm">Artículos esenciales para dominar los fundamentos</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { emoji: "🔢", title: "Ley de Ohm", desc: "Aprende los fundamentos del voltaje y la corriente.", to: "/articulos/ley-de-ohm" },
            { emoji: "🎨", title: "Código de Colores", desc: "Guía definitiva para leer resistencias de 4 y 5 bandas.", to: "/articulos/codigo-colores-resistencias" },
            { emoji: "⚡", title: "Condensadores", desc: "Tipos, funciones y cómo leer el código cerámico.", to: "/articulos/condensadores" },
          ].map((guide) => (
            <Link key={guide.to} to={guide.to} className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-full h-24 sm:h-28 bg-accent flex items-center justify-center text-4xl">{guide.emoji}</div>
              <div className="flex flex-col flex-1 p-4 space-y-2">
                <h3 className="font-semibold text-card-foreground text-base group-hover:text-primary transition-colors">{guide.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{guide.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">Leer guía →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════ MÁS CALCULADORAS ═══════════ */}
      <div className="container mx-auto px-6 space-y-16 py-12">
        <OhmCalculator />
        <LedCalculator />
      </div>

      {/* ═══════════ DICCIONARIO ═══════════ */}
      <div id="diccionario" className="container mx-auto px-6 py-12">
        <ComponentDictionary />
      </div>

      {/* ═══════════ MINI PROYECTOS ═══════════ */}
      <div id="mini-proyectos" className="container mx-auto px-6 py-12">
        <MiniProjects />
      </div>

      {/* ═══════════ TIPS ═══════════ */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            Tips de Electrónica
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">por J.A.Sanchez</p>
          <div className="space-y-3">
            {[
              { emoji: "💡", title: "El sentido del LED", text: "Recordá que los LED tienen polaridad. La pata larga es el Ánodo (+) y la corta el Cátodo (-). Si lo ponés al revés, no prenderá." },
              { emoji: "🔗", title: "Resistencias en serie", text: "Si sumás dos resistencias una tras otra, su valor total aumenta (Rt = R1 + R2). Ideal para cuando no tenés el valor exacto que necesitás." },
              { emoji: "⚠️", title: "Cuidado con el Protoboard", text: "Las líneas laterales (roja y azul) suelen estar conectadas a lo largo para la alimentación, pero las del medio están conectadas de forma vertical. ¡No hagas cortocircuito!" },
              { emoji: "🔥", title: "Soldadura brillante", text: "Una buena soldadura debe quedar brillante y con forma de volcán. Si queda opaca o como una bola, es una 'soldadura fría' y fallará pronto." },
              { emoji: "📏", title: "El truco del multímetro", text: "Siempre empezá midiendo en la escala más alta de tu tester para no quemar el fusible si no conocés el voltaje que vas a medir." },
            ].map((tip, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 group">
                <span className="text-2xl shrink-0 mt-0.5">{tip.emoji}</span>
                <div>
                  <h3 className="font-semibold text-card-foreground text-sm mb-1 group-hover:text-primary transition-colors">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FORO / Q&A CON TABS ═══════════ */}
      <section id="foro" className="container mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Preguntas Frecuentes
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">Respuestas rápidas organizadas por categoría</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-start sm:justify-center sm:flex-wrap scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
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

        {/* Q&A items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {activeQa?.items.map((item, i) => (
            <details key={i} className="group rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <summary className="flex items-center gap-3 cursor-pointer p-5 text-sm font-semibold text-card-foreground hover:text-primary transition-colors list-none">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </span>
                <span className="flex-1">{item.q}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 pl-14 text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ═══════════ GUÍAS COMPLETAS ═══════════ */}
      <section id="guias" className="container mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Guías de Electrónica
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">Artículos esenciales para dominar los fundamentos</p>
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
          ].map((guide) => (
            <Link key={guide.to} to={guide.to} className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-full h-28 bg-accent flex items-center justify-center text-4xl">{guide.emoji}</div>
              <div className="flex flex-col flex-1 p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{guide.tag}</span>
                <h3 className="font-semibold text-card-foreground text-base group-hover:text-primary transition-colors">{guide.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{guide.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 transition-all">Leer guía →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════ HERRAMIENTAS RECOMENDADAS ═══════════ */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Herramientas Recomendadas
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">El equipamiento esencial para armar tu laboratorio</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { emoji: "📟", title: "Multímetro Digital Profesional", desc: "Ideal para medir voltaje, corriente y resistencia con alta precisión.", mlLink: "#", amzLink: "#" },
            { emoji: "🔧", title: "Estación de Soldado", desc: "Temperatura regulable para trabajos con componentes SMD y PCB.", mlLink: "#", amzLink: "#" },
            { emoji: "🤖", title: "Kit de Inicio Arduino", desc: "Todo lo que necesitas para empezar a programar microcontroladores.", mlLink: "#", amzLink: "#" },
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
      <section id="equipamiento" className="container mx-auto px-6 py-12 border-t border-border">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-muted-foreground">
          <ShoppingBag className="w-4 h-4" />
          Equipa tu laboratorio
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
          {[
            { emoji: "🔧", title: "Kit de Resistencias", link: "https://www.amazon.es/s?k=kit+1000+resistencias+surtido&tag=electrolabpro-21" },
            { emoji: "📟", title: "Multímetro Digital", link: "https://www.amazon.es/s?k=multimetro+digital+economico&tag=electrolabpro-21" },
            { emoji: "🧪", title: "Breadboard + Cables", link: "https://www.amazon.es/s?k=breadboard+cables+jumper+kit&tag=electrolabpro-21" },
          ].map((item) => (
            <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer nofollow" className="flex-1 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 group">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">{item.title}</span>
              <span className="ml-auto text-xs text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </a>
          ))}
        </div>
        <p className="text-center text-[10px] text-muted-foreground/50 mt-4 italic">
          Como Afiliado de Amazon, gano por las compras adscritas que cumplen los requisitos aplicables.
        </p>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border py-8 px-6 bg-card/50">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-xs sm:text-sm mb-4">
            © {new Date().getFullYear()} ElectroLab Pro
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
          </div>
          <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic mb-4">
            "Como Afiliado de Amazon, percibo dinero por las compras elegibles. Los ingresos generados ayudan a mantener esta plataforma gratuita para estudiantes de electrónica."
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
    </div>
  );
};

export default Home;
