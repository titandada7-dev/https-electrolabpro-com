import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import ColorBandCalculator from "./ColorBandCalculator";

/**
 * E2E de navegación por teclado a través de las 4 bandas.
 * Comprueba que:
 *  - Cada control (B1, B2, Multiplicador, Tolerancia) recibe foco.
 *  - Enter/Space (simulado con fireEvent.click sobre <button>) cambia el color.
 *  - El display en Ω se actualiza tras cada selección.
 *  - El focus ring (`ring-2 ring-primary`) permanece visible en el botón
 *    seleccionado de cada banda a lo largo del flujo.
 */

function sectionOf(label: RegExp) {
  const l = screen.getByText(label).closest("label") as HTMLElement;
  return l.parentElement as HTMLElement;
}

function displayText() {
  const header = screen.getByText(/Valor de la Resistencia/i);
  return header.parentElement!.textContent || "";
}

describe("ColorBandCalculator — flujo E2E por teclado (4 bandas)", () => {
  beforeEach(() => render(<ColorBandCalculator />));

  it("navegación completa: B1→B2→Multiplicador→Tolerancia actualiza el valor y mantiene ring visible en cada paso", () => {
    // Estado inicial ya conocido: 10 kΩ ±5%
    expect(displayText()).toMatch(/10\s*kΩ/);

    // ---- Paso 1: Banda 1 → Rojo (2) ----
    const b1Section = sectionOf(/^Banda 1$/);
    const rojoB1 = within(b1Section).getByRole("button", { name: /^Rojo \(2\)$/ });
    rojoB1.focus();
    expect(document.activeElement).toBe(rojoB1);
    fireEvent.click(rojoB1); // Enter/Space en <button> nativo
    expect(rojoB1.className).toMatch(/ring-2/);
    expect(rojoB1.className).toMatch(/ring-primary/);
    // 2 0 ×1k = 20 kΩ
    expect(displayText()).toMatch(/20\s*kΩ/);

    // ---- Paso 2: Banda 2 → Rojo (2) ----
    const b2Section = sectionOf(/^Banda 2$/);
    const rojoB2 = within(b2Section).getByRole("button", { name: /^Rojo \(2\)$/ });
    rojoB2.focus();
    expect(document.activeElement).toBe(rojoB2);
    fireEvent.click(rojoB2);
    expect(rojoB2.className).toMatch(/ring-2/);
    // 2 2 ×1k = 22 kΩ
    expect(displayText()).toMatch(/22\s*kΩ/);

    // ---- Paso 3: Multiplicador → Rojo (×100) ----
    const multSection = sectionOf(/^Multiplicador$/);
    const rojoMult = within(multSection).getByRole("button", { name: /^Rojo \(×100\)$/ });
    rojoMult.focus();
    expect(document.activeElement).toBe(rojoMult);
    fireEvent.click(rojoMult);
    expect(rojoMult.className).toMatch(/ring-2/);
    // 2 2 ×100 = 2.2 kΩ
    expect(displayText()).toMatch(/2\.2\s*kΩ/);

    // ---- Paso 4: Tolerancia → Marrón (±1%) ----
    const tolSection = sectionOf(/^Tolerancia$/);
    const marronTol = within(tolSection).getByRole("button", { name: /^Marrón \(±1%\)$/ });
    marronTol.focus();
    expect(document.activeElement).toBe(marronTol);
    fireEvent.click(marronTol);
    expect(marronTol.className).toMatch(/ring-2/);
    expect(displayText()).toMatch(/±1%/);

    // ---- Verificación final: TODOS los ring siguen visibles simultáneamente ----
    expect(rojoB1.className).toMatch(/ring-2/);
    expect(rojoB2.className).toMatch(/ring-2/);
    expect(rojoMult.className).toMatch(/ring-2/);
    expect(marronTol.className).toMatch(/ring-2/);
  });

  it("solo un botón por banda mantiene el ring (el resto lo pierde al cambiar de color)", () => {
    const b1Section = sectionOf(/^Banda 1$/);
    // Marrón es el valor por defecto; al cambiar a Amarillo debe perder el ring.
    const marron = within(b1Section).getByRole("button", { name: /^Marrón \(1\)$/ });
    const amarillo = within(b1Section).getByRole("button", { name: /^Amarillo \(4\)$/ });
    expect(marron.className).toMatch(/ring-2/);
    amarillo.focus();
    fireEvent.click(amarillo);
    expect(amarillo.className).toMatch(/ring-2/);
    expect(marron.className).not.toMatch(/ring-2/);
  });

  it("cada botón de las 4 bandas está en el orden de tabulación (no tabindex=-1)", () => {
    for (const label of [/^Banda 1$/, /^Banda 2$/, /^Multiplicador$/, /^Tolerancia$/]) {
      const section = sectionOf(label);
      const btns = within(section).getAllByRole("button");
      expect(btns.length).toBeGreaterThan(0);
      btns.forEach((b) => {
        expect(b.tagName).toBe("BUTTON");
        expect(b.getAttribute("tabindex")).not.toBe("-1");
      });
    }
  });
});
