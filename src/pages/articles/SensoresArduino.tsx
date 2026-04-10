import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const SensoresArduino = () => {
  return (
    <ArticleLayout
      title="Sensores con Arduino: DHT11, HC-SR04, LDR y PIR – Guía Práctica"
      subtitle="Aprende a conectar y programar los 4 sensores más populares de Arduino con diagramas de conexión, código completo, explicaciones técnicas y proyectos funcionales."
      slug="sensores-arduino"
      datePublished="2026-04-10"
      dateModified="2026-04-10"
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">Introducción a los sensores en Arduino</h2>
      <p>
        Los <strong className="text-foreground">sensores</strong> son el puente entre el mundo físico y tu microcontrolador. Convierten magnitudes reales (temperatura, distancia, luz, movimiento) en señales eléctricas que Arduino puede leer y procesar. En esta guía cubrimos los 4 sensores más utilizados en proyectos de electrónica:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Sensor</th>
              <th className="px-4 py-2 text-left font-mono">Magnitud</th>
              <th className="px-4 py-2 text-left font-mono">Tipo de señal</th>
              <th className="px-4 py-2 text-left font-mono">Pin Arduino</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">DHT11</td>
              <td className="px-4 py-2">Temperatura y humedad</td>
              <td className="px-4 py-2">Digital (protocolo propio)</td>
              <td className="px-4 py-2 font-mono">Cualquier digital</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">HC-SR04</td>
              <td className="px-4 py-2">Distancia</td>
              <td className="px-4 py-2">Digital (pulso)</td>
              <td className="px-4 py-2 font-mono">2 pines digitales</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LDR</td>
              <td className="px-4 py-2">Luz ambiental</td>
              <td className="px-4 py-2">Analógica (resistiva)</td>
              <td className="px-4 py-2 font-mono">A0-A5</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">PIR HC-SR501</td>
              <td className="px-4 py-2">Movimiento (infrarrojo)</td>
              <td className="px-4 py-2">Digital (HIGH/LOW)</td>
              <td className="px-4 py-2 font-mono">Cualquier digital</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================= DHT11 ========================= */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">🌡️ Sensor DHT11 – Temperatura y Humedad</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">El sensor ambiental más popular para principiantes</p>
      </div>

      <h3 className="text-lg font-mono font-semibold text-foreground">¿Qué es el DHT11?</h3>
      <p>
        El <strong className="text-foreground">DHT11</strong> es un sensor digital de bajo costo que mide temperatura (0-50°C, ±2°C) y humedad relativa (20-80%, ±5%). Usa un protocolo de comunicación propietario de un solo cable que transmite 40 bits de datos por cada lectura.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Especificaciones técnicas</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Parámetro</th>
              <th className="px-4 py-2 text-left font-mono">DHT11</th>
              <th className="px-4 py-2 text-left font-mono">DHT22 (comparación)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Rango de temperatura</td>
              <td className="px-4 py-2">0°C a 50°C</td>
              <td className="px-4 py-2">-40°C a 80°C</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Precisión temperatura</td>
              <td className="px-4 py-2">±2°C</td>
              <td className="px-4 py-2">±0.5°C</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Rango de humedad</td>
              <td className="px-4 py-2">20-80% HR</td>
              <td className="px-4 py-2">0-100% HR</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Frecuencia de muestreo</td>
              <td className="px-4 py-2">1 lectura/segundo</td>
              <td className="px-4 py-2">1 lectura/2 segundos</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Alimentación</td>
              <td className="px-4 py-2">3.3V - 5.5V</td>
              <td className="px-4 py-2">3.3V - 6V</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Precio aproximado</td>
              <td className="px-4 py-2 font-mono text-primary">~$2 USD</td>
              <td className="px-4 py-2">~$5 USD</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/50 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">1</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Proyecto: Estación meteorológica básica</h3>
          <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono">Fácil</span>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Sensor DHT11 (módulo de 3 pines con pull-up integrada)</li>
          <li>Cables jumper</li>
        </ul>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Diagrama de conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  DHT11 (módulo 3 pines)     Arduino UNO
  ──────────────────────     ───────────
  VCC (+)  ──────────────── 5V
  DATA     ──────────────── Pin 2
  GND (-)  ──────────────── GND

  Nota: Si usas el sensor suelto (4 pines),
  agrega una resistencia de 10kΩ pull-up
  entre DATA y VCC.

  [DHT11]
    │ │ │
    V D G
    C A N
    C T D
    │ A │
    │ │ │
   5V Pin2 GND`}</pre>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código (con librería DHT)</h4>
        <p className="text-sm mb-2">Primero instala la librería: en el Arduino IDE ve a <span className="font-mono text-primary">Sketch → Incluir Librería → Gestionar Librerías</span> y busca "DHT sensor library" de Adafruit.</p>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("=== Estación Meteorológica ===");
  Serial.println("Sensor DHT11 iniciado");
  Serial.println("-----------------------------");
}

void loop() {
  // El DHT11 necesita ~1s entre lecturas
  delay(2000);
  
  float humedad = dht.readHumidity();
  float temperatura = dht.readTemperature();
  
  // Verificar si la lectura falló
  if (isnan(humedad) || isnan(temperatura)) {
    Serial.println("Error: No se pudo leer el DHT11");
    return;
  }
  
  // Índice de calor (sensación térmica)
  float sensacion = dht.computeHeatIndex(temperatura, humedad, false);
  
  Serial.print("Temperatura: ");
  Serial.print(temperatura, 1);
  Serial.print("°C | Humedad: ");
  Serial.print(humedad, 1);
  Serial.print("% | Sensación: ");
  Serial.print(sensacion, 1);
  Serial.println("°C");
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A usar una librería externa para comunicarte con un sensor que tiene su propio protocolo digital. El DHT11 envía 40 bits (16 de humedad + 16 de temperatura + 8 de checksum) en cada lectura. La función <span className="font-mono text-primary">isnan()</span> detecta lecturas fallidas.
        </div>
      </div>

      {/* ========================= HC-SR04 ========================= */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">📏 Sensor HC-SR04 – Distancia por Ultrasonido</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">Mide distancias de 2 cm a 400 cm con ondas sonoras</p>
      </div>

      <h3 className="text-lg font-mono font-semibold text-foreground">¿Cómo funciona el ultrasonido?</h3>
      <p>
        El <strong className="text-foreground">HC-SR04</strong> emite un pulso ultrasónico de 40 kHz (inaudible para humanos) por el transductor emisor. El sonido viaja, rebota en un objeto y vuelve al receptor. Midiendo el <strong className="text-foreground">tiempo de vuelo</strong> y conociendo la velocidad del sonido (~343 m/s a 20°C), calculamos la distancia:
      </p>
      <div className="bg-secondary/50 rounded-lg p-3 font-mono text-sm overflow-x-auto my-4">
        <pre className="text-foreground">{`Distancia = (Tiempo × Velocidad del sonido) / 2
Distancia (cm) = duración (µs) × 0.0343 / 2
Distancia (cm) = duración (µs) / 58.2`}</pre>
      </div>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Especificaciones</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Rango</strong>: 2 cm a 400 cm</li>
        <li><strong className="text-foreground">Precisión</strong>: ±3 mm</li>
        <li><strong className="text-foreground">Ángulo de medición</strong>: ~15° (cono efectivo)</li>
        <li><strong className="text-foreground">Alimentación</strong>: 5V DC, ~15 mA</li>
        <li><strong className="text-foreground">Frecuencia ultrasónica</strong>: 40 kHz</li>
      </ul>

      <div className="p-5 rounded-xl border border-border bg-card/50 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">2</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Proyecto: Medidor de distancia con alarma</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Sensor HC-SR04</li>
          <li>1× Buzzer pasivo</li>
          <li>1× LED rojo + resistencia 220Ω</li>
        </ul>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Diagrama de conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  HC-SR04          Arduino
  ────────         ────────
  VCC     ──────── 5V
  TRIG    ──────── Pin 9
  ECHO    ──────── Pin 10
  GND     ──────── GND

  Buzzer            Arduino
  ──────            ────────
  (+)     ──────── Pin 6
  (-)     ──────── GND

  LED               Arduino
  ───               ────────
  Ánodo  ── [220Ω] ── Pin 7
  Cátodo ── GND`}</pre>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int trigPin = 9;
const int echoPin = 10;
const int buzzerPin = 6;
const int ledPin = 7;

const float DIST_ALARMA = 20.0;  // cm

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.println("Medidor de distancia con alarma");
}

