import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import diodeImg from "@/assets/diode-diagram.png";

const Diodos = () => {
  return (
    <ArticleLayout
      title="Guía Básica de Diodos para Principiantes"
      subtitle="Todo lo que necesitas saber sobre los diodos: qué son, cómo funcionan, tipos principales y cómo usarlos en tus circuitos."
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es un diodo?</h2>
      <p>
        Un diodo es un componente electrónico semiconductor que permite el paso de la corriente eléctrica en una sola dirección y la bloquea en la dirección opuesta. Esta propiedad, aparentemente simple, lo convierte en uno de los dispositivos más importantes y versátiles de toda la electrónica. Sin los diodos, no existirían las fuentes de alimentación modernas, los paneles solares no podrían generar electricidad útil, y la mayoría de los dispositivos electrónicos que usamos a diario simplemente no funcionarían.
      </p>
      <p>
        El diodo está formado por la unión de dos tipos de materiales semiconductores: uno tipo <strong className="text-foreground">N</strong> (con exceso de electrones) y otro tipo <strong className="text-foreground">P</strong> (con déficit de electrones, o "huecos"). Esta unión P-N es la que crea la barrera que permite el flujo de corriente en un solo sentido.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Cómo funciona un diodo?</h2>
      <p>
        Cuando conectas el terminal positivo de una fuente de voltaje al ánodo (lado P) y el negativo al cátodo (lado N), el diodo está en <strong className="text-foreground">polarización directa</strong>. En esta condición, la barrera de potencial de la unión P-N se reduce y la corriente fluye libremente a través del diodo. Sin embargo, necesita un voltaje mínimo para comenzar a conducir: aproximadamente <strong className="text-primary">0.7V para diodos de silicio</strong> y <strong className="text-primary">0.3V para diodos de germanio</strong>.
      </p>
      <p>
        Cuando inviertes la polaridad (positivo al cátodo, negativo al ánodo), el diodo está en <strong className="text-foreground">polarización inversa</strong>. La barrera de potencial se amplía y el diodo bloquea el paso de corriente casi por completo. Solo circula una corriente de fuga extremadamente pequeña (del orden de microamperios o menos).
      </p>
      <p>
        Si el voltaje inverso supera un límite llamado <strong className="text-foreground">voltaje de ruptura</strong> (breakdown voltage), el diodo puede conducir en sentido inverso de forma descontrolada, lo que generalmente destruye el componente (excepto en los diodos Zener, que están diseñados para operar en esta zona de forma controlada).
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Identificación del ánodo y cátodo</h2>
      <p>
        Identificar correctamente los terminales de un diodo es esencial para evitar errores en el montaje:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">En diodos convencionales (rectificadores):</strong> El cátodo está marcado con una banda o anillo pintado en uno de los extremos del componente. La corriente fluye desde el lado sin marca (ánodo) hacia el lado con marca (cátodo).</li>
        <li><strong className="text-foreground">En LEDs:</strong> La pata más larga es el ánodo (+) y la más corta el cátodo (-). Dentro del LED, el cátodo se identifica por la pieza metálica más grande (la "copa").</li>
        <li><strong className="text-foreground">En diagramas esquemáticos:</strong> El símbolo del diodo es un triángulo que apunta hacia una línea vertical. La corriente convencional fluye en la dirección del triángulo.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tipos principales de diodos</h2>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">1. Diodo rectificador</h3>
      <p>
        Es el tipo más común y básico. Su función principal es convertir corriente alterna (AC) en corriente continua (DC), un proceso llamado rectificación. Los diodos rectificadores más populares son el 1N4001 al 1N4007, que pueden manejar corrientes de hasta 1 amperio. Se utilizan en prácticamente todas las fuentes de alimentación, desde cargadores de teléfono hasta fuentes de laboratorio. Un puente rectificador de 4 diodos convierte la onda completa de AC en DC pulsante.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">2. Diodo LED (Light Emitting Diode)</h3>
      <p>
        Los LEDs son diodos que emiten luz cuando la corriente los atraviesa en polarización directa. Disponibles en múltiples colores (rojo, verde, azul, blanco, infrarrojo, ultravioleta), son los indicadores luminosos más utilizados en la electrónica moderna. Su voltaje directo varía según el color: rojo ≈ 1.8V, verde ≈ 2.1V, azul/blanco ≈ 3.0-3.3V. <strong className="text-foreground">Siempre necesitan una resistencia limitadora</strong> en serie para evitar que la corriente excesiva los destruya.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">3. Diodo Zener</h3>
      <p>
        A diferencia de los diodos convencionales, los Zener están diseñados para operar en la zona de ruptura inversa de forma estable y controlada. Esto los convierte en excelentes <strong className="text-foreground">reguladores de voltaje</strong>. Un Zener de 5.1V, por ejemplo, mantendrá un voltaje constante de 5.1V en sus terminales siempre que haya suficiente corriente y una resistencia limitadora adecuada. Se usan en fuentes de alimentación reguladas, circuitos de protección contra sobrevoltaje y referencias de voltaje.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">4. Diodo Schottky</h3>
      <p>
        Los diodos Schottky tienen una caída de voltaje directo mucho menor que los diodos de silicio convencionales (típicamente 0.2V-0.3V en lugar de 0.7V) y una velocidad de conmutación extremadamente rápida. Esto los hace ideales para aplicaciones donde la eficiencia es crítica, como fuentes de alimentación conmutadas (switching), protección contra polaridad inversa y circuitos de alta frecuencia. Su desventaja es que tienen una mayor corriente de fuga inversa.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">5. Fotodiodo</h3>
      <p>
        Los fotodiodos son sensibles a la luz: generan una pequeña corriente eléctrica cuando la luz incide sobre su unión P-N. Operan en polarización inversa y se utilizan en sensores de luz, comunicaciones por fibra óptica, lectores de códigos de barras y sistemas de detección remota. Su velocidad de respuesta es mucho mayor que la de las fotorresistencias (LDR).
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Aplicaciones prácticas de los diodos</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Rectificación de corriente:</strong> Conversión de AC a DC en fuentes de alimentación.</li>
        <li><strong className="text-foreground">Protección contra polaridad inversa:</strong> Un diodo en serie protege tu circuito si conectas la batería al revés.</li>
        <li><strong className="text-foreground">Protección de bobinas (flyback):</strong> Los diodos de protección absorben los picos de voltaje generados por relés y motores al desconectarse.</li>
        <li><strong className="text-foreground">Indicadores luminosos:</strong> LEDs como señalización de estado en cualquier dispositivo electrónico.</li>
        <li><strong className="text-foreground">Regulación de voltaje:</strong> Diodos Zener para mantener voltajes constantes en circuitos sensibles.</li>
        <li><strong className="text-foreground">Detección de señales:</strong> En receptores de radio AM, un diodo demodula la señal de radiofrecuencia para extraer el audio.</li>
        <li><strong className="text-foreground">Puertas lógicas:</strong> Circuitos lógicos básicos OR y AND pueden construirse usando solo diodos y resistencias (lógica DRL).</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos para principiantes</h2>
      <p>
        Si estás comenzando en la electrónica, te recomendamos tener siempre a mano una selección básica de diodos: algunos 1N4007 (rectificadores de uso general), diodos Zener de 3.3V, 5.1V y 12V, LEDs de varios colores, y unos cuantos 1N5819 (Schottky). Con esta colección cubrirás el 90% de los proyectos para principiantes.
      </p>
      <p>
        Recuerda siempre verificar la hoja de datos (datasheet) del diodo antes de usarlo. Los parámetros más importantes a revisar son: el voltaje inverso máximo (V_RRM), la corriente directa máxima (I_F), y la caída de voltaje directa (V_F). Estos valores te asegurarán que el diodo funcione correctamente y de forma segura en tu circuito.
      </p>

      {/* CTA */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-card/80 backdrop-blur space-y-4">
        <h3 className="text-lg font-mono font-bold text-foreground text-center">💡 Kit de Diodos y LEDs Surtidos</h3>
        <p className="text-sm text-center">Incluye diodos rectificadores, Zener, Schottky y LEDs de colores. Todo lo que necesitas para practicar.</p>
        <div className="text-center">
          <a
            href="https://www.amazon.es/s?k=kit+diodos+leds+electronica&tag=electrolabpro-21"
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

export default Diodos;
