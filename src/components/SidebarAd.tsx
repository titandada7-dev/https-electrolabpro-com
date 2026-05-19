import AdSenseSlot from "./AdSenseSlot";

/**
 * Anuncio lateral derecho (rascacielos vertical 160x600).
 * Wrapper fino sobre AdSenseSlot variant="sidebar" para mantener compatibilidad
 * con los imports existentes en App.tsx.
 *
 * Para reemplazar el slot: cambiá SIDEBAR_SLOT por el ID real generado en
 * AdSense → Anuncios → Por unidad → Display (formato vertical/skyscraper).
 */
const SIDEBAR_SLOT = "3756475501"; // TODO: reemplazar por slot vertical real

const SidebarAd = () => <AdSenseSlot slot={SIDEBAR_SLOT} variant="sidebar" />;

export default SidebarAd;
