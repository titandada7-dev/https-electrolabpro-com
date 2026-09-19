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

const isChunkLoadError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return (
    /dynamically imported module/i.test(message) ||
    /Loading chunk|Importing a module script failed|error loading dynamically imported/i.test(
      message
    )
  );
};

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
        const alreadyReloaded =
          typeof sessionStorage !== "undefined" &&
          sessionStorage.getItem(RELOAD_FLAG) === "1";

        if (!alreadyReloaded && typeof window !== "undefined") {
          try {
            sessionStorage.setItem(RELOAD_FLAG, "1");
          } catch {
            /* modo privado: seguimos igual */
          }
          // Limpiamos caches del service worker para no volver a servir el
          // index.html viejo que apunta a hashes inexistentes.
          try {
            const registrations = await navigator.serviceWorker?.getRegistrations();
            await Promise.all((registrations ?? []).map((r) => r.unregister()));
            if (typeof caches !== "undefined") {
              const keys = await caches.keys();
              await Promise.all(keys.map((k) => caches.delete(k)));
            }
          } catch {
            /* sin service worker: ignorar */
          }
          window.location.reload();
          // Promesa que nunca resuelve: evitamos renderizar el error mientras recarga.
          return await new Promise<{ default: T }>(() => {});
        }

        throw retryError;
      }
    }
  });
}

/** Limpia el flag cuando la app arranca correctamente. */
export function clearChunkReloadFlag() {
  try {
    sessionStorage.removeItem(RELOAD_FLAG);
    sessionStorage.removeItem("elp:preload-reload");
    sessionStorage.removeItem("elp:boundary-reload");
  } catch {
    /* ignorar */
  }
}
