import AdBanner from "./AdBanner";

/**
 * Anuncio lateral derecho (rascacielos vertical 160x600).
 * - Solo visible en pantallas ≥1280px (xl) para no invadir el contenido principal.
 * - Posición fixed, centrado verticalmente.
 * - Reserva espacio anti-CLS mediante AdBanner.
 *
 * Para reemplazar el slot: cambiá SIDEBAR_SLOT por el ID real generado en
 * AdSense → Anuncios → Por unidad → Display (formato vertical/skyscraper).
 */
const SIDEBAR_SLOT = "3756475501"; // TODO: reemplazar por slot vertical real

const SidebarAd = () => {
  return (
    <aside
      aria-label="Publicidad lateral"
      className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-30 w-[160px]"
    >
      <div className="rounded-md border border-border/40 bg-muted/20 p-2">
        <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em] font-mono mb-1 text-center select-none">
          Publicidad
        </p>
        <AdBanner
          slot={SIDEBAR_SLOT}
          format="vertical"
          responsive={false}
          minHeightMobile={600}
          minHeightDesktop={600}
          fallbackUrl="/"
        />
      </div>
    </aside>
  );
};

export default SidebarAd;
