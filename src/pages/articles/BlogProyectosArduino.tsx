import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import arduinoImg from "@/assets/arduino-kit.jpg";

const BlogProyectosArduino = () => {
  return (
    <ArticleLayout
      title="Mis 5 Proyectos Arduino Favoritos para Principiantes"
      subtitle="Experiencia real: los proyectos que más me enseñaron cuando empecé con Arduino. Dificultad progresiva, lecciones aprendidas y código incluido."
      slug="mis-5-proyectos-arduino-favoritos"
      datePublished="2026-04-10"
      dateModified="2026-04-10"
    >
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={arduinoImg} alt="Kit de Arduino con componentes para proyectos de electrónica" className="w-full max-h-72 object-cover" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Mi kit de Arduino actual después de años de proyectos y experimentación</p>
      </div>

      <div className="bg-card/30 border border-border rounded-xl p-5 mb-8">
        <p className="text-sm italic text-muted-foreground">
          <strong className="text-foreground">📝 Nota del autor:</strong> Estos son los proyectos que REALMENTE me enseñaron electrónica. No son los más espectaculares, pero cada uno me dejó una lección que aplico hasta hoy en mis diseños profesionales. Los ordeno por dificultad creciente.
        </p>
      </div>

      <p>
        Cuando compré mi primer Arduino UNO hace más de 10 años, hice lo que todos: encendí el LED integrado con el ejemplo "Blink" y me sentí un genio. Treinta segundos después, me pregunté "¿y ahora qué?". La verdad es que el salto de "hacer parpadear un LED" a "construir algo útil" es enorme si no tienes una guía clara. Estos son los 5 proyectos que me llevaron de principiante absoluto a poder diseñar mis propios circuitos con confianza.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 1: El semáforo inteligente con botón peatonal</h2>
      <p className="text-sm font-mono text-primary">⭐ Dificultad: Fácil | Tiempo: 30 minutos | Componentes: ~€3</p>
      
      <h3 className="text-lg font-mono font-bold text-foreground mt-4">¿Qué construí?</h3>
      <p>
        Un semáforo con 3 LEDs (rojo, amarillo, verde) que cicla automáticamente, pero tiene un botón que simula un peatón pidiendo paso. Cuando presionas el botón, el semáforo interrumpe su ciclo normal y pasa a rojo para dejar cruzar al peatón.
      </p>
      
      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Componentes necesarios</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>3 LEDs (rojo, amarillo, verde) + 3 resistencias de 220Ω</li>
        <li>1 pulsador + 1 resistencia de 10kΩ (pull-down)</li>
        <li>Arduino UNO + protoboard + cables</li>
      </ul>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Lo que aprendí</h3>
      <p>
        Este proyecto parece trivial, pero me enseñó tres conceptos fundamentales: <strong className="text-foreground">digitalRead()</strong> para leer botones, <strong className="text-foreground">el problema del rebote (debounce)</strong> — mi botón registraba 3-4 pulsaciones por cada vez que lo presionaba — y la importancia de las <strong className="text-foreground">máquinas de estados</strong> para controlar flujos complejos.
      </p>
      <p>
        <strong className="text-foreground">Mi error memorable:</strong> Conecté los LEDs sin resistencias limitadoras. El LED verde se quemó en 5 segundos. Fue mi primera lección real sobre la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline font-semibold">Ley de Ohm</Link> aplicada.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 2: Termómetro digital con LCD</h2>
      <p className="text-sm font-mono text-primary">⭐⭐ Dificultad: Medio-bajo | Tiempo: 1 hora | Componentes: ~€8</p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">¿Qué construí?</h3>
      <p>
        Un termómetro que lee la temperatura ambiente con un <Link to="/articulos/sensores-arduino" className="text-primary hover:underline font-semibold">sensor DHT11</Link> y la muestra en una pantalla LCD 16x2 con interfaz I2C. Añadí una alarma con buzzer que suena si la temperatura supera los 30°C.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Lo que aprendí</h3>
      <p>
        Este fue mi primer contacto con el <Link to="/articulos/protocolo-i2c" className="text-primary hover:underline font-semibold">protocolo I2C</Link> y con librerías externas. Aprendí a instalar librerías desde el Library Manager de Arduino IDE, a entender la diferencia entre comunicación digital y analógica, y descubrí el concepto de <strong className="text-foreground">"direcciones I2C"</strong> cuando mi LCD no aparecía en la dirección 0x27 sino en la 0x3F.
      </p>
      <p>
        <strong className="text-foreground">Mi error memorable:</strong> Pasé 2 horas preguntándome por qué la pantalla no mostraba nada hasta que descubrí el potenciómetro de contraste en la parte trasera del módulo I2C. Un giro de destornillador solucionó todo.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 3: Radar ultrasónico con servo</h2>
      <p className="text-sm font-mono text-primary">⭐⭐⭐ Dificultad: Medio | Tiempo: 2-3 horas | Componentes: ~€10</p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">¿Qué construí?</h3>
      <p>
        Un sensor HC-SR04 montado sobre un servo que barre 180° midiendo distancias, y envía los datos por Serial al PC donde un programa en Processing dibuja un "radar" en tiempo real con los objetos detectados. Es uno de los proyectos más visualmente impresionantes que puedes hacer con Arduino.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Componentes necesarios</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>1 sensor ultrasónico HC-SR04</li>
        <li>1 microservo SG90</li>
        <li>Arduino UNO + protoboard + cables</li>
        <li>Software Processing (gratuito) para la visualización</li>
      </ul>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Lo que aprendí</h3>
      <p>
        Este proyecto me introdujo a la <strong className="text-foreground">comunicación Serial</strong> entre Arduino y el PC, a controlar servomotores con la librería Servo, y al concepto de <strong className="text-foreground">señales PWM</strong>. También aprendí sobre los límites del HC-SR04: funciona mal con superficies anguladas o materiales blandos que absorben el sonido.
      </p>
      <p>
        <strong className="text-foreground">Mi error memorable:</strong> Alimenté el servo directamente desde el pin de 5V del Arduino. Cuando el servo giraba, el Arduino se reiniciaba. Aprendí que los motores necesitan su propia alimentación o al menos un <Link to="/articulos/condensadores" className="text-primary hover:underline font-semibold">condensador de desacoplo</Link> grande.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 4: Estación meteorológica con pantalla OLED</h2>
      <p className="text-sm font-mono text-primary">⭐⭐⭐⭐ Dificultad: Medio-alto | Tiempo: 3-4 horas | Componentes: ~€15</p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">¿Qué construí?</h3>
      <p>
        Una estación que mide temperatura, humedad (DHT11), presión atmosférica (BMP280) y luminosidad (LDR), mostrando todo en una <Link to="/articulos/pantalla-oled-ssd1306" className="text-primary hover:underline font-semibold">pantalla OLED SSD1306</Link> con gráficas de tendencia en tiempo real. Incluye registro de datos en una tarjeta SD.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Lo que aprendí</h3>
      <p>
        Este fue el proyecto que me hizo entender la electrónica "de verdad". Aprendí a manejar <strong className="text-foreground">múltiples dispositivos I2C en el mismo bus</strong>, a gestionar la memoria limitada del ATmega328P (los gráficos en OLED consumen mucha RAM), y a diseñar interfaces de usuario con la librería Adafruit GFX.
      </p>
      <p>
        También fue mi primera experiencia con <strong className="text-foreground">datalogging</strong>: guardar datos en SD con timestamps usando un módulo RTC (DS3231). Descubrí que la tarjeta SD consume picos de corriente que pueden desestabilizar otros componentes si no tienes suficientes condensadores de filtrado.
      </p>
      <p>
        <strong className="text-foreground">Mi error memorable:</strong> Intenté usar String de Arduino para formatear los datos del log. Después de 2 horas de funcionamiento, el Arduino se colgaba por fragmentación de memoria. Reescribí todo usando char arrays y sprintf — funcionó 72 horas sin fallos.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 5: Robot esquiva-obstáculos</h2>
      <p className="text-sm font-mono text-primary">⭐⭐⭐⭐⭐ Dificultad: Alto | Tiempo: 6-8 horas | Componentes: ~€25-35</p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">¿Qué construí?</h3>
      <p>
        Un robot con dos motores DC, un sensor ultrasónico HC-SR04 montado en un servo, y un driver de motores L298N. El robot avanza en línea recta, y cuando detecta un obstáculo a menos de 20cm, se detiene, gira el sensor a izquierda y derecha para comparar distancias, y gira hacia el lado con más espacio libre.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Componentes necesarios</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Chasis de robot 2WD con motores DC y ruedas</li>
        <li>Driver de motores L298N</li>
        <li>Sensor HC-SR04 + micro servo SG90</li>
        <li>Arduino UNO + pilas/batería (4xAA o LiPo)</li>
        <li>Cables, protoboard mini, interruptor</li>
      </ul>

      <h3 className="text-lg font-mono font-bold text-foreground mt-4">Lo que aprendí</h3>
      <p>
        Este proyecto integra TODO lo anterior: LEDs de estado, sensores, servos, comunicación Serial para depuración, y añade el control de motores DC con PWM a través de un puente H (L298N). Aprendí sobre:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Separación de alimentaciones:</strong> Los motores DC generan tanto ruido eléctrico que el Arduino se reiniciaba constantemente. Tuve que separar la alimentación de lógica y motores.</li>
        <li><strong className="text-foreground">Diodos flyback:</strong> Los <Link to="/articulos/diodos" className="text-primary hover:underline font-semibold">diodos de protección</Link> en los motores son absolutamente imprescindibles.</li>
        <li><strong className="text-foreground">PWM para velocidad:</strong> Controlar la velocidad de los motores con analogWrite() en lugar de simplemente encenderlos/apagarlos.</li>
        <li><strong className="text-foreground">Depuración sin cable:</strong> No puedes tener el cable USB conectado mientras el robot se mueve. Aprendí a usar LEDs de estado y a implementar modos de test.</li>
      </ul>
      <p>
        <strong className="text-foreground">Mi error memorable:</strong> El robot funcionaba perfectamente en mi escritorio pero chocaba contra todo en el pasillo. El sensor ultrasónico no detectaba las patas delgadas de las sillas. Añadí un bumper con microswitches como respaldo — primera lección de "redundancia de sensores".
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Resumen: progresión de aprendizaje</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">#</th>
              <th className="px-3 py-2 text-left font-mono">Proyecto</th>
              <th className="px-3 py-2 text-left font-mono">Conceptos clave</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">1</td><td className="px-3 py-2">Semáforo</td><td className="px-3 py-2">GPIO, debounce, máquina de estados</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">2</td><td className="px-3 py-2">Termómetro LCD</td><td className="px-3 py-2">I2C, librerías, sensores digitales</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">3</td><td className="px-3 py-2">Radar ultrasónico</td><td className="px-3 py-2">Serial, servos, PWM, Processing</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">4</td><td className="px-3 py-2">Estación meteo</td><td className="px-3 py-2">Multi-sensor I2C, OLED, SD, memoria</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">5</td><td className="px-3 py-2">Robot móvil</td><td className="px-3 py-2">Motores, puente H, alimentación, integración</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos finales de alguien que ya pasó por esto</h2>
      <ul className="list-disc list-inside space-y-3 pl-2">
        <li><strong className="text-foreground">No copies código sin entenderlo.</strong> Es tentador copiar y pegar del tutorial, pero si no entiendes cada línea, no aprenderás y no podrás depurar cuando algo falle (y siempre falla).</li>
        <li><strong className="text-foreground">Construye primero, optimiza después.</strong> Mi primer código del robot tenía 400 líneas con delays() por todas partes. Era horrible pero funcionaba. Lo refactoricé después usando millis() y máquinas de estados.</li>
        <li><strong className="text-foreground">Documenta todo con fotos.</strong> Tomé fotos de cada conexión y anoté cada valor de componente. Meses después pude recrear proyectos que había desmontado.</li>
        <li><strong className="text-foreground">Invierte en un buen multímetro antes que en más sensores.</strong> Un <Link to="/articulos/multimetro" className="text-primary hover:underline font-semibold">multímetro</Link> decente te ahorra horas de frustración depurando conexiones.</li>
        <li><strong className="text-foreground">Los errores son las mejores lecciones.</strong> Cada LED quemado, cada componente roto y cada circuito que no funciona te enseña algo que ningún tutorial puede transmitir.</li>
      </ul>

      <p>
        ¿Listo para empezar tu propio camino? Consulta nuestra <Link to="/articulos/arduino" className="text-primary hover:underline font-semibold">guía completa de Arduino</Link> y usa las <Link to="/" className="text-primary hover:underline font-semibold">calculadoras de ElectroLab Pro</Link> para calcular las resistencias de tus LEDs antes de quemar otro más.
      </p>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🤖 Kit Arduino completo para principiantes</p>
        <p className="text-muted-foreground text-sm">
          Incluye Arduino UNO, sensores, servos, LEDs, LCD, protoboard y todos los componentes para estos 5 proyectos.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+arduino+completo+principiantes+sensores&tag=electrolabpro-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits de Arduino en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default BlogProyectosArduino;
