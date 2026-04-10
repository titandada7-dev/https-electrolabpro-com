import ArticleLayout from "@/pages/ArticleLayout";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import pcbImg from "@/assets/pcb-design-workflow.jpg";

const BlogDisenoPCB = () => {
  return (
    <ArticleLayout
      title="Cómo Diseñé Mi Primer PCB: Del Esquemático a la Fabricación con KiCad"
      subtitle="Experiencia real paso a paso: desde la idea en papel hasta tener una placa de circuito impreso profesional en mis manos. Errores, lecciones y consejos que no encontrás en los tutoriales."
      slug="como-disene-mi-primer-pcb-kicad"
      datePublished="2026-04-10"
      dateModified="2026-04-10"
    >
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={pcbImg} alt="Flujo de diseño de PCB: del esquemático a la fabricación" className="w-full max-h-72 object-cover" loading="lazy" width={1024} height={576} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">El proceso completo de diseño de una PCB: esquemático → layout → fabricación</p>
      </div>

      <div className="bg-card/30 border border-border rounded-xl p-5 mb-8">
        <p className="text-sm italic text-muted-foreground">
          <strong className="text-foreground">📝 Nota del autor:</strong> Este artículo documenta mi experiencia REAL diseñando mi primera PCB. Incluyo los errores que cometí (y que me costaron dinero) para que no los repitas. Si estás pensando en dar el salto de la protoboard a una placa profesional, este artículo es para vos.
        </p>
      </div>

      <p>
        Después de años construyendo circuitos en protoboard, llegó un momento en el que mis proyectos se volvieron demasiado complejos para cables sueltos. Un sensor que dejaba de funcionar porque un jumper se movía, una alimentación ruidosa por las conexiones flojas... La solución era obvia: necesitaba diseñar mi propia PCB (Printed Circuit Board). El problema es que no tenía idea de por dónde empezar. Este artículo es la guía que me hubiera gustado tener.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">¿Por qué KiCad? Mi elección y las razones</h2>

      <p>
        Investigué varias opciones: Eagle (ahora de Autodesk), Altium Designer, EasyEDA y KiCad. Elegí <strong>KiCad</strong> por tres razones concretas:
      </p>

      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li><strong>Es 100% gratuito y open source</strong> — sin limitaciones de tamaño de placa ni número de capas, algo que Eagle limita en su versión gratuita.</li>
        <li><strong>Comunidad enorme</strong> — cualquier duda que tuve, alguien ya la había resuelto en los foros de KiCad o en Reddit.</li>
        <li><strong>Librerías extensas</strong> — incluye footprints para miles de componentes, y si falta uno, la comunidad lo ha creado.</li>
        <li><strong>Multiplataforma</strong> — funciona en Windows, macOS y Linux sin problemas.</li>
      </ul>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 my-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">💡 Consejo:</strong> Si estás empezando, descargá la última versión estable de KiCad desde <strong>kicad.org</strong>. La versión 8.x mejoró enormemente la interfaz y la experiencia de usuario respecto a versiones anteriores.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Paso 1: La idea — ¿Qué iba a diseñar?</h2>

      <p>
        Mi primer proyecto fue una <strong>placa de alimentación regulada con salidas de 5V y 3.3V</strong>. ¿Por qué? Porque es un circuito que ya había construido en protoboard decenas de veces, así que conocía perfectamente el esquemático. Esto es clave: <em>para tu primera PCB, elegí un circuito que ya dominés</em>. No intentes diseñar algo nuevo y aprender PCB al mismo tiempo.
      </p>

      <p>
        El circuito era simple pero funcional: entrada de 7-12V DC (jack barrel), un regulador LM7805 para 5V, un AMS1117-3.3 para 3.3V, condensadores de filtrado de entrada y salida, LEDs indicadores y headers de salida.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Paso 2: El esquemático en KiCad</h2>

      <p>
        Abrir el editor de esquemáticos de KiCad por primera vez fue intimidante. Hay botones por todos lados. Pero la lógica es más simple de lo que parece:
      </p>

      <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
        <li><strong>Colocar símbolos:</strong> Presioná "A" para agregar un componente. Buscás "LM7805" y lo colocás en el esquema. Repetí para cada componente.</li>
        <li><strong>Conectar con cables:</strong> Presioná "W" para dibujar cables entre los pines. KiCad te muestra qué pines están sin conectar con un pequeño cuadrado verde.</li>
        <li><strong>Agregar etiquetas de red:</strong> Para alimentación (VCC, GND), usá etiquetas de potencia en lugar de cables largos. Esto mantiene el esquema limpio.</li>
        <li><strong>Anotar componentes:</strong> Usá "Herramientas → Anotar esquemático" para asignar automáticamente R1, R2, C1, C2, etc.</li>
        <li><strong>Verificación eléctrica (ERC):</strong> Ejecutá el ERC (Electrical Rules Check) para detectar errores. Mi primer esquema tenía 14 errores — principalmente pines de alimentación sin conectar.</li>
      </ol>

      <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 my-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">❌ Error que cometí:</strong> No asigné footprints a los componentes antes de pasar al layout. Cuando llegué al editor de PCB, todos mis componentes aparecían sin forma física. Tuve que volver al esquemático, asignar cada footprint manualmente y volver a exportar la netlist. <strong>Lección: asigná footprints mientras creás el esquemático</strong>, no después.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Paso 3: Asignación de Footprints</h2>

      <p>
        Cada símbolo del esquemático necesita un "footprint" — la huella física que el componente ocupa en la placa. Esto incluye los pads donde se suelda, el contorno del componente y las serigrafías.
      </p>

      <p>
        Para mi fuente de alimentación, los footprints clave fueron:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-card">
            <tr>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Componente</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Footprint</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50"><td className="p-3">LM7805</td><td className="p-3 font-mono text-xs">TO-220-3_Horizontal</td><td className="p-3">Through-hole</td></tr>
            <tr className="border-b border-border/50"><td className="p-3">AMS1117-3.3</td><td className="p-3 font-mono text-xs">SOT-223</td><td className="p-3">SMD</td></tr>
            <tr className="border-b border-border/50"><td className="p-3">Condensadores 100µF</td><td className="p-3 font-mono text-xs">CP_Radial_D6.3mm</td><td className="p-3">Through-hole</td></tr>
            <tr className="border-b border-border/50"><td className="p-3">Condensadores 100nF</td><td className="p-3 font-mono text-xs">C_0805</td><td className="p-3">SMD</td></tr>
            <tr className="border-b border-border/50"><td className="p-3">LEDs</td><td className="p-3 font-mono text-xs">LED_D3.0mm</td><td className="p-3">Through-hole</td></tr>
            <tr><td className="p-3">Jack DC</td><td className="p-3 font-mono text-xs">BarrelJack_Horizontal</td><td className="p-3">Through-hole</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 my-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">💡 Consejo:</strong> Mezclé componentes through-hole y SMD intencionalmente. Los through-hole son más fáciles de soldar a mano (ideal para tu primera PCB), mientras que los SMD 0805 son lo suficientemente grandes para soldar con un cautín de punta fina sin necesitar horno de reflujo.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Paso 4: El diseño del PCB (Layout)</h2>

      <p>
        Esta es la parte más creativa y también la más difícil. Pasé del esquemático al editor de PCB con "Herramientas → Actualizar PCB desde esquemático". Todos los componentes aparecieron apilados en una esquina, conectados por líneas finas (ratsnest) que indicaban las conexiones pendientes.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Reglas de diseño que seguí:</h3>

      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li><strong>Ancho de pistas de señal:</strong> 0.25mm mínimo (el fabricante lo permite)</li>
        <li><strong>Ancho de pistas de alimentación:</strong> 0.5mm-1mm (más corriente = pista más ancha)</li>
        <li><strong>Separación mínima:</strong> 0.2mm entre pistas</li>
        <li><strong>Vías:</strong> 0.3mm de diámetro con 0.6mm de anular</li>
        <li><strong>Plano de masa (GND):</strong> Usé un relleno de cobre (zone fill) en la capa inferior completa</li>
      </ul>

      <p className="mt-4">
        El proceso fue: colocar primero los componentes mecánicamente (jack DC en el borde, reguladores con espacio para disipación), después rutear las pistas de alimentación (las más anchas), y finalmente las conexiones de señal. Usé dos capas: la superior para componentes y la mayor parte del ruteo, y la inferior como plano de masa con algunas pistas de paso.
      </p>

      <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 my-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">❌ Error que cometí:</strong> Coloqué el conector jack DC en el centro de la placa. Cuando la conecté a un gabinete, el cable quedaba en un ángulo imposible. <strong>Lección: los conectores mecánicos siempre van en los bordes de la placa</strong>, pensando en cómo se va a montar físicamente.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Paso 5: Verificación DRC y archivos Gerber</h2>

      <p>
        Antes de fabricar, ejecuté el <strong>DRC (Design Rules Check)</strong> de KiCad. Es el equivalente al "corrector ortográfico" de tu PCB. Detecta pistas demasiado cercanas, vías mal dimensionadas, pads sin conexión y cortocircuitos.
      </p>

      <p>
        Mi primer DRC arrojó 7 errores: 3 eran pistas demasiado cercanas al borde de la placa y 4 eran vías que violaban la distancia mínima. Los corregí moviendo las pistas y volví a pasar el DRC hasta obtener <strong>0 errores y 0 warnings</strong>.
      </p>

      <p>
        Después generé los archivos Gerber: "Archivo → Fabricación → Generar archivos Gerber". KiCad crea un archivo por cada capa (cobre superior, inferior, serigrafía, máscara de soldadura, etc.) y un archivo de taladros (drill file). Todos van comprimidos en un ZIP que se envía al fabricante.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Archivos Gerber generados:</h3>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-card">
            <tr>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Archivo</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Capa</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Función</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50"><td className="p-3 font-mono text-xs">*.Cu.gbr</td><td className="p-3">Front/Back Copper</td><td className="p-3">Pistas y pads de cobre</td></tr>
            <tr className="border-b border-border/50"><td className="p-3 font-mono text-xs">*.Mask.gbr</td><td className="p-3">Solder Mask</td><td className="p-3">Máscara de soldadura (protección)</td></tr>
            <tr className="border-b border-border/50"><td className="p-3 font-mono text-xs">*.Paste.gbr</td><td className="p-3">Solder Paste</td><td className="p-3">Pasta de soldadura para SMD</td></tr>
            <tr className="border-b border-border/50"><td className="p-3 font-mono text-xs">*.SilkS.gbr</td><td className="p-3">Silkscreen</td><td className="p-3">Serigrafía (textos y contornos)</td></tr>
            <tr className="border-b border-border/50"><td className="p-3 font-mono text-xs">*.Edge.Cuts.gbr</td><td className="p-3">Board Outline</td><td className="p-3">Contorno de corte de la placa</td></tr>
            <tr><td className="p-3 font-mono text-xs">*.drl</td><td className="p-3">Drill File</td><td className="p-3">Posición y diámetro de taladros</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Paso 6: Elegir fabricante y enviar a fabricar</h2>

      <p>
        Investigué tres fabricantes populares para prototipos:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-card">
            <tr>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Fabricante</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Precio (5 uds)</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Envío</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Tiempo total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50"><td className="p-3">JLCPCB</td><td className="p-3">~2€</td><td className="p-3">~8€</td><td className="p-3">10-15 días</td></tr>
            <tr className="border-b border-border/50"><td className="p-3">PCBWay</td><td className="p-3">~5€</td><td className="p-3">~10€</td><td className="p-3">12-18 días</td></tr>
            <tr><td className="p-3">OSHPARK</td><td className="p-3">~15€</td><td className="p-3">Incluido</td><td className="p-3">15-20 días</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        Elegí <strong>JLCPCB</strong> por el precio. Subí el ZIP con los Gerber, seleccioné las opciones (2 capas, 1.6mm de espesor, color verde, HASL con plomo) y pagué. En total: <strong>menos de 10€ con envío</strong> por 5 placas. Increíble.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Paso 7: Recibir, soldar y probar</h2>

      <p>
        Dos semanas después recibí un sobre con 5 placas perfectas. La calidad era impresionante para el precio: bordes limpios, serigrafía nítida, pads bien alineados. Llegó el momento de la verdad.
      </p>

      <h3 className="text-lg font-mono font-semibold text-foreground mt-6">Mi proceso de ensamblaje:</h3>

      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
        <li><strong>Inspección visual:</strong> Revisé que no hubiera cortocircuitos visibles en las pistas con una lupa.</li>
        <li><strong>Prueba de continuidad:</strong> Con el multímetro, verifiqué que GND y VCC no estuvieran en cortocircuito.</li>
        <li><strong>Soldé los componentes más bajos primero:</strong> Resistencias SMD → capacitores SMD → componentes through-hole → conectores.</li>
        <li><strong>Primera alimentación:</strong> Conecté 9V con una fuente de laboratorio con límite de corriente a 100mA. Si hay cortocircuito, la fuente limita y nada se quema.</li>
        <li><strong>Medición de salidas:</strong> 5.02V en la salida de 5V y 3.29V en la de 3.3V. ¡Funcionó a la primera!</li>
      </ol>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 my-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">💡 Consejo profesional:</strong> SIEMPRE alimentá tu primera PCB con una <strong>fuente de laboratorio con límite de corriente</strong>. Si cometiste un error de diseño y hay un cortocircuito, la fuente limita la corriente y protege tus componentes. Nunca conectes directamente a un transformador o adaptador sin protección.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Los 5 errores que cometí (y cómo evitarlos)</h2>

      <p>
        Nadie diseña una PCB perfecta a la primera. Estos son los errores que me costaron tiempo y dinero:
      </p>

      <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
        <li>
          <strong>Footprints incorrectos:</strong> Asigné un footprint SOT-23 al AMS1117 cuando debía ser SOT-223. El componente no entraba. <em>Solución: siempre verificá el footprint contra el datasheet del fabricante.</em>
        </li>
        <li>
          <strong>Pads demasiado pequeños:</strong> Los pads para soldar a mano necesitan ser más grandes que el mínimo del fabricante. <em>Solución: añadí 0.1-0.2mm extra al anular ring.</em>
        </li>
        <li>
          <strong>Sin plano de masa:</strong> Mi primera versión no tenía relleno de cobre. El ruido era horrible. <em>Solución: siempre usá un plano de GND en al menos una capa.</em>
        </li>
        <li>
          <strong>Agujeros de montaje olvidados:</strong> No puse agujeros para fijar la placa con tornillos. <em>Solución: añadí 4 agujeros M3 en las esquinas desde el principio.</em>
        </li>
        <li>
          <strong>Serigrafía ilegible:</strong> Usé texto demasiado pequeño (0.5mm). No se leía nada. <em>Solución: mínimo 1mm de altura para textos legibles.</em>
        </li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Checklist para tu primera PCB</h2>

      <p>
        Después de la experiencia, creé esta lista de verificación que uso en todos mis diseños:
      </p>

      <div className="bg-card border border-border rounded-xl p-5 my-6">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✅ Esquemático verificado con ERC (0 errores)</li>
          <li>✅ Todos los footprints asignados y verificados contra datasheet</li>
          <li>✅ DRC ejecutado (0 errores, 0 warnings)</li>
          <li>✅ Conectores mecánicos en los bordes de la placa</li>
          <li>✅ Plano de masa en al menos una capa</li>
          <li>✅ Condensadores de desacoplo cerca de cada IC</li>
          <li>✅ Agujeros de montaje M3 en las esquinas</li>
          <li>✅ Serigrafía con textos ≥1mm de altura</li>
          <li>✅ Pistas de alimentación más anchas que las de señal</li>
          <li>✅ Gerber revisados en el visor del fabricante antes de ordenar</li>
          <li>✅ Visor 3D de KiCad para verificar el aspecto final</li>
        </ul>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Herramientas recomendadas para diseño PCB</h2>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-card">
            <tr>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Herramienta</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Uso</th>
              <th className="p-3 text-left font-mono text-foreground border-b border-border">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50"><td className="p-3 font-semibold">KiCad 8</td><td className="p-3">Diseño completo de PCB</td><td className="p-3 text-primary">Gratis</td></tr>
            <tr className="border-b border-border/50"><td className="p-3 font-semibold">Visor Gerber online</td><td className="p-3">Verificar archivos antes de fabricar</td><td className="p-3 text-primary">Gratis</td></tr>
            <tr className="border-b border-border/50"><td className="p-3 font-semibold">Multímetro digital</td><td className="p-3">Pruebas de continuidad y voltaje</td><td className="p-3">15-50€</td></tr>
            <tr className="border-b border-border/50"><td className="p-3 font-semibold">Estación de soldadura</td><td className="p-3">Soldado de componentes</td><td className="p-3">30-80€</td></tr>
            <tr><td className="p-3 font-semibold">Fuente de laboratorio</td><td className="p-3">Alimentación segura con límite de corriente</td><td className="p-3">40-100€</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Conclusión técnica</h2>

      <p>
        Diseñar mi primera PCB fue una de las experiencias más satisfactorias en electrónica. Pasé de depender de protoboards frágiles a tener una placa profesional que funciona perfectamente, con un acabado que parece comprado en una tienda. Y todo por menos de 10€.
      </p>

      <p>
        Si todavía estás dudando, mi consejo es: <strong>empezá con un circuito simple que ya funcione en protoboard</strong>. No intentes innovar en tu primer diseño. El objetivo es aprender el flujo de trabajo de KiCad (esquemático → footprint → layout → Gerber → fabricación) sin la presión de resolver problemas eléctricos al mismo tiempo.
      </p>

      <p>
        Una vez que domines el proceso, las posibilidades son infinitas. Yo pasé de esta simple fuente de alimentación a diseñar shields personalizados para Arduino, placas de sensores para IoT y hasta un controlador de motor BLDC de 4 capas. Todo empieza con esa primera placa verde que llega por correo y funciona a la primera.
      </p>

      <div className="bg-card/30 border border-border rounded-xl p-5 mt-8">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">📚 Artículos relacionados:</strong>
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          <li><Link to="/articulos/soldadura-electronica" className="text-primary hover:underline">Guía completa de soldadura electrónica</Link></li>
          <li><Link to="/articulos/arduino" className="text-primary hover:underline">Arduino para principiantes</Link></li>
          <li><Link to="/articulos/protocolo-i2c" className="text-primary hover:underline">Protocolo I2C: comunicación entre dispositivos</Link></li>
          <li><Link to="/blog/mi-primer-laboratorio" className="text-primary hover:underline">Mi primer laboratorio de electrónica</Link></li>
        </ul>
      </div>
    </ArticleLayout>
  );
};

export default BlogDisenoPCB;
