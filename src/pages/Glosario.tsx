import { useState, useMemo, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft, Search, BookOpen } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import AdBanner from "@/components/AdBanner";

interface Term {
  term: string;
  definition: string;
  category: string;
  related?: string;
}

const TERMS: Term[] = [
  // Componentes pasivos
  { category: "Componentes pasivos", term: "Resistencia", definition: "Componente pasivo que se opone al paso de la corriente eléctrica. Su valor se mide en ohmios (Ω) y se identifica por bandas de colores.", related: "/articulos/codigo-colores-resistencias" },
  { category: "Componentes pasivos", term: "Condensador", definition: "Almacena energía en forma de campo eléctrico entre dos placas conductoras separadas por un dieléctrico. Capacidad medida en faradios (F).", related: "/articulos/condensadores" },
  { category: "Componentes pasivos", term: "Inductor (Bobina)", definition: "Componente que almacena energía en forma de campo magnético cuando circula corriente. Se opone a cambios bruscos de corriente. Medido en henrios (H)." },
  { category: "Componentes pasivos", term: "Potenciómetro", definition: "Resistencia variable de tres terminales que permite ajustar manualmente la tensión o corriente. Usado en perillas de volumen, dimmers, etc." },
  { category: "Componentes pasivos", term: "Varistor (VDR)", definition: "Componente cuya resistencia disminuye drásticamente al superar un voltaje umbral. Se usa para proteger circuitos de sobretensiones." },
  { category: "Componentes pasivos", term: "Termistor (NTC/PTC)", definition: "Resistencia que cambia con la temperatura. NTC disminuye con calor, PTC aumenta. Se usa en sensores y protecciones térmicas." },

  // Semiconductores
  { category: "Semiconductores", term: "Diodo", definition: "Componente que permite el paso de corriente en un solo sentido (ánodo→cátodo). Esencial para rectificación y protección.", related: "/articulos/diodos" },
  { category: "Semiconductores", term: "LED", definition: "Diodo emisor de luz (Light Emitting Diode). Convierte corriente eléctrica en luz visible o infrarroja con alta eficiencia." },
  { category: "Semiconductores", term: "Diodo Zener", definition: "Diodo diseñado para conducir en inversa a un voltaje específico. Usado para regular tensión o crear referencias estables." },
  { category: "Semiconductores", term: "Transistor BJT", definition: "Transistor de unión bipolar. Tres terminales (base, colector, emisor). Tipos NPN y PNP. Amplifica corriente o conmuta cargas.", related: "/articulos/transistores" },
  { category: "Semiconductores", term: "MOSFET", definition: "Transistor controlado por voltaje en lugar de corriente. Más eficiente que un BJT para conmutación de potencia. Tipos N-channel y P-channel." },
  { category: "Semiconductores", term: "Tiristor (SCR)", definition: "Semiconductor de 4 capas que actúa como interruptor unidireccional controlado. Usado en control de potencia AC." },
  { category: "Semiconductores", term: "Triac", definition: "Equivalente bidireccional al SCR. Conmuta corriente alterna en ambos sentidos. Común en dimmers de iluminación AC." },
  { category: "Semiconductores", term: "Optoacoplador", definition: "Encapsulado que combina un LED y un fototransistor para aislar eléctricamente dos circuitos transmitiendo solo señal luminosa." },

  // Magnitudes y leyes
  { category: "Magnitudes y leyes", term: "Voltaje (V)", definition: "Diferencia de potencial eléctrico entre dos puntos. Medido en voltios. Es la 'presión' que empuja a los electrones." },
  { category: "Magnitudes y leyes", term: "Corriente (I)", definition: "Flujo ordenado de carga eléctrica por unidad de tiempo. Se mide en amperios (A). 1A = 6.24×10¹⁸ electrones/seg." },
  { category: "Magnitudes y leyes", term: "Resistencia (R)", definition: "Oposición al flujo de corriente. Se mide en ohmios (Ω). Convierte energía eléctrica en calor por efecto Joule." },
  { category: "Magnitudes y leyes", term: "Ley de Ohm", definition: "Relaciona voltaje, corriente y resistencia: V = I × R. Es la fórmula fundamental de la electrónica.", related: "/articulos/ley-de-ohm" },
  { category: "Magnitudes y leyes", term: "Potencia (P)", definition: "Energía consumida o entregada por unidad de tiempo. P = V × I. Se mide en vatios (W)." },
  { category: "Magnitudes y leyes", term: "Frecuencia (Hz)", definition: "Número de ciclos por segundo de una señal periódica. Medida en hercios. La red eléctrica argentina opera a 50 Hz." },
  { category: "Magnitudes y leyes", term: "Impedancia (Z)", definition: "Oposición total al paso de corriente alterna. Combina resistencia y reactancia. Se mide en ohmios." },
  { category: "Magnitudes y leyes", term: "Leyes de Kirchhoff", definition: "Dos leyes: la suma de corrientes que entran a un nodo es cero (KCL); la suma de voltajes en un lazo cerrado es cero (KVL)." },

  // Circuitos
  { category: "Circuitos", term: "Circuito en serie", definition: "Componentes conectados uno tras otro. La misma corriente fluye por todos. Las resistencias se suman.", related: "/articulos/circuitos-serie-paralelo" },
  { category: "Circuitos", term: "Circuito en paralelo", definition: "Componentes conectados entre los mismos dos nodos. Comparten voltaje. Las resistencias se combinan: 1/Rt = 1/R1 + 1/R2." },
  { category: "Circuitos", term: "Divisor de tensión", definition: "Circuito de dos resistencias en serie que entrega un voltaje proporcional. Vout = Vin × R2/(R1+R2)." },
  { category: "Circuitos", term: "Filtro RC", definition: "Combinación resistor-condensador que deja pasar ciertas frecuencias y atenúa otras. Pasa-bajos o pasa-altos según topología." },
  { category: "Circuitos", term: "Puente rectificador", definition: "Configuración de 4 diodos que convierte corriente alterna (AC) en pulsante directa (DC)." },
  { category: "Circuitos", term: "Pull-up / Pull-down", definition: "Resistencia conectada a Vcc (pull-up) o GND (pull-down) que define el estado por defecto de un pin digital flotante." },
  { category: "Circuitos", term: "Decoupling", definition: "Capacitor (típicamente 0.1µF) colocado cerca del pin VCC de un IC para filtrar ruido de alta frecuencia." },

  // Microcontroladores y digital
  { category: "Microcontroladores", term: "Microcontrolador (MCU)", definition: "Chip que integra CPU, memoria RAM, Flash y periféricos en un solo encapsulado. Ejemplos: ATmega328P, ESP32." },
  { category: "Microcontroladores", term: "Arduino", definition: "Plataforma open-source de hardware y software basada en microcontroladores AVR/ARM. Incluye IDE simplificado en C/C++.", related: "/articulos/arduino" },
  { category: "Microcontroladores", term: "ESP32", definition: "Microcontrolador dual-core de Espressif con WiFi y Bluetooth integrados. Ideal para proyectos IoT.", related: "/articulos/que-arduino-comprar" },
  { category: "Microcontroladores", term: "GPIO", definition: "General Purpose Input/Output. Pin digital programable como entrada o salida. Su voltaje lógico depende del MCU (3.3V o 5V)." },
  { category: "Microcontroladores", term: "PWM", definition: "Pulse Width Modulation. Técnica que simula voltaje analógico encendiendo y apagando un pin a alta frecuencia.", related: "/articulos/pwm-arduino" },
  { category: "Microcontroladores", term: "ADC", definition: "Convertidor Analógico-Digital. Mide voltajes y los convierte en números. Resolución típica: 10 bits (0-1023) o 12 bits (0-4095)." },
  { category: "Microcontroladores", term: "DAC", definition: "Convertidor Digital-Analógico. Genera un voltaje analógico real a partir de un valor digital." },
  { category: "Microcontroladores", term: "Bootloader", definition: "Pequeño programa pregrabado en el MCU que permite cargar firmware sin programador externo, generalmente vía USB." },

  // Comunicación
  { category: "Comunicación", term: "I2C", definition: "Protocolo serial síncrono de 2 hilos (SDA, SCL). Permite conectar múltiples dispositivos con direcciones únicas en el mismo bus.", related: "/articulos/protocolo-i2c" },
  { category: "Comunicación", term: "SPI", definition: "Serial Peripheral Interface. Protocolo full-duplex de 4 hilos (MOSI, MISO, SCK, SS). Más rápido que I2C." },
  { category: "Comunicación", term: "UART", definition: "Universal Asynchronous Receiver-Transmitter. Comunicación serial asíncrona de 2 hilos (TX, RX). Usado en consolas de debug." },
  { category: "Comunicación", term: "USB", definition: "Universal Serial Bus. Estándar de conexión y alimentación. Versiones desde 1.0 (1.5 Mbps) hasta USB4 (40 Gbps)." },
  { category: "Comunicación", term: "OneWire", definition: "Protocolo desarrollado por Dallas/Maxim que requiere un solo cable de datos. Usado por sensores DS18B20." },

  // Herramientas y medición
  { category: "Herramientas", term: "Multímetro", definition: "Instrumento que mide voltaje, corriente, resistencia y otras magnitudes. El más versátil del laboratorio.", related: "/articulos/multimetro" },
  { category: "Herramientas", term: "Osciloscopio", definition: "Instrumento que visualiza señales eléctricas en función del tiempo. Esencial para debugging de comunicaciones y PWM.", related: "/articulos/osciloscopio" },
  { category: "Herramientas", term: "Protoboard", definition: "Tablero perforado para armar prototipos sin soldar. Conexiones internas en filas y columnas." },
  { category: "Herramientas", term: "Estación de Soldadura", definition: "Equipo profesional con control de temperatura para soldar componentes electrónicos.", related: "/articulos/soldadura-electronica" },
  { category: "Herramientas", term: "Flux", definition: "Pasta o líquido que limpia óxidos del cobre y mejora la adhesión del estaño durante la soldadura." },

  // Fuentes y potencia
  { category: "Fuentes y potencia", term: "Fuente lineal", definition: "Convierte AC a DC usando transformador + rectificador + regulador. Bajo ruido pero baja eficiencia.", related: "/articulos/fuentes-de-alimentacion" },
  { category: "Fuentes y potencia", term: "Fuente conmutada", definition: "Usa conmutación de alta frecuencia para convertir energía. Alta eficiencia (>85%) pero genera ruido EMI." },
  { category: "Fuentes y potencia", term: "Buck converter", definition: "Regulador conmutado reductor. Baja un voltaje DC con eficiencia >90%.", related: "/articulos/reguladores-voltaje" },
  { category: "Fuentes y potencia", term: "Boost converter", definition: "Regulador conmutado elevador. Sube un voltaje DC manteniendo alta eficiencia." },
  { category: "Fuentes y potencia", term: "LDO", definition: "Low Drop-Out regulator. Regulador lineal que necesita muy poca diferencia entre Vin y Vout (~100-300 mV)." },

  // PCB y diseño
  { category: "PCB y diseño", term: "PCB", definition: "Printed Circuit Board. Placa de fibra de vidrio con pistas de cobre que conectan componentes electrónicos." },
  { category: "PCB y diseño", term: "SMD", definition: "Surface Mount Device. Componentes diseñados para soldarse sobre la superficie del PCB, sin perforar." },
  { category: "PCB y diseño", term: "Through-Hole (THT)", definition: "Componentes con patas que atraviesan el PCB y se sueldan del lado opuesto. Más fáciles de soldar a mano." },
  { category: "PCB y diseño", term: "Vía", definition: "Pequeña perforación metalizada en un PCB que conecta pistas de distintas capas." },
  { category: "PCB y diseño", term: "KiCad", definition: "Suite de software libre para diseño de esquemáticos y PCBs profesionales. Alternativa open-source a Altium o Eagle." },
];

