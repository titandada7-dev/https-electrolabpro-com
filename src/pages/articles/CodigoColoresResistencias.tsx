import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import resistorImg from "@/assets/resistor-color-code.png";
import PlayCTA from "@/components/PlayCTA";
import AplicaloAhora from "@/components/AplicaloAhora";

const CodigoColoresResistencias = () => {
  return (
    <ArticleLayout
      title="Guía Definitiva: Cómo Leer el Código de Colores de las Resistencias"
      subtitle="Aprende a descifrar las bandas de colores de cualquier resistencia de 4 y 5 bandas con ejemplos prácticos paso a paso."
      slug="codigo-colores-resistencias"
      schemaType="TechArticle"
      proficiencyLevel="Beginner"
    >
      {/* Imagen de referencia */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={resistorImg} alt="Tabla del código de colores de resistencias mostrando bandas de colores y sus valores numéricos correspondientes" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Tabla de referencia del código de colores estándar para resistencias de 4 y 5 bandas</p>
      </div>

      <p>
        En el mundo de la electrónica, las resistencias son componentes tan pequeños que sería imposible imprimir su valor numérico en la superficie de forma legible. Por esta razón, la industria adoptó un estándar universal hace décadas: el código de colores. Aprender a leer estas bandas cromáticas es una habilidad fundamental para cualquier ingeniero, técnico o aficionado que trabaje con circuitos impresos o protoboards.
      </p>
      <p>
        Este sistema de codificación fue estandarizado por la <strong className="text-foreground">IEC (International Electrotechnical Commission)</strong> y es utilizado en todo el mundo sin excepción. Independientemente de si compras resistencias en España, China, Estados Unidos o Japón, el código de colores es universal.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La tabla de colores completa</h2>
      <p>
        Antes de empezar con los ejemplos, memoriza (o guarda como referencia) esta tabla:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Color</th>
              <th className="px-3 py-2 text-left font-mono">Dígito</th>
              <th className="px-3 py-2 text-left font-mono">Multiplicador</th>
              <th className="px-3 py-2 text-left font-mono">Tolerancia</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2">Negro</td><td className="px-3 py-2 font-mono">0</td><td className="px-3 py-2 font-mono">×1</td><td className="px-3 py-2">—</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Marrón</td><td className="px-3 py-2 font-mono">1</td><td className="px-3 py-2 font-mono">×10</td><td className="px-3 py-2 font-mono">±1%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Rojo</td><td className="px-3 py-2 font-mono">2</td><td className="px-3 py-2 font-mono">×100</td><td className="px-3 py-2 font-mono">±2%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Naranja</td><td className="px-3 py-2 font-mono">3</td><td className="px-3 py-2 font-mono">×1k</td><td className="px-3 py-2">—</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Amarillo</td><td className="px-3 py-2 font-mono">4</td><td className="px-3 py-2 font-mono">×10k</td><td className="px-3 py-2">—</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Verde</td><td className="px-3 py-2 font-mono">5</td><td className="px-3 py-2 font-mono">×100k</td><td className="px-3 py-2 font-mono">±0.5%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Azul</td><td className="px-3 py-2 font-mono">6</td><td className="px-3 py-2 font-mono">×1M</td><td className="px-3 py-2 font-mono">±0.25%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Violeta</td><td className="px-3 py-2 font-mono">7</td><td className="px-3 py-2 font-mono">×10M</td><td className="px-3 py-2 font-mono">±0.1%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Gris</td><td className="px-3 py-2 font-mono">8</td><td className="px-3 py-2 font-mono">×100M</td><td className="px-3 py-2 font-mono">±0.05%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Blanco</td><td className="px-3 py-2 font-mono">9</td><td className="px-3 py-2 font-mono">×1G</td><td className="px-3 py-2">—</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Dorado</td><td className="px-3 py-2">—</td><td className="px-3 py-2 font-mono">×0.1</td><td className="px-3 py-2 font-mono">±5%</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Plateado</td><td className="px-3 py-2">—</td><td className="px-3 py-2 font-mono">×0.01</td><td className="px-3 py-2 font-mono">±10%</td></tr>
          </tbody>
        </table>
      </div>

      <PlayCTA topic="resistencias" />

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La anatomía de una resistencia: 4 y 5 bandas</h2>
      <p>
        Existen principalmente dos tipos de resistencias de orificio pasante (through-hole) que encontrarás en tu laboratorio: las estándar de 4 bandas y las de precisión de 5 bandas.
      </p>
      <p>
        La regla de oro para empezar a leerlas es identificar la banda de "Tolerancia". Esta banda suele ser de color Dorado o Plateado y siempre está un poco más separada del resto. Esa es la última banda. Debes empezar a leer desde el extremo opuesto.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Qué significa cada posición?</h2>
      <p>
        Para las resistencias clásicas de 4 bandas, la lectura funciona así:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Banda 1 (Primer Dígito):</strong> Representa el primer número del valor. Por ejemplo, el Rojo vale 2.</li>
        <li><strong className="text-foreground">Banda 2 (Segundo Dígito):</strong> Representa el segundo número. Por ejemplo, el Negro vale 0.</li>
        <li><strong className="text-foreground">Banda 3 (El Multiplicador):</strong> Esta es la banda matemática. Te indica por cuántos ceros debes multiplicar los dos números anteriores. Si es Rojo (x100), le agregas dos ceros.</li>
        <li><strong className="text-foreground">Banda 4 (La Tolerancia):</strong> Indica el margen de error de fábrica. El Dorado significa que el valor real puede variar un 5% hacia arriba o hacia abajo, mientras que el Plateado indica un 10%.</li>
      </ul>
      <p>
        Para las resistencias de 5 bandas (mayor precisión), el sistema es casi idéntico, solo que tienes tres bandas para los dígitos iniciales, la cuarta es el multiplicador y la quinta la tolerancia. Esto permite valores más precisos como 475Ω en lugar de tener que elegir entre 470Ω y 510Ω.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ejemplo Práctico 1: Resistencia de 4 bandas</h2>
      <p>
        Tomas una resistencia de tu caja de componentes y ves que tiene 4 bandas con los siguientes colores de izquierda a derecha: <span className="text-foreground font-semibold">Marrón - Negro - Rojo - Dorado</span>.
      </p>
      <p>Vamos a calcularlo paso a paso:</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Marrón</strong> = 1</li>
        <li><strong className="text-foreground">Negro</strong> = 0 (Hasta aquí tenemos el número 10)</li>
        <li><strong className="text-foreground">Rojo (Multiplicador)</strong> = x100 (le agregamos dos ceros).</li>
      </ul>
      <p>
        El resultado es <strong className="text-primary">1000 Ohmios</strong>, o lo que es lo mismo, <strong className="text-primary">1kΩ</strong> (Kilo-ohmio).
      </p>
      <p>
        La última banda es Dorada, por lo que su tolerancia es del 5%. El valor real de esta resistencia medida con un <Link to="/articulos/multimetro" className="text-primary hover:underline font-semibold">multímetro</Link> estará entre 950Ω y 1050Ω.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ejemplo Práctico 2: Resistencia de 5 bandas</h2>
      <p>
        Ahora tienes una resistencia de precisión con 5 bandas: <span className="text-foreground font-semibold">Amarillo - Violeta - Negro - Rojo - Marrón</span>.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Amarillo</strong> = 4</li>
        <li><strong className="text-foreground">Violeta</strong> = 7</li>
        <li><strong className="text-foreground">Negro</strong> = 0 (Hasta aquí: 470)</li>
        <li><strong className="text-foreground">Rojo (Multiplicador)</strong> = x100</li>
      </ul>
      <p>
        Resultado: <strong className="text-primary">47.000Ω = 47kΩ</strong>. La banda Marrón indica una tolerancia de ±1%, así que el valor real estará entre 46.530Ω y 47.470Ω.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ejemplo Práctico 3: La resistencia más usada</h2>
      <p>
        La resistencia más utilizada en proyectos con <Link to="/articulos/arduino" className="text-primary hover:underline font-semibold">Arduino</Link> y LEDs es la de 220Ω. Sus bandas son: <span className="text-foreground font-semibold">Rojo - Rojo - Marrón - Dorado</span>.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Rojo</strong> = 2</li>
        <li><strong className="text-foreground">Rojo</strong> = 2 (Hasta aquí: 22)</li>
        <li><strong className="text-foreground">Marrón (Multiplicador)</strong> = x10</li>
      </ul>
      <p>
        Resultado: <strong className="text-primary">220Ω</strong>. Perfecta para limitar la corriente de un LED a ~15mA con una fuente de 5V.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Mnemotecnia para recordar los colores</h2>
      <p>
        Existe una frase clásica en español para recordar el orden de los colores (Negro=0, Marrón=1, Rojo=2...):
      </p>
      <p className="text-foreground font-semibold italic bg-card/50 p-4 rounded-lg border border-border">
        "Negro - Marrón - Rojo - Naranja - Amarillo - Verde - Azul - Violeta - Gris - Blanco"
      </p>
      <p>
        <strong className="text-foreground">Truco:</strong> Piensa en los colores del arcoíris (Rojo a Violeta = 2 a 7) con Negro y Marrón antes, y Gris y Blanco después. Con un poco de práctica, leerás resistencias tan rápido como lees números.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Qué pasa con las resistencias SMD?</h2>
      <p>
        Las resistencias de montaje superficial (SMD) no usan código de colores. En su lugar, llevan impreso un código numérico de 3 o 4 dígitos. Por ejemplo, "472" significa 47 × 10² = 4700Ω = 4.7kΩ. El sistema es idéntico al de los <Link to="/articulos/condensadores" className="text-primary hover:underline font-semibold">condensadores cerámicos</Link>: los dos primeros dígitos son el valor y el último es el multiplicador (número de ceros).
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La herramienta infalible</h2>
      <p>
        Memorizar la tabla de colores lleva tiempo y práctica. Si estás en medio de un proyecto y necesitas estar 100% seguro del valor de un componente antes de soldarlo, recuerda que en la página principal de ElectroLab Pro tienes nuestra <Link to="/" className="text-primary hover:underline font-semibold">Calculadora de Resistencias interactiva</Link>. Solo selecciona los colores que ves en tu componente y el sistema hará el cálculo matemático por ti con precisión absoluta.
      </p>

      {/* CTA fijo: ir directo a la herramienta o al diccionario */}
      <div className="not-prose mt-8 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 sm:p-6">
        <p className="text-sm font-mono font-bold uppercase tracking-wider text-primary mb-2">
          ⚡ Aplicalo ahora mismo
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
          Pasá del código de colores a la práctica
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Decodificá cualquier resistencia en segundos o consultá su hoja técnica en nuestro diccionario de componentes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/#calculadora"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
            aria-label="Abrir la calculadora visual de resistencias por colores"
          >
            🎨 Calculadora Visual de Resistencias
          </Link>
          <Link
            to="/#diccionario"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary/10 transition-colors"
            aria-label="Consultar el diccionario de componentes electrónicos"
          >
            📖 Diccionario de Componentes
          </Link>
        </div>
      </div>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">📦 Kit de Resistencias Surtidas</p>
        <p className="text-muted-foreground text-sm">
          Pack de 600+ resistencias de 10Ω a 1MΩ organizadas por valor. Ideal para practicar la lectura del código de colores.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+resistencias+surtidas+electronica&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits de resistencias en Amazon
        </a>
      </div>

      <AplicaloAhora
        tools={[
          { to: "/#calculadora", label: "Calculadora visual de resistencias por colores", desc: "Decodificá bandas de 4 y 5 colores en tiempo real." },
          { to: "/#calculadora", label: "Calculadora de resistencia para LED", desc: "Aplicá el valor calculado para proteger tu LED." },
          { to: "/#calculadora", label: "Decodificador de resistencias SMD", desc: "¿Resistencias sin bandas? Decodificá el código numérico." },
          { to: "/guia-resistencias", label: "Guía completa de resistencias", desc: "Teoría, ejemplos prácticos y casos de uso reales." },
        ]}
      />
    </ArticleLayout>
  );
};

export default CodigoColoresResistencias;
