/**
 * Catálogo central de artículos del sitio.
 * Se usa para generar "Artículos Relacionados" dinámicos
 * y enlaces internos coherentes en todo el portal.
 */
export interface ArticleEntry {
  path: string;
  title: string;
  description: string;
  category: "fundamentos" | "componentes" | "instrumentos" | "arduino" | "protocolos" | "blog";
}

export const ALL_ARTICLES: ArticleEntry[] = [
  // Fundamentos
  {
    path: "/articulos/ley-de-ohm",
    title: "Ley de Ohm explicada",
    description: "V = I × R, despejes y ejemplos prácticos para circuitos reales.",
    category: "fundamentos",
  },
  {
    path: "/articulos/circuitos-serie-paralelo",
    title: "Circuitos en serie y paralelo",
    description: "Cómo se distribuyen voltaje y corriente en cada topología.",
    category: "fundamentos",
  },
  {
    path: "/articulos/codigo-colores-resistencias",
    title: "Código de colores de resistencias",
    description: "Decodifica resistencias de 4 y 5 bandas según IEC 60062.",
    category: "fundamentos",
  },
  // Componentes
  {
    path: "/articulos/condensadores",
    title: "Qué es un condensador",
    description: "Tipos, capacitancia, tolerancias y aplicaciones de filtrado.",
    category: "componentes",
  },
  {
    path: "/articulos/diodos",
    title: "Guía básica de diodos",
    description: "Polarización, caída de tensión y rectificación de señal.",
    category: "componentes",
  },
  {
    path: "/articulos/transistores",
    title: "Guía de transistores",
    description: "BJT y MOSFET: configuraciones, ganancia y zonas de operación.",
    category: "componentes",
  },
  {
    path: "/articulos/reguladores-voltaje",
    title: "Reguladores de voltaje",
    description: "Lineales vs. conmutados: eficiencia, ruido y disipación térmica.",
    category: "componentes",
  },
  // Instrumentos
  {
    path: "/articulos/multimetro",
    title: "Cómo usar un multímetro",
    description: "Mediciones de tensión, corriente, resistencia y continuidad.",
    category: "instrumentos",
  },
  {
    path: "/articulos/osciloscopio",
    title: "Cómo usar un osciloscopio",
    description: "Configura sondas, ancho de banda y captura de señales.",
    category: "instrumentos",
  },
  {
    path: "/articulos/soldadura",
    title: "Técnicas de soldadura",
    description: "Estaño, temperatura y soldadura segura paso a paso.",
    category: "instrumentos",
  },
  {
    path: "/articulos/fuentes-alimentacion",
    title: "Fuentes de alimentación",
    description: "Lineales, conmutadas y reguladas para tu laboratorio.",
    category: "instrumentos",
  },
  {
    path: "/articulos/leer-datasheet",
    title: "Cómo leer un datasheet",
    description: "Interpreta parámetros eléctricos, encapsulados y ratings.",
    category: "instrumentos",
  },
  // Arduino
  {
    path: "/articulos/arduino",
    title: "Arduino para principiantes",
    description: "Primeros pasos, IDE, sketches y conexiones básicas.",
    category: "arduino",
  },
  {
    path: "/articulos/que-arduino-comprar",
    title: "¿Qué Arduino comprar?",
    description: "Compara Uno, Nano, Mega y ESP32 según tu proyecto.",
    category: "arduino",
  },
  {
    path: "/articulos/sensores-arduino",
    title: "Sensores con Arduino",
    description: "DHT22, ultrasónicos, IMU y más con código de ejemplo.",
    category: "arduino",
  },
  {
    path: "/articulos/pwm-arduino",
    title: "PWM con Arduino",
    description: "Control de brillo y velocidad usando modulación por ancho de pulso.",
    category: "arduino",
  },
  // Protocolos
  {
    path: "/articulos/protocolo-i2c",
    title: "Protocolo I2C",
    description: "Comunicación maestro-esclavo, direcciones y pull-ups.",
    category: "protocolos",
  },
  {
    path: "/articulos/pantalla-oled-ssd1306",
    title: "Pantallas OLED SSD1306",
    description: "Conexión I2C, librerías y dibujo de gráficos básicos.",
    category: "protocolos",
  },
  // Blog
  {
    path: "/blog/mi-primer-laboratorio",
    title: "Mi primer laboratorio",
    description: "Equipo esencial y consejos para montar tu mesa de trabajo.",
    category: "blog",
  },
  {
    path: "/blog/mis-5-proyectos-arduino-favoritos",
    title: "5 proyectos Arduino favoritos",
    description: "Ideas prácticas para aprender experimentando.",
    category: "blog",
  },
  {
    path: "/blog/como-disene-mi-primer-pcb-kicad",
    title: "Mi primer PCB con KiCad",
    description: "Del esquemático al PCB fabricado: flujo completo.",
    category: "blog",
  },
];

/**
 * Devuelve N artículos relacionados, priorizando la misma categoría
 * y excluyendo el artículo actual.
 */
export function getRelatedArticles(currentPath: string, limit = 3): ArticleEntry[] {
  const current = ALL_ARTICLES.find((a) => a.path === currentPath);
  const others = ALL_ARTICLES.filter((a) => a.path !== currentPath);

  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
