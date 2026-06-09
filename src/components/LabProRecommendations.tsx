import { ExternalLink } from "lucide-react";

type Product = {
  title: string;
  link: string;
  store: "ml" | "amazon";
};

const LAB_PRO_PRODUCTS: Product[] = [
  { title: "Tester Digital Multímetro", link: "https://meli.la/12zzemF", store: "ml" },
  { title: "Multímetro Aneng AN8008", link: "https://amzn.to/483vAWk", store: "amazon" },
  { title: "Kit Cables Dupont", link: "https://www.amazon.es/s?k=cables+dupont+arduino&tag=electrolabp0c-21", store: "amazon" },
  { title: "Pack Resistencias 1/4W", link: "https://www.amazon.es/s?k=kit+resistencias+1%2F4w+surtido&tag=electrolabp0c-21", store: "amazon" },
  { title: "Kit LEDs 5mm", link: "https://www.amazon.es/s?k=kit+led+5mm+surtido&tag=electrolabp0c-21", store: "amazon" },
  { title: "Componentes Surtidos", link: "https://www.amazon.es/s?k=kit+componentes+electronicos+surtido&tag=electrolabp0c-21", store: "amazon" },
  { title: "Soldador 60W Kit", link: "https://www.amazon.es/s?k=soldador+esta%C3%B1o+60w+kit&tag=electrolabp0c-21", store: "amazon" },
];

const LabProRecommendations = () => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {LAB_PRO_PRODUCTS.map((product) => (
          <a
            key={product.title}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="group-hover:underline">{product.title}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
      <p className="text-[9px] text-muted-foreground/70 font-mono">
        Enlaces de afiliado · Sin costo adicional para vos
      </p>
    </div>
  );
};

export default LabProRecommendations;
