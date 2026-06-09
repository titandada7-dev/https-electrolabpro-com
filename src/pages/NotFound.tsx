import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Zap, ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const NotFound = () => {
  const location = useLocation();
  usePageMeta({
    title: "Página no encontrada (404) | ElectroLab Pro",
    description: "La página que buscas no existe. Volvé al inicio para explorar calculadoras, guías y artículos de electrónica.",
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-grid px-6 text-center">
      <Zap className="w-12 h-12 text-primary glow-icon mb-4" />
      <h1 className="text-5xl font-mono font-bold text-foreground mb-3">404</h1>
      <p className="text-lg text-muted-foreground mb-2">La página que buscas no existe.</p>
      <p className="text-sm text-muted-foreground/70 mb-6 font-mono break-all max-w-md">
        {location.pathname}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-mono"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a ElectroLab Pro
      </Link>
    </div>
  );
};

export default NotFound;
