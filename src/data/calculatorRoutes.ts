/**
 * Metadatos SEO por calculadora — usados para <title>, meta description,
 * OpenGraph, Twitter Card, canonical y JSON-LD SoftwareApplication.
 * Cada `slug` es la URL propia de la calculadora bajo el dominio.
 */

export interface CalculatorSeoMeta {
  /** Clave interna del TOOL_SEO en toolSeoContent.tsx */
  toolKey:
    | "resistor"
    | "ohm"
    | "led"
    | "divider"
    | "rc"
    | "timer"
    | "smd"
    | "reactance"
    | "units";
  /** Path público (sin dominio) */
  slug: string;
  /** Etiqueta breve para breadcrumbs y navegación interna */
  shortLabel: string;
  /** <title> — máx. ~60 caracteres */
  title: string;
  /** <meta description> — máx. ~160 caracteres */
  description: string;
  /** Descripción corta para OpenGraph/Twitter */
  ogDescription: string;
  /** Palabra clave principal (usada en JSON-LD `keywords`) */
  keyword: string;
}

export const SITE_URL = "https://electrolabpro.com";

export const CALCULATOR_ROUTES: CalculatorSeoMeta[] = [
  {
    toolKey: "ohm",
    slug: "/ley-de-ohm",
    shortLabel: "Ley de Ohm",
    title: "Calculadora Ley de Ohm — V = I × R online | ElectroLab Pro",
    description:
      "Calculadora online de la Ley de Ohm (V = I × R). Ingresa dos valores y obtén el tercero al instante. Con ejemplos, potencia disipada y FAQ técnica en español.",
    ogDescription:
      "Resuelve V, I o R al instante con ejemplos, potencia y guía técnica gratuita.",
    keyword: "calculadora ley de ohm",
  },
  {
    toolKey: "led",
    slug: "/calculadora-led",
    shortLabel: "Resistencia LED",
    title: "Calculadora de Resistencia para LED — R = (V-VLED)/I | ElectroLab",
    description:
      "Calculá la resistencia limitadora ideal para tu LED en segundos. Voltajes típicos por color, potencia recomendada y ejemplos a 5 V, 9 V, 12 V y 24 V.",
    ogDescription:
      "Dimensioná resistencias limitadoras para LEDs a 5 V, 9 V, 12 V o 24 V con ejemplos y FAQ.",
    keyword: "calculadora resistencia led",
  },
  {
    toolKey: "resistor",
    slug: "/calculadora-resistencias",
    shortLabel: "Código de colores",
    title: "Calculadora de Resistencias — Código de Colores 4 y 5 Bandas",
    description:
      "Decodificá resistencias axiales por código de colores IEC 60062. Soporta 4 y 5 bandas, muestra el valor exacto, tolerancia y rango real. Con ejemplos prácticos.",
    ogDescription:
      "Decodificá el valor de una resistencia por sus colores. Estándar IEC 60062, 4 y 5 bandas.",
    keyword: "calculadora resistencias colores",
  },
  {
    toolKey: "divider",
    slug: "/divisor-de-voltaje",
    shortLabel: "Divisor de voltaje",
    title: "Calculadora de Divisor de Voltaje — Vout = Vin·R2/(R1+R2)",
    description:
      "Calculadora de divisor de tensión online. Obtené Vout a partir de Vin, R1 y R2. Con ejemplos para adaptar 12 V→5 V, 5 V→3,3 V y referencias ADC.",
    ogDescription:
      "Dimensioná divisores de tensión para leer baterías, sensores y referencias ADC.",
    keyword: "divisor de voltaje calculadora",
  },
  {
    toolKey: "rc",
    slug: "/filtro-rc",
    shortLabel: "Filtro RC",
    title: "Calculadora de Filtro RC — Frecuencia de Corte fc | ElectroLab",
    description:
      "Calculá la frecuencia de corte de un filtro RC pasa-bajos o pasa-altos: fc = 1/(2πRC). Ejemplos para audio, suavizado PWM y desacople de microcontroladores.",
    ogDescription:
      "Diseñá filtros RC para audio, suavizado PWM y filtrado de ruido de fuentes.",
    keyword: "calculadora filtro rc",
  },
  {
    toolKey: "timer",
    slug: "/temporizador-555",
    shortLabel: "Temporizador 555",
    title: "Calculadora 555 Astable — Frecuencia y Duty Cycle | ElectroLab",
    description:
      "Calculá frecuencia y duty cycle del integrado 555 en modo astable. Fórmulas exactas, ejemplos de parpadeo, tonos audibles y PWM para motores.",
    ogDescription:
      "Diseñá osciladores 555 en modo astable con R1, R2 y C, con ejemplos de audio y PWM.",
    keyword: "calculadora 555 astable",
  },
  {
    toolKey: "smd",
    slug: "/decodificador-smd",
    shortLabel: "Decodificador SMD",
    title: "Decodificador de Resistencias SMD — 3 y 4 Dígitos | ElectroLab",
    description:
      "Decodificador online de resistencias SMD: 3 dígitos (±5 %), 4 dígitos (±1 %) y notación con R para valores menores a 10 Ω. Con ejemplos de encapsulados 0603/0805.",
    ogDescription:
      "Decodificá códigos SMD de 3 y 4 dígitos y valores con R (shunts) al instante.",
    keyword: "decodificador smd resistencias",
  },
  {
    toolKey: "reactance",
    slug: "/reactancia-capacitiva",
    shortLabel: "Reactancia Xc",
    title: "Calculadora de Reactancia Capacitiva Xc = 1/(2πfC) | ElectroLab",
    description:
      "Calculá la reactancia capacitiva Xc de un condensador a cualquier frecuencia. Aplicaciones en acoplos de audio, desacople de microcontroladores y filtrado.",
    ogDescription:
      "Reactancia Xc de condensadores para audio, desacople y filtros AC. Con ejemplos.",
    keyword: "calculadora reactancia capacitiva",
  },
  {
    toolKey: "units",
    slug: "/conversor-unidades",
    shortLabel: "Conversor de unidades",
    title: "Conversor de Unidades Electrónicas — Ω, F, A, Hz | ElectroLab",
    description:
      "Convertí resistencia, capacitancia, corriente y frecuencia entre kΩ, MΩ, µF, nF, pF, mA, µA y más. Evita errores de decimales aplicando prefijos SI.",
    ogDescription:
      "Convertí kΩ, µF, nF, mA, µA y otras unidades SI sin errores de coma.",
    keyword: "conversor unidades electronica",
  },
];

export function findCalculatorMeta(toolKey: string): CalculatorSeoMeta | undefined {
  return CALCULATOR_ROUTES.find((r) => r.toolKey === toolKey);
}
