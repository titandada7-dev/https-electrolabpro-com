import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import type { Session } from "@supabase/supabase-js";
import {
  readAdMetrics,
  onAdMetric,
  clearAdMetrics,
  isAdsTestMode,
  type SlotCounters,
} from "@/lib/adMetrics";
import {
  getAdsenseDiagnostics,
  clearAdsenseConsent,
  setAdsenseConsent,
} from "@/lib/adsenseLoader";

const SLOT_LABEL = "Slot";

const AdminAds = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string>("");
  const [tick, setTick] = useState(0);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // Auth: escuchar cambios y luego leer sesión actual.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingAuth(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Métricas en tiempo real: re-render al recibir un nuevo evento.
  useEffect(() => {
    const off = onAdMetric(() => setTick((n) => n + 1));
    return off;
  }, []);

  const handleGoogleSignIn = async () => {
    setError("");
    setSigningIn(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/admin/ads",
      });
      if (result.error) {
        setError("No se pudo iniciar sesión con Google.");
        setSigningIn(false);
      }
      // redirected → el navegador hace el flujo OAuth
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const email = session?.user?.email ?? null;
  const adsTest = isAdsTestMode();

  // Verificación de admin server-side vía RLS: select sobre user_roles
  // sólo devuelve filas si el usuario tiene rol 'admin'.
  useEffect(() => {
    let cancelled = false;
    if (!session?.user?.id) {
      setAuthorized(null);
      return;
    }
    setAuthorized(null);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setAuthorized(!!data);
      });
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  if (loadingAuth) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Cargando…</p>
      </main>
    );
  }

  // Sin sesión
  if (!session) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm border border-border rounded-lg p-6 bg-card shadow-sm">
          <h1 className="text-xl font-semibold mb-2">Panel AdSense</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Acceso restringido. Inicia sesión con tu cuenta de Google autorizada.
          </p>
          <button
            onClick={handleGoogleSignIn}
            disabled={signingIn}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {signingIn ? "Redirigiendo…" : "Entrar con Google"}
          </button>
          {error && <p className="text-xs text-destructive mt-3">{error}</p>}
          <Link to="/" className="block mt-4 text-xs text-muted-foreground hover:text-foreground underline">
            ← Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  // Esperando comprobación de rol
  if (authorized === null) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Verificando permisos…</p>
      </main>
    );
  }

  // Autenticado pero sin rol admin
  if (!authorized) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-destructive/40 rounded-lg p-6 bg-card">
          <h1 className="text-xl font-semibold mb-2">Acceso denegado</h1>
          <p className="text-sm text-muted-foreground mb-2">
            La cuenta <span className="font-mono">{email}</span> no tiene rol de administrador.
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Los permisos se gestionan en la tabla <span className="font-mono">user_roles</span> del backend.
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSignOut}
              className="text-xs px-3 py-1.5 rounded border border-border hover:bg-muted"
            >
              Cerrar sesión
            </button>
            <Link to="/" className="text-xs px-3 py-1.5 rounded border border-border hover:bg-muted">
              Inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Autorizado → panel real (tick fuerza re-lectura)
  const { counters, events } = readAdMetrics();
  void tick;
  const slots = Object.keys(counters).sort();

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold">Panel AdSense</h1>
            <p className="text-xs text-muted-foreground mt-1">
              {email} ·{" "}
              {adsTest ? (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  Modo prueba activo (data-adtest=on)
                </span>
              ) : (
                <a
                  href="?adstest=1"
                  className="underline hover:text-foreground"
                >
                  Activar modo prueba (?adstest=1)
                </a>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => clearAdMetrics()}
              className="text-xs px-3 py-1.5 rounded border border-border hover:bg-muted"
            >
              Limpiar métricas
            </button>
            <button
              onClick={handleSignOut}
              className="text-xs px-3 py-1.5 rounded border border-border hover:bg-muted"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {slots.length === 0 ? (
          <div className="border border-dashed border-border rounded-lg p-8 text-center text-sm text-muted-foreground">
            Aún no hay métricas. Navega por el sitio (en otra pestaña) para que los slots de AdSense se registren.
          </div>
        ) : (
          <section className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-3 py-2">{SLOT_LABEL}</th>
                  <th className="text-right px-3 py-2">Impr.</th>
                  <th className="text-right px-3 py-2">Click</th>
                  <th className="text-right px-3 py-2">Unfilled</th>
                  <th className="text-right px-3 py-2">Timeout</th>
                  <th className="text-right px-3 py-2">Blocked</th>
                  <th className="text-right px-3 py-2">Error</th>
                  <th className="text-left px-3 py-2">Último motivo</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => {
                  const c: SlotCounters = counters[slot];
                  return (
                    <tr key={slot} className="border-t border-border">
                      <td className="px-3 py-2 font-mono text-xs">{slot}</td>
                      <td className="px-3 py-2 text-right text-emerald-600 dark:text-emerald-400">{c.impression}</td>
                      <td className="px-3 py-2 text-right">{c.click}</td>
                      <td className="px-3 py-2 text-right text-amber-600 dark:text-amber-400">{c.unfilled}</td>
                      <td className="px-3 py-2 text-right text-amber-600 dark:text-amber-400">{c.timeout}</td>
                      <td className="px-3 py-2 text-right text-destructive">{c.blocked}</td>
                      <td className="px-3 py-2 text-right text-destructive">{c.error}</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground max-w-[260px] truncate">
                        {c.lastReason ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-sm font-semibold mb-2">Últimos eventos ({events.length})</h2>
          <div className="border border-border rounded-lg max-h-80 overflow-y-auto">
            <ul className="divide-y divide-border">
              {events.slice().reverse().map((ev, i) => (
                <li key={i} className="px-3 py-1.5 text-xs font-mono flex gap-3">
                  <span className="text-muted-foreground tabular-nums">
                    {new Date(ev.ts).toLocaleTimeString()}
                  </span>
                  <span className="font-semibold">{ev.action}</span>
                  <span className="text-muted-foreground">{ev.slot}</span>
                  {ev.reason && <span className="text-muted-foreground truncate">· {ev.reason}</span>}
                </li>
              ))}
              {events.length === 0 && (
                <li className="px-3 py-3 text-xs text-muted-foreground">Sin eventos aún.</li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminAds;
