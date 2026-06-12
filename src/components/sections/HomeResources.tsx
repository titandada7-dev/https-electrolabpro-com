import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Users, Zap } from "lucide-react";

const HomeResources = () => {
  return (
    <section id="recursos" className="py-14 sm:py-20 border-t border-border bg-card/40">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gradient-gold">
            Recursos
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
            Recursos e <span className="text-gradient-primary">información</span>
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto text-gradient-silver">
            Glosario, tips, servicios y más — todo organizado en un solo lugar.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {/* Glosario */}
          <AccordionItem value="glosario" id="glosario" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                Glosario rápido de electrónica
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <p className="text-sm text-muted-foreground mb-5">
                Definiciones cortas y claras de los conceptos más usados en electrónica.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { term: "Voltaje (V)", def: "Diferencia de potencial eléctrico entre dos puntos. Se mide en voltios. Es lo que 'empuja' los electrones por el circuito." },
                  { term: "Corriente (I)", def: "Cantidad de carga eléctrica que fluye por unidad de tiempo. Se mide en amperios (A) o miliamperios (mA)." },
                  { term: "Resistencia (R)", def: "Oposición al paso de la corriente. Se mide en ohmios (Ω). A mayor R, menos corriente para un mismo voltaje." },
                  { term: "Capacitancia (C)", def: "Capacidad de almacenar carga eléctrica de un condensador. Se mide en faradios (F), normalmente en μF, nF o pF." },
                  { term: "Frecuencia (f)", def: "Cantidad de ciclos por segundo de una señal alterna. Se mide en hercios (Hz), kHz o MHz." },
                  { term: "Reactancia (X)", def: "Oposición al paso de corriente alterna que ofrecen capacitores e inductores. Depende de la frecuencia." },
                  { term: "PWM", def: "Modulación por Ancho de Pulso. Técnica para controlar potencia variando el tiempo encendido/apagado de una señal digital." },
                  { term: "GND (Tierra)", def: "Punto de referencia 0V del circuito. Todos los voltajes se miden respecto a GND." },
                  { term: "Vcc / Vdd", def: "Voltaje positivo de alimentación. Vcc es para circuitos bipolares, Vdd para CMOS, pero suelen usarse igual." },
                ].map((item) => (
                  <div key={item.term} className="rounded-lg border border-border/60 bg-background/50 p-4">
                    <h4 className="font-mono font-bold text-primary text-xs uppercase tracking-wider mb-1.5">
                      {item.term}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.def}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Tips */}
          <AccordionItem value="tips" id="tips" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-primary shrink-0" />
                Tips de electrónica
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 space-y-3">
              {[
                { emoji: "💡", title: "El sentido del LED", text: "Recordá que los LED tienen polaridad. La pata larga es el Ánodo (+) y la corta el Cátodo (-). Si lo ponés al revés, no enciende." },
                { emoji: "🔗", title: "Resistencias en serie", text: "Si sumás dos resistencias una tras otra, su valor total aumenta (Rt = R1 + R2). Ideal para cuando no tenés el valor exacto." },
                { emoji: "⚠️", title: "Cuidado con el Protoboard", text: "Las líneas laterales (roja y azul) suelen estar conectadas a lo largo para la alimentación, pero las del medio están separadas cada 5 orificios." },
                { emoji: "🔥", title: "Soldadura brillante", text: "Una buena soldadura debe quedar brillante y con forma de volcán. Si queda opaca o como una bola, es una 'soldadura fría' (no conducía bien)." },
                { emoji: "📏", title: "El truco del multímetro", text: "Siempre empezá midiendo en la escala más alta de tu tester para no quemar el fusible si no conocés el voltaje que vas a medir." },
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-lg border border-border/60 bg-background/50">
                  <span className="text-xl shrink-0">{tip.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Para quién es */}
          <AccordionItem value="para-quien" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary shrink-0" />
                ¿Para quién es ElectroLab Pro?
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <p className="text-sm text-muted-foreground mb-5">
                Una plataforma que crece con vos: desde el primer LED hasta el diseño de PCB.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Lightbulb className="w-5 h-5 text-primary" />,
                    title: "Sos aficionado",
                    bullets: [
                      "Querés armar tus primeros circuitos sin quemar componentes.",
                      "Necesitás respuestas claras sin teoría innecesaria.",
                      "Buscás calculadoras que funcionen al toque.",
                    ],
                  },
                  {
                    icon: <BookOpen className="w-5 h-5 text-primary" />,
                    title: "Sos estudiante",
                    bullets: [
                      "Estudiás electrónica, mecatrónica o ingeniería.",
                      "Querés validar resultados de la facu en segundos.",
                      "Necesitás un glosario y guías técnicas a mano.",
                    ],
                  },
                  {
                    icon: <Zap className="w-5 h-5 text-primary" />,
                    title: "Sos maker / técnico",
                    bullets: [
                      "Trabajás con Arduino, ESP32, Raspberry Pi.",
                      "Diseñás PCBs y necesitás filtros RC, divisores, 555.",
                      "Querés todas las calcs en una sola pantalla.",
                    ],
                  },
                ].map((card) => (
                  <div key={card.title} className="rounded-lg border border-border/60 bg-background/50 p-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                      {card.icon}
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-2">{card.title}</h4>
                    <ul className="space-y-1.5">
                      {card.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                          <span className="text-primary mt-0.5 shrink-0">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default HomeResources;
