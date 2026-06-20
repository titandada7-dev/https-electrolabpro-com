import { ExternalLink, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Product = {
  title: string;
  link: string;
  store: "ml" | "amazon";
  category?: string;
};

const PRODUCTS: Product[] = [
  { title: "Tester Digital Multímetro", link: "https://meli.la/12zzemF", store: "ml" },
  { title: "Multímetro Aneng AN8008", link: "https://amzn.to/483vAWk", store: "amazon" },
  { title: "Kit Cables Dupont", link: "https://www.amazon.es/s?k=cables+dupont+arduino&tag=electrolabp0c-21", store: "amazon", category: "Conectividad" },
  { title: "Pack Resistencias 1/4W", link: "https://www.amazon.es/s?k=kit+resistencias+1%2F4w+surtido&tag=electrolabp0c-21", store: "amazon", category: "Pasivos básicos" },
  { title: "Kit LEDs 5mm", link: "https://www.amazon.es/s?k=kit+led+5mm+surtido&tag=electrolabp0c-21", store: "amazon", category: "Indicadores" },
  { title: "Componentes Surtidos", link: "https://www.amazon.es/s?k=kit+componentes+electronicos+surtido&tag=electrolabp0c-21", store: "amazon", category: "Surtido general" },
  { title: "Soldador 60W Kit", link: "https://www.amazon.es/s?k=soldador+esta%C3%B1o+60w+kit&tag=electrolabp0c-21", store: "amazon", category: "Soldadura" },
  { title: "Amazon Prime Business", link: "https://amzn.to/4oEknCE", store: "amazon", category: "Envío y suministro" },
  { title: "Estación de Soldadura Digital", link: "https://www.amazon.es/s?k=estacion+soldadura+digital&tag=electrolabp0c-21", store: "amazon", category: "Soldadura" },
  { title: "Fuente de Alimentación Regulable 30V 10A", link: "https://www.amazon.es/s?k=fuente+alimentacion+regulable+30v+10a&tag=electrolabp0c-21", store: "amazon", category: "Alimentación" },
  { title: "Osciloscopio Digital FNIRSI", link: "https://www.amazon.es/s?k=osciloscopio+digital+fnirsi&tag=electrolabp0c-21", store: "amazon", category: "Medición avanzada" },
  { title: "Pinza Amperimétrica Digital", link: "https://www.amazon.es/s?k=pinza+amperimetrica+digital&tag=electrolabp0c-21", store: "amazon", category: "Medición" },
  { title: "Protoboard 830 Puntos", link: "https://www.amazon.es/s?k=protoboard+830+puntos&tag=electrolabp0c-21", store: "amazon", category: "Prototipado" },
  { title: "Kit Transistores Bipolares y MOSFET", link: "https://www.amazon.es/s?k=kit+transistores+bipolares+mosfet&tag=electrolabp0c-21", store: "amazon", category: "Semiconductores" },
  { title: "Kit Condensadores Cerámicos y Electrolíticos", link: "https://www.amazon.es/s?k=kit+condensadores+ceramicos+electroliticos&tag=electrolabp0c-21", store: "amazon", category: "Pasivos" },
  { title: "Punta de Cautín de Repuesto", link: "https://www.amazon.es/s?k=punta+cautin+repuesto&tag=electrolabp0c-21", store: "amazon", category: "Soldadura" },
  { title: "Multímetro de Gancho", link: "https://www.amazon.es/s?k=multimetro+gancho&tag=electrolabp0c-21", store: "amazon", category: "Medición" },
  { title: "Kit Diodos Rectificadores", link: "https://www.amazon.es/s?k=kit+diodos+rectificadores&tag=electrolabp0c-21", store: "amazon", category: "Semiconductores" },
];

const ITEMS_PER_PAGE = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE.desktop);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(ITEMS_PER_PAGE.mobile);
      } else if (width < 1024) {
        setItemsPerPage(ITEMS_PER_PAGE.tablet);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE.desktop);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return itemsPerPage;
}

const LabProRecommendations = () => {
  const itemsPerPage = useItemsPerPage();
  const totalPages = Math.ceil(PRODUCTS.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, Math.max(0, totalPages - 1)));
  }, [itemsPerPage, totalPages]);

  const goToPage = useCallback((index: number) => {
    setCurrentPage(Math.max(0, Math.min(index, totalPages - 1)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextPage();
    if (isRightSwipe) prevPage();
  };

  const slides = Array.from({ length: totalPages }, (_, pageIndex) => {
    const start = pageIndex * itemsPerPage;
    return PRODUCTS.slice(start, start + itemsPerPage);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-mono font-bold text-foreground flex items-center gap-2">
          <Wrench className="w-4 h-4 text-primary" />
          Laboratorio Pro
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-1.5 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Productos anteriores"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="min-w-[2.5rem] text-center text-xs font-mono text-muted-foreground">
            {currentPage + 1}/{totalPages}
          </span>
          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="p-1.5 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Productos siguientes"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {slides.map((slide, pageIndex) => (
            <div
              key={pageIndex}
              className="w-full shrink-0 grid gap-3"
              style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }}
            >
              {slide.map((product) => (
                <a
                  key={product.title}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-colors h-full"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                      {product.store}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                      {product.title}
                    </h4>
                    {product.category && (
                      <p className="text-[10px] text-muted-foreground/70 mt-1 font-mono">
                        {product.category}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToPage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentPage
                ? "bg-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Ir a página ${index + 1}`}
            aria-current={index === currentPage ? "true" : undefined}
          />
        ))}
      </div>

      <p className="text-[9px] text-muted-foreground/70 font-mono">
        Enlaces de afiliado · Sin costo adicional para vos
      </p>
    </div>
  );
};

export default LabProRecommendations;
