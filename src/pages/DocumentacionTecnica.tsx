import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Calculator, Microchip, BookOpen, Zap, ShieldCheck,
  FileText, Wrench, ChevronRight, ExternalLink, Cpu
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import CalculatorHub from "@/components/CalculatorHub";
import ComponentDictionary from "@/components/ComponentDictionary";
import electrolabLogo from "@/assets/electrolab-logo.webp";

const guideLinks = [
  { title: "Ley de Ohm", to: "/articulos/ley-de-ohm", tag: "Fundamentos" },
  { title: "Código de Colores", to: "/articulos/codigo-colores-resistencias", tag: "Componentes" },
  { title: "Condensadores", to: "/articulos/condensadores", tag: "Componentes" },
  { title: "Diodos", to: "/articulos/diodos", tag: "Componentes" },
  { title: "Transistores", to: "/articulos/transistores", tag: "Componentes" },
  { title: "Multímetro", to: "/articulos/multimetro", tag: "Equipamiento" },
  { title: "Osciloscopio", to: "/articulos/osciloscopio", tag: "Equipamiento" },
  { title: "Fuentes de Alimentación", to: "/articulos/fuentes-de-alimentacion", tag: "Energía" },
  { title: "Reguladores de Voltaje", to: "/articulos/reguladores-voltaje", tag: "Energía" },
  { title: "PWM con Arduino", to: "/articulos/pwm-arduino", tag: "Protocolos" },
  { title: "Protocolo I2C", to: "/articulos/protocolo-i2c", tag: "Protocolos" },
  { title: "Cómo Leer un Datasheet", to: "/articulos/leer-datasheet", tag: "Metodología" },
  { title: "Sensores Arduino", to: "/articulos/sensores-arduino", tag: "Proyectos" },
  { title: "Pantalla OLED SSD1306", to: "/articulos/pantalla-oled-ssd1306", tag: "Proyectos" },
  { title: "Soldadura Electrónica", to: "/articulos/soldadura-electronica", tag: "Técnicas" },
  { title: "Serie vs Paralelo", to: "/articulos/circuitos-serie-paralelo", tag: "Fundamentos" },
];

const technicalFaq = [
  {
    q: "¿Qué frecuencia de PWM debo usar para controlar un motor DC?",
    a: "Para motores DC pequeños (5–12 V) se recomiendan frecuencias entre 4 kHz y 20 kHz para evitar el zumbido audible (>20 kHz) y reducir pérdidas por conmutación. Arduino UNO entrega por defecto 490 Hz en pines 3, 9, 10, 11 y 980 Hz en 5 y 6 (Timer0). Si necesitás más frecuencia debés reconfigurar los registros TCCRnB.",
    link: { label: "Guía PWM con Arduino", to: "/articulos/pwm-arduino" },
  },
  {
    q: "¿Qué resistencias pull-up necesita el bus I2C?",
    a: "El estándar I2C (NXP UM10204) recomienda 4.7 kΩ para 100 kHz (Standard-mode) y 2.2 kΩ para 400 kHz (Fast-mode) cuando se trabaja a 5 V. A 3.3 V suelen usarse 10 kΩ. La capacitancia total del bus no debe superar 400 pF; si tenés muchos dispositivos, bajá los pull-ups o usá un buffer (PCA9517).",
    link: { label: "Guía Protocolo I2C", to: "/articulos/protocolo-i2c" },
  },
  {
    q: "¿Por qué el LM7805 se calienta tanto y cómo lo dimensiono?",
    a: "El 7805 es un regulador lineal: la potencia disipada es P = (Vin − 5 V) × Iout. Con 12 V de entrada y 500 mA, disipa 3.5 W, lo que requiere disipador (Rth(j-a) sin disipador ≈ 65 °C/W → >225 °C). Si Vin > 9 V o Iout > 300 mA, usá un buck converter (LM2596, MP1584) con eficiencia >85 %.",
    link: { label: "Guía Reguladores de Voltaje", to: "/articulos/reguladores-voltaje" },
  },
  {
    q: "¿Cuál es la diferencia práctica entre un regulador lineal y uno conmutado?",
    a: "El lineal (78xx, LM317) es simple, sin ruido de conmutación y barato, pero ineficiente (η = Vout/Vin). El conmutado (buck/boost) tiene η de 85–95 % y soporta más corriente, pero introduce ruido de switching (típicamente 100 kHz–2 MHz) que requiere filtrado LC adicional para etapas analógicas o RF.",
    link: { label: "Guía Reguladores de Voltaje", to: "/articulos/reguladores-voltaje" },
  },
  {
    q: "¿Cómo mido voltaje AC de la red eléctrica de forma segura?",
    a: "Nunca midas 220 V con un multímetro de baja categoría. Usá uno con CAT III o CAT IV (IEC 61010-1), puntas con dedales aislados, una sola mano apoyada y rango ya seleccionado en VAC antes de tocar. Para señales > 600 V o trabajos en tableros, exigí EPP (guantes dieléctricos clase 0) y, si no tenés formación certificada, no lo hagas.",
    link: { label: "Guía del Multímetro", to: "/articulos/multimetro" },
  },
  {
    q: "¿Qué precauciones tomo al soldar componentes SMD?",
    a: "Usá una estación con control de temperatura entre 320–350 °C, estaño con flux (SAC305 sin plomo o 60/40 con resina), pulsera antiestática conectada a tierra para componentes sensibles (MOSFET, MCU) y ventilación o filtro de humos: la resina del estaño contiene colofonia, irritante respiratorio reconocido por la OSHA.",
    link: { label: "Guía de Soldadura", to: "/articulos/soldadura-electronica" },
  },
  {
    q: "¿Cómo elijo la corriente correcta para una resistencia limitadora de LED?",
    a: "Consultá el datasheet del LED: la corriente nominal (If) suele ser 20 mA para indicadores estándar y 350 mA o más para LEDs de potencia. Calculá R = (Vfuente − Vf) / If y verificá la potencia P = (Vfuente − Vf) × If; si P > 1/4 W usá una resistencia de mayor wattage o varias en paralelo.",
    link: { label: "Calculadora de LED", to: "/#calculadora" },
  },
];

