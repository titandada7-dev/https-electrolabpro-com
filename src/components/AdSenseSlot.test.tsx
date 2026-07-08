import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AdSenseSlot from "./AdSenseSlot";

/**
 * E2E de los espacios publicitarios:
 *  - Header (banner horizontal bajo el navbar).
 *  - Sidebar (rascacielos vertical con panel "Publicidad").
 *
 * jsdom no cambia el viewport visual, pero sí permite verificar las clases
 * responsive de Tailwind (`hidden xl:block`, `md:` breakpoints, container).
 * Estas clases son las que Tailwind traduce a @media queries en producción,
 * así que validar su presencia garantiza que el layout se mantiene al
 * cambiar de tamaño de pantalla (desktop vs mobile).
 */

describe("AdSenseSlot — header banner", () => {
  it("renderiza el banner de cabecera con contenedor y placeholder 'Publicidad'", () => {
    const { container } = render(<AdSenseSlot slot="1234567890" variant="header" />);
    // Slot AdSense presente con el id correcto
    const adWrap = container.querySelector('[data-adbanner="1234567890"]');
    expect(adWrap).not.toBeNull();
    // Placeholder visible mientras AdSense no responde
    expect(screen.getByText(/Publicidad/i)).toBeInTheDocument();
    // Contenedor centrado responsive: usa `container mx-auto` + padding.
    const outer = container.firstElementChild as HTMLElement;
    expect(outer.className).toMatch(/border-b/);
    expect(outer.className).toMatch(/bg-background/);
    const inner = outer.querySelector(".container") as HTMLElement | null;
    expect(inner).not.toBeNull();
    expect(inner!.className).toMatch(/mx-auto/);
    expect(inner!.className).toMatch(/px-4/);
    expect(inner!.className).toMatch(/sm:px-6/);
  });

  it("el header reserva altura mínima anti-CLS (100px móvil y desktop)", () => {
    const { container } = render(<AdSenseSlot slot="hdr" variant="header" />);
    const wrap = container.querySelector('[data-adbanner-wrap="hdr"]') as HTMLElement;
    expect(wrap).not.toBeNull();
    expect(wrap.style.minHeight).toBe("100px");
  });
});

describe("AdSenseSlot — sidebar (panel 'Publicidad')", () => {
  it("expone aside con aria-label 'Publicidad lateral' y label textual 'Publicidad'", () => {
    render(<AdSenseSlot slot="9876543210" variant="sidebar" />);
    const aside = screen.getByRole("complementary", { name: /Publicidad lateral/i });
    expect(aside.tagName).toBe("ASIDE");
    // El texto "Publicidad" aparece en el header del panel lateral.
    expect(screen.getByText(/Publicidad/i)).toBeInTheDocument();
  });

  it("usa clases responsive Tailwind: oculto en móvil, visible en xl+ (fixed, 160px ancho)", () => {
    const { container } = render(<AdSenseSlot slot="side" variant="sidebar" />);
    const aside = container.querySelector("aside") as HTMLElement;
    expect(aside).not.toBeNull();
    // Estas 4 clases son las que gobiernan el comportamiento desktop vs mobile.
    expect(aside.className).toMatch(/\bhidden\b/);
    expect(aside.className).toMatch(/\bxl:block\b/);
    expect(aside.className).toMatch(/\bfixed\b/);
    expect(aside.className).toMatch(/w-\[160px\]/);
  });

  it("el sidebar reserva 600px anti-CLS (formato vertical rascacielos)", () => {
    const { container } = render(<AdSenseSlot slot="sky" variant="sidebar" />);
    const wrap = container.querySelector('[data-adbanner-wrap="sky"]') as HTMLElement;
    expect(wrap).not.toBeNull();
    expect(wrap.style.minHeight).toBe("600px");
  });
});

describe("AdSenseSlot — persistencia al cambiar de viewport (desktop ↔ mobile)", () => {
  it("Header y Sidebar coexisten y ambos permanecen en el DOM tras re-render", () => {
    // Simula un layout típico: header en la cabecera + sidebar lateral.
    const { rerender, container } = render(
      <>
        <AdSenseSlot slot="header-slot" variant="header" />
        <AdSenseSlot slot="sidebar-slot" variant="sidebar" />
      </>,
    );

    // Ambos slots presentes inicialmente.
    expect(container.querySelector('[data-adbanner="header-slot"]')).not.toBeNull();
    expect(container.querySelector('[data-adbanner="sidebar-slot"]')).not.toBeNull();
    // El label "Publicidad" aparece al menos dos veces (header placeholder + sidebar label).
    expect(screen.getAllByText(/Publicidad/i).length).toBeGreaterThanOrEqual(2);

    // Simulamos un cambio de tamaño de pantalla: React re-renderiza el árbol
    // completo. Los slots deben seguir renderizados (no se desmontan solos)
    // y las clases responsive siguen presentes: eso garantiza que la
    // transición desktop→mobile no rompe la maquetación.
    rerender(
      <>
        <AdSenseSlot slot="header-slot" variant="header" />
        <AdSenseSlot slot="sidebar-slot" variant="sidebar" />
      </>,
    );

    const header = container.querySelector('[data-adbanner="header-slot"]');
    const sidebar = container.querySelector("aside");
    expect(header).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(sidebar!.className).toMatch(/hidden/);
    expect(sidebar!.className).toMatch(/xl:block/);
  });

  it("los slots no comparten IDs y renderizan aunque se monten en cualquier orden", () => {
    const { container } = render(
      <>
        <AdSenseSlot slot="a" variant="sidebar" />
        <AdSenseSlot slot="b" variant="header" />
      </>,
    );
    expect(container.querySelectorAll('[data-adbanner="a"]').length).toBe(1);
    expect(container.querySelectorAll('[data-adbanner="b"]').length).toBe(1);
  });
});
