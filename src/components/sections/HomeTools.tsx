import { ShoppingBag } from "lucide-react";

const HomeTools = () => {
  const tools = [
    {
      emoji: "📟",
      title: "Multímetro Digital Profesional",
      desc: "Ideal para medir voltaje, corriente y resistencia con alta precisión.",
      mlLink: "https://www.amazon.es/s?k=multimetro+digital&tag=electrolabp0c-21",
      amzLink: "https://www.amazon.com/s?k=digital+multimeter",
    },
    {
      emoji: "🔧",
      title: "Estación de Soldadura",
      desc: "Temperatura regulable para trabajos con componentes SMD y PCB.",
      mlLink: "https://www.amazon.es/s?k=estacion+soldadura+60w&tag=electrolabp0c-21",
      amzLink: "https://www.amazon.com/s?k=soldering+station",
    },
    {
      emoji: "🤖",
      title: "Kit de Inicio Arduino",
      desc: "Todo lo que necesitas para empezar a programar microcontroladores.",
      mlLink: "https://www.amazon.es/s?k=kit+arduino+starter&tag=electrolabp0c-21",
      amzLink: "https://www.amazon.com/s?k=arduino+starter+kit",
    },
  ];

  const equipmentLinks = [
    { emoji: "🔧", title: "Kit de Resistencias", link: "https://www.amazon.es/s?k=kit+1000+resistencias+surtido&tag=electrolabp0c-21" },
    { emoji: "📟", title: "Multímetro Digital", link: "https://www.amazon.es/s?k=multimetro+digital+economico&tag=electrolabp0c-21" },
    { emoji: "🧪", title: "Breadboard + Cables", link: "https://www.amazon.es/s?k=breadboard+cables+jumper+kit&tag=electrolabp0c-21" },
  ];

  return (
    <>
      {/* Herramientas Recomendadas */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          <span className="text-gradient-primary">Herramientas Recomendadas</span>
        </h2>
        <p className="text-center text-sm mb-10 text-gradient-silver">
          El equipamiento esencial para armar tu laboratorio
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="card-glow bg-dot-grid flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
            >
              <div className="w-full h-28 bg-accent flex items-center justify-center text-4xl">{tool.emoji}</div>
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <h3 className="font-semibold text-card-foreground text-base">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc}</p>
                <div className="flex gap-2 pt-2">
                  <a
                    href={tool.mlLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Ver en Mercado Libre
                  </a>
                  <a
                    href={tool.amzLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-sm font-semibold hover:text-primary hover:border-primary transition-colors"
                  >
                    Amazon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Equipa tu laboratorio */}
      <section id="equipamiento" className="container mx-auto px-6 py-12 border-t border-border">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-muted-foreground">
          <ShoppingBag className="w-4 h-4" />
          Equipa tu laboratorio
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
          {equipmentLinks.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="card-glow flex-1 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm group"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <span className="ml-auto text-xs text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </a>
          ))}
        </div>
        <p className="text-center text-[10px] text-muted-foreground/50 mt-4 italic">
          En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
        </p>
      </section>
    </>
  );
};

export default HomeTools;
