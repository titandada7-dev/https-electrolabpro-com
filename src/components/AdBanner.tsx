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
  /**
   * URL de respaldo cuando el anuncio no carga (timeout / blocked / error).
   * Si se omite o el destino no es válido, se redirige a la página principal "/".
   */
  fallbackUrl?: string;
  /** Texto opcional del enlace de respaldo. */
  fallbackLabel?: string;
}

/** Garantiza una URL utilizable; si no es válida, devuelve "/" (home). */
const resolveFallbackUrl = (url?: string): string => {
  if (!url || typeof url !== "string") return "/";
  const trimmed = url.trim();
  if (!trimmed) return "/";
  // Rutas internas
  if (trimmed.startsWith("/")) return trimmed;
  // URLs absolutas: validar
  try {
    const u = new URL(trimmed);
    if (u.protocol === "http:" || u.protocol === "https:") return u.toString();
  } catch {
    /* inválida → fallback */
  }
  return "/";
};

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
  fallbackUrl,
  fallbackLabel = "Volver al inicio",
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [status, setStatus] = useState<AdStatus>("idle");
  const [reason, setReason] = useState<string>("");

  const showDiag = showDiagnostics ?? isDev;
  const filled = status === "filled";
  const resolvedFallback = resolveFallbackUrl(fallbackUrl);
  const isInternalFallback = resolvedFallback.startsWith("/");

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
            setReason("Sin respuesta de AdSense en 12s (sin fill o bloqueado)");
            return "timeout";
          });
        }, 12000);

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

  // Si AdSense no respondió (timeout) o el script está bloqueado/falló,
  // ocultamos el <ins> para que no pelee con la altura reservada y dejamos
  // visible el placeholder. Así la caja conserva exactamente la altura
  // mínima en todos los breakpoints y no hay CLS.
  const failed = status === "timeout" || status === "blocked" || status === "error";

  // En producción, si el anuncio no carga (timeout/blocked/error) colapsamos
  // la caja entera: sin altura mínima, sin borde, sin texto. Así no aparece
  // el cartel "Anuncio no disponible" molestando al usuario.
  // En modo debug (?debug=ads o localhost) mantenemos el contenedor visible
  // con el overlay de estado para poder diagnosticar.
  if (failed && !showDiag) {
    return <div ref={adRef} className={className} aria-hidden="true" />;
  }

  return (
    <div
      ref={adRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        minHeight: `${mobileH}px`,
        contain: "layout",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          [data-adbanner="${slot}"],
          [data-adbanner="${slot}"] > ins.adsbygoogle {
            min-height: ${desktopH}px;
          }
          [data-adbanner-wrap="${slot}"] {
            min-height: ${desktopH}px;
          }
        }
      `}</style>
      <div
        data-adbanner-wrap={slot}
        data-adbanner={slot}
        style={{ minHeight: `${mobileH}px`, position: "relative" }}
      >
        {!filled && !failed && (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center bg-muted/30 rounded-md border border-dashed border-border/40 animate-pulse"
          >
            <span className="text-xs font-mono text-muted-foreground/60">
              Publicidad
            </span>
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
          style={{
            display: failed ? "none" : "block",
            minHeight: `${mobileH}px`,
          }}
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
