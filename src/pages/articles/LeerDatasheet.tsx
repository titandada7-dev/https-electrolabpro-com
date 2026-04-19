import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { FileText, Search, Zap, Thermometer, Cpu, AlertTriangle, BookOpen } from "lucide-react";

const LeerDatasheet = () => {
  return (
    <ArticleLayout
      title="Cómo Leer un Datasheet de Componentes Electrónicos: Guía Práctica"
      subtitle="Aprende a interpretar datasheets paso a paso con ejemplos reales del LM358 (amplificador operacional) y NE555 (timer). Encontrá pinout, ratings absolutos, características eléctricas y más."
      slug="leer-datasheet"
      datePublished="2026-04-19"
      dateModified="2026-04-19"
      faqs={[
        {
          question: "¿Dónde descargo datasheets gratis y oficiales?",
          answer: "Directamente del fabricante: ti.com (Texas Instruments), onsemi.com, st.com (STMicroelectronics), microchip.com. Como buscador agregador funciona muy bien alldatasheet.com y octopart.com.",
        },
        {
          question: "¿Qué significa 'TBD' en un datasheet?",
          answer: "'To Be Determined' — el fabricante todavía no caracterizó ese parámetro. Suele aparecer en datasheets preliminares. Si vas a producción, buscá la versión final del documento.",
        },
        {
          question: "¿Por qué los datasheets están siempre en inglés?",
          answer: "Es el idioma estándar de la industria electrónica. Los fabricantes solo traducen los datasheets de productos masivos para mercados estratégicos (China, Japón). Aprender el vocabulario técnico básico (voltage, current, gain, supply, output) te abre el 99% de los componentes del mundo.",
        },
        {
          question: "¿Cuál es la diferencia entre LM358N, LM358P y LM358D?",
          answer: "Las letras finales indican el encapsulado: N = PDIP-8 (through-hole), P = PDIP-8 también (variante de TI), D = SOIC-8 (SMD). Funcionalmente son el mismo chip.",
        },
        {
          question: "¿El NE555 y el LM555 son lo mismo?",
          answer: "Sí, son funcionalmente equivalentes. NE es el prefijo original de Signetics (luego Philips/NXP), LM es de National Semiconductor (hoy Texas Instruments). Ambos siguen el mismo pinout y fórmulas.",
        },
        {
          question: "¿Qué hago si el datasheet no incluye un parámetro que necesito?",
          answer: "Buscá el 'Application Note' (AN) del fabricante para esa familia de chips. Suelen tener mediciones, gráficos y casos de uso que no entran en el datasheet. Si no, preguntá en foros como EEVblog o el subreddit r/AskElectronics.",
        },
      ]}
    >
      {/* ============ INTRODUCCIÓN ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es un datasheet y por qué leerlo?</h2>
      <p>
        Un <strong className="text-foreground">datasheet</strong> (hoja de datos) es el documento técnico oficial publicado por el fabricante de un componente electrónico. Contiene <strong className="text-foreground">toda la información necesaria</strong> para usar ese chip de forma correcta y segura: voltajes máximos, corrientes, frecuencias, conexiones de pines, comportamiento térmico, ejemplos de circuitos típicos y más.
      </p>
      <p>
        Aprender a leer un datasheet es una habilidad <strong className="text-foreground">fundamental</strong> para cualquier persona que trabaje con electrónica. Sin esta habilidad, vas a depender de tutoriales y vas a quemar componentes por desconocer un parámetro crítico. Con ella, podés usar <em>cualquier</em> chip que exista, incluso los más exóticos.
      </p>

      <div className="my-6 p-5 rounded-xl border border-primary/30 bg-primary/5">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-foreground mb-1">Dato clave</p>
            <p className="text-sm m-0">
              Los datasheets se descargan gratis de los sitios oficiales de los fabricantes (Texas Instruments, ON Semiconductor, STMicroelectronics, Microchip) o de buscadores especializados como <a href="https://www.alldatasheet.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">alldatasheet.com</a> y <a href="https://www.octopart.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">octopart.com</a>.
            </p>
          </div>
        </div>
      </div>

      {/* ============ ESTRUCTURA TÍPICA ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Estructura típica de un datasheet</h2>
      <p>
        Casi todos los datasheets siguen una <strong className="text-foreground">estructura estándar</strong>. Aprender estas secciones te permite navegar cualquier hoja de datos en segundos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          { num: "1", title: "Features (Características)", desc: "Resumen comercial: las 5-10 cosas más vendibles del chip. Útil para descartar rápido." },
          { num: "2", title: "Description", desc: "Párrafo técnico que explica qué hace el chip y para qué se diseñó." },
          { num: "3", title: "Pinout / Pin Configuration", desc: "Diagrama con la numeración y nombre de cada patilla. ⚠️ Crítico." },
          { num: "4", title: "Absolute Maximum Ratings", desc: "Valores que NUNCA debes superar. Si los pasas, el chip se daña." },
          { num: "5", title: "Recommended Operating Conditions", desc: "Rango ideal de trabajo. Diseñá tu circuito dentro de estos valores." },
          { num: "6", title: "Electrical Characteristics", desc: "Tabla con voltajes, corrientes y tiempos típicos, mínimos y máximos." },
          { num: "7", title: "Typical Application Circuits", desc: "Ejemplos de circuitos listos para copiar. ¡Tu mejor amigo!" },
          { num: "8", title: "Package / Mechanical Drawing", desc: "Dimensiones físicas del encapsulado (DIP-8, SOIC-8, etc.)." },
        ].map((item) => (
          <div key={item.num} className="rounded-xl border border-border bg-card p-4 flex gap-3">
            <span className="font-mono font-bold text-primary text-lg shrink-0">{item.num}</span>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
              <p className="text-xs m-0">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ============ EJEMPLO 1: LM358 ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 flex items-center gap-2">
        <Cpu className="w-6 h-6 text-primary" /> Ejemplo 1: Datasheet del LM358 (Amplificador Operacional)
      </h2>
      <p>
        El <strong className="text-foreground">LM358</strong> es un <strong className="text-foreground">amplificador operacional dual</strong> de bajo consumo, uno de los más populares del mundo. Lo vas a encontrar en sensores, filtros, comparadores y miles de aplicaciones. Vamos a leer su datasheet sección por sección.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">📌 Pinout del LM358 (DIP-8)</h3>
      <p>El LM358 trae <strong className="text-foreground">dos op-amps dentro del mismo chip</strong> de 8 pines:</p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Pin</th>
              <th className="px-3 py-2 text-left font-mono">Nombre</th>
              <th className="px-3 py-2 text-left font-mono">Función</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">1</td><td className="px-3 py-2 font-mono">OUT 1</td><td className="px-3 py-2">Salida del op-amp A</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">2</td><td className="px-3 py-2 font-mono">IN 1−</td><td className="px-3 py-2">Entrada inversora del A</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">3</td><td className="px-3 py-2 font-mono">IN 1+</td><td className="px-3 py-2">Entrada no inversora del A</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">4</td><td className="px-3 py-2 font-mono">GND / V−</td><td className="px-3 py-2">Tierra o alimentación negativa</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">5</td><td className="px-3 py-2 font-mono">IN 2+</td><td className="px-3 py-2">Entrada no inversora del B</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">6</td><td className="px-3 py-2 font-mono">IN 2−</td><td className="px-3 py-2">Entrada inversora del B</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">7</td><td className="px-3 py-2 font-mono">OUT 2</td><td className="px-3 py-2">Salida del op-amp B</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">8</td><td className="px-3 py-2 font-mono">VCC / V+</td><td className="px-3 py-2">Alimentación positiva</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" /> Absolute Maximum Ratings (no superar)
      </h3>
      <ul>
        <li><strong className="text-foreground">Supply Voltage:</strong> 32V (single supply) o ±16V (dual). Pasarte = chip muerto.</li>
        <li><strong className="text-foreground">Differential Input Voltage:</strong> 32V máximo entre las entradas.</li>
        <li><strong className="text-foreground">Input Voltage Range:</strong> de −0.3V hasta +32V respecto a GND.</li>
        <li><strong className="text-foreground">Output Short-Circuit to GND:</strong> permitido continuamente (es seguro cortocircuitar la salida).</li>
        <li><strong className="text-foreground">Operating Temperature:</strong> 0°C a 70°C (versión comercial).</li>
      </ul>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">⚡ Electrical Characteristics (los datos que importan)</h3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Parámetro</th>
              <th className="px-3 py-2 text-left font-mono">Símbolo</th>
              <th className="px-3 py-2 text-left font-mono">Típico</th>
              <th className="px-3 py-2 text-left font-mono">Significado práctico</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2">Voltaje de offset</td><td className="px-3 py-2 font-mono">Vio</td><td className="px-3 py-2">2 mV</td><td className="px-3 py-2">Pequeño error en cero. Para precisión usá op-amps "precision".</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Corriente de bias</td><td className="px-3 py-2 font-mono">Iib</td><td className="px-3 py-2">45 nA</td><td className="px-3 py-2">Corriente que entra/sale por las entradas. Bajísima.</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Ganancia abierta</td><td className="px-3 py-2 font-mono">Avo</td><td className="px-3 py-2">100 dB</td><td className="px-3 py-2">100,000 veces sin realimentación. Enorme.</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Slew rate</td><td className="px-3 py-2 font-mono">SR</td><td className="px-3 py-2">0.3 V/μs</td><td className="px-3 py-2">⚠️ LENTO. No sirve para audio de alta calidad ni señales rápidas.</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">GBW</td><td className="px-3 py-2 font-mono">GBW</td><td className="px-3 py-2">1.1 MHz</td><td className="px-3 py-2">Producto ganancia × ancho de banda. A ganancia 100x = 11 kHz útiles.</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Corriente de salida</td><td className="px-3 py-2 font-mono">Isc</td><td className="px-3 py-2">40 mA</td><td className="px-3 py-2">No conectes cargas que pidan más.</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2">Consumo total</td><td className="px-3 py-2 font-mono">Iq</td><td className="px-3 py-2">0.7 mA</td><td className="px-3 py-2">Bajísimo. Ideal para batería.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="my-6 p-5 rounded-xl border border-amber-500/30 bg-amber-500/5">
        <div className="flex items-start gap-3">
          <Search className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-foreground mb-1">Cómo interpretar el "Slew Rate"</p>
            <p className="text-sm m-0">
              Slew rate de 0.3 V/μs significa que la salida sólo puede subir/bajar 0.3 voltios por microsegundo. Si querés amplificar una señal de audio que va de 0 a 5V a 20 kHz (período 50 μs, mitad subiendo), necesitás 5V en 25 μs = 0.2 V/μs. <strong className="text-foreground">Está al límite</strong>. Para audio HiFi o señales más rápidas usá un <strong className="text-foreground">TL072</strong> (13 V/μs).
            </p>
          </div>
        </div>
      </div>

      {/* ============ EJEMPLO 2: NE555 ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 flex items-center gap-2">
        <Zap className="w-6 h-6 text-primary" /> Ejemplo 2: Datasheet del NE555 (Timer)
      </h2>
      <p>
        El <strong className="text-foreground">NE555</strong> es probablemente el circuito integrado más vendido de la historia (más de 1.000 millones de unidades por año). Es un timer versátil que puede generar pulsos, oscilaciones y retardos. Su datasheet es el ejemplo perfecto para aprender a leer <strong className="text-foreground">fórmulas y ecuaciones</strong>.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">📌 Pinout del NE555 (DIP-8)</h3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-3 py-2 text-left font-mono">Pin</th>
              <th className="px-3 py-2 text-left font-mono">Nombre</th>
              <th className="px-3 py-2 text-left font-mono">Función</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">1</td><td className="px-3 py-2 font-mono">GND</td><td className="px-3 py-2">Tierra (0V)</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">2</td><td className="px-3 py-2 font-mono">TRIG</td><td className="px-3 py-2">Disparo: pulso bajo inicia el ciclo</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">3</td><td className="px-3 py-2 font-mono">OUT</td><td className="px-3 py-2">Salida (HIGH durante el período)</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">4</td><td className="px-3 py-2 font-mono">RESET</td><td className="px-3 py-2">Activo bajo. Conectar a Vcc si no se usa.</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">5</td><td className="px-3 py-2 font-mono">CTRL</td><td className="px-3 py-2">Control de voltaje. Capacitor 10nF a GND.</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">6</td><td className="px-3 py-2 font-mono">THRES</td><td className="px-3 py-2">Umbral: corta el ciclo cuando llega a 2/3 Vcc</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">7</td><td className="px-3 py-2 font-mono">DISCH</td><td className="px-3 py-2">Descarga del condensador externo</td></tr>
            <tr className="border-t border-border"><td className="px-3 py-2 font-mono text-primary">8</td><td className="px-3 py-2 font-mono">VCC</td><td className="px-3 py-2">Alimentación (+4.5V a +16V)</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6">🧮 Las fórmulas que vienen en el datasheet</h3>
      <p>
        En el modo <strong className="text-foreground">astable</strong> (oscilador), el datasheet del NE555 trae directamente las fórmulas para calcular la frecuencia y el duty cycle:
      </p>

      <div className="my-4 p-5 rounded-xl border border-border bg-card font-mono text-sm space-y-2">
        <p className="text-primary">// Tiempo en HIGH</p>
        <p className="text-foreground">t_H = 0.693 × (R1 + R2) × C1</p>
        <p className="text-primary mt-3">// Tiempo en LOW</p>
        <p className="text-foreground">t_L = 0.693 × R2 × C1</p>
        <p className="text-primary mt-3">// Frecuencia de oscilación</p>
        <p className="text-foreground">f = 1.44 / ((R1 + 2·R2) × C1)</p>
        <p className="text-primary mt-3">// Duty cycle</p>
        <p className="text-foreground">D = (R1 + R2) / (R1 + 2·R2)</p>
      </div>

      <p>
        <strong className="text-foreground">Ejemplo práctico:</strong> con R1 = 1 kΩ, R2 = 10 kΩ y C1 = 10 μF:
      </p>
      <ul>
        <li>f = 1.44 / ((1 000 + 20 000) × 0.00001) = <strong className="text-foreground">6.86 Hz</strong></li>
        <li>Duty cycle = (1 + 10) / (1 + 20) = <strong className="text-foreground">52.4%</strong></li>
      </ul>

      <p className="text-sm text-muted-foreground/70 italic">
        ¿Querés evitar hacer las cuentas a mano? Usá nuestra <Link to="/#calculadora" className="text-primary hover:underline">calculadora 555 timer</Link> que aplica estas fórmulas automáticamente.
      </p>

      <h3 className="text-lg font-mono font-bold text-foreground mt-6 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" /> Absolute Maximum Ratings del NE555
      </h3>
      <ul>
        <li><strong className="text-foreground">Vcc máximo:</strong> 18V (versión NE), 16V (SE).</li>
        <li><strong className="text-foreground">Corriente de salida:</strong> ±200 mA (puede manejar LEDs y relés pequeños directamente).</li>
        <li><strong className="text-foreground">Disipación de potencia:</strong> 600 mW a 25°C.</li>
        <li><strong className="text-foreground">Temperatura de junta:</strong> 150°C máximo.</li>
      </ul>

      {/* ============ CHECKLIST ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 flex items-center gap-2">
        <Thermometer className="w-6 h-6 text-primary" /> Checklist rápido al leer un datasheet
      </h2>
      <p>Cuando estás evaluando si un componente sirve para tu proyecto, revisá <strong className="text-foreground">en este orden</strong>:</p>

      <ol className="space-y-2">
        <li>✅ <strong className="text-foreground">Voltaje de alimentación</strong>: ¿coincide con tu fuente (3.3V, 5V, 12V)?</li>
        <li>✅ <strong className="text-foreground">Corriente máxima</strong>: ¿soporta la carga que vas a conectar?</li>
        <li>✅ <strong className="text-foreground">Pinout</strong>: ¿el encapsulado entra en tu PCB o protoboard?</li>
        <li>✅ <strong className="text-foreground">Frecuencia/velocidad</strong>: ¿es suficientemente rápido (slew rate, GBW, propagation delay)?</li>
        <li>✅ <strong className="text-foreground">Temperatura</strong>: ¿el rango operativo cubre tu ambiente?</li>
        <li>✅ <strong className="text-foreground">Typical Application</strong>: ¿hay un circuito de ejemplo cercano a lo que necesitás?</li>
        <li>✅ <strong className="text-foreground">Disponibilidad</strong>: ¿lo conseguís fácil en tu país?</li>
      </ol>

      {/* ============ ERRORES COMUNES ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10">Errores comunes al interpretar datasheets</h2>
      <div className="space-y-3">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="font-semibold text-foreground text-sm m-0">❌ Confundir "Typical" con "Maximum"</p>
          <p className="text-sm text-muted-foreground m-0 mt-1">El valor típico es a 25°C en condiciones ideales. Diseñá siempre con el peor caso (worst case).</p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="font-semibold text-foreground text-sm m-0">❌ Ignorar el package (encapsulado)</p>
          <p className="text-sm text-muted-foreground m-0 mt-1">El mismo chip puede venir en DIP-8 (through-hole), SOIC-8 (SMD) o MSOP-8 (mini SMD). Verificá compatibilidad con tu PCB.</p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="font-semibold text-foreground text-sm m-0">❌ No leer las "Notes" debajo de las tablas</p>
          <p className="text-sm text-muted-foreground m-0 mt-1">Las notas chiquitas suelen aclarar bajo qué condiciones se midió cada parámetro (Vcc, temperatura, carga).</p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="font-semibold text-foreground text-sm m-0">❌ Asumir que dos chips "iguales" son intercambiables</p>
          <p className="text-sm text-muted-foreground m-0 mt-1">El LM358 y el TL072 son ambos op-amps duales DIP-8 pin-compatible, pero tienen slew rate y consumo muy distintos.</p>
        </div>
      </div>

      {/* ============ FAQ ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-primary" /> Preguntas frecuentes
      </h2>

      <details className="rounded-xl border border-border bg-card p-4 cursor-pointer">
        <summary className="font-semibold text-foreground">¿Dónde descargo datasheets gratis y oficiales?</summary>
        <p className="mt-3 text-sm">Directamente del fabricante: <strong className="text-foreground">ti.com</strong> (Texas Instruments), <strong className="text-foreground">onsemi.com</strong>, <strong className="text-foreground">st.com</strong> (STMicroelectronics), <strong className="text-foreground">microchip.com</strong>. Como buscador agregador funciona muy bien <strong className="text-foreground">alldatasheet.com</strong> y <strong className="text-foreground">octopart.com</strong>.</p>
      </details>

      <details className="rounded-xl border border-border bg-card p-4 cursor-pointer">
        <summary className="font-semibold text-foreground">¿Qué significa "TBD" en un datasheet?</summary>
        <p className="mt-3 text-sm">"To Be Determined" — el fabricante todavía no caracterizó ese parámetro. Suele aparecer en datasheets preliminares. Si vas a producción, buscá la versión final del documento.</p>
      </details>

      <details className="rounded-xl border border-border bg-card p-4 cursor-pointer">
        <summary className="font-semibold text-foreground">¿Por qué los datasheets están siempre en inglés?</summary>
        <p className="mt-3 text-sm">Es el idioma estándar de la industria electrónica. Los fabricantes solo traducen los datasheets de productos masivos para mercados estratégicos (China, Japón). Aprender el vocabulario técnico básico (voltage, current, gain, supply, output) te abre el 99% de los componentes del mundo.</p>
      </details>

      <details className="rounded-xl border border-border bg-card p-4 cursor-pointer">
        <summary className="font-semibold text-foreground">¿Cuál es la diferencia entre LM358N, LM358P y LM358D?</summary>
        <p className="mt-3 text-sm">Las letras finales indican el <strong className="text-foreground">encapsulado</strong>: <strong className="text-foreground">N</strong> = PDIP-8 (through-hole), <strong className="text-foreground">P</strong> = PDIP-8 también (variante de TI), <strong className="text-foreground">D</strong> = SOIC-8 (SMD). Funcionalmente son el mismo chip.</p>
      </details>

      <details className="rounded-xl border border-border bg-card p-4 cursor-pointer">
        <summary className="font-semibold text-foreground">¿El NE555 y el LM555 son lo mismo?</summary>
        <p className="mt-3 text-sm">Sí, son funcionalmente equivalentes. <strong className="text-foreground">NE</strong> es el prefijo original de Signetics (luego Philips/NXP), <strong className="text-foreground">LM</strong> es de National Semiconductor (hoy Texas Instruments). Ambos siguen el mismo pinout y fórmulas.</p>
      </details>

      <details className="rounded-xl border border-border bg-card p-4 cursor-pointer">
        <summary className="font-semibold text-foreground">¿Qué hago si el datasheet no incluye un parámetro que necesito?</summary>
        <p className="mt-3 text-sm">Buscá el <strong className="text-foreground">"Application Note"</strong> (AN) del fabricante para esa familia de chips. Suelen tener mediciones, gráficos y casos de uso que no entran en el datasheet. Si no, preguntá en foros como EEVblog o el subreddit r/AskElectronics.</p>
      </details>

      {/* ============ CIERRE ============ */}
      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-10">Conclusión</h2>
      <p>
        Saber leer un datasheet te transforma de "seguidor de tutoriales" a <strong className="text-foreground">diseñador de circuitos</strong>. La próxima vez que veas un chip nuevo, no busques tutoriales: descargá su datasheet, identificá las 8 secciones estándar y empezá por <em>Pinout</em> y <em>Absolute Maximum Ratings</em>. En 10 minutos vas a saber si te sirve.
      </p>

      <div className="mt-8 p-5 rounded-xl border border-primary/30 bg-primary/5">
        <p className="font-semibold text-foreground mb-2">📚 Seguí aprendiendo:</p>
        <ul className="m-0 space-y-1 text-sm">
          <li>→ <Link to="/articulos/transistores" className="text-primary hover:underline">Cómo elegir un transistor desde su datasheet</Link></li>
          <li>→ <Link to="/articulos/reguladores-voltaje" className="text-primary hover:underline">Reguladores de voltaje: 7805, LM317 y Buck</Link></li>
          <li>→ <Link to="/articulos/diodos" className="text-primary hover:underline">Diodos: parámetros clave del datasheet</Link></li>
          <li>→ <Link to="/glosario" className="text-primary hover:underline">Glosario de términos eléctricos</Link></li>
        </ul>
      </div>
    </ArticleLayout>
  );
};

export default LeerDatasheet;
