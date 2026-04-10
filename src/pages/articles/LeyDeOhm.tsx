import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import ohmTriangleImg from "@/assets/ley-de-ohm-triangle.jpg";

const LeyDeOhm = () => {
  return (
    <ArticleLayout
      title="Ley de Ohm: Guía Completa con Ejemplos Prácticos"
      subtitle="Domina la relación entre voltaje, corriente y resistencia. Fórmulas, triángulo de Ohm, ejemplos resueltos y aplicaciones reales en electrónica."
      slug="ley-de-ohm"
    >
      {/* Diagrama del Triángulo de Ohm */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={ohmTriangleImg} alt="Triángulo de la Ley de Ohm mostrando las fórmulas V=I×R, I=V/R y R=V/I con voltaje, corriente y resistencia" className="w-full max-h-72 object-contain p-4" loading="lazy" width={800} height={800} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: El Triángulo de Ohm — herramienta visual para recordar las tres fórmulas fundamentales</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es la Ley de Ohm?</h2>
      <p>
        La <strong className="text-foreground">Ley de Ohm</strong> es la base fundamental de toda la electrónica y la electricidad. Formulada por el físico alemán Georg Simon Ohm en 1827, establece la relación matemática entre tres magnitudes eléctricas esenciales: el <strong className="text-foreground">voltaje (V)</strong>, la <strong className="text-foreground">corriente (I)</strong> y la <strong className="text-foreground">resistencia (R)</strong>.
      </p>
      <p>
        En términos simples, esta ley nos dice que la corriente que circula por un conductor es directamente proporcional al voltaje aplicado e inversamente proporcional a la resistencia del mismo. Si aumentas el voltaje, la corriente aumenta. Si aumentas la resistencia, la corriente disminuye.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La fórmula fundamental</h2>
      <p>
        La expresión matemática de la Ley de Ohm se escribe de tres formas equivalentes, dependiendo de qué magnitud queremos calcular:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Para calcular</th>
              <th className="px-4 py-2 text-left font-mono">Fórmula</th>
              <th className="px-4 py-2 text-left font-mono">Unidad</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-4 py-2">Voltaje (V)</td><td className="px-4 py-2 font-mono text-primary">V = I × R</td><td className="px-4 py-2">Voltios (V)</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2">Corriente (I)</td><td className="px-4 py-2 font-mono text-primary">I = V / R</td><td className="px-4 py-2">Amperios (A)</td></tr>
            <tr className="border-t border-border"><td className="px-4 py-2">Resistencia (R)</td><td className="px-4 py-2 font-mono text-primary">R = V / I</td><td className="px-4 py-2">Ohmios (Ω)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">El triángulo de Ohm</h2>
      <p>
        Una herramienta visual muy útil para recordar las tres fórmulas es el <strong className="text-foreground">Triángulo de Ohm</strong> (también llamado triángulo VIR). Dibuja un triángulo dividido en tres secciones: V arriba, I abajo a la izquierda y R abajo a la derecha. Para encontrar cualquier magnitud, tapa la letra que buscas y lo que queda es la fórmula:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Tapas V</strong> → quedan I × R (multiplicar)</li>
        <li><strong className="text-foreground">Tapas I</strong> → queda V sobre R (dividir)</li>
        <li><strong className="text-foreground">Tapas R</strong> → queda V sobre I (dividir)</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ejemplos prácticos resueltos</h2>
      
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Ejemplo 1: Calcular la corriente de un LED</h3>
      <p>
        Tienes una fuente de 9V y quieres encender un LED rojo que necesita 2V y un máximo de 20mA. ¿Qué resistencia necesitas?
      </p>
      <p>
        El voltaje que debe caer en la resistencia es: <span className="font-mono text-primary">V = 9V - 2V = 7V</span>. Aplicando la Ley de Ohm: <span className="font-mono text-primary">R = V / I = 7V / 0.020A = 350Ω</span>. Usarías una resistencia comercial de <strong className="text-foreground">390Ω</strong> (el valor estándar más cercano por encima).
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Ejemplo 2: Medir el consumo de un motor</h3>
      <p>
        Un motor pequeño de 12V tiene una resistencia interna de 6Ω. ¿Cuánta corriente consumirá? Aplicando: <span className="font-mono text-primary">I = V / R = 12V / 6Ω = 2A</span>. El motor consumirá 2 amperios, lo que implica una potencia de <span className="font-mono text-primary">P = V × I = 12V × 2A = 24W</span>.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Ejemplo 3: Divisor de voltaje</h3>
      <p>
        Para crear un divisor de voltaje que entregue 3.3V desde una fuente de 5V, necesitas dos resistencias. Usando la fórmula del divisor: <span className="font-mono text-primary">Vout = Vin × (R2 / (R1 + R2))</span>. Con R1 = 1kΩ y R2 = 2kΩ: <span className="font-mono text-primary">Vout = 5V × (2000 / 3000) = 3.33V</span>. Perfecto para alimentar sensores de 3.3V desde un Arduino de 5V.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ley de Ohm y la potencia eléctrica</h2>
      <p>
        Combinando la Ley de Ohm con la fórmula de potencia (<span className="font-mono text-primary">P = V × I</span>), obtenemos fórmulas derivadas muy útiles:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><span className="font-mono text-primary">P = I² × R</span> — útil cuando conoces corriente y resistencia</li>
        <li><span className="font-mono text-primary">P = V² / R</span> — útil cuando conoces voltaje y resistencia</li>
      </ul>
      <p>
        Estas fórmulas son críticas para dimensionar correctamente los componentes. Una resistencia que disipa más potencia de la que soporta se quemará. Por ejemplo, una resistencia de 100Ω con 12V: <span className="font-mono text-primary">P = 144 / 100 = 1.44W</span>. Necesitarías al menos una resistencia de 2W.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Limitaciones de la Ley de Ohm</h2>
      <p>
        La Ley de Ohm aplica perfectamente a <strong className="text-foreground">materiales óhmicos</strong> (resistencias, cables, conductores metálicos), donde la relación V/I es constante. Sin embargo, hay componentes <strong className="text-foreground">no óhmicos</strong> donde esta relación varía:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Diodos</strong>: no conducen hasta alcanzar su voltaje umbral (0.7V en silicio)</li>
        <li><strong className="text-foreground">Transistores</strong>: la corriente depende de la señal de control (base o gate)</li>
        <li><strong className="text-foreground">Termistores</strong>: su resistencia cambia con la temperatura</li>
        <li><strong className="text-foreground">Varistores</strong>: su resistencia cambia con el voltaje aplicado</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Aplicaciones en el mundo real</h2>
      <p>
        La Ley de Ohm se usa constantemente en diseño electrónico: calcular resistencias limitadoras para LEDs, dimensionar fuentes de alimentación, diseñar amplificadores, proteger circuitos con fusibles, y calcular la caída de voltaje en cables largos. Cada vez que conectas un componente, estás aplicando esta ley.
      </p>
      <p>
        En la industria, se utiliza para calcular secciones de cable, protecciones eléctricas, y eficiencia energética de instalaciones. Un electricista que dimensiona mal los cables de una instalación puede provocar sobrecalentamiento e incendios.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos para principiantes</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Memoriza el triángulo VIR: te salvará en cualquier cálculo rápido</li>
        <li>Siempre verifica tus cálculos con un <strong className="text-foreground">multímetro</strong> antes de conectar</li>
        <li>Ten en cuenta la <strong className="text-foreground">tolerancia</strong> de las resistencias (±5%, ±1%)</li>
        <li>Recuerda que la Ley de Ohm también aplica a secciones parciales de un circuito</li>
        <li>Practica con circuitos simples en una <strong className="text-foreground">protoboard</strong> antes de soldar</li>
      </ul>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🧪 Practica la Ley de Ohm con componentes reales</p>
        <p className="text-muted-foreground text-sm">
          Consigue un kit de resistencias, LEDs y protoboard para experimentar con tus propios circuitos.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+electronica+principiantes&tag=electrolabpro-21"
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

export default LeyDeOhm;
