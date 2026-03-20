import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";

const CodigoColoresResistencias = () => {
  return (
    <ArticleLayout
      title="Guía Definitiva: Cómo Leer el Código de Colores de las Resistencias"
      subtitle="Aprende a descifrar las bandas de colores de cualquier resistencia de 4 y 5 bandas con ejemplos prácticos paso a paso."
      slug="codigo-colores-resistencias"
    >
      <p>
        En el mundo de la electrónica, las resistencias son componentes tan pequeños que sería imposible imprimir su valor numérico en la superficie de forma legible. Por esta razón, la industria adoptó un estándar universal hace décadas: el código de colores. Aprender a leer estas bandas cromáticas es una habilidad fundamental para cualquier ingeniero, técnico o aficionado que trabaje con circuitos impresos o protoboards.
      </p>

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
        Para las resistencias de 5 bandas (mayor precisión), el sistema es casi idéntico, solo que tienes tres bandas para los dígitos iniciales, la cuarta es el multiplicador y la quinta la tolerancia.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ejemplo Práctico: Descifrando un componente real</h2>
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
        La última banda es Dorada, por lo que su tolerancia es del 5%. El valor real de esta resistencia medida con un multímetro estará entre 950Ω y 1050Ω.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La herramienta infalible</h2>
      <p>
        Memorizar la tabla de colores lleva tiempo y práctica. Si estás en medio de un proyecto y necesitas estar 100% seguro del valor de un componente antes de soldarlo, recuerda que en la página principal de ElectroLab Pro tienes nuestra <Link to="/" className="text-primary hover:underline font-semibold">Calculadora de Resistencias interactiva</Link>. Solo selecciona los colores que ves en tu componente y el sistema hará el cálculo matemático por ti con precisión absoluta.
      </p>
    </ArticleLayout>
  );
};

export default CodigoColoresResistencias;
