import { Zap, ChevronDown, BookOpen, Cpu, Calculator, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResistorCalculator from "@/components/ResistorCalculator";
import ComponentDictionary from "@/components/ComponentDictionary";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Encabezado */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary glow-icon" />
            <h1 className="text-lg md:text-xl font-mono font-bold text-foreground">
              Electro<span className="text-primary">Lab</span>
            </h1>
          </div>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Aprende electrónica desde cero
          </p>
        </div>
        {/* Banner publicitario superior */}
        <div className="container mx-auto px-4 pb-2 min-h-[90px] flex items-center justify-center bg-muted/20 rounded-lg">
          <AdBanner orientation="horizontal" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: 'linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)' }}>
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-30 blur-[100px]" style={{ background: 'hsl(199 89% 60% / 0.4)' }} />
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            ElectroLab Pro
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            La suite definitiva para ingenieros y entusiastas de la electrónica. Calcula, aprende y diseña con precisión digital.
          </p>
          <Button
            size="lg"
            className="gap-2 text-base font-semibold animate-pulse-glow"
            onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Empezar a Calcular
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-border" style={{ background: 'linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(222 47% 11%) 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap className="w-8 h-8 text-primary glow-icon" />, title: "Precisión Total", desc: "Algoritmos verificados para cálculos exactos de 4 y 5 bandas." },
              { icon: <BookOpen className="w-8 h-8 text-primary glow-icon" />, title: "Diccionario Vivo", desc: "Acceso rápido a definiciones y símbolos de componentes reales." },
              { icon: <Cpu className="w-8 h-8 text-primary glow-icon" />, title: "Modo Pro", desc: "Interfaz optimizada para ingenieros con modo oscuro de alto contraste." },
            ].map((f) => (
              <div key={f.title} className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 text-center space-y-3">
                <div className="inline-flex p-3 rounded-lg bg-secondary">{f.icon}</div>
                <h3 className="text-lg font-mono font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Calculator className="w-5 h-5 text-primary" />, value: "+10,000", label: "Cálculos realizados" },
              { icon: <Users className="w-5 h-5 text-primary" />, value: "+500", label: "Estudiantes en la comunidad" },
              { icon: <Target className="w-5 h-5 text-primary" />, value: "99.9%", label: "Precisión garantizada" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  {s.icon}
                  <span className="text-3xl md:text-4xl font-mono font-bold text-primary glow-text">{s.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Herramientas */}
          <main className="flex-1 space-y-12">
            <div id="calculadora">
              <ResistorCalculator />
            </div>
            <div>
              <ComponentDictionary />
            </div>
          </main>

          {/* Lateral con afiliados y publicidad */}
          <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0">
            <div className="sticky top-40 space-y-8">
              {/* Bloque de Afiliados */}
              <div className="p-4 rounded-xl border border-border bg-card/50">
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" /> Herramientas Pro
                </h4>
                <ul className="space-y-4">
                  <li className="text-xs">
                    <a href="LINK" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">Multímetro Digital Autorango</a>
                    <p className="text-muted-foreground mt-1">El que usamos en el lab.</p>
                  </li>
                  <li className="text-xs">
                    <a href="LINK" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">Estación de Soldado 60W</a>
                    <p className="text-muted-foreground mt-1">Precisión para integrados.</p>
                  </li>
                </ul>
              </div>
              {/* Banner de publicidad */}
              <AdBanner orientation="vertical" />
            </div>
          </aside>
        </div>
      </div>

      {/* Recomendación de afiliado */}
      <div className="container mx-auto px-4">
        <div className="pt-8 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Recomendación Pro</p>
          <a 
            href="https://amzn.to/3Nj6QlU"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:scale-105 transition-all duration-300 inline-block"
          >
            💎 Kit de Inicio Oficial
          </a>
          <p className="text-xs text-muted-foreground">Todo lo necesario para tus primeros circuitos.</p>
        </div>
      </div>

      {/* Pie de página */}
      <footer className="w-full py-8 mt-auto bg-black/50 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            © 2026 ElectroLab Pro | Desarrollado por <span className="font-medium">J.A.Sanchez</span>
          </p>
          <p className="text-muted-foreground/60 text-xs mb-4">
            Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-[10px] leading-relaxed max-w-xl mx-auto italic">
            "Como Afiliado de Amazon, percibo dinero por las compras elegibles. 
            Los ingresos generados ayudan a mantener esta plataforma gratuita para estudiantes de electrónica."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
