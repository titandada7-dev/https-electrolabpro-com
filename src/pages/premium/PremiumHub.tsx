import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Crown, Cpu, Calculator, BookMarked, ArrowRight, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";

const sections = [
  {
    to: "/premium/simulador-circuitos",
    icon: Cpu,
    title: "Simulador interactivo de circuitos",
    desc: "Arma un circuito LED + resistencia en vivo, observa la corriente y la potencia disipada en tiempo real.",
    tag: "Simulador",
  },
  {
    to: "/premium/calculadoras-avanzadas",
    icon: Calculator,
    title: "Calculadoras avanzadas",
    desc: "Transformadores, filtros RLC de segundo orden, divisor de corriente, impedancia compleja.",
    tag: "Calculadoras",
  },
  {
    to: "/premium/biblioteca",
    icon: BookMarked,
    title: "Biblioteca de datasheets y proyectos",
    desc: "Colección curada con esquemáticos, hojas de datos y proyectos paso a paso descargables.",
    tag: "Biblioteca",
  },
];

export default function PremiumHub() {
  const { isActive } = useSubscription();

  useEffect(() => {
    document.title = "Contenido Premium · ElectroLab Pro";
  }, []);

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

        <div className="grid md:grid-cols-3 gap-6">
          {sections.map(({ to, icon: Icon, title, desc, tag }) => (
            <Card key={to} className="p-6 flex flex-col hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{tag}</span>
              </div>
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{desc}</p>
              <Button asChild variant="outline" className="w-full">
                <Link to={to}>
                  Entrar <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
