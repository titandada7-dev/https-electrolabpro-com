import ArticleLayout from "@/pages/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import osciloscopioImg from "@/assets/osciloscopio.jpg";

const Osciloscopio = () => {
  return (
    <ArticleLayout
      title="Osciloscopio: Guía Completa para Principiantes"
      subtitle="Aprende qué es un osciloscopio, cómo funciona, cómo leer señales eléctricas y qué modelo elegir según tu presupuesto y nivel."
      slug="osciloscopio"
      schemaType="TechArticle"
      proficiencyLevel="Beginner"
    >
      {/* Imagen del osciloscopio */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={osciloscopioImg} alt="Osciloscopio digital mostrando formas de onda en pantalla" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Osciloscopio digital — visualización de señales eléctricas en tiempo real</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es un osciloscopio?</h2>
      <p>
        El <strong className="text-foreground">osciloscopio</strong> es uno de los instrumentos más importantes en electrónica. A diferencia del multímetro, que muestra valores numéricos estáticos, el osciloscopio te permite <strong className="text-foreground">visualizar señales eléctricas en tiempo real</strong> como formas de onda en una pantalla.
      </p>
      <p>
        Muestra cómo varía el voltaje a lo largo del tiempo, lo que te permite analizar frecuencias, tiempos de subida, ruido, distorsión y comportamiento de circuitos que un multímetro simplemente no puede detectar.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Para qué sirve un osciloscopio?</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Medir frecuencia y período</strong> de señales AC, PWM, relojes digitales</li>
        <li><strong className="text-foreground">Detectar ruido eléctrico</strong> en fuentes de alimentación y señales analógicas</li>
        <li><strong className="text-foreground">Analizar comunicaciones</strong>: UART, SPI, I2C, señales de sensores</li>
        <li><strong className="text-foreground">Depurar circuitos</strong>: verificar que las señales llegan donde deben</li>
        <li><strong className="text-foreground">Medir tiempos de respuesta</strong>: rebote de botones, retardos de propagación</li>
        <li><strong className="text-foreground">Verificar señales PWM</strong>: ciclo de trabajo, frecuencia y forma de onda</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tipos de osciloscopio</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Tipo</th>
              <th className="px-4 py-2 text-left font-mono">Ventajas</th>
              <th className="px-4 py-2 text-left font-mono">Precio aprox.</th>
              <th className="px-4 py-2 text-left font-mono">Ideal para</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Digital (DSO)</td>
              <td className="px-4 py-2">Captura y almacena señales, pantalla LCD</td>
              <td className="px-4 py-2">$50-$500</td>
              <td className="px-4 py-2">Principiantes y uso general</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">USB/PC</td>
              <td className="px-4 py-2">Compacto, usa la pantalla del PC</td>
              <td className="px-4 py-2">$20-$200</td>
              <td className="px-4 py-2">Hobbyistas, portabilidad</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Analógico</td>
              <td className="px-4 py-2">Respuesta en tiempo real, tubo CRT</td>
              <td className="px-4 py-2">$100-$300 (usado)</td>
              <td className="px-4 py-2">Señales de audio, RF</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Portátil</td>
              <td className="px-4 py-2">Batería, pantalla integrada, compacto</td>
              <td className="px-4 py-2">$30-$150</td>
              <td className="px-4 py-2">Trabajo de campo</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Parámetros clave del osciloscopio</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Ancho de banda</strong>: La frecuencia máxima que puede medir con precisión. Para electrónica general, <span className="font-mono text-primary">50-100 MHz</span> es suficiente</li>
        <li><strong className="text-foreground">Tasa de muestreo</strong>: Cuántas muestras por segundo toma. Regla: al menos <span className="font-mono text-primary">5× el ancho de banda</span></li>
        <li><strong className="text-foreground">Número de canales</strong>: Cuántas señales puede mostrar simultáneamente (2 o 4 canales es lo más común)</li>
        <li><strong className="text-foreground">Profundidad de memoria</strong>: Cuántos puntos puede almacenar por captura</li>
        <li><strong className="text-foreground">Resolución vertical</strong>: Típicamente 8 bits (256 niveles de voltaje)</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Controles básicos del osciloscopio</h2>
      <p>
        Todo osciloscopio tiene tres grupos de controles principales:
      </p>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">1. Control vertical (Voltaje)</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Volts/Div</strong>: Escala vertical. Cada cuadro de la cuadrícula representa X voltios. Ejemplo: <span className="font-mono text-primary">1V/div</span> significa que cada cuadro = 1V</li>
        <li><strong className="text-foreground">Posición vertical</strong>: Desplaza la señal arriba/abajo en la pantalla</li>
        <li><strong className="text-foreground">Acoplamiento</strong>: DC (ve todo), AC (solo la parte alterna), GND (referencia)</li>
      </ul>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">2. Control horizontal (Tiempo)</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Time/Div</strong>: Escala horizontal. Cada cuadro = X tiempo. Ejemplo: <span className="font-mono text-primary">1ms/div</span></li>
        <li><strong className="text-foreground">Posición horizontal</strong>: Desplaza la señal izquierda/derecha</li>
      </ul>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">3. Trigger (Disparo)</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Nivel de trigger</strong>: El voltaje al cual el osciloscopio "captura" la señal</li>
        <li><strong className="text-foreground">Flanco</strong>: Subida (rising) o bajada (falling)</li>
        <li><strong className="text-foreground">Modo</strong>: Auto (captura continua), Normal (solo cuando se cumple el trigger), Single (una sola captura)</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo medir una señal paso a paso</h2>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Conecta la <strong className="text-foreground">sonda</strong> al punto de medición y la pinza de tierra a GND</li>
        <li>Presiona <strong className="text-foreground">Auto</strong> para que el osciloscopio ajuste automáticamente</li>
        <li>Ajusta <span className="font-mono text-primary">Volts/Div</span> hasta que la señal ocupe 2/3 de la pantalla vertical</li>
        <li>Ajusta <span className="font-mono text-primary">Time/Div</span> hasta ver 2-3 ciclos completos de la señal</li>
        <li>Usa los <strong className="text-foreground">cursores</strong> para medir voltaje pico a pico, frecuencia y período</li>
        <li>Activa las <strong className="text-foreground">mediciones automáticas</strong> para Vpp, frecuencia, duty cycle</li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Formas de onda comunes</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Forma de onda</th>
              <th className="px-4 py-2 text-left font-mono">Dónde la encontrarás</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Senoidal</td>
              <td className="px-4 py-2">Red eléctrica (50/60Hz), audio, osciladores</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Cuadrada</td>
              <td className="px-4 py-2">Señales digitales, relojes, PWM al 50%</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Triangular</td>
              <td className="px-4 py-2">Generadores de funciones, rampas de carga</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">PWM</td>
              <td className="px-4 py-2">Control de motores, LEDs, servos</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Ruido</td>
              <td className="px-4 py-2">Señal no deseada, interferencia electromagnética</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Sondas del osciloscopio</h2>
      <p>
        La <strong className="text-foreground">sonda</strong> es el cable que conecta el circuito al osciloscopio. Los tipos más comunes son:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Sonda pasiva 1×</strong>: Mide directamente. Para señales de baja frecuencia</li>
        <li><strong className="text-foreground">Sonda pasiva 10×</strong>: Atenúa la señal 10 veces pero mejora el ancho de banda y reduce la carga sobre el circuito. <em>Es la más usada</em></li>
        <li><strong className="text-foreground">Sonda de corriente</strong>: Mide corriente sin cortar el circuito (efecto Hall)</li>
      </ul>
      <p>
        <strong className="text-foreground">Importante:</strong> Siempre verifica que el selector de la sonda (1×/10×) coincida con la configuración del canal en el osciloscopio, o las lecturas estarán multiplicadas o divididas por 10.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos para principiantes</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Empieza midiendo señales conocidas: salida del Timer 555, PWM de Arduino</li>
        <li>Siempre conecta la pinza de tierra de la sonda antes de medir</li>
        <li>Usa el botón <strong className="text-foreground">Auto</strong> cuando no sepas qué esperar</li>
        <li>Practica con el modo de <strong className="text-foreground">trigger</strong> para estabilizar señales</li>
        <li>Un osciloscopio de 2 canales y 50MHz es más que suficiente para empezar</li>
        <li>Calibra las sondas periódicamente usando la señal de prueba del osciloscopio</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Especificaciones que sí importan al elegir osciloscopio</h2>
      <p>
        El mercado está saturado de modelos con marketing engañoso. Estas son las especificaciones que realmente determinan la utilidad de un osciloscopio para electrónica práctica:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Ancho de banda (BW):</strong> El parámetro más importante. Regla práctica: BW ≥ 5 × frecuencia máxima de la señal. Para Arduino (16MHz reloj, señales hasta ~8MHz) un osciloscopio de 50MHz alcanza. Para SPI/I2C de Raspberry Pi (50MHz+), necesitás 200MHz mínimo.</li>
        <li><strong className="text-foreground">Tasa de muestreo (Sa/s):</strong> Debe ser al menos 2.5 veces el ancho de banda según Nyquist. Un osciloscopio de 100 MHz necesita ≥ 250 MSa/s reales (no "equivalentes" o "interpolados").</li>
        <li><strong className="text-foreground">Profundidad de memoria:</strong> Determina cuánto tiempo podés capturar a alta velocidad. Con 1 Mpts a 1 GSa/s capturás 1 ms de señal continua; con 8 Kpts solo 8 μs. Para depurar protocolos serie largos, querés ≥ 24 Mpts.</li>
        <li><strong className="text-foreground">Velocidad de actualización (wfm/s):</strong> Eventos esporádicos son visibles solo si el osciloscopio refresca rápido. Modelos modernos: 50.000-1.000.000 wfm/s. Modelos antiguos: 100-1.000 wfm/s, suficientes solo para señales repetitivas.</li>
        <li><strong className="text-foreground">Decodificación de protocolos:</strong> Decodificar I2C, SPI, UART, CAN integrado ahorra horas de análisis manual. Vale la pena buscar modelos que lo incluyan de fábrica.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Mediciones avanzadas: ejemplos reales</h2>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">1. Medir ringing en una señal digital</h3>
      <p>
        Cuando un microcontrolador conmuta una salida rápidamente, las inductancias parásitas del PCB y las capacitancias generan oscilaciones amortiguadas (ringing) en los flancos. En el osciloscopio aparecen como "campanas" sobre el flanco de subida. Con cursores podés medir la frecuencia de oscilación (típicamente 50-300 MHz) y calcular las parásitas. Un ringing severo (mayor al 20% del voltaje) indica problemas de integridad de señal y puede causar fallos esporádicos.
      </p>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">2. Detectar glitches con trigger por pulso</h3>
      <p>
        El modo "Pulse Width Trigger" dispara solo cuando un pulso es más corto (o más largo) que un valor configurado. Esencial para cazar glitches: un pulso de 50 ns en una línea de reloj que normalmente tiene pulsos de 1 μs es invisible al ojo, pero el trigger lo captura instantáneamente y lo muestra estable en pantalla.
      </p>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">3. Decodificar I2C en tiempo real</h3>
      <p>
        Configurando el bus serie correctamente, el osciloscopio muestra la dirección, los datos y el ACK/NACK directamente sobre la forma de onda. Esto reemplaza el uso de un analizador lógico dedicado para depuración rápida y permite correlacionar la señal eléctrica (forma del flanco, niveles) con el contenido lógico.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores típicos que arruinan mediciones</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Lazo de tierra largo:</strong> Usar el cable cocodrilo de tierra de 15cm de la sonda agrega ~150 nH de inductancia. Esto arruina mediciones de señales rápidas: mostrará ringing inexistente. Para señales {">"}50 MHz, usá un resorte corto de tierra (~10 mm).</li>
        <li><strong className="text-foreground">Sonda 1× cuando se necesita 10×:</strong> Una sonda 1× tiene 1MΩ y ~50 pF de capacitancia, lo que carga el circuito y limita el ancho de banda a ~6 MHz. Una sonda 10× ofrece 10MΩ y ~12 pF, mucho menos invasiva.</li>
        <li><strong className="text-foreground">No compensar la sonda:</strong> Las sondas 10× tienen un trimmer de compensación. Si está mal ajustada, las ondas cuadradas se ven con sobreimpulso o redondeadas. Compensá siempre antes de medir, usando la salida de calibración del osciloscopio (1 kHz).</li>
        <li><strong className="text-foreground">Aliasing por subsampling:</strong> Si la base de tiempo está muy lenta para la señal, el osciloscopio muestra una frecuencia falsa más baja. Verificá siempre con autoset o subiendo la velocidad de muestreo.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Preguntas frecuentes</h2>
      <details className="border border-border rounded-lg p-4 bg-card/30">
        <summary className="font-semibold text-foreground cursor-pointer">¿Vale la pena un osciloscopio USB en lugar de uno de mesa?</summary>
        <p className="mt-3 text-sm">Para presupuesto limitado y trabajo en casa, sí: modelos como Hantek 6022BE o Owon VDS1022 ofrecen 20-25 MHz reales por menos de 100 USD. Las desventajas son: dependencia de PC, latencia mayor, ergonomía pobre. Para uso profesional o frecuente, un Rigol DS1054Z o similar (50 MHz hackeable a 100, USD 350-400) es mucho mejor inversión.</p>
      </details>
      <details className="border border-border rounded-lg p-4 bg-card/30 mt-3">
        <summary className="font-semibold text-foreground cursor-pointer">¿Puedo medir 220V de la red eléctrica con mi osciloscopio?</summary>
        <p className="mt-3 text-sm">Solo con sonda diferencial o transformador de aislación. <strong>NUNCA</strong> conectes la pinza de tierra de la sonda al neutro/fase: el chasis del osciloscopio está conectado a tierra, y harás un cortocircuito explosivo. Las sondas diferenciales (Pico TA041, Micsig DP10013) cuestan 200-500 USD pero son la forma segura de medir red eléctrica.</p>
      </details>
      <details className="border border-border rounded-lg p-4 bg-card/30 mt-3">
        <summary className="font-semibold text-foreground cursor-pointer">¿Diferencia entre osciloscopio analógico y digital?</summary>
        <p className="mt-3 text-sm">Los analógicos dibujan la señal directamente con un haz CRT, lo que da muy buena respuesta a señales raras y "feeling" del comportamiento. Los digitales muestrean y reconstruyen, ofreciendo mediciones automáticas, almacenamiento, decodificación y conectividad. Hoy los digitales dominan; los analógicos son piezas de colección o casos de nicho específicos.</p>
      </details>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">📊 Consigue tu primer osciloscopio</p>
        <p className="text-muted-foreground text-sm">
          Osciloscopios digitales y portátiles para empezar a analizar señales electrónicas en tus proyectos.
        </p>
        <a
          href="https://www.amazon.es/s?k=osciloscopio+digital+electronica&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver osciloscopios en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default Osciloscopio;
