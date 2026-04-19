import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ML_TAG = "as20260324074639";
const ml = (q: string) => `https://listado.mercadolibre.com.ar/${q}#${ML_TAG}`;

const ReguladoresVoltaje = () => {
  return (
    <ArticleLayout
      title="Reguladores de Voltaje: 7805, LM317 y Buck Converters Explicados"
      subtitle="Aprende a elegir entre reguladores lineales y conmutados. Cálculos térmicos, esquemáticos completos, fórmulas reales y cuándo usar cada tipo en tus proyectos."
      slug="reguladores-voltaje"
      datePublished="2026-04-18"
      dateModified="2026-04-18"
      faqs={[
        {
          question: "¿Puedo usar un 7805 para alimentar un Arduino UNO desde 12V?",
          answer: "Funciona, pero el Arduino UNO ya tiene su propio regulador interno (NCP1117). Conectar 12V al jack DC ya hace lo mismo, sin capacitores extra.",
        },
        {
          question: "¿Cuánta corriente entrega un 7805 sin disipador?",
          answer: "Depende de la diferencia Vin-Vout. Con Vin=7V/Vout=5V podés sacar ~500 mA sin disipador. Con Vin=12V solo ~200 mA antes del cutoff térmico.",
        },
        {
          question: "¿Los buck converters sirven para audio?",
          answer: "Sí, pero necesitás filtrado adicional (LC pasa-bajos a la salida) y mantener la frecuencia de conmutación lejos de la banda audible. Para preamps de alta fidelidad, mejor un LDO o lineal.",
        },
        {
          question: "¿Necesito disipador para el LM2596?",
          answer: "Hasta 2A casi nunca. Por arriba de eso conviene agregar un pequeño disipador adhesivo al chip o forzar circulación de aire.",
        },
      ]}
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es un regulador de voltaje?</h2>
      <p>
        Un <strong className="text-foreground">regulador de voltaje</strong> es un circuito que toma un voltaje de entrada variable o ruidoso y entrega una <strong className="text-foreground">salida estable y constante</strong>, sin importar las variaciones en la entrada o la corriente que demande la carga.
      </p>
      <p>
        Es uno de los componentes más críticos de cualquier proyecto: si tu Arduino, sensores o microcontrolador reciben un voltaje incorrecto, podés <strong className="text-foreground">quemar la placa</strong> o tener lecturas erráticas. Existen dos grandes familias: <strong className="text-foreground">lineales</strong> y <strong className="text-foreground">conmutados (switching)</strong>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Lineales vs Conmutados: la diferencia clave</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Característica</th>
              <th className="px-3 py-2 text-left font-mono">Lineal (7805, LM317)</th>
              <th className="px-3 py-2 text-left font-mono">Conmutado (Buck)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Eficiencia</td><td className="px-3 py-2">30-60%</td><td className="px-3 py-2">85-95%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Ruido eléctrico</td><td className="px-3 py-2">Muy bajo</td><td className="px-3 py-2">Medio-alto</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Calor disipado</td><td className="px-3 py-2">Mucho</td><td className="px-3 py-2">Muy poco</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Tamaño</td><td className="px-3 py-2">Pequeño (con disipador)</td><td className="px-3 py-2">Pequeño</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Costo</td><td className="px-3 py-2">Muy bajo (USD 0.20)</td><td className="px-3 py-2">Bajo (USD 1-3)</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Complejidad</td><td className="px-3 py-2">Mínima (3 pines + 2 capas)</td><td className="px-3 py-2">Módulo listo (LM2596)</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Audio / RF</td><td className="px-3 py-2">✅ Ideal</td><td className="px-3 py-2">❌ Genera interferencia</td></tr>
          </tbody>
        </table>
      </div>

      {/* ========= 7805 ========= */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">1. LM7805 — El regulador lineal clásico</h2>
      <p>
        El <strong className="text-foreground">7805</strong> es un regulador de voltaje fijo que entrega <strong className="text-foreground">5V con hasta 1A</strong> de corriente. Es el más usado para alimentar Arduinos, sensores y lógica TTL desde fuentes de 7-25V.
      </p>
      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-4">Pinout y esquema básico</h3>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`            ┌─────────┐
            │  7805   │
   IN ──────┤1       3├────── OUT (5V)
   (7-25V)  │         │       
            │   GND   │
            └────┬────┘
                 │
                GND  (pin 2)


Esquema completo (con capacitores de filtro):

  Vin ──┬──[7805]──┬──── +5V
       ┌┴┐  IN GND OUT
   C1 │ │              ┌┴┐
   0.33µF              │ │ C2 = 0.1µF
       └┬┘              └┬┘
        │                │
       GND ─────────────GND

C1: estabiliza la entrada (cerca del regulador)
C2: filtra ruido a la salida`}</pre>
      </div>

      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">Cálculo térmico (¡el más ignorado!)</h3>
      <p>
        El 7805 es un regulador <strong className="text-foreground">en serie</strong>: la diferencia entre Vin y Vout se disipa como calor. La fórmula es:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm">
        <pre className="text-foreground">{`Pdisipada = (Vin - Vout) × Iout

Ejemplo: Vin=12V, Vout=5V, Iout=500 mA

Pdisipada = (12 - 5) × 0.5 = 3.5 W`}</pre>
      </div>
      <p className="mt-3">
        <strong className="text-foreground">3.5 W son MUCHO calor para un encapsulado TO-220</strong>. La resistencia térmica unión-ambiente del 7805 sin disipador es de <strong className="text-foreground">~65 °C/W</strong>. Esto significa que la unión interna subiría:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm">
        <pre className="text-foreground">{`ΔT = Pdisipada × R_thJA = 3.5 × 65 = 227 °C

Tunión = Tambiente + ΔT = 25 + 227 = 252 °C  ☠️

(El 7805 entra en protección térmica a 150°C)`}</pre>
      </div>
      <p>
        <strong className="text-foreground">Conclusión</strong>: con esa carga necesitás disipador <strong className="text-foreground">obligatorio</strong>. Calculá su resistencia térmica máxima:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm">
        <pre className="text-foreground">{`R_thSA_max = (Tj_max - Ta) / P  -  R_thJC  -  R_thCS

Para Tj_max=125°C, Ta=25°C, P=3.5W,
R_thJC=5°C/W, R_thCS=1°C/W (con pasta térmica):

R_thSA_max = (125 - 25)/3.5 - 5 - 1 = 22.6 °C/W

→ Necesitás un disipador con R ≤ 22°C/W`}</pre>
      </div>
      <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
        <strong className="text-foreground">💡 Tip clave</strong>: si la diferencia Vin-Vout supera los 5V con corrientes &gt; 200 mA, considerá usar un buck converter en lugar de un 7805. Vas a ahorrar energía y eliminar el problema térmico.
      </div>
      <a href={ml("regulador-7805")} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
        <ShoppingCart className="w-4 h-4" /> Ver 7805 en Mercado Libre
      </a>

      {/* ========= LM317 ========= */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">2. LM317 — Regulador lineal ajustable</h2>
      <p>
        El <strong className="text-foreground">LM317</strong> es como un 7805 pero con voltaje de salida <strong className="text-foreground">ajustable entre 1.25V y 37V</strong> mediante 2 resistencias. Soporta hasta 1.5A y es ideal para fuentes de banco o para alimentar tensiones no estándar (3.3V, 6V, 9V, etc.).
      </p>
      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-4">Esquema y fórmula</h3>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`  Vin ────┬──[LM317]──┬──── Vout
        ┌┴┐  IN  OUT       │
   C1 │ │       ADJ       [R1] ← 240Ω fijo
   0.1µF        │          │
        └┬┘     │          ├──── Vout
        GND     └──────────┤
                          [R2] ← variable (potenciómetro)
                           │
                          GND


  Fórmula:    Vout = 1.25 × (1 + R2/R1)

  Ejemplos con R1 = 240Ω:
    R2 =  240Ω  →  Vout = 2.5V
    R2 =  720Ω  →  Vout = 5.0V
    R2 = 1500Ω  →  Vout = 9.1V
    R2 = 2200Ω  →  Vout = 12.7V`}</pre>
      </div>
      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">Truco profesional</h3>
      <p>
        Usá un <strong className="text-foreground">potenciómetro multivuelta</strong> de 5kΩ en R2 para conseguir un ajuste fino. Agregá un capacitor de 10µF entre ADJ y GND para mejorar el rechazo de ripple en 80 dB.
      </p>
      <a href={ml("regulador-lm317")} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
        <ShoppingCart className="w-4 h-4" /> Ver LM317 en Mercado Libre
      </a>

      {/* ========= BUCK ========= */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">3. Buck Converter (LM2596) — El reemplazo moderno</h2>
      <p>
        Un <strong className="text-foreground">buck converter</strong> es un regulador <strong className="text-foreground">conmutado reductor</strong>: en lugar de disipar el exceso como calor, conmuta a alta frecuencia (50-500 kHz) y usa una bobina + diodo + capacitor para almacenar y entregar energía. Resultado: <strong className="text-foreground">eficiencias del 90%</strong>.
      </p>
      <p>
        El <strong className="text-foreground">módulo LM2596</strong> ya viene armado por menos de USD 2: aceptás 4-40V de entrada, ajustás un potenciómetro y obtenés cualquier salida entre 1.5V y 35V con hasta 3A.
      </p>
      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-4">Comparación práctica de eficiencia</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Escenario</th>
              <th className="px-3 py-2 text-left font-mono">7805</th>
              <th className="px-3 py-2 text-left font-mono">LM2596</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2">Vin=12V, Vout=5V, Iout=1A</td><td className="px-3 py-2">η = 41%, calor = 7W</td><td className="px-3 py-2">η = 92%, calor = 0.4W</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Vin=24V, Vout=5V, Iout=2A</td><td className="px-3 py-2">No soporta (38W de calor)</td><td className="px-3 py-2">η = 88%, calor = 1.4W</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Vin=9V, Vout=5V, Iout=200mA</td><td className="px-3 py-2">η = 56%, OK sin disipador</td><td className="px-3 py-2">η = 90%, idem</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3">
        <strong className="text-foreground">Cuándo NO usar buck</strong>: en circuitos de audio analógico, RF sensible o ADCs de alta resolución, el ruido de conmutación puede arruinar la señal. Para esos casos, un lineal con buen filtrado sigue siendo rey.
      </p>
      <a href={ml("modulo-lm2596-buck")} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
        <ShoppingCart className="w-4 h-4" /> Ver módulo LM2596 en Mercado Libre
      </a>

      {/* ========= ARQUITECTURA HÍBRIDA ========= */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Arquitectura híbrida: lo mejor de los dos mundos</h2>
      <p>
        Para proyectos serios, el patrón estándar es:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`Fuente 12V/24V
      │
   [Buck LM2596] ──→ 5.5V (eficiente, hace el "trabajo pesado")
      │
   [LM7805 o LDO] ──→ 5.0V limpios para el microcontrolador
      │
      └──→ Lógica, ADC, sensores analógicos`}</pre>
      </div>
      <p>
        El buck baja el voltaje con alta eficiencia hasta un valor cercano al objetivo. El regulador lineal final "limpia" el ripple de conmutación. Combinás <strong className="text-foreground">eficiencia + ruido bajo</strong>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Reguladores LDO — La cuarta opción</h2>
      <p>
        Los <strong className="text-foreground">LDO (Low Drop-Out)</strong> son reguladores lineales que necesitan muy poca diferencia entre Vin y Vout (típicamente <strong className="text-foreground">100-300 mV</strong>). El <strong className="text-foreground">AMS1117-3.3</strong> es el LDO más popular y es el que llevan dentro la mayoría de placas ESP8266 y ESP32 para bajar 5V → 3.3V. Ideal cuando:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Tu Vin es muy cercano a tu Vout (ej: 3.7V batería → 3.3V)</li>
        <li>Necesitás bajo ruido sin la complejidad de un buck</li>
        <li>Querés mínimo footprint en el PCB</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores comunes y cómo evitarlos</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Olvidar los capacitores de filtro</strong>: sin C1 a la entrada y C2 a la salida, el regulador puede oscilar.</li>
        <li><strong className="text-foreground">Ignorar el dropout voltage</strong>: el 7805 necesita Vin ≥ 7V para entregar 5V estables. Con 6V no funciona.</li>
        <li><strong className="text-foreground">No medir la corriente real</strong>: usá nuestro <Link to="/articulos/multimetro" className="text-primary hover:underline">multímetro</Link> en serie para conocer el consumo antes de elegir el regulador.</li>
        <li><strong className="text-foreground">Confundir AMS1117 con 7805</strong>: el AMS1117 entrega solo 1A y usa SOT-223 (SMD). Calefacción más limitada.</li>
        <li><strong className="text-foreground">Buck barato sin filtro extra</strong>: los módulos chinos LM2596 traen capacitores justos. Agregá 470 µF y un ferrite bead a la salida si vas a alimentar un Arduino + radio.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Preguntas frecuentes</h2>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Puedo usar un 7805 para alimentar un Arduino UNO desde 12V?</summary>
        <p className="mt-2 text-sm">Funciona, pero el Arduino UNO ya tiene su propio regulador interno (NCP1117). Conectar 12V al jack DC ya hace lo mismo, sin capacitores extra.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Cuánta corriente entrega un 7805 sin disipador?</summary>
        <p className="mt-2 text-sm">Depende de la diferencia Vin-Vout. Con Vin=7V/Vout=5V podés sacar ~500 mA sin disipador. Con Vin=12V solo ~200 mA antes del cutoff térmico.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Los buck converters sirven para audio?</summary>
        <p className="mt-2 text-sm">Sí, pero necesitás filtrado adicional (LC pasa-bajos a la salida) y mantener la frecuencia de conmutación lejos de la banda audible. Para preamps de alta fidelidad, mejor un LDO o lineal.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Necesito disipador para el LM2596?</summary>
        <p className="mt-2 text-sm">Hasta 2A casi nunca. Por arriba de eso conviene agregar un pequeño disipador adhesivo al chip o forzar circulación de aire.</p>
      </details>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión</h2>
      <p>
        La regla de oro: <strong className="text-foreground">si la diferencia entre Vin y Vout multiplicada por la corriente da más de 1 vatio, usá un buck converter</strong>. Si necesitás voltajes específicos no estándar, el LM317 es tu amigo. Para circuitos analógicos sensibles, los lineales y LDO siguen ganando.
      </p>
      <p>
        Antes de diseñar tu fuente, revisá los <Link to="/articulos/fuentes-de-alimentacion" className="text-primary hover:underline">tipos de fuentes de alimentación</Link> y aplicá la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline">Ley de Ohm</Link> para calcular potencias. Y siempre, siempre, validá las tensiones con el <Link to="/articulos/multimetro" className="text-primary hover:underline">multímetro</Link> antes de conectar tu microcontrolador.
      </p>
    </ArticleLayout>
  );
};

export default ReguladoresVoltaje;
