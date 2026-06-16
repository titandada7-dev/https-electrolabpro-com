import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    adsbygoogle: unknown[];
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Envía un evento a GA4 (gtag) y a dataLayer (GTM) si están disponibles,
 *  y emite un `console.warn` en producción para que quede traza en herramientas
 *  de monitoreo (Sentry, session replay, etc.). */
const trackAdEvent = (
  action: "ad_impression" | "ad_click" | "ad_unfilled" | "ad_blocked" | "ad_timeout" | "ad_error",
  slot: string,
  extra: Record<string, unknown> = {}
) => {
  if (typeof window === "undefined") return;
  const payload = {
    event_category: "adsense",
    event_label: slot,
    ad_slot: slot,
    ad_client: "ca-pub-9393284878747603",
    non_interaction: action !== "ad_click",
    page_path: typeof location !== "undefined" ? location.pathname : undefined,
    ...extra,
  };
  try {
    window.gtag?.("event", action, payload);
    (window.dataLayer = window.dataLayer || []).push({ event: action, ...payload });
    // Log estructurado para depuración en producción (session replay / Sentry).
    if (action === "ad_unfilled" || action === "ad_timeout" || action === "ad_blocked" || action === "ad_error") {
      // eslint-disable-next-line no-console
      console.warn(`[AdSense] ${action}`, payload);
    } else if (action === "ad_impression") {
      // eslint-disable-next-line no-console
      console.info(`[AdSense] ${action}`, payload);
    }
  } catch {
    /* tracking opcional, nunca debe romper el render */
  }
};

type AdStatus = "idle" | "loading" | "filled" | "timeout" | "blocked" | "error";

interface AdBannerProps {
  slot: string;
  format?: string;
  /** AdSense in-feed/in-article layout key (only when format="fluid"). */
  layoutKey?: string;
  /** AdSense layout preset (e.g. "in-article"). */
  layout?: string;
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
  layoutKey,
  layout,
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
        trackAdEvent("ad_error", slot, { ad_format: format, reason: "container_width_0" });
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
        trackAdEvent("ad_blocked", slot, { ad_format: format });
        return;
      }

      try {
        setStatus("loading");
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
        void hasScript;

        const startedAt = performance.now();
        fallbackTimer = window.setTimeout(() => {
          setStatus((prev) => {
            if (prev === "filled") return prev;
            setReason("Sin respuesta de AdSense en 6s (sin fill o bloqueado)");
            trackAdEvent("ad_timeout", slot, {
              ad_format: format,
              elapsed_ms: Math.round(performance.now() - startedAt),
              reason: "no_response_6s",
            });
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
              trackAdEvent("ad_impression", slot, { ad_format: format });
              return true;
            }
            if (adStatus === "unfilled") {
              setReason("AdSense respondió sin anuncio (unfilled)");
              setStatus("timeout");
              if (fallbackTimer) window.clearTimeout(fallbackTimer);
              trackAdEvent("ad_unfilled", slot, { ad_format: format });
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
        trackAdEvent("ad_error", slot, { ad_format: format, reason: msg });
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

    // Click-tracking proxy: cuando el usuario hace clic en un iframe de
    // AdSense, el iframe gana focus y `window` recibe `blur`. Si en ese
    // momento el activeElement es un iframe dentro de nuestro contenedor,
    // contamos el clic. Es la técnica estándar para anuncios cross-origin.
    const onBlur = () => {
      window.setTimeout(() => {
        const active = document.activeElement;
        if (
          active &&
          active.tagName === "IFRAME" &&
          el.contains(active)
        ) {
          trackAdEvent("ad_click", slot, { ad_format: format });
        }
      }, 0);
    };
    window.addEventListener("blur", onBlur);

    return () => {
      observer.disconnect();
      mo?.disconnect();
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      window.removeEventListener("blur", onBlur);
    };
  }, [slot, format]);

  // Si AdSense no respondió (timeout) o el script está bloqueado/falló,
  // ocultamos el <ins> para que no pelee con la altura reservada y dejamos
  // visible el placeholder. Así la caja conserva exactamente la altura
  // mínima en todos los breakpoints y no hay CLS.
  const failed = status === "timeout" || status === "blocked" || status === "error";

  return (
    <div
      ref={adRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        minHeight: `${mobileH}px`,
        // contain: layout evita que cualquier reflow del iframe interno
        // empuje contenido vecino mientras AdSense pinta.
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
        {!filled && (
          <div
            role={failed && showDiag ? "status" : undefined}
            aria-live={failed && showDiag ? "polite" : undefined}
            aria-hidden="true"
            className={`absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center rounded-md ${
              failed
                ? "bg-transparent border-0"
                : "bg-muted/20 border border-dashed border-border/30 animate-pulse"
            }`}
          >
            {failed ? (
              showDiag ? (
                <>
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground/70">
                    Anuncio no disponible
                  </span>
                  <span className="text-[10px] text-muted-foreground/50 max-w-[260px] leading-snug">
                    El espacio publicitario no se cargó.
                  </span>
                  {isInternalFallback ? (
                    <Link
                      to={resolvedFallback}
                      className="mt-1 text-[11px] font-mono text-primary/80 hover:text-primary underline underline-offset-2 transition-colors"
                    >
                      {fallbackLabel} →
                    </Link>
                  ) : (
                    <a
                      href={resolvedFallback}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-[11px] font-mono text-primary/80 hover:text-primary underline underline-offset-2 transition-colors"
                    >
                      {fallbackLabel} →
                    </a>
                  )}
                </>
              ) : null
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40">
                Publicidad
              </span>
            )}
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
            ...(layout === "in-article" ? { textAlign: "center" as const } : {}),
          }}
          data-ad-client="ca-pub-9393284878747603"
          data-ad-slot={slot}
          data-ad-format={format}
          {...(layout ? { "data-ad-layout": layout } : {})}
          {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
          {...(format === "fluid" ? {} : { "data-full-width-responsive": responsive ? "true" : "false" })}
        />
      </div>
    </div>
  );
};

export default AdBanner;
