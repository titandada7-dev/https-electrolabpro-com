import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import labImg from "@/assets/kit-componentes.jpg";

const BlogPrimerLaboratorio = () => {
  return (
    <ArticleLayout
      title="Mi Primer Laboratorio de Electrónica: Guía Completa para Armarlo desde Cero"
      subtitle="Experiencia personal y consejos de experto para montar tu espacio de trabajo ideal: herramientas esenciales, organización, presupuesto y errores que debes evitar."
      slug="mi-primer-laboratorio"
      datePublished="2026-04-10"
      dateModified="2026-04-10"
    >
      {/* Imagen principal */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={labImg} alt="Kit de componentes electrónicos para armar un laboratorio casero" className="w-full max-h-72 object-cover" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Un buen laboratorio empieza con los componentes adecuados y un espacio bien organizado</p>
      </div>

      <div className="bg-card/30 border border-border rounded-xl p-5 mb-8">
        <p className="text-sm italic text-muted-foreground">
          <strong className="text-foreground">📝 Nota del autor:</strong> Este artículo está basado en mi experiencia personal montando laboratorios de electrónica durante más de 15 años. Desde un rincón de escritorio con un soldador barato hasta un banco de trabajo profesional completo, he cometido cada error posible para que tú no tengas que hacerlo.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Por qué necesitas un laboratorio propio?</h2>
      <p>
        Cuando empecé en la electrónica hace más de 15 años, mi "laboratorio" era la mesa del comedor. Soldaba con un soldador de pistola de 100W (completamente inapropiado para componentes electrónicos), usaba pinzas de depilar como "herramienta de precisión", y mis resistencias estaban todas mezcladas en una bolsa de plástico. El resultado era predecible: componentes quemados, soldaduras frías, y horas perdidas buscando una resistencia de 470Ω entre cientos de bandas de colores.
      </p>
      <p>
        La realidad es que un laboratorio bien organizado no es un lujo: es una <strong className="text-foreground">inversión que se paga sola</strong> en tiempo ahorrado, componentes que no quemas, y proyectos que realmente funcionan a la primera. No necesitas gastar una fortuna ni tener una habitación dedicada. Con el espacio de un escritorio pequeño y una inversión inicial inteligente, puedes tener todo lo necesario para diseñar, prototipar y depurar cualquier circuito.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Fase 1: Las herramientas absolutamente imprescindibles</h2>
      <p>
        Si tuviera que empezar de cero con un presupuesto limitado, estas son las herramientas en las que invertiría primero, en orden de prioridad:
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">1. Multímetro digital (€15-€50)</h3>
      <p>
        Es la herramienta más importante. Sin un <Link to="/articulos/multimetro" className="text-primary hover:underline font-semibold">multímetro</Link>, estás trabajando a ciegas. Mi recomendación para principiantes es el <strong className="text-foreground">ANENG AN8008</strong>: es True RMS, mide capacitancia, frecuencia y temperatura, y cuesta menos de 20€. Evita los multímetros de 3€ que venden en bazares — su precisión es terrible y pueden darte lecturas peligrosamente incorrectas.
      </p>
      <p>
        <strong className="text-foreground">Consejo personal:</strong> Antes de medir cualquier cosa, acostúmbrate a verificar que las puntas estén en los terminales correctos (COM y VΩ para voltaje/resistencia, COM y mA/A para corriente). He visto volar fusibles de multímetros por este error más veces de las que puedo contar.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">2. Estación de soldadura regulable (€30-€80)</h3>
      <p>
        Olvídate de los soldadores tipo lápiz de 30W sin control de temperatura. Una estación regulable como la <strong className="text-foreground">Hakko FX-888D</strong> o una clon china decente (busca "estación de soldadura 60W regulable") te cambia la vida. Poder ajustar la temperatura entre 200°C y 450°C significa que puedes <Link to="/articulos/soldadura-electronica" className="text-primary hover:underline font-semibold">soldar</Link> desde componentes SMD delicados hasta conectores gruesos sin quemar nada.
      </p>
      <p>
        <strong className="text-foreground">Mi error de novato:</strong> Durante mis primeros dos años usé un soldador de 100W sin regulación. La punta estaba siempre negra, el estaño no fluía bien, y levantaba pistas de PCB constantemente. Cuando compré mi primera estación regulable, fue como pasar de escribir con un palo a usar un bolígrafo de precisión.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">3. Protoboard y cables Dupont (€5-€15)</h3>
      <p>
        Una <strong className="text-foreground">protoboard de 830 puntos</strong> (la estándar) y un set de cables Dupont macho-macho, macho-hembra y hembra-hembra es todo lo que necesitas para prototipar cualquier circuito sin soldar. Complementa con unos cables de protoboard cortados (los rígidos cortos de colores) para mantener los montajes limpios.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">4. Fuente de alimentación (€10-€60)</h3>
      <p>
        Para empezar, un <strong className="text-foreground">módulo de fuente para protoboard</strong> que convierta un adaptador de 9-12V en 5V y 3.3V es suficiente (cuestan unos 3€). Cuando avances, invertí en una <Link to="/articulos/fuentes-de-alimentacion" className="text-primary hover:underline font-semibold">fuente de laboratorio ajustable</Link> de 0-30V / 0-5A. La posibilidad de limitar la corriente te salvará componentes y circuitos innumerables veces.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">5. Kit de componentes básicos (€15-€30)</h3>
      <p>
        Compra un kit surtido que incluya: resistencias (de 10Ω a 1MΩ), <Link to="/articulos/condensadores" className="text-primary hover:underline font-semibold">condensadores</Link> cerámicos y electrolíticos, <Link to="/articulos/diodos" className="text-primary hover:underline font-semibold">diodos</Link> rectificadores (1N4007) y Zener, LEDs de colores, <Link to="/articulos/transistores" className="text-primary hover:underline font-semibold">transistores</Link> NPN/PNP (2N2222, 2N2907), pulsadores, y un buzzer. Con esto puedes hacer el 80% de los proyectos para principiantes.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Fase 2: Herramientas de nivel intermedio</h2>
      <p>
        Una vez que tengas las herramientas básicas y hayas completado algunos proyectos, estas son las siguientes adquisiciones que recomiendo:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Herramienta</th>
              <th className="px-4 py-2 text-left font-mono">Precio aprox.</th>
              <th className="px-4 py-2 text-left font-mono">¿Por qué la necesitas?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Arduino UNO</td>
              <td className="px-4 py-2">€10-€25</td>
              <td className="px-4 py-2">El punto de entrada al mundo de los microcontroladores</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Osciloscopio portátil</td>
              <td className="px-4 py-2">€30-€100</td>
              <td className="px-4 py-2">Ver señales que el multímetro no puede mostrar</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Tercera mano con lupa</td>
              <td className="px-4 py-2">€10-€25</td>
              <td className="px-4 py-2">Sostener PCBs mientras sueldas, imprescindible</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Kit de sensores Arduino</td>
              <td className="px-4 py-2">€15-€30</td>
              <td className="px-4 py-2">DHT11, HC-SR04, LDR, PIR para proyectos IoT</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Pistola de aire caliente</td>
              <td className="px-4 py-2">€30-€80</td>
              <td className="px-4 py-2">Soldadura y desoldadura SMD profesional</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Organización del espacio: lecciones aprendidas a golpes</h2>
      <p>
        Después de años de frustración buscando componentes y herramientas, estos son mis consejos de organización que realmente funcionan:
      </p>
      <ul className="list-disc list-inside space-y-3 pl-2">
        <li>
          <strong className="text-foreground">Organizador de resistencias por valor:</strong> Compra un álbum de resistencias o usa sobres etiquetados. Separar las resistencias por valor te ahorra literalmente horas de trabajo con el <Link to="/articulos/codigo-colores-resistencias" className="text-primary hover:underline font-semibold">código de colores</Link>.
        </li>
        <li>
          <strong className="text-foreground">Cajas de plástico con compartimentos:</strong> Las cajas de pesca o las cajas de tornillos con divisiones son perfectas para organizar condensadores, transistores, diodos y LEDs por tipo y valor.
        </li>
        <li>
          <strong className="text-foreground">Iluminación LED blanca:</strong> Una lámpara de escritorio LED con brazo articulado y al menos 800 lúmenes. Soldar con poca luz es una receta para el desastre.
        </li>
        <li>
          <strong className="text-foreground">Alfombrilla de silicona:</strong> Protege tu mesa del calor del soldador y del estaño derretido. Las de 45x30cm con compartimentos para tornillos cuestan menos de 10€ y son fantásticas.
        </li>
        <li>
          <strong className="text-foreground">Etiqueta todo:</strong> Parece obsesivo, pero cuando tienes 50 bolsas de componentes, las etiquetas son la diferencia entre 2 minutos y 20 minutos buscando una pieza.
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Los 7 errores que cometí (y que tú puedes evitar)</h2>
      <ol className="list-decimal list-inside space-y-3 pl-2">
        <li>
          <strong className="text-foreground">Comprar herramientas baratas sin investigar:</strong> Un multímetro de 3€ me dio lecturas erróneas que me hicieron creer que un circuito perfectamente funcional estaba roto. Perdí un fin de semana entero depurando un problema que no existía.
        </li>
        <li>
          <strong className="text-foreground">No usar protección ESD:</strong> Quemé un chip ATmega328P de un Arduino por manipularlo sobre una alfombra sintética en invierno. Desde entonces, siempre uso pulsera antiestática cuando trabajo con circuitos integrados.
        </li>
        <li>
          <strong className="text-foreground">Soldar sin flux:</strong> Durante mis primeros proyectos, no entendía por qué mis soldaduras parecían bolas de estaño gris opaco. El flux limpia las superficies y permite que el estaño fluya correctamente — es la diferencia entre una soldadura profesional y un desastre.
        </li>
        <li>
          <strong className="text-foreground">No limitar la corriente de la fuente:</strong> Conecté un circuito con un cortocircuito accidental a una fuente sin protección. El transistor de potencia se calentó tanto que derritió el plástico de la protoboard. Una fuente con límite de corriente habría cortado instantáneamente.
        </li>
        <li>
          <strong className="text-foreground">Ignorar los condensadores de desacoplo:</strong> Mi primer proyecto con Arduino y motor DC se reiniciaba aleatoriamente. Tardé semanas en descubrir que un condensador de 100nF cerca de la alimentación del micro lo solucionaba todo.
        </li>
        <li>
          <strong className="text-foreground">No documentar los proyectos:</strong> Completé un circuito amplificador de audio que funcionaba perfectamente... y nunca pude recrearlo porque no anoté los valores de los componentes ni el esquemático. Ahora fotografío todo y uso software de esquemáticos.
        </li>
        <li>
          <strong className="text-foreground">Comprar componentes sueltos en vez de kits:</strong> Los kits surtidos cuestan solo un poco más que comprar 5 valores individuales, pero te dan 30-50 valores diferentes. La versatilidad de tener el componente correcto cuando lo necesitas no tiene precio.
        </li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Presupuesto realista: ¿cuánto cuesta realmente?</h2>
      <p>
        Esta es una estimación honesta basada en precios actuales de Amazon España:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Nivel</th>
              <th className="px-4 py-2 text-left font-mono">Inversión</th>
              <th className="px-4 py-2 text-left font-mono">Incluye</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Básico</td>
              <td className="px-4 py-2 font-bold">€50-€80</td>
              <td className="px-4 py-2">Multímetro, soldador básico, protoboard, kit de componentes, cables</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Intermedio</td>
              <td className="px-4 py-2 font-bold">€150-€250</td>
              <td className="px-4 py-2">Todo lo básico + estación de soldadura, Arduino, fuente ajustable, tercera mano</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Avanzado</td>
              <td className="px-4 py-2 font-bold">€400-€700</td>
              <td className="px-4 py-2">Todo lo anterior + osciloscopio digital, generador de señales, estación de aire caliente</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Mi recomendación: empieza con el nivel básico y ve subiendo según tus necesidades. No compres un osciloscopio de 200€ si todavía no dominas la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline font-semibold">Ley de Ohm</Link> o no sabes leer el código de colores de una resistencia.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tu primer proyecto: el circuito de verificación</h2>
      <p>
        Una vez que tengas tu laboratorio montado, te propongo un proyecto inicial que verificará que todas tus herramientas funcionan:
      </p>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Monta un circuito LED básico:</strong> Batería de 9V → resistencia de 330Ω → LED rojo → GND</li>
        <li><strong className="text-foreground">Mide el voltaje</strong> en la resistencia con tu multímetro (debería ser ~7.2V)</li>
        <li><strong className="text-foreground">Mide la corriente</strong> en serie (debería ser ~20mA)</li>
        <li><strong className="text-foreground">Verifica con la Ley de Ohm:</strong> <span className="font-mono text-primary">I = V/R = 7.2V / 330Ω ≈ 21.8mA</span> ✓</li>
        <li><strong className="text-foreground">Suelda el circuito</strong> en una placa perforada para practicar tu técnica</li>
        <li><strong className="text-foreground">Documenta el proyecto</strong> con fotos y notas para crear tu cuaderno de laboratorio</li>
      </ol>
      <p>
        Si todas las mediciones coinciden con los cálculos teóricos, felicidades: tu laboratorio está listo y calibrado. Si no coinciden, revisa las conexiones y verifica que tu multímetro esté en el rango correcto.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Seguridad: reglas que nunca debes romper</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Nunca trabajes con voltajes superiores a 50V DC o 25V AC</strong> sin formación profesional en seguridad eléctrica</li>
        <li><strong className="text-foreground">Siempre desconecta la alimentación</strong> antes de modificar un circuito</li>
        <li><strong className="text-foreground">Usa gafas de protección</strong> al cortar patas de componentes — los recortes metálicos salen disparados</li>
        <li><strong className="text-foreground">Ventilación al soldar:</strong> Los humos del flux son irritantes. Un extractor de humos o una ventana abierta son obligatorios</li>
        <li><strong className="text-foreground">Lávate las manos después de soldar:</strong> El estaño con plomo (60/40) es tóxico por ingestión</li>
        <li><strong className="text-foreground">Ten un extintor accesible:</strong> Especialmente si trabajas con baterías LiPo, que pueden incendiarse si se dañan</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión: el mejor momento para empezar es ahora</h2>
      <p>
        No esperes a tener el "laboratorio perfecto" para empezar a construir circuitos. El mejor laboratorio es el que usas, no el que sueñas. Con un multímetro, un soldador, una protoboard y un puñado de componentes ya puedes aprender más en una tarde de práctica que en un mes de teoría.
      </p>
      <p>
        Lo que diferencia a un principiante de un experto no es la calidad de sus herramientas, sino las horas de práctica, los componentes quemados, y la curiosidad de preguntarse "¿qué pasa si...?" después de cada proyecto exitoso. Tu laboratorio crecerá con tu conocimiento, y cada herramienta nueva que añadas abrirá puertas a proyectos que antes parecían imposibles.
      </p>
      <p>
        <strong className="text-foreground">¿Listo para empezar?</strong> Usa las <Link to="/" className="text-primary hover:underline font-semibold">calculadoras de ElectroLab Pro</Link> para planificar tu primer circuito y explora nuestros <Link to="/#guias" className="text-primary hover:underline font-semibold">artículos técnicos</Link> para profundizar en cada componente.
      </p>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🔧 Kit completo para tu primer laboratorio</p>
        <p className="text-muted-foreground text-sm">
          Kits de electrónica con multímetro, soldador, protoboard, componentes y herramientas para empezar desde cero.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+electronica+laboratorio+principiantes&tag=electrolabpro-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits de laboratorio en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default BlogPrimerLaboratorio;
