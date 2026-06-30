import ArticleLayout from "@/pages/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import soldadorImg from "@/assets/soldador.jpg";

const Soldadura = () => {
  return (
    <ArticleLayout
      title="Soldadura Electrónica: Guía Completa para Principiantes"
      subtitle="Aprende a soldar componentes electrónicos correctamente. Técnicas, herramientas, tipos de estaño y errores comunes con soluciones paso a paso."
      slug="soldadura-electronica"
      schemaType="HowTo"
      estimatedTime="PT30M"
      tools={[
        "Estación de soldadura regulable 60W con punta fina",
        "Bomba desoldadora o malla de cobre",
        "Tercera mano con lupa y pinzas cocodrilo",
        "Esponja o lana de latón para limpiar la punta",
        "Pinzas de precisión",
        "Lentes de seguridad",
      ]}
      supplies={[
        "Estaño 60/40 con núcleo de flux, 0.8mm",
        "Flux en pasta o líquido",
        "PCB con componentes a soldar",
        "Alfombrilla de silicona resistente al calor",
      ]}
      steps={[
        { name: "Prepara la superficie", text: "Limpia los pads de la PCB y los terminales del componente. Las superficies oxidadas no sueldan bien." },
        { name: "Calienta el soldador", text: "Configúralo a 350-380°C para estaño con plomo, o 380-420°C para sin plomo." },
        { name: "Limpia y estaña la punta", text: "Pásala por la lana de latón hasta que esté brillante y cubierta con una capa fina de estaño." },
        { name: "Coloca el componente", text: "Inserta el componente en la PCB y dóblale ligeramente las patas para fijarlo en su lugar." },
        { name: "Aplica calor a la unión", text: "Toca simultáneamente el pad de la PCB y el terminal del componente con la punta del soldador durante 1-2 segundos." },
        { name: "Aplica estaño", text: "Toca el estaño contra la unión (no contra la punta). El estaño debe fluir por capilaridad alrededor del pin." },
        { name: "Retira estaño y soldador", text: "Primero retira el hilo de estaño y después el soldador. Todo el proceso debe durar entre 2 y 4 segundos." },
        { name: "Inspecciona la soldadura", text: "Una buena soldadura tiene forma de cono volcán, superficie brillante y cubre el pad uniformemente." },
      ]}
    >
      {/* Imagen de soldadura */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/50 mb-8">
        <img src={soldadorImg} alt="Estación de soldadura electrónica con punta fina para componentes SMD y through-hole" className="w-full max-h-72 object-contain p-4" loading="lazy" width={1024} height={683} />
        <p className="text-xs text-muted-foreground text-center pb-3 px-4">Figura: Estación de soldadura — herramienta esencial para todo laboratorio de electrónica</p>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">¿Qué es la soldadura electrónica?</h2>
      <p>
        La <strong className="text-foreground">soldadura electrónica</strong> es el proceso de unir componentes electrónicos a una placa de circuito impreso (PCB) usando una aleación metálica de bajo punto de fusión llamada <strong className="text-foreground">estaño de soldar</strong>. Es una habilidad fundamental que todo entusiasta y profesional de la electrónica debe dominar.
      </p>
      <p>
        A diferencia de la soldadura industrial (que funde los metales base), en electrónica el estaño actúa como un "pegamento conductor" que une los terminales de los componentes a las pistas de cobre de la PCB, creando conexiones eléctricas sólidas y confiables.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Herramientas necesarias</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Herramienta</th>
              <th className="px-4 py-2 text-left font-mono">Función</th>
              <th className="px-4 py-2 text-left font-mono">Recomendación</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Soldador</td>
              <td className="px-4 py-2">Calienta los puntos de soldadura</td>
              <td className="px-4 py-2">Estación regulable 60W, punta fina</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Estaño</td>
              <td className="px-4 py-2">Aleación que une los componentes</td>
              <td className="px-4 py-2">60/40 con flux, 0.8mm diámetro</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Desoldador</td>
              <td className="px-4 py-2">Retira estaño de soldaduras</td>
              <td className="px-4 py-2">Bomba de succión o malla de cobre</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Flux</td>
              <td className="px-4 py-2">Limpia y mejora el flujo del estaño</td>
              <td className="px-4 py-2">Flux en pasta o líquido</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Tercera mano</td>
              <td className="px-4 py-2">Sostiene la PCB y componentes</td>
              <td className="px-4 py-2">Con lupa y pinzas cocodrilo</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Esponja/lana latón</td>
              <td className="px-4 py-2">Limpia la punta del soldador</td>
              <td className="px-4 py-2">Lana de latón preferible (no enfría)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Tipos de estaño de soldar</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">60/40 (Sn60/Pb40)</strong>: 60% estaño, 40% plomo. Funde a <span className="font-mono text-primary">183°C</span>. El más fácil de trabajar. Ideal para principiantes</li>
        <li><strong className="text-foreground">63/37 (eutéctico)</strong>: Funde a <span className="font-mono text-primary">183°C</span> exactos (sin rango pastoso). Produce las soldaduras más limpias</li>
        <li><strong className="text-foreground">Sin plomo (lead-free)</strong>: SAC305 (Sn96.5/Ag3/Cu0.5). Funde a <span className="font-mono text-primary">217°C</span>. Requerido por la normativa RoHS en productos comerciales</li>
      </ul>
      <p>
        <strong className="text-foreground">Recomendación para principiantes:</strong> Usa estaño 60/40 con núcleo de flux (rosin core) de 0.8mm de diámetro. Es el más fácil de manejar y produce buenos resultados desde el primer intento.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Técnica básica de soldadura (paso a paso)</h2>
      <ol className="list-decimal list-inside space-y-2 pl-2">
        <li><strong className="text-foreground">Prepara la superficie:</strong> Limpia los pads de la PCB y los terminales del componente. Las superficies oxidadas no sueldan bien</li>
        <li><strong className="text-foreground">Calienta el soldador:</strong> Configúralo a <span className="font-mono text-primary">350-380°C</span> para estaño con plomo, o <span className="font-mono text-primary">380-420°C</span> para sin plomo</li>
        <li><strong className="text-foreground">Limpia la punta:</strong> Pásala por la lana de latón. La punta debe estar brillante y "estañada" (con una capa fina de estaño)</li>
        <li><strong className="text-foreground">Coloca el componente:</strong> Inserta el componente en la PCB y dóblale ligeramente las patas para que se mantenga en su lugar</li>
        <li><strong className="text-foreground">Aplica calor:</strong> Toca simultáneamente el pad de la PCB y el terminal del componente con la punta del soldador. Espera <span className="font-mono text-primary">1-2 segundos</span></li>
        <li><strong className="text-foreground">Aplica estaño:</strong> Toca el estaño contra la unión (NO contra la punta del soldador). El estaño debe fluir por capilaridad alrededor del pin</li>
        <li><strong className="text-foreground">Retira el estaño:</strong> Primero retira el hilo de estaño</li>
        <li><strong className="text-foreground">Retira el soldador:</strong> Después retira el soldador. Todo el proceso debe durar <span className="font-mono text-primary">2-4 segundos</span></li>
      </ol>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo reconocer una buena soldadura</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-foreground">
              <th className="px-4 py-2 text-left font-mono">Característica</th>
              <th className="px-4 py-2 text-left font-mono">Buena soldadura ✅</th>
              <th className="px-4 py-2 text-left font-mono">Mala soldadura ❌</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Forma</td>
              <td className="px-4 py-2">Cono volcán, cóncava</td>
              <td className="px-4 py-2">Bola redonda o irregular</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Superficie</td>
              <td className="px-4 py-2">Brillante y lisa (con plomo)</td>
              <td className="px-4 py-2">Opaca, granulosa, agrietada</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Contacto</td>
              <td className="px-4 py-2">Estaño fluye hasta el pad</td>
              <td className="px-4 py-2">Estaño solo en el pin (fría)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-2 font-mono text-primary">Cantidad</td>
              <td className="px-4 py-2">Suficiente para cubrir el pad</td>
              <td className="px-4 py-2">Exceso (puentes) o insuficiente</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Problemas comunes y soluciones</h2>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>
          <strong className="text-foreground">Soldadura fría (cold joint):</strong> El estaño no fluyó correctamente. Se ve opaca y granulosa. <em>Solución: Recalienta la unión y aplica un poco más de estaño con flux</em>
        </li>
        <li>
          <strong className="text-foreground">Puente de soldadura:</strong> Estaño conecta dos pines adyacentes. <em>Solución: Usa malla desoldadora para retirar el exceso, o arrastra con el soldador limpio</em>
        </li>
        <li>
          <strong className="text-foreground">Estaño no se adhiere:</strong> Superficie oxidada o contaminada. <em>Solución: Limpia con flux y/o lija fina (para pads). Reemplaza la punta si está quemada</em>
        </li>
        <li>
          <strong className="text-foreground">Componente dañado por calor:</strong> Soldaste demasiado tiempo. <em>Solución: No excedas 4 segundos por pin. Deja enfriar entre intentos</em>
        </li>
        <li>
          <strong className="text-foreground">Pista levantada:</strong> Exceso de calor o fuerza despegó la pista de cobre. <em>Solución: Repara con un cable fino (wire jumper) soldado entre los puntos</em>
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Soldadura SMD (montaje superficial)</h2>
      <p>
        Los componentes <strong className="text-foreground">SMD</strong> (Surface Mount Device) son más pequeños y se sueldan directamente sobre la superficie de la PCB, sin patas que atraviesen agujeros.
      </p>
      <h3 className="text-lg font-mono font-semibold text-foreground mt-4">Técnica para SMD con soldador</h3>
      <ol className="list-decimal list-inside space-y-1 pl-2">
        <li>Aplica flux en los pads de la PCB</li>
        <li>Estáña uno de los pads con una gota de estaño</li>
        <li>Con pinzas, coloca el componente y recalienta el pad estañado para fijarlo</li>
        <li>Suelda los demás pines normalmente</li>
        <li>Retoca el primer pin si es necesario</li>
      </ol>
      <p>
        Para componentes SMD muy pequeños (0402, 0201), se recomienda usar una <strong className="text-foreground">estación de aire caliente</strong> con pasta de soldar.
      </p>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Cómo desoldar componentes</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Bomba desoldadora:</strong> Calienta la soldadura, posiciona la bomba y activa la succión. Ideal para componentes through-hole</li>
        <li><strong className="text-foreground">Malla desoldadora:</strong> Coloca la malla sobre la soldadura y presiona con el soldador. El estaño es absorbido por capilaridad. Ideal para SMD y puentes</li>
        <li><strong className="text-foreground">Aire caliente:</strong> Para retirar componentes SMD completos sin dañar la PCB</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Seguridad al soldar</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong className="text-foreground">Ventilación:</strong> Los humos del flux son irritantes. Usa un extractor de humos o trabaja en un área ventilada</li>
        <li><strong className="text-foreground">Lávate las manos:</strong> El estaño con plomo es tóxico. Lávate siempre después de soldar</li>
        <li><strong className="text-foreground">Protección ocular:</strong> Usa lentes de seguridad, especialmente al cortar terminales</li>
        <li><strong className="text-foreground">Soporte del soldador:</strong> Siempre coloca el soldador en su soporte cuando no lo uses. La punta alcanza 350°C+</li>
        <li><strong className="text-foreground">Superficie resistente al calor:</strong> Trabaja sobre una alfombrilla de silicona o superficie no inflamable</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground mt-8">Consejos para mejorar tu técnica</h2>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Practica con PCBs viejas o placas de práctica antes de trabajar en proyectos reales</li>
        <li>Mantén la punta del soldador siempre estañada y limpia</li>
        <li>El flux es tu mejor amigo — úsalo generosamente en soldaduras difíciles</li>
        <li>Invierte en una buena estación de soldadura con control de temperatura</li>
        <li>Para trabajos finos, usa una lupa o microscopio</li>
        <li>La velocidad viene con la práctica: no intentes apurarte al principio</li>
      </ul>

      {/* CTA Amazon */}
      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center space-y-3">
        <p className="text-foreground font-bold font-mono text-lg">🔥 Equípate para soldar como un profesional</p>
        <p className="text-muted-foreground text-sm">
          Estaciones de soldadura, estaño de calidad, flux y herramientas esenciales para tus proyectos electrónicos.
        </p>
        <a
          href="https://www.amazon.es/s?k=estacion+soldadura+electronica&tag=electrolabp0c-21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(30,90%,50%)] hover:bg-[hsl(30,90%,45%)] text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_hsl(30,90%,50%,0.3)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver kits de soldadura en Amazon
        </a>
      </div>
    </ArticleLayout>
  );
};

export default Soldadura;
