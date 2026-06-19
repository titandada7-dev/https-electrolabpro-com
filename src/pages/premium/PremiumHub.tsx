import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Crown, Cpu, Calculator, BookMarked, ArrowRight, Lock,
  Search, CheckCircle2, Circle, Bell, BellOff, RotateCcw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSubscription } from "@/hooks/useSubscription";
import { usePremiumProgress } from "@/hooks/usePremiumProgress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Section = {
  slug: string;
  to: string;
  icon: any;
  title: string;
  desc: string;
  tag: string;
  keywords: string[];
};

const sections: Section[] = [
  {
    slug: "simulador-circuitos",
    to: "/premium/simulador-circuitos",
    icon: Cpu,
    title: "Simulador interactivo de circuitos",
    desc: "Arma un circuito LED + resistencia en vivo, observa la corriente y la potencia disipada en tiempo real.",
    tag: "Simulador",
    keywords: ["simulador", "led", "circuito", "corriente", "potencia", "resistencia", "interactivo"],
  },
  {
    slug: "calculadoras-avanzadas",
    to: "/premium/calculadoras-avanzadas",
    icon: Calculator,
    title: "Calculadoras avanzadas",
    desc: "Transformadores, filtros RLC de segundo orden, divisor de corriente, impedancia compleja.",
    tag: "Calculadoras",
    keywords: ["calculadora", "transformador", "filtro", "rlc", "impedancia", "rc", "divisor"],
  },
  {
    slug: "biblioteca",
    to: "/premium/biblioteca",
    icon: BookMarked,
    title: "Biblioteca de datasheets y proyectos",
    desc: "Colección curada con esquemáticos, hojas de datos y proyectos paso a paso descargables.",
    tag: "Biblioteca",
    keywords: ["biblioteca", "datasheet", "ne555", "lm317", "proyecto", "esquemático", "pdf"],
  },
];

export default function PremiumHub() {
  const { isActive, userId } = useSubscription();
  const { visited, has, reset } = usePremiumProgress();
  const [query, setQuery] = useState("");
  const [optedIn, setOptedIn] = useState(false);
  const [optLoading, setOptLoading] = useState(false);
  const [optReady, setOptReady] = useState(false);

  useEffect(() => {
    document.title = "Contenido Premium · ElectroLab Pro";
  }, []);

  useEffect(() => {
    if (!userId) { setOptReady(true); return; }
    (async () => {
      const { data } = await (supabase as any)
        .from("premium_content_subscribers")
        .select("opted_in")
        .eq("user_id", userId)
        .maybeSingle();
      setOptedIn(!!data?.opted_in);
      setOptReady(true);
    })();
  }, [userId]);

  const handleToggleNotify = async (next: boolean) => {
    if (!userId) {
      toast({ title: "Iniciá sesión", description: "Necesitás una cuenta para activar avisos." });
      return;
    }
    setOptLoading(true);
    const { data: userRes } = await supabase.auth.getUser();
    const email = userRes.user?.email;
    if (!email) {
      setOptLoading(false);
      toast({ title: "No pudimos leer tu email", variant: "destructive" });
      return;
    }
    const { error } = await (supabase as any)
      .from("premium_content_subscribers")
      .upsert({ user_id: userId, email, opted_in: next, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    setOptLoading(false);
    if (error) {
      toast({ title: "No se pudo guardar", description: error.message, variant: "destructive" });
      return;
    }
    setOptedIn(next);
    toast({
      title: next ? "Avisos activados" : "Avisos desactivados",
      description: next
        ? "Te vamos a escribir cuando agreguemos nuevo contenido Premium."
        : "Ya no recibirás avisos de contenido Premium nuevo.",
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter((s) =>
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.includes(q))
    );
  }, [query]);

  const visitedCount = sections.filter((s) => has(s.slug)).length;
  const pct = Math.round((visitedCount / sections.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Crown className="h-4 w-4" /> Zona Premium
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Contenido exclusivo para suscriptores
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simuladores, calculadoras avanzadas y biblioteca técnica sin anuncios.
          </p>
        </div>

        {!isActive && (
          <Card className="p-5 mb-8 border-primary/40 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Aún no eres Premium</p>
                <p className="text-sm text-muted-foreground">
                  Podés ver una vista previa de cada sección. Hacete Premium para desbloquearlas.
                </p>
              </div>
            </div>
            <Button asChild>
              <Link to="/premium">Ver planes</Link>
            </Button>
          </Card>
        )}

        {/* Toolbar: search + progress */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en Premium: simulador, RLC, datasheet, LED…"
              className="pl-9"
              aria-label="Buscar contenido Premium"
            />
          </div>
          <Card className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Tu progreso</p>
                <p className="text-sm text-muted-foreground">{visitedCount}/{sections.length} · {pct}%</p>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            {visitedCount > 0 && (
              <Button size="sm" variant="ghost" onClick={reset} aria-label="Reiniciar progreso">
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </Card>
        </div>

        {/* Email notifications opt-in */}
        <Card className="p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            {optedIn ? <Bell className="h-5 w-5 text-primary mt-0.5" /> : <BellOff className="h-5 w-5 text-muted-foreground mt-0.5" />}
            <div>
              <p className="font-semibold">Avisos de contenido Premium nuevo</p>
              <p className="text-sm text-muted-foreground">
                Recibí un email cuando agreguemos un nuevo simulador, calculadora o material a la biblioteca.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="notify-toggle" className="text-sm">
              {optedIn ? "Activado" : "Desactivado"}
            </Label>
            <Switch
              id="notify-toggle"
              checked={optedIn}
              disabled={!optReady || optLoading || !userId}
              onCheckedChange={handleToggleNotify}
              aria-label="Activar avisos de contenido Premium"
            />
          </div>
        </Card>

        {/* Sections grid */}
        {filtered.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No encontramos contenido Premium para "<strong>{query}</strong>".
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map(({ slug, to, icon: Icon, title, desc, tag }) => {
              const seen = has(slug);
              return (
                <Card key={to} className="p-6 flex flex-col hover:border-primary/50 transition-colors relative">
                  <div className="absolute top-3 right-3" title={seen ? "Ya lo visitaste" : "Pendiente"}>
                    {seen
                      ? <CheckCircle2 className="h-5 w-5 text-primary" aria-label="Visitado" />
                      : <Circle className="h-5 w-5 text-muted-foreground/50" aria-label="Pendiente" />}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{tag}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 pr-8">{title}</h2>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{desc}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={to}>
                      {seen ? "Volver a entrar" : "Entrar"} <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
