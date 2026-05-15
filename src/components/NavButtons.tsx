import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

/**
 * Botones flotantes globales de navegación: Atrás / Inicio / Adelante.
 * Se ocultan en la home ("/") porque ahí no aporta.
 *
 * Atrás/Adelante se deshabilitan cuando no hay historial disponible
 * en esa dirección. Para saberlo, mantenemos un índice propio dentro
 * de `window.history.state` (la History API no expone si hay forward).
 */
const NavButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  const maxIdxRef = useRef(0);
  const [idx, setIdx] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const s = window.history.state as { idx?: number } | null;
    return typeof s?.idx === "number" ? s.idx : 0;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const current = window.history.state as { idx?: number } | null;
    let nextIdx = typeof current?.idx === "number" ? current.idx : 0;

    if (navType === "PUSH") {
      // Nueva entrada en el stack: incrementamos respecto al último idx conocido
      nextIdx = idx + 1;
      // Reescribimos el state para persistir nuestro idx sin tocar la URL
      try {
        window.history.replaceState(
          { ...(current || {}), idx: nextIdx },
          "",
          window.location.href
        );
      } catch {
        /* ignore */
      }
      // Un PUSH trunca el "adelante"
      maxIdxRef.current = nextIdx;
    } else if (navType === "REPLACE") {
      try {
        window.history.replaceState(
          { ...(current || {}), idx: nextIdx },
          "",
          window.location.href
        );
      } catch {
        /* ignore */
      }
    } else {
      // POP: ya tiene el idx que guardamos al hacer push
      if (nextIdx > maxIdxRef.current) maxIdxRef.current = nextIdx;
    }

    setIdx(nextIdx);
  }, [location.key, navType]); // eslint-disable-line react-hooks/exhaustive-deps

  if (location.pathname === "/") return null;

  const canGoBack = idx > 0;
  const canGoForward = idx < maxIdxRef.current;

  const baseBtn =
    "inline-flex items-center justify-center gap-1.5 rounded-full bg-background/90 backdrop-blur border border-border shadow-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background/90 disabled:hover:text-foreground";

  return (
    <nav
      aria-label="Navegación rápida"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2"
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={baseBtn}
        aria-label="Página anterior"
        aria-disabled={!canGoBack}
        disabled={!canGoBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Atrás</span>
      </button>
      <button
        type="button"
        onClick={() => navigate("/")}
        className={baseBtn}
        aria-label="Ir al inicio"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Inicio</span>
      </button>
      <button
        type="button"
        onClick={() => navigate(1)}
        className={baseBtn}
        aria-label="Página siguiente"
        aria-disabled={!canGoForward}
        disabled={!canGoForward}
      >
        <span className="hidden sm:inline">Adelante</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default NavButtons;
