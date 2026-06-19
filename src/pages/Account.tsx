import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Crown, ExternalLink, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { getPaddleEnvironment } from "@/lib/paddle";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { toast } from "@/hooks/use-toast";

const PLAN_LABELS: Record<string, string> = {
  premium_monthly: "Premium mensual ($4.99/mes)",
  premium_yearly: "Premium anual ($49/año)",
};

export default function Account() {
  const { subscription, isActive, loading, userId } = useSubscription();
  const [email, setEmail] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Mi cuenta · ElectroLab Pro";
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate("/auth?redirect=/account");
      else setEmail(data.user.email ?? null);
    });
  }, [navigate]);

  const openPortal = async (target: "overview" | "cancel" | "update") => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("paddle-portal", {
        body: { environment: getPaddleEnvironment() },
      });
      if (error || !data) throw new Error(error?.message || "No portal");
      let url = data.overviewUrl as string;
      if ((target === "cancel" || target === "update") && Array.isArray(data.subscriptionUrls) && data.subscriptionUrls[0]) {
        const s = data.subscriptionUrls[0];
        if (target === "cancel" && s.cancelSubscription) url = s.cancelSubscription;
        else if (target === "update" && s.updateSubscriptionPaymentMethod) url = s.updateSubscriptionPaymentMethod;
      }
      window.open(url, "_blank", "noopener");
    } catch (e) {
      toast({ title: "No pudimos abrir el portal", description: (e as Error).message, variant: "destructive" });
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const periodEnd = subscription?.current_period_end ? new Date(subscription.current_period_end) : null;
  const cancelScheduled = subscription?.cancel_at_period_end || subscription?.status === "canceled";

  return (
    <>
      <PaymentTestModeBanner />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Mi cuenta</h1>
          <p className="text-muted-foreground mb-8">{email}</p>

          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">
                    {isActive ? PLAN_LABELS[subscription!.price_id] || "Premium" : "Plan gratuito"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isActive
                      ? cancelScheduled
                        ? "Suscripción cancelada — acceso activo hasta el fin del periodo"
                        : "Renovación automática activada"
                      : "Actualmente no tienes una suscripción activa"}
                  </p>
                </div>
              </div>
              {isActive && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cancelScheduled ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
                  {cancelScheduled ? "Cancelada" : "Activa"}
                </span>
              )}
            </div>

            {isActive && periodEnd && (
              <div className="text-sm bg-muted/50 rounded-lg p-4 mb-4">
                <p className="font-medium mb-1">
                  {cancelScheduled ? "Tu acceso termina el " : "Próxima renovación: "}
                  {periodEnd.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="text-muted-foreground text-xs">
                  {cancelScheduled
                    ? "Después de esa fecha perderás los beneficios Premium automáticamente."
                    : "Te cobraremos automáticamente para renovar tu suscripción."}
                </p>
              </div>
            )}

            {cancelScheduled && isActive && (
              <div className="flex gap-2 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Si cambiaste de opinión, podés reactivar tu suscripción desde el portal de gestión.</span>
              </div>
            )}

            {!isActive && (
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/premium">Ver planes Premium</Link>
              </Button>
            )}

            {isActive && (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => openPortal("overview")} disabled={portalLoading}>
                  {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4 mr-2" />}
                  Gestionar suscripción
                </Button>
                <Button asChild variant="outline">
                  <Link to="/premium">Cambiar de plan</Link>
                </Button>
                {!cancelScheduled && (
                  <Button variant="ghost" onClick={() => openPortal("cancel")} disabled={portalLoading}>
                    Cancelar renovación
                  </Button>
                )}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">¿Cómo funcionan las cancelaciones?</h3>
                <p className="text-sm text-muted-foreground">
                  Al cancelar, conservás todos los beneficios Premium hasta el final del periodo ya pagado.
                  Después de esa fecha tu cuenta vuelve automáticamente al plan gratuito.
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Los pagos y la facturación se gestionan de forma segura a través de Paddle (Merchant of Record).
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
