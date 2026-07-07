import { Link } from "react-router-dom";
import { BookOpen, Lightbulb, ArrowRight, Cpu, Wrench, HelpCircle, Sigma } from "lucide-react";

export interface ToolSeoSectionBlock {
  h: string;
  paragraphs: string[];
}

export interface ToolSeoBlock {
  title: string;
  intro: string;
  fundamentos: ToolSeoSectionBlock;
  mecanica: ToolSeoSectionBlock;
  ejemplos: { titulo: string; pasos: string }[];
  faqs: { q: string; a: string }[];
  related: { to: string; label: string }[];
}

const guideLink = (
  <p className="not-prose flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
    <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
    <span>
      <strong className="text-foreground">¿No sabés qué valor usar?</strong>{" "}
      Mirá nuestra{" "}
      <Link to="/guia-resistencias" className="text-primary font-semibold hover:underline">
        guía completa de resistencias
      </Link>
      , la{" "}
      <Link to="/articulos/ley-de-ohm" className="text-primary font-semibold hover:underline">
        Ley de Ohm explicada
      </Link>{" "}
      y el{" "}
      <Link to="/articulos/codigo-colores-resistencias" className="text-primary font-semibold hover:underline">
        código de colores paso a paso
      </Link>.
    </span>
  </p>
);

