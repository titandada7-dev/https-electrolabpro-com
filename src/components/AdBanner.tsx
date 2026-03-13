import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

const AdBanner = ({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;

    const el = adRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width ?? 0;
      if (width > 0 && !pushed.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushed.current = true;
        } catch (e) {
          console.error("AdSense error:", e);
        }
        observer.disconnect();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={adRef} className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9393284878747603"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
