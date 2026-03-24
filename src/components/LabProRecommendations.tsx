import { ExternalLink } from "lucide-react";
import multimetroImg from "@/assets/multimetro.jpg";
import anengImg from "@/assets/aneng-an8008.jpg";
import cablesImg from "@/assets/cables-dupont.jpg";
import resistenciasImg from "@/assets/kit-resistencias.jpg";
import ledsImg from "@/assets/kit-leds.jpg";
import componentesImg from "@/assets/kit-componentes.jpg";
import soldadorImg from "@/assets/soldador-kit.jpg";

type Product = {
  title: string;
  description: string;
  image: string;
  link: string;
  store: "ml" | "amazon";
};

const LAB_PRO_PRODUCTS: Product[] = [
  {
    title: "Tester Digital Multímetro",
    description: "Recargable, con capacímetro. Ideal para técnicos.",
    image: multimetroImg,
    link: "https://meli.la/12zzemF",
    store: "ml",
  },
  {
    title: "Multímetro Aneng AN8008",
    description: "7000 cuentas, True RMS, ultra compacto.",
    image: anengImg,
    link: "https://amzn.to/483vAWk",
    store: "amazon",
  },
  {
    title: "Kit Cables Dupont",
    description: "120 piezas M-M, M-H, H-H para protoboard.",
    image: cablesImg,
    link: "https://www.amazon.es/s?k=cables+dupont+arduino&tag=electrolabpro-21",
    store: "amazon",
  },
  {
    title: "Pack Resistencias 1/4W",
    description: "600 unidades surtidas, 10Ω a 1MΩ.",
    image: resistenciasImg,
    link: "https://www.amazon.es/s?k=kit+resistencias+1%2F4w+surtido&tag=electrolabpro-21",
    store: "amazon",
  },
  {
    title: "Kit LEDs 5mm",
    description: "100 unidades en 5 colores.",
    image: ledsImg,
    link: "https://www.amazon.es/s?k=kit+led+5mm+surtido&tag=electrolabpro-21",
    store: "amazon",
  },
  {
    title: "Componentes Surtidos",
    description: "Condensadores, transistores, diodos.",
    image: componentesImg,
    link: "https://www.amazon.es/s?k=kit+componentes+electronicos+surtido&tag=electrolabpro-21",
    store: "amazon",
  },
  {
    title: "Soldador 60W Kit",
    description: "Con soporte, estaño y puntas.",
    image: soldadorImg,
    link: "https://www.amazon.es/s?k=soldador+esta%C3%B1o+60w+kit&tag=electrolabpro-21",
    store: "amazon",
  },
];

const LabProRecommendations = () => {
  return (
    <div className="rounded-md border border-border bg-card/30 p-4 space-y-3">
      <div className="space-y-2.5">
        {LAB_PRO_PRODUCTS.map((product) => (
          <div key={product.title} className="flex items-center gap-3 group">
            {/* Small thumbnail */}
            <div className="w-10 h-10 rounded overflow-hidden shrink-0 border border-border/30">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
                width={40}
                height={40}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono font-semibold text-foreground truncate">
                {product.title}
              </p>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {product.description}
              </p>
            </div>

            {/* Outline button */}
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono font-medium border border-muted-foreground/30 text-muted-foreground bg-transparent transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              {product.store === "amazon" ? "Amazon" : "ML"}
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        ))}
      </div>

      <p className="text-[9px] text-muted-foreground/40 leading-relaxed font-mono">
        Enlaces de afiliado. Sin costo adicional para vos.
      </p>
    </div>
  );
};

export default LabProRecommendations;
