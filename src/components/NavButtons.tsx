import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

/**
 * Botones flotantes globales de navegación: Atrás / Inicio / Adelante.
 * Se ocultan en la home ("/") porque ahí no aporta.
 */
const NavButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const baseBtn =
    "inline-flex items-center justify-center gap-1.5 rounded-full bg-background/90 backdrop-blur border border-border shadow-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors px-3 py-2 text-sm font-medium";

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
      >
        <span className="hidden sm:inline">Adelante</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default NavButtons;
