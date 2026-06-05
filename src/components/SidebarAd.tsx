import AdSenseSlot from "./AdSenseSlot";
import { AD_SLOT_SIDEBAR } from "@/config/adsense";

/**
 * Anuncio lateral derecho (rascacielos vertical 160x600).
 * Wrapper sobre AdSenseSlot variant="sidebar".
 * El ID del slot vive en src/config/adsense.ts.
 */
const SidebarAd = () => <AdSenseSlot slot={AD_SLOT_SIDEBAR} variant="sidebar" />;

export default SidebarAd;
