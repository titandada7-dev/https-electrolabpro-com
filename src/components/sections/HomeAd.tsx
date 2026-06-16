import AdSenseSlot from "@/components/AdSenseSlot";

// Slot del banner superior (display responsive) — configurable vía .env.
const HEADER_SLOT = import.meta.env.VITE_ADSENSE_HEADER_SLOT || "4474857232";

const HomeAd = () => {
  return (
    <div className="border-t border-border">
      <AdSenseSlot slot={HEADER_SLOT} variant="header" fallbackUrl="/" />
    </div>
  );
};

export default HomeAd;
