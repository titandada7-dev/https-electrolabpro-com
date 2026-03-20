import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";

const CircuitosSerieParalelo = () => {
  return (
    <ArticleLayout
      title="Circuitos en Serie vs. Paralelo: Diferencias y Reglas Clave"
      subtitle="Domina las dos arquitecturas fundamentales de la electrónica: cómo se comportan el voltaje y la corriente en cada configuración."
      slug="circuitos-serie-paralelo"
    >
      <p>
        Cuando empiezas a conectar componentes en un protoboard, rápidamente te das cuenta de que hay más de una forma de unir los cables. La manera en que conectas tus resistencias, LEDs o baterías cambia por completo cómo se comporta la electricidad. Las dos arquitecturas fundamentales que debes dominar son los circuitos en serie y los circuitos en paralelo.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos en Serie: Un solo camino</h2>
      <p>
        Imagina una carretera de un solo carril donde los autos van uno detrás del otro. En un circuito en serie, los componentes se conectan uno a continuación del otro. La electricidad sale de la batería, atraviesa el primer componente, luego el segundo, y así hasta volver a la fuente.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">La regla de la Corriente:</strong> ¡Es la misma en todo el circuito! Los electrones no tienen a dónde escapar, así que la corriente (Amperios) que pasa por el primer LED es exactamente la misma que pasa por el último.</li>
        <li><strong className="text-foreground">La regla del Voltaje:</strong> El voltaje se divide. Si tienes una batería de 9V y tres resistencias iguales en serie, cada una provocará una caída de tensión de 3V.</li>
        <li><strong className="text-foreground">El gran problema:</strong> Si un componente se quema o se desconecta (como las viejas luces del árbol de Navidad), el circuito se abre y nada funciona.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos en Paralelo: Múltiples rutas</h2>
      <p>
        Ahora imagina una autopista de varios carriles. En un circuito en paralelo, los componentes están conectados en ramas separadas. Los electrones llegan a un nodo (una intersección) y deciden qué camino tomar.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">La regla del Voltaje:</strong> ¡Es el mismo en todas las ramas! Si conectas tres LEDs en paralelo a una fuente de 5V, los tres LEDs recibirán exactamente 5V.</li>
        <li><strong className="text-foreground">La regla de la Corriente:</strong> La corriente total se divide entre las diferentes ramas. Por donde haya menos resistencia, fluirá más corriente.</li>
        <li><strong className="text-foreground">La gran ventaja:</strong> Si un componente de una rama se quema, los demás seguirán funcionando perfectamente porque tienen su propio camino directo hacia la batería. Así es como están conectados los enchufes y las luces de tu casa.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Fórmulas rápidas para Resistencias</h2>
      <p>
        Si necesitas sumar resistencias en tu taller, la matemática cambia según cómo las conectes:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Resistencias en Serie:</strong> Simplemente se suman. <span className="font-mono text-primary">R_total = R1 + R2 + R3</span> (Ideal para cuando necesitas una resistencia más grande de la que tienes).</li>
        <li><strong className="text-foreground">Resistencias en Paralelo:</strong> El cálculo es inverso. El valor total siempre será menor que la resistencia más pequeña del grupo. <span className="font-mono text-primary">1/R_total = 1/R1 + 1/R2 + 1/R3</span> (Útil para disipar calor o lograr valores de resistencia muy bajos).</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión Práctica</h2>
      <p>
        Nunca conectes LEDs directamente en paralelo a una sola resistencia, ya que las pequeñas diferencias de fabricación harán que uno consuma más corriente que el otro y termine quemándose. Dale a cada LED su propia resistencia en su propia rama paralela. Para calcular el valor exacto, ¡recuerda usar la <Link to="/" className="text-primary hover:underline font-semibold">calculadora principal de ElectroLab Pro</Link>!
      </p>
    </ArticleLayout>
  );
};

export default CircuitosSerieParalelo;
