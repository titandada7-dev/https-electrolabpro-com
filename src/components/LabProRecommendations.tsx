import { ExternalLink, Wrench } from "lucide-react";
import multimetroImg from "@/assets/multimetro.jpg";
import soldadorImg from "@/assets/soldador.jpg";

const LAB_PRO_PRODUCTS = [
  {
    title: "Tester Digital Brinna 113A Pro",
    description:
      "Con imán de sujeción, NCV (detección de voltaje sin contacto) y luz de fondo. Ideal para service.",
    image: multimetroImg,
    mlLink:
      "https://articulo.mercadolibre.com.ar/MLA-1384708015-tester-digital-multimetro-brinna-113a-pro-ncv-iman-luz-_JM",
    available: true,
  },
  {
    title: "Soldador de Estaño (próximamente)",
    description:
      "Estación de soldadura profesional con temperatura regulable. ¡Pronto con enlace de compra!",
    image: soldadorImg,
    mlLink: "#",
    available: false,
  },
];

const LabProRecommendations = () => {
  return (
    <section className="w-full space-y-6 text-left">
      <h2 className="text-2xl font-display font-bold text-foreground text-center flex items-center justify-center gap-3">
        <Wrench className="w-6 h-6 text-accent" />
        Laboratorio Pro:{" "}
        <span className="text-accent">Herramientas que uso y recomiendo</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LAB_PRO_PRODUCTS.map((product) => (
          <div
            key={product.title}
            className="group rounded-xl glass border-neon overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_hsl(var(--accent)/0.25)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={512}
                height={512}
              />
              {!product.available && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="text-xs font-display font-bold uppercase tracking-widest text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border">
                    Próximamente
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-display font-bold text-foreground text-base">
                {product.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
              {product.available ? (
                <a
                  href={product.mlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-display font-bold text-sm transition-all duration-200 bg-[hsl(50_100%_50%)] text-[hsl(220_80%_25%)] hover:bg-[hsl(50_100%_55%)] hover:shadow-lg hover:-translate-y-0.5"
                >
                  Ver en Mercado Libre
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg font-display font-bold text-sm bg-muted text-muted-foreground cursor-not-allowed opacity-60">
                  Enlace próximamente
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LabProRecommendations;
