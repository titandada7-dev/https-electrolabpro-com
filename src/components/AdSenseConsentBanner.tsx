import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  getAdsenseConsent,
  setAdsenseConsent,
  type ConsentState,
} from "@/lib/adsenseLoader";

/**
 * Banner dedicado al consentimiento de AdSense.
 * Mientras el estado sea "pending", el script de AdSense NO se inyecta
 * y los AdBanner permanecen en estado idle. Al aceptar, se libera la
 * carga diferida (lazy) del script y los slots se rellenan al entrar
 * en el viewport.
 *
 * Es independiente del CookieBanner general: aquí solo se decide
 * publicidad personalizada de Google.
 */
const AdSenseConsentBanner = () => {
  const [consent, setConsent] = useState<ConsentState>("pending");

  useEffect(() => {
    setConsent(getAdsenseConsent());
  }, []);

  if (consent !== "pending") return null;

  const handle = (decision: "granted" | "denied") => {
    setAdsenseConsent(decision);
    setConsent(decision);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de publicidad"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:max-w-sm z-[60] rounded-xl border border-border bg-card/95 backdrop-blur-md p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <p className="text-sm font-semibold text-foreground mb-1">
        Publicidad personalizada
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        Usamos Google AdSense para mostrar anuncios y mantener el sitio
        gratuito. El script publicitario solo se carga si lo aceptás. Podés
        revisarlo en nuestra{" "}
        <Link
          to="/privacidad"
          className="text-primary underline hover:text-primary/80"
        >
          política de privacidad
        </Link>
        .
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handle("denied")}
          aria-label="Rechazar publicidad personalizada"
        >
          Rechazar
        </Button>
        <Button
          size="sm"
          onClick={() => handle("granted")}
          aria-label="Aceptar publicidad personalizada"
        >
          Aceptar anuncios
        </Button>
      </div>
    </div>
  );
};

export default AdSenseConsentBanner;
