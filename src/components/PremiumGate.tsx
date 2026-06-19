import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Crown, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";

interface PremiumGateProps {
  title: string;
  intro: string;
  bullets?: string[];
  preview?: ReactNode;
  children: ReactNode;
}

/**
 * Wraps premium-only content. Non-Premium users see the title, intro,
 * an optional preview block, a bullet list of what's inside, and a CTA
 * to upgrade. Premium users see the full children content.
 */
export default function PremiumGate({ title, intro, bullets = [], preview, children }: PremiumGateProps) {
  const { isActive, loading, userId } = useSubscription();

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-muted-foreground text-sm">
        Cargando…
      </div>
    );
  }

  if (isActive) {
    return <>{children}</>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
        <Crown className="h-3.5 w-3.5" /> Contenido Premium
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{intro}</p>

      {preview && (
        <div className="relative mb-8 rounded-lg overflow-hidden border border-border">
          <div className="pointer-events-none select-none opacity-60">{preview}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border border-border text-xs">
            <Lock className="h-3 w-3" /> Vista previa
          </div>
        </div>
      )}

      <Card className="p-6 md:p-8 border-primary/40 bg-primary/5">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" /> Desbloquéalo con Premium
        </h2>
        {bullets.length > 0 && (
          <ul className="space-y-2 mb-6">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link to={userId ? "/premium" : "/auth?redirect=/premium"}>
              <Crown className="h-4 w-4 mr-2" /> Hacerme Premium · desde $4.99/mes
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/premium">Ver planes</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Cancela cuando quieras. Pagos seguros vía Paddle.
        </p>
      </Card>
    </div>
  );
}
