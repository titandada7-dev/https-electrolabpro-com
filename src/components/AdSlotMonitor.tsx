import { useEffect, useState } from "react";
import {
  getAdsenseConsent,
  onAdsenseConsentChange,
  type ConsentState,
} from "@/lib/adsenseLoader";
import {
  onAdMetric,
  readAdMetrics,
  type AdMetricEvent,
  type SlotCounters,
} from "@/lib/adMetrics";

/**
 * Monitor flotante de diagnóstico para verificar la carga de un slot de AdSense
 * tras el consentimiento de cookies. Sólo visible cuando la URL contiene
 * `?debug=ads=1` (mismo gating que los overlays de AdBanner), o cuando se
 * activa manualmente con `localStorage.setItem("electrolab.ad-monitor","1")`.
 *
 * Por defecto monitoriza el slot `3756475501` (Banner_Principal_ElectroLab).
 */
const DEFAULT_SLOT = "3756475501";

const isMonitorEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  if (/[?&]debug=ads=(1|true)\b/.test(window.location.search)) return true;
  try {
    return window.localStorage.getItem("electrolab.ad-monitor") === "1";
  } catch {
    return false;
  }
};

const CONSENT_LABEL: Record<ConsentState, string> = {
  pending: "Pendiente",
  granted: "Aceptado",
  denied: "Rechazado",
};

const CONSENT_COLOR: Record<ConsentState, string> = {
  pending: "bg-amber-500/20 text-amber-200 border-amber-400/40",
  granted: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  denied: "bg-destructive/30 text-destructive-foreground border-destructive/50",
};

interface AdSlotMonitorProps {
  slot?: string;
}

const AdSlotMonitor = ({ slot = DEFAULT_SLOT }: AdSlotMonitorProps) => {
  const [enabled] = useState(isMonitorEnabled);
  const [consent, setConsent] = useState<ConsentState>(() =>
    typeof window === "undefined" ? "pending" : getAdsenseConsent()
  );
  const [counters, setCounters] = useState<SlotCounters | null>(null);
  const [lastEvent, setLastEvent] = useState<AdMetricEvent | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const { counters: all } = readAdMetrics();
    setCounters(all[slot] ?? null);

    const offMetric = onAdMetric((ev) => {
      if (!ev || ev.slot !== slot) return;
      setLastEvent(ev);
      const { counters: fresh } = readAdMetrics();
      setCounters(fresh[slot] ?? null);
    });
    const offConsent = onAdsenseConsentChange((state) => setConsent(state));
    return () => {
      offMetric();
      offConsent();
    };
  }, [enabled, slot]);

  if (!enabled) return null;

  const filled = (counters?.impression ?? 0) > 0;
  const failures =
    (counters?.timeout ?? 0) +
    (counters?.blocked ?? 0) +
    (counters?.error ?? 0) +
    (counters?.unfilled ?? 0);

  const statusLabel = filled
    ? "Cargado"
    : failures > 0
    ? "No cargó"
    : consent === "granted"
    ? "Esperando AdSense"
    : "Esperando consentimiento";

  const statusColor = filled
    ? "bg-emerald-500/25 text-emerald-100 border-emerald-400/50"
    : failures > 0
    ? "bg-destructive/30 text-destructive-foreground border-destructive/50"
    : consent === "granted"
    ? "bg-primary/25 text-primary-foreground border-primary/40"
    : "bg-amber-500/20 text-amber-200 border-amber-400/40";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-3 right-3 z-[9999] font-mono text-[11px] max-w-[280px] rounded-lg border border-border/60 bg-background/95 backdrop-blur shadow-lg"
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-muted/40 rounded-t-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${filled ? "bg-emerald-400" : failures > 0 ? "bg-destructive" : "bg-amber-400 animate-pulse"}`} />
          <span className="font-semibold text-foreground">
            Monitor ad:{slot.slice(-4)}
          </span>
        </span>
        <span className="text-muted-foreground">{collapsed ? "▸" : "▾"}</span>
      </button>

      {!collapsed && (
        <div className="px-3 pb-3 pt-1 space-y-2 border-t border-border/40">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Consentimiento</span>
            <span className={`px-1.5 py-0.5 rounded border ${CONSENT_COLOR[consent]}`}>
              {CONSENT_LABEL[consent]}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Estado slot</span>
            <span className={`px-1.5 py-0.5 rounded border ${statusColor}`}>
              {statusLabel}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 text-center pt-1">
            <div className="rounded bg-emerald-500/10 px-1 py-1 border border-emerald-400/30">
              <div className="text-emerald-200 font-semibold">{counters?.impression ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Imp.</div>
            </div>
            <div className="rounded bg-primary/10 px-1 py-1 border border-primary/30">
              <div className="text-primary font-semibold">{counters?.click ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Clicks</div>
            </div>
            <div className="rounded bg-destructive/10 px-1 py-1 border border-destructive/30">
              <div className="text-destructive-foreground font-semibold">{failures}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Fallos</div>
            </div>
          </div>

          {lastEvent && (
            <div className="text-[10px] text-muted-foreground leading-snug pt-1 border-t border-border/30">
              <div>
                <span className="text-foreground/80">Último:</span> {lastEvent.action}
                {typeof lastEvent.elapsed_ms === "number" && (
                  <span className="text-muted-foreground"> · {lastEvent.elapsed_ms}ms</span>
                )}
              </div>
              {lastEvent.reason && (
                <div className="truncate" title={lastEvent.reason}>
                  <span className="text-foreground/80">Motivo:</span> {lastEvent.reason}
                </div>
              )}
            </div>
          )}

          <div className="text-[9px] text-muted-foreground/70 pt-1 leading-snug">
            Slot {slot} · pub-9393284878747603
          </div>
        </div>
      )}
    </div>
  );
};

export default AdSlotMonitor;
