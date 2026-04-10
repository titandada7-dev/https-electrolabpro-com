import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import multimetroImg from "@/assets/multimetro.jpg";

const Multimetro = () => {
  return (
    <ArticleLayout
      title="Guía de Diagnóstico y Reparación de Circuitos con Multímetro"
      subtitle="Aprende a usar tu multímetro para diagnosticar fallas reales en circuitos: pruebas de continuidad, medición de voltajes, prueba de semiconductores y errores comunes que debes evitar."
      slug="multimetro"
      datePublished="2026-03-01"
      dateModified="2026-04-10"
    >
      {/* Imagen del multímetro */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={multimetroImg} alt="Multímetro digital profesional para diagnóstico y medición de circuitos electrónicos" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Multímetro digital — herramienta imprescindible para diagnóstico de circuitos</p>
      </div>

      {/* ══════ INTRODUCCIÓN ══════ */}
      <p>
        En el mundo de la electrónica, el <strong className="text-foreground">multímetro</strong> es el mejor amigo del técnico. 
        No basta con tener uno; el verdadero valor está en saber cómo usarlo para <strong className="text-foreground">encontrar fallas reales</strong> en 
        placas de circuito impreso (PCB). Esta guía te enseñará un flujo de diagnóstico profesional paso a paso, desde la 
        inspección visual hasta la prueba de semiconductores.
      </p>
      <p>
        El multímetro (o tester) es la extensión de los ojos de cualquier técnico o ingeniero. Dado que no podemos ver los 
        electrones fluyendo por los cables, esta herramienta es la única forma de saber qué está pasando realmente en nuestro 
        circuito. Aprender a usarlo correctamente es el primer paso para dejar de adivinar y empezar a diagnosticar fallas de verdad.
      </p>

      {/* ══════ LAS 3 MEDICIONES ESENCIALES ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10">Las 3 Mediciones Esenciales</h2>
      <p>
        Aunque los multímetros modernos traen decenas de funciones, el 99% del tiempo en el laboratorio usarás solo estas tres:
      </p>

      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">1. Medir Voltaje (Tensión)</h3>
      <p>
        <strong className="text-foreground">Símbolo:</strong> Una "V" con una línea recta (corriente continua/baterías) o una "V" con una línea ondulada (corriente alterna/enchufes).
      </p>
      <p>
        <strong className="text-foreground">Cómo se mide:</strong> ¡En paralelo! Pones la punta negra en el negativo (GND) y la punta roja en el punto que quieres medir, sin desconectar el circuito.
      </p>
      <p>
        <strong className="text-primary">Tip de oro:</strong> Si no sabes cuánto voltaje vas a medir, pon siempre la rueda del multímetro en la escala más alta. Si mides una batería de 12V con el multímetro puesto en la escala de 2V, la pantalla mostrará un "1" o "OL" (Overload), y si es un tester barato, podrías quemar su fusible interno.
      </p>

      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">2. Medir Resistencia (Ohmios)</h3>
      <p>
        <strong className="text-foreground">Símbolo:</strong> La letra griega Omega (Ω).
      </p>
      <p>
        <strong className="text-foreground">Cómo se mide:</strong> ¡Con el circuito apagado! Nunca midas resistencia con la placa conectada a la energía. Colocas una punta en cada extremo del componente.
      </p>
      <p>
        <strong className="text-foreground">El detalle:</strong> Si mides una resistencia mientras está soldada a la placa, la medición puede dar un valor incorrecto porque la electricidad de la batería interna del multímetro viajará por otros caminos del circuito. Para una lectura exacta, debes desoldar al menos una de las patas del componente.
      </p>

      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">3. Prueba de Continuidad (El famoso "pitido")</h3>
      <p>
        <strong className="text-foreground">Símbolo:</strong> Un ícono que parece la señal de WiFi o un diodo con ondas de sonido.
      </p>
      <p>
        <strong className="text-foreground">Cómo se usa:</strong> Es la función favorita de todo técnico. El multímetro emite un pitido agudo si hay un camino eléctrico directo y sin resistencia entre la punta roja y la negra.
      </p>
      <p>
        <strong className="text-foreground">¿Para qué sirve?:</strong> Para buscar cables cortados por dentro, pistas rotas en una placa de circuito impreso, o para confirmar que una soldadura quedó bien hecha uniendo dos puntos.
      </p>

      {/* ══════ SECCIÓN 1: PRUEBAS DE CONTINUIDAD ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 pt-6 border-t border-border">
        1. Pruebas de Continuidad: El Primer Paso en el Diagnóstico
      </h2>
      <p>
        Antes de alimentar cualquier circuito sospechoso, el técnico experimentado siempre realiza una 
        <strong className="text-foreground"> prueba de continuidad</strong>. Este paso previo puede salvar componentes costosos 
        de daños adicionales.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Rastreo de Pistas en PCB</h3>
      <p>
        Las pistas de cobre en una placa de circuito impreso pueden romperse por estrés mecánico, corrosión o sobrecalentamiento. 
        Con el multímetro en modo continuidad:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Coloca una punta en el inicio de la pista y la otra en su destino.</li>
        <li>Un <strong className="text-foreground">pitido</strong> confirma que la conexión es eléctricamente sólida.</li>
        <li>Si no hay pitido, la pista está interrumpida y necesitarás un puente de cable o un reflow de soldadura.</li>
      </ul>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Detección de Cortocircuitos</h3>
      <p>
        Este es el diagnóstico más crítico antes de encender un equipo:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Coloca una punta en la línea de <strong className="text-foreground">VCC</strong> y otra en <strong className="text-foreground">GND</strong>.</li>
        <li>Un <strong className="text-destructive">pitido aquí indica un cortocircuito grave</strong> que debe resolverse antes de encender el equipo.</li>
        <li>Los cortocircuitos pueden deberse a puentes de soldadura, condensadores en corto o semiconductores dañados.</li>
      </ul>
      <p>
        <strong className="text-primary">Regla de oro:</strong> Nunca alimentes un circuito que muestre continuidad entre VCC y GND. 
        Diagnostica y repara primero.
      </p>

      {/* ══════ SECCIÓN 2: MEDICIÓN DE VOLTAJES EN CALIENTE ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 pt-6 border-t border-border">
        2. Medición de Voltajes en Caliente
      </h2>
      <p>
        Una vez descartados los cortocircuitos, alimentamos el circuito para verificar las etapas de potencia y las líneas 
        de distribución de voltaje.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Caída de Tensión en Componentes</h3>
      <p>
        La <strong className="text-foreground">caída de tensión</strong> a través de un componente te permite calcular la corriente 
        que circula sin necesidad de romper el circuito. Mide el voltaje en los extremos de una resistencia conocida y aplica 
        la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline font-semibold">Ley de Ohm</Link>:
      </p>
      <div className="bg-secondary/50 border border-border rounded-xl p-4 my-4 text-center">
        <p className="text-foreground font-mono font-bold text-lg">I = V / R</p>
        <p className="text-xs text-muted-foreground mt-2">
          Ejemplo: Si mides 2.5V a través de una resistencia de 100Ω → I = 2.5V / 100Ω = 25mA
        </p>
      </div>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Verificación de Reguladores de Voltaje</h3>
      <p>
        Los reguladores como el <strong className="text-foreground">LM7805</strong> son puntos críticos de falla. Verifica:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong className="text-foreground">Pin de entrada:</strong> Debe tener al menos 2V más que la salida esperada (para un 7805, mínimo 7V).</li>
        <li><strong className="text-foreground">Pin de salida:</strong> Debe entregar los 5.0V constantes (±0.25V de tolerancia).</li>
        <li><strong className="text-foreground">Si la salida es baja o inestable:</strong> El regulador puede estar sobrecargado, sobrecalentado o dañado.</li>
      </ul>
      <p>
        <strong className="text-primary">Consejo práctico:</strong> Toca el regulador brevemente con el dedo. Si quema al tacto, 
        el circuito está consumiendo demasiada corriente o el disipador de calor es inadecuado.
      </p>

      {/* ══════ SECCIÓN 3: PRUEBA DE DIODOS Y TRANSISTORES ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 pt-6 border-t border-border">
        3. Prueba de Diodos y Transistores
      </h2>
      <p>
        El multímetro en modo <strong className="text-foreground">"Diodo"</strong> es vital para diagnosticar semiconductores 
        sin necesidad de desoldarlos en muchos casos.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Prueba de Diodos</h3>
      <p>
        Un <Link to="/articulos/diodos" className="text-primary hover:underline font-semibold">diodo</Link> en buen estado debe mostrar:
      </p>
      <div className="bg-secondary/50 border border-border rounded-xl p-4 my-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="font-mono font-bold text-foreground">Polarización Directa</p>
            <p className="text-muted-foreground">Debe marcar entre <strong className="text-foreground">0.5V y 0.7V</strong> (silicio) o <strong className="text-foreground">0.2V-0.3V</strong> (germanio).</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono font-bold text-foreground">Polarización Inversa</p>
            <p className="text-muted-foreground">Debe marcar <strong className="text-foreground">"OL"</strong> (Open Loop / circuito abierto).</p>
          </div>
        </div>
      </div>
      <p>
        Si marca <strong className="text-destructive">0V en ambas direcciones</strong>, el diodo está en cortocircuito. Si marca 
        <strong className="text-destructive"> "OL" en ambas</strong>, está abierto (roto internamente).
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Prueba de Transistores BJT</h3>
      <p>
        Un <Link to="/articulos/transistores" className="text-primary hover:underline font-semibold">transistor BJT</Link> puede 
        verse como dos diodos espalda con espalda. Para identificar sus terminales:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong className="text-foreground">NPN:</strong> La base muestra caída de ~0.6V hacia el colector Y hacia el emisor (punta roja en base).</li>
        <li><strong className="text-foreground">PNP:</strong> La base muestra caída de ~0.6V desde el colector Y desde el emisor (punta negra en base).</li>
        <li>Entre colector y emisor directamente <strong className="text-foreground">no debe haber</strong> caída de tensión en ninguna dirección.</li>
      </ul>
      <p>
        <strong className="text-primary">Tip profesional:</strong> Si encuentras caída de tensión entre colector y emisor 
        sin señal en la base, el transistor está dañado (en cortocircuito interno).
      </p>

      {/* ══════ SECCIÓN 4: ERRORES COMUNES ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 pt-6 border-t border-border">
        4. Errores Comunes al Medir (y cómo evitarlos)
      </h2>
      <p>
        Incluso técnicos experimentados cometen estos errores. Conocerlos te ahorrará tiempo y componentes quemados:
      </p>

      <div className="space-y-4 my-6">
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-2">
          <p className="font-mono font-bold text-foreground text-sm">❌ Medir resistencia con el circuito encendido</p>
          <p className="text-sm text-muted-foreground">
            Esto puede dañar tu multímetro o dar lecturas completamente falsas. La batería interna del tester 
            compite con la fuente del circuito, generando valores sin sentido. <strong className="text-foreground">Siempre apaga 
            y desconecta</strong> antes de medir ohmios.
          </p>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-2">
          <p className="font-mono font-bold text-foreground text-sm">❌ No considerar la tolerancia</p>
          <p className="text-sm text-muted-foreground">
            Una resistencia de 1kΩ al 5% puede marcar legítimamente entre <strong className="text-foreground">950Ω y 1050Ω</strong> y 
            seguir estando en perfecto estado. Consulta el{" "}
            <Link to="/articulos/codigo-colores-resistencias" className="text-primary hover:underline font-semibold">
              código de colores
            </Link>{" "}
            para verificar la banda de tolerancia antes de declarar un componente defectuoso.
          </p>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-2">
          <p className="font-mono font-bold text-foreground text-sm">❌ Medir corriente en paralelo</p>
          <p className="text-sm text-muted-foreground">
            La corriente se mide <strong className="text-foreground">en serie</strong>. Si conectas las puntas 
            en paralelo (como para voltaje) mientras estás en modo amperímetro, crearás un cortocircuito que 
            quemará el fusible interno del multímetro instantáneamente.
          </p>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-2">
          <p className="font-mono font-bold text-foreground text-sm">❌ Olvidar cambiar la escala</p>
          <p className="text-sm text-muted-foreground">
            Si mides voltaje alto con la escala en milivolts, saturarás la lectura. Si mides un componente de 
            baja resistencia con la escala en MΩ, verás "0" y pensarás que hay un corto. Siempre empieza por 
            la escala más alta y baja progresivamente.
          </p>
        </div>
      </div>

      {/* ══════ SECCIÓN 5: LA REGLA DE SEGURIDAD ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 pt-6 border-t border-border">
        5. La Regla de Seguridad Número 1: Medir Corriente
      </h2>
      <p>
        <strong className="text-foreground">Símbolo:</strong> Una "A" con una línea recta o punteada.
      </p>
      <p>
        <strong className="text-destructive">El peligro:</strong> Medir corriente es la operación más peligrosa con un multímetro 
        porque debe colocarse <strong className="text-foreground">en serie</strong>. Esto significa que tienes que cortar el cable 
        del circuito y usar el multímetro como puente para que toda la electricidad pase por dentro de él.
      </p>
      <p>
        Si intentas medir corriente conectando las puntas en paralelo (como haces al medir voltaje), crearás un{" "}
        <strong className="text-destructive">cortocircuito brutal</strong> que derretirá las puntas de prueba o quemará el fusible 
        interno del equipo al instante. ¡Mucho cuidado!
      </p>

      {/* ══════ FLUJO DE DIAGNÓSTICO RESUMEN ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 pt-6 border-t border-border">
        Flujo de Diagnóstico Profesional (Resumen)
      </h2>
      <p>
        Sigue este orden cada vez que te enfrentes a un circuito con fallas:
      </p>
      <div className="bg-secondary/50 border border-border rounded-xl p-5 my-4">
        <ol className="list-decimal list-inside space-y-3 text-sm">
          <li><strong className="text-foreground">Inspección visual:</strong> Busca componentes quemados, soldaduras frías, pistas levantadas o condensadores hinchados.</li>
          <li><strong className="text-foreground">Continuidad VCC-GND:</strong> Descarta cortocircuitos antes de encender.</li>
          <li><strong className="text-foreground">Rastreo de pistas:</strong> Verifica la integridad de las conexiones críticas.</li>
          <li><strong className="text-foreground">Voltajes de alimentación:</strong> Comprueba reguladores y puntos de prueba con el circuito encendido.</li>
          <li><strong className="text-foreground">Prueba de semiconductores:</strong> Verifica diodos, transistores y circuitos integrados sospechosos.</li>
          <li><strong className="text-foreground">Aislamiento del fallo:</strong> Desconecta secciones del circuito para localizar el componente defectuoso.</li>
        </ol>
      </div>

      {/* ══════ HERRAMIENTAS ══════ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 pt-6 border-t border-border">
        Herramientas de Calidad Recomendadas
      </h2>
      <p>
        Un buen multímetro te durará toda la vida. Si estás armando tu taller, te recomendamos buscar modelos 
        <strong className="text-foreground"> "Autorango"</strong> (que eligen la escala automáticamente) de marcas reconocidas como 
        UNI-T, Fluke o Aneng. Puedes revisar nuestra sección de "Herramientas Pro" en la{" "}
        <Link to="/" className="text-primary hover:underline font-semibold">página principal</Link> para ver el equipamiento 
        que usamos en ElectroLab Pro.
      </p>
      <p>
        Para complementar tu diagnóstico, también te será útil nuestra{" "}
        <Link to="/articulos/circuitos-serie-paralelo" className="text-primary hover:underline font-semibold">
          guía de circuitos serie y paralelo
        </Link>{" "}
        y la{" "}
        <Link to="/articulos/condensadores" className="text-primary hover:underline font-semibold">
          guía de condensadores
        </Link>, ya que muchas fallas se originan en estos componentes pasivos.
      </p>
    </ArticleLayout>
  );
};

export default Multimetro;
