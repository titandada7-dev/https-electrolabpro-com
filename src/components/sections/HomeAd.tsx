import AdSenseSlot from "@/components/AdSenseSlot";

// Slot in-feed (fluid) creado en AdSense para el header del home.
// Configurable vía VITE_ADSENSE_HEADER_SLOT / VITE_ADSENSE_HEADER_LAYOUT_KEY.
const HEADER_SLOT = import.meta.env.VITE_ADSENSE_HEADER_SLOT || "8091581348";
const HEADER_LAYOUT_KEY =
  import.meta.env.VITE_ADSENSE_HEADER_LAYOUT_KEY || "-6q+e9+15-2u+4y";

const HomeAd = () => {
  return (
    <div className="border-t border-border">
      <AdSenseSlot
        slot={HEADER_SLOT}
        variant="header"
        format="fluid"
        layoutKey={HEADER_LAYOUT_KEY}
        fallbackUrl="/"
      />
    </div>
  );
};

export default HomeAd;
