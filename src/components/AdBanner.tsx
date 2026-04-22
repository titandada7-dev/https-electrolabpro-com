import { useEffect, useRef, useState } from "react";

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
  /** Reserved height on mobile (<768px) to prevent CLS. Default 100px. */
  minHeightMobile?: number;
  /** Reserved height on desktop (≥768px) to prevent CLS. Default 250px for vertical, 120px otherwise. */
  minHeightDesktop?: number;
}

const AdBanner = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  minHeightMobile,
  minHeightDesktop,
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [filled, setFilled] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  // Sensible defaults based on format to reserve space and avoid layout shift
  const mobileH = minHeightMobile ?? (format === "vertical" ? 250 : 100);
  const desktopH = minHeightDesktop ?? (format === "vertical" ? 600 : 120);

  useEffect(() => {
    if (pushed.current) return;

    const el = adRef.current;
    if (!el) return;

    let fallbackTimer: number | undefined;

    const tryPush = () => {
      if (pushed.current) return;
      if (el.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushed.current = true;

          // Fallback: if AdSense doesn't fill within 6s, switch to static placeholder
          fallbackTimer = window.setTimeout(() => {
            setTimedOut((prev) => (filled ? prev : true));
          }, 6000);

          const ins = el.querySelector("ins.adsbygoogle") as HTMLElement | null;
          if (ins) {
            const checkFilled = () => {
              const status = ins.getAttribute("data-ad-status");
              if (status === "filled") {
                setFilled(true);
                if (fallbackTimer) window.clearTimeout(fallbackTimer);
                return true;
              }
              return false;
            };
            if (!checkFilled()) {
              const mo = new MutationObserver(() => {
                if (checkFilled()) mo.disconnect();
              });
              mo.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
              setTimeout(() => mo.disconnect(), 6000);
            }
          }
        } catch (e) {
          setTimedOut(true);
        }
      }
    };

    // Lazy-loading: only push when banner is near the viewport (200px margin)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setTimeout(tryPush, 100);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "200px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, [filled]);

  return (
    <div
      ref={adRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        minHeight: `${mobileH}px`,
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          [data-adbanner="${slot}"] { min-height: ${desktopH}px; }
        }
      `}</style>
      <div data-adbanner={slot} style={{ minHeight: `${mobileH}px` }}>
        {!filled && (
          <div
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center bg-muted/30 rounded-md ${
              timedOut ? "" : "animate-pulse"
            }`}
          >
            <span className="text-xs font-mono text-muted-foreground/60">Publicidad</span>
          </div>
        )}
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: `${mobileH}px` }}
          data-ad-client="ca-pub-9393284878747603"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default AdBanner;
