import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Loader2, Crown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { useSubscription } from "@/hooks/useSubscription";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { toast } from "@/hooks/use-toast";

export default function Premium() {
  const [params] = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const { openCheckout, loading } = usePaddleCheckout();
  const { isActive, userId, loading: subLoading } = useSubscription();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    document.title = "Premium · ElectroLab Pro";
  }, []);

  useEffect(() => {
    if (params.get("checkout") === "success") {
      toast({ title: "¡Gracias por suscribirte!", description: "Tu acceso Premium se activará en unos segundos." });
    }
  }, [params]);

  const handleBuy = async (priceId: "premium_monthly" | "premium_yearly") => {
    if (!userId) {
      window.location.href = "/auth?redirect=/premium";
      return;
    }
    try {
      await openCheckout({
        priceId,
        customerEmail: email ?? undefined,
        customData: { userId },
      });
    } catch (e) {
      toast({ title: "No pudimos abrir el checkout", description: (e as Error).message, variant: "destructive" });
    }
  };

  const benefits = [
    "Sin anuncios en todo el sitio",
    "Calculadoras avanzadas exclusivas",
    "Guías y contenido Premium",
    "Distintivo Premium en tu perfil",
    "Soporte por correo prioritario",
    "Cancela cuando quieras",
  ];

  return (
    <>
      <PaymentTestModeBanner />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Crown className="h-4 w-4" /> ElectroLab Pro Premium
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Aprende electrónica sin distracciones
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Una suscripción para desbloquear todo el portal: sin anuncios, calculadoras avanzadas y contenido exclusivo.
            </p>
          </div>

          {isActive && (
            <Card className="p-6 mb-8 border-primary/40 bg-primary/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Ya eres Premium 🎉</p>
                  <p className="text-sm text-muted-foreground">Gracias por apoyar ElectroLab Pro.</p>
                </div>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 flex flex-col">
              <h2 className="text-xl font-semibold mb-1">Mensual</h2>
              <p className="text-sm text-muted-foreground mb-4">Flexibilidad total</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$4.99</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleBuy("premium_monthly")} disabled={loading || subLoading || isActive} size="lg">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isActive ? "Ya estás suscrito" : "Suscribirme mensual"}
              </Button>
            </Card>

            <Card className="p-8 flex flex-col border-primary relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Ahorra ~18%
              </span>
              <h2 className="text-xl font-semibold mb-1">Anual</h2>
              <p className="text-sm text-muted-foreground mb-4">Equivale a $4.08/mes</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/año</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleBuy("premium_yearly")} disabled={loading || subLoading || isActive} size="lg">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isActive ? "Ya estás suscrito" : "Suscribirme anual"}
              </Button>
            </Card>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Pagos seguros procesados por Paddle (Merchant of Record). Lee los{" "}
            <Link to="/terminos-y-condiciones" className="underline">términos</Link> y la{" "}
            <Link to="/privacidad" className="underline">política de privacidad</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
