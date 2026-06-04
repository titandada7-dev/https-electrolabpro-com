import { Calculator, Microchip, BookOpen } from "lucide-react";

interface HomeServicesProps {
  scrollTo: (id: string) => void;
}

const HomeServices = ({ scrollTo }: HomeServicesProps) => {
  const quickAccessCards = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Nivel 1 · Laboratorio de Cálculo",
      desc: "Calculadoras verificadas en banco de pruebas",
      target: "calculadora",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Microchip className="h-6 w-6" />,
      title: "Nivel 2 · Investigación de Componentes",
      desc: "Fichas técnicas y datasheets resumidos",
      target: "diccionario",
      color: "bg-violet-500/10 text-violet-500",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Nivel 3 · Protocolos y Guías",
      desc: "PWM, I2C, reguladores y más",
      target: "guias",
      color: "bg-emerald-500/10 text-emerald-500",
    },
  ];

  return (
    <section id="servicios" className="py-10 sm:py-14 border-t border-border">
      <div className="container mx-auto px-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-2">
            Niveles de <span className="text-primary">Investigación</span>
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            El sitio está organizado en tres niveles según la profundidad técnica del contenido
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {quickAccessCards.map((card) => (
              <button
                key={card.target}
                onClick={() => scrollTo(card.target)}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card shadow-sm card-glow hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} transition-transform group-hover:scale-110`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
                </div>
                <span className="text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Ir a sección ↓
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
