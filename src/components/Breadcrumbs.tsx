import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useEffect, useMemo } from "react";

/**
 * Mapa de slugs a nombres legibles para mejorar la UX y el SEO semántico
 * de los breadcrumbs. Si un slug no está aquí, se formatea automáticamente.
 */
const SLUG_LABELS: Record<string, string> = {
  articulos: "Artículos",
  blog: "Blog",
  "documentacion-tecnica": "Documentación Técnica",
  "sobre-nosotros": "Sobre Nosotros",
  "aviso-legal": "Aviso Legal",
  "terminos-y-condiciones": "Términos y Condiciones",
  privacidad: "Privacidad",
  contacto: "Contacto",
  glosario: "Glosario",
  "aprende-jugando": "Aprende Jugando",
  "guia-resistencias": "Guía de resistencias",
  "codigo-colores-resistencias": "Código de colores de resistencias",
  "ley-de-ohm": "Ley de Ohm",
  "protocolo-i2c": "Protocolo I2C",
  "pwm-arduino": "PWM con Arduino",
  "reguladores-voltaje": "Reguladores de voltaje",
  "sensores-arduino": "Sensores con Arduino",
  "pantalla-oled-ssd1306": "Pantallas OLED SSD1306",
  "fuentes-alimentacion": "Fuentes de alimentación",
  "leer-datasheet": "Cómo leer un datasheet",
  "circuitos-serie-paralelo": "Circuitos serie y paralelo",
  "que-arduino-comprar": "¿Qué Arduino comprar?",
  multimetro: "Multímetro",
  osciloscopio: "Osciloscopio",
  soldadura: "Soldadura",
  transistores: "Transistores",
  diodos: "Diodos",
  condensadores: "Condensadores",
  arduino: "Arduino",
  "mi-primer-laboratorio": "Mi primer laboratorio",
  "mis-5-proyectos-arduino-favoritos": "5 proyectos Arduino favoritos",
  "como-disene-mi-primer-pcb-kicad": "Mi primer PCB con KiCad",
};

/**
 * Sección "padre" implícita para slugs sueltos. Permite construir
 * jerarquías Home > Sección > Página incluso cuando la URL no tiene
 * el segmento intermedio (ej: /guia-resistencias → Recursos > Guía).
 */
const PARENT_SECTION: Record<string, { label: string; path: string }> = {
  "guia-resistencias": { label: "Recursos", path: "/" },
};

const SITE_ORIGIN = "https://electrolabpro.com";

const formatSegment = (segment: string): string => {
  if (SLUG_LABELS[segment]) return SLUG_LABELS[segment];
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

interface BreadcrumbsProps {
  /** Sobrescribe el último segmento (útil cuando el título del artículo difiere del slug). */
  lastLabel?: string;
  className?: string;
  /** Si es false, no inyecta JSON-LD BreadcrumbList (útil cuando ya lo hace otro componente). */
  injectJsonLd?: boolean;
}

interface Crumb {
  label: string;
  to: string;
  isLast: boolean;
}

/**
 * Breadcrumbs dinámicos basados en la ruta activa.
 * - Renderiza <nav><ol> semántico (Home > Sección > Página).
 * - Inyecta JSON-LD `BreadcrumbList` consistente con la jerarquía visible.
 */
const Breadcrumbs = ({ lastLabel, className = "", injectJsonLd = true }: BreadcrumbsProps) => {
  const location = useLocation();

  const crumbs: Crumb[] = useMemo(() => {
    const pathnames = location.pathname.split("/").filter(Boolean);
    if (pathnames.length === 0) return [];

    const list: Crumb[] = [];

    // Sección padre implícita (ej: guía suelta sin segmento /recursos/)
    const first = pathnames[0];
    if (pathnames.length === 1 && PARENT_SECTION[first]) {
      const p = PARENT_SECTION[first];
      list.push({ label: p.label, to: p.path, isLast: false });
    }

    pathnames.forEach((value, index) => {
      const isLast = index === pathnames.length - 1;
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const label = isLast && lastLabel ? lastLabel : formatSegment(value);
      list.push({ label, to, isLast });
    });

    return list;
  }, [location.pathname, lastLabel]);

  // Inyectar JSON-LD BreadcrumbList con id estable, comparando contenido para
  // evitar removals/re-inserciones en cada render (mantiene el mismo nodo).
  useEffect(() => {
    if (!injectJsonLd || crumbs.length === 0) return;

    const items = [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_ORIGIN },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        item: `${SITE_ORIGIN}${c.to}`,
      })),
    ];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    };
    const serialized = JSON.stringify(jsonLd);

    let script = document.getElementById("breadcrumbs-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "breadcrumbs-jsonld";
      document.head.appendChild(script);
    }
    if (script.textContent !== serialized) {
      script.textContent = serialized;
    }
  }, [crumbs, injectJsonLd]);

  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs text-muted-foreground ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li className="flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Inicio</span>
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.to} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" aria-hidden="true" />
            {c.isLast ? (
              <span
                className="text-foreground font-medium truncate max-w-[220px]"
                aria-current="page"
              >
                {c.label}
              </span>
            ) : (
              <Link to={c.to} className="hover:text-foreground transition-colors">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