void loop() {
  float distancia = medirDistancia();
  
  Serial.print("Distancia: ");
  Serial.print(distancia, 1);
  Serial.print(" cm");
  
  if (distancia < DIST_ALARMA && distancia > 0) {
    // Alarma: objeto demasiado cerca
    Serial.println(" ⚠️ ¡ALARMA!");
    digitalWrite(ledPin, HIGH);
    
    // Frecuencia del buzzer proporcional a la distancia
    int frecuencia = map(distancia, 2, DIST_ALARMA, 2000, 500);
    tone(buzzerPin, frecuencia, 100);
  } else {
    Serial.println(" ✓ OK");
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
  
  delay(100);
}

float medirDistancia() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duracion = pulseIn(echoPin, HIGH, 25000);
  
  if (duracion == 0) return -1;  // Sin eco
  return duracion / 58.2;
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A usar <span className="font-mono text-primary">pulseIn()</span> con timeout para evitar bloqueos, <span className="font-mono text-primary">tone()</span> para generar sonido, y <span className="font-mono text-primary">map()</span> para escalar valores. El timeout de 25000 µs equivale a ~4.3 metros de distancia máxima.
        </div>
      </div>

      {/* ========================= LDR ========================= */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">💡 Sensor LDR – Fotorresistencia</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">Detecta niveles de luz ambiental con un divisor de tensión</p>
      </div>

      <h3 className="text-lg font-mono font-semibold text-foreground">¿Qué es un LDR?</h3>
      <p>
        Un <strong className="text-foreground">LDR</strong> (Light Dependent Resistor) o fotorresistencia es un componente cuya resistencia varía con la cantidad de luz que recibe. En oscuridad puede llegar a <strong className="text-foreground">1 MΩ o más</strong>, y con luz intensa baja hasta <strong className="text-foreground">100Ω o menos</strong>.
      </p>
      <p>
        Para leerlo con Arduino, lo conectamos en un <Link to="/articulos/circuitos-serie-paralelo" className="text-primary hover:underline">divisor de tensión</Link> con una resistencia fija de 10kΩ. El punto medio del divisor se conecta a un pin analógico:
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Principio del divisor de tensión con LDR</h3>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto my-4">
        <pre className="text-foreground">{`  5V ──── [LDR] ──┬── Arduino A0
                   │
                [10kΩ]
                   │
                  GND

  Con mucha luz:  LDR ≈ 200Ω  → Voltaje en A0 ≈ 4.9V → ADC ≈ 1000
  Con poca luz:   LDR ≈ 50kΩ  → Voltaje en A0 ≈ 0.8V → ADC ≈ 170
  En oscuridad:   LDR ≈ 1MΩ   → Voltaje en A0 ≈ 0.05V → ADC ≈ 10

  Fórmula: V_out = 5V × R_fija / (R_LDR + R_fija)`}</pre>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/50 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">3</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Proyecto: Luz automática nocturna</h3>
          <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono">Fácil</span>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Fotorresistencia LDR</li>
          <li>1× Resistencia de 10kΩ (divisor de tensión)</li>
          <li>1× LED + resistencia de 220Ω (ver <Link to="/articulos/codigo-colores-resistencias" className="text-primary hover:underline">código de colores</Link>)</li>
        </ul>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int ldrPin = A0;
const int ledPin = 9;  // Pin PWM para brillo variable

const int UMBRAL_OSCURIDAD = 300;
const int UMBRAL_LUZ = 700;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  Serial.println("Luz automática nocturna");
  Serial.println("-----------------------");
}

void loop() {
  int lectura = analogRead(ldrPin);
  
  // Mapear la lectura a brillo del LED (invertido)
  // Menos luz ambiental = más brillo del LED
  int brillo = 0;
  
  if (lectura < UMBRAL_OSCURIDAD) {
    brillo = 255;  // Oscuro: LED al máximo
    Serial.print("🌙 OSCURO");
  } else if (lectura < UMBRAL_LUZ) {
    // Zona de transición: brillo proporcional
    brillo = map(lectura, UMBRAL_OSCURIDAD, UMBRAL_LUZ, 255, 0);
    Serial.print("🌤 PARCIAL");
  } else {
    brillo = 0;    // Luz suficiente: LED apagado
    Serial.print("☀️ CLARO");
  }
  
  analogWrite(ledPin, brillo);
  
  Serial.print(" | ADC: ");
  Serial.print(lectura);
  Serial.print(" | LED: ");
  Serial.print(map(brillo, 0, 255, 0, 100));
  Serial.println("%");
  
  delay(200);
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A crear un divisor de tensión para leer un sensor resistivo, usar <span className="font-mono text-primary">analogRead()</span> para obtener valores de 0-1023, y controlar el brillo de un LED con PWM de forma proporcional a la luz ambiental. Este mismo principio se usa en alumbrado público inteligente.
        </div>
      </div>

      {/* ========================= PIR ========================= */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">🚶 Sensor PIR HC-SR501 – Detector de Movimiento</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">Detecta movimiento mediante radiación infrarroja</p>
      </div>

      <h3 className="text-lg font-mono font-semibold text-foreground">¿Cómo funciona un sensor PIR?</h3>
      <p>
        <strong className="text-foreground">PIR</strong> (Passive Infrared) detecta cambios en la radiación infrarroja emitida por cuerpos calientes (personas, animales). El sensor no emite nada — solo "observa" los cambios térmicos en su campo de visión. Cuando alguien se mueve frente a él, la distribución de calor cambia y el sensor genera un pulso HIGH.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Características del HC-SR501</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Rango de detección</strong>: Hasta 7 metros (ajustable con potenciómetro)</li>
        <li><strong className="text-foreground">Ángulo de detección</strong>: ~120° con la lente de Fresnel</li>
        <li><strong className="text-foreground">Alimentación</strong>: 5V - 20V DC</li>
        <li><strong className="text-foreground">Salida</strong>: Digital (3.3V HIGH cuando detecta movimiento)</li>
        <li><strong className="text-foreground">Tiempo de bloqueo</strong>: ~2.5 segundos entre detecciones</li>
        <li><strong className="text-foreground">Potenciómetros</strong>: Ajuste de sensibilidad y tiempo de retardo</li>
      </ul>

      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto my-4">
        <pre className="text-foreground">{`  HC-SR501 (vista posterior)
  ┌─────────────────────────────┐
  │  [Pot1: Sensibilidad]       │
  │  [Pot2: Tiempo retardo]     │
  │                             │
  │  ┌───┐ ┌───┐ ┌───┐         │
  │  │VCC│ │OUT│ │GND│         │
  │  └───┘ └───┘ └───┘         │
  └─────────────────────────────┘
     5V    Pin 2   GND

  Pot1: Gira para ajustar la distancia de detección (3-7m)
  Pot2: Gira para ajustar cuánto tiempo OUT queda en HIGH (5s-300s)`}</pre>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/50 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">4</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Proyecto: Sistema de alarma por movimiento</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Sensor PIR HC-SR501</li>
          <li>1× Buzzer activo</li>
          <li>2× LEDs (verde + rojo) + resistencias 220Ω</li>
        </ul>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int pirPin = 2;
const int buzzerPin = 6;
const int ledVerde = 4;
const int ledRojo = 5;

int contadorAlarmas = 0;

void setup() {
  Serial.begin(9600);
  pinMode(pirPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledVerde, OUTPUT);
  pinMode(ledRojo, OUTPUT);
  
  // El PIR necesita ~30-60 segundos para calibrarse
  Serial.println("Calibrando sensor PIR...");
  Serial.println("No te muevas durante 30 segundos");
  
  digitalWrite(ledVerde, HIGH);  // LED verde durante calibración
  delay(30000);
  digitalWrite(ledVerde, LOW);
  
  Serial.println("¡Sensor PIR listo! Sistema armado.");
}

void loop() {
  int movimiento = digitalRead(pirPin);
  
  if (movimiento == HIGH) {
    contadorAlarmas++;
    Serial.print("⚠️ MOVIMIENTO DETECTADO #");
    Serial.println(contadorAlarmas);
    
    // Alarma visual y sonora
    digitalWrite(ledRojo, HIGH);
    digitalWrite(ledVerde, LOW);
    digitalWrite(buzzerPin, HIGH);
    delay(500);
    digitalWrite(buzzerPin, LOW);
    delay(500);
    digitalWrite(buzzerPin, HIGH);
    delay(500);
    digitalWrite(buzzerPin, LOW);
    digitalWrite(ledRojo, LOW);
  } else {
    // Sin movimiento: LED verde encendido
    digitalWrite(ledVerde, HIGH);
    digitalWrite(ledRojo, LOW);
  }
  
  delay(200);
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A usar un sensor digital simple (HIGH/LOW), implementar un período de calibración y crear un sistema con indicadores visuales y sonoros. El HC-SR501 funciona a 3.3V en su salida, pero es compatible con los pines digitales del Arduino de 5V.
        </div>
      </div>

      {/* ========================= PROYECTO COMBINADO ========================= */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">🔬 Proyecto Final: Estación multisensor</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">Combina los 4 sensores en un solo proyecto integrado</p>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">5</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Estación de monitoreo ambiental</h3>
          <span className="ml-auto text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-mono">Avanzado</span>
        </div>

        <p className="mb-3">Integra los 4 sensores para crear una estación que monitorea temperatura, humedad, distancia, luz y presencia — todo reportado por el Monitor Serial.</p>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Conexión completa</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  Sensor        Pin Arduino
  ──────        ───────────
  DHT11 DATA    Pin 2
  HC-SR04 TRIG  Pin 9
  HC-SR04 ECHO  Pin 10
  LDR           A0 (con 10kΩ a GND)
  PIR OUT       Pin 3
  
  Todos los VCC → 5V
  Todos los GND → GND`}</pre>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`#include <DHT.h>

// Pines
#define DHTPIN 2
#define DHTTYPE DHT11
#define TRIG 9
#define ECHO 10
#define LDR_PIN A0
#define PIR_PIN 3

DHT dht(DHTPIN, DHTTYPE);
unsigned long ultimaLectura = 0;
const long INTERVALO = 2000;

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(PIR_PIN, INPUT);
  
  Serial.println("╔════════════════════════════════╗");
  Serial.println("║  ESTACIÓN MULTISENSOR v1.0     ║");
  Serial.println("║  ElectroLab Pro                ║");
  Serial.println("╚════════════════════════════════╝");
  
  delay(30000);  // Calibración PIR
  Serial.println("Sistema listo.\\n");
}

void loop() {
  unsigned long ahora = millis();
  
  if (ahora - ultimaLectura >= INTERVALO) {
    ultimaLectura = ahora;
    
    // 1. Temperatura y humedad
    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    
    // 2. Distancia
    float dist = medirDistancia();
    
    // 3. Luz ambiental
    int luz = analogRead(LDR_PIN);
    int luzPorcentaje = map(luz, 0, 1023, 0, 100);
    
    // 4. Movimiento
    bool movimiento = digitalRead(PIR_PIN);
    
    // Reporte
    Serial.println("── Lectura ──────────────────");
    
    if (!isnan(temp) && !isnan(hum)) {
      Serial.print("🌡 Temp: ");
      Serial.print(temp, 1);
      Serial.print("°C | Hum: ");
      Serial.print(hum, 1);
      Serial.println("%");
    }
    
    Serial.print("📏 Distancia: ");
    if (dist > 0) {
      Serial.print(dist, 1);
      Serial.println(" cm");
    } else {
      Serial.println("fuera de rango");
    }
    
    Serial.print("💡 Luz: ");
    Serial.print(luzPorcentaje);
    Serial.print("% (ADC: ");
    Serial.print(luz);
    Serial.println(")");
    
    Serial.print("🚶 Movimiento: ");
    Serial.println(movimiento ? "SÍ" : "No");
    Serial.println();
  }
}

float medirDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long dur = pulseIn(ECHO, HIGH, 25000);
  if (dur == 0) return -1;
  return dur / 58.2;
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A integrar múltiples sensores en un solo sketch usando <span className="font-mono text-primary">millis()</span> para temporización no bloqueante (en lugar de <span className="font-mono text-primary">delay()</span>), y a estructurar el código de forma modular con funciones auxiliares. Este proyecto es la base de sistemas IoT reales.
        </div>
      </div>

      {/* ========================= TROUBLESHOOTING ========================= */}

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-12">Solución de problemas con sensores</h2>
      <div className="space-y-3">
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ DHT11 devuelve "NaN" o lecturas erróneas</p>
          <p className="text-sm">Verifica la resistencia pull-up de 10kΩ (si usas sensor suelto). Respeta el intervalo mínimo de 1 segundo entre lecturas. Revisa que el pin DATA no tenga conexiones sueltas.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ HC-SR04 muestra siempre 0 o valores aleatorios</p>
          <p className="text-sm">Verifica que TRIG y ECHO no estén invertidos. El sensor necesita una superficie reflectante (no funciona bien con telas o esponjas). Agrega un timeout a <span className="font-mono text-primary">pulseIn()</span> para evitar bloqueos.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ LDR no responde a cambios de luz</p>
          <p className="text-sm">Asegúrate de que la resistencia fija (10kΩ) esté formando el divisor correctamente. Si los valores no cambian, prueba con diferentes valores de resistencia según la <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline">Ley de Ohm</Link>.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ PIR se activa constantemente (falsos positivos)</p>
          <p className="text-sm">Reduce la sensibilidad con el potenciómetro. Evita colocarlo cerca de fuentes de calor (radiadores, ventanas con sol directo). Espera los 30-60 segundos de calibración antes de usar el sistema.</p>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Próximos pasos</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Conecta los sensores a un display LCD o OLED vía <Link to="/articulos/protocolo-i2c" className="text-primary hover:underline">protocolo I2C</Link> para visualizar datos sin PC</li>
        <li>Agrega almacenamiento de datos en una tarjeta SD para registros históricos</li>
        <li>Usa un ESP32 para enviar las lecturas a la nube (IoT)</li>
        <li>Explora sensores avanzados: BMP280 (presión), MPU6050 (acelerómetro), OLED SSD1306</li>
        <li>Mide los niveles de voltaje con tu <Link to="/articulos/multimetro" className="text-primary hover:underline">multímetro</Link> para diagnosticar problemas</li>
        <li>Aprende a <Link to="/articulos/soldadura-electronica" className="text-primary hover:underline">soldar</Link> los sensores a una PCB para proyectos permanentes</li>
      </ul>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">📦 Kit de sensores para Arduino</p>
        <p className="text-muted-foreground text-sm">
          Consigue un pack con DHT11, HC-SR04, LDR, PIR y más de 30 sensores compatibles con Arduino para practicar todos los proyectos de esta guía.
        </p>
        <a
          href="https://www.amazon.es/s?k=kit+sensores+arduino+37&tag=electrolabpro-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits de sensores en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default SensoresArduino;
