import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";

const Multimetro = () => {
  return (
    <ArticleLayout
      title="Guía Práctica: Cómo Usar un Multímetro Digital sin Quemarlo"
      subtitle="Aprende las 3 mediciones esenciales, la regla de seguridad número 1 y cómo elegir un buen tester para tu laboratorio."
      slug="multimetro"
    >
      <p>
        El multímetro (o tester) es la extensión de los ojos de cualquier técnico o ingeniero. Dado que no podemos ver los electrones fluyendo por los cables, esta herramienta es la única forma de saber qué está pasando realmente en nuestro circuito. Aprender a usarlo correctamente es el primer paso para dejar de adivinar y empezar a diagnosticar fallas de verdad.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Las 3 mediciones esenciales</h2>
      <p>
        Aunque los multímetros modernos traen decenas de funciones, el 99% del tiempo en el laboratorio usarás solo estas tres:
      </p>

      <h2 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">1. Medir Voltaje (Tensión)</h2>
      <p>
        <strong className="text-foreground">Símbolo:</strong> Una "V" con una línea recta (corriente continua/baterías) o una "V" con una línea ondulada (corriente alterna/enchufes).
      </p>
      <p>
        <strong className="text-foreground">Cómo se mide:</strong> ¡En paralelo! Pones la punta negra en el negativo (GND) y la punta roja en el punto que quieres medir, sin desconectar el circuito.
      </p>
      <p>
        <strong className="text-primary">Tip de oro:</strong> Si no sabes cuánto voltaje vas a medir, pon siempre la rueda del multímetro en la escala más alta. Si mides una batería de 12V con el multímetro puesto en la escala de 2V, la pantalla mostrará un "1" o "OL" (Overload), y si es un tester barato, podrías quemar su fusible interno.
      </p>

      <h2 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">2. Medir Resistencia (Ohmios)</h2>
      <p>
        <strong className="text-foreground">Símbolo:</strong> La letra griega Omega (Ω).
      </p>
      <p>
        <strong className="text-foreground">Cómo se mide:</strong> ¡Con el circuito apagado! Nunca midas resistencia con la placa conectada a la energía. Colocas una punta en cada extremo del componente.
      </p>
      <p>
        <strong className="text-foreground">El detalle:</strong> Si mides una resistencia mientras está soldada a la placa, la medición puede dar un valor incorrecto porque la electricidad de la batería interna del multímetro viajará por otros caminos del circuito. Para una lectura exacta, debes desoldar al menos una de las patas del componente.
      </p>

      <h2 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">3. Prueba de Continuidad (El famoso "pitido")</h2>
      <p>
        <strong className="text-foreground">Símbolo:</strong> Un ícono que parece la señal de WiFi o un diodo con ondas de sonido.
      </p>
      <p>
        <strong className="text-foreground">Cómo se usa:</strong> Es la función favorita de todo técnico. El multímetro emite un pitido agudo si hay un camino eléctrico directo y sin resistencia entre la punta roja y la negra.
      </p>
      <p>
        <strong className="text-foreground">¿Para qué sirve?:</strong> Para buscar cables cortados por dentro, pistas rotas en una placa de circuito impreso, o para confirmar que una soldadura quedó bien hecha uniendo dos puntos.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La regla de seguridad número 1: Medir Corriente (Amperios)</h2>
      <p>
        <strong className="text-foreground">Símbolo:</strong> Una "A" con una línea recta o punteada.
      </p>
      <p>
        <strong className="text-foreground">El peligro:</strong> Medir corriente es peligroso porque el multímetro debe colocarse en serie. Esto significa que tienes que cortar el cable del circuito y usar el multímetro como si fuera un puente para que toda la electricidad pase por dentro de él.
      </p>
      <p>
        Si intentas medir corriente conectando las puntas en paralelo (como haces al medir voltaje), crearás un <strong className="text-destructive">cortocircuito brutal</strong> que derretirá las puntas de prueba o quemará el fusible interno del equipo al instante. ¡Mucho cuidado!
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Herramientas de calidad</h2>
      <p>
        Un buen multímetro te durará toda la vida. Si estás armando tu taller, te recomendamos buscar modelos "Autorango" (que eligen la escala automáticamente) de marcas reconocidas. Puedes revisar nuestra sección de "Herramientas Pro" en la <Link to="/" className="text-primary hover:underline font-semibold">página principal</Link> para ver el equipamiento que usamos en ElectroLab Pro.
      </p>
    </ArticleLayout>
  );
};

export default Multimetro;
