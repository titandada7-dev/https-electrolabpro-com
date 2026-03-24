import { ExternalLink, Wrench } from "lucide-react";
import multimetroImg from "@/assets/multimetro.jpg";
import soldadorImg from "@/assets/soldador.jpg";

type Product = {
  title: string;
  description: string;
  image: string;
  link: string;
  available: boolean;
  store: "ml" | "amazon";
};

const LAB_PRO_PRODUCTS: Product[] = [
  {
    title: "Multímetro Brinna Smart HB-601",
    description: "Recargable, con capacímetro. Ideal para técnicos.",
    image: multimetroImg,
    link: "https://www.mercadolibre.com.ar/multimetro-brinna-smart-recargable-hb-601-c-capacimetro/p/MLA46131333?pdp_filters=item_id%3AMLA2141545178&matt_tool=89488245#origin=share&sid=share&wid=MLA2141545178",
    available: true,
    store: "ml",
  },
  {
    title: "Multímetro Digital Aneng AN8008",
    description: "7000 cuentas, True RMS, diseño ultra compacto.",
    image: multimetroImg,
    link: "https://amzn.to/483vAWk",
    available: true,
    store: "amazon",
  },
  {
    title: "Soldador de Estaño (próximamente)",
    description: "Estación profesional con temperatura regulable.",
    image: soldadorImg,
    link: "#",
    available: false,
    store: "ml",
  },
];

const LabProRecommendations = () => {
  return (
    <section className="w-full">
      <div className="rounded-lg border border-border/60 bg-muted/30 p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider">
            Equipamiento Sugerido
          </h3>
        </div>

        {/* Products */}
        <div className="space-y-3">
          {LAB_PRO_PRODUCTS.map((product) => (
            <div
              key={product.title}
              className="flex items-center gap-4 group"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 border border-border/40 relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={56}
                  height={56}
                />
                {!product.available && (
                  <div className="absolute inset-0 bg-background/70" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">
                  {product.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* CTA */}
              {product.available ? (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all duration-200 hover:shadow-sm ${
                    product.store === "amazon"
                      ? "border-[hsl(30_100%_50%)] text-[hsl(30_100%_45%)] bg-transparent hover:bg-[hsl(30_100%_50%)] hover:text-white"
                      : "border-[hsl(50_100%_45%)] text-[hsl(50_100%_40%)] bg-transparent hover:bg-[hsl(50_100%_50%)] hover:text-[hsl(220_80%_20%)]"
                  }`}
                >
                  {product.store === "amazon" ? "Ver en Amazon" : "Ver en ML"}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="shrink-0 text-[10px] text-muted-foreground/60 italic">
                  Pronto
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground/50 italic leading-relaxed">
          Los enlaces pueden generar una pequeña comisión sin costo adicional para vos.
        </p>
      </div>
    </section>
  );
};

export default LabProRecommendations;