const CATEGORIES = Array.from(new Set(TERMS.map((t) => t.category)));

const Glosario = () => {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string>("Todas");

  usePageMeta({
    title: "Glosario de Electrónica: 50+ Términos Técnicos | ElectroLab",
    description: "Diccionario de términos de electrónica: resistencia, condensador, MOSFET, PWM, microcontrolador, PCB y más. Definiciones claras en español.",
  });

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "name": "Glosario de Electrónica - ElectroLab Pro",
      "description": "Diccionario técnico de electrónica con más de 50 términos definidos en español.",
      "hasDefinedTerm": TERMS.map((t) => ({
        "@type": "DefinedTerm",
        "name": t.term,
        "description": t.definition,
        "inDefinedTermSet": "https://electrolabpro.com/glosario",
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "glosario-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.getElementById("glosario-jsonld")?.remove();
    document.head.appendChild(script);
    return () => { document.getElementById("glosario-jsonld")?.remove(); };
  }, []);

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return TERMS.filter((t) => {
      const matchCat = activeCat === "Todas" || t.category === activeCat;
      const matchSearch = !s || t.term.toLowerCase().includes(s) || t.definition.toLowerCase().includes(s);
      return matchCat && matchSearch;
    });
  }, [search, activeCat]);

  return (
    <div className="min-h-screen bg-background bg-grid">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary glow-icon" />
            <span className="text-lg md:text-xl font-mono font-bold text-foreground">
              Electro<span className="text-primary">Lab</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs />
      </div>

      <section
        className="relative overflow-hidden py-12 md:py-16"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]" style={{ background: 'hsl(199 89% 60% / 0.4)' }} />
        <div className="relative container mx-auto px-4 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Diccionario Técnico
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            Glosario de Electrónica
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Más de 50 términos técnicos definidos en español, organizados por categoría. Tu referencia rápida cuando un concepto se te escapa.
          </p>
        </div>
      </section>

      {/* AdSense: Header banner */}
      <div className="container mx-auto px-4 pt-6">
        <AdBanner slot={AD_SLOT_INLINE} format="auto" className="min-h-[100px] md:min-h-[120px]" fallbackUrl="/" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Buscador */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar término o definición..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            aria-label="Buscar en el glosario"
          />
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCat("Todas")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
              activeCat === "Todas" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Todas ({TERMS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TERMS.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                  activeCat === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Resultados */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No se encontraron términos. Probá con otra búsqueda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((t) => (
              <article
                key={t.term}
                className="p-5 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="text-base font-mono font-bold text-foreground">{t.term}</h2>
                  <span className="text-[10px] uppercase tracking-wider text-primary/80 font-semibold whitespace-nowrap">{t.category}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.definition}</p>
                {t.related && (
                  <Link to={t.related} className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline font-semibold">
                    Leer guía completa →
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 rounded-xl border border-border bg-card/50 text-center">
          <h3 className="text-lg font-mono font-bold text-foreground mb-2">¿Falta un término?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Si no encontrás lo que buscás, contactanos y lo agregamos al glosario.
          </p>
          <Link to="/contacto" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all">
            Sugerir un término
          </Link>
        </div>
      </div>

      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A. Sanchez</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4 mb-3">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Contacto</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Sobre Nosotros</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/terminos-y-condiciones" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Glosario;
