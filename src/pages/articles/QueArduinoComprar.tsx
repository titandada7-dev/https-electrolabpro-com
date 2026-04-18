import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart, CheckCircle2, XCircle } from "lucide-react";

const ML_TAG = "as20260324074639";
const ml = (q: string) => `https://listado.mercadolibre.com.ar/${q}#${ML_TAG}`;

const QueArduinoComprar = () => {
  return (
    <ArticleLayout
      title="Cómo Elegir un Arduino: UNO vs Nano vs Mega vs ESP32 (Guía 2025)"
      subtitle="Comparativa completa de las 4 placas Arduino más populares: especificaciones, precios actuales, casos de uso reales y la elección correcta según tu proyecto."
      slug="que-arduino-comprar"
      datePublished="2026-04-18"
      dateModified="2026-04-18"
    >
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué Arduino debería comprar?</h2>
      <p>
        Si estás empezando en electrónica, la primera pregunta inevitable es: <strong className="text-foreground">¿qué placa Arduino me conviene?</strong> La respuesta corta es: <strong className="text-foreground">depende de tu proyecto</strong>. La respuesta larga es esta guía, donde comparamos las 4 placas más vendidas en 2025: <strong className="text-foreground">UNO R3, Nano, Mega 2560 y ESP32</strong>.
      </p>
      <p>
        Cada una tiene fortalezas concretas. Elegir mal te puede costar dinero o, peor, frustrarte y abandonar el hobby. Vamos a evitarlo.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Comparativa rápida</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Característica</th>
              <th className="px-3 py-2 text-left font-mono">UNO R3</th>
              <th className="px-3 py-2 text-left font-mono">Nano</th>
              <th className="px-3 py-2 text-left font-mono">Mega 2560</th>
              <th className="px-3 py-2 text-left font-mono">ESP32</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">MCU</td><td className="px-3 py-2">ATmega328P</td><td className="px-3 py-2">ATmega328P</td><td className="px-3 py-2">ATmega2560</td><td className="px-3 py-2">Xtensa LX6 dual-core</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Velocidad</td><td className="px-3 py-2">16 MHz</td><td className="px-3 py-2">16 MHz</td><td className="px-3 py-2">16 MHz</td><td className="px-3 py-2">240 MHz</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Flash</td><td className="px-3 py-2">32 KB</td><td className="px-3 py-2">32 KB</td><td className="px-3 py-2">256 KB</td><td className="px-3 py-2">4 MB</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">RAM</td><td className="px-3 py-2">2 KB</td><td className="px-3 py-2">2 KB</td><td className="px-3 py-2">8 KB</td><td className="px-3 py-2">520 KB</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Pines digitales</td><td className="px-3 py-2">14</td><td className="px-3 py-2">14</td><td className="px-3 py-2">54</td><td className="px-3 py-2">34</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Pines PWM</td><td className="px-3 py-2">6</td><td className="px-3 py-2">6</td><td className="px-3 py-2">15</td><td className="px-3 py-2">16 (todos)</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Analógicos</td><td className="px-3 py-2">6 (10-bit)</td><td className="px-3 py-2">8 (10-bit)</td><td className="px-3 py-2">16 (10-bit)</td><td className="px-3 py-2">18 (12-bit)</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Voltaje lógico</td><td className="px-3 py-2">5V</td><td className="px-3 py-2">5V</td><td className="px-3 py-2">5V</td><td className="px-3 py-2">3.3V</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">WiFi/Bluetooth</td><td className="px-3 py-2">❌</td><td className="px-3 py-2">❌</td><td className="px-3 py-2">❌</td><td className="px-3 py-2">✅ ambos</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Tamaño</td><td className="px-3 py-2">68×53 mm</td><td className="px-3 py-2">45×18 mm</td><td className="px-3 py-2">102×53 mm</td><td className="px-3 py-2">55×28 mm</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">Precio aprox.</td><td className="px-3 py-2">USD 8-25</td><td className="px-3 py-2">USD 4-12</td><td className="px-3 py-2">USD 15-40</td><td className="px-3 py-2">USD 6-15</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">1. Arduino UNO R3 — El estándar para principiantes</h2>
      <p>
        Es la placa <strong className="text-foreground">más documentada del planeta</strong>. Cualquier tutorial, librería o curso asume que tenés un UNO. Su socket DIP permite reemplazar el microcontrolador si lo quemás (cosa que va a pasar más de una vez).
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <p className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Ideal para</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Aprender desde cero</li>
            <li>Seguir tutoriales y cursos</li>
            <li>Proyectos educativos en aulas</li>
            <li>Prototipos con shields</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
          <p className="font-mono text-sm font-bold text-red-400 flex items-center gap-2 mb-2"><XCircle className="w-4 h-4" /> Evitalo si</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Necesitás WiFi o Bluetooth</li>
            <li>El proyecto debe ser pequeño</li>
            <li>Querés más de 14 pines digitales</li>
          </ul>
        </div>
      </div>
      <a href={ml("arduino-uno-r3")} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
        <ShoppingCart className="w-4 h-4" /> Ver Arduino UNO R3 en Mercado Libre
      </a>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">2. Arduino Nano — Mismo cerebro, formato compacto</h2>
      <p>
        El Nano es básicamente un UNO miniaturizado: mismo <strong className="text-foreground">ATmega328P</strong>, mismo código, mismas librerías. Pero en lugar de pines hembra trae <strong className="text-foreground">pines macho que entran directo en una protoboard</strong>. Eso lo hace insuperable para prototipos y proyectos finales pequeños.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <p className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Ideal para</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Proyectos definitivos compactos</li>
            <li>Wearables y robots pequeños</li>
            <li>Cuando ya sabés lo que estás haciendo</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
          <p className="font-mono text-sm font-bold text-red-400 flex items-center gap-2 mb-2"><XCircle className="w-4 h-4" /> Evitalo si</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Sos absoluto principiante (cuesta más debugear)</li>
            <li>Necesitás conectarle shields estándar</li>
          </ul>
        </div>
      </div>
      <p className="mt-3 text-sm">
        ⚠️ <strong className="text-foreground">Atención al chip USB</strong>: los Nano "originales" usan FTDI o ATmega16U2. Las versiones clon traen <strong className="text-foreground">CH340</strong>, que requieren instalar un driver adicional en Windows pero funcionan perfecto.
      </p>
      <a href={ml("arduino-nano")} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
        <ShoppingCart className="w-4 h-4" /> Ver Arduino Nano en Mercado Libre
      </a>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">3. Arduino Mega 2560 — Para proyectos grandes</h2>
      <p>
        Cuando un UNO se queda corto en <strong className="text-foreground">pines, memoria o periféricos serie</strong>, el Mega es la respuesta. Con 54 pines digitales, 4 puertos UART y 256 KB de Flash, soporta proyectos como <strong className="text-foreground">impresoras 3D (Marlin), CNCs, brazos robóticos o secuenciadores MIDI</strong>.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <p className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Ideal para</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Impresoras 3D y CNC</li>
            <li>Más de 10 sensores/actuadores</li>
            <li>Programas grandes (&gt;30 KB)</li>
            <li>Múltiples periféricos serie simultáneos</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
          <p className="font-mono text-sm font-bold text-red-400 flex items-center gap-2 mb-2"><XCircle className="w-4 h-4" /> Evitalo si</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>El proyecto cabe en un UNO (gastás de más)</li>
            <li>Necesitás conectividad inalámbrica</li>
          </ul>
        </div>
      </div>
      <a href={ml("arduino-mega-2560")} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
        <ShoppingCart className="w-4 h-4" /> Ver Arduino Mega 2560 en Mercado Libre
      </a>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">4. ESP32 — La bestia para IoT</h2>
      <p>
        Técnicamente <strong className="text-foreground">no es un Arduino</strong>, pero es 100% compatible con el IDE de Arduino. Por menos plata que un UNO original te llevás un procesador <strong className="text-foreground">15× más rápido, 250× más RAM, WiFi y Bluetooth integrados</strong>. Es la elección moderna para cualquier proyecto conectado a internet.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <p className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4" /> Ideal para</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>IoT (sensores enviando datos a la nube)</li>
            <li>Domótica y control por app</li>
            <li>Proyectos con cámaras (versión ESP32-CAM)</li>
            <li>Procesamiento intensivo (audio, ML)</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
          <p className="font-mono text-sm font-bold text-red-400 flex items-center gap-2 mb-2"><XCircle className="w-4 h-4" /> Evitalo si</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Trabajás con sensores/módulos 5V (su lógica es 3.3V)</li>
            <li>Recién empezás (curva más empinada)</li>
          </ul>
        </div>
      </div>
      <p className="mt-3 text-sm">
        ⚠️ <strong className="text-foreground">Cuidado con los voltajes</strong>: el ESP32 trabaja a 3.3V. Conectarle 5V directamente a un GPIO puede dañarlo. Para sensores de 5V usá un <strong className="text-foreground">level shifter</strong> o divisores de tensión.
      </p>
      <a href={ml("esp32-devkit")} target="_blank" rel="noopener noreferrer nofollow" className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90">
        <ShoppingCart className="w-4 h-4" /> Ver ESP32 DevKit en Mercado Libre
      </a>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Decisión rápida según tu caso</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Tu situación</th>
              <th className="px-3 py-2 text-left font-mono">Compra</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2">Estoy empezando, quiero seguir tutoriales</td><td className="px-3 py-2 font-mono text-primary">UNO R3</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Sé lo básico, quiero un proyecto pequeño</td><td className="px-3 py-2 font-mono text-primary">Nano</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Voy a armar una impresora 3D / CNC</td><td className="px-3 py-2 font-mono text-primary">Mega 2560</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Quiero domótica / app móvil / cloud</td><td className="px-3 py-2 font-mono text-primary">ESP32</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Estación meteorológica que sube datos a internet</td><td className="px-3 py-2 font-mono text-primary">ESP32</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Robot seguidor de línea sencillo</td><td className="px-3 py-2 font-mono text-primary">UNO o Nano</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Original vs clon: ¿conviene?</h2>
      <p>
        Las placas <strong className="text-foreground">clon (genéricas)</strong> cuestan entre 3 y 5 veces menos. Para aprender y prototipar son perfectas. Las originales (made in Italy) tienen mejor calidad de soldadura, mejor regulador de voltaje y soportan mejor el manoseo. Recomendación: <strong className="text-foreground">empezá con clones, pasate a originales cuando un proyecto sea para producción</strong>.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Preguntas frecuentes</h2>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿El código de UNO funciona en Nano?</summary>
        <p className="mt-2 text-sm">Sí, son binariamente compatibles. Solo cambiás el modelo en <span className="font-mono text-primary">Herramientas → Placa</span>.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Puedo usar un sensor 5V en ESP32?</summary>
        <p className="mt-2 text-sm">Sí, pero necesitás un level shifter o divisor de tensión. Conectarlo directo puede quemar el GPIO del ESP32.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Cuál tiene mejor resolución analógica?</summary>
        <p className="mt-2 text-sm">El ESP32 con 12 bits (0-4095). Los demás Arduino tienen 10 bits (0-1023). 4× más resolución para mediciones precisas.</p>
      </details>
      <details className="rounded-lg border border-border bg-card/50 p-4">
        <summary className="font-semibold text-foreground cursor-pointer">¿Necesito comprar un kit completo?</summary>
        <p className="mt-2 text-sm">Si recién empezás, sí. Un kit con protoboard, cables, LEDs, resistencias y sensores básicos te ahorra tiempo y plata. Si ya tenés componentes sueltos, solo la placa.</p>
      </details>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión</h2>
      <p>
        No existe "el mejor Arduino", existe <strong className="text-foreground">el correcto para tu proyecto</strong>. Si dudás, comprá un <strong className="text-foreground">UNO R3</strong> y empezá con los <Link to="/articulos/arduino" className="text-primary hover:underline">proyectos básicos</Link>. Una vez que entiendas <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline">la Ley de Ohm</Link>, los <Link to="/articulos/sensores-arduino" className="text-primary hover:underline">sensores</Link> y el <Link to="/articulos/protocolo-i2c" className="text-primary hover:underline">protocolo I2C</Link>, sabrás exactamente cuándo dar el salto al ESP32 o al Mega.
      </p>
      <p>
        Y recordá: en electrónica, <strong className="text-foreground">aprendés más quemando una placa que leyendo diez tutoriales</strong>. Comprá, experimentá y rompé cosas con responsabilidad.
      </p>
    </ArticleLayout>
  );
};

export default QueArduinoComprar;
