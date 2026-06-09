import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CheckStatus = "pending" | "ok" | "redirect" | "error";

interface VersionInfo {
  buildId?: string;
  buildTime?: string;
  name?: string;
  env?: string;
}

interface UrlCheck {
  url: string;
  label: string;
  status: CheckStatus;
  httpStatus?: number;
  finalUrl?: string;
  redirected?: boolean;
  cache?: string;
  cacheClass?: "hit" | "miss" | "dynamic" | "unknown";
  ms?: number;
  error?: string;
  version?: VersionInfo;
  versionAgeMs?: number;
  freshness?: "current" | "stale" | "unknown";
  checkedAt?: string;
}

const TARGETS: { url: string; label: string; key: string }[] = [
  { key: "apex", url: "https://electrolabpro.com", label: "Dominio principal (apex)" },
  { key: "www", url: "https://www.electrolabpro.com", label: "WWW" },
  { key: "lovable", url: "https://ww-electrolabpro-com.lovable.app", label: "Lovable Published" },
];

const INTERVALS = [
  { label: "15s", value: 15000 },
  { label: "30s", value: 30000 },
  { label: "60s", value: 60000 },
];

const CANONICAL_KEY = "electrolab.canonicalDomain";
const CANONICAL_OPTIONS = [
  { key: "off", label: "Desactivado", host: "" },
  { key: "apex", label: "electrolabpro.com", host: "electrolabpro.com" },
  { key: "www", label: "www.electrolabpro.com", host: "www.electrolabpro.com" },
];

const HISTORY_KEY = "electrolab.domainHistory";
const HISTORY_MAX = 20;

interface HistorySnapshot {
  ts: string;
  hosts: Record<
    string,
    {
      buildId?: string;
      cacheClass?: UrlCheck["cacheClass"];
      freshness?: UrlCheck["freshness"];
      httpStatus?: number;
    }
  >;
}

interface AlertItem {
  id: string;
  ts: string;
  level: "warn" | "critical";
  message: string;
}

const LOCAL_BUILD_ID =
  typeof __BUILD_ID__ !== "undefined" ? __BUILD_ID__ : "dev-runtime";
const LOCAL_BUILD_TIME =
  typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : new Date().toISOString();

function detectVersion() {
  const host = window.location.hostname;
  if (host.includes("id-preview--")) return { kind: "Preview", color: "bg-amber-500" };
  if (host.includes("lovableproject.com")) return { kind: "Preview Sandbox", color: "bg-amber-500" };
  if (host.includes("lovable.app")) return { kind: "Published (lovable.app)", color: "bg-blue-500" };
  if (host === "electrolabpro.com") return { kind: "Custom Domain (apex)", color: "bg-emerald-500" };
  if (host === "www.electrolabpro.com") return { kind: "Custom Domain (www)", color: "bg-emerald-500" };
  return { kind: `Desconocido (${host})`, color: "bg-slate-500" };
}

function classifyCache(raw: string | null): { label: string; cls: UrlCheck["cacheClass"] } {
  if (!raw) return { label: "n/a", cls: "unknown" };
  const v = raw.toLowerCase();
  if (v.includes("hit")) return { label: raw, cls: "hit" };
  if (v.includes("miss")) return { label: raw, cls: "miss" };
  if (v.includes("dynamic") || v.includes("bypass") || v.includes("expired"))
    return { label: raw, cls: "dynamic" };
  return { label: raw, cls: "unknown" };
}

// Canonical redirect (executed once at module load via component effect)
function applyCanonicalRedirect() {
  try {
    const target = localStorage.getItem(CANONICAL_KEY);
    if (!target) return;
    const opt = CANONICAL_OPTIONS.find((o) => o.key === target);
    if (!opt || !opt.host) return;
    const host = window.location.hostname;
    // Never redirect from preview/lovable.app envs to avoid breaking dev
    if (host.includes("lovable.app") || host.includes("lovableproject.com")) return;
    if (host === opt.host) return;
    // Only redirect if currently on the other custom-domain variant
    if (host === "electrolabpro.com" || host === "www.electrolabpro.com") {
      const url = new URL(window.location.href);
      url.hostname = opt.host;
      window.location.replace(url.toString());
    }
  } catch {
    // ignore
  }
}

