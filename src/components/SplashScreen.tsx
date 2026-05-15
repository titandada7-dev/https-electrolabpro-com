import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const SPLASH_KEY = "elp_splash_seen";
const DURATION = 1800;

const SplashScreen = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (typeof sessionStorage === "undefined") return true;
    return !sessionStorage.getItem(SPLASH_KEY);
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const fadeTimer = setTimeout(() => setFading(true), DURATION - 300);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SPLASH_KEY, "1");
      } catch {
        /* ignore */
      }
    }, DURATION);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Cargando ElectroLab Pro"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-lg">
            <Zap className="h-8 w-8 text-primary-foreground" strokeWidth={2.5} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            ElectroLab Pro
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Electrónica al alcance de todos
          </p>
        </div>
        <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
