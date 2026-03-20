import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";

const Condensadores = () => {
  return (
    <ArticleLayout
      title="Guía de Condensadores: Tipos, Funciones y Cómo Leerlos"
      subtitle="Aprende qué es un condensador, cómo identificar sus tipos y descifrar el código cerámico de 3 números."
      slug="condensadores"
    >
      <p>
        Si una batería es como una represa que almacena muchísima energía a largo plazo, un condensador (o capacitor) es como un tanque de agua pequeño: se llena rapidísimo y se puede vaciar de golpe. En electrónica, estos componentes son vitales para filtrar ruidos, estabilizar voltajes y arrancar motores.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La unidad de medida: El Faradio</h2>
      <p>
        La capacidad de almacenar energía de un condensador se mide en Faradios (F). Sin embargo, un Faradio es una unidad gigantesca. En el laboratorio del día a día, trabajarás siempre con submúltiplos mucho más pequeños:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Microfaradio (µF):</strong> La millonésima parte de un Faradio. Muy común en fuentes de alimentación.</li>
        <li><strong className="text-foreground">Nanofaradio (nF):</strong> Mil veces más pequeño que el microfaradio.</li>
        <li><strong className="text-foreground">Picofaradio (pF):</strong> La billonésima parte. Se usa en circuitos de radiofrecuencia y osciladores.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Los dos gigantes del laboratorio</h2>
      <p>
        Aunque hay muchos materiales, el 90% de las veces te cruzarás con estos dos tipos en tu protoboard:
      </p>

      <h2 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">1. Condensadores Electrolíticos (Los cilindros)</h2>
      <p>
        Son como pequeños barriles. Tienen mucha capacidad (generalmente de 1µF en adelante) y se usan para estabilizar la corriente.
      </p>
      <p>
        <strong className="text-foreground">¡Cuidado, tienen polaridad!</strong> Tienen una pata larga (Positivo) y una pata corta (Negativo). Además, el cuerpo tiene una franja gris marcando el lado negativo. Si los conectas al revés, literalmente explotan.
      </p>
      <p>
        <strong className="text-foreground">Voltaje máximo:</strong> Siempre traen impreso un voltaje (ej. 16V, 25V, 50V). Nunca los uses en un circuito que supere ese voltaje.
      </p>

      <h2 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">2. Condensadores Cerámicos (Las lentejas)</h2>
      <p>
        Parecen pequeñas lentejas de color mostaza o marrón. Manejan capacidades muy pequeñas (en picofaradios o nanofaradios) y son excelentes para filtrar ruidos de alta frecuencia.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">No tienen polaridad:</strong> Puedes conectarlos de cualquier lado, no importa.</li>
        <li><strong className="text-foreground">El código secreto:</strong> Como son tan pequeños, no tienen espacio para imprimir "100.000 pF". Usan un código de 3 números, similar a las resistencias.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo descifrar el código cerámico (Ejemplo: 104)</h2>
      <p>
        Leer un condensador cerámico es un clásico tropiezo de principiante, pero la regla es fácil. Tomemos el famoso código "104":
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">El primer número (1)</strong> es el primer dígito.</li>
        <li><strong className="text-foreground">El segundo número (0)</strong> es el segundo dígito. (Hasta aquí tenemos un 10).</li>
        <li><strong className="text-foreground">El tercer número (4)</strong> es el multiplicador: la cantidad de ceros que debes agregar. En este caso, cuatro ceros.</li>
      </ul>
      <p>
        Resultado: <strong className="text-primary">100.000</strong>.
      </p>
      <p>
        <strong className="text-foreground">La clave de oro:</strong> El resultado de este código siempre se lee en Picofaradios (pF).
      </p>
      <p>
        Por lo tanto, un condensador "104" es de <strong className="text-primary">100.000 pF</strong> (que equivale a 100 nF o 0.1 µF).
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Por qué mi circuito necesita condensadores?</h2>
      <p>
        Si estás armando un proyecto con microcontroladores y notas que se reinicia solo o se comporta de forma errática, probablemente tengas "ruido" en la línea de alimentación. Colocar un condensador electrolítico grande y uno cerámico pequeño (como un 104) en paralelo cerca de la alimentación de tu chip es la receta mágica que todo ingeniero usa para estabilizar la energía.
      </p>
      <p>
        ¿Querés practicar con componentes reales? Usá nuestra <Link to="/" className="text-primary hover:underline font-semibold">Calculadora de Resistencias</Link> en la página principal de ElectroLab Pro para complementar tu aprendizaje.
      </p>
    </ArticleLayout>
  );
};

export default Condensadores;