export const TOOL_SEO: Record<string, ToolSeoBlock> = {
  resistor: {
    title: "Calculadora de resistencias por código de colores — guía completa",
    intro:
      "Esta calculadora online decodifica de forma visual el valor de cualquier resistencia axial de 4, 5 o 6 bandas siguiendo el estándar internacional IEC 60062. Es la herramienta ideal cuando recuperás un componente de una placa antigua, cuando comprás resistencias sin etiqueta, cuando validás inventario en un taller, o cuando estás aprendiendo electrónica y querés practicar la lectura sin errores. Devuelve el valor nominal en ohmios, kilohmios o megohmios, la tolerancia real del componente y el rango mínimo–máximo dentro del cual el fabricante garantiza que la resistencia se mantendrá aún con variaciones de temperatura y envejecimiento.",
    fundamentos: {
      h: "Fundamentos teóricos: qué es una resistencia y por qué se codifica",
      paragraphs: [
        "Una resistencia axial es un componente pasivo de dos terminales cuya función es oponerse al paso de la corriente eléctrica siguiendo la Ley de Ohm (V = I × R). Se fabrica depositando una película metálica, de carbón o de óxido metálico sobre un núcleo cerámico cilíndrico; sobre esa película se serigrafían las bandas de color que codifican el valor. La razón histórica del código es simple: cuando el componente es tan pequeño que no cabe la impresión numérica, o cuando puede montarse en cualquier orientación, los colores permiten leerlo desde cualquier ángulo.",
        "El estándar IEC 60062 define el significado de cada color: negro = 0, marrón = 1, rojo = 2, naranja = 3, amarillo = 4, verde = 5, azul = 6, violeta = 7, gris = 8 y blanco = 9. Las bandas dedicadas al multiplicador siguen la misma tabla, más dorado (×0,1) y plateado (×0,01). La banda de tolerancia usa marrón (±1 %), rojo (±2 %), dorado (±5 %), plateado (±10 %) o ausencia de banda (±20 %). En resistencias de precisión con seis bandas, la sexta indica el coeficiente térmico en ppm/°C.",
        "Entender la tolerancia es clave: una resistencia de 1 kΩ ±5 % puede medir entre 950 Ω y 1 050 Ω y aun así estar dentro de especificación. Por eso los circuitos críticos —realimentación de reguladores, filtros de audio de alta fidelidad, medición con ADC de 12 bits o más— exigen resistencias ±1 % o mejores, mientras que en usos generales (limitación de LEDs, pull-ups, timers 555) el ±5 % es más que suficiente.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: cómo interpretar cada banda paso a paso",
      paragraphs: [
        "Paso 1 — Orientación. Colocá la resistencia con la banda de tolerancia (habitualmente dorada o plateada, más gruesa y separada del grupo) a la derecha. Si tenés dudas, buscá el extremo donde el espaciado entre bandas es mayor: ese lado es siempre el de la tolerancia. Si el componente tiene bandas simétricas de un solo color en ambos extremos, medí con el multímetro antes de asumir.",
        "Paso 2 — Dígitos significativos. Las dos primeras bandas (4 bandas) o las tres primeras (5 y 6 bandas) forman el número base. Por ejemplo, amarillo–violeta–rojo–dorado son los dígitos 4, 7 y multiplicador ×100, con tolerancia ±5 %, es decir 47 × 100 = 4 700 Ω = 4,7 kΩ. En una de 5 bandas azul–gris–negro–rojo–marrón se lee 6, 8, 0 y multiplicador ×100, dando 68 000 Ω = 68 kΩ ±1 %.",
        "Paso 3 — Multiplicador. Actúa como potencia de diez sobre los dígitos significativos. Los colores oscuros (negro, marrón, rojo) son multiplicadores bajos (×1, ×10, ×100); los claros (verde, azul, violeta) son altos (×100 k, ×1 M, ×10 M). Dorado y plateado dividen por 10 y por 100, y aparecen en resistencias de bajo valor típicas de shunts.",
        "Paso 4 — Tolerancia y verificación. Después de calcular el valor teórico, la buena práctica es medir con un multímetro en modo Ω para confirmar que el componente está dentro del rango. Una resistencia quemada o degradada suele leer un valor mucho mayor al nominal o abrir circuito (∞). Si el valor real está fuera de tolerancia, descartala.",
      ],
    },
    ejemplos: [
      { titulo: "220 Ω para LED", pasos: "Rojo·Rojo·Marrón·Dorado → 2, 2, ×10, ±5 % = 220 Ω. Rango real: 209–231 Ω. Ideal para limitar 13 mA en un LED rojo a 5 V." },
      { titulo: "4,7 kΩ pull-up I²C", pasos: "Amarillo·Violeta·Rojo·Dorado → 4, 7, ×100 = 4 700 Ω. Valor estándar para líneas SDA/SCL a 3,3 V." },
      { titulo: "10 kΩ divisor", pasos: "Marrón·Negro·Naranja·Dorado → 1, 0, ×1 000 = 10 kΩ. Con otra 10 kΩ reduce 5 V a 2,5 V exactos." },
      { titulo: "1 MΩ alta impedancia", pasos: "Marrón·Negro·Verde·Dorado → 1, 0, ×100 k = 1 000 000 Ω. Típica en osciloscopios y pull-ups de reset." },
      { titulo: "0,22 Ω shunt", pasos: "Rojo·Rojo·Plateado·Dorado → 2, 2, ×0,01 = 0,22 Ω. Se usa para medir corriente por caída de tensión." },
    ],
    faqs: [
      { q: "¿Cómo distingo una resistencia de 4 bandas de una de 5?", a: "Contá las bandas coloreadas sin incluir la del extremo si es dorada o plateada. Si ves cuatro bandas separadas más una tolerancia, es de 4 bandas; si ves cinco bandas juntas más una tolerancia, es de precisión (5 bandas). La distancia entre bandas también da la pista: en las de 5 bandas están más juntas." },
      { q: "¿Qué pasa si mi resistencia no tiene banda de tolerancia?", a: "Se asume tolerancia ±20 %, típica de resistencias muy antiguas o de bajo costo. En diseños modernos casi no se ven; si te encontrás una, medila para confirmar el valor antes de usarla en circuitos sensibles." },
      { q: "¿Puedo usar el código de colores en resistencias SMD?", a: "No. Las resistencias de montaje superficial usan un código numérico impreso. Para decodificarlas usá nuestro decodificador SMD que interpreta los formatos de 3 y 4 dígitos y la notación con R." },
      { q: "¿Por qué mi multímetro mide un valor distinto al que dice el código?", a: "Puede deberse a la tolerancia (una resistencia de 1 kΩ ±5 % puede medir entre 950 y 1 050 Ω), a la resistencia interna de las puntas del multímetro (sumá 0,2–0,5 Ω), o a que el componente esté conectado en paralelo con otro en la placa. Extraela del circuito antes de medir." },
    ],
    related: [
      { to: "/articulos/codigo-colores-resistencias", label: "Código de colores explicado paso a paso" },
      { to: "/articulos/ley-de-ohm", label: "Ley de Ohm — V = I × R" },
      { to: "/articulos/circuitos-serie-paralelo", label: "Resistencias en serie y paralelo" },
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
    ],
  },

  ohm: {
    title: "Calculadora de la Ley de Ohm — V = I × R explicada",
    intro:
      "La Ley de Ohm (V = I × R) es la ecuación fundamental de la electrónica, formulada por Georg Simon Ohm en 1827. Esta calculadora te permite obtener cualquiera de las tres variables —voltaje, corriente o resistencia— conociendo las otras dos, además de la potencia disipada mediante P = V × I. La usan estudiantes universitarios y de escuelas técnicas, técnicos en reparación, ingenieros de diseño y aficionados para dimensionar fuentes, calcular caídas de tensión, proteger componentes sensibles y verificar consumos antes de energizar un montaje.",
    fundamentos: {
      h: "Fundamentos teóricos: qué dice realmente la Ley de Ohm",
      paragraphs: [
        "La Ley de Ohm establece que, en un conductor óhmico y a temperatura constante, la corriente eléctrica (I) que lo atraviesa es directamente proporcional a la diferencia de potencial (V) aplicada, e inversamente proporcional a su resistencia (R). Matemáticamente: V = I × R, con V en voltios, I en amperios y R en ohmios. De ella derivan las expresiones I = V / R y R = V / I, que son las que la calculadora aplica según cuáles sean los datos conocidos.",
        "El concepto de resistencia surge de la fricción interna del material al paso de los electrones: los metales presentan resistencia baja y son buenos conductores, los aislantes presentan resistencia altísima, y los semiconductores están en un rango intermedio dependiente de la temperatura y del dopaje. Aunque la ley se enunció para conductores óhmicos (resistencias puras), en electrónica se usa como aproximación excelente en la mayoría de las situaciones: para diodos y transistores es solo el punto de partida y hay que corregir con las curvas del datasheet.",
        "Complemento imprescindible es la ley de potencia de Joule: P = V × I. Combinada con Ohm, se derivan P = I² × R y P = V² / R. La potencia se disipa en forma de calor, por lo que dimensionar mal una resistencia por potencia es el error más común y también el más costoso: la resistencia se pone incandescente, se despega la película y termina en circuito abierto o cortocircuito.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: cuándo y cómo aplicar la fórmula",
      paragraphs: [
        "Uso típico 1 — Calcular la resistencia limitadora de un LED. Dado un LED con caída de tensión VLED = 2 V a IF = 20 mA alimentado por Vfuente = 5 V, la resistencia en serie es R = (Vfuente − VLED) / IF = (5 − 2) / 0,020 = 150 Ω. Este es el caso más frecuente en Arduino, ESP32 y montajes escolares.",
        "Uso típico 2 — Verificar el consumo de una carga. Si sabés que una tira LED de 12 V tiene una resistencia equivalente de 24 Ω, la corriente que va a exigir es I = 12 / 24 = 0,5 A = 500 mA. Con eso ya podés elegir una fuente adecuada (mínimo 1 A por seguridad) y el calibre correcto del cable.",
        "Uso típico 3 — Diseñar un divisor de tensión. En un divisor Vout = Vin × R2 / (R1 + R2). Si Vin = 12 V y buscás Vout = 3,3 V, podés elegir R2 = 3,3 kΩ y despejar R1 = R2 × (Vin − Vout) / Vout = 3 300 × 8,7 / 3,3 = 8 700 Ω, valor comercial 8,2 kΩ o 10 kΩ.",
        "Errores comunes. El primero es mezclar unidades: si trabajás con mA y Ω, el voltaje sale directamente en mV; para obtener voltios, usá A. El segundo es olvidar la potencia: una resistencia de 100 Ω a 12 V disipa P = 144 / 100 = 1,44 W, muy por encima de una 1/4 W estándar. El tercero es aplicar Ohm a un diodo o LED como si fuera resistencia pura: no lo es.",
      ],
    },
    ejemplos: [
      { titulo: "Ejemplo 1 · corriente", pasos: "V = 12 V, R = 220 Ω → I = 12 / 220 ≈ 54,5 mA. Potencia P = V × I ≈ 0,65 W → usar resistencia 1 W." },
      { titulo: "Ejemplo 2 · voltaje", pasos: "I = 20 mA, R = 330 Ω → V = 0,020 × 330 = 6,6 V (caída típica en una rama de LED)." },
      { titulo: "Ejemplo 3 · resistencia", pasos: "V = 3,3 V, I = 1 mA → R = 3,3 / 0,001 = 3 300 Ω = 3,3 kΩ (típica entrada GPIO)." },
      { titulo: "Ejemplo 4 · potencia", pasos: "V = 5 V, I = 100 mA → P = 5 × 0,1 = 0,5 W. Usar resistencia 1/2 W como mínimo." },
      { titulo: "Ejemplo 5 · comprobación", pasos: "Fuente 9 V con 470 Ω medís 19 mA. Verificación: 9 / 470 ≈ 0,0191 A ✅." },
    ],
    faqs: [
      { q: "¿La Ley de Ohm vale para corriente alterna?", a: "Vale para la parte resistiva del circuito. Cuando hay condensadores o inductores, el equivalente en AC es la ley V = I × Z, donde Z es la impedancia (número complejo que combina resistencia y reactancia). En baja frecuencia y circuitos puramente resistivos, V = I × R sigue siendo exacta." },
      { q: "¿Por qué mi cálculo da un valor de resistencia que no existe comercialmente?", a: "Las resistencias se fabrican según la serie E12 o E24 (12 o 24 valores por década). Si el cálculo da 453 Ω, elegí el valor comercial más cercano por encima —470 Ω— para asegurar que no se supere la corriente máxima del componente sensible." },
      { q: "¿Cómo elijo la potencia de la resistencia?", a: "Calculá P = V × I sobre la resistencia y elegí una con al menos el doble de disipación nominal. Es decir, si P calculada es 0,3 W, usá una de 1/2 W (0,5 W) o mayor. Este margen evita fallas por autocalentamiento y prolonga la vida útil." },
      { q: "¿La Ley de Ohm aplica a los LEDs?", a: "No directamente: los LEDs son diodos con una curva V–I no lineal. Se usa Ohm para calcular la resistencia limitadora en serie, no para modelar el LED en sí. Los valores VF e IF los da el datasheet del fabricante." },
    ],
    related: [
      { to: "/articulos/ley-de-ohm", label: "Guía completa de la Ley de Ohm con ejemplos resueltos" },
      { to: "/articulos/circuitos-serie-paralelo", label: "Circuitos en serie y paralelo" },
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/leer-datasheet", label: "Cómo leer un datasheet" },
    ],
  },

  led: {
    title: "Calculadora de resistencia para LED — dimensionado seguro",
    intro:
      "Conectar un LED directamente a una fuente de tensión sin resistencia limitadora lo destruye en segundos: la corriente crece sin control, la unión PN se calienta y la difusión de dopantes acaba con la luminiscencia. Esta calculadora aplica R = (Vfuente − VLED) / ILED y te devuelve la resistencia exacta, la potencia disipada y una recomendación de tolerancia y wattage. Funciona con cualquier voltaje de fuente (3,3 V, 5 V, 9 V, 12 V, 24 V) y con LEDs individuales de 3 y 5 mm, LEDs de alta potencia, indicadores de panel, y tiras LED analógicas antes del driver.",
    fundamentos: {
      h: "Fundamentos teóricos: por qué el LED necesita una resistencia",
      paragraphs: [
        "Un LED (Light-Emitting Diode) es un diodo semiconductor que emite fotones cuando circula corriente directa a través de la unión PN. A diferencia de una resistencia, su relación V–I no es lineal: existe una tensión de umbral (VF, forward voltage) por debajo de la cual apenas conduce, y una vez superada esa tensión, un pequeño incremento de V produce un aumento enorme de I. Por eso conectar un LED directamente a una fuente sin resistencia en serie es equivalente a un cortocircuito controlado por temperatura.",
        "El valor VF depende del color y del material semiconductor: LEDs rojos y amarillos AlGaAs tienen VF ≈ 1,8–2,2 V, verdes GaP ≈ 2,0–2,4 V, y azules, blancos o UV basados en InGaN ≈ 3,0–3,4 V. La corriente de trabajo típica IF para un LED estándar de 5 mm es 10–20 mA; para LEDs de alta potencia (1 W, 3 W) es 350–700 mA y suelen requerir disipador térmico. Todos estos datos están en el datasheet del fabricante y son la base del cálculo.",
        "La resistencia en serie actúa como limitador de corriente: absorbe la diferencia entre la tensión de la fuente y la caída del LED, imponiendo por Ohm una corriente estable. Además, actúa como fusible térmico: si la fuente varía o el LED envejece, la resistencia amortigua el cambio. Sin ella, cualquier fluctuación de 0,1 V puede duplicar la corriente y quemar el componente.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: paso a paso con datos reales",
      paragraphs: [
        "Paso 1 — Reunir los tres datos. Necesitás Vfuente (tensión de alimentación), VLED (caída directa, del datasheet o de la tabla por color) e ILED (corriente deseada, típicamente 15–20 mA en un LED indicador, o menor si querés menos brillo y más vida útil).",
        "Paso 2 — Aplicar la fórmula. R = (Vfuente − VLED) / ILED. Por ejemplo, LED azul (VLED = 3,2 V, ILED = 20 mA) a 5 V: R = (5 − 3,2) / 0,020 = 90 Ω. Como 90 Ω no existe en la serie E24, se elige el valor comercial inmediatamente superior, 100 Ω, que garantiza que la corriente sea ligeramente menor a 20 mA (más seguro).",
        "Paso 3 — Calcular la potencia disipada por la resistencia. P = (Vfuente − VLED) × ILED. Siguiendo el ejemplo: P = 1,8 × 0,02 = 0,036 W. Con una resistencia de 1/4 W (0,25 W) sobra ampliamente. Si tenés Vfuente = 24 V para el mismo LED azul, la potencia sube a P = 20,8 × 0,02 = 0,42 W, y necesitás una resistencia de 1/2 W como mínimo.",
        "Paso 4 — Considerar la tolerancia y el envejecimiento. Los LEDs pierden entre un 5 % y un 20 % de su luminosidad tras 20 000–50 000 horas. Trabajar al 70 % de la corriente máxima (por ejemplo 14 mA en un LED especificado para 20 mA) alarga notablemente la vida útil sin pérdida de brillo perceptible.",
      ],
    },
    ejemplos: [
      { titulo: "5 V → LED rojo", pasos: "VLED = 2 V, IF = 20 mA. R = (5 − 2) / 0,020 = 150 Ω. Comercial: 150 Ω o 220 Ω. Potencia: 0,06 W → 1/4 W." },
      { titulo: "9 V → LED verde", pasos: "VLED = 2,2 V, IF = 15 mA. R = 6,8 / 0,015 ≈ 453 Ω → 470 Ω. Potencia: 0,10 W → 1/4 W." },
      { titulo: "12 V → LED blanco", pasos: "VLED = 3,2 V, IF = 20 mA. R = 8,8 / 0,020 = 440 Ω → 470 Ω. Potencia: 0,18 W → 1/4 W." },
      { titulo: "3,3 V ESP32 → LED rojo", pasos: "R = 1,3 / 0,010 = 130 Ω → 150 Ω. Corriente ≈ 8,7 mA, adecuada para GPIO." },
      { titulo: "24 V industrial", pasos: "LED indicador VF = 2 V, IF = 10 mA. R = 22 / 0,010 = 2 200 Ω. Potencia: 0,22 W → 1/2 W." },
    ],
    faqs: [
      { q: "¿Puedo poner varios LEDs en serie con una sola resistencia?", a: "Sí, siempre que la suma de VF de los LEDs sea menor a Vfuente y todos sean del mismo modelo. Por ejemplo, tres LEDs rojos en serie a 12 V: R = (12 − 6) / 0,020 = 300 Ω. Para LEDs de distinto color, mejor una rama por color." },
      { q: "¿Y en paralelo?", a: "Se desaconseja. Aunque parezcan iguales, dos LEDs tienen VF ligeramente distinto, y el que tenga VF menor absorberá casi toda la corriente y se quemará. Si necesitás LEDs en paralelo, poné una resistencia por rama." },
      { q: "¿Por qué mi LED se atenúa después de horas encendido?", a: "Es el envejecimiento normal (droop). Se acelera con corrientes altas y temperatura. Bajar la corriente al 60–70 % del máximo del datasheet extiende la vida útil hasta cinco veces." },
      { q: "¿Puedo usar PWM en lugar de resistencia?", a: "El PWM controla el brillo pero no reemplaza la resistencia limitadora: durante el pulso ON la corriente sigue circulando y necesitás limitarla. La resistencia es siempre obligatoria." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/diodos", label: "Diodos: teoría y aplicaciones" },
      { to: "/articulos/ley-de-ohm", label: "Ley de Ohm aplicada" },
      { to: "/articulos/pwm-arduino", label: "Control PWM de LEDs con Arduino" },
    ],
  },

  divider: {
    title: "Calculadora de divisor de voltaje — Vout = Vin × R2 / (R1 + R2)",
    intro:
      "Un divisor de tensión es la configuración más simple y usada en electrónica analógica: dos resistencias en serie que reducen un voltaje a un valor menor proporcional. Esta calculadora aplica la fórmula Vout = Vin × R2 / (R1 + R2) y te entrega el voltaje de salida ideal según R1, R2 y Vin. Se usa para adaptar niveles lógicos, leer baterías con un microcontrolador, generar tensiones de referencia para ADCs, polarizar bases de transistores y acondicionar sensores analógicos antes de un convertidor.",
    fundamentos: {
      h: "Fundamentos teóricos: cómo funciona un divisor resistivo",
      paragraphs: [
        "Cuando dos resistencias se conectan en serie entre un voltaje Vin y masa, la corriente que circula por ambas es la misma (ley de Kirchhoff de corrientes). Por la Ley de Ohm, la caída de tensión en cada una es proporcional a su resistencia: VR1 = I × R1 y VR2 = I × R2. Como I = Vin / (R1 + R2), sustituyendo se obtiene VR2 = Vin × R2 / (R1 + R2), que es exactamente el Vout medido entre el punto medio y masa.",
        "La fórmula es exacta solo si la carga conectada al Vout tiene resistencia mucho mayor que R2 (idealmente infinita). Cuando conectás un motor, un LED, o incluso un pin de entrada con baja impedancia, esa carga se comporta como una resistencia en paralelo con R2, disminuyendo la resistencia equivalente y por tanto Vout. Un buen divisor mantiene la impedancia de carga al menos 10 veces mayor que R2 para que el error sea menor al 10 %.",
        "El compromiso principal es entre consumo y precisión. Usar R1 y R2 pequeñas (100 Ω, 1 kΩ) da baja impedancia de salida pero consume mucha corriente (mA). Usar valores altos (100 kΩ, 1 MΩ) ahorra energía pero introduce ruido y sensibilidad a la impedancia de entrada del ADC o del amplificador. Un compromiso típico es trabajar en el rango 1–47 kΩ.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: dimensionado paso a paso",
      paragraphs: [
        "Paso 1 — Definir Vin y Vout deseado. Ejemplo: querés leer una batería de 12 V con un Arduino, cuyo ADC acepta hasta 5 V. Vout máximo = 5 V, Vin máximo = 12 V. La relación es 5/12 = 0,417, es decir R2 / (R1 + R2) = 0,417.",
        "Paso 2 — Elegir el rango de resistencias. Para el ADC de un Arduino (impedancia de entrada ≈ 100 MΩ) se recomienda un divisor de impedancia total 10–47 kΩ. Elegimos R1 + R2 = 24 kΩ. Entonces R2 = 0,417 × 24 000 ≈ 10 kΩ y R1 = 14 kΩ (valor comercial 15 kΩ, recalculando Vout = 12 × 10/25 = 4,8 V, aceptable).",
        "Paso 3 — Verificar el consumo. La corriente que circula permanentemente por el divisor es I = Vin / (R1 + R2) = 12 / 25 000 = 0,48 mA. En 24 horas consume 11,5 mAh, algo relevante si es alimentado por batería.",
        "Paso 4 — Filtrado (opcional pero recomendado). Colocá un condensador de 100 nF en paralelo con R2 para filtrar ruido de alta frecuencia. Combinado con el divisor forma un filtro RC pasa-bajos que estabiliza la lectura del ADC.",
      ],
    },
    ejemplos: [
      { titulo: "5 V → 2,5 V", pasos: "R1 = R2 = 10 kΩ. Vout = 5 × 10/20 = 2,5 V. Consumo: 0,25 mA." },
      { titulo: "12 V → 5 V", pasos: "R1 = 14 kΩ, R2 = 10 kΩ. Vout = 12 × 10/24 = 5,0 V. Consumo: 0,5 mA." },
      { titulo: "3,3 V → 1,65 V", pasos: "R1 = R2 = 4,7 kΩ. Vout = 1,65 V. Ideal como referencia ADC." },
      { titulo: "9 V → 3,3 V (ESP32)", pasos: "R1 = 17 kΩ, R2 = 10 kΩ → Vout = 9 × 10/27 ≈ 3,33 V." },
      { titulo: "Sensor 24 V → 5 V", pasos: "R1 = 38 kΩ (39 kΩ comercial), R2 = 10 kΩ → Vout = 24 × 10/49 ≈ 4,9 V." },
    ],
    faqs: [
      { q: "¿Puedo alimentar un Arduino con un divisor de voltaje?", a: "No. Un divisor solo sirve para señales de baja corriente. Un Arduino consume 20–50 mA, que hará colapsar cualquier divisor razonable. Para alimentar circuitos usá un regulador (7805, LM317, buck converter)." },
      { q: "¿Por qué mi Vout medido es menor al calculado?", a: "Casi siempre es efecto de carga: el instrumento o circuito conectado al Vout tiene impedancia baja. Verificá con un multímetro de al menos 10 MΩ de impedancia, o rehacé los cálculos incluyendo la resistencia de carga en paralelo con R2." },
      { q: "¿Qué tolerancia de resistencias debo usar?", a: "Para leer una batería, ±5 % es suficiente. Para referencias de precisión o sensores de medida, usá ±1 % o ±0,1 % para minimizar el error total del sistema." },
      { q: "¿Sirve para señales AC?", a: "Sí, pero con reservas: en AC hay que considerar la impedancia de las etapas siguientes y evitar frecuencias donde las capacidades parásitas afecten. Para audio, mejor un divisor + condensador de acoplo." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/ley-de-ohm", label: "Ley de Ohm aplicada a divisores" },
      { to: "/articulos/circuitos-serie-paralelo", label: "Resistencias en serie y paralelo" },
      { to: "/articulos/reguladores-voltaje", label: "Reguladores de voltaje" },
    ],
  },

  rc: {
    title: "Calculadora de filtro RC — frecuencia de corte fc = 1 / (2π·R·C)",
    intro:
      "Un filtro RC combina una resistencia y un condensador para dejar pasar o bloquear señales según su frecuencia. Esta calculadora calcula la frecuencia de corte fc que separa las señales que pasan de las que se atenúan. Es esencial en audio, en fuentes de alimentación (filtrado de rizado), en acondicionamiento de señales antes de un ADC, en detección de flancos, y en la salida PWM de microcontroladores para convertirla en un voltaje analógico suave.",
    fundamentos: {
      h: "Fundamentos teóricos: qué es la frecuencia de corte",
      paragraphs: [
        "La frecuencia de corte fc de un filtro RC de primer orden es la frecuencia a la que la señal de salida cae 3 dB respecto de la entrada, es decir, se reduce al 70,7 % de su amplitud. Se calcula como fc = 1 / (2π · R · C). Por debajo de fc, un filtro pasa-bajos deja pasar la señal sin atenuación apreciable; por encima, la atenuación crece a razón de −20 dB por década (10× menos amplitud por cada 10× más frecuencia).",
        "El filtro pasa-bajos se construye con R en serie y C a masa: la resistencia se opone al paso de corriente, y el condensador cortocircuita las frecuencias altas a masa. El filtro pasa-altos se construye a la inversa: C en serie (bloquea DC y baja frecuencia) y R a masa. Ambos se usan constantemente en electrónica.",
        "Aplicaciones típicas del pasa-bajos: eliminar ruido de alta frecuencia antes de un ADC, suavizar la salida PWM de un Arduino para obtener un voltaje analógico, quitar zumbido de 50/60 Hz en señales de bajo nivel. Aplicaciones típicas del pasa-altos: bloquear el nivel DC de una señal de audio antes de amplificarla, detectar solo los flancos rápidos de una señal digital.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: elegir R y C",
      paragraphs: [
        "Paso 1 — Definir fc. Para suavizar una salida PWM de 490 Hz de Arduino, se elige fc entre 10 y 50 Hz: mucho menor que la frecuencia PWM para eliminar el rizado, pero suficiente para permitir cambios rápidos del valor promedio. Para filtrar audio, fc típica está entre 20 Hz (pasa-altos, elimina infrasonidos) y 20 kHz (pasa-bajos, elimina ultrasónicos).",
        "Paso 2 — Elegir R y C. Hay infinitas combinaciones que dan la misma fc. Como regla general, R entre 1 kΩ y 100 kΩ y C entre 1 nF y 10 µF. Valores muy bajos consumen corriente; valores muy altos son sensibles al ruido y a la impedancia de la siguiente etapa. Un buen punto de partida: R = 10 kΩ.",
        "Paso 3 — Calcular C. Despejando: C = 1 / (2π · R · fc). Ejemplo: R = 10 kΩ, fc = 16 Hz → C = 1 / (6,28 × 10 000 × 16) ≈ 1 µF. Elegí el valor comercial más cercano (1 µF cerámico o electrolítico, dependiendo de la aplicación).",
        "Paso 4 — Verificar la atenuación en la frecuencia de interés. En fc la atenuación es −3 dB. En 2·fc es aproximadamente −7 dB. En 10·fc es −20 dB. Si necesitás mayor atenuación, cascadeás filtros o pasás a segundo orden (RLC o filtros activos con op-amp).",
      ],
    },
    ejemplos: [
      { titulo: "Suavizar PWM Arduino", pasos: "R = 10 kΩ, C = 1 µF → fc ≈ 16 Hz. Rizado despreciable a 490 Hz PWM." },
      { titulo: "Pasa-bajos audio 10 kHz", pasos: "R = 1,6 kΩ, C = 10 nF → fc ≈ 10 kHz. Corta ruido sobre agudos." },
      { titulo: "Acoplo audio pasa-altos", pasos: "C = 1 µF, R = 47 kΩ → fc ≈ 3,4 Hz. Elimina DC sin afectar audio (20 Hz–20 kHz)." },
      { titulo: "Debounce de botón", pasos: "R = 10 kΩ, C = 100 nF → fc ≈ 160 Hz. Filtra los rebotes mecánicos (típicos < 10 ms)." },
      { titulo: "Filtro anti-alias ADC", pasos: "Para muestreo a 1 kHz, elegir fc = 500 Hz → R = 3,3 kΩ, C = 100 nF." },
    ],
    faqs: [
      { q: "¿Un filtro RC simple es suficiente para audio de alta fidelidad?", a: "En etapas de acoplo sí, pero para separación de bandas o crossovers exigentes se usan filtros activos con op-amps (Sallen-Key, Butterworth) que aportan mayor selectividad y ganancia controlada." },
      { q: "¿Qué diferencia hay entre pasa-bajos y pasa-altos?", a: "El orden de los componentes: pasa-bajos = R en serie + C a masa (deja pasar frecuencias bajas). Pasa-altos = C en serie + R a masa (deja pasar frecuencias altas). La fórmula de fc es idéntica en ambos casos." },
      { q: "¿El tipo de condensador afecta al filtro?", a: "Sí. Para audio: cerámicos NP0 o films (poliéster, polipropileno) por su baja distorsión. Para filtrado de fuentes: electrolíticos por su alta capacidad. Los electrolíticos tienen tolerancia amplia (±20 %) y no son ideales para filtros de precisión." },
      { q: "¿Cómo cascadeo dos filtros RC?", a: "Si el segundo tiene impedancia mucho mayor que el primero (10×), podés cascadearlos y la atenuación por década se dobla. Si no, aparece interacción y la fc real se corre. Para hacerlo bien, poné un op-amp seguidor entre etapas." },
    ],
    related: [
      { to: "/articulos/condensadores", label: "Guía completa de condensadores" },
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/ley-de-ohm", label: "Fundamentos: Ley de Ohm" },
      { to: "/articulos/pwm-arduino", label: "PWM en Arduino y filtrado" },
    ],
  },

  timer: {
    title: "Calculadora del 555 astable — frecuencia y duty cycle",
    intro:
      "El integrado 555, diseñado por Hans Camenzind en 1971, es uno de los chips más versátiles y usados de la historia: generación de señales de reloj, parpadeo de LEDs, tonos audibles, PWM básico, temporizadores y bases de tiempo digitales. En modo astable (self-triggered) produce una onda cuadrada continua sin necesidad de disparo externo. Esta calculadora aplica f = 1,44 / ((R1 + 2·R2) · C) y devuelve la frecuencia y el ciclo de trabajo (duty cycle) según R1, R2 y C.",
    fundamentos: {
      h: "Fundamentos teóricos: cómo oscila el 555 en modo astable",
      paragraphs: [
        "El 555 tiene tres resistencias internas de 5 kΩ que forman un divisor entre Vcc y masa, generando dos referencias: Vcc/3 y 2·Vcc/3. Dos comparadores internos monitorizan la tensión del pin THRESHOLD (6) contra 2·Vcc/3, y la del pin TRIGGER (2) contra Vcc/3, controlando un flip-flop RS que a su vez maneja la salida OUT (3) y un transistor de descarga en el pin DISCHARGE (7).",
        "En modo astable, el capacitor externo C se carga a través de R1 + R2 hacia Vcc. Cuando la tensión en C alcanza 2·Vcc/3, el comparador superior activa el flip-flop, la salida baja y el transistor de descarga conecta el pin DISCHARGE a masa. C se descarga entonces solo a través de R2 hasta llegar a Vcc/3, momento en que el comparador inferior reinicia el flip-flop y el ciclo se repite indefinidamente.",
        "La consecuencia matemática es que el tiempo alto (t_H) y el tiempo bajo (t_L) son distintos: t_H = 0,693 · (R1 + R2) · C y t_L = 0,693 · R2 · C. El periodo total es T = t_H + t_L = 0,693 · (R1 + 2R2) · C, y la frecuencia f = 1,44 / ((R1 + 2R2) · C). El duty cycle es siempre mayor al 50 %: D = (R1 + R2) / (R1 + 2R2). Para acercarse al 50 %, R1 debe ser mucho menor que R2, y para conseguir exactamente 50 % se necesita un diodo entre R1 y el pin DISCHARGE.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: diseñar un astable paso a paso",
      paragraphs: [
        "Paso 1 — Fijar la frecuencia y el duty cycle deseados. Por ejemplo: parpadeo de LED a 2 Hz (500 ms de periodo) con duty cycle 50 %, o tono audible de 1 kHz para un buzzer.",
        "Paso 2 — Elegir C. C determina el orden de magnitud. Para f < 10 Hz, C = 10–100 µF (electrolítico). Para f = 10 Hz–1 kHz, C = 100 nF–10 µF. Para f > 1 kHz, C = 1–100 nF (cerámico). Elegí el condensador según la tolerancia deseada (cerámicos son más estables que electrolíticos).",
        "Paso 3 — Despejar R2 y R1. Para f = 1 Hz con C = 10 µF: R1 + 2R2 = 1,44 / (1 × 10⁻⁵) = 144 000 Ω. Si querés duty cycle bajo, elegí R2 = 68 kΩ y R1 = 8,2 kΩ (D = 76/144 = 53 %). Verificá que las resistencias estén por encima de 1 kΩ (para no sobrepasar la corriente del pin DISCHARGE, típicamente 200 mA a 15 V).",
        "Paso 4 — Estabilidad y decoupling. Colocá un condensador de desacople de 100 nF entre Vcc y GND del 555, cerca del chip. El pin CONTROL VOLTAGE (5) debe llevar un cerámico de 10 nF a masa para reducir ruido en las referencias internas. Sin estos condensadores el 555 puede oscilar de forma errática o generar jitter perceptible.",
      ],
    },
    ejemplos: [
      { titulo: "Parpadeo lento LED", pasos: "R1 = 10 kΩ, R2 = 100 kΩ, C = 10 µF → f ≈ 0,68 Hz (parpadea cada 1,47 s)." },
      { titulo: "Tono audible 1 kHz", pasos: "R1 = 1 kΩ, R2 = 10 kΩ, C = 68 nF → f ≈ 1 010 Hz." },
      { titulo: "PWM 5 kHz motor", pasos: "R1 = 1 kΩ, R2 = 1 kΩ, C = 100 nF → f ≈ 4,8 kHz, D ≈ 66 %." },
      { titulo: "Reloj digital 1 Hz", pasos: "R1 = 6,8 kΩ, R2 = 68 kΩ, C = 10 µF → f ≈ 1 Hz, D ≈ 52 %." },
      { titulo: "Metrónomo 2 Hz", pasos: "R1 = 3,3 kΩ, R2 = 47 kΩ, C = 10 µF → f ≈ 1,5 Hz. Ideal para probar circuitos digitales." },
    ],
    faqs: [
      { q: "¿Puedo conseguir duty cycle exactamente 50 %?", a: "En modo astable clásico no: el duty siempre es > 50 %. Para conseguir 50 %, poné un diodo (1N4148) en paralelo con R2 con el cátodo hacia el capacitor, forzando que la carga pase solo por R1. Alternativamente, usá una versión CMOS (7555) o un flip-flop divisor por dos." },
      { q: "¿Qué diferencia hay entre NE555 bipolar y 7555 CMOS?", a: "El NE555 bipolar acepta 4,5–16 V pero consume 3–10 mA. El 7555 CMOS opera desde 2 V, consume microamperios, tolera frecuencias mayores (hasta 3 MHz) y no genera picos de corriente en las transiciones. Para baja potencia y pilas, siempre 7555." },
      { q: "¿La frecuencia se mantiene estable con la temperatura?", a: "Con resistencias ±1 % y condensadores cerámicos NP0 o de poliéster, la deriva es < 1 % en 0–70 °C. Los electrolíticos son mucho peores (hasta 20 %). Para relojes de precisión mejor usar un cristal + microcontrolador." },
      { q: "¿Puedo alimentar cargas directamente desde la salida?", a: "La salida OUT del 555 puede entregar hasta 200 mA (típicamente 100 mA a 5 V), suficiente para LEDs, buzzers piezoeléctricos y relés pequeños. Para motores o cargas mayores usá un transistor MOSFET o un driver dedicado." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/condensadores", label: "Cómo funcionan los condensadores" },
      { to: "/articulos/pwm-arduino", label: "PWM con Arduino" },
      { to: "/articulos/leer-datasheet", label: "Cómo leer el datasheet del NE555" },
    ],
  },

  smd: {
    title: "Decodificador SMD — código numérico de 3 y 4 dígitos",
    intro:
      "Las resistencias SMD (Surface Mount Device, montaje superficial) han sustituido casi por completo a las axiales en la electrónica moderna: son más pequeñas, más baratas de ensamblar en máquina, y ocupan menos espacio en las placas. En lugar del código de colores, usan un código numérico impreso encima del componente, con dos formatos principales: 3 dígitos (tolerancia ±5 %) y 4 dígitos (tolerancia ±1 %). Esta calculadora interpreta ambos formatos y también la notación con R que indica el punto decimal en valores muy pequeños.",
    fundamentos: {
      h: "Fundamentos teóricos: por qué SMD y qué encapsulados existen",
      paragraphs: [
        "El paquete SMD más común es el 0805 (2 × 1,25 mm), seguido de 0603 (1,6 × 0,8 mm), 0402 (1 × 0,5 mm) y 0201 (0,6 × 0,3 mm). Los tamaños se refieren a las dimensiones en milésimas de pulgada. Cuanto más pequeño el encapsulado, más difícil manipularlo manualmente pero mayor la densidad de componentes por área. Un móvil moderno tiene miles de resistencias 0402 y 0201.",
        "El código impreso se limita a 2, 3 o 4 caracteres por falta de espacio físico. Las tolerancias estándar son ±5 % (código E24) y ±1 % (código E96). Para las de precisión existe además un código EIA-96 con dos números + una letra que indica el multiplicador, aunque es menos frecuente en hobby y más común en resistencias industriales de precisión.",
        "Las resistencias de muy bajo valor (< 10 Ω), típicas de sensores de corriente (shunts), usan la notación con R para indicar la posición del punto decimal: R47 = 0,47 Ω, 2R2 = 2,2 Ω, 4R7 = 4,7 Ω. Esto evita ambigüedades: sin la R, no se sabría si el punto va antes o después.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: interpretar cada formato",
      paragraphs: [
        "Formato 3 dígitos. Las dos primeras cifras son los dígitos significativos y la tercera es el exponente. Ejemplo: 472 = 47 × 10² = 4 700 Ω = 4,7 kΩ. 103 = 10 × 10³ = 10 kΩ. 220 = 22 × 10⁰ = 22 Ω. Este formato tiene tolerancia ±5 % por defecto.",
        "Formato 4 dígitos. Las tres primeras cifras son dígitos significativos, la cuarta es el exponente. Aporta mayor precisión, típico de tolerancia ±1 %. Ejemplo: 4701 = 470 × 10¹ = 4 700 Ω = 4,7 kΩ (mismo valor que 472 pero ±1 % en lugar de ±5 %). 1002 = 100 × 10² = 10 kΩ. 4990 = 499 × 10⁰ = 499 Ω.",
        "Notación con R. La letra R indica la posición del punto decimal en valores menores a 10 Ω. Ejemplos: 4R7 = 4,7 Ω, R47 = 0,47 Ω, R010 = 0,010 Ω (10 mΩ). Se usa en resistencias shunt para medición de corriente y en emisores de transistores de potencia.",
        "Casos especiales. Una resistencia marcada solo con '000' o '0' es un puente cero (jumper); tiene resistencia cercana a 0 y se usa para saltar pistas en el PCB. La marca 'M' o 'K' minúscula puede aparecer como sufijo indicando megohmios o kilohmios (raro pero existe).",
      ],
    },
    ejemplos: [
      { titulo: "103", pasos: "10 × 10³ = 10 000 Ω = 10 kΩ. Valor muy común como pull-up." },
      { titulo: "472", pasos: "47 × 10² = 4 700 Ω = 4,7 kΩ. Pull-up I²C típico." },
      { titulo: "4701", pasos: "470 × 10¹ = 4 700 Ω = 4,7 kΩ ±1 %. Precisión mayor que 472." },
      { titulo: "2R2", pasos: "= 2,2 Ω. Shunt de bajo valor para medir corriente." },
      { titulo: "R047", pasos: "= 0,047 Ω = 47 mΩ. Shunt de precisión en fuentes conmutadas." },
    ],
    faqs: [
      { q: "¿Puedo distinguir a simple vista una resistencia 0603 de un condensador 0603?", a: "No. Ambos tienen forma y color similares (cuerpo negro con terminales metálicos). La resistencia lleva código impreso encima, el condensador cerámico no. Cuando no hay marca, medí con el multímetro." },
      { q: "¿Qué tolerancia asumo si no la conozco?", a: "Si el código es de 3 dígitos, asumí ±5 %. Si es de 4 dígitos, asumí ±1 %. Para saber la tolerancia exacta se necesita el datasheet o el marking book del fabricante." },
      { q: "¿Puedo reemplazar una SMD por una axial?", a: "Sí, siempre que el valor y la potencia sean equivalentes, y que quepa físicamente. En reparaciones caseras se usan axiales pequeñas (1/8 W) puenteando con hilo esmaltado. En producción no es viable." },
      { q: "¿Los códigos EIA-96 son distintos?", a: "Sí. El código EIA-96 usa dos dígitos + una letra: los dígitos codifican un valor de tabla (01 = 100, 96 = 976) y la letra el multiplicador (A = ×1, B = ×10, C = ×100…). Por ejemplo, 22A = 165 × 1 = 165 Ω. No es intuitivo, hay que consultar tabla." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias (incluye SMD)" },
      { to: "/articulos/leer-datasheet", label: "Cómo leer un datasheet" },
      { to: "/articulos/codigo-colores-resistencias", label: "Resistencias axiales: código de colores" },
      { to: "/articulos/soldadura", label: "Soldadura de componentes SMD" },
    ],
  },

  reactance: {
    title: "Calculadora de reactancia capacitiva — Xc = 1 / (2π·f·C)",
    intro:
      "La reactancia capacitiva (Xc) es la oposición que presenta un condensador al paso de la corriente alterna. A diferencia de una resistencia, depende de la frecuencia: a mayor frecuencia, menor oposición. Esta calculadora aplica Xc = 1 / (2π · f · C) y devuelve el valor en ohmios. Se usa para diseñar acoplos entre etapas de audio, filtros de ruido en fuentes de alimentación, capacitores de desacople en microcontroladores, filtros pasa-altos pasivos y análisis de impedancia en circuitos AC.",
    fundamentos: {
      h: "Fundamentos teóricos: por qué depende de la frecuencia",
      paragraphs: [
        "Un condensador almacena energía en un campo eléctrico entre dos placas conductoras separadas por un dieléctrico. Cuando se aplica una tensión constante (DC), tras un transitorio se carga y deja de circular corriente: el condensador se comporta como un circuito abierto. Cuando se aplica una tensión alterna (AC), el condensador se carga y descarga constantemente, permitiendo el paso de corriente en cantidad proporcional a la velocidad del cambio.",
        "Matemáticamente, la corriente en un condensador es I = C · dV/dt. En AC senoidal, si V = V₀ · sen(2π·f·t), entonces I = C · 2π·f · V₀ · cos(2π·f·t). La relación V/I (equivalente a resistencia en AC) es Xc = 1 / (2π · f · C). Esta magnitud tiene unidades de ohmios pero recibe el nombre de reactancia para distinguirla de una resistencia pura: la reactancia no disipa energía como calor, sino que la almacena y devuelve.",
        "El signo de la reactancia es negativo en notación compleja: Zc = 1 / (jωC) = −j / (ωC). En un circuito con resistencia y capacitancia en serie, la impedancia total es Z = R − j·Xc, con módulo |Z| = √(R² + Xc²) y ángulo de fase φ = −arctan(Xc / R). Esto significa que en un condensador la corriente adelanta 90° a la tensión.",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: cómo usar la fórmula",
      paragraphs: [
        "Paso 1 — Definir la frecuencia de interés. En un filtro de red eléctrica, f = 50 o 60 Hz. En audio, entre 20 Hz y 20 kHz. En radiofrecuencia, MHz o GHz. En desacople de microcontroladores, se piensa en el rango del ruido de conmutación: 100 kHz a 100 MHz.",
        "Paso 2 — Elegir el condensador. Su valor determina Xc a la frecuencia dada. A 1 kHz: 1 µF da Xc ≈ 159 Ω, 100 nF da 1,59 kΩ, 10 nF da 15,9 kΩ. Se elige buscando Xc mucho menor que la impedancia de las etapas siguientes, típicamente 10× menor.",
        "Paso 3 — Verificar el comportamiento a otras frecuencias. Duplicando la frecuencia, Xc se reduce a la mitad. Multiplicando por diez la frecuencia, Xc se divide por diez. Esta ley inversa es la base de los filtros: un capacitor bloquea DC y baja frecuencia, y deja pasar alta frecuencia.",
        "Paso 4 — Considerar la ESR y el tipo de condensador. En la práctica, todo condensador tiene una resistencia serie equivalente (ESR) que suma a Xc. Los electrolíticos tienen ESR alta (0,1–10 Ω), los cerámicos MLCC muy baja (mΩ), los films intermedia. Para desacople de alta frecuencia siempre cerámicos, para filtrado de baja frecuencia con alta capacidad, electrolíticos + cerámico en paralelo.",
      ],
    },
    ejemplos: [
      { titulo: "Acoplo audio 100 Hz", pasos: "C = 10 µF → Xc = 1 / (6,28 × 100 × 10⁻⁵) ≈ 159 Ω. Suficientemente bajo para dejar pasar graves." },
      { titulo: "Desacople MCU 1 MHz", pasos: "C = 100 nF → Xc = 1 / (6,28 × 10⁶ × 10⁻⁷) ≈ 1,59 Ω. Cortocircuito para ruido de alta frecuencia." },
      { titulo: "Filtro red 50 Hz", pasos: "C = 1 µF → Xc ≈ 3,18 kΩ. Alto: casi bloquea 50 Hz." },
      { titulo: "Bypass amplificador", pasos: "C = 100 µF a 20 Hz → Xc ≈ 80 Ω. Adecuado para bypass de emisor en amps de audio." },
      { titulo: "Snubber conmutación", pasos: "C = 10 nF a 100 kHz → Xc ≈ 159 Ω. Absorbe transitorios de conmutación." },
    ],
    faqs: [
      { q: "¿Puedo usar reactancia capacitiva para reducir voltaje en AC?", a: "Sí, es lo que se llama fuente capacitiva o transformer-less. Se usa en aplicaciones de bajo consumo (relojes, sensores). El condensador limita la corriente por su Xc, pero el diseño es delicado y peligroso: la tensión de red pasa directamente al circuito. Siempre incluir fusible, MOV y aislamiento óptico." },
      { q: "¿Por qué mi filtro real no atenúa como calculo?", a: "Casi siempre por la ESR del condensador y la impedancia parásita del cableado. En frecuencias altas también aparece la inductancia serie del condensador (ESL), que limita la efectividad. Por eso en desacople se ponen cerámicos + electrolítico en paralelo." },
      { q: "¿La reactancia capacitiva depende de la temperatura?", a: "Depende del tipo de dieléctrico. Cerámicos X7R o Y5V cambian bastante (hasta 20 % en el rango −40 a 85 °C). Cerámicos NP0/C0G y films son muy estables (< 1 %). Electrolíticos son sensibles a la temperatura por su ESR." },
      { q: "¿Cómo se relaciona con la reactancia inductiva?", a: "La reactancia inductiva es XL = 2π·f·L (crece con la frecuencia), la capacitiva Xc = 1/(2π·f·C) (decrece con la frecuencia). Cuando XL = Xc se produce resonancia: es la base de circuitos LC sintonizados y filtros de segundo orden." },
    ],
    related: [
      { to: "/articulos/condensadores", label: "Guía completa de condensadores" },
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/fuentes-de-alimentacion", label: "Fuentes de alimentación y filtrado" },
      { to: "/articulos/osciloscopio", label: "Medir señales AC con osciloscopio" },
    ],
  },

  units: {
    title: "Conversor de unidades electrónicas — SI y prefijos",
    intro:
      "Los datasheets, esquemáticos y libros de electrónica mezclan constantemente unidades: ohmios, kilohmios, megohmios, microfaradios, nanofaradios, picofaradios, miliamperios, microamperios. Este conversor te permite pasar de una unidad a otra sin equivocarte con los ceros, evitando errores que pueden destruir componentes por elegir una resistencia 1 000 veces menor de la debida o un condensador 1 000 veces mayor. Se apoya en los prefijos SI estándar (mega, kilo, mili, micro, nano, pico) y aplica factores de conversión exactos.",
    fundamentos: {
      h: "Fundamentos teóricos: los prefijos SI en electrónica",
      paragraphs: [
        "El Sistema Internacional (SI) define prefijos que multiplican o dividen la unidad base por potencias de diez. En electrónica los más usados son: mega (M, ×10⁶), kilo (k, ×10³), unidad base (×1), mili (m, ×10⁻³), micro (µ, ×10⁻⁶), nano (n, ×10⁻⁹), pico (p, ×10⁻¹²) y femto (f, ×10⁻¹⁵). Cada salto es de tres órdenes de magnitud, lo que facilita el cálculo mental.",
        "En resistencias las unidades habituales son Ω, kΩ (×1 000 Ω), MΩ (×1 000 000 Ω). En condensadores casi nunca se ve el faradio puro: se trabaja con µF (10⁻⁶), nF (10⁻⁹) y pF (10⁻¹²). En corrientes: A (amperio) para consumos altos, mA (×10⁻³) para señales, µA (×10⁻⁶) para modo sleep de microcontroladores. En frecuencias: Hz, kHz (×10³), MHz (×10⁶), GHz (×10⁹).",
        "El error más común es confundir mA con A al aplicar la Ley de Ohm o la fórmula P = V × I: 500 mA no es 500 A, es 0,5 A. Otro error es confundir µF con nF: un condensador de 100 nF es diez veces menor que uno de 1 µF (1 µF = 1 000 nF). Un tercer error clásico: creer que 1 kΩ = 1 000 000 Ω (lo correcto es 1 kΩ = 1 000 Ω; 1 MΩ = 1 000 000 Ω).",
      ],
    },
    mecanica: {
      h: "Mecánica operativa: conversiones que hay que dominar",
      paragraphs: [
        "Resistencia. 1 kΩ = 1 000 Ω. 1 MΩ = 1 000 kΩ = 1 000 000 Ω. Para pasar de kΩ a Ω, multiplicá por 1 000; para pasar de MΩ a kΩ, multiplicá por 1 000. Un shunt de 10 mΩ es 0,010 Ω, útil para medir corrientes altas por caída de tensión.",
        "Capacitancia. 1 F es enormemente grande y solo se ve en supercapacitores. En circuitos normales: 1 mF = 1 000 µF (electrolíticos de fuente). 1 µF = 1 000 nF = 1 000 000 pF. Para convertir 0,1 µF a nF, corré la coma tres lugares: 100 nF. Para pasar de nF a pF, corré la coma otros tres: 100 000 pF.",
        "Corriente. 1 A = 1 000 mA = 1 000 000 µA. Un LED consume decenas de mA, un microcontrolador activo entre 10 y 200 mA, en sleep de µA a nA. Recordá: en la Ley de Ohm V = I × R, la corriente debe estar en amperios para que voltios y ohmios sean coherentes.",
        "Frecuencia y tiempo. 1 kHz = 1 000 Hz. 1 MHz = 1 000 kHz. El periodo es el inverso: T = 1/f. Un reloj de 16 MHz tiene periodo de 62,5 ns. Una señal de 50 Hz de red eléctrica tiene periodo de 20 ms.",
      ],
    },
    ejemplos: [
      { titulo: "0,1 µF en pF", pasos: "0,1 µF × 1 000 000 = 100 000 pF = 100 nF. Valor común de cerámico." },
      { titulo: "4,7 kΩ en Ω", pasos: "4,7 × 1 000 = 4 700 Ω. Pull-up estándar de I²C." },
      { titulo: "20 mA en A", pasos: "20 / 1 000 = 0,020 A. Corriente típica de un LED." },
      { titulo: "16 MHz en Hz", pasos: "16 × 1 000 000 = 16 000 000 Hz. Reloj típico de Arduino Uno." },
      { titulo: "10 mΩ en Ω", pasos: "10 / 1 000 = 0,010 Ω. Shunt típico para 10 A → 100 mV." },
    ],
    faqs: [
      { q: "¿Por qué en condensadores se usa µF y no el faradio directamente?", a: "Porque 1 F es una capacitancia enorme: hasta la aparición de los supercapacitores nunca se veía en un circuito real. Los valores prácticos van de pF (cerámicos pequeños) a mF (grandes electrolíticos), y los prefijos hacen los números manejables." },
      { q: "¿Cómo distingo micro (µ) de mili (m) en un texto sin acceso al símbolo µ?", a: "A veces se escribe uF en lugar de µF (u como aproximación de µ). Contextualmente: si el circuito es de audio o electrónica de consumo, casi siempre es µF. Si es una fuente de alta capacidad, podría ser mF. En caso de duda, consultá el esquemático." },
      { q: "¿kΩ y KΩ son lo mismo?", a: "Lo correcto según SI es kΩ (k minúscula). K mayúscula es Kelvin. Pero en la práctica se ven ambos, y todos entienden lo mismo. Igual para MΩ (mega) vs mΩ (mili): ojo, no confundir." },
      { q: "¿Cómo convierto rápido entre unidades?", a: "Truco: escribí el valor en notación científica (ej: 4,7 × 10³ Ω) y aplicá el prefijo directo (10³ = kilo, por tanto 4,7 kΩ). Con la práctica se hace mentalmente." },
    ],
    related: [
      { to: "/guia-resistencias", label: "Guía completa de resistencias" },
      { to: "/articulos/condensadores", label: "Guía de condensadores" },
      { to: "/articulos/leer-datasheet", label: "Cómo leer un datasheet" },
      { to: "/articulos/ley-de-ohm", label: "Ley de Ohm: unidades correctas" },
    ],
  },
};

export const ToolSeoSection = ({ toolKey }: { toolKey: string }) => {
  const c = TOOL_SEO[toolKey];
  if (!c) return null;
  return (
    <section
      className="mt-8 rounded-2xl border border-border bg-card/40 p-5 sm:p-7 space-y-8"
      aria-label="Guía educativa de la herramienta"
    >
      <header className="space-y-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          ▸ Guía técnica de la herramienta
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
          {c.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {c.intro}
        </p>
      </header>

      {guideLink}

      {/* Fundamentos Teóricos */}
      <article className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <Sigma className="w-4 h-4 text-primary" />
          {c.fundamentos.h}
        </h3>
        {c.fundamentos.paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </article>

      {/* Mecánica Operativa */}
      <article className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary" />
          {c.mecanica.h}
        </h3>
        {c.mecanica.paragraphs.map((p, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </article>

      {/* Ejemplos Prácticos */}
      <article className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          Ejemplos prácticos de cálculo paso a paso
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {c.ejemplos.map((ex) => (
            <li
              key={ex.titulo}
              className="rounded-lg border border-border bg-background/40 p-3.5 text-xs"
            >
              <p className="font-bold text-foreground mb-1.5 text-sm">{ex.titulo}</p>
              <p className="text-muted-foreground leading-relaxed">{ex.pasos}</p>
            </li>
          ))}
        </ul>
      </article>

      {/* FAQs — visible en HTML sin acordeón para SEO */}
      <article className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-primary" />
          Preguntas frecuentes
        </h3>
        <div className="space-y-4">
          {c.faqs.map((f) => (
            <div key={f.q} className="space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">{f.q}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </article>

      {/* Contenido relacionado */}
      <article className="space-y-2 pt-4 border-t border-border">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Wrench className="w-4 h-4 text-primary" />
          Contenido educativo relacionado
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm">
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
      </article>
    </section>
  );
};

export default ToolSeoSection;
