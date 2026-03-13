import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CircuitosSerieParalelo = () => {
  return (
    <ArticleLayout
      title="Circuitos en Serie vs Paralelo: Diferencias y Cálculos"
      subtitle="Entiende las diferencias fundamentales entre conexiones en serie y paralelo. Fórmulas, ejemplos prácticos y aplicaciones reales en electrónica."
      slug="circuitos-serie-paralelo"
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Por qué importa la forma de conectar?</h2>
      <p>
        En electrónica, la forma en que conectas los componentes determina completamente el comportamiento del circuito. Las dos configuraciones fundamentales son <strong className="text-foreground">serie</strong> y <strong className="text-foreground">paralelo</strong>, y entender sus diferencias es esencial para diseñar cualquier circuito, desde encender un LED hasta construir un sistema de alimentación complejo.
      </p>
      <p>
        Cada configuración tiene propiedades únicas en cuanto a cómo se distribuyen el voltaje y la corriente. Dominar estos conceptos te permitirá calcular correctamente los valores de los componentes y predecir el comportamiento de tus circuitos antes de construirlos.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos en serie</h2>
      <p>
        En un circuito en serie, los componentes están conectados <strong className="text-foreground">uno tras otro</strong>, formando un único camino para la corriente. Es como una cadena: la corriente que sale de la fuente pasa por cada componente secuencialmente y regresa. Si un componente se abre (se rompe), todo el circuito deja de funcionar.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Propiedades de los circuitos en serie</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">La corriente es la misma</strong> en todos los componentes: I<sub>total</sub> = I<sub>1</sub> = I<sub>2</sub> = I<sub>3</sub></li>
        <li><strong className="text-foreground">El voltaje se divide</strong> entre los componentes: V<sub>total</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub></li>
        <li><strong className="text-foreground">Las resistencias se suman</strong>: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub></li>
        <li>Si un componente falla (se abre), <strong className="text-foreground">todo el circuito se interrumpe</strong></li>
      </ul>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Ejemplo: Resistencias en serie</h3>
      <p>
        Si conectas tres resistencias de 100Ω, 220Ω y 330Ω en serie, la resistencia total será: <span className="font-mono text-primary">R<sub>total</sub> = 100 + 220 + 330 = 650Ω</span>. Con una fuente de 9V, la corriente será: <span className="font-mono text-primary">I = 9V / 650Ω = 13.8mA</span>. El voltaje en cada resistencia será proporcional a su valor: V<sub>1</sub> = 1.38V, V<sub>2</sub> = 3.04V, V<sub>3</sub> = 4.55V.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Aplicaciones de circuitos en serie</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Divisores de voltaje</strong>: para obtener voltajes intermedios</li>
        <li><strong className="text-foreground">Luces navideñas clásicas</strong>: si una bombilla se funde, todas se apagan</li>
        <li><strong className="text-foreground">Resistencias limitadoras</strong>: para proteger LEDs y otros componentes</li>
        <li><strong className="text-foreground">Pilas en serie</strong>: para aumentar el voltaje (ej: 4 pilas AA de 1.5V = 6V)</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos en paralelo</h2>
      <p>
        En un circuito en paralelo, los componentes están conectados <strong className="text-foreground">entre los mismos dos puntos</strong>, creando múltiples caminos para la corriente. Cada componente tiene el mismo voltaje aplicado, pero la corriente se reparte entre los diferentes caminos. Si un componente falla, los demás siguen funcionando.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Propiedades de los circuitos en paralelo</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">El voltaje es el mismo</strong> en todos los componentes: V<sub>total</sub> = V<sub>1</sub> = V<sub>2</sub> = V<sub>3</sub></li>
        <li><strong className="text-foreground">La corriente se divide</strong> entre los caminos: I<sub>total</sub> = I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub></li>
        <li><strong className="text-foreground">La resistencia total es menor</strong> que la menor de las resistencias individuales</li>
        <li>Si un componente falla, <strong className="text-foreground">los demás siguen funcionando</strong></li>
      </ul>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Fórmula para resistencias en paralelo</h3>
      <p>
        La fórmula general para calcular la resistencia total en paralelo es:
      </p>
      <p className="font-mono text-primary text-center text-lg my-3">
        1/R<sub>total</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + 1/R<sub>3</sub>
      </p>
      <p>
        Para dos resistencias, existe una fórmula simplificada muy práctica: <span className="font-mono text-primary">R<sub>total</sub> = (R<sub>1</sub> × R<sub>2</sub>) / (R<sub>1</sub> + R<sub>2</sub>)</span>. Si las dos resistencias son iguales, la total es exactamente la mitad.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Ejemplo: Resistencias en paralelo</h3>
      <p>
        Dos resistencias de 100Ω y 200Ω en paralelo: <span className="font-mono text-primary">R<sub>total</sub> = (100 × 200) / (100 + 200) = 20000 / 300 = 66.7Ω</span>. Nota cómo el resultado (66.7Ω) es menor que la resistencia más pequeña (100Ω). Con 12V: la corriente total será <span className="font-mono text-primary">I = 12V / 66.7Ω = 180mA</span>, dividida en 120mA por la de 100Ω y 60mA por la de 200Ω.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Aplicaciones de circuitos en paralelo</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Instalaciones eléctricas domésticas</strong>: cada enchufe recibe el mismo voltaje</li>
        <li><strong className="text-foreground">LEDs en paralelo</strong>: cada uno con su propia resistencia limitadora</li>
        <li><strong className="text-foreground">Pilas en paralelo</strong>: para aumentar la capacidad (duración) manteniendo el mismo voltaje</li>
        <li><strong className="text-foreground">Sistemas redundantes</strong>: si un camino falla, el sistema sigue operando</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tabla comparativa: Serie vs Paralelo</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Característica</th>
              <th className="px-4 py-2 text-left font-mono">Serie</th>
              <th className="px-4 py-2 text-left font-mono">Paralelo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-4 py-2">Corriente</td><td className="px-4 py-2">Igual en todos</td><td className="px-4 py-2">Se divide</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2">Voltaje</td><td className="px-4 py-2">Se divide</td><td className="px-4 py-2">Igual en todos</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2">Resistencia total</td><td className="px-4 py-2">Suma de todas</td><td className="px-4 py-2">Menor que la menor</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2">Si falla un componente</td><td className="px-4 py-2">Todo se detiene</td><td className="px-4 py-2">Los demás funcionan</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2">Pilas/baterías</td><td className="px-4 py-2">Más voltaje</td><td className="px-4 py-2">Más capacidad</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Circuitos mixtos (serie-paralelo)</h2>
      <p>
        En la práctica, la mayoría de los circuitos reales combinan ambas configuraciones. Un <strong className="text-foreground">circuito mixto</strong> tiene secciones en serie y secciones en paralelo. Para analizarlos, la estrategia es simplificar paso a paso: primero resuelves las secciones en paralelo (convirtiéndolas en una sola resistencia equivalente) y luego sumas las resistencias en serie.
      </p>
      <p>
        Por ejemplo, si tienes dos resistencias de 200Ω en paralelo (equivalente = 100Ω) conectadas en serie con una resistencia de 150Ω, la resistencia total del circuito será: <span className="font-mono text-primary">R<sub>total</sub> = 100Ω + 150Ω = 250Ω</span>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos prácticos</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Dibuja siempre el <strong className="text-foreground">esquema del circuito</strong> antes de montarlo</li>
        <li>Usa la Ley de Ohm junto con las reglas de serie/paralelo para calcular todos los valores</li>
        <li>Verifica con un <strong className="text-foreground">multímetro</strong> que los voltajes y corrientes coinciden con tus cálculos</li>
        <li>En caso de duda, monta primero en <strong className="text-foreground">protoboard</strong> y mide antes de soldar</li>
        <li>Recuerda: en paralelo nunca conectes LEDs sin su <strong className="text-foreground">resistencia individual</strong></li>
      </ul>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🔌 Experimenta con circuitos reales</p>
        <p className="text-muted-foreground text-sm">
          Practica construyendo circuitos en serie y paralelo con un kit de componentes electrónicos y protoboard.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+resistencias+protoboard&tag=electrolabpro-21"
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
