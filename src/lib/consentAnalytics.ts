/**
 * Eventos de analítica relacionados con el consentimiento de cookies / AdSense.
 * Se envían a GA4 (gtag) y al dataLayer de GTM, y se loguean en consola para
 * facilitar la depuración en producción (session replay / Sentry).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __electrolab_ads_loaded_logged?: boolean;
  }
}

type ConsentSurface = "cookie_banner" | "adsense_banner";

type ConsentDecision = "accept_all" | "reject_all" | "custom";

export const trackConsentDecision = (
  surface: ConsentSurface,
  decision: ConsentDecision,
  extra: Record<string, unknown> = {}
) => {
  if (typeof window === "undefined") return;
  const payload = {
    event_category: "consent",
    event_label: `${surface}:${decision}`,
    consent_surface: surface,
    consent_decision: decision,
    non_interaction: false,
    page_path: typeof location !== "undefined" ? location.pathname : undefined,
    ...extra,
  };
  try {
    window.gtag?.("event", "consent_decision", payload);
    (window.dataLayer = window.dataLayer || []).push({
      event: "consent_decision",
      ...payload,
    });
    // eslint-disable-next-line no-console
    console.info(`[Consent] ${surface} → ${decision}`, payload);
  } catch {
    /* tracking opcional */
  }
};

/**
 * Se dispara una sola vez por sesión, cuando un anuncio se rellena tras
 * haber aceptado el consentimiento. Permite medir la latencia real entre
 * el "Aceptar" del usuario y el primer impression visible.
 */
export const trackAdsLoadedAfterConsent = (slot: string, elapsedMs?: number) => {
  if (typeof window === "undefined") return;
  if (window.__electrolab_ads_loaded_logged) return;
  window.__electrolab_ads_loaded_logged = true;
  const payload = {
    event_category: "adsense",
    event_label: "first_impression_after_consent",
    ad_slot: slot,
    elapsed_ms: elapsedMs,
    page_path: typeof location !== "undefined" ? location.pathname : undefined,
    non_interaction: true,
  };
  try {
    window.gtag?.("event", "ads_loaded_after_consent", payload);
    (window.dataLayer = window.dataLayer || []).push({
      event: "ads_loaded_after_consent",
      ...payload,
    });
    // eslint-disable-next-line no-console
    console.info("[AdSense] ads_loaded_after_consent", payload);
  } catch {
    /* noop */
  }
};

/**
 * Alerta global en consola cuando el script de pagead2 no carga
 * (bloqueado por adblocker, red, CSP, etc.). Una sola vez por sesión.
 */
export const logAdsenseScriptFailure = (reason: string) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as Record<string, boolean>;
  if (w[key]) return;
  w[key] = true;
  // eslint-disable-next-line no-console
  console.warn(
    `[AdSense] ⚠️ El script de Google AdSense no pudo cargarse (${reason}). ` +
      `Probable causa: bloqueador de anuncios, red restringida o CSP. ` +
      `Los slots mostrarán el placeholder de respaldo.`
  );
  try {
    window.gtag?.("event", "adsense_script_failure", {
      event_category: "adsense",
      event_label: reason,
      non_interaction: true,
    });
  } catch {
    /* noop */
  }
};
