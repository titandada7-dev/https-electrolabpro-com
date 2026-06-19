import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Zap, CircuitBoard, Cpu, GraduationCap } from "lucide-react";

interface FaqGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  accent: string;
  intro: string;
  items: Array<{ q: string; a: string }>;
}

const GROUPS: FaqGroup[] = [
  {
    id: "resistencias",
    label: "Resistencias",
    icon: <Zap className="w-5 h-5" />,
    accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    intro:
      "Las resistencias limitan la corriente y dividen voltajes. Son el componente más usado por todo principiante.",
    items: [
      {
        q: "¿Qué es exactamente una resistencia y por qué la necesito?",
        a: "Es un componente pasivo que se opone al paso de la corriente. Se mide en ohmios (Ω). Sin ella, un LED o cualquier carga sensible recibiría demasiada corriente y se quemaría. Funciona según la Ley de Ohm: V = I × R.",
      },
      {
        q: "¿Cómo leo el valor por las bandas de colores?",
        a: "En una de 4 bandas: las 2 primeras son dígitos, la 3ª es el multiplicador (×10ⁿ) y la 4ª es la tolerancia (oro ±5%, plata ±10%). En las de 5 bandas, las 3 primeras son dígitos. Podés usar nuestra calculadora visual de resistencias para no equivocarte.",
      },
      {
        q: "¿Qué potencia (vatios) elijo: 1/4 W o 1/2 W?",
        a: "Calculá P = V² / R o P = I² × R y elegí una resistencia con al menos el doble de potencia. Para circuitos típicos de 5–12 V con LEDs y señales, 1/4 W alcanza. Para drivers de motores o disipación alta, pasá a 1 W o más.",
      },
      {
        q: "¿Cuál es la diferencia entre conectar resistencias en serie y paralelo?",
        a: "En serie se suman: R_total = R1 + R2. En paralelo disminuyen: 1/R_total = 1/R1 + 1/R2. La serie aumenta el valor y reparte el voltaje; el paralelo lo reduce y reparte la corriente.",
      },
    ],
  },
  {
    id: "capacitores",
    label: "Capacitores",
    icon: <CircuitBoard className="w-5 h-5" />,
    accent: "from-sky-500/20 to-blue-500/10 border-sky-500/30",
    intro:
      "Los capacitores (condensadores) almacenan energía y filtran ruido. Imprescindibles en cualquier fuente de alimentación.",
    items: [
      {
        q: "¿Para qué sirve un capacitor en mi circuito?",
        a: "Tres usos principales: filtrar el voltaje de la fuente (eliminar rizado y ruido), acoplar señales de audio o radio, y crear retardos junto a una resistencia (circuitos RC). Cerca de cada chip se coloca uno de 100 nF de desacoplo.",
      },
      {
        q: "¿Qué significa que un capacitor electrolítico es polarizado?",
        a: "Tiene un polo positivo (+) y uno negativo (–). Si lo conectás al revés se puede hinchar o explotar. La pata corta y la banda blanca marcan el negativo. Los cerámicos no son polarizados: van en cualquier sentido.",
      },
      {
        q: "¿Cómo elijo el voltaje del capacitor?",
        a: "El voltaje impreso (ej. 25 V) es el máximo que tolera. Elegí siempre uno con al menos 1,5× el voltaje real del circuito. Para 12 V usá uno de 16 V o 25 V. Excederlo destruye el dieléctrico.",
      },
      {
        q: "¿Qué unidades uso: μF, nF o pF?",
        a: "1 μF = 1 000 nF = 1 000 000 pF. Microfaradios (μF) para fuentes, nanofaradios (nF) para desacoplo y filtros de audio, picofaradios (pF) para radiofrecuencia y osciladores.",
      },
    ],
  },
  {
    id: "transistores",
    label: "Transistores",
    icon: <Cpu className="w-5 h-5" />,
    accent: "from-violet-500/20 to-purple-500/10 border-violet-500/30",
    intro:
      "Los transistores amplifican señales o actúan como interruptores controlados por una pequeña corriente o voltaje.",
    items: [
      {
        q: "¿Qué hace un transistor y cuándo lo necesito?",
        a: "Funciona como un interruptor electrónico o un amplificador. Lo necesitás cuando una salida débil (por ejemplo el pin de un Arduino, que entrega solo 20 mA) tiene que controlar una carga grande como un motor, un relé o varios LEDs.",
      },
      {
        q: "¿Cuál es la diferencia entre NPN y PNP?",
        a: "El NPN conduce cuando la base recibe voltaje positivo respecto al emisor; se usa para conmutar cargas hacia GND (lado bajo). El PNP conduce cuando la base es negativa respecto al emisor; se usa para conmutar cargas hacia Vcc (lado alto). El NPN 2N2222 es el más usado por principiantes.",
      },
      {
        q: "¿Por qué tengo que poner una resistencia en la base?",
        a: "Limita la corriente que entra a la base y protege al transistor. La regla práctica: R_base = (V_control − 0,7 V) / I_base, donde I_base = I_carga / hFE. Para un 2N2222 con hFE ≈ 100 y 50 mA de carga, una resistencia de 1 kΩ alcanza.",
      },
      {
        q: "¿Cuándo uso un MOSFET en lugar de un BJT?",
        a: "Usá un MOSFET (ej. IRLZ44N) para corrientes mayores a 500 mA o cuando necesites bajísima pérdida de potencia. Los MOSFET de nivel lógico se controlan directamente con 3,3 V o 5 V y disipan mucho menos calor que un BJT al saturar.",
      },
    ],
  },
];

const BeginnerFaq = () => {
  return (
    <section
      id="faq-principiantes"
      aria-labelledby="faq-principiantes-title"
      className="space-y-6"
    >
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <GraduationCap className="w-3.5 h-3.5" />
          Para principiantes
        </div>
        <h2
          id="faq-principiantes-title"
          className="text-2xl md:text-3xl font-bold font-mono text-foreground glow-text"
        >
          Preguntas frecuentes de electrónica básica
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Resistencias, capacitores y transistores explicados sin jerga,
          con las dudas reales que tiene cualquiera al armar su primer circuito.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {GROUPS.map((group) => (
          <article
            key={group.id}
            className={`rounded-xl border bg-gradient-to-br ${group.accent} p-5 backdrop-blur-sm`}
          >
            <header className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-card/60 text-primary">
                {group.icon}
              </div>
              <h3 className="font-mono font-semibold text-foreground">
                {group.label}
              </h3>
            </header>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {group.intro}
            </p>
            <Accordion type="single" collapsible className="space-y-1">
              {group.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`${group.id}-${i}`}
                  className="border-b border-border/40 last:border-0"
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:text-primary py-2.5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </article>
        ))}
      </div>

      {/* JSON-LD para SEO de la FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: GROUPS.flatMap((g) =>
              g.items.map((it) => ({
                "@type": "Question",
                name: it.q,
                acceptedAnswer: { "@type": "Answer", text: it.a },
              }))
            ),
          }),
        }}
      />
    </section>
  );
};

export default BeginnerFaq;
