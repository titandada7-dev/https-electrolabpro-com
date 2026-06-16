/**
 * Carga diferida del script de Google AdSense.
 *
 * - El <script> de pagead2 NO se incluye en index.html.
 * - Solo se inyecta cuando el usuario otorga consentimiento ("granted")
 *   Y un AdBanner entra cerca del viewport (IntersectionObserver).
 * - Estado persistido en localStorage["adsense-consent"] = "granted" | "denied".
 * - Notificación de cambios vía CustomEvent "adsense-consent-changed".
 */

const SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9393284878747603";
const CONSENT_KEY = "adsense-consent";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export type ConsentState = "granted" | "denied" | "pending";

let loadingPromise: Promise<void> | null = null;

export const getAdsenseConsent = (): ConsentState => {
  if (typeof window === "undefined") return "pending";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    if (v === "granted") return "granted";
    if (v === "denied") return "denied";
  } catch {
    /* storage no disponible */
  }
  return "pending";
};

export const setAdsenseConsent = (state: "granted" | "denied") => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, state);
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(
      new CustomEvent("adsense-consent-changed", { detail: state })
    );
  } catch {
    /* ignore */
  }
};

export const onAdsenseConsentChange = (
  handler: (state: ConsentState) => void
): (() => void) => {
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<ConsentState>).detail;
    handler(detail ?? getAdsenseConsent());
  };
  window.addEventListener("adsense-consent-changed", listener);
  return () => window.removeEventListener("adsense-consent-changed", listener);
};

/**
 * Inyecta el script de AdSense si todavía no está presente.
 * Solo resuelve cuando hay consentimiento "granted".
 */
export const loadAdsense = (): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("ssr"));
  }
  if (getAdsenseConsent() !== "granted") {
    return Promise.reject(new Error("consent_required"));
  }
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(
      'script[data-adsense-loader="1"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      if (window.adsbygoogle) return resolve();
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("script_error")),
        { once: true }
      );
      return;
    }
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = SRC;
    s.dataset.adsenseLoader = "1";
    s.onload = () => {
      window.adsbygoogle = window.adsbygoogle || [];
      resolve();
    };
    s.onerror = () => {
      loadingPromise = null;
      reject(new Error("script_error"));
    };
    document.head.appendChild(s);
  });
  return loadingPromise;
};
