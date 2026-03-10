import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CodigoColoresResistencias = () => {
  return (
    <ArticleLayout
      title="Cómo Leer el Código de Colores de las Resistencias"
      subtitle="Aprende a identificar el valor de cualquier resistencia usando su código de bandas de colores. Guía completa con tablas, ejemplos y trucos."
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es el código de colores de las resistencias?</h2>
      <p>
        Las resistencias son uno de los componentes electrónicos más utilizados en cualquier circuito. Su función principal es limitar el flujo de corriente eléctrica, protegiendo otros componentes más delicados como LEDs, transistores o circuitos integrados. Pero, ¿cómo sabemos cuánta resistencia ofrece cada una? La respuesta está en las <strong className="text-foreground">bandas de colores</strong> pintadas sobre su cuerpo.
      </p>
      <p>
        Cada banda de color representa un número, un multiplicador o una tolerancia. Este sistema fue estandarizado internacionalmente para que cualquier ingeniero, técnico o aficionado pueda identificar el valor de una resistencia sin necesidad de instrumentos de medición, aunque siempre es recomendable verificar con un multímetro.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tabla de colores estándar</h2>
      <p>
        La tabla de colores es la herramienta fundamental que todo electrónico debe memorizar. Cada color se asocia a un dígito del 0 al 9:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Color</th>
              <th className="px-4 py-2 text-left font-mono">Dígito</th>
              <th className="px-4 py-2 text-left font-mono">Multiplicador</th>
              <th className="px-4 py-2 text-left font-mono">Tolerancia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              ["Negro", "0", "×1 Ω", "—"],
              ["Marrón", "1", "×10 Ω", "±1%"],
              ["Rojo", "2", "×100 Ω", "±2%"],
              ["Naranja", "3", "×1 kΩ", "—"],
              ["Amarillo", "4", "×10 kΩ", "—"],
              ["Verde", "5", "×100 kΩ", "±0.5%"],
              ["Azul", "6", "×1 MΩ", "±0.25%"],
              ["Violeta", "7", "×10 MΩ", "±0.1%"],
              ["Gris", "8", "×100 MΩ", "±0.05%"],
              ["Blanco", "9", "×1 GΩ", "—"],
              ["Dorado", "—", "×0.1 Ω", "±5%"],
              ["Plateado", "—", "×0.01 Ω", "±10%"],
            ].map(([color, digit, mult, tol]) => (
              <tr key={color} className="hover:bg-card/60 transition-colors">
                <td className="px-4 py-2 font-semibold text-foreground">{color}</td>
                <td className="px-4 py-2">{digit}</td>
                <td className="px-4 py-2">{mult}</td>
                <td className="px-4 py-2">{tol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Resistencias de 4 bandas</h2>
      <p>
        Las resistencias de 4 bandas son las más comunes en proyectos de electrónica básica y educación. Su lectura es sencilla: las dos primeras bandas representan los dígitos significativos, la tercera banda es el multiplicador y la cuarta banda indica la tolerancia.
      </p>
      <p>
        <strong className="text-foreground">Ejemplo práctico:</strong> Imagina una resistencia con bandas <span className="text-foreground font-semibold">Marrón - Negro - Rojo - Dorado</span>. El primer dígito es 1 (marrón), el segundo es 0 (negro), el multiplicador es ×100 (rojo), y la tolerancia es ±5% (dorado). Resultado: <strong className="text-primary">1,000 Ω = 1 kΩ ±5%</strong>.
      </p>
      <p>
        Un truco útil: la banda de tolerancia suele estar más separada de las demás o ser más delgada. Eso te ayuda a identificar por dónde empezar a leer. Si tienes dudas, gira la resistencia para que la banda dorada o plateada quede a la derecha.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Resistencias de 5 bandas</h2>
      <p>
        Las resistencias de 5 bandas ofrecen mayor precisión y se utilizan en circuitos donde los valores exactos son críticos, como en instrumentación, audio profesional o circuitos de medición. En este caso, las tres primeras bandas son dígitos significativos, la cuarta es el multiplicador y la quinta es la tolerancia.
      </p>
      <p>
        <strong className="text-foreground">Ejemplo:</strong> Una resistencia con bandas <span className="text-foreground font-semibold">Rojo - Violeta - Negro - Rojo - Marrón</span> se lee así: 2 (rojo), 7 (violeta), 0 (negro), multiplicador ×100 (rojo), tolerancia ±1% (marrón). Resultado: <strong className="text-primary">27,000 Ω = 27 kΩ ±1%</strong>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores comunes al leer resistencias</h2>
      <p>
        Incluso los técnicos experimentados pueden cometer errores al leer el código de colores. Estos son los más frecuentes:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Leer al revés:</strong> Confundir la dirección de lectura es muy común. Recuerda que la banda de tolerancia (dorada o plateada) siempre va al final (derecha).</li>
        <li><strong className="text-foreground">Confundir colores similares:</strong> Marrón y rojo, o naranja y amarillo, pueden parecer idénticos bajo cierta iluminación. Usa siempre buena luz natural o una lupa.</li>
        <li><strong className="text-foreground">Ignorar la tolerancia:</strong> Una resistencia de 1 kΩ con ±10% puede medir entre 900 Ω y 1,100 Ω. En circuitos sensibles, esto marca la diferencia.</li>
        <li><strong className="text-foreground">No verificar con el multímetro:</strong> El código de colores es una referencia rápida, pero el valor real puede variar. Siempre mide antes de soldar.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Trucos mnemotécnicos para memorizar los colores</h2>
      <p>
        Existen varias frases mnemotécnicas populares para recordar la secuencia de colores (Negro=0, Marrón=1, Rojo=2...):
      </p>
      <div className="p-4 rounded-xl border border-primary/20 bg-card/60">
        <p className="text-foreground font-mono text-sm italic">
          "<strong>N</strong>o <strong>M</strong>e <strong>R</strong>ío <strong>N</strong>ada, <strong>A</strong>marillo <strong>V</strong>erdoso <strong>A</strong>zulado <strong>V</strong>iolentamente <strong>G</strong>ritó <strong>B</strong>lanca"
        </p>
        <p className="text-xs text-muted-foreground mt-2">Negro, Marrón, Rojo, Naranja, Amarillo, Verde, Azul, Violeta, Gris, Blanco</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Por qué es importante saber leer resistencias?</h2>
      <p>
        Conocer el código de colores te permite trabajar más rápido, evitar errores costosos y entender los esquemas electrónicos profesionales. En un entorno de prototipado rápido, no siempre tendrás un multímetro a mano, y poder identificar una resistencia al instante ahorra tiempo valioso. Además, esta habilidad es fundamental en exámenes de electrónica, certificaciones técnicas y entrevistas de trabajo en el sector.
      </p>
      <p>
        Te recomendamos practicar con nuestra <Link to="/" className="text-primary hover:underline font-semibold">calculadora de resistencias interactiva</Link> disponible en la página principal de ElectroLab Pro.
      </p>

      {/* CTA */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-card/80 backdrop-blur space-y-4">
        <h3 className="text-lg font-mono font-bold text-foreground text-center">🛠️ Kit de Resistencias Surtidas</h3>
        <p className="text-sm text-center">Más de 500 resistencias en valores estándar, organizadas en caja clasificadora. Perfecto para practicar.</p>
        <div className="text-center">
          <a
            href="https://www.amazon.es/s?k=kit+resistencias+electronica&tag=electrolabpro-21"
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

export default CodigoColoresResistencias;
