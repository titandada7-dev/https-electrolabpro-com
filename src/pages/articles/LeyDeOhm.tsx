import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import ohmTriangleImg from "@/assets/ley-de-ohm-triangle.jpg";
import PlayCTA from "@/components/PlayCTA";
import AplicaloAhora from "@/components/AplicaloAhora";

const LeyDeOhm = () => {
  return (
    <ArticleLayout
      title="Ley de Ohm: Guía Completa con Ejemplos Prácticos"
      subtitle="Domina la relación entre voltaje, corriente y resistencia. Fórmulas, triángulo de Ohm, ejemplos resueltos y aplicaciones reales en electrónica."
      slug="ley-de-ohm"
      schemaType="TechArticle"
      proficiencyLevel="Beginner"
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

      <PlayCTA topic="ohm" />

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

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Historia y contexto científico de Georg Ohm</h2>
      <p>
        Georg Simon Ohm (1789-1854) era hijo de un cerrajero alemán autodidacta. A pesar de no contar con educación formal sólida, publicó en 1827 su obra fundamental <em>"Die galvanische Kette, mathematisch bearbeitet"</em> ("El circuito galvánico investigado matemáticamente"), donde estableció la relación matemática que hoy conocemos como Ley de Ohm. La comunidad científica de su época rechazó su trabajo durante años; recién en 1841 la Royal Society de Londres le otorgó la Medalla Copley reconociendo su aporte. Hoy, la unidad de resistencia eléctrica lleva su nombre en honor a este descubrimiento que sentó las bases de toda la electrotécnica moderna.
      </p>
      <p>
        Antes del trabajo de Ohm, los científicos sabían cualitativamente que un voltaje mayor producía más corriente, pero nadie había cuantificado la relación. Ohm realizó cientos de experimentos con cables de diferentes longitudes y secciones, usando termopilas de bismuto-cobre como fuente de fuerza electromotriz estable, y midiendo la corriente con un galvanómetro de torsión que él mismo construyó. Su rigor metodológico fue extraordinario para la época.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Derivación física: ¿por qué V = I × R?</h2>
      <p>
        En un conductor metálico, los electrones libres se desplazan bajo la acción del campo eléctrico generado por una diferencia de potencial. Sin embargo, no se mueven libremente: chocan constantemente contra los iones de la red cristalina del metal. Estos choques son los que generan la <strong className="text-foreground">resistencia</strong> y disipan energía en forma de calor (efecto Joule).
      </p>
      <p>
        Matemáticamente, la densidad de corriente J es proporcional al campo eléctrico E mediante la conductividad σ del material: <span className="font-mono text-primary">J = σ × E</span>. Integrando esta ecuación a lo largo de un conductor de longitud L y sección A obtenemos la forma macroscópica: <span className="font-mono text-primary">V = (L / σA) × I = R × I</span>, donde R = L/(σA) es la resistencia geométrica del conductor. Por eso un cable largo y delgado tiene más resistencia que uno corto y grueso del mismo material.
      </p>
      <p>
        La constante σ depende del material: el cobre tiene σ ≈ 5.96 × 10⁷ S/m (excelente conductor), mientras que el nicromo usado en resistencias calefactoras tiene σ ≈ 9.3 × 10⁵ S/m, unas 60 veces menos. Esto explica por qué una resistencia comercial de carbón o película metálica puede tener cientos o miles de ohmios en un cuerpo de pocos milímetros.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Ejercicio resuelto avanzado: tira de LEDs de 12V</h2>
      <p>
        Querés alimentar una tira de 30 LEDs blancos en serie-paralelo desde una batería de 12V. Cada LED blanco tiene Vf = 3.2V e If = 20mA óptima. ¿Cómo agrupar y qué resistencias usar?
      </p>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Calcular grupos en serie:</strong> Con 12V disponibles, podés poner 3 LEDs en serie (3 × 3.2V = 9.6V) dejando 2.4V para la resistencia limitadora.</li>
        <li><strong className="text-foreground">Calcular la resistencia por rama:</strong> <span className="font-mono text-primary">R = (12V - 9.6V) / 0.020A = 120Ω</span>.</li>
        <li><strong className="text-foreground">Calcular cantidad de ramas:</strong> 30 LEDs ÷ 3 LEDs/rama = 10 ramas en paralelo.</li>
        <li><strong className="text-foreground">Calcular potencia disipada por resistencia:</strong> <span className="font-mono text-primary">P = I² × R = 0.020² × 120 = 0.048W</span>. Una resistencia comercial de 1/4W es más que suficiente.</li>
        <li><strong className="text-foreground">Corriente total del sistema:</strong> 10 ramas × 20mA = 200mA. La batería debe poder entregar al menos 250mA.</li>
      </ol>
      <p>
        Si en lugar de 12V usaras una fuente de 5V (USB), no podrías poner 3 LEDs en serie (necesitarían 9.6V). En ese caso, conviene 1 LED por rama: <span className="font-mono text-primary">R = (5 - 3.2) / 0.020 = 90Ω</span>, valor estándar 100Ω, con 30 ramas en paralelo y un consumo total de 600mA.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Casos reales de fallo por aplicar mal la Ley de Ohm</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">LED quemado en 0.1 segundos:</strong> Conectar un LED de 2V directamente a 5V sin resistencia limitadora. La corriente teórica sería infinita (R interna ~10Ω); en la práctica, pasan 200-300mA y el LED se destruye instantáneamente. Solución: siempre calcular R = (Vfuente - Vled) / Iled.</li>
        <li><strong className="text-foreground">Caída de voltaje en cable USB largo:</strong> Un cable USB de 3 metros con conductores AWG 28 tiene ~0.5Ω total. Con un dispositivo que consume 2A, la caída es V = 2 × 0.5 = 1V. El dispositivo recibe solo 4V en lugar de 5V y puede no arrancar. Solución: usar cable AWG 24 o más grueso para cargas altas.</li>
        <li><strong className="text-foreground">Resistencia subdimensionada que se quema:</strong> Resistencia de 1kΩ a 1/4W conectada a 24V disipa P = 24²/1000 = 0.576W, más del doble de lo permitido. Se carboniza en segundos. Solución: usar 1W o más.</li>
        <li><strong className="text-foreground">Microcontrolador resetea aleatoriamente:</strong> ESP32 alimentado por jumper delgado de 30cm tiene resistencia de ~0.3Ω. En picos de WiFi (500mA), la caída es 0.15V, suficiente para que el regulador interno entre en brownout. Solución: alimentación dedicada con cable corto y grueso.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Preguntas frecuentes sobre la Ley de Ohm</h2>
      <details className="border border-border rounded-lg p-4 bg-card/30">
        <summary className="font-semibold text-foreground cursor-pointer">¿La Ley de Ohm aplica también a corriente alterna (AC)?</summary>
        <p className="mt-3 text-sm">
          Sí, pero con una variante: en AC se usa la <strong>impedancia (Z)</strong> en lugar de la resistencia, porque condensadores e inductores ofrecen oposición dependiente de la frecuencia. La fórmula generalizada es V = I × Z, donde Z es un número complejo que combina resistencia (R) y reactancia (X). Para frecuencia cero (DC), Z = R y volvemos a la Ley de Ohm clásica.
        </p>
      </details>
      <details className="border border-border rounded-lg p-4 bg-card/30 mt-3">
        <summary className="font-semibold text-foreground cursor-pointer">¿Por qué los superconductores parecen "violar" la Ley de Ohm?</summary>
        <p className="mt-3 text-sm">
          En realidad no la violan: en un superconductor R = 0, por lo que V = I × 0 = 0 sin importar la corriente. Esto es coherente con la ley, simplemente representa el caso límite donde no hay disipación de energía. Los superconductores requieren temperaturas extremadamente bajas (típicamente bajo 90 K) para mantener este estado.
        </p>
      </details>
      <details className="border border-border rounded-lg p-4 bg-card/30 mt-3">
        <summary className="font-semibold text-foreground cursor-pointer">¿La resistencia de un cable cambia con la temperatura?</summary>
        <p className="mt-3 text-sm">
          Sí. En metales, la resistencia aumenta con la temperatura según R(T) = R₀(1 + α × ΔT). Para el cobre, α ≈ 0.00393 /°C. Un cable que mide 1Ω a 20°C medirá ~1.118Ω a 50°C. En aplicaciones de precisión (por ejemplo, sensores PT100), este efecto se aprovecha intencionalmente para medir temperatura.
        </p>
      </details>
      <details className="border border-border rounded-lg p-4 bg-card/30 mt-3">
        <summary className="font-semibold text-foreground cursor-pointer">¿Puedo usar la Ley de Ohm para calcular la resistencia de mi cuerpo?</summary>
        <p className="mt-3 text-sm">
          Sí, y es vital para entender la seguridad eléctrica. La resistencia del cuerpo humano va de 1.000Ω (mojado) a 100.000Ω (seco). Con 220V y piel mojada: I = 220/1000 = 220mA, suficiente para causar fibrilación cardíaca. Por eso jamás trabajes con la red eléctrica con manos húmedas y siempre usá disyuntor diferencial.
        </p>
      </details>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🧪 Practica la Ley de Ohm con componentes reales</p>
        <p className="text-muted-foreground text-sm">
          Consigue un kit de resistencias, LEDs y protoboard para experimentar con tus propios circuitos.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+electronica+principiantes&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits en Amazon
        </a>
      </div>

      <AplicaloAhora
        tools={[
          { to: "/#calculadora", label: "Calculadora de Ley de Ohm online", desc: "Resolvé V = I × R en segundos ingresando dos valores." },
          { to: "/#calculadora", label: "Calculadora de resistencia para LED", desc: "Calculá el valor exacto de R para proteger tu LED." },
          { to: "/guia-resistencias", label: "Guía completa de resistencias", desc: "Aprendé a leer, calcular y elegir resistencias paso a paso." },
          { to: "/articulos/circuitos-serie-paralelo", label: "Circuitos en serie y paralelo", desc: "Cómo se combinan resistencias en circuitos reales." },
        ]}
      />
    </ArticleLayout>
  );
};

export default LeyDeOhm;
