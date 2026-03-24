import AdBanner from "./AdBanner";

interface AdBannerDiscreteProps {
  slot: string;
  format?: string;
  className?: string;
}

const AdBannerDiscrete = ({ slot, format = "auto", className = "" }: AdBannerDiscreteProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="border-t border-border/30 pt-3">
        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest font-mono mb-2 text-center">
          Publicidad
        </p>
        <AdBanner slot={slot} format={format} />
      </div>
      <div className="border-b border-border/30 mt-3" />
    </div>
  );
};

export default AdBannerDiscrete;
