import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import i2cImg from "@/assets/protocolo-i2c-diagram.jpg";

const ProtocoloI2C = () => {
  return (
    <ArticleLayout
      title="Protocolo I2C: Comunicación entre Microcontroladores y Sensores"
      subtitle="Guía completa del protocolo I2C (Inter-Integrated Circuit): cómo funciona, direccionamiento, conexión de múltiples dispositivos con Arduino, y proyectos prácticos paso a paso."
      slug="protocolo-i2c"
      datePublished="2026-04-10"
      dateModified="2026-04-10"
    >
      {/* Diagrama I2C */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={i2cImg} alt="Diagrama del bus I2C mostrando maestro Arduino conectado a múltiples dispositivos esclavos via SDA y SCL" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={576} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Bus I2C — un maestro conectado a múltiples esclavos con solo 2 cables (SDA + SCL)</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es el protocolo I2C?</h2>
      <p>
        <strong className="text-foreground">I2C</strong> (Inter-Integrated Circuit, pronunciado "I-cuadrado-C") es un protocolo de comunicación serial síncrono inventado por Philips (ahora NXP) en 1982. Permite conectar <strong className="text-foreground">múltiples dispositivos</strong> usando solo <strong className="text-foreground">2 cables</strong>, lo que lo convierte en uno de los protocolos más populares en electrónica embebida.
      </p>
      <p>
        A diferencia de la comunicación serial UART (que conecta solo 2 dispositivos punto a punto), I2C puede conectar hasta <strong className="text-foreground">128 dispositivos</strong> en el mismo bus con solo 2 líneas de señal, lo cual es ideal cuando necesitas conectar múltiples sensores, pantallas y memorias a un mismo microcontrolador.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Cómo funciona I2C?</h2>
      <p>El bus I2C usa dos líneas de señal:</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">SDA (Serial Data)</strong>: Línea bidireccional de datos. Por aquí viajan los bits de información en ambas direcciones.</li>
        <li><strong className="text-foreground">SCL (Serial Clock)</strong>: Señal de reloj generada por el maestro. Sincroniza la transmisión de datos asegurando que ambos dispositivos lean los bits en el momento correcto.</li>
      </ul>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto my-4">
        <pre className="text-foreground">{`  Bus I2C - Topología Maestro/Esclavo
  ═══════════════════════════════════════════════

       ┌─────────┐  ┌─────────┐  ┌─────────┐
       │ Sensor  │  │ Display │  │ EEPROM  │
       │ (0x48)  │  │ (0x3C)  │  │ (0x50)  │
       └──┬──┬───┘  └──┬──┬───┘  └──┬──┬───┘
          │  │         │  │         │  │
  SDA ════╪══╪═════════╪══╪═════════╪══╪════════ ← Datos
  SCL ════╪══╪═════════╪══╪═════════╪══╪════════ ← Reloj
          │  │         │  │         │  │
       ┌──┴──┴───────────────────────────────┐
       │         Arduino (Maestro)           │
       │         SDA = A4, SCL = A5          │
       └─────────────────────────────────────┘

  Resistencias pull-up (4.7kΩ) en SDA y SCL hacia VCC`}</pre>
      </div>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Roles en I2C</h3>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Maestro (Master)</strong>: Inicia la comunicación, genera la señal de reloj (SCL) y controla cuándo se envían o reciben datos. En la mayoría de proyectos, el Arduino es el maestro.</li>
        <li><strong className="text-foreground">Esclavo (Slave)</strong>: Responde cuando el maestro lo solicita usando su dirección única. Sensores, pantallas y memorias actúan como esclavos.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Direccionamiento I2C</h2>
      <p>
        Cada dispositivo en el bus tiene una <strong className="text-foreground">dirección única de 7 bits</strong> (rango 0x00 a 0x7F). El maestro usa esta dirección para seleccionar con qué esclavo quiere comunicarse. Algunos dispositivos permiten cambiar su dirección mediante pines de configuración (A0, A1, A2).
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Dispositivo</th>
              <th className="px-4 py-2 text-left font-mono">Dirección I2C</th>
              <th className="px-4 py-2 text-left font-mono">Función</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">OLED SSD1306</td>
              <td className="px-4 py-2 font-mono">0x3C o 0x3D</td>
              <td className="px-4 py-2">Display gráfico 128×64</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">BMP280</td>
              <td className="px-4 py-2 font-mono">0x76 o 0x77</td>
              <td className="px-4 py-2">Presión y temperatura</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">MPU6050</td>
              <td className="px-4 py-2 font-mono">0x68 o 0x69</td>
              <td className="px-4 py-2">Acelerómetro + giroscopio</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">DS3231 RTC</td>
              <td className="px-4 py-2 font-mono">0x68</td>
              <td className="px-4 py-2">Reloj en tiempo real</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">AT24C256</td>
              <td className="px-4 py-2 font-mono">0x50-0x57</td>
              <td className="px-4 py-2">EEPROM 256Kbit</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">PCF8574</td>
              <td className="px-4 py-2 font-mono">0x20-0x27</td>
              <td className="px-4 py-2">Expansor de I/O</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">LCD con módulo I2C</td>
              <td className="px-4 py-2 font-mono">0x27 o 0x3F</td>
              <td className="px-4 py-2">Display LCD 16×2 / 20×4</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Trama de comunicación I2C</h2>
      <p>Cada transacción I2C sigue esta secuencia estricta:</p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto my-4">
        <pre className="text-foreground">{`  Trama I2C completa (escritura):
  ═══════════════════════════════════════════════════════════

  START → [Dirección 7 bits] [R/W=0] → ACK → [Dato 8 bits] → ACK → STOP
    │            │               │       │          │           │      │
    │     0x3C = 0111100        Write   Esclavo   Byte de     OK    Fin
    │                                   confirma  datos
  SDA baja
  mientras
  SCL alta

  Ejemplo: Escribir 0x42 al dispositivo 0x3C
  START → 0111100 0 → ACK → 01000010 → ACK → STOP`}</pre>
      </div>
      <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
        <li><strong className="text-foreground">START</strong>: SDA baja mientras SCL está en HIGH (condición de inicio)</li>
        <li><strong className="text-foreground">Dirección + R/W</strong>: 7 bits de dirección + 1 bit indicando lectura (1) o escritura (0)</li>
        <li><strong className="text-foreground">ACK</strong>: El esclavo baja SDA durante un pulso de reloj para confirmar que recibió el byte</li>
        <li><strong className="text-foreground">NACK</strong>: Si SDA se mantiene en HIGH, indica error o fin de transmisión</li>
        <li><strong className="text-foreground">STOP</strong>: SDA sube mientras SCL está en HIGH (condición de parada)</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Resistencias Pull-Up: Por qué son necesarias</h2>
      <p>
        Las líneas SDA y SCL son de <strong className="text-foreground">drenador abierto</strong> (open-drain). Los dispositivos solo pueden forzar la línea a nivel bajo (LOW); para volver a nivel alto necesitan resistencias pull-up hacia VCC:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto my-4">
        <pre className="text-foreground">{`        VCC (3.3V o 5V)
         │         │
        [4.7kΩ]   [4.7kΩ]
         │         │
  SDA ───┤         ├─── SCL
         │         │
      Dispositivos conectados aquí`}</pre>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Velocidad I2C</th>
              <th className="px-4 py-2 text-left font-mono">Frecuencia</th>
              <th className="px-4 py-2 text-left font-mono">Pull-up recomendado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2">Standard Mode</td>
              <td className="px-4 py-2 font-mono">100 kHz</td>
              <td className="px-4 py-2 font-mono">4.7kΩ - 10kΩ</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2">Fast Mode</td>
              <td className="px-4 py-2 font-mono">400 kHz</td>
              <td className="px-4 py-2 font-mono">2.2kΩ - 4.7kΩ</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2">Fast Mode Plus</td>
              <td className="px-4 py-2 font-mono">1 MHz</td>
              <td className="px-4 py-2 font-mono">1kΩ - 2.2kΩ</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm mt-2">
        <strong className="text-foreground">Nota:</strong> Muchos módulos I2C (como las pantallas OLED) ya incluyen resistencias pull-up en su PCB. Si conectas múltiples módulos con pull-ups integradas, el valor total puede ser demasiado bajo. Verifica la hoja de datos de cada módulo.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">I2C en Arduino: La librería Wire.h</h2>
      <p>
        Arduino incluye la librería <span className="font-mono text-primary">Wire.h</span> para comunicación I2C. Los pines varían según el modelo:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Arduino</th>
              <th className="px-4 py-2 text-left font-mono">SDA</th>
              <th className="px-4 py-2 text-left font-mono">SCL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">UNO / Nano</td>
              <td className="px-4 py-2 font-mono">A4</td>
              <td className="px-4 py-2 font-mono">A5</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Mega 2560</td>
              <td className="px-4 py-2 font-mono">Pin 20</td>
              <td className="px-4 py-2 font-mono">Pin 21</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">ESP32</td>
              <td className="px-4 py-2 font-mono">GPIO 21</td>
              <td className="px-4 py-2 font-mono">GPIO 22</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================= PROYECTOS ========================= */}

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">🔬 Proyectos Prácticos con I2C</h2>
        <p className="text-center text-muted-foreground text-sm mb-8">3 proyectos que demuestran el poder de la comunicación I2C</p>
      </div>

      {/* Proyecto 1: Escáner I2C */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">1</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Escáner de dispositivos I2C</h3>
          <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono">Fácil</span>
        </div>
        <p className="mb-3">El primer paso con I2C: detectar qué dispositivos están conectados al bus y sus direcciones. Este sketch es esencial para diagnosticar problemas de conexión.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  Arduino UNO          Dispositivo I2C
  ───────────          ───────────────
  A4 (SDA) ──────────── SDA
  A5 (SCL) ──────────── SCL
  5V       ──────────── VCC
  GND      ──────────── GND
  
  [4.7kΩ pull-up en SDA y SCL hacia 5V]`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`#include <Wire.h>

void setup() {
  Wire.begin();           // Iniciar I2C como maestro
  Serial.begin(9600);
  Serial.println("Escáner I2C - ElectroLab Pro");
  Serial.println("Buscando dispositivos...");
  Serial.println("----------------------------");
}

void loop() {
  int dispositivos = 0;
  
  for (byte dir = 1; dir < 127; dir++) {
    Wire.beginTransmission(dir);
    byte error = Wire.endTransmission();
    
    if (error == 0) {
      Serial.print("Dispositivo encontrado en 0x");
      if (dir < 16) Serial.print("0");
      Serial.print(dir, HEX);
      Serial.print(" (");
      Serial.print(dir);
      Serial.println(" decimal)");
      dispositivos++;
    }
  }
  
  if (dispositivos == 0) {
    Serial.println("No se encontraron dispositivos.");
  } else {
    Serial.print("Total: ");
    Serial.print(dispositivos);
    Serial.println(" dispositivo(s)");
  }
  
  Serial.println("----------------------------");
  delay(5000);  // Escanear cada 5 segundos
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> <span className="font-mono text-primary">Wire.beginTransmission()</span> intenta comunicarse con una dirección. Si <span className="font-mono text-primary">Wire.endTransmission()</span> retorna 0, hay un dispositivo respondiendo. Este sketch es indispensable para depurar conexiones I2C.
        </div>
      </div>

      {/* Proyecto 2: Sensor de temperatura I2C */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">2</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Lectura de temperatura con BMP280 (I2C)</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>
        <p className="mb-3">Lee temperatura y presión atmosférica de un sensor BMP280 usando comunicación I2C directa con registros, sin librerías externas.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Módulo BMP280 (con pull-ups integradas)</li>
          <li>4× Cables jumper</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código simplificado</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`#include <Wire.h>

const byte BMP280_ADDR = 0x76;
const byte REG_ID = 0xD0;
const byte REG_CTRL = 0xF4;
const byte REG_TEMP = 0xFA;

void setup() {
  Wire.begin();
  Serial.begin(9600);
  
  // Verificar chip ID (debe ser 0x58 para BMP280)
  byte chipId = leerRegistro(BMP280_ADDR, REG_ID);
  Serial.print("Chip ID: 0x");
  Serial.println(chipId, HEX);
  
  if (chipId != 0x58) {
    Serial.println("ERROR: BMP280 no detectado!");
    while(1);
  }
  
  // Configurar: temp oversampling x1, modo normal
  escribirRegistro(BMP280_ADDR, REG_CTRL, 0x27);
  Serial.println("BMP280 configurado correctamente");
}

void loop() {
  // Leer 3 bytes de temperatura (registro 0xFA-0xFC)
  Wire.beginTransmission(BMP280_ADDR);
  Wire.write(REG_TEMP);
  Wire.endTransmission();
  Wire.requestFrom(BMP280_ADDR, (byte)3);
  
  long adc_T = 0;
  adc_T = Wire.read();
  adc_T = (adc_T << 8) | Wire.read();
  adc_T = (adc_T << 4) | (Wire.read() >> 4);
  
  Serial.print("ADC Temperatura (raw): ");
  Serial.println(adc_T);
  
  delay(2000);
}

byte leerRegistro(byte addr, byte reg) {
  Wire.beginTransmission(addr);
  Wire.write(reg);
  Wire.endTransmission();
  Wire.requestFrom(addr, (byte)1);
  return Wire.read();
}

void escribirRegistro(byte addr, byte reg, byte valor) {
  Wire.beginTransmission(addr);
  Wire.write(reg);
  Wire.write(valor);
  Wire.endTransmission();
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A comunicarte directamente con registros internos de un sensor vía I2C: <span className="font-mono text-primary">Wire.write(registro)</span> selecciona el registro, <span className="font-mono text-primary">Wire.requestFrom()</span> solicita bytes de respuesta. Esto es la base de toda comunicación I2C de bajo nivel.
        </div>
      </div>

      {/* Proyecto 3: Comunicación entre 2 Arduinos */}
      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">3</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Comunicación entre dos Arduinos por I2C</h3>
          <span className="ml-auto text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-mono">Avanzado</span>
        </div>
        <p className="mb-3">Conecta dos Arduinos donde uno actúa como maestro y otro como esclavo. El maestro envía comandos y el esclavo responde con datos de un sensor.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`  Arduino MAESTRO         Arduino ESCLAVO
  ────────────────         ────────────────
  A4 (SDA) ────────────── A4 (SDA)
  A5 (SCL) ────────────── A5 (SCL)
  GND      ────────────── GND        ← ¡Imprescindible!

  [4.7kΩ pull-up en SDA y SCL hacia 5V]

  El esclavo tiene un sensor LM35 en A0`}</pre>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código del Maestro</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4">
          <pre className="text-foreground">{`// MAESTRO - Solicita datos al esclavo
#include <Wire.h>

const byte ESCLAVO_DIR = 0x08;

void setup() {
  Wire.begin();  // Iniciar como maestro (sin dirección)
  Serial.begin(9600);
  Serial.println("I2C Maestro iniciado");
}

void loop() {
  // Solicitar 2 bytes del esclavo
  Wire.requestFrom(ESCLAVO_DIR, (byte)2);
  
  if (Wire.available() >= 2) {
    byte highByte = Wire.read();
    byte lowByte = Wire.read();
    int temperatura = (highByte << 8) | lowByte;
    
    Serial.print("Temperatura recibida: ");
    Serial.print(temperatura / 10.0, 1);
    Serial.println(" °C");
  } else {
    Serial.println("Error: sin respuesta del esclavo");
  }
  
  delay(2000);
}`}</pre>
        </div>

        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código del Esclavo</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`// ESCLAVO - Responde con datos de temperatura
#include <Wire.h>

const byte MI_DIRECCION = 0x08;
const int sensorPin = A0;
volatile int temperaturaX10 = 0;

void setup() {
  Wire.begin(MI_DIRECCION);  // Iniciar como esclavo
  Wire.onRequest(enviarDatos);
  Serial.begin(9600);
  Serial.print("I2C Esclavo en dirección 0x");
  Serial.println(MI_DIRECCION, HEX);
}

void loop() {
  // Leer sensor continuamente
  int lectura = analogRead(sensorPin);
  float voltaje = lectura * (5.0 / 1023.0);
  float temp = voltaje * 100.0;
  temperaturaX10 = (int)(temp * 10);
  
  Serial.print("Temp local: ");
  Serial.print(temp, 1);
  Serial.println(" °C");
  
  delay(500);
}

// Callback: se ejecuta cuando el maestro solicita datos
void enviarDatos() {
  byte highByte = (temperaturaX10 >> 8) & 0xFF;
  byte lowByte = temperaturaX10 & 0xFF;
  Wire.write(highByte);
  Wire.write(lowByte);
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 ¿Qué aprendiste?</strong> A configurar un Arduino como esclavo con <span className="font-mono text-primary">Wire.begin(dirección)</span>, registrar callbacks con <span className="font-mono text-primary">Wire.onRequest()</span>, y transmitir datos de más de 8 bits dividiéndolos en bytes. ¡Esto es la base de redes de sensores distribuidos!
        </div>
      </div>

      {/* ========================= COMPARATIVA ========================= */}

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-12">I2C vs SPI vs UART: ¿Cuándo usar cada uno?</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Característica</th>
              <th className="px-4 py-2 text-left font-mono">I2C</th>
              <th className="px-4 py-2 text-left font-mono">SPI</th>
              <th className="px-4 py-2 text-left font-mono">UART</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Cables</td>
              <td className="px-4 py-2 font-mono text-primary">2 (SDA, SCL)</td>
              <td className="px-4 py-2 font-mono">4+ (MOSI, MISO, SCK, CS)</td>
              <td className="px-4 py-2 font-mono">2 (TX, RX)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Velocidad máxima</td>
              <td className="px-4 py-2">3.4 Mbps</td>
              <td className="px-4 py-2 font-mono text-primary">~50 Mbps</td>
              <td className="px-4 py-2">~1 Mbps</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Dispositivos</td>
              <td className="px-4 py-2 font-mono text-primary">Hasta 128</td>
              <td className="px-4 py-2">1 por CS</td>
              <td className="px-4 py-2">Solo 2</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Dirección</td>
              <td className="px-4 py-2">Bidireccional (half-duplex)</td>
              <td className="px-4 py-2 font-mono text-primary">Full-duplex</td>
              <td className="px-4 py-2">Full-duplex</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-bold text-foreground">Ideal para</td>
              <td className="px-4 py-2">Sensores, memorias, RTC</td>
              <td className="px-4 py-2">Displays, tarjetas SD</td>
              <td className="px-4 py-2">GPS, Bluetooth, depuración</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========================= TROUBLESHOOTING ========================= */}

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Solución de problemas comunes con I2C</h2>
      <div className="space-y-3">
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ "No se detecta ningún dispositivo"</p>
          <p className="text-sm">Verifica: 1) Que los cables SDA y SCL no estén intercambiados, 2) Que haya conexión GND común, 3) Que el módulo esté alimentado, 4) Que las resistencias pull-up estén presentes (si el módulo no las incluye).</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ "La dirección del dispositivo es diferente"</p>
          <p className="text-sm">Algunos módulos usan direcciones alternativas. Ejecuta el escáner I2C (Proyecto 1) para encontrar la dirección real. Verifica los pines de configuración A0/A1/A2 en la hoja de datos.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ "Datos corruptos o inconsistentes"</p>
          <p className="text-sm">Puede deberse a cables demasiado largos (máximo recomendado: 1 metro), interferencia electromagnética, o valores de pull-up incorrectos. Usa un <Link to="/articulos/osciloscopio" className="text-primary hover:underline">osciloscopio</Link> para verificar las señales SDA y SCL.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ "Conflicto de direcciones"</p>
          <p className="text-sm">Dos dispositivos con la misma dirección causan colisiones. Solución: cambia la dirección de uno usando los pines de configuración, o usa un multiplexor I2C como el TCA9548A.</p>
        </div>
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-bold text-foreground text-sm mb-1">❌ "Mezclar 3.3V y 5V"</p>
          <p className="text-sm">Si conectas un sensor de 3.3V a un Arduino de 5V, puedes dañar el sensor. Usa un conversor de nivel lógico bidireccional para adaptar las tensiones de forma segura.</p>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Recursos y próximos pasos</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Practica con el escáner I2C y conecta diferentes módulos a tu <Link to="/articulos/arduino" className="text-primary hover:underline">Arduino</Link></li>
        <li>Experimenta con displays OLED I2C para mostrar datos de sensores</li>
        <li>Aprende a usar la librería <span className="font-mono text-primary">Adafruit_BMP280</span> para simplificar la lectura del BMP280</li>
        <li>Explora la comunicación SPI como alternativa para dispositivos de alta velocidad</li>
        <li>Usa tu <Link to="/articulos/multimetro" className="text-primary hover:underline">multímetro</Link> para verificar niveles de voltaje en SDA y SCL</li>
        <li>Consulta nuestra guía de <Link to="/articulos/soldadura-electronica" className="text-primary hover:underline">soldadura electrónica</Link> para proyectos permanentes con módulos I2C</li>
      </ul>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🔌 Kit de módulos I2C para Arduino</p>
        <p className="text-muted-foreground text-sm">
          Consigue un pack de sensores y displays I2C compatibles con Arduino para practicar todos los proyectos de esta guía.
        </p>
        <a
          href="https://www.amazon.es/s?k=modulos+i2c+arduino+sensor&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits de I2C en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default ProtocoloI2C;
