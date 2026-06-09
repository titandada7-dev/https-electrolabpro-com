import AdBanner from "./AdBanner";

interface AdBannerDiscreteProps {
  slot: string;
  format?: string;
  className?: string;
  /** URL de respaldo si el anuncio no carga. Default: "/" (home). */
  fallbackUrl?: string;
}

const AdBannerDiscrete = ({
  slot,
  format = "auto",
  className = "",
  fallbackUrl = "/",
}: AdBannerDiscreteProps) => {
  return (
    <div className={`w-full py-6 ${className}`}>
      <div className="rounded-md border border-border/40 bg-muted/20 p-3">
        <p className="text-[9px] text-muted-foreground/35 uppercase tracking-[0.2em] font-mono mb-2 text-center select-none">
          Publicidad
        </p>
        <AdBanner slot={slot} format={format} />
      </div>
    </div>
  );
};

export default AdBannerDiscrete;
