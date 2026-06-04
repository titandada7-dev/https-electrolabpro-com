import { Link } from "react-router-dom";

const HomeFooter = () => {
  return (
    <footer className="border-t border-border py-8 px-6 bg-card/50">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground text-xs sm:text-sm mb-4">
          © {new Date().getFullYear()} ElectroLab Pro
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> | </span>
          Diseñado por <span className="font-semibold">J.A.Sanchez</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4 mb-3">
          <Link to="/guia-resistencias" className="text-primary text-[10px] uppercase tracking-wider hover:underline font-semibold transition-colors min-h-[36px] flex items-center">📘 Guía de resistencias</Link>
          <span className="text-muted-foreground/40 text-[10px]">|</span>
          <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Privacidad</Link>
          <span className="text-muted-foreground/40 text-[10px]">|</span>
          <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Aviso Legal</Link>
          <span className="text-muted-foreground/40 text-[10px]">|</span>
          <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Contacto</Link>
          <span className="text-muted-foreground/40 text-[10px]">|</span>
          <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Sobre Nosotros</Link>
          <span className="text-muted-foreground/40 text-[10px]">|</span>
          <Link to="/glosario" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Glosario</Link>
          <span className="text-muted-foreground/40 text-[10px]">|</span>
          <Link to="/terminos-y-condiciones" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Términos</Link>
        </div>
        <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic mb-4">
          En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
        </p>
        <div className="border-t border-border pt-4 mt-2">
          <p className="text-primary/80 text-[10px] font-semibold uppercase tracking-wider mb-1">⚠️ Aviso de Seguridad y Responsabilidad</p>
          <p className="text-muted-foreground/50 text-[9px] leading-relaxed max-w-2xl mx-auto">
            Los cálculos y datos proporcionados por ElectroLab Pro son estrictamente para fines educativos y de prototipado.
            La electrónica implica riesgos; siempre verifica los valores de componentes con un multímetro real antes de energizar un circuito.
            J.A. Sanchez y ElectroLab Pro no se hacen responsables por daños materiales o personales derivados del uso de esta herramienta.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
