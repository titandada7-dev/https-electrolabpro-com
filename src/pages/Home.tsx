import { useState } from "react";
import { Link } from "react-router-dom";
import { CircuitBoard, Wrench, TrendingUp, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "/contacto" },
];

const SERVICES = [
  {
    icon: CircuitBoard,
    title: "Diseño de Circuitos",
    description: "Creamos esquemas electrónicos optimizados, desde prototipos hasta producción en serie.",
  },
  {
    icon: Wrench,
    title: "Reparación Pro",
    description: "Diagnóstico y reparación de equipos electrónicos con precisión técnica garantizada.",
  },
  {
    icon: TrendingUp,
    title: "Optimización",
    description: "Mejoramos el rendimiento y la eficiencia de tus sistemas electrónicos existentes.",
  },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  usePageMeta({
    title: "ElectrolabPRO — Precisión electrónica al alcance de tu innovación",
    description:
      "Soluciones técnicas de alto nivel en diseño de circuitos, reparación y optimización electrónica. Sin distracciones.",
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
            Electrolab<span className="text-primary">PRO</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href.slice(1))}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
            <Button size="sm" onClick={() => scrollTo("servicios")}>
              Empezar
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-border bg-card px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) =>
                link.href.startsWith("#") ? (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href.slice(1))}
                    className="text-left text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Button size="sm" className="w-full" onClick={() => scrollTo("servicios")}>
                Empezar
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Precisión electrónica al alcance de tu{" "}
          <span className="text-primary">innovación</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Soluciones técnicas de alto nivel, sin distracciones
        </p>
        <Button size="lg" className="mt-10 gap-2" onClick={() => scrollTo("servicios")}>
          Explorar servicios <ArrowRight className="h-4 w-4" />
        </Button>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 px-6">
        <div className="container mx-auto">
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Servicios
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-2xl font-bold text-foreground sm:text-3xl">
            Todo lo que necesitás para tus proyectos electrónicos
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} ElectrolabPRO. Todos los derechos reservados.</span>
          <div className="flex gap-6">
            <Link to="/privacidad" className="hover:text-foreground">Privacidad</Link>
            <Link to="/aviso-legal" className="hover:text-foreground">Aviso Legal</Link>
            <Link to="/contacto" className="hover:text-foreground">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
