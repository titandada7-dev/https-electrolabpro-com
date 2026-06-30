import ArticleLayout from "@/pages/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import fuenteImg from "@/assets/fuente-alimentacion-diagram.jpg";

const FuentesAlimentacion = () => {
  return (
    <ArticleLayout
      title="Fuentes de Alimentación: Tipos, Funcionamiento y Cálculos"
      subtitle="Guía completa sobre fuentes de alimentación en electrónica: reguladas, conmutadas, lineales. Aprende a elegir y calcular la fuente correcta para tu proyecto."
      slug="fuentes-de-alimentacion"
      schemaType="TechArticle"
      proficiencyLevel="Beginner"
    >
      {/* Diagrama de fuente de alimentación */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={fuenteImg} alt="Diagrama de bloques de una fuente de alimentación lineal: transformador, rectificador, filtro y regulador" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={512} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Etapas de una fuente lineal — desde AC hasta DC regulado</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es una fuente de alimentación?</h2>
      <p>
        Una <strong className="text-foreground">fuente de alimentación</strong> es un dispositivo que convierte la energía eléctrica de la red (220V/110V AC) en un voltaje adecuado para tus circuitos electrónicos, típicamente <strong className="text-foreground">voltaje DC (corriente continua)</strong> de 3.3V, 5V, 9V, 12V u otros valores.
      </p>
      <p>
        Sin una fuente de alimentación adecuada, tus circuitos pueden funcionar erráticamente, sobrecalentarse o directamente destruirse. Elegir la fuente correcta es tan importante como diseñar el circuito mismo.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tipos de fuentes de alimentación</h2>
      
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">1. Fuente lineal</h3>
      <p>
        Usa un <strong className="text-foreground">transformador</strong> para reducir el voltaje AC, un <strong className="text-foreground">puente de diodos</strong> para rectificarlo, un <strong className="text-foreground">condensador</strong> para filtrarlo y un <strong className="text-foreground">regulador de voltaje</strong> (como el LM7805) para estabilizarlo.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Ventajas</strong>: Bajo ruido, diseño simple, excelente regulación</li>
        <li><strong className="text-foreground">Desventajas</strong>: Pesada, voluminosa, baja eficiencia (40-60%), genera calor</li>
        <li><strong className="text-foreground">Uso típico</strong>: Audio, equipos de laboratorio, circuitos sensibles al ruido</li>
      </ul>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">2. Fuente conmutada (SMPS)</h3>
      <p>
        Funciona conmutando a alta frecuencia (50-500 kHz) un transistor para controlar la energía transferida. Es la tecnología que usan los cargadores de celular, fuentes de PC y adaptadores modernos.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Ventajas</strong>: Alta eficiencia (80-95%), compacta, ligera</li>
        <li><strong className="text-foreground">Desventajas</strong>: Genera ruido eléctrico (EMI), diseño más complejo</li>
        <li><strong className="text-foreground">Uso típico</strong>: Cargadores, fuentes de PC, proyectos con LED, IoT</li>
      </ul>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">3. Fuente de laboratorio (ajustable)</h3>
      <p>
        Permite ajustar el voltaje y la corriente de salida manualmente. Esencial para cualquier banco de trabajo de electrónica.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Ventajas</strong>: Voltaje y corriente ajustables, protección contra cortocircuito</li>
        <li><strong className="text-foreground">Características típicas</strong>: 0-30V, 0-5A, display digital, modo CC/CV</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Reguladores de voltaje lineales</h2>
      <p>
        Los reguladores lineales de la familia <strong className="text-foreground">78xx</strong> son los más usados en electrónica básica:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Modelo</th>
              <th className="px-4 py-2 text-left font-mono">Voltaje salida</th>
              <th className="px-4 py-2 text-left font-mono">Corriente máx.</th>
              <th className="px-4 py-2 text-left font-mono">Vin mínimo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LM7805</td>
              <td className="px-4 py-2">5V</td>
              <td className="px-4 py-2">1A</td>
              <td className="px-4 py-2">7V</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LM7809</td>
              <td className="px-4 py-2">9V</td>
              <td className="px-4 py-2">1A</td>
              <td className="px-4 py-2">11V</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LM7812</td>
              <td className="px-4 py-2">12V</td>
              <td className="px-4 py-2">1A</td>
              <td className="px-4 py-2">14V</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LM317</td>
              <td className="px-4 py-2">1.25V - 37V (ajustable)</td>
              <td className="px-4 py-2">1.5A</td>
              <td className="px-4 py-2">Vout + 3V</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">AMS1117-3.3</td>
              <td className="px-4 py-2">3.3V</td>
              <td className="px-4 py-2">1A</td>
              <td className="px-4 py-2">4.5V</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong className="text-foreground">Regla del dropout:</strong> El voltaje de entrada debe ser al menos <span className="font-mono text-primary">2-3V mayor</span> que el voltaje de salida. La diferencia se disipa como calor: <span className="font-mono text-primary">P = (Vin - Vout) × I</span>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo calcular la potencia necesaria</h2>
      <p>
        Para elegir la fuente correcta, necesitas saber cuánta <strong className="text-foreground">potencia</strong> consume tu circuito:
      </p>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Suma la corriente de todos los componentes: <span className="font-mono text-primary">I_total = I₁ + I₂ + I₃ + ...</span></li>
        <li>Multiplica por el voltaje: <span className="font-mono text-primary">P = V × I_total</span></li>
        <li>Agrega un margen de seguridad del <span className="font-mono text-primary">20-30%</span></li>
      </ol>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Ejemplo práctico</h3>
      <p>
        Un proyecto con Arduino UNO (50mA), 5 LEDs (20mA c/u), un servo (200mA) y un sensor (10mA):
      </p>
      <p>
        <span className="font-mono text-primary">I_total = 50 + 100 + 200 + 10 = 360mA</span><br/>
        <span className="font-mono text-primary">P = 5V × 0.36A = 1.8W</span><br/>
        Con margen: <span className="font-mono text-primary">1.8W × 1.3 = 2.34W</span>. Una fuente de 5V/1A (5W) sería más que suficiente.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Baterías en electrónica</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Tipo</th>
              <th className="px-4 py-2 text-left font-mono">Voltaje</th>
              <th className="px-4 py-2 text-left font-mono">Recargable</th>
              <th className="px-4 py-2 text-left font-mono">Uso común</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Pila AA/AAA</td>
              <td className="px-4 py-2">1.5V</td>
              <td className="px-4 py-2">No (alcalinas)</td>
              <td className="px-4 py-2">Controles, sensores</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Li-Ion 18650</td>
              <td className="px-4 py-2">3.7V (nom)</td>
              <td className="px-4 py-2">Sí</td>
              <td className="px-4 py-2">Proyectos portátiles, linternas</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LiPo</td>
              <td className="px-4 py-2">3.7V (por celda)</td>
              <td className="px-4 py-2">Sí</td>
              <td className="px-4 py-2">Drones, robots, wearables</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">9V (PP3)</td>
              <td className="px-4 py-2">9V</td>
              <td className="px-4 py-2">No</td>
              <td className="px-4 py-2">Prototipos, alarmas</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Protecciones esenciales</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Fusible</strong>: Protege contra cortocircuitos. Siempre coloca uno en la entrada</li>
        <li><strong className="text-foreground">Diodo de protección</strong>: Un diodo 1N4007 en serie previene daños por polaridad inversa</li>
        <li><strong className="text-foreground">Condensadores de desacoplo</strong>: Coloca un condensador de <span className="font-mono text-primary">100nF</span> cerca de cada IC para filtrar ruido</li>
        <li><strong className="text-foreground">Regulador de voltaje</strong>: Estabiliza el voltaje ante variaciones de la fuente o la carga</li>
        <li><strong className="text-foreground">Disipador de calor</strong>: Necesario si el regulador lineal disipa más de 1W</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores comunes</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Fuente subdimensionada</strong>: Usar una fuente que entrega menos corriente de la necesaria causa caídas de voltaje y reinicios</li>
        <li><strong className="text-foreground">No filtrar el ruido</strong>: Olvidar los condensadores de filtrado causa comportamiento errático en microcontroladores</li>
        <li><strong className="text-foreground">Mezclar tierras</strong>: Todos los módulos del circuito deben compartir la misma referencia GND</li>
        <li><strong className="text-foreground">Ignorar la disipación térmica</strong>: Un regulador 7805 con 12V de entrada y 500mA disipa <span className="font-mono text-primary">(12-5) × 0.5 = 3.5W</span> de calor</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos prácticos</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Para prototipos en protoboard, usa una fuente de laboratorio ajustable</li>
        <li>Siempre mide el voltaje de salida con un multímetro antes de conectar tu circuito</li>
        <li>Para proyectos finales, prefiere módulos buck (step-down) como el <span className="font-mono text-primary">LM2596</span> por su eficiencia</li>
        <li>Separa la alimentación de motores/relés de la de microcontroladores</li>
        <li>Usa cables de sección adecuada para corrientes altas</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Etapas internas de una fuente lineal: análisis profundo</h2>
      <p>
        Para entender cómo funciona realmente una fuente lineal, conviene analizar cada etapa por separado. La conversión de 220V AC a un voltaje DC estable involucra cuatro bloques bien definidos:
      </p>
      <ol className="list-decimal list-inside space-y-3 pl-2">
        <li><strong className="text-foreground">Transformación:</strong> Un transformador con núcleo de hierro reduce la tensión de red (220V o 110V) a un valor manejable, típicamente entre 6V y 24V AC. La relación de transformación N₁/N₂ = V₁/V₂ define la salida. Por ejemplo, un transformador 220:12 tiene una relación de 18,33. Es importante tener en cuenta que el voltaje en el secundario es el valor RMS; el pico instantáneo es V_pico = V_RMS × √2.</li>
        <li><strong className="text-foreground">Rectificación:</strong> Un puente de diodos (4 diodos en configuración Graetz) convierte la corriente alterna en pulsante. La salida ya no cambia de polaridad pero todavía oscila entre 0 y V_pico - 1.4V (los 1.4V son la caída en dos diodos). Cada diodo debe soportar al menos PIV = 2 × V_pico de tensión inversa.</li>
        <li><strong className="text-foreground">Filtrado:</strong> Un condensador electrolítico de gran capacidad (típicamente 1.000 μF a 10.000 μF) suaviza la señal pulsante. La fórmula práctica para calcular el rizado es <span className="font-mono text-primary">V_rizado = I_carga / (2 × f × C)</span>, donde f es 100 Hz para rectificación de onda completa en 50 Hz. Para 1A de carga y 4.700μF: V_rizado = 1 / (2 × 100 × 0.0047) = 1,06V pico-pico.</li>
        <li><strong className="text-foreground">Regulación:</strong> Un regulador lineal (78xx, LM317, etc.) absorbe las variaciones residuales y mantiene la salida constante. Internamente es un transistor en serie controlado por un lazo de retroalimentación que compara la salida con una referencia interna (típicamente un diodo Zener de banda prohibida o "bandgap").</li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cálculo térmico de un regulador lineal: ejemplo paso a paso</h2>
      <p>
        Imaginá un proyecto donde necesitás 5V/500mA desde una fuente de 12V usando un LM7805. Vamos a verificar si necesita disipador y de qué tamaño:
      </p>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Potencia disipada:</strong> P = (Vin - Vout) × I = (12 - 5) × 0.5 = <span className="font-mono text-primary">3.5W</span>. Toda esa energía se convierte en calor en el encapsulado del regulador.</li>
        <li><strong className="text-foreground">Temperatura máxima de unión:</strong> El LM7805 tiene Tj_max = 125°C. Trabajaremos con un margen, apuntando a 100°C como máximo en operación.</li>
        <li><strong className="text-foreground">Resistencia térmica sin disipador:</strong> El TO-220 al aire libre tiene θJA ≈ 50°C/W. Con 3.5W: ΔT = 3.5 × 50 = 175°C sobre la temperatura ambiente. A 25°C ambiente, la unión llegaría a 200°C → <strong>destrucción inmediata</strong>.</li>
        <li><strong className="text-foreground">Con disipador adecuado:</strong> Necesitamos θJA total ≤ (100 - 25) / 3.5 = 21°C/W. Como θJC del LM7805 es ~5°C/W y el contacto encapsulado-disipador suma ~1°C/W, el disipador debe tener θSA ≤ 15°C/W. Un disipador de aluminio de 30×30×15mm cumple este requisito.</li>
      </ol>
      <p>
        Por estos cálculos, en cargas mayores a 200-300mA con diferencias de voltaje altas conviene siempre usar reguladores conmutados (buck) en lugar de lineales: un módulo LM2596 con eficiencia del 92% disiparía solo 0.3W en lugar de 3.5W para la misma carga.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Topologías de fuentes conmutadas (SMPS) explicadas</h2>
      <p>
        Las fuentes conmutadas modernas se clasifican según su topología. Cada una tiene ventajas para distintas aplicaciones:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Buck (reductor):</strong> Convierte un voltaje DC alto en uno menor. Eficiencia 90-97%. Usado en alimentación de microprocesadores (12V → 1.2V), cargadores USB-PD, módulos LM2596.</li>
        <li><strong className="text-foreground">Boost (elevador):</strong> Sube el voltaje. Usado en linternas LED de batería única (1.5V → 3.3V), backlights de LCD, paneles solares pequeños. Ejemplo: módulo MT3608.</li>
        <li><strong className="text-foreground">Buck-Boost:</strong> Permite Vout mayor o menor que Vin. Crítico cuando la batería se descarga (por ejemplo Li-Ion de 4.2V a 3.0V alimentando un sistema de 3.3V). Chips típicos: TPS63020.</li>
        <li><strong className="text-foreground">Flyback:</strong> Topología aislada con un único transformador. Usada en cargadores de celular y fuentes de 5W-100W. Ejemplos: TNY264, UC3842.</li>
        <li><strong className="text-foreground">Push-Pull / Half-Bridge / Full-Bridge:</strong> Topologías para alta potencia (200W+). Usadas en fuentes ATX de PC, fuentes industriales, soldadoras inverter.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo medir el rizado real de tu fuente</h2>
      <p>
        El rizado (ripple) es la pequeña oscilación de voltaje superpuesta a la salida DC. Una fuente de mala calidad puede tener rizado de 100-300mVpp, suficiente para causar problemas en circuitos analógicos sensibles, audio o radio. Para medirlo:
      </p>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li>Colocá el osciloscopio en acoplamiento <strong className="text-foreground">AC</strong> (importante: si usás DC, vas a ver solo el offset constante).</li>
        <li>Configurá la escala vertical en 10-50 mV/div.</li>
        <li>Conectá la sonda directamente a los pines de salida con la masa lo más corta posible (idealmente cable de 5cm).</li>
        <li>Para una fuente lineal bien diseñada deberías ver menos de 10mVpp; una conmutada típica muestra 30-100mVpp con picos de conmutación a 50-500 kHz.</li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Preguntas frecuentes sobre fuentes</h2>
      <details className="border border-border rounded-lg p-4 bg-card/30">
        <summary className="font-semibold text-foreground cursor-pointer">¿Puedo conectar dos fuentes de 5V en paralelo para duplicar la corriente?</summary>
        <p className="mt-3 text-sm">No directamente. Pequeñas diferencias de voltaje entre ambas fuentes harán que una "absorba" corriente de la otra, pudiendo dañarlas. Necesitás diodos de aislación (Schottky) en serie con cada salida o fuentes diseñadas específicamente para "current sharing" (como las fuentes de servidor con función droop).</p>
      </details>
      <details className="border border-border rounded-lg p-4 bg-card/30 mt-3">
        <summary className="font-semibold text-foreground cursor-pointer">¿Por qué mi fuente "zumba" o emite ruido audible?</summary>
        <p className="mt-3 text-sm">El zumbido a 50/100 Hz suele venir de laminaciones flojas del transformador (típico en fuentes lineales viejas). Un silbido agudo a 10-20 kHz es normal en fuentes conmutadas baratas: el transformador o inductor vibra a la frecuencia de conmutación. No es peligroso, pero indica componentes de baja calidad.</p>
      </details>
      <details className="border border-border rounded-lg p-4 bg-card/30 mt-3">
        <summary className="font-semibold text-foreground cursor-pointer">¿Es seguro alimentar mi Arduino directamente desde un cargador de celular?</summary>
        <p className="mt-3 text-sm">Sí, siempre que sea un cargador certificado (5V±5%, mínimo 1A). Cargadores muy baratos sin certificación pueden tener picos de hasta 6.5V o rizado excesivo que dañe el regulador interno del Arduino. Para proyectos serios, preferí siempre fuentes con marcas reconocidas (Mean Well, Phihong) o un cargador genuino de marca.</p>
      </details>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">⚡ Equipa tu laboratorio con la fuente correcta</p>
        <p className="text-muted-foreground text-sm">
          Fuentes de alimentación regulables, módulos buck y reguladores de voltaje para tus proyectos electrónicos.
        </p>
        <a
          href="https://www.amazon.es/s?k=fuente+alimentacion+laboratorio+regulable&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver fuentes en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default FuentesAlimentacion;
