import ArticleLayout from "@/pages/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import fuenteImg from "@/assets/fuente-alimentacion-diagram.jpg";

const FuentesAlimentacion = () => {
  return (
    <ArticleLayout
      title="Fuentes de Alimentación: Tipos, Funcionamiento y Cálculos"
      subtitle="Guía completa sobre fuentes de alimentación en electrónica: reguladas, conmutadas, lineales. Aprende a elegir y calcular la fuente correcta para tu proyecto."
      slug="fuentes-de-alimentacion"
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

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">⚡ Equipa tu laboratorio con la fuente correcta</p>
        <p className="text-muted-foreground text-sm">
          Fuentes de alimentación regulables, módulos buck y reguladores de voltaje para tus proyectos electrónicos.
        </p>
        <a
          href="https://www.amazon.es/s?k=fuente+alimentacion+laboratorio+regulable&tag=electrolabpro-21"
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
