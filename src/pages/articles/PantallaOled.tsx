import ArticleLayout from "../ArticleLayout";
import { Link } from "react-router-dom";

const PantallaOled = () => {
  return (
    <ArticleLayout
      title="Pantallas OLED SSD1306 con Arduino"
      subtitle="Guía completa para conectar, programar y crear proyectos de visualización con pantallas OLED I2C de 0.96 pulgadas usando Arduino y la librería Adafruit."
      slug="pantalla-oled-ssd1306"
      datePublished="2026-04-10"
      dateModified="2026-04-10"
    >
      {/* ═══════════ INTRODUCCIÓN ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-4">
          ¿Qué es una pantalla OLED SSD1306?
        </h2>
        <p>
          Las pantallas OLED (<strong>Organic Light-Emitting Diode</strong>) son dispositivos de visualización
          que emiten luz propia sin necesidad de retroiluminación. El controlador <strong>SSD1306</strong> es
          el chip más popular para pantallas OLED monocromáticas de 128×64 y 128×32 píxeles, disponibles
          comúnmente en tamaños de 0.96" y 1.3".
        </p>
        <p className="mt-3">
          A diferencia de las pantallas LCD tradicionales (como la 16×2), las OLED ofrecen varias ventajas:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Contraste infinito:</strong> cada píxel emite su propia luz, los píxeles apagados son verdaderamente negros.</li>
          <li><strong>Bajo consumo:</strong> consumen entre 10-20 mA dependiendo del contenido mostrado.</li>
          <li><strong>Comunicación I2C:</strong> solo necesitan 4 cables (VCC, GND, SDA, SCL), ideal para proyectos compactos.</li>
          <li><strong>Amplio ángulo de visión:</strong> legibles desde prácticamente cualquier ángulo (hasta 160°).</li>
          <li><strong>Sin retroiluminación:</strong> menor grosor y peso comparado con LCD.</li>
        </ul>

        <div className="bg-card border border-border rounded-xl p-4 mt-6">
          <h3 className="text-base font-semibold text-foreground mb-3">📋 Especificaciones técnicas del SSD1306</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-foreground font-semibold">Característica</th>
                  <th className="text-left py-2 text-foreground font-semibold">Valor</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-2 pr-4">Resolución</td><td>128 × 64 píxeles (o 128 × 32)</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4">Tamaño de pantalla</td><td>0.96" diagonal (24.4 mm)</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4">Voltaje de operación</td><td>3.3V – 5V (con regulador integrado)</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4">Interfaz</td><td>I2C (también disponible en SPI)</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4">Dirección I2C por defecto</td><td>0x3C (algunos módulos 0x3D)</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4">Consumo típico</td><td>10-20 mA</td></tr>
                <tr><td className="py-2 pr-4">Color de píxeles</td><td>Blanco, azul o amarillo/azul (dual)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════ CONEXIÓN I2C ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Conexión I2C con Arduino
        </h2>
        <p>
          La conexión I2C es la más sencilla: solo necesitas 4 cables. El bus{" "}
          <Link to="/articulos/protocolo-i2c" className="text-primary hover:underline">I2C</Link> utiliza
          dos líneas de datos (SDA y SCL) más alimentación. Asegurate de que tu módulo OLED ya incluya
          las resistencias pull-up integradas (la mayoría de módulos las tienen).
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mt-6">
          <h3 className="text-base font-semibold text-foreground mb-3">🔌 Diagrama de conexión</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`  OLED SSD1306          Arduino UNO / Nano
  ┌───────────┐         ┌──────────────┐
  │ VCC  ─────┼─────────┤ 5V           │
  │ GND  ─────┼─────────┤ GND          │
  │ SDA  ─────┼─────────┤ A4 (SDA)     │
  │ SCL  ─────┼─────────┤ A5 (SCL)     │
  └───────────┘         └──────────────┘

  Para Arduino Mega:
  SDA → Pin 20
  SCL → Pin 21

  Para Arduino Leonardo:
  SDA → Pin 2
  SCL → Pin 3`}
          </pre>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
          <p className="text-sm">
            <strong>⚡ Importante:</strong> Algunos módulos OLED solo aceptan 3.3V. Revisá la serigrafía
            de tu módulo antes de conectar. Si dice "3.3V-5V" podés usar la salida de 5V del Arduino. Si
            solo dice "3.3V", usá la salida de 3.3V para evitar dañar la pantalla.
          </p>
        </div>
      </section>

      {/* ═══════════ INSTALACIÓN DE LIBRERÍAS ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Instalación de librerías
        </h2>
        <p>
          Para controlar la pantalla OLED necesitamos dos librerías de Adafruit. Ambas se instalan
          desde el Gestor de Librerías del Arduino IDE:
        </p>
        <ol className="list-decimal pl-6 mt-3 space-y-3">
          <li>
            Abrí el Arduino IDE → <strong>Herramientas → Administrar Bibliotecas</strong>
          </li>
          <li>
            Buscá e instalá <code className="bg-card px-2 py-0.5 rounded text-primary font-mono text-sm">Adafruit SSD1306</code>
          </li>
          <li>
            Cuando pregunte por dependencias, aceptá instalar también{" "}
            <code className="bg-card px-2 py-0.5 rounded text-primary font-mono text-sm">Adafruit GFX Library</code>
          </li>
        </ol>

        <div className="bg-card border border-border rounded-xl p-4 mt-6">
          <h3 className="text-base font-semibold text-foreground mb-3">📦 Librerías necesarias</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-foreground font-semibold">Librería</th>
                  <th className="text-left py-2 pr-4 text-foreground font-semibold">Función</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-xs">Adafruit SSD1306</td>
                  <td>Driver específico para el controlador SSD1306</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-xs">Adafruit GFX</td>
                  <td>Motor gráfico: texto, formas, bitmaps</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">Wire.h</td>
                  <td>Comunicación I2C (incluida en Arduino IDE)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════ PROYECTO 1: HELLO WORLD ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Proyecto 1: Hello World — Tu primer texto en OLED
        </h2>
        <p>
          Este es el proyecto más básico: inicializar la pantalla y mostrar un mensaje de texto.
          Es fundamental para verificar que la conexión I2C funciona correctamente.
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">💻 Código: HelloWorld_OLED.ino</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Definir dimensiones de pantalla
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

// Crear objeto display (128x64, I2C)
// El -1 indica que no hay pin de reset
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(9600);

  // Inicializar pantalla en dirección I2C 0x3C
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("Error: SSD1306 no encontrado"));
    for (;;); // Bucle infinito si falla
  }

  // Limpiar buffer
  display.clearDisplay();

  // Configurar texto
  display.setTextSize(1);          // Tamaño 1 = 6x8 píxeles
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);         // Posición (x, y)

  // Escribir texto
  display.println(F("Hola Mundo!"));
  display.println(F("ElectroLab Pro"));
  display.println();
  display.setTextSize(2);          // Tamaño 2 = 12x16 píxeles
  display.println(F("OLED OK"));

  // Enviar buffer a la pantalla
  display.display();
}

void loop() {
  // Nada por ahora
}`}
          </pre>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">📐 Tamaños de texto disponibles</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-foreground font-semibold">setTextSize()</th>
                  <th className="text-left py-2 pr-4 text-foreground font-semibold">Dimensión (px)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Caracteres por línea</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50"><td className="py-1.5 pr-4">1</td><td className="pr-4">6 × 8</td><td>21 caracteres</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-4">2</td><td className="pr-4">12 × 16</td><td>10 caracteres</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-4">3</td><td className="pr-4">18 × 24</td><td>7 caracteres</td></tr>
                <tr><td className="py-1.5 pr-4">4</td><td className="pr-4">24 × 32</td><td>5 caracteres</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
          <p className="text-sm">
            <strong>💡 Tip:</strong> Si la pantalla no muestra nada, probá cambiar la dirección I2C
            de <code className="font-mono">0x3C</code> a <code className="font-mono">0x3D</code>.
            Podés usar el{" "}
            <Link to="/articulos/protocolo-i2c" className="text-primary hover:underline">escáner I2C</Link>{" "}
            para detectar la dirección correcta automáticamente.
          </p>
        </div>
      </section>

      {/* ═══════════ PROYECTO 2: FIGURAS GEOMÉTRICAS ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Proyecto 2: Figuras geométricas y gráficos
        </h2>
        <p>
          La librería <strong>Adafruit GFX</strong> incluye un motor gráfico completo para dibujar
          píxeles, líneas, rectángulos, círculos, triángulos y más. Este proyecto muestra cómo
          usar las funciones de dibujo principales.
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">💻 Código: Figuras_OLED.ino</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();

  // 1. Dibujar un píxel individual
  display.drawPixel(64, 32, SSD1306_WHITE);

  // 2. Línea de (0,0) a (127,63)
  display.drawLine(0, 0, 127, 63, SSD1306_WHITE);

  // 3. Rectángulo vacío: (x, y, ancho, alto)
  display.drawRect(10, 10, 50, 30, SSD1306_WHITE);

  // 4. Rectángulo relleno
  display.fillRect(70, 10, 50, 30, SSD1306_WHITE);

  // 5. Círculo vacío: (centroX, centroY, radio)
  display.drawCircle(32, 48, 12, SSD1306_WHITE);

  // 6. Círculo relleno
  display.fillCircle(96, 48, 12, SSD1306_WHITE);

  display.display();
}

void loop() {
  // Estático
}`}
          </pre>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">🎨 Referencia rápida de funciones GFX</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-3 text-foreground font-semibold">Función</th>
                  <th className="text-left py-2 text-foreground font-semibold">Descripción</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground font-mono">
                <tr className="border-b border-border/50"><td className="py-1.5 pr-3">drawPixel(x,y,c)</td><td className="font-sans">Dibujar un píxel</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-3">drawLine(x0,y0,x1,y1,c)</td><td className="font-sans">Línea entre dos puntos</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-3">drawRect(x,y,w,h,c)</td><td className="font-sans">Rectángulo vacío</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-3">fillRect(x,y,w,h,c)</td><td className="font-sans">Rectángulo relleno</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-3">drawCircle(x,y,r,c)</td><td className="font-sans">Círculo vacío</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-3">fillCircle(x,y,r,c)</td><td className="font-sans">Círculo relleno</td></tr>
                <tr className="border-b border-border/50"><td className="py-1.5 pr-3">drawTriangle(...)</td><td className="font-sans">Triángulo (3 vértices)</td></tr>
                <tr><td className="py-1.5 pr-3">drawRoundRect(x,y,w,h,r,c)</td><td className="font-sans">Rectángulo con bordes redondeados</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════ PROYECTO 3: SENSOR + OLED ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Proyecto 3: Monitor de temperatura en tiempo real
        </h2>
        <p>
          Combinamos un{" "}
          <Link to="/articulos/sensores-arduino" className="text-primary hover:underline">sensor de temperatura LM35</Link>{" "}
          con la pantalla OLED para crear un termómetro digital con gráfico de barras en tiempo real.
          Este proyecto demuestra cómo actualizar la pantalla dinámicamente.
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">🔌 Conexión</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`  OLED SSD1306          Arduino UNO
  VCC  → 5V             LM35
  GND  → GND            VCC  → 5V
  SDA  → A4             GND  → GND
  SCL  → A5             OUT  → A0`}
          </pre>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">💻 Código: Termometro_OLED.ino</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define SENSOR_PIN A0

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Historial de temperaturas para el gráfico
float historial[64];
int indice = 0;

void setup() {
  Serial.begin(9600);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.display();

  // Inicializar historial en 0
  for (int i = 0; i < 64; i++) {
    historial[i] = 0;
  }
}

void loop() {
  // Leer temperatura del LM35
  int lectura = analogRead(SENSOR_PIN);
  float voltaje = lectura * (5.0 / 1023.0);
  float tempC = voltaje * 100.0;  // LM35: 10mV/°C

  // Guardar en historial
  historial[indice] = tempC;
  indice = (indice + 1) % 64;

  // Limpiar pantalla
  display.clearDisplay();

  // === Título ===
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.print(F("Temperatura"));

  // === Valor grande ===
  display.setTextSize(2);
  display.setCursor(0, 12);
  display.print(tempC, 1);
  display.setTextSize(1);
  display.print(F(" C"));

  // === Gráfico de barras ===
  // Área del gráfico: x=0, y=34, ancho=128, alto=28
  display.drawRect(0, 33, 128, 30, SSD1306_WHITE);

  for (int i = 0; i < 64; i++) {
    int idx = (indice + i) % 64;
    // Mapear temperatura (0-50°C) a altura (0-28px)
    int altura = constrain(map(historial[idx] * 10,
                    0, 500, 0, 28), 0, 28);
    if (altura > 0) {
      display.drawLine(
        i * 2, 62,        // Punto inferior
        i * 2, 62 - altura, // Punto superior
        SSD1306_WHITE
      );
    }
  }

  // === Indicadores min/max ===
  display.setTextSize(1);
  display.setCursor(80, 0);
  display.print(F("50C"));
  display.setCursor(80, 8);
  display.print(F(" 0C"));

  display.display();
  delay(1000);  // Actualizar cada segundo
}`}
          </pre>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
          <p className="text-sm">
            <strong>🧠 Lo que aprendiste:</strong> Cómo actualizar la pantalla en un loop, dibujar
            gráficos de barras dinámicos con <code className="font-mono">drawLine()</code>, usar{" "}
            <code className="font-mono">constrain()</code> y <code className="font-mono">map()</code> para
            escalar valores, y mantener un buffer circular de historial de datos.
          </p>
        </div>
      </section>

      {/* ═══════════ PROYECTO 4: ANIMACIÓN ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Proyecto 4: Animación — Pelota rebotando
        </h2>
        <p>
          Las pantallas OLED pueden mostrar animaciones fluidas si gestionamos bien el buffer de pantalla.
          Este proyecto crea una pelota que rebota dentro de los límites de la pantalla, demostrando
          la capacidad gráfica del SSD1306.
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">💻 Código: Pelota_OLED.ino</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Posición y velocidad de la pelota
float x = 64, y = 32;
float vx = 2.5, vy = 1.8;
int radio = 5;

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
}

void loop() {
  // Actualizar posición
  x += vx;
  y += vy;

  // Detectar colisión con bordes
  if (x - radio <= 0 || x + radio >= SCREEN_WIDTH) {
    vx = -vx;  // Invertir dirección X
  }
  if (y - radio <= 0 || y + radio >= SCREEN_HEIGHT) {
    vy = -vy;  // Invertir dirección Y
  }

  // Dibujar frame
  display.clearDisplay();

  // Marco de la pantalla
  display.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
                   SSD1306_WHITE);

  // Pelota
  display.fillCircle((int)x, (int)y, radio,
                     SSD1306_WHITE);

  // Coordenadas en pantalla
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(2, 2);
  display.print(F("X:"));
  display.print((int)x);
  display.print(F(" Y:"));
  display.print((int)y);

  display.display();
  delay(30);  // ~33 FPS
}`}
          </pre>
        </div>
      </section>

      {/* ═══════════ PROYECTO 5: DASHBOARD MULTISENSOR ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Proyecto 5: Dashboard multisensor
        </h2>
        <p>
          El proyecto final combina múltiples lecturas de sensores en una interfaz tipo dashboard.
          Mostramos temperatura, humedad (simulada), distancia y el estado de un botón, todo organizado
          en una interfaz visual profesional dividida en cuadrantes.
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">🔌 Componentes necesarios</h3>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li>OLED SSD1306 128×64 (I2C)</li>
            <li>Sensor LM35 (temperatura) → A0</li>
            <li>Sensor HC-SR04 (distancia) → Trig: D9, Echo: D10</li>
            <li>Pulsador → D2 (con pull-up interno)</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">💻 Código: Dashboard_OLED.ino</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define LM35_PIN  A0
#define TRIG_PIN  9
#define ECHO_PIN  10
#define BTN_PIN   2

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT,
                         &Wire, -1);

float leerTemperatura() {
  int raw = analogRead(LM35_PIN);
  return (raw * 5.0 / 1023.0) * 100.0;
}

float leerDistancia() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duracion = pulseIn(ECHO_PIN, HIGH, 30000);
  return duracion * 0.034 / 2.0;  // cm
}

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.display();
}

void loop() {
  float temp = leerTemperatura();
  float dist = leerDistancia();
  bool btnEstado = !digitalRead(BTN_PIN); // Pull-up

  display.clearDisplay();

  // ═══ Líneas divisorias ═══
  display.drawLine(64, 0, 64, 63, SSD1306_WHITE);
  display.drawLine(0, 32, 127, 32, SSD1306_WHITE);

  // ═══ Cuadrante 1: Temperatura ═══
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(4, 2);
  display.print(F("TEMP"));
  display.setTextSize(2);
  display.setCursor(4, 14);
  display.print(temp, 1);

  // ═══ Cuadrante 2: Distancia ═══
  display.setTextSize(1);
  display.setCursor(70, 2);
  display.print(F("DIST"));
  display.setTextSize(2);
  display.setCursor(70, 14);
  if (dist > 0 && dist < 400) {
    display.print(dist, 0);
    display.setTextSize(1);
    display.print(F("cm"));
  } else {
    display.print(F("---"));
  }

  // ═══ Cuadrante 3: Botón ═══
  display.setTextSize(1);
  display.setCursor(4, 36);
  display.print(F("BOTON"));
  display.setTextSize(2);
  display.setCursor(4, 48);
  display.print(btnEstado ? F("ON") : F("OFF"));

  // Indicador visual del botón
  if (btnEstado) {
    display.fillCircle(50, 52, 6, SSD1306_WHITE);
  } else {
    display.drawCircle(50, 52, 6, SSD1306_WHITE);
  }

  // ═══ Cuadrante 4: Uptime ═══
  display.setTextSize(1);
  display.setCursor(70, 36);
  display.print(F("UPTIME"));
  unsigned long seg = millis() / 1000;
  display.setTextSize(2);
  display.setCursor(70, 48);
  display.print(seg);
  display.setTextSize(1);
  display.print(F("s"));

  display.display();
  delay(200);
}`}
          </pre>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
          <p className="text-sm">
            <strong>🧠 Lo que aprendiste:</strong> Diseñar interfaces divididas en cuadrantes,
            combinar múltiples sensores en una sola pantalla, usar diferentes tamaños de texto para
            jerarquía visual, y crear un sistema de monitoreo compacto y funcional.
          </p>
        </div>
      </section>

      {/* ═══════════ BITMAPS PERSONALIZADOS ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Bonus: Mostrar imágenes bitmap personalizadas
        </h2>
        <p>
          Podés mostrar logos, iconos o cualquier imagen en blanco y negro en la OLED usando bitmaps.
          La imagen debe convertirse a un array de bytes usando una herramienta online como
          <strong> image2cpp</strong> (disponible en lcd-image-converter o image2cpp.com).
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">📝 Pasos para mostrar un bitmap</h3>
          <ol className="list-decimal pl-6 text-sm space-y-2">
            <li>Prepará una imagen de <strong>128×64 píxeles</strong> en blanco y negro (formato BMP o PNG).</li>
            <li>Convertila a código C usando <strong>image2cpp</strong> (buscar "image2cpp online" en Google).</li>
            <li>Configurá: "Code output format" → "Arduino code", "Draw mode" → "Horizontal".</li>
            <li>Copiá el array generado y usalo con <code className="font-mono">display.drawBitmap()</code>.</li>
          </ol>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 font-mono">💻 Ejemplo de uso</h3>
          <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
{`// Array generado por image2cpp (ejemplo: ícono 16x16)
const unsigned char miIcono [] PROGMEM = {
  0x00, 0x00, 0x07, 0xe0, 0x1f, 0xf8,
  0x3f, 0xfc, 0x7f, 0xfe, 0x7f, 0xfe,
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0x7f, 0xfe, 0x7f, 0xfe,
  0x3f, 0xfc, 0x1f, 0xf8, 0x07, 0xe0,
  0x00, 0x00
};

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();

  // drawBitmap(x, y, bitmap, ancho, alto, color)
  display.drawBitmap(56, 24, miIcono, 16, 16,
                     SSD1306_WHITE);
  display.display();
}`}
          </pre>
        </div>
      </section>

      {/* ═══════════ TROUBLESHOOTING ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Solución de problemas comunes
        </h2>

        <div className="space-y-4">
          {[
            {
              problema: "La pantalla no muestra nada",
              solucion: "Verificá la dirección I2C (probá 0x3C y 0x3D). Ejecutá el escáner I2C para detectar dispositivos. Revisá las conexiones SDA/SCL y que la alimentación sea correcta."
            },
            {
              problema: "La pantalla muestra píxeles aleatorios",
              solucion: "Llamá a display.clearDisplay() antes de dibujar. Asegurate de llamar a display.display() después de escribir en el buffer."
            },
            {
              problema: "El texto se ve cortado o fuera de pantalla",
              solucion: "Verificá las coordenadas de setCursor(). Recordá que la pantalla tiene 128 píxeles de ancho y 64 de alto. Con textSize(1), cada carácter ocupa 6×8 px."
            },
            {
              problema: "La pantalla parpadea o titila",
              solucion: "Reducí la frecuencia de actualización. No uses delay() muy cortos. Asegurate de que la fuente de alimentación sea estable y las conexiones firmes."
            },
            {
              problema: "Error de compilación con las librerías",
              solucion: "Verificá que tengas instaladas AMBAS librerías: Adafruit SSD1306 y Adafruit GFX. Reiniciá el Arduino IDE después de instalarlas."
            },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-1">❌ {item.problema}</h3>
              <p className="text-sm text-muted-foreground">✅ {item.solucion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ RECURSOS ═══════════ */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
          Artículos relacionados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Protocolo I2C", desc: "Cómo funciona el bus I2C que usa la OLED", to: "/articulos/protocolo-i2c" },
            { title: "Arduino para principiantes", desc: "Primeros pasos con Arduino", to: "/articulos/arduino" },
            { title: "Sensores Arduino", desc: "DHT11, HC-SR04, LDR y PIR", to: "/articulos/sensores-arduino" },
            { title: "Multímetro digital", desc: "Medir voltaje, resistencia y continuidad", to: "/articulos/multimetro" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex flex-col gap-1 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
            >
              <span className="text-sm font-semibold text-foreground">{link.title}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </ArticleLayout>
  );
};

export default PantallaOled;
