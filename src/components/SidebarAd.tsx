import AdSenseSlot from "./AdSenseSlot";

const SIDEBAR_SLOT =
  (import.meta.env.VITE_ADSENSE_SIDEBAR_SLOT as string | undefined)?.trim() ||
  "3942683817";

const SidebarAd = () => <AdSenseSlot slot={SIDEBAR_SLOT} variant="sidebar" />;

export default SidebarAd;
