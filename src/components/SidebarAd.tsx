import AdSenseSlot from "./AdSenseSlot";

/**
 * Anuncio lateral derecho (rascacielos vertical 160x600 / 300x600).
 *
 * Configuración del slot:
 * 1) Crear en AdSense → Anuncios → Por unidad → Display, formato
 *    "vertical" o "skyscraper" (NO el mismo slot horizontal del header,
 *    porque reusarlo causa "unfilled" permanente).
 * 2) Copiar el `data-ad-slot` (10 dígitos) y exponerlo como
 *    `VITE_ADSENSE_SIDEBAR_SLOT` en `.env` (recomendado) o reemplazar
 *    SIDEBAR_SLOT_FALLBACK abajo.
 *
 * Mientras no exista un slot real, el componente reserva el espacio
 * (min-height) para evitar CLS y el placeholder se mantiene silencioso
 * en producción (ver AdBanner).
 */
const SIDEBAR_SLOT_FALLBACK = "1234567890"; // TODO: reemplazar por slot vertical real
const SIDEBAR_SLOT =
  (import.meta.env.VITE_ADSENSE_SIDEBAR_SLOT as string | undefined)?.trim() ||
  SIDEBAR_SLOT_FALLBACK;

const SidebarAd = () => <AdSenseSlot slot={SIDEBAR_SLOT} variant="sidebar" />;

export default SidebarAd;
