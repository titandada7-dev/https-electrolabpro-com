import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Multimetro = () => {
  return (
    <ArticleLayout
      title="Cómo Usar un Multímetro: Guía Completa para Principiantes"
      subtitle="Aprende a medir voltaje, corriente, resistencia y continuidad con un multímetro digital. Guía paso a paso con consejos de seguridad."
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es un multímetro?</h2>
      <p>
        El <strong className="text-foreground">multímetro</strong> (también llamado polímetro o tester) es el instrumento de medición más importante que puede tener cualquier persona que trabaje con electrónica o electricidad. Es una herramienta que combina varias funciones de medición en un solo aparato, permitiéndote medir <strong className="text-foreground">voltaje</strong> (tensión), <strong className="text-foreground">corriente</strong> (intensidad), <strong className="text-foreground">resistencia</strong>, y en muchos modelos también continuidad, capacitancia, frecuencia y temperatura.
      </p>
      <p>
        Existen dos tipos principales: los <strong className="text-foreground">multímetros analógicos</strong> (con aguja) y los <strong className="text-foreground">multímetros digitales</strong> (con pantalla LCD). Los digitales son los más utilizados hoy en día por su facilidad de lectura, mayor precisión y funciones adicionales. Para un principiante, un multímetro digital básico es más que suficiente.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Partes de un multímetro digital</h2>
      <p>
        Antes de empezar a medir, es fundamental conocer las partes del instrumento:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Pantalla LCD</strong>: muestra el valor medido con precisión decimal</li>
        <li><strong className="text-foreground">Selector rotativo</strong>: permite elegir la magnitud y el rango de medición (V, A, Ω)</li>
        <li><strong className="text-foreground">Puerto COM</strong>: donde siempre va conectada la punta negra (referencia común)</li>
        <li><strong className="text-foreground">Puerto VΩmA</strong>: para medir voltaje, resistencia y corrientes pequeñas (hasta 200mA)</li>
        <li><strong className="text-foreground">Puerto 10A o 20A</strong>: exclusivo para medir corrientes altas (hasta 10 o 20 amperios)</li>
        <li><strong className="text-foreground">Puntas de prueba</strong>: cables rojo (positivo) y negro (negativo) con puntas metálicas</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo medir voltaje (tensión)</h2>
      <p>
        Medir voltaje es la función más utilizada y también la más segura. El voltaje se mide siempre <strong className="text-foreground">en paralelo</strong> con el componente o fuente que quieres medir. Los pasos son:
      </p>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Conecta la punta negra al puerto <strong className="text-foreground">COM</strong></li>
        <li>Conecta la punta roja al puerto <strong className="text-foreground">VΩmA</strong></li>
        <li>Gira el selector a <strong className="text-foreground">V DC</strong> (corriente continua, simbolizado con una línea recta y puntos) o <strong className="text-foreground">V AC</strong> (corriente alterna, simbolizado con una onda ~)</li>
        <li>Selecciona un rango superior al voltaje esperado (o usa autorange si tu modelo lo tiene)</li>
        <li>Toca con las puntas los dos terminales del componente o fuente</li>
        <li>Lee el valor en pantalla. Si aparece un signo negativo, las puntas están invertidas</li>
      </ol>
      <p>
        <strong className="text-foreground">Ejemplo práctico</strong>: para comprobar si una pila AA de 1.5V está cargada, coloca el selector en 20V DC, toca el polo positivo con la punta roja y el negativo con la negra. Una pila nueva marcará entre 1.5V y 1.6V; por debajo de 1.2V está agotada.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo medir resistencia</h2>
      <p>
        La medición de resistencia permite verificar el valor de una resistencia, comprobar la integridad de un cable o detectar cortocircuitos. <strong className="text-foreground">Importante</strong>: siempre mide resistencia con el circuito <strong className="text-foreground">apagado y desconectado</strong>, ya que el multímetro inyecta una pequeña corriente propia para hacer la medición.
      </p>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Selector en posición <strong className="text-foreground">Ω</strong> (ohmios)</li>
        <li>Puntas en COM y VΩmA</li>
        <li>Toca ambos terminales de la resistencia</li>
        <li>Lee el valor. Si aparece "OL" (Over Load) o "1", la resistencia es demasiado alta para el rango seleccionado o el componente está abierto</li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo medir corriente</h2>
      <p>
        Medir corriente es diferente a medir voltaje: el multímetro se conecta <strong className="text-foreground">en serie</strong> con el circuito, es decir, debes interrumpir el circuito e intercalar el multímetro para que toda la corriente pase a través de él.
      </p>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Para corrientes pequeñas (menos de 200mA): punta roja en <strong className="text-foreground">VΩmA</strong>, selector en <strong className="text-foreground">mA</strong></li>
        <li>Para corrientes grandes (hasta 10A): punta roja en <strong className="text-foreground">10A</strong>, selector en <strong className="text-foreground">10A</strong></li>
        <li>Abre el circuito en el punto donde quieres medir</li>
        <li>Conecta las puntas en serie (una a cada extremo del corte)</li>
        <li>Enciende el circuito y lee la corriente</li>
      </ol>
      <p>
        <strong className="text-foreground">⚠️ Precaución</strong>: nunca intentes medir corriente en paralelo (como si fuera voltaje). Esto creará un cortocircuito y puede quemar el fusible del multímetro o dañar el circuito.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Prueba de continuidad</h2>
      <p>
        La función de continuidad emite un <strong className="text-foreground">pitido</strong> cuando hay una conexión eléctrica entre las dos puntas. Es ideal para verificar cables, soldaduras, pistas de PCB y fusibles. Si suena el "beep", hay continuidad; si no suena, hay una interrupción.
      </p>
      <p>
        Para usarla, gira el selector al símbolo de continuidad (un icono de diodo con ondas sonoras o un altavoz). Toca los dos extremos del cable o traza que quieres verificar. Esta función es especialmente útil cuando montas circuitos en protoboard y necesitas verificar que las conexiones son correctas antes de encender.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos de seguridad</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Nunca</strong> midas voltajes superiores a los que soporta tu multímetro (normalmente 600V o 1000V máximo)</li>
        <li>Asegúrate de que las puntas estén en buen estado, sin cables pelados</li>
        <li>Siempre empieza en el <strong className="text-foreground">rango más alto</strong> si no conoces el valor esperado</li>
        <li>No midas resistencia en un circuito energizado</li>
        <li>Lleva las puntas al puerto correcto antes de cada medición</li>
        <li>Ten cuidado con el rango de <strong className="text-foreground">10A</strong>: no tiene fusible en muchos modelos económicos</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Qué multímetro comprar?</h2>
      <p>
        Para un principiante, un multímetro digital con autorange, prueba de continuidad con buzzer, medición de capacitancia y pantalla retroiluminada es ideal. Marcas como <strong className="text-foreground">UNI-T</strong>, <strong className="text-foreground">Fluke</strong> o <strong className="text-foreground">Aneng</strong> ofrecen modelos excelentes. Lo más importante es que tenga categoría de seguridad <strong className="text-foreground">CAT III</strong> como mínimo.
      </p>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">📟 Consigue tu primer multímetro</p>
        <p className="text-muted-foreground text-sm">
          Un buen multímetro digital es la inversión más importante para cualquier electrónico. Encuentra los mejor valorados.
        </p>
        <a
          href="https://www.amazon.es/s?k=multimetro+digital&tag=electrolabpro-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver multímetros en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default Multimetro;
