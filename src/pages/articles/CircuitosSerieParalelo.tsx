import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import circuitoImg from "@/assets/circuitos-serie-paralelo-diagram.jpg";

const CircuitosSerieParalelo = () => {
  return (
    <ArticleLayout
      title="Circuitos en Serie vs. Paralelo: Diferencias y Reglas Clave"
      subtitle="Domina las dos arquitecturas fundamentales de la electrónica: cómo se comportan el voltaje y la corriente en cada configuración."
      slug="circuitos-serie-paralelo"
    >
      {/* Diagrama técnico */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={circuitoImg} alt="Diagrama comparativo de circuitos en serie y en paralelo con resistencias, mostrando flujo de corriente y distribución de voltaje" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={576} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Comparación visual entre un circuito en serie (un solo camino) y un circuito en paralelo (múltiples ramas)</p>
      </div>

      <p>
        Cuando empiezas a conectar componentes en un protoboard, rápidamente te das cuenta de que hay más de una forma de unir los cables. La manera en que conectas tus resistencias, LEDs o baterías cambia por completo cómo se comporta la electricidad. Las dos arquitecturas fundamentales que debes dominar son los circuitos en serie y los circuitos en paralelo. Entender estas dos configuraciones es tan esencial como conocer la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline font-semibold">Ley de Ohm</Link>, ya que juntas forman la base de todo diseño electrónico.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos en Serie: Un solo camino</h2>
      <p>
        Imagina una carretera de un solo carril donde los autos van uno detrás del otro. En un circuito en serie, los componentes se conectan uno a continuación del otro. La electricidad sale de la batería, atraviesa el primer componente, luego el segundo, y así hasta volver a la fuente. No hay atajos ni caminos alternativos: toda la corriente pasa por todos los componentes sin excepción.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">La regla de la Corriente:</strong> ¡Es la misma en todo el circuito! Los electrones no tienen a dónde escapar, así que la corriente (Amperios) que pasa por el primer LED es exactamente la misma que pasa por el último. Matemáticamente: <span className="font-mono text-primary">I_total = I₁ = I₂ = I₃</span>.</li>
        <li><strong className="text-foreground">La regla del Voltaje:</strong> El voltaje se divide. Si tienes una batería de 9V y tres resistencias iguales en serie, cada una provocará una caída de tensión de 3V. La suma de todas las caídas de voltaje siempre es igual al voltaje de la fuente: <span className="font-mono text-primary">V_total = V₁ + V₂ + V₃</span>.</li>
        <li><strong className="text-foreground">El gran problema:</strong> Si un componente se quema o se desconecta (como las viejas luces del árbol de Navidad), el circuito se abre y nada funciona. Esta es la razón por la que las luces navideñas antiguas dejaban de funcionar completamente cuando se fundía una sola bombilla.</li>
      </ul>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Ejemplo práctico: Serie con LEDs</h3>
      <p>
        Supongamos que quieres encender 3 LEDs rojos en serie con una fuente de 12V. Cada LED rojo tiene una caída de voltaje de aproximadamente 2V y necesita 20mA. Los 3 LEDs consumen: <span className="font-mono text-primary">3 × 2V = 6V</span>. El voltaje sobrante que debe caer en la resistencia: <span className="font-mono text-primary">12V - 6V = 6V</span>. La resistencia necesaria: <span className="font-mono text-primary">R = 6V / 0.020A = 300Ω</span>. Usarías una resistencia comercial de <strong className="text-foreground">330Ω</strong>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos en Paralelo: Múltiples rutas</h2>
      <p>
        Ahora imagina una autopista de varios carriles. En un circuito en paralelo, los componentes están conectados en ramas separadas. Los electrones llegan a un nodo (una intersección) y deciden qué camino tomar. Cada rama es un camino independiente entre los mismos dos puntos del circuito.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">La regla del Voltaje:</strong> ¡Es el mismo en todas las ramas! Si conectas tres LEDs en paralelo a una fuente de 5V, los tres LEDs recibirán exactamente 5V. <span className="font-mono text-primary">V_total = V₁ = V₂ = V₃</span>.</li>
        <li><strong className="text-foreground">La regla de la Corriente:</strong> La corriente total se divide entre las diferentes ramas. Por donde haya menos resistencia, fluirá más corriente. La suma de las corrientes de cada rama es igual a la corriente total: <span className="font-mono text-primary">I_total = I₁ + I₂ + I₃</span>.</li>
        <li><strong className="text-foreground">La gran ventaja:</strong> Si un componente de una rama se quema, los demás seguirán funcionando perfectamente porque tienen su propio camino directo hacia la batería. Así es como están conectados los enchufes y las luces de tu casa.</li>
      </ul>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Ejemplo práctico: Paralelo con LEDs</h3>
      <p>
        Si conectas 3 LEDs verdes en paralelo a una fuente de 5V, cada LED necesita su propia resistencia. Para un LED verde (caída de 2.1V, corriente de 20mA): <span className="font-mono text-primary">R = (5V - 2.1V) / 0.020A = 145Ω</span>. Usarías <strong className="text-foreground">150Ω por cada LED</strong>. La corriente total que entregará la fuente: <span className="font-mono text-primary">3 × 20mA = 60mA</span>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Fórmulas rápidas para Resistencias</h2>
      <p>
        Si necesitas sumar resistencias en tu taller, la matemática cambia según cómo las conectes:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Configuración</th>
              <th className="px-4 py-2 text-left font-mono">Fórmula</th>
              <th className="px-4 py-2 text-left font-mono">Ejemplo</th>
              <th className="px-4 py-2 text-left font-mono">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Serie</td>
              <td className="px-4 py-2 font-mono">R_total = R1 + R2 + R3</td>
              <td className="px-4 py-2">100Ω + 220Ω + 330Ω</td>
              <td className="px-4 py-2 font-bold">650Ω</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Paralelo</td>
              <td className="px-4 py-2 font-mono">1/R = 1/R1 + 1/R2</td>
              <td className="px-4 py-2">1/100 + 1/100</td>
              <td className="px-4 py-2 font-bold">50Ω</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong className="text-foreground">Truco rápido para dos resistencias en paralelo:</strong> Puedes usar la fórmula simplificada <span className="font-mono text-primary">R_total = (R1 × R2) / (R1 + R2)</span>. Por ejemplo, dos resistencias de 100Ω y 220Ω en paralelo: <span className="font-mono text-primary">(100 × 220) / (100 + 220) = 22000 / 320 ≈ 68.75Ω</span>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos mixtos (Serie-Paralelo)</h2>
      <p>
        En la práctica, la mayoría de los circuitos reales son <strong className="text-foreground">combinaciones de serie y paralelo</strong>. Por ejemplo, en un circuito con múltiples LEDs, cada LED tiene su resistencia en serie (para limitar la corriente), pero los conjuntos LED+resistencia están conectados en paralelo entre sí. Para resolver estos circuitos:
      </p>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li>Identifica los grupos que están en serie y los que están en paralelo</li>
        <li>Simplifica los grupos en paralelo a una sola resistencia equivalente</li>
        <li>Suma las resistencias equivalentes que quedaron en serie</li>
        <li>Aplica la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline font-semibold">Ley de Ohm</Link> al circuito simplificado</li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Aplicaciones en el mundo real</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Baterías en serie:</strong> Dos pilas AA de 1.5V en serie dan 3V. Los packs de baterías de laptops usan celdas en serie para aumentar el voltaje.</li>
        <li><strong className="text-foreground">Baterías en paralelo:</strong> Dos baterías de 3.7V en paralelo siguen dando 3.7V, pero duplican la capacidad (mAh) y la corriente disponible.</li>
        <li><strong className="text-foreground">Paneles solares:</strong> Se conectan en serie para aumentar voltaje o en paralelo para aumentar corriente, según las necesidades del inversor.</li>
        <li><strong className="text-foreground">Tiras LED:</strong> Los LEDs se agrupan en series de 3 (con resistencia) y luego estos grupos se conectan en paralelo a lo largo de la tira.</li>
        <li><strong className="text-foreground">Instalaciones eléctricas del hogar:</strong> Todos los enchufes están en paralelo (220V en cada uno), pero el interruptor de cada habitación está en serie con las luces.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión Práctica</h2>
      <p>
        Nunca conectes LEDs directamente en paralelo a una sola resistencia, ya que las pequeñas diferencias de fabricación harán que uno consuma más corriente que el otro y termine quemándose. Dale a cada LED su propia resistencia en su propia rama paralela. Para calcular el valor exacto, ¡recuerda usar la <Link to="/" className="text-primary hover:underline font-semibold">calculadora principal de ElectroLab Pro</Link>!
      </p>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🔬 Kit de resistencias y LEDs para practicar</p>
        <p className="text-muted-foreground text-sm">
          Practica circuitos serie y paralelo con kits de componentes surtidos.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+resistencias+leds+electronica&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default CircuitosSerieParalelo;
