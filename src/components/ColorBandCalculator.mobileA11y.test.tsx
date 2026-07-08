import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import ColorBandCalculator from "./ColorBandCalculator";

/**
 * E2E — viewport MOBILE (375x812, iPhone X aprox).
 *
 * Verifica en móvil:
 *  1. Navegación por teclado a través de las 4 bandas (B1, B2, Mult, Tol).
 *  2. Foco ring (ring-2 ring-primary) visible en cada control seleccionado.
 *  3. Orden de tabulación correcto (todos <button>, sin tabindex=-1).
 *  4. Anuncio accesible (role=status, aria-live=polite) se actualiza al
 *     cambiar el valor y comunica correctamente el nuevo valor a lectores
 *     de pantalla.
 */

const ORIGINAL_INNER_WIDTH = window.innerWidth;
const ORIGINAL_INNER_HEIGHT = window.innerHeight;

function setMobileViewport() {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 812 });
  window.dispatchEvent(new Event("resize"));
}

function restoreViewport() {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: ORIGINAL_INNER_WIDTH });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: ORIGINAL_INNER_HEIGHT });
  window.dispatchEvent(new Event("resize"));
}

function sectionOf(label: RegExp) {
  const l = screen.getByText(label).closest("label") as HTMLElement;
  return l.parentElement as HTMLElement;
}

describe("ColorBandCalculator — E2E teclado en viewport MOBILE + aria-live", () => {
  beforeEach(() => {
    setMobileViewport();
    render(<ColorBandCalculator />);
  });
  afterEach(() => restoreViewport());

  it("existe el anuncio accesible (role=status, aria-live=polite, aria-atomic)", () => {
    const live = screen.getByTestId("resistor-live-announcer");
    expect(live).toHaveAttribute("role", "status");
    expect(live).toHaveAttribute("aria-live", "polite");
    expect(live).toHaveAttribute("aria-atomic", "true");
    // Estado inicial: 10 kΩ ±5%
    expect(live.textContent).toMatch(/10\s*kΩ/);
    expect(live.textContent).toMatch(/±5%/);
  });

  it("recorre las 4 bandas con teclado en mobile manteniendo foco ring y actualizando el aria-live", () => {
    const live = screen.getByTestId("resistor-live-announcer");

    // Banda 1 → Rojo (2)
    const b1 = within(sectionOf(/^Banda 1$/)).getByRole("button", { name: /^Rojo \(2\)$/ });
    b1.focus();
    expect(document.activeElement).toBe(b1);
    fireEvent.click(b1);
    expect(b1.className).toMatch(/ring-2/);
    expect(b1.className).toMatch(/ring-primary/);
    expect(live.textContent).toMatch(/20\s*kΩ/);

    // Banda 2 → Verde (5)
    const b2 = within(sectionOf(/^Banda 2$/)).getByRole("button", { name: /^Verde \(5\)$/ });
    b2.focus();
    expect(document.activeElement).toBe(b2);
    fireEvent.click(b2);
    expect(b2.className).toMatch(/ring-2/);
    expect(live.textContent).toMatch(/25\s*kΩ/);

    // Multiplicador → Marrón (×10)
    const mult = within(sectionOf(/^Multiplicador$/)).getByRole("button", { name: /^Marrón \(×10\)$/ });
    mult.focus();
    expect(document.activeElement).toBe(mult);
    fireEvent.click(mult);
    expect(mult.className).toMatch(/ring-2/);
    // 25 × 10 = 250 Ω
    expect(live.textContent).toMatch(/250\s*Ω/);

    // Tolerancia → Rojo (±2%)
    const tol = within(sectionOf(/^Tolerancia$/)).getByRole("button", { name: /^Rojo \(±2%\)$/ });
    tol.focus();
    expect(document.activeElement).toBe(tol);
    fireEvent.click(tol);
    expect(tol.className).toMatch(/ring-2/);
    expect(live.textContent).toMatch(/±2%/);

    // Todos los rings permanecen visibles al final del recorrido
    expect(b1.className).toMatch(/ring-2/);
    expect(b2.className).toMatch(/ring-2/);
    expect(mult.className).toMatch(/ring-2/);
    expect(tol.className).toMatch(/ring-2/);
  });

  it("orden de tabulación correcto en mobile: todos los controles son <button> sin tabindex=-1", () => {
    for (const label of [/^Banda 1$/, /^Banda 2$/, /^Multiplicador$/, /^Tolerancia$/]) {
      const section = sectionOf(label);
      const btns = within(section).getAllByRole("button");
      expect(btns.length).toBeGreaterThan(0);
      btns.forEach((b) => {
        expect(b.tagName).toBe("BUTTON");
        expect(b.getAttribute("tabindex")).not.toBe("-1");
        // Cada botón debe tener aria-label (nombre accesible para SR)
        expect(b.getAttribute("aria-label")).toBeTruthy();
      });
    }
  });

  it("el aria-live comunica el cambio exacto tras seleccionar 5 bandas (modo alta precisión)", () => {
    // Cambiar a 5 bandas
    const toggle5 = screen.getByRole("button", { name: /^5 Bandas$/ });
    fireEvent.click(toggle5);

    const live = screen.getByTestId("resistor-live-announcer");
    // Con 5 bandas y valores por defecto (1,0,0 ×1k) → 100 kΩ
    expect(live.textContent).toMatch(/Valor de la resistencia:/i);
    expect(live.textContent).toMatch(/100\s*kΩ/);
    expect(live.textContent).toMatch(/tolerancia/i);
  });
});