const DocumentacionTecnica = () => {
  usePageMeta({
    title: "Documentación Técnica de Electrónica | ElectroLab Pro",
    description:
      "Centro de documentación: calculadoras verificadas, fichas de componentes y guías sobre PWM, I2C, reguladores y mediciones seguras.",
  });

  // JSON-LD: FAQPage + CollectionPage
  useEffect(() => {
    const SITE_URL = "https://electrolabpro.com";

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: technicalFaq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };

    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Documentación Técnica de Electrónica",
      url: `${SITE_URL}/documentacion-tecnica`,
      description:
        "Centro consolidado de calculadoras, fichas de componentes y guías técnicas validadas en banco de pruebas.",
      isPartOf: { "@type": "WebSite", name: "ElectroLab Pro", url: SITE_URL },
      author: { "@type": "Person", name: "J.A. Sánchez" },
    };

    // BreadcrumbList lo emite el componente <Breadcrumbs /> con id estable.

    const schemas = [
      { id: "doc-tec-faq", data: faqSchema },
      { id: "doc-tec-collection", data: collectionSchema },
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
      schemas.forEach(({ id }) => document.getElementById(id)?.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={electrolabLogo} alt="ElectroLab Pro" width="36" height="36" loading="eager" decoding="async" className="h-9 w-9 rounded-lg object-cover" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Electrolab<span className="text-primary">PRO</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs />
      </div>

      {/* Breadcrumb visible: ya renderizado por <Breadcrumbs /> arriba */}

      {/* Hero */}
      <section className="container mx-auto px-6 py-10 md:py-14">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <FileText className="w-3.5 h-3.5" />
            CENTRO DE DOCUMENTACIÓN TÉCNICA
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Documentación <span className="text-primary">Técnica</span> de Electrónica
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Hub consolidado con <strong className="text-foreground">Laboratorio de Cálculo</strong>,
            <strong className="text-foreground"> Investigación de Componentes</strong> y
            <strong className="text-foreground"> Protocolos y Guías</strong>. Cada herramienta y artículo
            está respaldado por datasheets de fabricante y normativas internacionales (IEC 60062, IEEE 315, NXP UM10204).
          </p>

          {/* TOC */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            <a href="#nivel-1" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
              <Calculator className="w-3.5 h-3.5" /> Nivel 1 · Cálculo
            </a>
            <a href="#nivel-2" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
              <Microchip className="w-3.5 h-3.5" /> Nivel 2 · Componentes
            </a>
            <a href="#nivel-3" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
              <BookOpen className="w-3.5 h-3.5" /> Nivel 3 · Guías
            </a>
            <a href="#faq-tecnica" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" /> FAQ técnica
            </a>
          </div>
        </div>
      </section>

      {/* Misión técnica / E-E-A-T */}
      <section className="container mx-auto px-6 py-6">
        <div className="max-w-4xl mx-auto p-6 rounded-2xl border border-border bg-card/60 backdrop-blur space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Metodología y credenciales técnicas
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cada calculadora pasa por un <strong className="text-foreground">protocolo de tres etapas</strong>:
            (1) derivación matemática a partir de hojas de datos del fabricante y bibliografía de referencia
            (Sedra/Smith, Horowitz/Hill); (2) implementación con redondeo controlado; (3) verificación en
            <strong className="text-foreground"> banco de pruebas</strong> con multímetro Fluke 117 y
            osciloscopio Hantek DSO5102P contra una muestra de al menos 5 valores reales.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Las guías referencian normativas vigentes: <strong className="text-foreground">IEC 60062</strong> (códigos
            de marcado de componentes), <strong className="text-foreground">IEEE 315</strong> (símbolos esquemáticos),
            <strong className="text-foreground"> IEC 61010-1</strong> (seguridad en instrumentos de medida) y
            <strong className="text-foreground"> NXP UM10204</strong> (especificación I²C). El autor, J.A. Sánchez,
            documenta los procedimientos en abierto para permitir auditoría y corrección de la comunidad.
          </p>
        </div>
      </section>

      {/* Nivel 1 */}
      <section id="nivel-1" className="container mx-auto px-6 py-12 scroll-mt-20 border-t border-border">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">Nivel 1</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground">
            Laboratorio de <span className="text-primary">Cálculo</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Calculadoras interactivas verificadas en banco de pruebas. Cada resultado está acompañado de la
            fórmula utilizada y los supuestos del modelo.
          </p>
        </div>
        <CalculatorHub />
      </section>

      {/* Nivel 2 */}
      <section id="nivel-2" className="container mx-auto px-6 py-12 scroll-mt-20 border-t border-border">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">Nivel 2</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground">
            Investigación de <span className="text-primary">Componentes</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Fichas técnicas resumidas con símbolo IEEE 315, encapsulado, parámetros eléctricos críticos
            (Vce/Ic max, Vf, Pd) y ejemplos de aplicación contrastados.
          </p>
        </div>
        <ComponentDictionary />
      </section>

      {/* Nivel 3 */}
      <section id="nivel-3" className="container mx-auto px-6 py-12 scroll-mt-20 border-t border-border">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">Nivel 3</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground">
            Protocolos y <span className="text-primary">Guías</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Documentación profunda sobre PWM, I²C, reguladores, lectura de datasheet y procedimientos seguros
            de medición. Cada guía cita fuentes y normativas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {guideLinks.map((g) => (
            <Link
              key={g.to}
              to={g.to}
              className="group flex flex-col gap-2 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:-translate-y-0.5 transition-all shadow-sm"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{g.tag}</span>
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                {g.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary mt-auto">
                Leer guía <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Técnica */}
      <section id="faq-tecnica" className="container mx-auto px-6 py-12 scroll-mt-20 border-t border-border">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary">FAQ técnica</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground">
            Preguntas frecuentes sobre <span className="text-primary">PWM, I²C, reguladores y seguridad</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Respuestas con valores numéricos, normativa de referencia y enlace a la guía completa.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {technicalFaq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`tfaq-${i}`}
                className="rounded-xl border border-border bg-card shadow-sm px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm font-semibold text-card-foreground hover:no-underline py-4 text-left">
                  <span className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-9 pb-4 space-y-3">
                  <p>{item.a}</p>
                  <Link
                    to={item.link.to}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    {item.link.label} <ExternalLink className="w-3 h-3" />
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links */}
      <section className="container mx-auto px-6 py-12 border-t border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: "/#calculadora", icon: <Calculator className="w-4 h-4" />, label: "Calculadoras" },
            { to: "/#diccionario", icon: <Microchip className="w-4 h-4" />, label: "Diccionario" },
            { to: "/#guias", icon: <BookOpen className="w-4 h-4" />, label: "Guías en Home" },
            { to: "/glosario", icon: <FileText className="w-4 h-4" />, label: "Glosario" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              {l.icon}
              {l.label}
              <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer mínimo */}
      <footer className="border-t border-border py-8 px-6 bg-card/50">
        <div className="container mx-auto text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ElectroLab Pro · Documentación curada por{" "}
          <span className="font-semibold text-foreground">J.A. Sánchez</span>
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-wider">
            <Link to="/sobre-nosotros" className="hover:text-primary">Sobre Nosotros</Link>
            <Link to="/contacto" className="hover:text-primary">Contacto</Link>
            <Link to="/privacidad" className="hover:text-primary">Privacidad</Link>
            <Link to="/aviso-legal" className="hover:text-primary">Aviso Legal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DocumentacionTecnica;
