import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackConsentDecision } from "@/lib/consentAnalytics";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = (all?: boolean) => {
    const value = all ? "all" : JSON.stringify({ analytics, ads });
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
    trackConsentDecision(
      "cookie_banner",
      all ? "accept_all" : "custom",
      all ? {} : { analytics, ads }
    );
  };

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: false, ads: false }));
    setVisible(false);
    trackConsentDecision("cookie_banner", "reject_all");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 px-4 pt-4 animate-in slide-in-from-bottom duration-500"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card/95 backdrop-blur-md p-5 shadow-2xl">
        {!showConfig ? (
          <>
            <p className="text-sm text-foreground/90 leading-relaxed mb-4">
              🍪 Utilizamos cookies propias y de terceros (Google AdSense, Analytics) para mejorar tu experiencia y mostrar anuncios.
              Podés aceptar, rechazar o configurar tus preferencias. Más detalles en nuestra{" "}
              <Link to="/privacidad" className="text-primary underline hover:text-primary/80">política de cookies</Link>.
            </p>
            <div className="flex flex-wrap gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={rejectAll} aria-label="Rechazar todas las cookies no esenciales">
                Rechazar
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowConfig(true)}>
                Configurar
              </Button>
              <Button size="sm" onClick={() => accept(true)}>
                Aceptar
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-foreground mb-3">Configurar cookies</p>
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked disabled className="accent-primary" />
                Esenciales (siempre activas)
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={analytics} onChange={() => setAnalytics(!analytics)} className="accent-primary" />
                Analíticas
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={ads} onChange={() => setAds(!ads)} className="accent-primary" />
                Publicidad y afiliados
              </label>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowConfig(false)}>
                Volver
              </Button>
              <Button size="sm" onClick={() => accept(false)}>
                Guardar preferencias
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
