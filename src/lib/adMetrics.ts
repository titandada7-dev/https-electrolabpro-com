/**
 * Métricas locales de AdSense persistidas en localStorage.
 * Se actualizan desde AdBanner emitiendo CustomEvent("ad-metric")
 * y son consumidas por /admin/ads en tiempo real.
 */

export type AdMetricAction =
  | "ad_impression"
  | "ad_click"
  | "ad_unfilled"
  | "ad_blocked"
  | "ad_timeout"
  | "ad_error";

export interface AdMetricEvent {
  slot: string;
  action: AdMetricAction;
  ts: number;
  reason?: string;
  elapsed_ms?: number;
}

export interface SlotCounters {
  impression: number;
  click: number;
  unfilled: number;
  blocked: number;
  timeout: number;
  error: number;
  lastTs?: number;
  lastReason?: string;
}

const STORAGE_KEY = "electrolab.ad-metrics.v1";
const EVENT_NAME = "ad-metric";
const MAX_EVENTS = 200;

interface StoredState {
  events: AdMetricEvent[];
  counters: Record<string, SlotCounters>;
}

const emptyCounters = (): SlotCounters => ({
  impression: 0,
  click: 0,
  unfilled: 0,
  blocked: 0,
  timeout: 0,
  error: 0,
});

export const readAdMetrics = (): StoredState => {
  if (typeof window === "undefined") return { events: [], counters: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { events: [], counters: {} };
    const parsed = JSON.parse(raw) as StoredState;
    return {
      events: Array.isArray(parsed.events) ? parsed.events : [],
      counters: parsed.counters && typeof parsed.counters === "object" ? parsed.counters : {},
    };
  } catch {
    return { events: [], counters: {} };
  }
};

const writeAdMetrics = (state: StoredState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota: silencioso */
  }
};

export const recordAdMetric = (ev: AdMetricEvent) => {
  if (typeof window === "undefined") return;
  const state = readAdMetrics();
  const counters = { ...state.counters };
  const c = { ...(counters[ev.slot] ?? emptyCounters()) };
  switch (ev.action) {
    case "ad_impression": c.impression += 1; break;
    case "ad_click":      c.click += 1; break;
    case "ad_unfilled":   c.unfilled += 1; break;
    case "ad_blocked":    c.blocked += 1; break;
    case "ad_timeout":    c.timeout += 1; break;
    case "ad_error":      c.error += 1; break;
  }
  c.lastTs = ev.ts;
  if (ev.reason) c.lastReason = ev.reason;
  counters[ev.slot] = c;

  const events = [...state.events, ev].slice(-MAX_EVENTS);
  writeAdMetrics({ events, counters });

  try {
    window.dispatchEvent(new CustomEvent<AdMetricEvent>(EVENT_NAME, { detail: ev }));
  } catch {
    /* noop */
  }
};

export const clearAdMetrics = () => {
  if (typeof window === "undefined") return;
  writeAdMetrics({ events: [], counters: {} });
  try {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
  } catch {
    /* noop */
  }
};

export const onAdMetric = (cb: (ev: AdMetricEvent | null) => void): (() => void) => {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<AdMetricEvent | null>).detail ?? null);
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
};

/** Detecta si la URL actual activa el modo prueba de AdSense (?adstest=1). */
export const isAdsTestMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return /[?&]adstest=(1|true)\b/.test(window.location.search);
};
