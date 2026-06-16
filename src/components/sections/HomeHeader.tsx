import { useState } from "react";
import electrolabLogo from "@/assets/electrolab-logo.webp";
import {
  Zap, ChevronDown, BookOpen, Search, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface HomeHeaderProps {
  activeSection: string | null;
  onAnchorClick: (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
  scrollTo: (id: string) => void;
  onSearchOpen: () => void;
  articleLinks: Array<{ label: string; to: string }>;
}

const HomeHeader = ({
  activeSection,
  onAnchorClick,
  scrollTo,
  onSearchOpen,
  articleLinks,
}: HomeHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        <Link to="/" className="flex items-center gap-3">
          <img src={electrolabLogo} alt="ElectroLab Pro logo" width="36" height="36" className="h-9 w-9 rounded-lg object-cover" loading="eager" decoding="async" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Electrolab<span className="text-primary">PRO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex" role="menubar" aria-label="Navegación principal">
          {[
            { id: "inicio", label: "Inicio" },
            { id: "aprender", label: "Aprender" },
            { id: "guias", label: "Guías" },
            { id: "calculadora", label: "Calculadoras" },
            { id: "mini-proyectos", label: "Proyectos" },
            { id: "foro", label: "FAQ" },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onAnchorClick(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm font-medium transition-colors px-2 py-1 rounded-md ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md focus-visible:outline-none"
              aria-label="Menú de artículos"
            >
              Artículos <ChevronDown className="w-3.5 h-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-64 max-h-[70vh] overflow-y-auto">
              <DropdownMenuItem asChild>
                <Link to="/guia-resistencias" className="font-semibold text-primary cursor-pointer">
                  📘 Guía completa de resistencias
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {articleLinks.map((a) => (
                <DropdownMenuItem key={a.to} asChild>
                  <Link to={a.to} className="cursor-pointer">
                    {a.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/documentacion-tecnica" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md">Documentación</Link>
          <Link to="/sobre-nosotros" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md">Sobre Nosotros</Link>
          <Link to="/contacto" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md">Contacto</Link>
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary"
            aria-label="Abrir buscador"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Buscar</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">⌘K</kbd>
          </button>
          <Button size="sm" onClick={() => scrollTo("guias")}>Empezar</Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={onSearchOpen}
            className="text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-border bg-card px-6 py-4 md:hidden space-y-1 animate-in slide-in-from-top-2">
          {[
            { label: "Inicio", id: "inicio" },
            { label: "Aprender", id: "aprender" },
            { label: "Guías", id: "guias" },
            { label: "Calculadoras", id: "calculadora" },
            { label: "Proyectos", id: "mini-proyectos" },
            { label: "FAQ", id: "foro" },
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => {
                onAnchorClick(item.id)(e);
                setMenuOpen(false);
              }}
              className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link to="/guia-resistencias" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-semibold text-primary hover:bg-accent py-3 px-3 rounded-lg min-h-[44px] transition-colors">
            📘 Guía completa de resistencias
          </Link>
          <Link to="/documentacion-tecnica" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg transition-colors">
            📚 Documentación Técnica
          </Link>
          <Link to="/contacto" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg transition-colors">
            Contacto
          </Link>
          <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg transition-colors">
            Sobre Nosotros
          </Link>
          <Link to="/glosario" onClick={() => setMenuOpen(false)} className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent py-3 px-3 rounded-lg transition-colors">
            📖 Glosario Técnico
          </Link>
          <div className="border-t border-border pt-3 mt-2">
            <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-semibold mb-2 px-3">Artículos</p>
            {articleLinks.map((a) => (
              <Link key={a.to} to={a.to} onClick={() => setMenuOpen(false)} className="block w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-accent py-2.5 px-3 rounded-lg transition-colors">
                {a.label}
              </Link>
            ))}
          </div>
          <Button size="sm" className="w-full mt-3" onClick={() => { scrollTo("guias"); setMenuOpen(false); }}>
            Empezar
          </Button>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
