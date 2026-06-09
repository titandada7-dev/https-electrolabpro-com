import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Calculator, FileText, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Google Analytics tracking helper (gtag se inyecta desde index.html)
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const trackSearchEvent = (eventName: string, params: Record<string, unknown>) => {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch {
    // Silencioso: nunca rompemos UX por analytics
  }
};

type SearchItem = {
  title: string;
  description: string;
  type: "articulo" | "calculadora" | "glosario" | "pagina";
  to: string;
  scrollTo?: string;
  keywords?: string;
};

const SEARCH_INDEX: SearchItem[] = [
  // ===== ARTÍCULOS =====
  { type: "articulo", title: "Código de Colores de Resistencias", description: "Cómo leer resistencias de 4 y 5 bandas", to: "/articulos/codigo-colores-resistencias", keywords: "ohm omega bandas colores resistor" },
  { type: "articulo", title: "Condensadores", description: "Tipos, funciones y cómo leer el código cerámico", to: "/articulos/condensadores", keywords: "capacitor faradio cerámico electrolítico" },
  { type: "articulo", title: "Diodos", description: "Guía básica: rectificador, Zener, LED, Schottky", to: "/articulos/diodos", keywords: "rectificador zener led schottky semiconductor" },
  { type: "articulo", title: "Ley de Ohm", description: "V = I × R explicada con ejemplos", to: "/articulos/ley-de-ohm", keywords: "voltaje corriente resistencia formula" },
  { type: "articulo", title: "Multímetro", description: "Cómo usar un multímetro digital paso a paso", to: "/articulos/multimetro", keywords: "tester medir voltaje continuidad" },
  { type: "articulo", title: "Circuitos Serie vs Paralelo", description: "Diferencias, fórmulas y cuándo usar cada uno", to: "/articulos/circuitos-serie-paralelo", keywords: "kirchhoff nodos mallas" },
  { type: "articulo", title: "Transistores", description: "BJT, MOSFET: cómo funcionan y cómo elegirlos", to: "/articulos/transistores", keywords: "bjt mosfet npn pnp amplificador switch" },
  { type: "articulo", title: "Arduino para Principiantes", description: "Qué es Arduino y cómo empezar", to: "/articulos/arduino", keywords: "microcontrolador uno nano sketch ide" },
  { type: "articulo", title: "Osciloscopio", description: "Cómo usar un osciloscopio y leer señales", to: "/articulos/osciloscopio", keywords: "señal frecuencia amplitud trigger" },
  { type: "articulo", title: "Fuentes de Alimentación", description: "Lineales, conmutadas y cómo elegirlas", to: "/articulos/fuentes-de-alimentacion", keywords: "transformador switching atx voltaje" },
  { type: "articulo", title: "Soldadura Electrónica", description: "Técnicas, estaciones de soldadura y consejos", to: "/articulos/soldadura-electronica", keywords: "estaño flux pcb estación soldador" },
  { type: "articulo", title: "Protocolo I2C", description: "Comunicación I2C entre dispositivos", to: "/articulos/protocolo-i2c", keywords: "sda scl bus serial maestro esclavo" },
  { type: "articulo", title: "Sensores con Arduino", description: "Tipos de sensores y cómo conectarlos", to: "/articulos/sensores-arduino", keywords: "dht11 hcsr04 temperatura ultrasonido" },
  { type: "articulo", title: "Pantalla OLED SSD1306", description: "Cómo usar pantallas OLED con Arduino", to: "/articulos/pantalla-oled-ssd1306", keywords: "display lcd 128x64 i2c" },
  { type: "articulo", title: "Qué Arduino Comprar", description: "UNO vs Nano vs Mega vs ESP32", to: "/articulos/que-arduino-comprar", keywords: "comparativa esp32 atmega placa" },
  { type: "articulo", title: "PWM Arduino", description: "Cómo controlar motores y LEDs con PWM", to: "/articulos/pwm-arduino", keywords: "analogwrite duty cycle motor servo dimmer" },
  { type: "articulo", title: "Reguladores de Voltaje", description: "7805, LM317 y Buck Converters", to: "/articulos/reguladores-voltaje", keywords: "lm7805 lm317 buck converter linear switching" },
  { type: "articulo", title: "Cómo Leer un Datasheet", description: "LM358, NE555 y guía paso a paso", to: "/articulos/leer-datasheet", keywords: "hoja datos pinout absolute maximum ratings" },
  { type: "articulo", title: "Mi Primer Laboratorio", description: "Blog: equipamiento básico para empezar", to: "/blog/mi-primer-laboratorio", keywords: "herramientas estación setup workshop" },
  { type: "articulo", title: "5 Proyectos Arduino Favoritos", description: "Blog: ideas con código y esquemas", to: "/blog/mis-5-proyectos-arduino-favoritos", keywords: "proyectos diy ideas tutorial" },
  { type: "articulo", title: "Mi Primer PCB con KiCad", description: "Blog: diseño de circuitos impresos", to: "/blog/como-disene-mi-primer-pcb-kicad", keywords: "kicad pcb diseño placa circuito impreso" },

  // ===== CALCULADORAS =====
  { type: "calculadora", title: "Calculadora Ley de Ohm", description: "V = I × R · Calcula voltaje, corriente o resistencia", to: "/", scrollTo: "calculadora", keywords: "ohm voltaje corriente resistencia" },
  { type: "calculadora", title: "Calculadora de Resistencia para LED", description: "Resistencia limitadora ideal para tu LED", to: "/", scrollTo: "calculadora", keywords: "led diodo limitador wattage" },
  { type: "calculadora", title: "Decodificador de Resistencias", description: "Lee resistencias por colores (4 y 5 bandas)", to: "/", scrollTo: "calculadora", keywords: "color bandas resistor decoder" },
  { type: "calculadora", title: "Decodificador SMD", description: "Lee resistencias SMD de 3 y 4 dígitos", to: "/", scrollTo: "calculadora", keywords: "smd superficie superficial dígitos" },
  { type: "calculadora", title: "Divisor de Voltaje", description: "Calcula Vout en un divisor resistivo", to: "/", scrollTo: "calculadora", keywords: "vout potenciómetro adc sensor" },
  { type: "calculadora", title: "Filtro RC", description: "Frecuencia de corte de filtros pasa bajos/altos", to: "/", scrollTo: "calculadora", keywords: "pasa bajos altos frecuencia corte capacitor" },
  { type: "calculadora", title: "Reactancia Capacitiva", description: "Xc = 1/(2πfC)", to: "/", scrollTo: "calculadora", keywords: "impedancia ac alterna frecuencia condensador" },
  { type: "calculadora", title: "Timer 555", description: "Calcula astable y monoestable del NE555", to: "/", scrollTo: "calculadora", keywords: "ne555 lm555 oscilador frecuencia astable monoestable" },
  { type: "calculadora", title: "Conversor de Unidades", description: "Convierte mA, μF, kΩ, MHz, etc.", to: "/", scrollTo: "calculadora", keywords: "unidades prefijos mili micro nano kilo mega" },

  // ===== GLOSARIO =====
  { type: "glosario", title: "Glosario de Electrónica", description: "50+ términos técnicos con búsqueda y filtros", to: "/glosario", keywords: "diccionario términos definiciones vocabulario" },

  // ===== PÁGINAS =====
  { type: "pagina", title: "Sobre Nosotros", description: "Conoce a J.A. Sánchez y ElectroLab Pro", to: "/sobre-nosotros" },
  { type: "pagina", title: "Contacto", description: "Email, redes y formulario de contacto", to: "/contacto" },
];

