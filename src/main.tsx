import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { reloadWithFreshAssets, scheduleChunkRecoveryReset } from "./lib/lazyWithRetry";

// Esperamos a que la versión haya permanecido estable antes de habilitar otra
// recuperación. Limpiar el indicador al iniciar podía provocar recargas en bucle.
scheduleChunkRecoveryReset();

// Vite avisa cuando un chunk precargado ya no existe (build nuevo publicado).
// Recargamos una sola vez para tomar el index.html actualizado.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  void reloadWithFreshAssets();
});

// Redirección canónica: www.electrolabpro.com → electrolabpro.com
// Evita contenido duplicado para SEO. Preserva ruta, query y hash.
if (typeof window !== "undefined" && window.location.hostname === "www.electrolabpro.com") {
  const { pathname, search, hash } = window.location;
  window.location.replace(`https://electrolabpro.com${pathname}${search}${hash}`);
}


// Guard: unregister service workers in preview/iframe contexts
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();

const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");

if (isPreviewHost || isInIframe) {
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
