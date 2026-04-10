import ArticleLayout from "@/pages/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import osciloscopioImg from "@/assets/osciloscopio.jpg";

const Osciloscopio = () => {
  return (
    <ArticleLayout
      title="Osciloscopio: Guía Completa para Principiantes"
      subtitle="Aprende qué es un osciloscopio, cómo funciona, cómo leer señales eléctricas y qué modelo elegir según tu presupuesto y nivel."
      slug="osciloscopio"
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

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">📊 Consigue tu primer osciloscopio</p>
        <p className="text-muted-foreground text-sm">
          Osciloscopios digitales y portátiles para empezar a analizar señales electrónicas en tus proyectos.
        </p>
        <a
          href="https://www.amazon.es/s?k=osciloscopio+digital+electronica&tag=electrolabpro-21"
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
