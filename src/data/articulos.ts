/**
 * Catálogo central de artículos del sitio.
 * Se usa para generar "Artículos Relacionados" dinámicos
 * y enlaces internos coherentes en todo el portal.
 *
 * Nombres en español para mantener coherencia con el dominio del proyecto.
 */
export type CategoriaArticulo =
  | "fundamentos"
  | "componentes"
  | "instrumentos"
  | "arduino"
  | "protocolos"
  | "blog";

export interface Articulo {
  /** Identificador único (derivado del slug). */
  id: string;
  /** Slug usado en la URL (ej: "ley-de-ohm"). */
  slug: string;
  /** Ruta completa dentro del sitio (ej: "/articulos/ley-de-ohm"). */
  path: string;
  /** Título legible del artículo. */
  titulo: string;
  /** Resumen corto para tarjetas y meta-descripciones. */
  descripcion: string;
  /** Categoría para priorizar el enlazado interno. */
  categoria: CategoriaArticulo;
}

export const ARTICULOS: Articulo[] = [
  // Fundamentos
  {
    id: "ley-de-ohm",
    slug: "ley-de-ohm",
    path: "/articulos/ley-de-ohm",
    titulo: "Ley de Ohm explicada",
    descripcion: "V = I × R, despejes y ejemplos prácticos para circuitos reales.",
    categoria: "fundamentos",
  },
  {
    id: "circuitos-serie-paralelo",
    slug: "circuitos-serie-paralelo",
    path: "/articulos/circuitos-serie-paralelo",
    titulo: "Circuitos en serie y paralelo",
    descripcion: "Cómo se distribuyen voltaje y corriente en cada topología.",
    categoria: "fundamentos",
  },
  {
    id: "codigo-colores-resistencias",
    slug: "codigo-colores-resistencias",
    path: "/articulos/codigo-colores-resistencias",
    titulo: "Código de colores de resistencias",
    descripcion: "Decodifica resistencias de 4 y 5 bandas según IEC 60062.",
    categoria: "fundamentos",
  },
  // Componentes
  {
    id: "condensadores",
    slug: "condensadores",
    path: "/articulos/condensadores",
    titulo: "Qué es un condensador",
    descripcion: "Tipos, capacitancia, tolerancias y aplicaciones de filtrado.",
    categoria: "componentes",
  },
  {
    id: "diodos",
    slug: "diodos",
    path: "/articulos/diodos",
    titulo: "Guía básica de diodos",
    descripcion: "Polarización, caída de tensión y rectificación de señal.",
    categoria: "componentes",
  },
  {
    id: "transistores",
    slug: "transistores",
    path: "/articulos/transistores",
    titulo: "Guía de transistores",
    descripcion: "BJT y MOSFET: configuraciones, ganancia y zonas de operación.",
    categoria: "componentes",
  },
  {
    id: "reguladores-voltaje",
    slug: "reguladores-voltaje",
    path: "/articulos/reguladores-voltaje",
    titulo: "Reguladores de voltaje",
    descripcion: "Lineales vs. conmutados: eficiencia, ruido y disipación térmica.",
    categoria: "componentes",
  },
  // Instrumentos
  {
    id: "multimetro",
    slug: "multimetro",
    path: "/articulos/multimetro",
    titulo: "Cómo usar un multímetro",
    descripcion: "Mediciones de tensión, corriente, resistencia y continuidad.",
    categoria: "instrumentos",
  },
  {
    id: "osciloscopio",
    slug: "osciloscopio",
    path: "/articulos/osciloscopio",
    titulo: "Cómo usar un osciloscopio",
    descripcion: "Configura sondas, ancho de banda y captura de señales.",
    categoria: "instrumentos",
  },
  {
    id: "soldadura",
    slug: "soldadura",
    path: "/articulos/soldadura",
    titulo: "Técnicas de soldadura",
    descripcion: "Estaño, temperatura y soldadura segura paso a paso.",
    categoria: "instrumentos",
  },
  {
    id: "fuentes-alimentacion",
    slug: "fuentes-alimentacion",
    path: "/articulos/fuentes-alimentacion",
    titulo: "Fuentes de alimentación",
    descripcion: "Lineales, conmutadas y reguladas para tu laboratorio.",
    categoria: "instrumentos",
  },
  {
    id: "leer-datasheet",
    slug: "leer-datasheet",
    path: "/articulos/leer-datasheet",
    titulo: "Cómo leer un datasheet",
    descripcion: "Interpreta parámetros eléctricos, encapsulados y ratings.",
    categoria: "instrumentos",
  },
  // Arduino
  {
    id: "arduino",
    slug: "arduino",
    path: "/articulos/arduino",
    titulo: "Arduino para principiantes",
    descripcion: "Primeros pasos, IDE, sketches y conexiones básicas.",
    categoria: "arduino",
  },
  {
    id: "que-arduino-comprar",
    slug: "que-arduino-comprar",
    path: "/articulos/que-arduino-comprar",
    titulo: "¿Qué Arduino comprar?",
    descripcion: "Compara Uno, Nano, Mega y ESP32 según tu proyecto.",
    categoria: "arduino",
  },
  {
    id: "sensores-arduino",
    slug: "sensores-arduino",
    path: "/articulos/sensores-arduino",
    titulo: "Sensores con Arduino",
    descripcion: "DHT22, ultrasónicos, IMU y más con código de ejemplo.",
    categoria: "arduino",
  },
  {
    id: "pwm-arduino",
    slug: "pwm-arduino",
    path: "/articulos/pwm-arduino",
    titulo: "PWM con Arduino",
    descripcion: "Control de brillo y velocidad usando modulación por ancho de pulso.",
    categoria: "arduino",
  },
  // Protocolos
  {
    id: "protocolo-i2c",
    slug: "protocolo-i2c",
    path: "/articulos/protocolo-i2c",
    titulo: "Protocolo I2C",
    descripcion: "Comunicación maestro-esclavo, direcciones y pull-ups.",
    categoria: "protocolos",
  },
  {
    id: "pantalla-oled-ssd1306",
    slug: "pantalla-oled-ssd1306",
    path: "/articulos/pantalla-oled-ssd1306",
    titulo: "Pantallas OLED SSD1306",
    descripcion: "Conexión I2C, librerías y dibujo de gráficos básicos.",
    categoria: "protocolos",
  },
  // Blog
  {
    id: "mi-primer-laboratorio",
    slug: "mi-primer-laboratorio",
    path: "/blog/mi-primer-laboratorio",
    titulo: "Mi primer laboratorio",
    descripcion: "Equipo esencial y consejos para montar tu mesa de trabajo.",
    categoria: "blog",
  },
  {
    id: "mis-5-proyectos-arduino-favoritos",
    slug: "mis-5-proyectos-arduino-favoritos",
    path: "/blog/mis-5-proyectos-arduino-favoritos",
    titulo: "5 proyectos Arduino favoritos",
    descripcion: "Ideas prácticas para aprender experimentando.",
    categoria: "blog",
  },
  {
    id: "como-disene-mi-primer-pcb-kicad",
    slug: "como-disene-mi-primer-pcb-kicad",
    path: "/blog/como-disene-mi-primer-pcb-kicad",
    titulo: "Mi primer PCB con KiCad",
    descripcion: "Del esquemático al PCB fabricado: flujo completo.",
    categoria: "blog",
  },
];

/**
 * Devuelve N artículos relacionados, priorizando la misma categoría
 * que el artículo actual y excluyéndolo del resultado.
 *
 * Acepta tanto el slug puro ("ley-de-ohm") como la ruta completa
 * ("/articulos/ley-de-ohm") para mantener compatibilidad con
 * `useLocation().pathname` y con `useParams().slug`.
 */
export function obtenerArticulosRelacionados(
  slugActual: string,
  limite = 3,
): Articulo[] {
  const actual = ARTICULOS.find(
    (a) => a.slug === slugActual || a.path === slugActual,
  );
  const otros = ARTICULOS.filter(
    (a) => a.slug !== slugActual && a.path !== slugActual,
  );

  if (!actual) return otros.slice(0, limite);

  const mismaCategoria = otros.filter((a) => a.categoria === actual.categoria);
  const resto = otros.filter((a) => a.categoria !== actual.categoria);
  return [...mismaCategoria, ...resto].slice(0, limite);
}
