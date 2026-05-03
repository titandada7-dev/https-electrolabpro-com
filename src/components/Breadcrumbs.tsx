import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

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
  "guia-resistencias": "Guía de resistencias",
};

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
}

/**
 * Breadcrumbs dinámicos basados en la ruta activa.
 * Usa <nav> + <ol> con etiquetas semánticas para que los bots
 * detecten la jerarquía del sitio (mejora SEO y AdSense).
 */
const Breadcrumbs = ({ lastLabel, className = "" }: BreadcrumbsProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  if (pathnames.length === 0) return null;

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
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const display = isLast && lastLabel ? lastLabel : formatSegment(value);

          return (
            <li key={to} className="flex items-center gap-1.5">
              <ChevronRight
                className="w-3 h-3 text-muted-foreground/40"
                aria-hidden="true"
              />
              {isLast ? (
                <span
                  className="text-foreground font-medium truncate max-w-[220px]"
                  aria-current="page"
                >
                  {display}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-foreground transition-colors"
                >
                  {display}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