const TYPE_META = {
  articulo: { label: "Artículos", icon: BookOpen, color: "text-primary" },
  calculadora: { label: "Calculadoras", icon: Calculator, color: "text-emerald-500" },
  glosario: { label: "Glosario", icon: FileText, color: "text-amber-500" },
  pagina: { label: "Páginas", icon: ArrowRight, color: "text-violet-500" },
} as const;

// Sugerencias mostradas en estado vacío y como fallback en "sin resultados"
const POPULAR_SUGGESTIONS = [
  "Arduino",
  "Ley de Ohm",
  "Resistencias",
  "Transistores",
  "Soldadura",
  "555",
  "I2C",
  "Multímetro",
];

// Atajos rápidos a destinos clave del sitio (sin escribir nada)
const QUICK_LINKS: SearchItem[] = [
  { type: "articulo", title: "Arduino para Principiantes", description: "Empezá desde cero", to: "/articulos/arduino" },
  { type: "calculadora", title: "Calculadora Ley de Ohm", description: "V = I × R", to: "/", scrollTo: "calculadora" },
  { type: "glosario", title: "Glosario Técnico", description: "50+ términos de electrónica", to: "/glosario" },
  { type: "articulo", title: "Cómo Leer un Datasheet", description: "LM358 y NE555", to: "/articulos/leer-datasheet" },
];

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const trackedQueryRef = useRef<string>("");

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      trackedQueryRef.current = "";
      trackSearchEvent("search_open", { source: "global_search" });
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return SEARCH_INDEX;
    const q = query.toLowerCase().trim();
    return SEARCH_INDEX.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.keywords || ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    filtered.forEach((item) => {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
    });
    return groups;
  }, [filtered]);

  const flatItems = useMemo(() => {
    const order: Array<keyof typeof TYPE_META> = ["articulo", "calculadora", "glosario", "pagina"];
    return order.flatMap((t) => grouped[t] || []);
  }, [grouped]);

  const hasQuery = query.trim().length > 0;
  const noResults = hasQuery && flatItems.length === 0;

  // GA tracking: registramos términos buscados con debounce de 800ms
  // (evita reportar cada tecla mientras el usuario tipea)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;
    const handle = setTimeout(() => {
      if (trackedQueryRef.current === trimmed) return;
      trackedQueryRef.current = trimmed;
      trackSearchEvent("search", {
        search_term: trimmed,
        results_count: flatItems.length,
        has_results: flatItems.length > 0,
      });
    }, 800);
    return () => clearTimeout(handle);
  }, [query, flatItems.length]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      // GA tracking: qué resultado clickeó el usuario y para qué término
      trackSearchEvent("search_result_click", {
        search_term: query.trim() || "(empty)",
        result_title: item.title,
        result_type: item.type,
        result_to: item.to,
        result_position: flatItems.indexOf(item) + 1,
      });
      onOpenChange(false);
      if (item.scrollTo && window.location.pathname === item.to) {
        document.getElementById(item.scrollTo)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(item.to);
        if (item.scrollTo) {
          setTimeout(() => {
            document.getElementById(item.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }
      }
    },
    [navigate, onOpenChange, query, flatItems]
  );

  const handleSuggestionClick = useCallback((suggestion: string) => {
    trackSearchEvent("search_suggestion_click", { suggestion });
    setQuery(suggestion);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatItems[activeIndex]) {
      e.preventDefault();
      handleSelect(flatItems[activeIndex]);
    }
  };

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  let runningIndex = -1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden top-[15%] translate-y-0">
        <VisuallyHidden>
          <DialogTitle>Buscador global</DialogTitle>
        </VisuallyHidden>

        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar artículos, calculadoras, glosario..."
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
            aria-label="Buscar en ElectroLab Pro"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-muted text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {noResults ? (
            <div className="px-6 py-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted/50 mb-4">
                <Search className="w-6 h-6 text-muted-foreground/80" />
              </div>
              <p className="text-base font-medium text-foreground mb-1">
                Sin resultados para <span className="font-mono">"{query}"</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Probá con otra palabra o elegí una sugerencia popular:
              </p>

              {/* Sugerencias clickeables */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {POPULAR_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card hover:bg-accent hover:border-primary/40 transition-colors text-foreground"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                    {s}
                  </button>
                ))}
              </div>

              {/* Atajos rápidos */}
              <div className="text-left max-w-md mx-auto border-t border-border pt-4">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-muted-foreground/70 mb-2 px-1">
                  O explorá esto
                </p>
                {QUICK_LINKS.map((item) => {
                  const meta = TYPE_META[item.type];
                  const Icon = meta.icon;
                  return (
                    <button
                      key={item.title}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${meta.color}`} />
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : !hasQuery ? (
            <>
              {/* Estado vacío inicial: sugerencias populares + categorías */}
              <div className="px-4 py-3 border-b border-border">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-muted-foreground/70 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" />
                  Búsquedas populares
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-border bg-card hover:bg-accent hover:border-primary/40 transition-colors text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {!noResults && (

            (Object.keys(TYPE_META) as Array<keyof typeof TYPE_META>).map((type) => {
              const items = grouped[type];
              if (!items || items.length === 0) return null;
              const meta = TYPE_META[type];
              const Icon = meta.icon;

              return (
                <div key={type} className="px-2 pb-2">
                  <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                    {meta.label} · {items.length}
                  </div>
                  {items.map((item) => {
                    runningIndex++;
                    const isActive = runningIndex === activeIndex;
                    return (
                      <button
                        key={`${item.to}-${item.title}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(runningIndex)}
                        className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          isActive ? "bg-accent" : "hover:bg-accent/50"
                        }`}
                      >
                        <div className={`mt-0.5 shrink-0 ${meta.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        </div>
                        {isActive && (
                          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="hidden sm:flex items-center justify-between border-t border-border px-4 py-2.5 bg-muted/30 text-[10px] font-mono text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">↓</kbd>
              navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">↵</kbd>
              abrir
            </span>
          </div>
          <span>{flatItems.length} resultado{flatItems.length !== 1 ? "s" : ""}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
