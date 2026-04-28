import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdStatus = "idle" | "loading" | "filled" | "timeout" | "blocked" | "error";

interface AdBannerProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  /** Reserved height on mobile (<768px) to prevent CLS. Default 100px. */
  minHeightMobile?: number;
  /** Reserved height on desktop (≥768px) to prevent CLS. */
  minHeightDesktop?: number;
  /** Show diagnostic overlay (loading/filled/timeout/blocked + reason). Defaults to dev only. */
  showDiagnostics?: boolean;
}

const STATUS_LABEL: Record<AdStatus, string> = {
  idle: "Esperando viewport",
  loading: "Cargando…",
  filled: "Anuncio cargado",
  timeout: "Timeout (>6s)",
  blocked: "Bloqueado / sin script",
  error: "Error",
};

const STATUS_COLOR: Record<AdStatus, string> = {
  idle: "bg-muted text-muted-foreground",
  loading: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  filled: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  timeout: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  blocked: "bg-red-500/20 text-red-700 dark:text-red-300",
  error: "bg-red-500/20 text-red-700 dark:text-red-300",
};

const isDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname.includes("lovableproject.com") ||
    window.location.hostname.includes("lovable.app") ||
    window.location.search.includes("debug=ads"));

const AdBanner = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  minHeightMobile,
  minHeightDesktop,
  showDiagnostics,
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [status, setStatus] = useState<AdStatus>("idle");
  const [reason, setReason] = useState<string>("");

  const showDiag = showDiagnostics ?? isDev;
  const filled = status === "filled";
  const timedOut = status === "timeout";

  const mobileH = minHeightMobile ?? (format === "vertical" ? 250 : 100);
  const desktopH = minHeightDesktop ?? (format === "vertical" ? 600 : 120);

  useEffect(() => {
    if (pushed.current) return;
    const el = adRef.current;
    if (!el) return;

    let fallbackTimer: number | undefined;
    let mo: MutationObserver | undefined;

    const tryPush = () => {
      if (pushed.current) return;
      if (el.offsetWidth === 0) {
        setReason("Contenedor con ancho 0");
        setStatus("error");
        return;
      }

      // Detect AdSense script presence
      const hasScript =
        typeof window !== "undefined" &&
        Array.isArray(window.adsbygoogle) === false
          ? !!window.adsbygoogle
          : true;

      if (typeof window === "undefined" || !window.adsbygoogle) {
        setReason("Script adsbygoogle no disponible (posible AdBlock)");
        setStatus("blocked");
        return;
      }

      try {
        setStatus("loading");
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
        void hasScript;

        fallbackTimer = window.setTimeout(() => {
          setStatus((prev) => {
            if (prev === "filled") return prev;
            setReason("Sin respuesta de AdSense en 6s (sin fill o bloqueado)");
            return "timeout";
          });
        }, 6000);

        const ins = el.querySelector("ins.adsbygoogle") as HTMLElement | null;
        if (ins) {
          const checkFilled = () => {
            const adStatus = ins.getAttribute("data-ad-status");
            if (adStatus === "filled") {
              setStatus("filled");
              setReason("");
              if (fallbackTimer) window.clearTimeout(fallbackTimer);
              return true;
            }
            if (adStatus === "unfilled") {
              setReason("AdSense respondió sin anuncio (unfilled)");
              setStatus("timeout");
              return true;
            }
            return false;
          };
          if (!checkFilled()) {
            mo = new MutationObserver(() => {
              if (checkFilled()) mo?.disconnect();
            });
            mo.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
          }
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setReason(msg);
        setStatus("error");
      }
    };

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
      mo?.disconnect();
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={adRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ minHeight: `${mobileH}px` }}
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
              timedOut || status === "blocked" || status === "error" ? "" : "animate-pulse"
            }`}
          >
            <span className="text-xs font-mono text-muted-foreground/60">Publicidad</span>
          </div>
        )}

        {showDiag && (
          <div
            className={`absolute top-1 right-1 z-10 text-[10px] font-mono px-2 py-1 rounded shadow-sm border border-border/50 ${STATUS_COLOR[status]}`}
            title={reason || STATUS_LABEL[status]}
          >
            <span className="font-semibold">ad:{slot.slice(-4)}</span>{" "}
            <span>{STATUS_LABEL[status]}</span>
            {reason && <span className="hidden md:inline"> · {reason}</span>}
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
