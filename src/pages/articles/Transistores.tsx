import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import transistorImg from "@/assets/transistor-diagram.png";

const Transistores = () => {
  return (
    <ArticleLayout
      title="Guía Completa de Transistores para Principiantes"
      subtitle="Aprende qué es un transistor, cómo funciona, los tipos principales (BJT y MOSFET) y cómo usarlos en tus proyectos de electrónica."
      slug="transistores"
      schemaType="TechArticle"
      proficiencyLevel="Beginner"
    >
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={transistorImg} alt="Diagrama de un transistor NPN mostrando Base, Colector y Emisor con encapsulado TO-92" className="w-full max-h-64 object-contain p-4" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Transistor NPN — terminales Base, Colector y Emisor en encapsulado TO-92</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es un transistor?</h2>
      <p>
        El transistor es, sin exageración, el componente más importante de la electrónica moderna. Es un dispositivo semiconductor que puede <strong className="text-foreground">amplificar señales eléctricas</strong> o actuar como un <strong className="text-foreground">interruptor electrónico</strong> controlado por una pequeña corriente o voltaje. Desde los procesadores de tu ordenador (que contienen miles de millones de transistores) hasta un simple circuito con un LED, los transistores están en todas partes.
      </p>
      <p>
        Fue inventado en 1947 en los laboratorios Bell por John Bardeen, Walter Brattain y William Shockley, y revolucionó por completo la tecnología al reemplazar las válvulas de vacío, que eran grandes, frágiles y consumían mucha energía. El transistor hizo posible la miniaturización de la electrónica y el nacimiento de la era digital.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Cómo funciona un transistor?</h2>
      <p>
        Un transistor tiene <strong className="text-foreground">tres terminales</strong>. En el caso de los transistores bipolares (BJT), estos terminales se llaman <strong className="text-primary">Base (B)</strong>, <strong className="text-primary">Colector (C)</strong> y <strong className="text-primary">Emisor (E)</strong>. El principio básico es simple: una pequeña corriente aplicada a la Base controla una corriente mucho mayor entre el Colector y el Emisor.
      </p>
      <p>
        Piensa en el transistor como una llave de agua: la Base es la manilla que giras, y el flujo de agua (corriente) que pasa del Colector al Emisor depende de cuánto abras esa manilla. Con una fuerza mínima en la manilla (corriente de Base), puedes controlar un gran caudal de agua (corriente de Colector).
      </p>
      <p>
        Los transistores pueden operar en tres regiones principales:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Corte:</strong> No hay corriente de Base suficiente, el transistor está "apagado" y no conduce entre Colector y Emisor. Funciona como un interruptor abierto.</li>
        <li><strong className="text-foreground">Saturación:</strong> La corriente de Base es suficientemente alta para que el transistor conduzca al máximo entre Colector y Emisor. Funciona como un interruptor cerrado (encendido).</li>
        <li><strong className="text-foreground">Región activa:</strong> El transistor amplifica la señal de la Base proporcionalmente. Esta es la zona utilizada en amplificadores de audio, radio y señales.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tipos de transistores</h2>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">1. Transistor Bipolar (BJT)</h3>
      <p>
        Los BJT (Bipolar Junction Transistor) son los transistores más clásicos y se dividen en dos tipos según su estructura interna:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">NPN:</strong> El tipo más común. La corriente fluye del Colector al Emisor cuando se aplica una corriente positiva a la Base. Ejemplos populares: <strong className="text-primary">2N2222</strong>, <strong className="text-primary">BC547</strong>, <strong className="text-primary">2N3904</strong>.</li>
        <li><strong className="text-foreground">PNP:</strong> Funciona de forma complementaria al NPN. La corriente fluye del Emisor al Colector cuando la Base se lleva a un voltaje más bajo. Ejemplos: <strong className="text-primary">2N2907</strong>, <strong className="text-primary">BC557</strong>.</li>
      </ul>
      <p>
        La ganancia de corriente de un BJT (llamada <strong className="text-foreground">hFE</strong> o <strong className="text-foreground">β</strong>) indica cuántas veces amplifica la corriente de Base. Un transistor con hFE = 100 significa que por cada 1 mA en la Base, pueden fluir hasta 100 mA entre Colector y Emisor. Este valor varía según el modelo y las condiciones de operación.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">2. Transistor MOSFET</h3>
      <p>
        Los MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) son transistores de efecto de campo que se controlan por <strong className="text-foreground">voltaje</strong> en lugar de corriente. Sus terminales se llaman <strong className="text-primary">Gate (G)</strong>, <strong className="text-primary">Drain (D)</strong> y <strong className="text-primary">Source (S)</strong>.
      </p>
      <p>
        La ventaja principal del MOSFET es que consume una corriente prácticamente nula en el Gate para activarse, lo que lo hace mucho más eficiente que un BJT en muchas aplicaciones. Además, los MOSFET de potencia pueden manejar corrientes de decenas de amperios con pérdidas mínimas, lo que los hace ideales para:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>Control de motores DC</li>
        <li>Fuentes de alimentación conmutadas</li>
        <li>Controladores de LEDs de alta potencia</li>
        <li>Circuitos de Arduino y microcontroladores</li>
      </ul>
      <p>
        Ejemplos populares: <strong className="text-primary">IRF520</strong> (N-Channel), <strong className="text-primary">IRF9540</strong> (P-Channel), <strong className="text-primary">IRLZ44N</strong> (Logic-level, ideal para Arduino).
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">3. Transistor Darlington</h3>
      <p>
        Un transistor Darlington es en realidad dos BJT conectados en cascada dentro de un mismo encapsulado. Esto multiplica la ganancia de corriente: si cada transistor tiene un hFE de 100, el Darlington tendrá un hFE de aproximadamente 10.000. Esto permite controlar cargas pesadas con corrientes de Base extremadamente pequeñas. El <strong className="text-primary">TIP120</strong> y el <strong className="text-primary">TIP122</strong> son los Darlington más utilizados en proyectos con Arduino.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Transistor como interruptor</h2>
      <p>
        Una de las aplicaciones más comunes para principiantes es usar un transistor como interruptor electrónico. Por ejemplo, puedes controlar un motor, un relé o una tira de LEDs desde un pin de Arduino que solo puede entregar 20-40 mA, usando un transistor para manejar corrientes mucho mayores.
      </p>
      <p>
        <strong className="text-foreground">Circuito básico con NPN (2N2222):</strong>
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>Conecta la carga (motor, LED, relé) entre V+ y el Colector del transistor.</li>
        <li>Conecta el Emisor a GND (tierra).</li>
        <li>Conecta la Base al pin de control (Arduino, botón, etc.) a través de una <strong className="text-foreground">resistencia de Base</strong> (típicamente 1kΩ - 10kΩ).</li>
        <li>Cuando el pin de control se pone en HIGH, el transistor conduce y la carga se enciende.</li>
      </ul>
      <p>
        <strong className="text-primary">Importante:</strong> Si controlas cargas inductivas (motores, relés), coloca siempre un <Link to="/articulos/diodos" className="text-primary hover:underline">diodo de protección</Link> (flyback) en paralelo con la carga para absorber los picos de voltaje al apagar.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Transistor como amplificador</h2>
      <p>
        En la región activa, un transistor BJT puede amplificar señales de audio, radio u otras señales analógicas. El circuito más básico es el <strong className="text-foreground">amplificador en emisor común</strong>, donde la señal de entrada se aplica a la Base y la señal amplificada se recoge en el Colector.
      </p>
      <p>
        La ganancia de voltaje depende de las resistencias del circuito y del punto de operación (polarización) del transistor. Para un primer proyecto, puedes construir un preamplificador de micrófono con un solo transistor 2N2222, un par de resistencias y un condensador de acoplamiento.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Parámetros clave a revisar en el datasheet</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">V<sub>CEO</sub> (Voltaje Colector-Emisor máximo):</strong> El máximo voltaje que soporta el transistor entre Colector y Emisor sin dañarse.</li>
        <li><strong className="text-foreground">I<sub>C</sub> (Corriente de Colector máxima):</strong> La corriente máxima que puede circular por el Colector.</li>
        <li><strong className="text-foreground">hFE (Ganancia de corriente):</strong> Cuántas veces amplifica la corriente de Base.</li>
        <li><strong className="text-foreground">P<sub>D</sub> (Potencia máxima disipada):</strong> La potencia máxima que el transistor puede disipar en forma de calor sin destruirse.</li>
        <li><strong className="text-foreground">V<sub>BE(sat)</sub>:</strong> Voltaje Base-Emisor en saturación (≈ 0.7V para BJT de silicio).</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Transistores más usados en proyectos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-card border-b border-border">
              <th className="px-3 py-2 text-left font-mono text-foreground">Modelo</th>
              <th className="px-3 py-2 text-left font-mono text-foreground">Tipo</th>
              <th className="px-3 py-2 text-left font-mono text-foreground">V<sub>CEO</sub></th>
              <th className="px-3 py-2 text-left font-mono text-foreground">I<sub>C</sub></th>
              <th className="px-3 py-2 text-left font-mono text-foreground">Uso típico</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="px-3 py-2 font-mono text-primary">2N2222</td>
              <td className="px-3 py-2">NPN</td>
              <td className="px-3 py-2">40V</td>
              <td className="px-3 py-2">800mA</td>
              <td className="px-3 py-2">Interruptor, amplificador</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="px-3 py-2 font-mono text-primary">BC547</td>
              <td className="px-3 py-2">NPN</td>
              <td className="px-3 py-2">45V</td>
              <td className="px-3 py-2">100mA</td>
              <td className="px-3 py-2">Señales, audio</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="px-3 py-2 font-mono text-primary">TIP120</td>
              <td className="px-3 py-2">Darlington</td>
              <td className="px-3 py-2">60V</td>
              <td className="px-3 py-2">5A</td>
              <td className="px-3 py-2">Motores, relés</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="px-3 py-2 font-mono text-primary">IRF520</td>
              <td className="px-3 py-2">MOSFET N</td>
              <td className="px-3 py-2">100V</td>
              <td className="px-3 py-2">9.2A</td>
              <td className="px-3 py-2">Control de potencia</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-primary">IRLZ44N</td>
              <td className="px-3 py-2">MOSFET N</td>
              <td className="px-3 py-2">55V</td>
              <td className="px-3 py-2">47A</td>
              <td className="px-3 py-2">Arduino, LEDs potencia</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos para principiantes</h2>
      <p>
        Si estás empezando, te recomendamos tener siempre a mano estos transistores: <strong className="text-foreground">2N2222</strong> (NPN de uso general), <strong className="text-foreground">2N2907</strong> (PNP complementario), <strong className="text-foreground">TIP120</strong> (Darlington para cargas pesadas) y <strong className="text-foreground">IRLZ44N</strong> (MOSFET compatible con Arduino). Con estos cuatro modelos podrás abordar la gran mayoría de proyectos para principiantes.
      </p>
      <p>
        Recuerda calcular siempre la <strong className="text-foreground">resistencia de Base</strong> adecuada cuando uses un BJT como interruptor. La fórmula básica es: R<sub>B</sub> = (V<sub>in</sub> - 0.7V) / I<sub>B</sub>, donde I<sub>B</sub> = I<sub>C</sub> / hFE. Aplica un factor de seguridad multiplicando I<sub>B</sub> por 2-5 para asegurar la saturación completa.
      </p>

      {/* CTA */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-card/80 backdrop-blur space-y-4">
        <h3 className="text-lg font-mono font-bold text-foreground text-center">⚡ Kit de Transistores Surtidos</h3>
        <p className="text-sm text-center">Incluye transistores NPN, PNP, MOSFET y Darlington. Todo lo que necesitas para practicar con tus proyectos.</p>
        <div className="text-center">
          <a
            href="https://www.amazon.es/s?k=kit+transistores+electronica+surtido&tag=electrolabp0c-21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
          >
            <ShoppingCart className="w-4 h-4" />
            Ver Kits en Amazon
          </a>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default Transistores;