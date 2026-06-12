import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Microchip, Battery, Cable, Wrench, Zap } from "lucide-react";

interface QACategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: Array<{ q: string; a: string }>;
}

interface HomeFaqProps {
  activeQaTab: string;
  onTabChange: (id: string) => void;
}

const QA_CATEGORIES: QACategory[] = [
  {
    id: "microcontroladores",
    label: "Microcontroladores",
    icon: <Microchip className="w-4 h-4" />,
    items: [
      { q: "¿Qué es un Arduino y para qué sirve?", a: "Arduino es una plataforma de microcontroladores de código abierto. Permite crear proyectos electrónicos interactivos leyendo sensores y controlando actuadores." },
      { q: "¿Cuál es la diferencia entre Arduino UNO y Nano?", a: "El Arduino UNO usa el ATmega328P con 14 pines digitales y es ideal para principiantes. El Nano tiene el mismo chip pero en formato más compacto." },
      { q: "¿Puedo alimentar un Arduino con una batería?", a: "Sí. Podés usar una batería de 9V conectada al jack de alimentación o al pin Vin. También funciona con power banks USB de 5V conectados al puerto USB." },
    ],
  },
  {
    id: "fuentes",
    label: "Fuentes",
    icon: <Battery className="w-4 h-4" />,
    items: [
      { q: "¿Qué diferencia hay entre una fuente lineal y una conmutada?", a: "Las fuentes lineales usan transformador + regulador (más pesadas, menos ruido). Las conmutadas (switching) son más eficientes, livianas y generan más ruido electromagnético." },
      { q: "¿Cómo elijo la fuente correcta para mi circuito?", a: "Sumá el consumo de todos los componentes en mA y elegí una fuente que entregue al menos un 20% más. Verificá que el voltaje sea el correcto para tus componentes." },
      { q: "¿Puedo usar un cargador de celular como fuente?", a: "Sí, los cargadores USB entregan 5V regulados. Son ideales para Arduino y circuitos de baja potencia. Verificá que entregue suficiente corriente (500mA mínimo)." },
    ],
  },
  {
    id: "componentes",
    label: "Componentes",
    icon: <Cable className="w-4 h-4" />,
    items: [
      { q: "¿Cómo leo el valor de una resistencia por sus colores?", a: "Las bandas de colores codifican el valor. En una resistencia de 4 bandas: las dos primeras son dígitos, la tercera es el multiplicador, la cuarta es la tolerancia." },
      { q: "¿Qué pasa si pongo un LED sin resistencia?", a: "El LED recibirá demasiada corriente y se quemará casi instantáneamente. Siempre usá una resistencia en serie calculada con: R = (Vs - Vled) / Iled." },
      { q: "¿Para qué sirve un condensador en un circuito?", a: "Los condensadores almacenan y liberan energía. Se usan para filtrar ruido, estabilizar voltaje, acoplar/desacoplar señales y crear filtros." },
      { q: "¿Cuál es la diferencia entre un transistor NPN y PNP?", a: "En un NPN la corriente fluye de colector a emisor cuando se aplica corriente a la base. En un PNP fluye de emisor a colector con corriente inversa." },
    ],
  },
  {
    id: "herramientas",
    label: "Herramientas",
    icon: <Wrench className="w-4 h-4" />,
    items: [
      { q: "¿Qué multímetro me recomiendan para empezar?", a: "Un multímetro digital con autorango es ideal. Que mida voltaje AC/DC, resistencia, continuidad y capacitancia. Marcas confiables: Fluke, Extech o similares." },
      { q: "¿Cuál es la temperatura ideal para soldar?", a: "Entre 300°C y 350°C para la mayoría de componentes through-hole. Para SMD usá 350-380°C. Siempre usá estaño con flux integrado para mejores resultados." },
      { q: "¿Necesito un osciloscopio para empezar?", a: "No es indispensable al principio. Un multímetro es suficiente para aprender. El osciloscopio se vuelve necesario cuando trabajés con señales alternas o pruebas avanzadas." },
    ],
  },
  {
    id: "protocolos",
    label: "Protocolos & Seguridad",
    icon: <Zap className="w-4 h-4" />,
    items: [
      { q: "¿Qué frecuencia de PWM uso para controlar un motor DC?", a: "Entre 4 kHz y 20 kHz para evitar zumbidos audibles y reducir pérdidas. Arduino UNO entrega 490 Hz por defecto pero es modificable." },
      { q: "¿Qué pull-ups necesita el bus I²C?", a: "Según NXP UM10204: 4.7 kΩ para Standard-mode (100 kHz) y 2.2 kΩ para Fast-mode (400 kHz) a 5 V. A 3.3 V suelen usarse 10 kΩ." },
      { q: "¿Por qué se calienta el LM7805 y cómo lo dimensiono?", a: "Disipación: P = (Vin − 5 V) × Iout. Con 12 V y 500 mA disipa 3.5 W → necesita disipador. Si Vin > 9 V o Iout > 300 mA, usá LM317 regulable." },
      { q: "¿Cómo mido voltaje de red de 220 V de forma segura?", a: "Multímetro CAT III/IV (IEC 61010-1), puntas con dedales aislados, una sola mano apoyada y rango VAC ya seleccionado antes de conectar." },
    ],
  },
];

const HomeFaq = ({ activeQaTab, onTabChange }: HomeFaqProps) => {
  const activeQa = QA_CATEGORIES.find((c) => c.id === activeQaTab);

  return (
    <section id="foro" className="container mx-auto px-6 py-16 border-t border-border">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        <span className="text-gradient-primary">Preguntas Frecuentes</span>
      </h2>
      <p className="text-center text-sm mb-10 text-gradient-silver">Respuestas rápidas organizadas por categoría</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-start md:justify-center md:flex-wrap -mx-6 px-6 md:mx-0 md:px-0">
        {QA_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onTabChange(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeQaTab === cat.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Q&A items as Accordions */}
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {activeQa?.items.map((item, i) => (
            <AccordionItem key={`${activeQaTab}-${i}`} value={`qa-${i}`} className="rounded-xl border border-border bg-card shadow-sm px-5 overflow-hidden">
              <AccordionTrigger className="text-sm font-semibold text-card-foreground hover:no-underline py-4">
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {i + 1}
                  </span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-9 pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default HomeFaq;
