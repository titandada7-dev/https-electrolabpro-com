import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const HomeTools = () => {
  const tools = [
    { 
      emoji: "📟", 
      title: "Multímetro Digital Profesional", 
      desc: "Ideal para medir voltaje, corriente y resistencia con alta precisión.", 
      mlLink: "https://www.amazon.es/s?k=multimetro+digital&tag=electrolabp0c-21",
      amzLink: "https://www.amazon.com/s?k=digital+multimeter"
    },
    { 
      emoji: "🔧", 
      title: "Estación de Soldadura", 
      desc: "Temperatura regulable para trabajos con componentes SMD y PCB.", 
      mlLink: "https://www.amazon.es/s?k=estacion+soldadura+60w&tag=electrolabp0c-21",
      amzLink: "https://www.amazon.com/s?k=soldering+station"
    },
    { 
      emoji: "🤖", 
      title: "Kit de Inicio Arduino", 
      desc: "Todo lo que necesitas para empezar a programar microcontroladores.", 
      mlLink: "https://www.amazon.es/s?k=kit+arduino+starter&tag=electrolabp0c-21",
      amzLink: "https://www.amazon.com/s?k=arduino+starter+kit"
    },
  ];\n\n  const equipmentLinks = [\n    { emoji: \"🔧\", title: \"Kit de Resistencias\", link: \"https://www.amazon.es/s?k=kit+1000+resistencias+surtido&tag=electrolabp0c-21\" },\n    { emoji: \"📟\", title: \"Multímetro Digital\", link: \"https://www.amazon.es/s?k=multimetro+digital+economico&tag=electrolabp0c-21\" },\n    { emoji: \"🧪\", title: \"Breadboard + Cables\", link: \"https://www.amazon.es/s?k=breadboard+cables+jumper+kit&tag=electrolabp0c-21\" },\n  ];\n\n  return (\n    <>\n      {/* Herramientas Recomendadas */}\n      <section className=\"container mx-auto px-6 py-16 border-t border-border\">\n        <h2 className=\"text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3\">\n          <ShoppingBag className=\"w-5 h-5 sm:w-6 sm:h-6 text-primary\" />\n          Herramientas Recomendadas\n        </h2>\n        <p className=\"text-center text-muted-foreground text-sm mb-10\">El equipamiento esencial para armar tu laboratorio</p>\n        <div className=\"grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto\">\n          {tools.map((tool) => (\n            <div key={tool.title} className=\"flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md\">\n              <div className=\"w-full h-28 bg-accent flex items-center justify-center text-4xl\">{tool.emoji}</div>\n              <div className=\"flex flex-col flex-1 p-5 space-y-3\">\n                <h3 className=\"font-semibold text-card-foreground text-base\">{tool.title}</h3>\n                <p className=\"text-sm text-muted-foreground leading-relaxed flex-1\">{tool.desc}</p>\n                <div className=\"flex gap-2 pt-2\">\n                  <a href={tool.mlLink} target=\"_blank\" rel=\"noopener noreferrer nofollow\" className=\"flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity\">\n                    Ver en Mercado Libre\n                  </a>\n                  <a href={tool.amzLink} target=\"_blank\" rel=\"noopener noreferrer nofollow\" className=\"inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-sm font-semibold hover:text-primary hover:border-primary transition-colors\">\n                    Amazon\n                  </a>\n                </div>\n              </div>\n            </div>\n          ))}\n        </div>\n      </section>\n\n      {/* Equipa tu laboratorio */}\n      <section id=\"equipamiento\" className=\"container mx-auto px-6 py-12 border-t border-border\">\n        <h2 className=\"text-lg sm:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-muted-foreground\">\n          <ShoppingBag className=\"w-4 h-4\" />\n          Equipa tu laboratorio\n        </h2>\n        <div className=\"flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto\">\n          {equipmentLinks.map((item) => (\n            <a key={item.title} href={item.link} target=\"_blank\" rel=\"noopener noreferrer nofollow\" className=\"flex-1 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm hover:shadow-md hover:border-primary transition-all group\">\n              <span className=\"text-xl\">{item.emoji}</span>\n              <span className=\"text-sm font-medium text-card-foreground group-hover:text-primary transition-colors\">{item.title}</span>\n              <span className=\"ml-auto text-xs text-muted-foreground group-hover:text-primary transition-colors\">→</span>\n            </a>\n          ))}\n        </div>\n        <p className=\"text-center text-[10px] text-muted-foreground/50 mt-4 italic\">\n          En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.\n        </p>\n      </section>\n    </>\n  );\n};\n\nexport default HomeTools;
