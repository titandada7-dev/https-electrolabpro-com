import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import capacitorImg from "@/assets/capacitor-types.png";
import AplicaloAhora from "@/components/AplicaloAhora";

const Condensadores = () => {
  return (
    <ArticleLayout
      title="Guía de Condensadores: Tipos, Funciones y Cómo Leerlos"
      subtitle="Aprende qué es un condensador, cómo identificar sus tipos y descifrar el código cerámico de 3 números."
      slug="condensadores"
      schemaType="TechArticle"
      proficiencyLevel="Beginner"
    >
      {/* Imagen de tipos de condensadores */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={capacitorImg} alt="Diferentes tipos de condensadores: electrolítico, cerámico, de poliéster y de tantalio" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Tipos de condensadores más comunes en electrónica: electrolíticos, cerámicos y de poliéster</p>
      </div>

      <p>
        Si una batería es como una represa que almacena muchísima energía a largo plazo, un condensador (o capacitor) es como un tanque de agua pequeño: se llena rapidísimo y se puede vaciar de golpe. En electrónica, estos componentes son vitales para filtrar ruidos, estabilizar voltajes y arrancar motores. Sin condensadores, ningún circuito moderno funcionaría correctamente: desde tu teléfono móvil hasta el control remoto de tu televisor, todos dependen de estos componentes para operar de forma estable.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Cómo funciona un condensador?</h2>
      <p>
        Un condensador está formado por dos placas conductoras separadas por un material aislante llamado <strong className="text-foreground">dieléctrico</strong>. Cuando aplicas voltaje, los electrones se acumulan en una placa (carga negativa) y se repelen de la otra (carga positiva). Esta diferencia de carga almacena energía en forma de <strong className="text-foreground">campo eléctrico</strong>. Cuando desconectas la fuente, el condensador mantiene esa carga y puede liberarla cuando el circuito lo necesite.
      </p>
      <p>
        La velocidad a la que un condensador se carga o descarga depende de la capacitancia (C) y de la resistencia del circuito (R). La constante de tiempo <span className="font-mono text-primary">τ = R × C</span> indica cuánto tarda en cargarse al 63% de su voltaje final. Después de 5τ, se considera completamente cargado (99.3%).
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La unidad de medida: El Faradio</h2>
      <p>
        La capacidad de almacenar energía de un condensador se mide en Faradios (F). Sin embargo, un Faradio es una unidad gigantesca. En el laboratorio del día a día, trabajarás siempre con submúltiplos mucho más pequeños:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Unidad</th>
              <th className="px-4 py-2 text-left font-mono">Símbolo</th>
              <th className="px-4 py-2 text-left font-mono">Equivalencia</th>
              <th className="px-4 py-2 text-left font-mono">Uso típico</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2">Microfaradio</td>
              <td className="px-4 py-2 font-mono text-primary">µF</td>
              <td className="px-4 py-2 font-mono">10⁻⁶ F</td>
              <td className="px-4 py-2">Fuentes de alimentación, filtros</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2">Nanofaradio</td>
              <td className="px-4 py-2 font-mono text-primary">nF</td>
              <td className="px-4 py-2 font-mono">10⁻⁹ F</td>
              <td className="px-4 py-2">Filtros, temporizadores</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2">Picofaradio</td>
              <td className="px-4 py-2 font-mono text-primary">pF</td>
              <td className="px-4 py-2 font-mono">10⁻¹² F</td>
              <td className="px-4 py-2">Radiofrecuencia, osciladores</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Los dos gigantes del laboratorio</h2>
      <p>
        Aunque hay muchos materiales, el 90% de las veces te cruzarás con estos dos tipos en tu protoboard:
      </p>

      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">1. Condensadores Electrolíticos (Los cilindros)</h3>
      <p>
        Son como pequeños barriles. Tienen mucha capacidad (generalmente de 1µF en adelante) y se usan para estabilizar la corriente en <Link to="/articulos/fuentes-de-alimentacion" className="text-primary hover:underline font-semibold">fuentes de alimentación</Link> y filtrar ripple (ondulación) de voltaje DC rectificado.
      </p>
      <p>
        <strong className="text-foreground">¡Cuidado, tienen polaridad!</strong> Tienen una pata larga (Positivo) y una pata corta (Negativo). Además, el cuerpo tiene una franja gris marcando el lado negativo. Si los conectas al revés, literalmente explotan. No es una exageración: un electrolítico de gran capacidad conectado al revés puede reventar violentamente en cuestión de segundos.
      </p>
      <p>
        <strong className="text-foreground">Voltaje máximo:</strong> Siempre traen impreso un voltaje (ej. 16V, 25V, 50V). Nunca los uses en un circuito que supere ese voltaje. Como regla práctica, elige un condensador cuyo voltaje nominal sea al menos un <strong className="text-foreground">50% mayor</strong> que el voltaje máximo que verá en tu circuito.
      </p>

      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">2. Condensadores Cerámicos (Las lentejas)</h3>
      <p>
        Parecen pequeñas lentejas de color mostaza o marrón. Manejan capacidades muy pequeñas (en picofaradios o nanofaradios) y son excelentes para filtrar ruidos de alta frecuencia. Son los componentes que encontrarás junto a prácticamente cada circuito integrado en cualquier PCB profesional.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">No tienen polaridad:</strong> Puedes conectarlos de cualquier lado, no importa.</li>
        <li><strong className="text-foreground">El código secreto:</strong> Como son tan pequeños, no tienen espacio para imprimir "100.000 pF". Usan un código de 3 números, similar al de las <Link to="/articulos/codigo-colores-resistencias" className="text-primary hover:underline font-semibold">resistencias</Link>.</li>
        <li><strong className="text-foreground">Respuesta rápida:</strong> Tienen una impedancia muy baja a altas frecuencias, lo que los hace ideales para filtrar ruido digital.</li>
      </ul>

      <h3 className="text-lg md:text-xl font-mono font-bold text-foreground mt-6">3. Otros tipos que encontrarás</h3>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Poliéster/Mylar:</strong> Condensadores rectangulares de color verde o amarillo. Capacidades de 1nF a 10µF. Buenos para audio y filtros. Sin polaridad.</li>
        <li><strong className="text-foreground">Tantalio:</strong> Más pequeños que los electrolíticos pero con mejor rendimiento. <strong className="text-primary">Tienen polaridad</strong> y son sensibles a sobrevoltaje. Son caros pero ofrecen baja ESR (resistencia serie equivalente).</li>
        <li><strong className="text-foreground">Supercondensadores:</strong> Capacidades enormes (1F o más). Se usan como baterías de respaldo temporal. Pueden mantener un circuito encendido durante minutos u horas.</li>
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
        Por lo tanto, un condensador "104" es de <strong className="text-primary">100.000 pF</strong> (que equivale a 100 nF o 0.1 µF). Este condensador es tan popular que tiene un apodo en electrónica: el "condensador de desacoplo universal".
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">Más ejemplos de códigos cerámicos</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Código</th>
              <th className="px-4 py-2 text-left font-mono">Cálculo</th>
              <th className="px-4 py-2 text-left font-mono">Valor (pF)</th>
              <th className="px-4 py-2 text-left font-mono">Equivalencia</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-4 py-2 font-mono text-primary">101</td><td className="px-4 py-2">10 + 0 = 100</td><td className="px-4 py-2">100 pF</td><td className="px-4 py-2">0.1 nF</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2 font-mono text-primary">222</td><td className="px-4 py-2">22 + 00 = 2200</td><td className="px-4 py-2">2200 pF</td><td className="px-4 py-2">2.2 nF</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2 font-mono text-primary">473</td><td className="px-4 py-2">47 + 000 = 47000</td><td className="px-4 py-2">47000 pF</td><td className="px-4 py-2">47 nF</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2 font-mono text-primary">104</td><td className="px-4 py-2">10 + 0000 = 100000</td><td className="px-4 py-2">100000 pF</td><td className="px-4 py-2">100 nF = 0.1 µF</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2 font-mono text-primary">105</td><td className="px-4 py-2">10 + 00000 = 1000000</td><td className="px-4 py-2">1000000 pF</td><td className="px-4 py-2">1 µF</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Condensadores en serie y en paralelo</h2>
      <p>
        Al igual que con las <Link to="/articulos/circuitos-serie-paralelo" className="text-primary hover:underline font-semibold">resistencias</Link>, puedes combinar condensadores, pero ¡las fórmulas están invertidas!
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">En paralelo:</strong> Las capacidades se suman directamente: <span className="font-mono text-primary">C_total = C₁ + C₂ + C₃</span>. Útil para obtener capacidades mayores.</li>
        <li><strong className="text-foreground">En serie:</strong> Se usa la fórmula inversa: <span className="font-mono text-primary">1/C_total = 1/C₁ + 1/C₂</span>. El resultado siempre es menor que el menor de los condensadores.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Por qué mi circuito necesita condensadores?</h2>
      <p>
        Si estás armando un proyecto con microcontroladores y notas que se reinicia solo o se comporta de forma errática, probablemente tengas "ruido" en la línea de alimentación. Colocar un condensador electrolítico grande (10-100µF) y uno cerámico pequeño (como un 104 = 100nF) en paralelo cerca de la alimentación de tu chip es la receta mágica que todo ingeniero usa para estabilizar la energía. Este par de condensadores actúa como un "amortiguador" que absorbe los picos y valles de voltaje causados por el consumo variable de corriente del microcontrolador.
      </p>
      <p>
        <strong className="text-foreground">Ejemplo práctico con Arduino:</strong> Si tu Arduino se reinicia cuando activas un relé o motor, coloca un electrolítico de 100µF/25V y un cerámico de 100nF entre VCC y GND, lo más cerca posible del pin de alimentación del Arduino. El electrolítico absorbe las caídas de voltaje grandes y el cerámico filtra el ruido de alta frecuencia.
      </p>
      <p>
        ¿Querés practicar con componentes reales? Usá nuestra <Link to="/" className="text-primary hover:underline font-semibold">Calculadora de Resistencias</Link> en la página principal de ElectroLab Pro para complementar tu aprendizaje.
      </p>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">⚡ Kit de Condensadores Surtidos</p>
        <p className="text-muted-foreground text-sm">
          Pack con condensadores electrolíticos y cerámicos de todos los valores comunes para tus proyectos.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+condensadores+surtidos+electronica&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits de condensadores en Amazon
        </a>
      </div>

      <AplicaloAhora
        tools={[
          { to: "/#calculadora", label: "Calculadora de reactancia capacitiva (Xc)", desc: "Calculá la oposición de un capacitor a la corriente alterna." },
          { to: "/#calculadora", label: "Calculadora de filtro RC pasa-bajos / altos", desc: "Diseñá filtros con resistencia y condensador." },
          { to: "/#calculadora", label: "Calculadora de temporizador 555", desc: "Generá frecuencias usando R y C en astable." },
          { to: "/guia-resistencias", label: "Guía completa de resistencias", desc: "Componente clave junto al condensador en filtros y RC." },
        ]}
      />
    </ArticleLayout>
  );
};

export default Condensadores;
