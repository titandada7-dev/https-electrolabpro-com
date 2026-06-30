import ArticleLayout from "@/pages/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import arduinoImg from "@/assets/arduino-kit.jpg";
import PlayCTA from "@/components/PlayCTA";

const Arduino = () => {
  return (
    <ArticleLayout
      title="Arduino para Principiantes: Guía Completa"
      subtitle="Aprende qué es Arduino, cómo funciona y construí 6 proyectos reales desde cero con código, diagramas de conexión y explicaciones."
      slug="arduino"
      schemaType="TechArticle"
      proficiencyLevel="Beginner"
      datePublished="2026-03-01"
      dateModified="2026-04-10"
    >
      {/* Imagen Arduino */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={arduinoImg} alt="Kit de Arduino con placa UNO, protoboard, cables y componentes electrónicos para proyectos" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Kit de Arduino — todo lo necesario para empezar con microcontroladores</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es Arduino?</h2>
      <p>
        <strong className="text-foreground">Arduino</strong> es una plataforma de electrónica de código abierto basada en hardware y software fáciles de usar. Consiste en una placa con un <strong className="text-foreground">microcontrolador</strong> programable que puede leer sensores, controlar motores, encender LEDs y comunicarse con otros dispositivos.
      </p>
      <p>
        Fue creado en 2005 en el Ivrea Interaction Design Institute (Italia) con el objetivo de proporcionar una herramienta económica y accesible para estudiantes y aficionados. Hoy es el estándar de facto para prototipado electrónico en todo el mundo.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Por qué elegir Arduino?</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Económico</strong>: Una placa Arduino UNO cuesta entre $5 y $25 USD</li>
        <li><strong className="text-foreground">Multiplataforma</strong>: El IDE funciona en Windows, macOS y Linux</li>
        <li><strong className="text-foreground">Código abierto</strong>: Tanto el hardware como el software son libres</li>
        <li><strong className="text-foreground">Comunidad enorme</strong>: Miles de tutoriales, librerías y proyectos disponibles</li>
        <li><strong className="text-foreground">Fácil de programar</strong>: Usa un lenguaje basado en C/C++ simplificado</li>
      </ul>

      <PlayCTA topic="arduino" />

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Modelos de Arduino más populares</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Modelo</th>
              <th className="px-4 py-2 text-left font-mono">Microcontrolador</th>
              <th className="px-4 py-2 text-left font-mono">Pines digitales</th>
              <th className="px-4 py-2 text-left font-mono">Pines analógicos</th>
              <th className="px-4 py-2 text-left font-mono">Uso ideal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">UNO R3</td>
              <td className="px-4 py-2">ATmega328P</td>
              <td className="px-4 py-2">14</td>
              <td className="px-4 py-2">6</td>
              <td className="px-4 py-2">Principiantes, prototipos</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Nano</td>
              <td className="px-4 py-2">ATmega328P</td>
              <td className="px-4 py-2">14</td>
              <td className="px-4 py-2">8</td>
              <td className="px-4 py-2">Proyectos compactos</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Mega 2560</td>
              <td className="px-4 py-2">ATmega2560</td>
              <td className="px-4 py-2">54</td>
              <td className="px-4 py-2">16</td>
              <td className="px-4 py-2">Proyectos complejos</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">ESP32</td>
              <td className="px-4 py-2">Xtensa LX6</td>
              <td className="px-4 py-2">34</td>
              <td className="px-4 py-2">18</td>
              <td className="px-4 py-2">IoT, WiFi, Bluetooth</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Anatomía de una placa Arduino UNO</h2>
      <p>
        La placa Arduino UNO es la más utilizada para aprender. Estos son sus componentes principales:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Puerto USB</strong>: Para programar la placa y alimentarla (5V)</li>
        <li><strong className="text-foreground">Jack de alimentación</strong>: Entrada de 7-12V DC externa</li>
        <li><strong className="text-foreground">Pines digitales (0-13)</strong>: Entradas/salidas digitales (HIGH o LOW). Los marcados con <span className="font-mono text-primary">~</span> soportan PWM</li>
        <li><strong className="text-foreground">Pines analógicos (A0-A5)</strong>: Leen voltajes entre 0V y 5V con resolución de 10 bits (0-1023)</li>
        <li><strong className="text-foreground">Pin 5V y 3.3V</strong>: Salidas de alimentación regulada</li>
        <li><strong className="text-foreground">GND</strong>: Pines de tierra (referencia 0V)</li>
        <li><strong className="text-foreground">Botón RESET</strong>: Reinicia el programa cargado</li>
        <li><strong className="text-foreground">LED integrado (pin 13)</strong>: LED conectado internamente, ideal para pruebas</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Instalación del Arduino IDE</h2>
      <p>
        El <strong className="text-foreground">Arduino IDE</strong> (Integrated Development Environment) es el software gratuito que usarás para escribir y cargar programas en tu placa:
      </p>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Descarga el IDE desde <span className="font-mono text-primary">arduino.cc/en/software</span></li>
        <li>Instálalo en tu sistema operativo (Windows, macOS o Linux)</li>
        <li>Conecta tu Arduino al PC con un cable USB</li>
        <li>En el IDE, ve a <span className="font-mono text-primary">Herramientas → Placa</span> y selecciona tu modelo</li>
        <li>Selecciona el puerto COM correcto en <span className="font-mono text-primary">Herramientas → Puerto</span></li>
        <li>¡Listo para programar!</li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Estructura de un programa Arduino (Sketch)</h2>
      <p>
        Todo programa en Arduino se llama <strong className="text-foreground">Sketch</strong> y tiene dos funciones obligatorias:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-foreground">{`// setup() se ejecuta UNA sola vez al inicio
void setup() {
  pinMode(13, OUTPUT);  // Configura pin 13 como salida
}

// loop() se ejecuta infinitamente
void loop() {
  digitalWrite(13, HIGH);  // Enciende LED
  delay(1000);             // Espera 1 segundo
  digitalWrite(13, LOW);   // Apaga LED
  delay(1000);             // Espera 1 segundo
}`}</pre>
      </div>
      <p>
        <span className="font-mono text-primary">setup()</span> se ejecuta una sola vez cuando la placa se enciende o reinicia. Aquí configuras los pines y las comunicaciones. <span className="font-mono text-primary">loop()</span> se repite infinitamente después de setup. Aquí va la lógica principal de tu programa.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Funciones esenciales de Arduino</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Función</th>
              <th className="px-4 py-2 text-left font-mono">Descripción</th>
              <th className="px-4 py-2 text-left font-mono">Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">pinMode()</td>
              <td className="px-4 py-2">Configura un pin como entrada o salida</td>
              <td className="px-4 py-2 font-mono">pinMode(13, OUTPUT)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">digitalWrite()</td>
              <td className="px-4 py-2">Escribe HIGH (5V) o LOW (0V) en un pin</td>
              <td className="px-4 py-2 font-mono">digitalWrite(13, HIGH)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">digitalRead()</td>
              <td className="px-4 py-2">Lee el estado de un pin digital</td>
              <td className="px-4 py-2 font-mono">digitalRead(7)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">analogRead()</td>
              <td className="px-4 py-2">Lee un valor analógico (0-1023)</td>
              <td className="px-4 py-2 font-mono">analogRead(A0)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">analogWrite()</td>
              <td className="px-4 py-2">Genera PWM (0-255) en pines con ~</td>
              <td className="px-4 py-2 font-mono">analogWrite(9, 128)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">delay()</td>
              <td className="px-4 py-2">Pausa el programa (milisegundos)</td>
              <td className="px-4 py-2 font-mono">delay(1000)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Serial.begin()</td>
              <td className="px-4 py-2">Inicia comunicación serial</td>
              <td className="px-4 py-2 font-mono">Serial.begin(9600)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Serial.println()</td>
              <td className="px-4 py-2">Imprime datos en el Monitor Serial</td>
              <td className="px-4 py-2 font-mono">Serial.println("Hola")</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================= PROYECTOS ========================= */}

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">🔬 Proyectos Paso a Paso</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">6 proyectos prácticos ordenados de menor a mayor dificultad</p>
      </div>

      {/* Proyecto 1 */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">1</span>
          <h3 className="text-lg font-mono font-bold text-foreground">LED Parpadeante (Blink)</h3>
          <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono">Fácil</span>
        </div>
        <p className="mb-3">El "Hola Mundo" de Arduino. Aprende a controlar una salida digital encendiendo y apagando un LED.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× LED (cualquier color)</li>
          <li>1× Resistencia de 220Ω (<Link to="/articulos/codigo-colores-resistencias" className="text-primary hover:underline">ver código de colores</Link>)</li>
          <li>Cables jumper y protoboard</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Diagrama de conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`Arduino Pin 8 ──── Resistencia 220Ω ──── Ánodo (+) LED ──── Cátodo (-) ──── GND

  [Arduino UNO]
      Pin 8  ───┐
                 │
              [220Ω]
                 │
              [LED]
                 │
      GND   ───┘`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int ledPin = 8;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);  // Enciende
  delay(500);                  // 500ms encendido
  digitalWrite(ledPin, LOW);   // Apaga
  delay(500);                  // 500ms apagado
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A usar <span className="font-mono text-primary">pinMode()</span>, <span className="font-mono text-primary">digitalWrite()</span> y <span className="font-mono text-primary">delay()</span>. La resistencia de 220Ω limita la corriente a ~15mA, protegiendo el LED según la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline">Ley de Ohm</Link>: I = (5V - 2V) / 220Ω ≈ 13.6mA.
        </div>
      </div>

      {/* Proyecto 2 */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">2</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Control de LED con Botón</h3>
          <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono">Fácil</span>
        </div>
        <p className="mb-3">Aprende a leer entradas digitales con un pulsador y controlar una salida en consecuencia.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO + protoboard</li>
          <li>1× Pulsador (push button)</li>
          <li>1× Resistencia de 10kΩ (pull-down)</li>
          <li>1× LED + resistencia de 220Ω</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Diagrama de conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  5V ──── [Botón] ──── Pin 2
                   │
                [10kΩ]  (resistencia pull-down)
                   │
                  GND

  Pin 8 ──── [220Ω] ──── [LED] ──── GND`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int botonPin = 2;
const int ledPin = 8;

void setup() {
  pinMode(botonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int estado = digitalRead(botonPin);
  if (estado == HIGH) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A usar <span className="font-mono text-primary">digitalRead()</span> y por qué las resistencias pull-down evitan los "pines flotantes" que generan lecturas erráticas.
        </div>
      </div>

      {/* Proyecto 3 */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">3</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Sensor de Temperatura con LM35</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>
        <p className="mb-3">Usa una entrada analógica para leer un sensor de temperatura y visualizar los datos en el Monitor Serial en tiempo real.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Sensor LM35 (3 pines: VCC, VOUT, GND)</li>
          <li>Cables jumper</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Diagrama de conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  [LM35 - vista frontal, cara plana hacia ti]
   ┌───────┐
   │ V G S │
   │ C N A │
   │ C D L │
   └───────┘
    │  │  │
    │  │  └──── Arduino A0
    │  └─────── Arduino GND
    └────────── Arduino 5V`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("Sensor LM35 - Lectura de temperatura");
  Serial.println("------------------------------------");
}

void loop() {
  int lectura = analogRead(sensorPin);
  float voltaje = lectura * (5.0 / 1023.0);
  float temperatura = voltaje * 100.0;
  
  Serial.print("ADC: ");
  Serial.print(lectura);
  Serial.print(" | Voltaje: ");
  Serial.print(voltaje, 3);
  Serial.print("V | Temperatura: ");
  Serial.print(temperatura, 1);
  Serial.println(" °C");
  
  delay(1000);
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A usar <span className="font-mono text-primary">analogRead()</span> y el ADC de 10 bits del Arduino. El LM35 entrega 10mV/°C, así que la conversión es: temperatura = (lectura × 5.0 / 1023.0) × 100.
        </div>
      </div>

      {/* Proyecto 4 */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">4</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Control de Brillo con PWM (LED Fade)</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>
        <p className="mb-3">Simula una salida analógica variando el brillo de un LED mediante modulación por ancho de pulso (PWM).</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Concepto clave: ¿Qué es PWM?</h4>
        <p className="text-sm">PWM (Pulse Width Modulation) genera pulsos de 5V a alta velocidad. Al variar el porcentaje de tiempo en HIGH (duty cycle), el LED percibe diferentes intensidades. Arduino tiene pines PWM marcados con <span className="font-mono text-primary">~</span> (pines 3, 5, 6, 9, 10, 11 en el UNO).</p>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto my-3">
          <pre className="text-foreground">{`  Duty Cycle 25%:  ▓░░░▓░░░▓░░░  → LED tenue
  Duty Cycle 50%:  ▓▓░░▓▓░░▓▓░░  → LED medio
  Duty Cycle 100%: ▓▓▓▓▓▓▓▓▓▓▓▓  → LED máximo brillo`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int ledPin = 9;  // Pin PWM (~)

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Aumentar brillo gradualmente (fade in)
  for (int brillo = 0; brillo <= 255; brillo += 5) {
    analogWrite(ledPin, brillo);
    delay(30);
  }
  // Disminuir brillo gradualmente (fade out)
  for (int brillo = 255; brillo >= 0; brillo -= 5) {
    analogWrite(ledPin, brillo);
    delay(30);
  }
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> <span className="font-mono text-primary">analogWrite(pin, valor)</span> acepta 0-255. El valor 0 = LED apagado (0% duty cycle), 255 = máximo brillo (100% duty cycle). La frecuencia PWM del Arduino UNO es ~490 Hz en la mayoría de pines.
        </div>
      </div>

      {/* Proyecto 5 */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">5</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Sensor de Distancia con Ultrasonido HC-SR04</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>
        <p className="mb-3">Mide distancias de 2 cm a 400 cm usando ondas ultrasónicas y muestra los resultados en el Monitor Serial.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Sensor HC-SR04</li>
          <li>Cables jumper</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">¿Cómo funciona?</h4>
        <p className="text-sm mb-3">El sensor emite un pulso ultrasónico por el pin TRIG. El sonido rebota en un objeto y vuelve al receptor (ECHO). Midiendo el tiempo de viaje y conociendo la velocidad del sonido (343 m/s), calculamos la distancia:</p>
        <div className="bg-secondary/50 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`Distancia = (Tiempo × Velocidad del sonido) / 2
Distancia (cm) = duración (µs) / 58.2`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Diagrama de conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  HC-SR04        Arduino
  ────────       ────────
  VCC    ──────  5V
  TRIG   ──────  Pin 9
  ECHO   ──────  Pin 10
  GND    ──────  GND`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Enviar pulso ultrasónico
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Medir tiempo de respuesta
  long duracion = pulseIn(echoPin, HIGH);
  float distancia = duracion / 58.2;
  
  Serial.print("Distancia: ");
  Serial.print(distancia, 1);
  Serial.println(" cm");
  
  delay(200);
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A usar <span className="font-mono text-primary">pulseIn()</span> para medir tiempos de señal y <span className="font-mono text-primary">delayMicroseconds()</span> para generar pulsos precisos. Este sensor se usa en robots, alarmas y sistemas de estacionamiento.
        </div>
      </div>

      {/* Proyecto 6 */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">6</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Semáforo Inteligente con Secuencia Temporizada</h3>
          <span className="ml-auto text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-mono">Avanzado</span>
        </div>
        <p className="mb-3">Combina todo lo aprendido creando un semáforo con 3 LEDs, un botón de peatón y comunicación serial para depuración.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO + protoboard</li>
          <li>3× LEDs (rojo, amarillo, verde)</li>
          <li>3× Resistencias de 220Ω</li>
          <li>1× Pulsador + resistencia 10kΩ</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Diagrama de conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  Pin 4 ── [220Ω] ── [LED Rojo]    ── GND
  Pin 5 ── [220Ω] ── [LED Amarillo] ── GND
  Pin 6 ── [220Ω] ── [LED Verde]   ── GND
  5V ───── [Botón] ── Pin 2
                  │
               [10kΩ]
                  │
                 GND`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int rojo = 4;
const int amarillo = 5;
const int verde = 6;
const int boton = 2;

void setup() {
  Serial.begin(9600);
  pinMode(rojo, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(verde, OUTPUT);
  pinMode(boton, INPUT);
  Serial.println("Semáforo iniciado");
}

void loop() {
  // Verde (5 segundos)
  cambiarEstado("VERDE - Paso vehicular");
  digitalWrite(verde, HIGH);
  
  // Verificar botón de peatón durante verde
  for (int i = 0; i < 50; i++) {
    if (digitalRead(boton) == HIGH) {
      Serial.println(">> Peatón solicita paso");
      delay(1000);  // Esperar 1s antes de cambiar
      break;
    }
    delay(100);
  }
  digitalWrite(verde, LOW);
  
  // Amarillo (2 segundos)
  cambiarEstado("AMARILLO - Precaución");
  digitalWrite(amarillo, HIGH);
  delay(2000);
  digitalWrite(amarillo, LOW);
  
  // Rojo (4 segundos)
  cambiarEstado("ROJO - Alto");
  digitalWrite(rojo, HIGH);
  delay(4000);
  digitalWrite(rojo, LOW);
}

void cambiarEstado(const char* estado) {
  Serial.print("[Semáforo] ");
  Serial.println(estado);
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A combinar entradas digitales con salidas múltiples, crear funciones personalizadas (<span className="font-mono text-primary">cambiarEstado()</span>), usar bucles para polling del botón sin bloquear el programa, y depurar con el Monitor Serial.
        </div>
      </div>

      {/* ========================= SECCIÓN EDUCATIVA ADICIONAL ========================= */}

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-12">Comunicación Serial a fondo</h2>
      <p>
        El <strong className="text-foreground">Monitor Serial</strong> es tu mejor herramienta de depuración. Te permite enviar y recibir datos entre Arduino y tu PC en tiempo real:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><span className="font-mono text-primary">Serial.begin(9600)</span> — Inicia la comunicación a 9600 baudios</li>
        <li><span className="font-mono text-primary">Serial.print()</span> — Imprime sin salto de línea</li>
        <li><span className="font-mono text-primary">Serial.println()</span> — Imprime con salto de línea</li>
        <li><span className="font-mono text-primary">Serial.read()</span> — Lee un byte recibido</li>
        <li><span className="font-mono text-primary">Serial.available()</span> — Verifica si hay datos disponibles</li>
        <li><span className="font-mono text-primary">Serial.parseInt()</span> — Lee un número entero del buffer serial</li>
      </ul>
      <p>
        <strong className="text-foreground">Importante:</strong> Los pines 0 (RX) y 1 (TX) son compartidos con la comunicación USB. Evita usarlos para otros componentes mientras uses el Monitor Serial.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores comunes de principiantes</h2>
      <div className="space-y-3">
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ LED sin resistencia</p>
          <p className="text-sm">Siempre usa una resistencia limitadora (220Ω-1kΩ). Sin ella, la corriente excesiva puede quemar el LED y dañar el pin del Arduino. Calcula el valor con nuestra <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline">guía de Ley de Ohm</Link>.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ Pines flotantes</p>
          <p className="text-sm">Los pines de entrada desconectados leen valores aleatorios. Siempre usa resistencias pull-up (a 5V) o pull-down (a GND) para establecer un estado definido.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ Exceder 40mA por pin</p>
          <p className="text-sm">Cada pin entrega máximo 40mA (recomendado: 20mA). Para cargas mayores (motores, relés), usa un <Link to="/articulos/transistores" className="text-primary hover:underline">transistor</Link> como interruptor de potencia.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ Alimentar motores desde Arduino</p>
          <p className="text-sm">Los motores necesitan su propia <Link to="/articulos/fuentes-de-alimentacion" className="text-primary hover:underline">fuente de alimentación</Link>. Arduino solo controla la señal de activación.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ Usar delay() en exceso</p>
          <p className="text-sm">delay() bloquea completamente el programa. Para proyectos con múltiples tareas, usa <span className="font-mono text-primary">millis()</span> para temporización no bloqueante.</p>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Librerías esenciales para explorar</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Librería</th>
              <th className="px-4 py-2 text-left font-mono">Uso</th>
              <th className="px-4 py-2 text-left font-mono">Componente compatible</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Servo.h</td>
              <td className="px-4 py-2">Control de servomotores</td>
              <td className="px-4 py-2">SG90, MG996R</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LiquidCrystal.h</td>
              <td className="px-4 py-2">Pantallas LCD 16×2</td>
              <td className="px-4 py-2">LCD 1602</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Wire.h</td>
              <td className="px-4 py-2">Comunicación I2C</td>
              <td className="px-4 py-2">Sensores, EEPROM, RTC</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">DHT.h</td>
              <td className="px-4 py-2">Sensor de temperatura y humedad</td>
              <td className="px-4 py-2">DHT11, DHT22</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">SPI.h</td>
              <td className="px-4 py-2">Comunicación SPI</td>
              <td className="px-4 py-2">Displays OLED, tarjetas SD</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm mt-2">
        Para aprender sobre la comunicación I2C en profundidad, te recomendamos nuestra <Link to="/articulos/protocolo-i2c" className="text-primary hover:underline">Guía completa del protocolo I2C</Link>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Próximos pasos</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Practica los 6 proyectos de esta guía y modifícalos a tu gusto</li>
        <li>Explora sensores avanzados: ultrasonido (HC-SR04), humedad (DHT11), movimiento (PIR)</li>
        <li>Aprende sobre protocolos de comunicación: <Link to="/articulos/protocolo-i2c" className="text-primary hover:underline">I2C</Link>, SPI y UART</li>
        <li>Usa el <strong className="text-foreground">Monitor Serial</strong> como herramienta de depuración en cada proyecto</li>
        <li>Documenta tus proyectos y comparte con la comunidad</li>
        <li>Cuando domines lo básico, pasa a <strong className="text-foreground">ESP32</strong> para proyectos con WiFi y Bluetooth</li>
        <li>Complementa tu conocimiento con nuestra guía de <Link to="/articulos/soldadura-electronica" className="text-primary hover:underline">soldadura electrónica</Link> para proyectos permanentes</li>
      </ul>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🔧 Empieza con tu propio kit de Arduino</p>
        <p className="text-muted-foreground text-sm">
          Consigue un kit completo con placa Arduino UNO, sensores, LEDs, resistencias y protoboard para practicar todos los proyectos de esta guía.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+arduino+principiantes&tag=electrolabp0c-21"
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

export default Arduino;
