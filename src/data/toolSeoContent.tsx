import { Link } from "react-router-dom";
import { BookOpen, Lightbulb, ArrowRight } from "lucide-react";

export interface ToolSeoBlock {
  title: string;
  intro: string;
  paragraphs: { h: string; p: string }[];
  examples: { titulo: string; pasos: string }[];
  related: { to: string; label: string }[];
}

const guideLink = (
  <p className="not-prose flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
    <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
    <span>
      <strong className="text-foreground">¿No sabés qué valor usar?</strong>{" "}
      Mirá nuestra{" "}
      <Link
        to="/guia-resistencias"
        className="text-primary font-semibold hover:underline"
      >
        guía completa de resistencias
      </Link>
      .
    </span>
  </p>
);

export const TOOL_SEO: Record<string, ToolSeoBlock> = {
  resistor: {
    title: "Cómo usar la calculadora de resistencias por código de colores",
    intro:
      "Esta calculadora online decodifica de forma visual el valor de cualquier resistencia axial de 4 o 5 bandas. Es la herramienta ideal cuando recuperás un componente de una placa antigua, cuando comprás resistencias sin etiqueta, o cuando estás aprendiendo electrónica y querés practicar la lectura del código IEC 60062 sin errores.",
    paragraphs: [
      {
        h: "¿Para qué sirve?",
        p: "Te permite identificar en segundos el valor en ohmios (Ω), el multiplicador y la tolerancia de una resistencia mirando únicamente sus colores. Esto es fundamental para reemplazar componentes quemados, validar inventario, o seleccionar la resistencia correcta antes de soldar. Funciona tanto para resistencias de 4 bandas (las más comunes en hobby) como de 5 bandas (mayor precisión).",
      },
      {
        h: "Cómo se lee paso a paso",
        p: "Orientá la resistencia con la banda de tolerancia (dorada o plateada) a la derecha. Las dos primeras bandas son los dígitos significativos. La tercera (o tercera y cuarta en el formato de 5 bandas) es el multiplicador. La última banda indica la tolerancia. Por ejemplo: marrón–negro–rojo–dorado equivale a 1, 0, ×100 ±5 % = 1.000 Ω = 1 kΩ.",
      },
      {
        h: "Buenas prácticas",
        p: "Si la resistencia está sucia o quemada, medila también con un multímetro en modo Ω para confirmar. Recordá que la tolerancia importa: en circuitos de audio o sensores conviene usar ±1 % (banda marrón).",
      },
    ],
    examples: [
      {
        titulo: "Ejemplo 1 · LED de 5 V",
        pasos:
          "Resistencia 220 Ω = Rojo·Rojo·Marrón·Dorado. Calculamos: 2,2 → ×10 → 220 Ω, ideal para limitar 13 mA en un LED rojo a 5 V.",
      },
      {
        titulo: "Ejemplo 2 · Pull-up I²C",
        pasos:
          "Resistencia 4,7 kΩ = Amarillo·Violeta·Rojo·Dorado. Es el valor estándar para líneas SDA/SCL en buses I²C alimentados a 3,3 V.",
      },
      {
        titulo: "Ejemplo 3 · Divisor de tensión",
        pasos:
          "Resistencia 10 kΩ = Marrón·Negro·Naranja·Dorado. Usada habitualmente con otra de 10 kΩ para reducir 5 V a 2,5 V.",
      },
    ],
    related: [
      { to: "/articulos/codigo-colores-resistencias", label: "Código de colores explicado paso a paso" },
      { to: "/articulos/ley-de-ohm", label: "Ley de Ohm — V = I × R" },
      { to: "/articulos/circuitos-serie-paralelo", label: "Resistencias en serie y paralelo" },
    ],
  },
  ohm: {
    title: "Cómo usar la calculadora de la Ley de Ohm",
    intro:
      "La Ley de Ohm (V = I × R) es la ecuación fundamental de la electrónica. Esta calculadora te permite obtener cualquiera de las tres variables — voltaje, corriente o resistencia — conociendo las otras dos. La usan estudiantes, técnicos y aficionados para dimensionar fuentes, calcular caídas de tensión y proteger componentes sensibles.",
    paragraphs: [
      {
        h: "¿Para qué sirve?",
        p: "Resuelve cálculos cotidianos: cuánta corriente consume un circuito a 12 V con 100 Ω de carga, qué resistencia hace falta para lograr 5 mA a 9 V, o qué voltaje aparece sobre una resistencia cuando circula determinada corriente. También te ayuda a estimar la potencia disipada con P = V × I, fundamental para no quemar componentes.",
      },
      {
        h: "Ejemplos prácticos rápidos",
        p: "Si tenés una fuente de 9 V y una resistencia de 470 Ω, la corriente será I = 9 / 470 ≈ 19 mA. Si querés limitar la corriente de un sensor a 10 mA con 5 V, necesitás R = 5 / 0,010 = 500 Ω (valor comercial: 470 Ω o 560 Ω).",
      },
      {
        h: "Errores comunes",
        p: "Recordá usar amperios (A) y no milamperios (mA) en la fórmula, salvo que trabajes con kΩ y mA juntos. Verificá siempre la potencia: una resistencia de 1/4 W solo soporta hasta 0,25 W de disipación.",
      },
    ],
    examples: [
      { titulo: "Ejemplo 1", pasos: "V = 12 V, R = 220 Ω → I = 12/220 ≈ 54,5 mA. Potencia: P = V × I ≈ 0,65 W (usar resistencia de 1 W)." },
      { titulo: "Ejemplo 2", pasos: "I = 0,02 A, R = 330 Ω → V = 0,02 × 330 = 6,6 V (típico en una rama de LED)." },
      { titulo: "Ejemplo 3", pasos: "V = 3,3 V, I = 0,001 A → R = 3.300 Ω = 3,3 kΩ (entrada típica de un GPIO digital)." },
    ],
    related: [
      { to: "/articulos/ley-de-ohm", label: "Guía completa de la Ley de Ohm" },
      { to: "/articulos/circuitos-serie-paralelo", label: "Circuitos en serie y paralelo" },
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
    ],
  },
  led: {
    title: "Calculadora de resistencia para LED — guía de uso",
    intro:
      "Conectar un LED a una fuente de tensión sin la resistencia adecuada lo destruye en segundos. Esta calculadora te dice exactamente qué resistencia poner en serie con tu LED para que opere a la corriente recomendada por el fabricante. Funciona con cualquier voltaje de fuente y cualquier color de LED.",
    paragraphs: [
      {
        h: "¿Para qué sirve?",
        p: "Aplica la fórmula R = (Vfuente − VLED) / ILED para devolver el valor exacto en ohmios y la potencia mínima recomendada. Es indispensable para proyectos con Arduino, ESP32, tiras LED individuales, indicadores de panel y cualquier montaje con diodos emisores.",
      },
      {
        h: "Voltajes típicos por color",
        p: "LED rojo y amarillo: ≈ 2 V. LED verde: ≈ 2,2 V. LED azul, blanco o UV: ≈ 3,2 V. La corriente típica para LEDs estándar de 5 mm es 10–20 mA. Consultá siempre el datasheet si trabajás con LEDs de alta potencia.",
      },
      {
        h: "Ejemplo paso a paso",
        p: "LED azul (VLED = 3,2 V, ILED = 20 mA) conectado a 5 V: R = (5 − 3,2) / 0,02 = 90 Ω. Valor comercial cercano: 100 Ω. Potencia disipada: P = (5 − 3,2) × 0,02 = 0,036 W → cualquier resistencia 1/4 W es suficiente.",
      },
    ],
    examples: [
      { titulo: "5 V → LED rojo", pasos: "R = (5 − 2) / 0,02 = 150 Ω. Comercial: 150 Ω o 220 Ω." },
      { titulo: "9 V → LED verde", pasos: "R = (9 − 2,2) / 0,015 = 453 Ω. Comercial: 470 Ω." },
      { titulo: "12 V → LED blanco", pasos: "R = (12 − 3,2) / 0,02 = 440 Ω. Comercial: 470 Ω, 1/4 W es suficiente." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/diodos", label: "Cómo funcionan los diodos y LEDs" },
      { to: "/articulos/ley-de-ohm", label: "Ley de Ohm aplicada" },
    ],
  },
  divider: {
    title: "Cómo usar la calculadora de divisor de voltaje",
    intro:
      "Un divisor de tensión usa dos resistencias en serie para reducir un voltaje a un valor menor. Es el truco más usado para acondicionar señales antes de un ADC, leer baterías con un microcontrolador, o generar tensiones de referencia. Esta calculadora te entrega el voltaje de salida (Vout) según los valores de R1, R2 y Vin.",
    paragraphs: [
      {
        h: "¿Para qué sirve?",
        p: "Para adaptar señales: por ejemplo, leer una batería de 12 V con un Arduino (que solo acepta 5 V) o acondicionar la salida de un sensor de 10 V para un ESP32 de 3,3 V. La fórmula es Vout = Vin × R2 / (R1 + R2).",
      },
      {
        h: "Limitaciones importantes",
        p: "Un divisor solo funciona bien para señales de baja corriente. No sirve para alimentar cargas: si conectás un motor o un LED al Vout, el voltaje se desploma. Usá resistencias del orden de kΩ para minimizar el consumo, pero no tan altas que generen ruido.",
      },
      {
        h: "Ejemplo paso a paso",
        p: "Querés convertir 12 V → 3,3 V para un ESP32. Elegimos R1 = 8,7 kΩ y R2 = 3,3 kΩ. Vout = 12 × 3,3 / (8,7 + 3,3) = 12 × 0,275 = 3,3 V. Listo.",
      },
    ],
    examples: [
      { titulo: "5 V → 2,5 V", pasos: "R1 = 10 kΩ, R2 = 10 kΩ → Vout = 2,5 V." },
      { titulo: "12 V → 5 V", pasos: "R1 = 14 kΩ, R2 = 10 kΩ → Vout = 5 V." },
      { titulo: "3,3 V → 1,65 V", pasos: "R1 = R2 = 4,7 kΩ → Vout = 1,65 V (referencia ADC)." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/ley-de-ohm", label: "Ley de Ohm aplicada a divisores" },
      { to: "/articulos/circuitos-serie-paralelo", label: "Resistencias en serie y paralelo" },
    ],
  },
  rc: {
    title: "Cómo usar la calculadora de filtro RC",
    intro:
      "Un filtro RC combina una resistencia y un condensador para dejar pasar o bloquear señales según su frecuencia. Esta calculadora calcula la frecuencia de corte (fc) que separa las señales 'rápidas' de las 'lentas'. Es esencial en audio, fuentes de alimentación y acondicionamiento de señales analógicas.",
    paragraphs: [
      {
        h: "¿Para qué sirve?",
        p: "Para diseñar filtros pasa-bajos (eliminan ruido de alta frecuencia, suavizan PWM), pasa-altos (bloquean DC, pasan agudos), o acoplos entre etapas de audio. La fórmula es fc = 1 / (2π · R · C).",
      },
      {
        h: "Cómo elegir valores",
        p: "Si querés filtrar ruido por encima de 1 kHz, podés usar R = 1,6 kΩ y C = 100 nF → fc ≈ 1 kHz. Para suavizar una salida PWM de Arduino (490 Hz), un filtro de 159 Hz es suficiente: R = 10 kΩ y C = 100 nF.",
      },
      {
        h: "Pendiente",
        p: "Un filtro RC simple tiene una pendiente de −20 dB por década. Para mayor selectividad necesitás filtros de orden superior (RLC o activos con op-amps).",
      },
    ],
    examples: [
      { titulo: "Pasa-bajos audio", pasos: "R = 1,6 kΩ, C = 10 nF → fc ≈ 10 kHz (corta agudos sobre 10 kHz)." },
      { titulo: "Suavizar PWM", pasos: "R = 10 kΩ, C = 1 µF → fc ≈ 16 Hz (DC casi puro)." },
      { titulo: "Acoplo audio", pasos: "Pasa-altos: C = 1 µF, R = 47 kΩ → fc ≈ 3,4 Hz (deja pasar todo el audio)." },
    ],
    related: [
      { to: "/articulos/condensadores", label: "Guía completa de condensadores" },
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/ley-de-ohm", label: "Fundamentos: Ley de Ohm" },
    ],
  },
  timer: {
    title: "Cómo usar la calculadora del 555 en modo astable",
    intro:
      "El integrado 555 es uno de los chips más usados de la historia para generar señales de reloj, parpadeos, PWM y temporizadores. En modo astable produce una onda cuadrada continua. Esta calculadora te dice qué frecuencia y duty cycle obtenés según R1, R2 y C.",
    paragraphs: [
      {
        h: "¿Para qué sirve?",
        p: "Generar señales periódicas sin usar un microcontrolador: parpadear LEDs, producir tonos para un buzzer, controlar la velocidad de un motor con PWM o crear bases de tiempo para circuitos digitales. La fórmula es f = 1,44 / ((R1 + 2·R2) · C).",
      },
      {
        h: "Modos del 555",
        p: "Astable = oscila continuamente (lo que calcula esta herramienta). Monoestable = genera un pulso único de duración fija al recibir un disparo. Para duty cycle del 50 % se necesita un diodo entre R1 y el pin de descarga.",
      },
      {
        h: "Ejemplo",
        p: "R1 = 10 kΩ, R2 = 10 kΩ, C = 1 µF → f = 1,44 / ((10.000 + 20.000) × 0,000001) = 48 Hz. Duty cycle ≈ 66 %.",
      },
    ],
    examples: [
      { titulo: "Parpadeo lento", pasos: "R1 = 10 kΩ, R2 = 100 kΩ, C = 10 µF → f ≈ 0,68 Hz (un parpadeo cada 1,5 s)." },
      { titulo: "Tono audible", pasos: "R1 = 1 kΩ, R2 = 10 kΩ, C = 100 nF → f ≈ 686 Hz (tono medio)." },
      { titulo: "PWM motor", pasos: "R1 = 1 kΩ, R2 = 1 kΩ, C = 100 nF → f ≈ 4,8 kHz." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/condensadores", label: "Cómo funcionan los condensadores" },
      { to: "/articulos/pwm-arduino", label: "PWM con Arduino" },
    ],
  },
  smd: {
    title: "Cómo decodificar resistencias SMD",
    intro:
      "Las resistencias SMD (montaje superficial) reemplazan al código de colores por un código numérico impreso encima del componente. Esta calculadora interpreta los formatos de 3 y 4 dígitos, así como los códigos con la letra R que indica el punto decimal.",
    paragraphs: [
      {
        h: "Formato de 3 dígitos",
        p: "Las dos primeras cifras son los dígitos significativos y la tercera es el exponente. Ejemplo: 472 = 47 × 10² = 4.700 Ω = 4,7 kΩ. 103 = 10 × 10³ = 10 kΩ.",
      },
      {
        h: "Formato de 4 dígitos",
        p: "Las tres primeras son dígitos y la cuarta el exponente (mayor precisión, típico de tolerancias 1 %). Ejemplo: 4701 = 470 × 10¹ = 4,7 kΩ. 1002 = 100 × 10² = 10 kΩ.",
      },
      {
        h: "Notación con R",
        p: "La letra R indica la posición del punto decimal en valores menores a 10 Ω. Ejemplo: 4R7 = 4,7 Ω. R47 = 0,47 Ω. Útil en sensores de corriente y resistencias shunt.",
      },
    ],
    examples: [
      { titulo: "220", pasos: "22 × 10⁰ = 22 Ω." },
      { titulo: "475", pasos: "47 × 10⁵ = 4,7 MΩ." },
      { titulo: "2R2", pasos: "= 2,2 Ω (resistencia de muy bajo valor para shunt)." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias (incluye SMD)" },
      { to: "/articulos/leer-datasheet", label: "Cómo leer un datasheet" },
      { to: "/articulos/codigo-colores-resistencias", label: "Resistencias axiales: código de colores" },
    ],
  },
  reactance: {
    title: "Cómo usar la calculadora de reactancia capacitiva (Xc)",
    intro:
      "La reactancia capacitiva (Xc) es la oposición que presenta un condensador al paso de la corriente alterna. A diferencia de una resistencia, depende de la frecuencia: a más frecuencia, menos oposición. Esta calculadora aplica Xc = 1 / (2π · f · C).",
    paragraphs: [
      {
        h: "¿Para qué sirve?",
        p: "Diseñar acoplos entre etapas de audio (sin perder señal), filtros de ruido en fuentes de alimentación, capacitores de desacople en microcontroladores y filtros pasa-altos pasivos.",
      },
      {
        h: "Comportamiento",
        p: "En DC (f = 0) la reactancia tiende a infinito → un capacitor se comporta como circuito abierto. A muy alta frecuencia (MHz) la reactancia es casi cero → el capacitor parece un cortocircuito. Por eso se usan para 'desviar' ruido a tierra.",
      },
      {
        h: "Ejemplo",
        p: "Capacitor de 1 µF a 1 kHz: Xc = 1 / (2π × 1.000 × 0,000001) ≈ 159 Ω. Si la frecuencia sube a 10 kHz, Xc baja a 16 Ω.",
      },
    ],
    examples: [
      { titulo: "Acoplo audio", pasos: "C = 10 µF, f = 100 Hz → Xc ≈ 159 Ω (deja pasar audio sin perder graves)." },
      { titulo: "Desacople MCU", pasos: "C = 100 nF, f = 1 MHz → Xc ≈ 1,6 Ω (cortocircuito a ruido HF)." },
      { titulo: "Filtro red 50 Hz", pasos: "C = 1 µF, f = 50 Hz → Xc ≈ 3,18 kΩ." },
    ],
    related: [
      { to: "/articulos/condensadores", label: "Guía completa de condensadores" },
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/fuentes-de-alimentacion", label: "Fuentes de alimentación y filtrado" },
    ],
  },
  units: {
    title: "Cómo usar el conversor de unidades electrónicas",
    intro:
      "Los datasheets y esquemáticos mezclan unidades constantemente: ohmios, kilohmios, microfaradios, nanofaradios, miliamperios… Este conversor te permite pasar de una unidad a otra sin equivocarte con los ceros, evitando errores que pueden destruir componentes.",
    paragraphs: [
      {
        h: "Resistencia",
        p: "1 kΩ = 1.000 Ω. 1 MΩ = 1.000.000 Ω = 1.000 kΩ. 1 mΩ = 0,001 Ω (resistencias de muy bajo valor, shunts).",
      },
      {
        h: "Capacitancia",
        p: "1 µF = 1.000 nF = 1.000.000 pF. 1 mF = 1.000 µF (capacitores grandes, fuentes). Convertí siempre antes de aplicar fórmulas RC.",
      },
      {
        h: "Corriente",
        p: "1 A = 1.000 mA = 1.000.000 µA. Recordá: en la Ley de Ohm V = I × R, la corriente debe estar en amperios para coincidir con ohmios y voltios.",
      },
    ],
    examples: [
      { titulo: "0,1 µF en pF", pasos: "0,1 µF × 1.000.000 = 100.000 pF (valor común en cerámicos)." },
      { titulo: "4,7 kΩ en Ω", pasos: "4,7 × 1.000 = 4.700 Ω." },
      { titulo: "20 mA en A", pasos: "20 / 1.000 = 0,02 A (corriente típica de un LED)." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/condensadores", label: "Guía de condensadores" },
      { to: "/articulos/leer-datasheet", label: "Cómo leer un datasheet" },
    ],
  },
};

export const ToolSeoSection = ({ toolKey }: { toolKey: string }) => {
  const c = TOOL_SEO[toolKey];
  if (!c) return null;
  return (
    <section className="mt-8 rounded-2xl border border-border bg-card/40 p-5 sm:p-7 space-y-5">
      <header className="space-y-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          ▸ Guía de la herramienta
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
          {c.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {c.intro}
        </p>
      </header>

      {guideLink}

      <div className="space-y-4">
        {c.paragraphs.map((s) => (
          <div key={s.h} className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">{s.h}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.p}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          Ejemplos prácticos
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {c.examples.map((ex) => (
            <li
              key={ex.titulo}
              className="rounded-lg border border-border bg-background/40 p-3 text-xs"
            >
              <p className="font-bold text-foreground mb-1">{ex.titulo}</p>
              <p className="text-muted-foreground leading-snug">{ex.pasos}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 pt-2 border-t border-border">
        <h3 className="text-base font-semibold text-foreground">
          Contenido educativo relacionado
        </h3>
        <ul className="space-y-1.5 text-sm">
          {c.related.map((r) => (
            <li key={r.to}>
              <Link
                to={r.to}
                className="text-primary hover:underline inline-flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToolSeoSection;