const DomainDebugBanner = () => {
  const [enabled, setEnabled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [intervalMs, setIntervalMs] = useState(15000);
  const [checks, setChecks] = useState<UrlCheck[]>(
    TARGETS.map((t) => ({ ...t, status: "pending" as CheckStatus }))
  );
  const [canonical, setCanonical] = useState<string>(() => {
    try {
      return localStorage.getItem(CANONICAL_KEY) || "off";
    } catch {
      return "off";
    }
  });
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [history, setHistory] = useState<HistorySnapshot[]>(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? (JSON.parse(raw) as HistorySnapshot[]) : [];
    } catch {
      return [];
    }
  });
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  const missStreakRef = useRef<Record<string, number>>({});
  const lastAlertSigRef = useRef<string>("");

  // Apply canonical redirect on mount
  useEffect(() => {
    applyCanonicalRedirect();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "domains") setEnabled(true);
  }, []);

  const version = useMemo(detectVersion, []);

  const runChecks = useCallback(async () => {
    setRunning(true);
    const results = await Promise.all(
      TARGETS.map(async (t): Promise<UrlCheck> => {
        const start = performance.now();
        const checkedAt = new Date().toISOString();
        try {
          const probe = `?_probe=${Date.now()}`;
          const [pageRes, versionRes] = await Promise.allSettled([
            fetch(t.url + "/" + probe, {
              method: "GET",
              redirect: "follow",
              cache: "no-store",
              mode: "cors",
            }),
            fetch(t.url + "/version.json" + probe, {
              method: "GET",
              redirect: "follow",
              cache: "no-store",
              mode: "cors",
            }),
          ]);
          const ms = Math.round(performance.now() - start);

          let httpStatus: number | undefined;
          let finalUrl: string | undefined;
          let redirected = false;
          let cacheRaw: string | null = null;
          if (pageRes.status === "fulfilled") {
            httpStatus = pageRes.value.status;
            finalUrl = pageRes.value.url;
            redirected = pageRes.value.redirected;
            cacheRaw =
              pageRes.value.headers.get("cf-cache-status") ||
              pageRes.value.headers.get("x-cache") ||
              pageRes.value.headers.get("age") ? `age=${pageRes.value.headers.get("age")}` : null;
          }

          let version: VersionInfo | undefined;
          let versionAgeMs: number | undefined;
          if (versionRes.status === "fulfilled" && versionRes.value.ok) {
            try {
              version = await versionRes.value.json();
              if (version?.buildTime) {
                versionAgeMs = Date.now() - new Date(version.buildTime).getTime();
              }
            } catch {
              // not JSON
            }
          }

          const { label: cacheLabel, cls: cacheClass } = classifyCache(cacheRaw);

          return {
            ...t,
            status: redirected ? "redirect" : pageRes.status === "fulfilled" ? "ok" : "error",
            httpStatus,
            finalUrl,
            redirected,
            cache: cacheLabel,
            cacheClass,
            ms,
            version,
            versionAgeMs,
            checkedAt,
          };
        } catch (e: unknown) {
          const ms = Math.round(performance.now() - start);
          const message = e instanceof Error ? e.message : "fetch failed (posible CORS)";
          return {
            ...t,
            status: "error",
            error: message,
            ms,
            checkedAt,
          };
        }
      })
    );

    // Compute freshness: newest buildTime is "current"; >5 min older is "stale"
    const times = results
      .map((r) => (r.version?.buildTime ? new Date(r.version.buildTime).getTime() : null))
      .filter((t): t is number => !!t);
    const newest = times.length ? Math.max(...times) : null;
    const annotated = results.map((r): UrlCheck => {
      if (!r.version?.buildTime || !newest) return { ...r, freshness: "unknown" };
      const t = new Date(r.version.buildTime).getTime();
      if (newest - t > 5 * 60 * 1000) return { ...r, freshness: "stale" };
      return { ...r, freshness: "current" };
    });
    setChecks(annotated);

    // ----- Historial -----
    const snapshot: HistorySnapshot = {
      ts: new Date().toISOString(),
      hosts: Object.fromEntries(
        annotated.map((r) => {
          const key = TARGETS.find((t) => t.url === r.url)?.key || r.url;
          return [
            key,
            {
              buildId: r.version?.buildId,
              cacheClass: r.cacheClass,
              freshness: r.freshness,
              httpStatus: r.httpStatus,
            },
          ];
        })
      ),
    };
    setHistory((prev) => {
      const next = [...prev, snapshot].slice(-HISTORY_MAX);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        // ignore quota
      }
      return next;
    });

    // ----- Alertas -----
    const newAlerts: AlertItem[] = [];
    const apex = annotated.find((r) => r.url.includes("//electrolabpro.com"));
    const www = annotated.find((r) => r.url.includes("//www.electrolabpro.com"));
    if (apex?.version?.buildTime && www?.version?.buildTime) {
      const diff = Math.abs(
        new Date(apex.version.buildTime).getTime() -
          new Date(www.version.buildTime).getTime()
      );
      if (diff > 5 * 60 * 1000) {
        newAlerts.push({
          id: `drift-${Date.now()}`,
          ts: new Date().toISOString(),
          level: "critical",
          message: `Drift de ${Math.round(diff / 60000)} min entre apex (${apex.version.buildId}) y www (${www.version.buildId}).`,
        });
      }
    }
    annotated.forEach((r) => {
      const k = TARGETS.find((t) => t.url === r.url)?.key || r.url;
      if (r.cacheClass === "miss" || r.cacheClass === "dynamic") {
        missStreakRef.current[k] = (missStreakRef.current[k] || 0) + 1;
        if (missStreakRef.current[k] >= 3) {
          newAlerts.push({
            id: `miss-${k}-${Date.now()}`,
            ts: new Date().toISOString(),
            level: "warn",
            message: `${r.label}: ${missStreakRef.current[k]} chequeos seguidos con cache ${r.cacheClass}.`,
          });
        }
      } else if (r.cacheClass === "hit") {
        missStreakRef.current[k] = 0;
      }
    });

    if (newAlerts.length) {
      const sig = newAlerts.map((a) => a.message).join("|");
      if (sig !== lastAlertSigRef.current) {
        lastAlertSigRef.current = sig;
        setAlerts((prev) => [...newAlerts, ...prev].slice(0, 10));
        if (soundOn) {
          try {
            const w = window as Window & { webkitAudioContext?: typeof AudioContext };
            const AudioCtx = window.AudioContext || w.webkitAudioContext;
            if (!AudioCtx) throw new Error("no AudioContext");
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = newAlerts.some((a) => a.level === "critical")
              ? 880
              : 540;
            gain.gain.value = 0.05;
            osc.connect(gain).connect(ctx.destination);
            osc.start();
            setTimeout(() => {
              osc.stop();
              ctx.close();
            }, 250);
          } catch {
            // audio blocked
          }
        }
      }
    }

    setRunning(false);
  }, [soundOn]);

  // (Re)schedule polling
  useEffect(() => {
    if (!enabled) return;
    runChecks();
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(runChecks, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [enabled, intervalMs, runChecks]);

  const updateCanonical = (key: string) => {
    setCanonical(key);
    try {
      if (key === "off") localStorage.removeItem(CANONICAL_KEY);
      else localStorage.setItem(CANONICAL_KEY, key);
    } catch {
      // ignore
    }
  };

  const exportReport = (fmt: "json" | "csv" | "html") => {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const payload = {
      generatedAt: new Date().toISOString(),
      currentHost: window.location.href,
      detectedVersion: version.kind,
      localBuild: { buildId: LOCAL_BUILD_ID, buildTime: LOCAL_BUILD_TIME },
      intervalMs,
      canonical,
      checks,
    };
    let blob: Blob;
    let filename: string;
    if (fmt === "json") {
      blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      filename = `domain-report-${ts}.json`;
    } else if (fmt === "csv") {
      const headers = [
        "label",
        "url",
        "status",
        "httpStatus",
        "redirected",
        "finalUrl",
        "ms",
        "cache",
        "cacheClass",
        "buildId",
        "buildTime",
        "freshness",
        "error",
        "checkedAt",
      ];
      const rows = checks.map((c) =>
        [
          c.label,
          c.url,
          c.status,
          c.httpStatus ?? "",
          c.redirected ?? "",
          c.finalUrl ?? "",
          c.ms ?? "",
          c.cache ?? "",
          c.cacheClass ?? "",
          c.version?.buildId ?? "",
          c.version?.buildTime ?? "",
          c.freshness ?? "",
          (c.error ?? "").replace(/[\r\n,]/g, " "),
          c.checkedAt ?? "",
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      );
      blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv" });
      filename = `domain-report-${ts}.csv`;
    } else {
      const rows = checks
        .map(
          (c) => `<tr>
            <td>${c.label}</td><td>${c.url}</td><td>${c.status}</td>
            <td>${c.httpStatus ?? ""}</td><td>${c.redirected ? "yes" : ""}</td>
            <td>${c.finalUrl ?? ""}</td><td>${c.ms ?? ""}ms</td>
            <td>${c.cache ?? ""}</td><td>${c.cacheClass ?? ""}</td>
            <td>${c.version?.buildId ?? ""}</td><td>${c.version?.buildTime ?? ""}</td>
            <td>${c.freshness ?? ""}</td><td>${c.error ?? ""}</td>
          </tr>`
        )
        .join("");
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>ElectroLab Domain Report ${ts}</title>
        <style>body{font-family:system-ui,sans-serif;padding:24px;background:#0f172a;color:#e2e8f0}
        table{border-collapse:collapse;width:100%;font-size:12px}
        th,td{border:1px solid #334155;padding:6px;text-align:left;vertical-align:top}
        th{background:#1e293b}</style></head><body>
        <h1>ElectroLab Pro · Reporte de dominios</h1>
        <p>Generado: ${new Date().toISOString()}<br>Host: ${window.location.href}<br>Versión local: ${LOCAL_BUILD_ID} (${LOCAL_BUILD_TIME})</p>
        <table><thead><tr>
          <th>Label</th><th>URL</th><th>Status</th><th>HTTP</th><th>Redir</th><th>Final URL</th>
          <th>ms</th><th>Cache</th><th>Class</th><th>BuildId</th><th>BuildTime</th><th>Freshness</th><th>Error</th>
        </tr></thead><tbody>${rows}</tbody></table></body></html>`;
      blob = new Blob([html], { type: "text/html" });
      filename = `domain-report-${ts}.html`;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const purgeAndReload = async () => {
    try {
      // localStorage (preservar config crítica del banner)
      const keep: Record<string, string | null> = {
        [CANONICAL_KEY]: localStorage.getItem(CANONICAL_KEY),
      };
      localStorage.clear();
      Object.entries(keep).forEach(([k, v]) => v && localStorage.setItem(k, v));
      sessionStorage.clear();
    } catch {
      // ignore
    }
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch {
      // ignore
    }
    const opt = CANONICAL_OPTIONS.find((o) => o.key === canonical);
    const target =
      opt && opt.host
        ? `https://${opt.host}${window.location.pathname}${window.location.search}`
        : window.location.href;
    const url = new URL(target);
    url.searchParams.set("_purge", Date.now().toString());
    window.location.replace(url.toString());
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // ignore
    }
  };

  const dismissAlert = (id: string) =>
    setAlerts((prev) => prev.filter((a) => a.id !== id));

  if (!enabled) return null;

  const dot = (s: CheckStatus) =>
    ({
      pending: "bg-slate-400 animate-pulse",
      ok: "bg-emerald-500",
      redirect: "bg-amber-500",
      error: "bg-red-500",
    }[s]);

  const cacheBadge = (cls: UrlCheck["cacheClass"]) => {
    const map: Record<string, string> = {
      hit: "bg-emerald-700 text-emerald-100",
      miss: "bg-amber-700 text-amber-100",
      dynamic: "bg-blue-700 text-blue-100",
      unknown: "bg-slate-700 text-slate-200",
    };
    return map[cls || "unknown"];
  };

  const freshnessBadge = (f: UrlCheck["freshness"]) => {
    const map: Record<string, string> = {
      current: "bg-emerald-700 text-emerald-100",
      stale: "bg-red-700 text-red-100",
      unknown: "bg-slate-700 text-slate-200",
    };
    return map[f || "unknown"];
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-[9999] max-w-md w-[calc(100%-2rem)] rounded-lg border bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur text-xs font-mono ${
        alerts.some((a) => a.level === "critical")
          ? "border-red-500 ring-2 ring-red-500/50 animate-pulse"
          : alerts.length
          ? "border-amber-500"
          : "border-slate-700"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${version.color}`} />
          <span className="font-semibold">Domain Debug</span>
          {alerts.length > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px]">
              {alerts.length} alerta{alerts.length > 1 ? "s" : ""}
            </span>
          )}
          <span className="text-slate-400">· {version.kind}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-slate-400 hover:text-white px-1"
            aria-label="Toggle"
          >
            {collapsed ? "▢" : "—"}
          </button>
          <button
            onClick={() => setEnabled(false)}
            className="text-slate-400 hover:text-white px-1"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-3 max-h-[70vh] overflow-auto">
          {/* Build local */}
          <div className="space-y-1">
            <div className="text-slate-400">Host actual:</div>
            <div className="text-emerald-400 break-all">{window.location.href}</div>
            <div className="text-slate-400 mt-1">
              Build local: <span className="text-slate-200">{LOCAL_BUILD_ID}</span>
            </div>
            <div className="text-slate-500">{LOCAL_BUILD_TIME}</div>
          </div>

          {/* Controles */}
          <div className="border-t border-slate-700 pt-2 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={runChecks}
                disabled={running}
                className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white"
              >
                {running ? "Chequeando…" : "↻ Rechequear ahora"}
              </button>
              <label className="text-slate-400">Intervalo:</label>
              <select
                value={intervalMs}
                onChange={(e) => setIntervalMs(Number(e.target.value))}
                className="bg-slate-800 border border-slate-600 rounded px-2 py-1"
              >
                {INTERVALS.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-slate-400">Canónico:</label>
              <select
                value={canonical}
                onChange={(e) => updateCanonical(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded px-2 py-1"
              >
                {CANONICAL_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            {canonical !== "off" && (
              <>
                <div className="text-amber-300">
                  ⚠ Redirect cliente activo a{" "}
                  <span className="font-bold">
                    {CANONICAL_OPTIONS.find((o) => o.key === canonical)?.host}
                  </span>
                  . Solo aplica entre apex/www; no afecta a lovable.app/preview.
                </div>
                <button
                  onClick={purgeAndReload}
                  className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white"
                >
                  ⟳ Purgar caché + recargar canónico
                </button>
              </>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <label className="flex items-center gap-1 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundOn}
                  onChange={(e) => setSoundOn(e.target.checked)}
                />
                🔔 Sonido en alertas
              </label>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400">Exportar:</span>
              <button
                onClick={() => exportReport("json")}
                className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600"
              >
                JSON
              </button>
              <button
                onClick={() => exportReport("csv")}
                className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600"
              >
                CSV
              </button>
              <button
                onClick={() => exportReport("html")}
                className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600"
              >
                HTML
              </button>
            </div>
          </div>

          {/* Alertas */}
          {alerts.length > 0 && (
            <div className="border-t border-slate-700 pt-2">
              <div className="text-slate-300 font-semibold mb-2">⚠ Alertas activas</div>
              <ul className="space-y-1">
                {alerts.map((a) => (
                  <li
                    key={a.id}
                    className={`rounded border p-2 flex items-start gap-2 ${
                      a.level === "critical"
                        ? "border-red-500 bg-red-950/40 text-red-200"
                        : "border-amber-500 bg-amber-950/30 text-amber-200"
                    }`}
                  >
                    <div className="flex-1">
                      <div>{a.message}</div>
                      <div className="text-[10px] opacity-70">{a.ts}</div>
                    </div>
                    <button
                      onClick={() => dismissAlert(a.id)}
                      className="opacity-70 hover:opacity-100"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mini-timeline historial */}
          <div className="border-t border-slate-700 pt-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-slate-300 font-semibold">
                Historial ({history.length}/{HISTORY_MAX})
              </div>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  limpiar
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="text-slate-500">Sin chequeos previos.</div>
            ) : (
              <div className="space-y-1">
                {TARGETS.map((t) => {
                  let prevBuild: string | undefined;
                  return (
                    <div key={t.key} className="flex items-center gap-1">
                      <span className="text-slate-400 w-20 truncate" title={t.label}>
                        {t.key}
                      </span>
                      <div className="flex gap-0.5 flex-1">
                        {history.map((h, idx) => {
                          const cell = h.hosts[t.key];
                          const buildChanged =
                            cell?.buildId &&
                            prevBuild !== undefined &&
                            cell.buildId !== prevBuild;
                          if (cell?.buildId) prevBuild = cell.buildId;
                          const color =
                            cell?.cacheClass === "hit"
                              ? "bg-emerald-500"
                              : cell?.cacheClass === "miss"
                              ? "bg-amber-500"
                              : cell?.cacheClass === "dynamic"
                              ? "bg-blue-500"
                              : cell?.httpStatus
                              ? "bg-slate-500"
                              : "bg-slate-700";
                          return (
                            <div
                              key={idx}
                              title={`${h.ts}\nbuild: ${cell?.buildId || "?"}\ncache: ${cell?.cacheClass || "?"}\nHTTP: ${cell?.httpStatus || "?"}`}
                              className={`flex-1 h-3 ${color} ${
                                buildChanged ? "ring-2 ring-fuchsia-400" : ""
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="text-[10px] text-slate-500 mt-1">
                  Verde=hit · Ámbar=miss · Azul=dynamic · Borde fucsia=cambio de buildId
                </div>
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="border-t border-slate-700 pt-2">
            <div className="text-slate-300 font-semibold mb-2">Chequeo de URLs</div>
            <ul className="space-y-2">
              {checks.map((c) => (
                <li key={c.url} className="rounded border border-slate-700 p-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${dot(c.status)}`} />
                    <span className="font-semibold">{c.label}</span>
                    {c.ms !== undefined && (
                      <span className="ml-auto text-slate-400">{c.ms}ms</span>
                    )}
                  </div>
                  <div className="text-slate-400 break-all mt-1">{c.url}</div>

                  {c.httpStatus !== undefined && (
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <span className="text-slate-400">HTTP:</span>
                      <span className="text-emerald-400">{c.httpStatus}</span>
                      {c.redirected && (
                        <span className="text-amber-400">↪ redirigido</span>
                      )}
                      <span className={`px-1.5 py-0.5 rounded ${cacheBadge(c.cacheClass)}`}>
                        cache: {c.cache}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded ${freshnessBadge(c.freshness)}`}>
                        {c.freshness === "current"
                          ? "✓ al día"
                          : c.freshness === "stale"
                          ? "⚠ versión vieja"
                          : "? versión"}
                      </span>
                    </div>
                  )}

                  {c.version?.buildId && (
                    <div className="mt-1 text-slate-300">
                      build: <span className="text-blue-300">{c.version.buildId}</span>
                      {c.version.buildTime && (
                        <span className="text-slate-500">
                          {" "}
                          · {c.version.buildTime}
                        </span>
                      )}
                    </div>
                  )}

                  {c.finalUrl && c.finalUrl.replace(/\/$/, "") !== c.url && (
                    <div className="text-amber-300 break-all mt-1">→ {c.finalUrl}</div>
                  )}

                  {c.error && (
                    <div className="text-red-400 mt-1 break-all">⚠ {c.error}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-slate-500 border-t border-slate-700 pt-2">
            Tip: <span className="text-slate-300">?debug=domains</span> en cualquier URL.
            Reporte exportable con timestamp.
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainDebugBanner;
