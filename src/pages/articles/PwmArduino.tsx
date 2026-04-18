import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";

const PwmArduino = () => {
  return (
    <ArticleLayout
      title="PWM Explicado: Cómo Controlar Motores y LEDs con Arduino"
      subtitle="Guía completa de PWM (Pulse Width Modulation): teoría, función analogWrite(), 3 ejemplos prácticos con código y diagramas para dimmers, servos y motores DC."
      slug="pwm-arduino"
      datePublished="2026-04-18"
      dateModified="2026-04-18"
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es PWM?</h2>
      <p>
        <strong className="text-foreground">PWM (Pulse Width Modulation o Modulación por Ancho de Pulso)</strong> es una técnica para <strong className="text-foreground">simular un voltaje analógico variable usando solo señales digitales</strong> (encendido/apagado). En lugar de entregar 2.5V "reales", el Arduino enciende y apaga el pin a alta velocidad, durante mitad del tiempo cada estado. El resultado promedio es 2.5V.
      </p>
      <p>
        Es la forma <strong className="text-foreground">más eficiente</strong> de controlar el brillo de un LED, la velocidad de un motor o la posición de un servo, sin disipar energía como calor en una resistencia.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">El concepto clave: Duty Cycle</h2>
      <p>
        El <strong className="text-foreground">duty cycle (ciclo de trabajo)</strong> es el porcentaje del tiempo que la señal está en HIGH dentro de un período. En Arduino se expresa como un número entre 0 y 255:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">0</strong> → 0% encendido → 0V promedio (LED apagado, motor parado)</li>
        <li><strong className="text-foreground">64</strong> → 25% encendido → ~1.25V promedio</li>
        <li><strong className="text-foreground">128</strong> → 50% encendido → ~2.5V promedio</li>
        <li><strong className="text-foreground">191</strong> → 75% encendido → ~3.75V promedio</li>
        <li><strong className="text-foreground">255</strong> → 100% encendido → 5V (LED al máximo)</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Diagrama de las señales PWM</h2>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto">
        <pre className="text-foreground">{`Duty 25%   ▔▔▁▁▁▁▔▔▁▁▁▁▔▔▁▁▁▁▔▔▁▁▁▁▔▔▁▁▁▁    Promedio: 1.25V

Duty 50%   ▔▔▔▔▁▁▁▁▔▔▔▔▁▁▁▁▔▔▔▔▁▁▁▁▔▔▔▔▁▁    Promedio: 2.50V

Duty 75%   ▔▔▔▔▔▔▁▁▔▔▔▔▔▔▁▁▔▔▔▔▔▔▁▁▔▔▔▔▔▔    Promedio: 3.75V

Duty 100%  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔    Promedio: 5.00V

           ↑ Período fijo: ~2 ms (490 Hz en Arduino UNO) ↑`}</pre>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Figura: Tres ejemplos de señales PWM con distinto duty cycle</p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Frecuencia PWM en Arduino</h2>
      <p>
        En el <strong className="text-foreground">Arduino UNO</strong>, los pines PWM funcionan a:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Pines 5 y 6</strong> → 980 Hz</li>
        <li><strong className="text-foreground">Pines 3, 9, 10 y 11</strong> → 490 Hz</li>
      </ul>
      <p>
        Los pines PWM están marcados con el símbolo <span className="font-mono text-primary">~</span> en la placa. <strong className="text-foreground">Importante</strong>: cualquier pin digital puede generar PWM por software (con <span className="font-mono text-primary">tone()</span> o <span className="font-mono text-primary">SoftPWM</span>), pero los hardware PWM son siempre más estables.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">La función analogWrite()</h2>
      <p>
        Toda la magia ocurre con una sola función:
      </p>
      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-foreground">{`analogWrite(pin, valor);
//          │     │
//          │     └── 0 a 255 (duty cycle)
//          └──────── pin con símbolo ~ (3, 5, 6, 9, 10, 11)`}</pre>
      </div>
      <p>
        <strong className="text-foreground">No necesitás llamar a pinMode()</strong> antes de <span className="font-mono text-primary">analogWrite()</span>; la función configura el pin como salida automáticamente.
      </p>

      {/* ============== EJEMPLO 1 ============== */}
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-2">🔬 3 Ejemplos Prácticos</h2>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">1</span>
          <h3 className="text-lg font-mono font-bold text-foreground">LED Dimmer (efecto fade)</h3>
          <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono">Fácil</span>
        </div>
        <p className="mb-3">El clásico "respirar" de un LED. Aumenta el brillo gradualmente y luego lo disminuye.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× LED</li>
          <li>1× Resistencia de 220Ω</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`Arduino Pin 9 (~) ──── [220Ω] ──── Ánodo (+) LED ──── Cátodo (-) ──── GND`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int ledPin = 9;

void setup() {
  // No hace falta pinMode con analogWrite
}

void loop() {
  // Subir brillo de 0 a 255
  for (int brillo = 0; brillo <= 255; brillo++) {
    analogWrite(ledPin, brillo);
    delay(10);
  }
  // Bajar brillo de 255 a 0
  for (int brillo = 255; brillo >= 0; brillo--) {
    analogWrite(ledPin, brillo);
    delay(10);
  }
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 Tip</strong>: el ojo humano percibe el brillo de forma <strong className="text-foreground">logarítmica</strong>, no lineal. Para un fade más suave y "natural" usá <span className="font-mono text-primary">analogWrite(pin, brillo*brillo/255);</span>.
        </div>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">2</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Control de velocidad de motor DC</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>
        <p className="mb-3">Controlamos un motor de corriente continua con un transistor MOSFET. ⚠️ <strong className="text-foreground">Nunca conectes un motor directo al pin de Arduino</strong>: lo quemarías al instante por la corriente.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Motor DC (5-12V)</li>
          <li>1× MOSFET IRF540N (o transistor TIP120)</li>
          <li>1× Diodo 1N4007 (de protección flyback)</li>
          <li>1× Resistencia de 220Ω (gate)</li>
          <li>1× Potenciómetro de 10kΩ</li>
          <li>Fuente externa 9V</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`              +9V externos
                  │
              [Motor]
                  │
                  ├──── Diodo 1N4007 (cátodo arriba) ── al +9V
                  │
        Drain ────┤
                  │ MOSFET IRF540N
Pin 9 ── 220Ω ── Gate
                  │
        Source ───┤
                  │
                 GND ───── GND Arduino (común)

Potenciómetro: pin central → A0, extremos → 5V y GND`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`const int motorPin = 9;
const int potPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int valorPot = analogRead(potPin);    // 0 - 1023
  int velocidad = map(valorPot, 0, 1023, 0, 255);
  analogWrite(motorPin, velocidad);

  Serial.print("Velocidad PWM: ");
  Serial.println(velocidad);
  delay(50);
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">⚠️ Crítico</strong>: el diodo flyback en paralelo al motor protege al MOSFET de los picos inductivos cuando el motor se apaga. Sin él, el transistor se quema en minutos. Más detalles en nuestra <Link to="/articulos/transistores" className="text-primary hover:underline">guía de transistores</Link>.
        </div>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono font-bold text-sm">3</span>
          <h3 className="text-lg font-mono font-bold text-foreground">Servo motor con la librería Servo</h3>
          <span className="ml-auto text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-mono">Intermedio</span>
        </div>
        <p className="mb-3">Los servos usan PWM con un período fijo de 20 ms y pulsos entre 1 ms (0°) y 2 ms (180°). La librería <span className="font-mono text-primary">Servo.h</span> simplifica todo.</p>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Materiales</h4>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>1× Arduino UNO</li>
          <li>1× Servo SG90 (o MG996R para mayor torque)</li>
          <li>Fuente 5V externa si el servo consume mucho</li>
        </ul>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Conexión</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-3">
          <pre className="text-foreground">{`Servo SG90:
  Cable Rojo    ── 5V
  Cable Marrón  ── GND
  Cable Naranja ── Pin 9 (Arduino)`}</pre>
        </div>
        <h4 className="text-sm font-mono font-semibold text-foreground mt-4 mb-2">Código</h4>
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground">{`#include <Servo.h>

Servo miServo;

void setup() {
  miServo.attach(9);  // pin de señal
}

void loop() {
  for (int angulo = 0; angulo <= 180; angulo++) {
    miServo.write(angulo);
    delay(15);
  }
  for (int angulo = 180; angulo >= 0; angulo--) {
    miServo.write(angulo);
    delay(15);
  }
}`}</pre>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <strong className="text-foreground">💡 Importante</strong>: los servos consumen pulsos de corriente altos al moverse. Si conectás más de 2 servos al pin 5V de Arduino, podés <strong className="text-foreground">resetear la placa</strong>. Usá una <Link to="/articulos/fuentes-de-alimentacion" className="text-primary hover:underline">fuente externa 5V/2A</Link> con masa común.
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Errores comunes con PWM</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Usar un pin sin <span className="font-mono text-primary">~</span></strong>: solo los pines 3, 5, 6, 9, 10 y 11 tienen PWM por hardware en UNO.</li>
        <li><strong className="text-foreground">Pasarse de 255</strong>: <span className="font-mono text-primary">analogWrite(pin, 1000)</span> no rompe nada, pero queda fijo en 255 (saturación).</li>
        <li><strong className="text-foreground">PWM en pin 13 con LED integrado</strong>: el pin 13 no tiene PWM hardware, vas a ver el LED encendido fijo.</li>
        <li><strong className="text-foreground">Frecuencia audible en motores</strong>: 490 Hz produce un zumbido molesto en motores DC. Cambiá la frecuencia con registros del timer si te molesta.</li>
        <li><strong className="text-foreground">Conflicto con la librería Tone()</strong>: <span className="font-mono text-primary">tone()</span> usa el Timer 2, que afecta al PWM de los pines 3 y 11.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Preguntas frecuentes</h2>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿PWM entrega un voltaje analógico real?</summary>
        <p className="mt-2 text-sm">No. Entrega pulsos digitales de 0V/5V. Lo que percibís como "voltaje promedio" es el efecto físico (térmico/inercial). Si necesitás voltaje analógico real usá un DAC externo (MCP4725) o un filtro RC pasa-bajos.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Puedo controlar un LED RGB con PWM?</summary>
        <p className="mt-2 text-sm">Sí. Cada color (R, G, B) va a un pin PWM diferente con su propia resistencia. Mezclando los 3 duty cycles obtenés 16.7 millones de colores.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Cuánta corriente puede entregar un pin PWM?</summary>
        <p className="mt-2 text-sm">Máximo 20 mA por pin (40 mA absoluto). Para motores, relés o tiras LED necesitás un transistor o MOSFET intermedio. Calculá la resistencia necesaria con nuestra <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline">guía de Ley de Ohm</Link>.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿En ESP32 cómo funciona el PWM?</summary>
        <p className="mt-2 text-sm">El ESP32 usa el módulo LEDC: <span className="font-mono text-primary">ledcSetup()</span>, <span className="font-mono text-primary">ledcAttachPin()</span> y <span className="font-mono text-primary">ledcWrite()</span>. Permite resoluciones de hasta 16 bits y frecuencias hasta 40 MHz.</p>
      </details>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión</h2>
      <p>
        PWM es la <strong className="text-foreground">herramienta más versátil de Arduino</strong>: con una sola línea de código controlás brillo, velocidad, posición, temperatura o cualquier variable que dependa de un voltaje promedio. Combinada con un transistor para amplificar corriente, podés manejar desde un LED hasta una bomba de agua.
      </p>
      <p>
        Para profundizar, leé nuestra <Link to="/articulos/arduino" className="text-primary hover:underline">guía completa de Arduino</Link>, los <Link to="/articulos/sensores-arduino" className="text-primary hover:underline">sensores compatibles</Link> y la <Link to="/articulos/transistores" className="text-primary hover:underline">guía de transistores</Link> para entender cómo amplificar la salida PWM con seguridad.
      </p>
    </ArticleLayout>
  );
};

export default PwmArduino;
