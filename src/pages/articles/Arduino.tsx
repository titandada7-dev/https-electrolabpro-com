import ArticleLayout from "@/pages/ArticleLayout";
import { ShoppingCart } from "lucide-react";

const Arduino = () => {
  return (
    <ArticleLayout
      title="Arduino para Principiantes: Guía Completa desde Cero"
      subtitle="Aprende qué es Arduino, cómo funciona, qué modelos existen y cómo programar tu primer proyecto paso a paso. Guía práctica con ejemplos reales."
      slug="arduino"
    >
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

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 1: LED parpadeante (Blink)</h2>
      <p>
        El "Hola Mundo" de Arduino. Este es el primer proyecto que todo principiante debe hacer:
      </p>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Materiales necesarios</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>1× Arduino UNO</li>
        <li>1× LED de cualquier color</li>
        <li>1× Resistencia de 220Ω</li>
        <li>Cables de conexión (jumpers)</li>
        <li>Protoboard</li>
      </ul>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Conexiones</h3>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Conecta el <strong className="text-foreground">ánodo (+)</strong> del LED al pin 8 a través de la resistencia de 220Ω</li>
        <li>Conecta el <strong className="text-foreground">cátodo (-)</strong> del LED a GND</li>
      </ol>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Código</h3>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-foreground">{`const int ledPin = 8;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(500);
  digitalWrite(ledPin, LOW);
  delay(500);
}`}</pre>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 2: Leer un botón</h2>
      <p>
        Aprende a usar entradas digitales leyendo el estado de un pulsador:
      </p>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Materiales</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>1× Arduino UNO</li>
        <li>1× Pulsador (push button)</li>
        <li>1× Resistencia de 10kΩ (pull-down)</li>
        <li>1× LED + resistencia de 220Ω</li>
      </ul>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Código</h3>
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

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Proyecto 3: Sensor de temperatura con LM35</h2>
      <p>
        Usa una entrada analógica para leer un sensor de temperatura y mostrar los datos en el Monitor Serial:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-foreground">{`const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(sensorPin);
  float voltaje = lectura * (5.0 / 1023.0);
  float temperatura = voltaje * 100.0;
  
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");
  
  delay(1000);
}`}</pre>
      </div>
      <p>
        El sensor LM35 entrega <span className="font-mono text-primary">10mV por cada °C</span>. El Arduino lee el voltaje con su ADC de 10 bits y lo convierte a temperatura con una fórmula simple.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">PWM: Control de brillo de un LED</h2>
      <p>
        La modulación por ancho de pulso (<strong className="text-foreground">PWM</strong>) permite simular una salida analógica variando el ciclo de trabajo de una señal digital. Arduino tiene pines PWM marcados con <span className="font-mono text-primary">~</span> (3, 5, 6, 9, 10, 11 en el UNO).
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-foreground">{`const int ledPin = 9;  // Pin PWM

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Aumentar brillo gradualmente
  for (int brillo = 0; brillo <= 255; brillo += 5) {
    analogWrite(ledPin, brillo);
    delay(30);
  }
  // Disminuir brillo gradualmente
  for (int brillo = 255; brillo >= 0; brillo -= 5) {
    analogWrite(ledPin, brillo);
    delay(30);
  }
}`}</pre>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Comunicación Serial</h2>
      <p>
        El <strong className="text-foreground">Monitor Serial</strong> es tu mejor herramienta de depuración. Te permite enviar y recibir datos entre Arduino y tu PC:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><span className="font-mono text-primary">Serial.begin(9600)</span> — Inicia la comunicación a 9600 baudios</li>
        <li><span className="font-mono text-primary">Serial.print()</span> — Imprime sin salto de línea</li>
        <li><span className="font-mono text-primary">Serial.println()</span> — Imprime con salto de línea</li>
        <li><span className="font-mono text-primary">Serial.read()</span> — Lee un byte recibido</li>
        <li><span className="font-mono text-primary">Serial.available()</span> — Verifica si hay datos disponibles</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores comunes de principiantes</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">LED sin resistencia</strong>: Siempre usa una resistencia limitadora (220Ω-1kΩ) para proteger el LED y el pin del Arduino</li>
        <li><strong className="text-foreground">Pines flotantes</strong>: Los pines de entrada desconectados leen valores aleatorios. Usa resistencias pull-up o pull-down</li>
        <li><strong className="text-foreground">Exceder 40mA por pin</strong>: Cada pin del Arduino entrega máximo 40mA. Para cargas mayores, usa un transistor o relé</li>
        <li><strong className="text-foreground">Alimentar motores desde Arduino</strong>: Los motores necesitan su propia fuente de alimentación. Arduino solo controla la señal</li>
        <li><strong className="text-foreground">Olvidar el GND común</strong>: Todos los componentes deben compartir la misma referencia de tierra</li>
        <li><strong className="text-foreground">Usar delay() en exceso</strong>: Bloquea el programa. Para proyectos avanzados, usa <span className="font-mono text-primary">millis()</span></li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos para avanzar</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Empieza con proyectos simples y ve aumentando la complejidad</li>
        <li>Aprende a usar <strong className="text-foreground">librerías</strong>: Servo.h, LiquidCrystal.h, Wire.h</li>
        <li>Explora sensores: ultrasonido (HC-SR04), humedad (DHT11), movimiento (PIR)</li>
        <li>Practica con el <strong className="text-foreground">Monitor Serial</strong> para depurar tus programas</li>
        <li>Documenta tus proyectos y comparte con la comunidad</li>
        <li>Cuando domines lo básico, pasa a <strong className="text-foreground">ESP32</strong> para proyectos con WiFi y Bluetooth</li>
      </ul>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🔧 Empieza con tu propio kit de Arduino</p>
        <p className="text-muted-foreground text-sm">
          Consigue un kit completo con placa Arduino UNO, sensores, LEDs, resistencias y protoboard para practicar todos los proyectos de esta guía.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+arduino+principiantes&tag=electrolabpro-21"
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
