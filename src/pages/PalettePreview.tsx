import { useEffect, useMemo, useState } from "react";

import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ColorSpec {
  name: string;
  varName: string;
  desc?: string;
}

const paletteGroups: { title: string; colors: ColorSpec[] }[] = [
  {
    title: "Base",
    colors: [
      { name: "Background", varName: "--background", desc: "Fondo de página" },
      { name: "Foreground", varName: "--foreground", desc: "Texto principal" },
    ],
  },
  {
    title: "Superficies",
    colors: [
      { name: "Card", varName: "--card", desc: "Tarjetas y paneles" },
      { name: "Card Foreground", varName: "--card-foreground", desc: "Texto sobre tarjeta" },
      { name: "Popover", varName: "--popover", desc: "Popover / dropdown" },
      { name: "Popover Foreground", varName: "--popover-foreground", desc: "Texto sobre popover" },
    ],
  },
  {
    title: "Acciones",
    colors: [
      { name: "Primary", varName: "--primary", desc: "Botón principal / links" },
      { name: "Primary Foreground", varName: "--primary-foreground", desc: "Texto sobre primary" },
      { name: "Secondary", varName: "--secondary", desc: "Botón secundario" },
      { name: "Secondary Foreground", varName: "--secondary-foreground", desc: "Texto sobre secondary" },
      { name: "Accent", varName: "--accent", desc: "Fondos de acento" },
      { name: "Accent Foreground", varName: "--accent-foreground", desc: "Texto sobre acento" },
      { name: "Destructive", varName: "--destructive", desc: "Errores / peligro" },
      { name: "Destructive Foreground", varName: "--destructive-foreground", desc: "Texto sobre destructive" },
      { name: "Highlight", varName: "--highlight", desc: "Resaltados" },
    ],
  },
  {
    title: "Estructura",
    colors: [
      { name: "Muted", varName: "--muted", desc: "Fondos apagados" },
      { name: "Muted Foreground", varName: "--muted-foreground", desc: "Texto secundario / hint" },
      { name: "Border", varName: "--border", desc: "Bordes" },
      { name: "Input", varName: "--input", desc: "Fondo de inputs" },
      { name: "Ring", varName: "--ring", desc: "Focus ring" },
    ],
  },
];

function parseHsl(value: string): { h: number; s: number; l: number } | null {
  const match = value.trim().match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
  if (!match) return null;
  return {
    h: Number(match[1]),
    s: Number(match[2]) / 100,
    l: Number(match[3]) / 100,
  };
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255)) as [number, number, number];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const transform = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function contrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function whiteRgb(): [number, number, number] {
  return [255, 255, 255];
}

function blackRgb(): [number, number, number] {
  return [0, 0, 0];
}

function formatRatio(value: number): string {
  return value.toFixed(2).replace(/\.00$/, "");
}

function wcagLevel(ratio: number): "AAA" | "AA" | "A" | "fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "A";
  return "fail";
}

function getColorValue(varName: string, root: HTMLElement): string {
  const raw = getComputedStyle(root).getPropertyValue(varName).trim();
  // Los tokens de shadcn son HSL sin función. Convertimos manualmente.
  const hsl = parseHsl(raw);
  if (!hsl) return raw;
  const [r, g, b] = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(r, g, b);
}

function getRgbValue(varName: string, root: HTMLElement): [number, number, number] | null {
  const raw = getComputedStyle(root).getPropertyValue(varName).trim();
  const hsl = parseHsl(raw);
  if (!hsl) return null;
  return hslToRgb(hsl.h, hsl.s, hsl.l);
}

interface SwatchData extends ColorSpec {
  hex: string;
  rgb: [number, number, number];
  contrastWhite: number;
  contrastBlack: number;
}

export default function PalettePreview() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const swatches: { group: string; items: SwatchData[] }[] = useMemo(() => {
    if (!mounted) return [];
    const root = document.documentElement;
    return paletteGroups.map((group) => ({
      group: group.title,
      items: group.colors
        .map((spec) => {
          const rgb = getRgbValue(spec.varName, root);
          const hex = getColorValue(spec.varName, root);
          if (!rgb) return null;
          return {
            ...spec,
            hex,
            rgb,
            contrastWhite: contrastRatio(rgb, whiteRgb()),
            contrastBlack: contrastRatio(rgb, blackRgb()),
          };
        })
        .filter(Boolean) as SwatchData[],
    }));
  }, [mounted, isDark]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Helmet>
        <title>Vista previa de la paleta · ElectroLab Pro</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Paleta de colores
            </h1>
            <p className="mt-1 text-muted-foreground">
              Vista previa de tokens del tema con contraste accesibilidad (WCAG 2.1).
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Modo: {isDark ? "Oscuro" : "Claro"}
            </span>
            <Button variant="outline" size="sm" onClick={() => setIsDark((d) => !d)}>
              {isDark ? "Probar claro" : "Probar oscuro"}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-8 rounded-lg border border-border bg-card p-4 text-sm text-card-foreground">
          <p>
            Los contrastes se calculan contra blanco puro (#FFFFFF) y negro puro (#000000). WCAG
            AA exige 4.5:1 para texto normal y 3:1 para texto grande. AAA exige 7:1.
          </p>
        </div>

        <div className="space-y-10">
          {swatches.map(({ group, items }) => (
            <section key={group} aria-labelledby={`group-${group}`}>
              <h2 id={`group-${group}`} className="mb-4 text-xl font-semibold text-foreground">
                {group}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((color) => (
                  <article
                    key={color.varName}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="h-16 w-16 shrink-0 rounded-lg border border-border shadow-sm"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <h3 className="font-medium text-card-foreground">{color.name}</h3>
                        <p className="text-xs text-muted-foreground">{color.desc}</p>
                        <p className="mt-1 font-mono text-sm text-foreground">{color.hex}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <ContrastBadge
                        label="Sobre blanco"
                        ratio={color.contrastWhite}
                        textColor="#FFFFFF"
                        bgColor={color.hex}
                      />
                      <ContrastBadge
                        label="Sobre negro"
                        ratio={color.contrastBlack}
                        textColor="#000000"
                        bgColor={color.hex}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
          <p>
            Nota: esta página es solo para revisión de diseño. No está indexada en buscadores.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContrastBadge({
  label,
  ratio,
  textColor,
  bgColor,
}: {
  label: string;
  ratio: number;
  textColor: string;
  bgColor: string;
}) {
  const level = wcagLevel(ratio);
  const pass = level !== "fail";
  return (
    <div className="rounded-md border border-border p-2">
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold"
          style={{
            color: pass ? "#15803d" : "#b91c1c",
            borderColor: pass ? "#15803d" : "#b91c1c",
            backgroundColor: pass ? "#f0fdf4" : "#fef2f2",
          }}
          aria-hidden="true"
        >
          {pass ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
        </span>
        <span className="text-xs font-medium text-foreground">{formatRatio(ratio)}:1</span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span
          className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {level === "fail" ? "fail" : level}
        </span>
      </div>
    </div>
  );
}
