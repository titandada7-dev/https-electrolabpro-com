import { lazy, type ComponentType } from "react";

/**
 * Carga diferida resistente a despliegues nuevos.
 *
 * Cuando se publica una versión nueva, los archivos .js con hash viejo dejan de
 * existir en el servidor. Si una pestaña abierta (o una versión cacheada del
 * index.html / service worker) intenta importarlos, el navegador lanza
 * "Failed to fetch dynamically imported module" y la app cae en el ErrorBoundary.
 *
 * Estrategia:
 * 1. Reintentar el import una vez (cubre fallos de red transitorios).
 * 2. Si vuelve a fallar, recargar la página una sola vez (flag en sessionStorage)
 *    para que el navegador tome el index.html nuevo con los hashes correctos.
 */

const RELOAD_FLAG = "elp:chunk-reload";
const REFRESH_PARAM = "_elp_refresh";
const RECOVERY_WINDOW_MS = 30_000;

export const isChunkLoadError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return (
    /dynamically imported module/i.test(message) ||
    /Loading chunk|Importing a module script failed|error loading dynamically imported/i.test(
      message
    )
  );
};

/**
 * Elimina caches locales y navega a una URL única. `location.reload()` puede
 * reutilizar el mismo documento desde una capa intermedia; el parámetro fuerza
 * una petición nueva del index sin cambiar la ruta visible de forma permanente.
 */
export async function reloadWithFreshAssets(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  let lastRecovery = 0;
  try {
    lastRecovery = Number(sessionStorage.getItem(RELOAD_FLAG) ?? "0");
  } catch {
    /* sessionStorage puede estar bloqueado */
  }

  const url = new URL(window.location.href);
  const cameFromRecovery = url.searchParams.has(REFRESH_PARAM);
  if (cameFromRecovery || now - lastRecovery < RECOVERY_WINDOW_MS) return false;

  try {
    sessionStorage.setItem(RELOAD_FLAG, String(now));
  } catch {
    /* seguimos con el parámetro de URL como protección contra bucles */
  }

  try {
    const registrations = await navigator.serviceWorker?.getRegistrations();
    await Promise.all((registrations ?? []).map((registration) => registration.unregister()));
    if (typeof caches !== "undefined") {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch {
    /* sin service worker o Cache API: la navegación fresca sigue siendo válida */
  }

  url.searchParams.set(REFRESH_PARAM, String(now));
  window.location.replace(url.toString());
  return true;
}

export function lazyWithRetry<T extends ComponentType<never>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      if (!isChunkLoadError(error)) throw error;

      // Reintento inmediato (fallo de red puntual).
      try {
        return await factory();
      } catch (retryError) {
        if (await reloadWithFreshAssets()) {
          // Promesa que nunca resuelve: evitamos renderizar el error mientras recarga.
          return await new Promise<{ default: T }>(() => {});
        }

        throw retryError;
      }
    }
  });
}

/**
 * Considera estable la versión sólo después de que sus imports tuvieron tiempo
 * de ejecutarse. Antes se limpiaba al iniciar y eso permitía un bucle de recarga.
 */
export function scheduleChunkRecoveryReset() {
  window.setTimeout(() => {
    try {
      sessionStorage.removeItem(RELOAD_FLAG);
    } catch {
      /* ignorar */
    }

    const url = new URL(window.location.href);
    if (url.searchParams.delete(REFRESH_PARAM)) {
      window.history.replaceState(window.history.state, "", url.toString());
    }
  }, RECOVERY_WINDOW_MS);
}
