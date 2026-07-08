import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import ColorBandCalculator from "./ColorBandCalculator";

function selectColor(sectionLabel: RegExp, colorAriaLabel: RegExp) {
  const label = screen.getByText(sectionLabel).closest("label") as HTMLElement;
  const section = label.parentElement as HTMLElement;
  fireEvent.click(within(section).getByRole("button", { name: colorAriaLabel }));
}

function display() {
  return screen.getByText(/Valor de la Resistencia/i).parentElement!;
}

describe("ColorBandCalculator — edge cases", () => {
  beforeEach(() => render(<ColorBandCalculator />));

  it("solo expone variantes de 4 y 5 bandas (3 bandas no soportado)", () => {
    // El toggle solo ofrece 4 y 5 bandas; nunca debe existir "3 Bandas".
    expect(screen.getByRole("button", { name: /^4 Bandas$/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^5 Bandas$/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^3 Bandas$/ })).toBeNull();
  });

  it("Negro/Negro/Negro (4 bandas) ⇒ 0 Ω (mínimo, sin NaN)", () => {
    selectColor(/^Banda 1$/, /^Negro \(0\)$/);
    selectColor(/^Banda 2$/, /^Negro \(0\)$/);
    selectColor(/^Multiplicador$/, /^Negro \(×1\)$/);
    const text = display().textContent || "";
    expect(text).toMatch(/0\s*Ω/);
    expect(text).not.toMatch(/NaN|undefined|Infinity/);
  });

  it("valor extremo alto (5 bandas Blanco/Blanco/Blanco ×1G) ⇒ GΩ formateado", () => {
    fireEvent.click(screen.getByRole("button", { name: /^5 Bandas$/ }));
    selectColor(/^Banda 1$/, /^Blanco \(9\)$/);
    selectColor(/^Banda 2$/, /^Blanco \(9\)$/);
    selectColor(/^Banda 3$/, /^Blanco \(9\)$/);
    selectColor(/^Multiplicador$/, /^Blanco \(×1G\)$/);
    const text = display().textContent || "";
    expect(text).toMatch(/GΩ/);
    expect(text).not.toMatch(/NaN|Infinity/);
  });

  it("multiplicador Plateado (×0.01) sobre 10 ⇒ 100 mΩ (valores sub-ohm)", () => {
    // Marrón (1) Negro (0) → 10 · 0.01 = 0.1 Ω = 100 mΩ
    selectColor(/^Multiplicador$/, /^Plateado \(×0\.01\)$/);
    expect(display().textContent).toMatch(/100\s*mΩ/);
  });

  it("cambiar 5→4 bandas recalcula sin dejar valores inválidos", () => {
    fireEvent.click(screen.getByRole("button", { name: /^5 Bandas$/ }));
    selectColor(/^Banda 1$/, /^Rojo \(2\)$/);
    selectColor(/^Banda 2$/, /^Rojo \(2\)$/);
    selectColor(/^Banda 3$/, /^Rojo \(2\)$/);
    fireEvent.click(screen.getByRole("button", { name: /^4 Bandas$/ }));
    // Banda 3 desaparece, resultado sigue siendo un número finito con unidad
    expect(screen.queryByText(/^Banda 3$/)).toBeNull();
    expect(display().textContent).toMatch(/\d+(\.\d+)?\s*(Ω|kΩ|MΩ|GΩ|mΩ)/);
    expect(display().textContent).not.toMatch(/NaN|undefined/);
  });

  it("todos los botones de dígito exponen valor 0..9 (no hay opciones inválidas)", () => {
    const label = screen.getByText(/^Banda 1$/).closest("label") as HTMLElement;
    const section = label.parentElement as HTMLElement;
    const digitButtons = within(section).getAllByRole("button");
    // 10 colores de dígito válidos, sin duplicados de valor
    expect(digitButtons.length).toBe(10);
    const values = digitButtons.map((b) => {
      const m = (b.getAttribute("aria-label") || "").match(/\((\d)\)/);
      return m ? Number(m[1]) : -1;
    });
    expect(new Set(values)).toEqual(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });

  it("valor por defecto está bien formado (10 kΩ ±5%) — smoke test contra regresión", () => {
    const text = display().textContent || "";
    expect(text).toMatch(/10\s*kΩ/);
    expect(text).toMatch(/±5%/);
  });
});
