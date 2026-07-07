import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import ColorBandCalculator from "./ColorBandCalculator";

/**
 * E2E-style tests for the resistor color-band calculator.
 * Drives the real UI (buttons for each band + tolerance) and asserts
 * that the digital display shows the correct decoded value, exactly
 * as an end user would see it.
 */

// Locate the band section by its label text, then return the color button
// with the given aria-label (which encodes "<Color> (<value or label>)").
function selectColor(sectionLabel: RegExp, colorAriaLabel: RegExp) {
  // Section = the <label> element itself; its parent is the section wrapper
  // that contains only that band's color buttons.
  const label = screen.getByText(sectionLabel).closest("label") as HTMLElement;
  const section = label.parentElement as HTMLElement;
  const btn = within(section).getByRole("button", { name: colorAriaLabel });
  fireEvent.click(btn);
}

function display() {
  // The big neon value lives inside the block titled "Valor de la Resistencia".
  const header = screen.getByText(/Valor de la Resistencia/i);
  return header.parentElement!;
}

describe("ColorBandCalculator (E2E)", () => {
  beforeEach(() => {
    render(<ColorBandCalculator />);
  });

  it("renders defaults: Marrón/Negro/Naranja/Dorado ⇒ 10 kΩ ±5%", () => {
    const d = display();
    expect(d.textContent).toMatch(/10\s*kΩ/);
    expect(d.textContent).toMatch(/±5%/);
  });

  it("4 bandas: Rojo Rojo Rojo Dorado ⇒ 2.2 kΩ ±5%", () => {
    selectColor(/^Banda 1$/, /^Rojo \(2\)$/);
    selectColor(/^Banda 2$/, /^Rojo \(2\)$/);
    selectColor(/^Multiplicador$/, /^Rojo \(×100\)$/);
    selectColor(/^Tolerancia$/, /^Dorado \(±5%\)$/);
    expect(display().textContent).toMatch(/2\.2\s*kΩ/);
    expect(display().textContent).toMatch(/±5%/);
  });

  it("4 bandas: Amarillo Violeta Naranja Dorado ⇒ 47 kΩ", () => {
    selectColor(/^Banda 1$/, /^Amarillo \(4\)$/);
    selectColor(/^Banda 2$/, /^Violeta \(7\)$/);
    selectColor(/^Multiplicador$/, /^Naranja \(×1k\)$/);
    expect(display().textContent).toMatch(/47\s*kΩ/);
  });

  it("4 bandas: Marrón Negro Rojo ⇒ 1 kΩ (verifica multiplicador ×100)", () => {
    selectColor(/^Multiplicador$/, /^Rojo \(×100\)$/);
    expect(display().textContent).toMatch(/1\s*kΩ/);
  });

  it("4 bandas: multiplicador Dorado divide entre 10 ⇒ 1 Ω", () => {
    // Marrón (1) Negro (0) → 10, × 0.1 = 1 Ω
    selectColor(/^Multiplicador$/, /^Dorado \(×0\.1\)$/);
    expect(display().textContent).toMatch(/1\s*Ω/);
  });

  it("cambia a 5 bandas y calcula Marrón Negro Negro Rojo Marrón ⇒ 10 kΩ ±1%", () => {
    fireEvent.click(screen.getByRole("button", { name: /^5 Bandas$/ }));
    // Banda 3 aparece
    expect(screen.getByText(/^Banda 3$/)).toBeInTheDocument();

    selectColor(/^Banda 1$/, /^Marrón \(1\)$/);
    selectColor(/^Banda 2$/, /^Negro \(0\)$/);
    selectColor(/^Banda 3$/, /^Negro \(0\)$/);
    selectColor(/^Multiplicador$/, /^Rojo \(×100\)$/);
    selectColor(/^Tolerancia$/, /^Marrón \(±1%\)$/);

    expect(display().textContent).toMatch(/10\s*kΩ/);
    expect(display().textContent).toMatch(/±1%/);
  });

  it("5 bandas: Rojo Rojo Negro Marrón Marrón ⇒ 2.2 kΩ ±1%", () => {
    fireEvent.click(screen.getByRole("button", { name: /^5 Bandas$/ }));
    selectColor(/^Banda 1$/, /^Rojo \(2\)$/);
    selectColor(/^Banda 2$/, /^Rojo \(2\)$/);
    selectColor(/^Banda 3$/, /^Negro \(0\)$/);
    selectColor(/^Multiplicador$/, /^Marrón \(×10\)$/);
    selectColor(/^Tolerancia$/, /^Marrón \(±1%\)$/);
    expect(display().textContent).toMatch(/2\.2\s*kΩ/);
    expect(display().textContent).toMatch(/±1%/);
  });

  it("MΩ: Marrón Negro Verde ⇒ 1 MΩ", () => {
    selectColor(/^Multiplicador$/, /^Verde \(×100k\)$/);
    expect(display().textContent).toMatch(/1\s*MΩ/);
  });

  it("botones tienen aria-label accesible para lectores de pantalla", () => {
    // Sanity: cada botón de color tiene aria-label — foundation para tests de teclado.
    const buttons = screen.getAllByRole("button");
    const colorButtons = buttons.filter((b) => b.getAttribute("aria-label"));
    expect(colorButtons.length).toBeGreaterThan(20);
  });
});
