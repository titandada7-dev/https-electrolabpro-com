import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import capacitorImg from "@/assets/capacitor-types.png";

const Condensadores = () => {
  return (
    <ArticleLayout
      title="¿Qué es un Condensador y Cómo Funciona?"
      subtitle="Descubre qué son los condensadores, cómo almacenan energía, sus tipos principales y sus aplicaciones más comunes en electrónica."
    >
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={capacitorImg} alt="Tipos de condensadores: cerámico, electrolítico, tantalio y de película" className="w-full max-h-64 object-contain p-4" />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Tipos principales de condensadores — cerámico, electrolítico, tantalio y de película</p>
      </div>
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">Introducción a los condensadores</h2>
      <p>
        Los condensadores (también llamados capacitores en Latinoamérica) son componentes electrónicos pasivos fundamentales que se encuentran en prácticamente todos los circuitos electrónicos, desde un simple cargador de teléfono hasta los sistemas más complejos de un satélite espacial. Su función principal es <strong className="text-foreground">almacenar energía eléctrica en forma de campo eléctrico</strong> y liberarla cuando el circuito lo necesita.
      </p>
      <p>
        A diferencia de las resistencias, que se oponen al flujo de corriente, o de las bobinas, que almacenan energía en forma de campo magnético, los condensadores trabajan con cargas eléctricas estáticas acumuladas en dos placas conductoras separadas por un material aislante llamado <strong className="text-foreground">dieléctrico</strong>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Cómo funciona un condensador?</h2>
      <p>
        Imagina dos placas metálicas paralelas separadas por un material que no conduce electricidad (aire, cerámica, plástico o incluso un electrolito). Cuando conectas una fuente de voltaje a estas placas, los electrones se acumulan en una de ellas (carga negativa) mientras que la otra pierde electrones (carga positiva). Este proceso se llama <strong className="text-foreground">carga del condensador</strong>.
      </p>
      <p>
        La cantidad de carga que un condensador puede almacenar se mide en <strong className="text-foreground">Faradios (F)</strong>, aunque en la práctica se usan submúltiplos porque un Faradio es una cantidad enorme de capacitancia:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Microfaradio (µF):</strong> 1 µF = 0.000001 F. Común en condensadores electrolíticos.</li>
        <li><strong className="text-foreground">Nanofaradio (nF):</strong> 1 nF = 0.000000001 F. Usado en filtros y circuitos de alta frecuencia.</li>
        <li><strong className="text-foreground">Picofaradio (pF):</strong> 1 pF = 0.000000000001 F. Típico en circuitos de radiofrecuencia.</li>
      </ul>
      <p>
        Cuando desconectas la fuente de voltaje, el condensador mantiene la carga almacenada. Si luego conectas una carga (como un LED o un motor), el condensador libera su energía gradualmente. Este ciclo de carga y descarga es la base de innumerables aplicaciones electrónicas.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tipos de condensadores</h2>
      <p>
        Existen muchos tipos de condensadores, cada uno diseñado para aplicaciones específicas. Los más importantes son:
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">1. Condensadores cerámicos</h3>
      <p>
        Son los más comunes en electrónica moderna. Son pequeños, baratos y no tienen polaridad, lo que significa que pueden conectarse en cualquier dirección. Se identifican por un código de tres dígitos impreso en su cuerpo. Por ejemplo, un condensador marcado "104" tiene un valor de 100,000 pF = 100 nF = 0.1 µF. Se utilizan ampliamente para filtrado de ruido, desacoplamiento de circuitos integrados y circuitos de temporización.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">2. Condensadores electrolíticos</h3>
      <p>
        Estos condensadores ofrecen valores de capacitancia mucho más altos (desde 1 µF hasta varios miles de µF) en un tamaño relativamente compacto. Sin embargo, <strong className="text-foreground">tienen polaridad</strong>: la pata larga es el positivo (+) y la pata corta el negativo (-), que también suele estar marcado con una franja en el cuerpo del componente. Conectarlos al revés puede causar que se calienten, se hinchen o incluso exploten. Se usan principalmente en fuentes de alimentación, filtros de audio y circuitos de potencia.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">3. Condensadores de poliéster (Mylar)</h3>
      <p>
        Ofrecen buena estabilidad y precisión en su valor de capacitancia. Son ideales para circuitos donde se necesita consistencia a lo largo del tiempo y con cambios de temperatura. Se encuentran frecuentemente en circuitos de temporización, filtros de audio de calidad y equipos de instrumentación.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">4. Condensadores de tantalio</h3>
      <p>
        Son una versión más compacta y estable de los electrolíticos. Ofrecen alta capacitancia en tamaño reducido y tienen baja corriente de fuga. También son polarizados y muy sensibles a sobrevoltajes. Se usan en dispositivos portátiles, equipos médicos y circuitos de alta fiabilidad.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">5. Supercondensadores (EDLC)</h3>
      <p>
        Los supercondensadores pueden almacenar cantidades enormes de energía (desde 1 F hasta cientos de Faradios) y se sitúan entre los condensadores convencionales y las baterías. Se cargan y descargan mucho más rápido que una batería y tienen un ciclo de vida prácticamente ilimitado. Se utilizan en sistemas de respaldo de energía, recuperación de frenado en vehículos eléctricos y alimentación temporal de memorias.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Aplicaciones prácticas de los condensadores</h2>
      <p>
        Los condensadores son increíblemente versátiles. Algunas de sus aplicaciones más comunes incluyen:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Filtrado de fuentes de alimentación:</strong> Suavizan el voltaje rectificado, convirtiendo corriente alterna pulsante en corriente continua estable.</li>
        <li><strong className="text-foreground">Desacoplamiento:</strong> Colocados cerca de los pines de alimentación de circuitos integrados, absorben picos de ruido y mantienen un voltaje limpio.</li>
        <li><strong className="text-foreground">Temporización:</strong> Junto con resistencias, forman circuitos RC que generan retardos controlados. Esto es la base de temporizadores como el famoso 555.</li>
        <li><strong className="text-foreground">Acoplamiento de señales:</strong> Permiten el paso de señales de corriente alterna bloqueando la corriente continua, esencial en amplificadores de audio.</li>
        <li><strong className="text-foreground">Arranque de motores:</strong> Proporcionan el impulso inicial de energía que necesitan los motores eléctricos monofásicos para comenzar a girar.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Condensadores en serie y en paralelo</h2>
      <p>
        Al igual que las resistencias, los condensadores pueden combinarse para obtener valores específicos:
      </p>
      <div className="p-4 rounded-xl border border-primary/20 bg-card/60 space-y-3">
        <p><strong className="text-foreground font-mono">En paralelo:</strong> La capacitancia total se suma → C_total = C1 + C2 + C3...</p>
        <p><strong className="text-foreground font-mono">En serie:</strong> La capacitancia total disminuye → 1/C_total = 1/C1 + 1/C2 + 1/C3...</p>
        <p className="text-xs text-muted-foreground">Nota: es exactamente al revés que las resistencias.</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Precauciones importantes</h2>
      <p>
        Los condensadores pueden ser peligrosos si no se manejan correctamente. Un condensador cargado mantiene su voltaje incluso después de desconectar la fuente de alimentación. Los condensadores electrolíticos de alta capacitancia en fuentes de alimentación pueden retener cargas letales durante minutos u horas. <strong className="text-foreground">Siempre descarga un condensador antes de manipularlo</strong> usando una resistencia de descarga apropiada.
      </p>
      <p>
        Nunca excedas el voltaje nominal de un condensador. Si un condensador está clasificado para 25V, aplicarle 30V puede causar una falla catastrófica, especialmente en los electrolíticos y de tantalio.
      </p>

      {/* CTA */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-card/80 backdrop-blur space-y-4">
        <h3 className="text-lg font-mono font-bold text-foreground text-center">⚡ Kit de Condensadores Surtidos</h3>
        <p className="text-sm text-center">Pack con más de 200 condensadores cerámicos y electrolíticos en valores estándar. Ideal para tu laboratorio.</p>
        <div className="text-center">
          <a
            href="https://www.amazon.es/s?k=kit+condensadores+electronica&tag=electrolabpro-21"
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

export default Condensadores;
