import { ExternalLink, Wrench } from "lucide-react";
import multimetroImg from "@/assets/multimetro.jpg";
import soldadorImg from "@/assets/soldador.jpg";

const LAB_PRO_PRODUCTS = [
  {
    title: "Tester Digital Brinna 113A Pro",
    description:
      "Imán de sujeción · NCV · Luz de fondo. Ideal para service.",
    image: multimetroImg,
    mlLink:
      "https://articulo.mercadolibre.com.ar/MLA-1384708015-tester-digital-multimetro-brinna-113a-pro-ncv-iman-luz-_JM",
    available: true,
  },
  {
    title: "Soldador de Estaño (próximamente)",
    description:
      "Estación profesional con temperatura regulable.",
    image: soldadorImg,
    mlLink: "#",
    available: false,
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
            Equipamiento recomendado para este proyecto
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
                  href={product.mlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border border-[hsl(50_100%_45%)] text-[hsl(50_100%_40%)] bg-transparent transition-all duration-200 hover:bg-[hsl(50_100%_50%)] hover:text-[hsl(220_80%_20%)] hover:shadow-sm"
                >
                  Ver en ML
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
