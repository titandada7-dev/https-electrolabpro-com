import { useEffect } from "react";

/**
 * ThemeToggle deshabilitado: la app usa solo modo claro.
 * Se fuerza el tema claro y no se renderiza ningún botón.
 */
export default function ThemeToggle() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("theme", "light");
    } catch {
      /* no-op */
    }
  }, []);

  return null;
}
