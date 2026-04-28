import { useEffect, useMemo, useState } from "react";

type CheckStatus = "pending" | "ok" | "redirect" | "error";

interface UrlCheck {
  url: string;
  label: string;
  status: CheckStatus;
  httpStatus?: number;
  finalUrl?: string;
  redirected?: boolean;
  cache?: string;
  ms?: number;
  error?: string;
}

const TARGETS: { url: string; label: string }[] = [
  { url: "https://electrolabpro.com", label: "Dominio principal (apex)" },
  { url: "https://www.electrolabpro.com", label: "WWW" },
  { url: "https://ww-electrolabpro-com.lovable.app", label: "Lovable Published" },
];

function detectVersion() {
  const host = window.location.hostname;
  if (host.includes("id-preview--")) return { kind: "Preview", color: "bg-amber-500" };
  if (host.includes("lovableproject.com")) return { kind: "Preview Sandbox", color: "bg-amber-500" };
  if (host.includes("lovable.app")) return { kind: "Published (lovable.app)", color: "bg-blue-500" };
  if (host === "electrolabpro.com") return { kind: "Custom Domain (apex)", color: "bg-emerald-500" };
  if (host === "www.electrolabpro.com") return { kind: "Custom Domain (www)", color: "bg-emerald-500" };
  return { kind: `Desconocido (${host})`, color: "bg-slate-500" };
}

const DomainDebugBanner = () => {
  const [enabled, setEnabled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [checks, setChecks] = useState<UrlCheck[]>(
    TARGETS.map((t) => ({ ...t, status: "pending" as CheckStatus }))
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "domains") setEnabled(true);
  }, []);

  const version = useMemo(detectVersion, []);
  const buildTime = useMemo(() => new Date().toISOString(), []);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const run = async () => {
      const results = await Promise.all(
        TARGETS.map(async (t): Promise<UrlCheck> => {
          const start = performance.now();
          try {
            const res = await fetch(t.url + "/?_probe=" + Date.now(), {
              method: "GET",
              redirect: "follow",
              cache: "no-store",
              mode: "cors",
            });
            const ms = Math.round(performance.now() - start);
            return {
              ...t,
              status: res.redirected ? "redirect" : "ok",
              httpStatus: res.status,
              finalUrl: res.url,
              redirected: res.redirected,
              cache: res.headers.get("cf-cache-status") || res.headers.get("x-cache") || "n/a",
              ms,
            };
          } catch (e: any) {
            const ms = Math.round(performance.now() - start);
            // CORS-blocked still means the server responded; mark as error w/ note
            return {
              ...t,
              status: "error",
              error: e?.message || "fetch failed (posible CORS)",
              ms,
            };
          }
        })
      );
      if (!cancelled) setChecks(results);
    };

    run();
    const id = setInterval(run, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [enabled]);

  if (!enabled) return null;

  const dot = (s: CheckStatus) =>
    ({
      pending: "bg-slate-400 animate-pulse",
      ok: "bg-emerald-500",
      redirect: "bg-amber-500",
      error: "bg-red-500",
    }[s]);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-md w-[calc(100%-2rem)] rounded-lg border border-slate-700 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur text-xs font-mono">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${version.color}`} />
          <span className="font-semibold">Domain Debug</span>
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
        <div className="p-3 space-y-3 max-h-[60vh] overflow-auto">
          <div className="space-y-1">
            <div className="text-slate-400">Host actual:</div>
            <div className="text-emerald-400 break-all">{window.location.href}</div>
            <div className="text-slate-400 mt-1">Build cargado: {buildTime}</div>
          </div>

          <div className="border-t border-slate-700 pt-2">
            <div className="text-slate-300 font-semibold mb-2">Chequeo de URLs (cada 15s)</div>
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
                    <div className="mt-1">
                      <span className="text-slate-400">HTTP:</span>{" "}
                      <span className="text-emerald-400">{c.httpStatus}</span>
                      {c.redirected && (
                        <span className="ml-2 text-amber-400">↪ redirigido</span>
                      )}
                    </div>
                  )}
                  {c.finalUrl && c.finalUrl !== c.url + "/" && (
                    <div className="text-amber-300 break-all mt-1">→ {c.finalUrl}</div>
                  )}
                  {c.cache && (
                    <div className="text-slate-400 mt-1">Cache: {c.cache}</div>
                  )}
                  {c.error && (
                    <div className="text-red-400 mt-1 break-all">⚠ {c.error}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-slate-500 border-t border-slate-700 pt-2">
            Tip: agregá <span className="text-slate-300">?debug=domains</span> a cualquier URL.
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainDebugBanner;
