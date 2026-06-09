import AdBanner from "./AdBanner";

type AdSenseVariant = "header" | "sidebar" | "inline";

interface AdSenseSlotProps {
  /** ID de slot generado en AdSense → Anuncios → Por unidad. */
  slot: string;
  /** Preset visual y de formato. */
  variant?: AdSenseVariant;
  /** URL de respaldo si el anuncio no carga. Default: "/". */
  fallbackUrl?: string;
  /** Clase opcional para el contenedor externo. */
  className?: string;
}

/**
 * Componente unificado para mostrar anuncios de AdSense con estilos y
 * comportamiento responsive consistentes en toda la aplicación.
 *
 * - `header`:  banner horizontal full-width bajo el navbar, sin label.
 * - `sidebar`: rascacielos vertical 160x600, fixed a la derecha en xl+.
 * - `inline`:  bloque dentro de contenido, con label "Publicidad".
 *
 * Todos los slots reservan altura mínima (anti-CLS) y muestran un placeholder
 * con enlace de respaldo cuando AdSense no responde o el script está bloqueado.
 */
const AdSenseSlot = ({
  slot,
  variant = "inline",
  fallbackUrl = "/",
  className = "",
}: AdSenseSlotProps) => {
  if (variant === "header") {
    return (
      <div className={`border-b border-border bg-background ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <AdBanner
            slot={slot}
            format="horizontal"
            responsive
            minHeightMobile={100}
            minHeightDesktop={100}
            className="max-w-[970px] mx-auto"
           
          />
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <aside
        aria-label="Publicidad lateral"
        className={`hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-30 w-[160px] ${className}`}
      >
        <div className="rounded-md border border-border/40 bg-muted/20 p-2">
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em] font-mono mb-1 text-center select-none">
            Publicidad
          </p>
          <AdBanner
            slot={slot}
            format="vertical"
            responsive={false}
            minHeightMobile={600}
            minHeightDesktop={600}
           
          />
        </div>
      </aside>
    );
  }

  // inline (in-article)
  return (
    <div className={`w-full py-6 ${className}`}>
      <div className="rounded-md border border-border/40 bg-muted/20 p-3">
        <p className="text-[9px] text-muted-foreground/35 uppercase tracking-[0.2em] font-mono mb-2 text-center select-none">
          Publicidad
        </p>
        <AdBanner slot={slot} format="fluid" layout="in-article" responsive={false} />
      </div>
    </div>
  );
};

export default AdSenseSlot;
