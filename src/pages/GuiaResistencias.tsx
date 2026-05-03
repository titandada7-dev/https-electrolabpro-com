import { Link } from "react-router-dom";
import { Zap, ArrowLeft, BookOpen, Calculator, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorBio from "@/components/AuthorBio";
import AdBanner from "@/components/AdBanner";
import resistorImg from "@/assets/resistor-color-code.png";

const SITE_ORIGIN = "https://electrolabpro.com";
const PAGE_URL = `${SITE_ORIGIN}/guia-resistencias`;

/**
 * Página educativa SEO-first: Guía completa de resistencias.
 * - Canonical propio (/guia-resistencias)
 * - +1.200 palabras de contenido original
 * - H1 único + jerarquía H2/H3 clara
 * - JSON-LD Article + BreadcrumbList
 */
const GuiaResistencias = () => {
  usePageMeta({
    title: "Guía completa de resistencias – qué son, cómo funcionan y cómo calcularlas",
    description:
      "Aprendé qué son las resistencias, cómo funcionan y cómo calcular su valor paso a paso con ejemplos simples, código de colores y ley de Ohm.",
    canonical: "/guia-resistencias",
    image: "/og-image.jpg",
  });

  useEffect(() => {
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Guía completa de resistencias – qué son, cómo funcionan y cómo calcularlas",
      description:
        "Aprendé qué son las resistencias, cómo funcionan y cómo calcular su valor paso a paso con ejemplos simples.",
      url: PAGE_URL,
      image: [`${SITE_ORIGIN}/og-image.jpg`],
      author: { "@type": "Person", name: "J.A. Sanchez", url: `${SITE_ORIGIN}/sobre-nosotros` },
      publisher: {
        "@type": "Organization",
        name: "ElectroLab Pro",
        url: SITE_ORIGIN,
        logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/pwa-icon-512.png`, width: 512, height: 512 },
      },
      datePublished: "2026-05-03T10:00:00-03:00",
      dateModified: "2026-05-03T10:00:00-03:00",
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      inLanguage: "es",
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: "Guía de resistencias", item: PAGE_URL },
      ],
    };

    const a = document.createElement("script");
    a.type = "application/ld+json";
    a.id = "guia-resistencias-jsonld";
    a.textContent = JSON.stringify(articleJsonLd);
    document.getElementById("guia-resistencias-jsonld")?.remove();
    document.head.appendChild(a);

    const b = document.createElement("script");
    b.type = "application/ld+json";
    b.id = "guia-resistencias-breadcrumb-jsonld";
    b.textContent = JSON.stringify(breadcrumbJsonLd);
    document.getElementById("guia-resistencias-breadcrumb-jsonld")?.remove();
    document.head.appendChild(b);

    return () => {
      document.getElementById("guia-resistencias-jsonld")?.remove();
      document.getElementById("guia-resistencias-breadcrumb-jsonld")?.remove();
    };
  }, []);

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
            <span className="hidden sm:inline">Volver al inicio</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs lastLabel="Guía de resistencias" />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20" style={{ background: "linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]" style={{ background: "hsl(199 89% 60% / 0.4)" }} />
        <div className="relative container mx-auto px-4 text-center space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Guía educativa
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            Guía completa de resistencias
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Qué son, cómo funcionan, cómo se calculan paso a paso y cómo se usan en electrónica real.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-6">
        <AdBanner slot="3756475501" format="auto" className="min-h-[90px] md:min-h-[100px]" />
      </div>

      <article className="container mx-auto px-4 py-10 max-w-3xl prose-custom space-y-6 text-muted-foreground leading-relaxed text-[15px]">
        {/* Imagen referencia */}
        <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
          <img
            src={resistorImg}
            alt="Resistencias electrónicas con su código de colores y bandas correspondientes"
            className="w-full max-h-72 object-contain p-4"
            loading="lazy"
            width={1024}
            height={683}
          />
          <p className="text-xs text-muted-foreground text-center pb-3 px-4">
            Figura 1: Resistencias axiales con su código de colores estándar IEC.
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es una resistencia?</h2>
        <p>
          Una <strong className="text-foreground">resistencia</strong> es uno de los componentes más simples y, al mismo tiempo, más
          importantes de la electrónica. Su función principal es <strong className="text-foreground">limitar el paso de la corriente</strong> en
          un circuito, transformando parte de la energía eléctrica en calor. Sin resistencias sería prácticamente imposible
          construir circuitos seguros: los LEDs se quemarían, los microcontroladores recibirían corrientes destructivas y
          las señales analógicas nunca tendrían el nivel correcto.
        </p>
        <p>
          Físicamente se ve como un pequeño cilindro con dos terminales metálicos, recubierto de bandas de colores que
          codifican su valor en <strong className="text-foreground">ohmios (Ω)</strong>. También existen versiones de montaje superficial (SMD),
          de alambre bobinado para alta potencia, y resistencias variables como el potenciómetro o el reóstato.
        </p>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Cómo funciona una resistencia?</h2>
        <p>
          Una resistencia funciona oponiéndose al flujo de los electrones. Cuando una corriente eléctrica intenta atravesar
          el componente, los electrones deben "abrirse paso" a través del material resistivo (carbón, película metálica o
          alambre). Ese rozamiento eléctrico genera dos efectos clave:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Una <strong className="text-foreground">caída de tensión</strong> entre sus terminales (V = I × R).</li>
          <li>Una <strong className="text-foreground">disipación de potencia</strong> en forma de calor (P = V × I).</li>
        </ul>
        <p>
          Por eso las resistencias tienen una potencia nominal: 1/4 W, 1/2 W, 1 W, 5 W, etc. Si superás esa potencia, la
          resistencia se calienta, se decolora y eventualmente se quema. Elegir la potencia correcta es tan importante como
          elegir el valor en ohmios.
        </p>

        <h3 className="text-lg font-bold text-foreground mt-6">Unidades y prefijos</h3>
        <p>
          La unidad de resistencia es el <strong className="text-foreground">ohmio (Ω)</strong>, llamado así en honor a Georg Simon Ohm.
          Como los valores varían enormemente, se usan prefijos:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>1 kΩ (kiloohmio) = 1.000 Ω</li>
          <li>1 MΩ (megaohmio) = 1.000.000 Ω</li>
          <li>1 mΩ (miliohmio) = 0,001 Ω</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La Ley de Ohm aplicada a resistencias</h2>
        <p>
          La <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline">Ley de Ohm</Link> es la base para
          trabajar con resistencias. Se expresa con tres fórmulas equivalentes:
        </p>
        <div className="rounded-xl border border-primary/20 bg-card/60 p-5 my-4 text-center font-mono text-foreground space-y-2">
          <p>V = I × R</p>
          <p>I = V / R</p>
          <p>R = V / I</p>
        </div>
        <p>
          Donde V es el voltaje en voltios, I la corriente en amperios y R la resistencia en ohmios. Conociendo dos de
          esas magnitudes, siempre podés calcular la tercera.
        </p>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ejemplos prácticos paso a paso</h2>
        <p>
          La mejor forma de entender una resistencia es viéndola en acción. Estos tres ejemplos resueltos cubren el 90 % de
          las situaciones que te vas a encontrar en cualquier proyecto de electrónica de hobbista o profesional.
        </p>

        <h3 className="text-lg font-bold text-foreground mt-6">Ejemplo 1 · Resistencia para un LED</h3>
        <p>
          Querés encender un LED rojo desde una fuente de 5 V. Datos del datasheet del LED:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Caída de tensión típica (V_LED): <strong className="text-foreground">2 V</strong></li>
          <li>Corriente nominal (I_LED): <strong className="text-foreground">20 mA = 0,02 A</strong></li>
        </ul>
        <p>Aplicamos la Ley de Ohm a la resistencia, que cae los 3 V restantes:</p>
        <div className="rounded-xl border border-primary/20 bg-card/60 p-4 my-3 font-mono text-foreground text-sm">
          <p>R = (V_fuente − V_LED) / I_LED</p>
          <p>R = (5 − 2) / 0,02 = <strong>150 Ω</strong></p>
          <p>P = (V_fuente − V_LED) × I = 3 × 0,02 = 0,06 W → 1/4 W es suficiente</p>
        </div>
        <p>
          Verificalo en segundos con nuestra{" "}
          <Link to="/#calculadora" className="text-primary hover:underline">calculadora de resistencia para LED online</Link>.
        </p>

        <h3 className="text-lg font-bold text-foreground mt-6">Ejemplo 2 · Cálculo básico con la Ley de Ohm</h3>
        <p>
          Tenés una resistencia de <strong className="text-foreground">220 Ω</strong> conectada a una pila de 9 V. ¿Cuánta
          corriente circula y cuánta potencia disipa?
        </p>
        <div className="rounded-xl border border-primary/20 bg-card/60 p-4 my-3 font-mono text-foreground text-sm">
          <p>I = V / R = 9 / 220 ≈ <strong>0,041 A = 41 mA</strong></p>
          <p>P = V × I = 9 × 0,041 ≈ <strong>0,37 W</strong></p>
        </div>
        <p>
          Conclusión: una resistencia de <strong className="text-foreground">1/4 W (0,25 W) se quemaría</strong>. Necesitás
          al menos <strong className="text-foreground">1/2 W</strong>. Probalo en la{" "}
          <Link to="/#calculadora" className="text-primary hover:underline">calculadora de Ley de Ohm</Link>.
        </p>

        <h3 className="text-lg font-bold text-foreground mt-6">Ejemplo 3 · Divisor de tensión</h3>
        <p>
          De 12 V querés obtener 5 V para una entrada analógica. Con R1 = 7 kΩ y R2 = 5 kΩ:
        </p>
        <div className="rounded-xl border border-primary/20 bg-card/60 p-4 my-3 font-mono text-foreground text-sm">
          <p>V_out = V_in × R2 / (R1 + R2)</p>
          <p>V_out = 12 × 5.000 / 12.000 = <strong>5 V</strong></p>
        </div>
        <p>
          Ajustá los valores con la{" "}
          <Link to="/#calculadora" className="text-primary hover:underline">calculadora de divisor de tensión</Link> y comprobá
          que la corriente quede por debajo de 5 mA para no malgastar batería.
        </p>

        <AdBanner slot="3756475501" format="auto" className="min-h-[90px] my-6" />

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Código de colores: cómo leer una resistencia</h2>
        <p>
          Como las resistencias son demasiado pequeñas para imprimir un número legible, la industria adoptó un código de
          colores universal estandarizado por la <strong className="text-foreground">IEC 60062</strong>. Hay dos formatos comunes:
        </p>

        <h3 className="text-lg font-bold text-foreground mt-6">Resistencia de 4 bandas</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Banda 1: primer dígito.</li>
          <li>Banda 2: segundo dígito.</li>
          <li>Banda 3: multiplicador (potencia de 10).</li>
          <li>Banda 4: tolerancia (normalmente dorado ±5% o plateado ±10%).</li>
        </ul>
        <p>
          Ejemplo: <strong className="text-foreground">Rojo - Violeta - Naranja - Dorado</strong> = 27 × 1.000 = 27.000 Ω = 27 kΩ ±5%.
        </p>

        <h3 className="text-lg font-bold text-foreground mt-6">Resistencia de 5 bandas</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Bandas 1, 2 y 3: dígitos significativos.</li>
          <li>Banda 4: multiplicador.</li>
          <li>Banda 5: tolerancia (más fina, típicamente ±1% o ±2%).</li>
        </ul>
        <p>
          Las resistencias de 5 bandas se usan en circuitos de precisión, como instrumentación médica, audio profesional o
          fuentes de referencia.
        </p>
        <div className="rounded-lg border border-border bg-card/40 p-4 text-sm">
          <p className="font-semibold text-foreground mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Tip rápido
          </p>
          <p>
            Si dudás del orden de las bandas, mirá la tolerancia: la banda dorada o plateada siempre va a un extremo y
            marca el final del código. Esa es tu referencia para leer en el sentido correcto.
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tipos de resistencias más usados</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-foreground">De carbón:</strong> baratas, tolerancia ±5%, ideales para hobbistas.</li>
          <li><strong className="text-foreground">De película metálica:</strong> mayor precisión (±1%), bajo ruido, recomendadas en audio.</li>
          <li><strong className="text-foreground">De alambre bobinado:</strong> soportan alta potencia (5 W o más), usadas en fuentes y cargas.</li>
          <li><strong className="text-foreground">SMD:</strong> de montaje superficial, identificadas con códigos numéricos en lugar de colores.</li>
          <li><strong className="text-foreground">Variables:</strong> potenciómetros y trimmers para ajustar volumen, brillo o calibración.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Resistencias en serie y en paralelo</h2>
        <p>
          Combinar resistencias permite obtener valores que no existen comercialmente. Las dos configuraciones básicas son:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-foreground">Serie:</strong> R_total = R1 + R2 + R3 + … (los valores se suman).</li>
          <li><strong className="text-foreground">Paralelo:</strong> 1/R_total = 1/R1 + 1/R2 + 1/R3 + … (la resistencia total es menor que la más pequeña).</li>
        </ul>
        <p>
          Por ejemplo, dos resistencias iguales en paralelo dan exactamente la mitad. Profundizá en este tema en la guía de{" "}
          <Link to="/articulos/circuitos-serie-paralelo" className="text-primary hover:underline">circuitos serie y paralelo</Link>.
        </p>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Aplicaciones reales</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Limitar la corriente de LEDs y diodos.</li>
          <li>Polarizar transistores BJT y MOSFET.</li>
          <li>Crear divisores de tensión para sensores analógicos.</li>
          <li>Definir constantes de tiempo en filtros RC y temporizadores 555.</li>
          <li>Resistencias pull-up y pull-down en entradas digitales.</li>
          <li>Resistencias de descarga en condensadores de fuentes de alta tensión.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores frecuentes al usarlas</h2>
        <ul className="list-disc list-inside space-y-1 flex flex-col">
          <li><ShieldCheck className="inline w-4 h-4 text-primary mr-1" /> No calcular la potencia y elegir 1/4 W cuando hace falta 1 W o más.</li>
          <li><ShieldCheck className="inline w-4 h-4 text-primary mr-1" /> Confundir el orden de las bandas (leer al revés).</li>
          <li><ShieldCheck className="inline w-4 h-4 text-primary mr-1" /> Usar resistencias de tolerancia ±10% en circuitos de precisión.</li>
          <li><ShieldCheck className="inline w-4 h-4 text-primary mr-1" /> Olvidar la resistencia de protección al alimentar un LED.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión</h2>
        <p>
          Las resistencias son la base silenciosa de cualquier circuito. Saber qué hacen, cómo se leen y cómo se calculan
          te abre la puerta a entender prácticamente cualquier diseño electrónico. Empezá midiendo, probando y verificando
          con un multímetro: en muy poco tiempo vas a leer códigos de colores casi sin pensarlo.
        </p>
        <p>
          Cuando tengas dudas sobre qué valor usar en tu próximo proyecto, volvé a esta guía y combinala con nuestras
          calculadoras interactivas para validar el resultado antes de soldar nada.
        </p>

        {/* Aplicalo ahora — enlaces internos a herramientas */}
        <div className="not-prose rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 my-8 space-y-4">
          <div className="text-center space-y-2">
            <Calculator className="w-8 h-8 text-primary mx-auto" />
            <h2 className="text-xl font-bold text-foreground">Aplicalo ahora</h2>
            <p className="text-sm text-muted-foreground">
              Pasá de la teoría a la práctica con nuestras herramientas online gratuitas:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/#calculadora"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              aria-label="Abrir la calculadora visual de código de colores de resistencias"
            >
              <Lightbulb className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Calculadora de resistencias online</p>
                <p className="text-xs text-muted-foreground">Decodificá 4 y 5 bandas en segundos</p>
              </div>
            </Link>
            <Link
              to="/articulos/ley-de-ohm"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              aria-label="Leer la guía completa de la Ley de Ohm"
            >
              <Zap className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Guía de la Ley de Ohm</p>
                <p className="text-xs text-muted-foreground">V = I × R con ejemplos prácticos</p>
              </div>
            </Link>
            <Link
              to="/articulos/codigo-colores-resistencias"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              aria-label="Aprender el código de colores de resistencias paso a paso"
            >
              <BookOpen className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Código de colores explicado</p>
                <p className="text-xs text-muted-foreground">Estándar IEC 60062 paso a paso</p>
              </div>
            </Link>
            <Link
              to="/articulos/multimetro"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              aria-label="Cómo medir resistencias con un multímetro digital"
            >
              <Calculator className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Cómo usar un multímetro</p>
                <p className="text-xs text-muted-foreground">Medí resistencias con seguridad</p>
              </div>
            </Link>
          </div>
          <div className="text-center pt-2">
            <Link
              to="/#calculadora"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <Lightbulb className="w-4 h-4" /> Probar la calculadora ahora
            </Link>
          </div>
        </div>

        <AuthorBio />
      </article>

      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A. Sanchez</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4">
            <Link to="/guia-resistencias" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary transition-colors">Guía de resistencias</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/#calculadora" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary transition-colors">Calculadoras</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/glosario" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary transition-colors">Glosario</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary transition-colors">Contacto</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary transition-colors">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary transition-colors">Sobre Nosotros</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuiaResistencias;
