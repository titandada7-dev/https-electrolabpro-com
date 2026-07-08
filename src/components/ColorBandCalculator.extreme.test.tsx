import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import ColorBandCalculator from "./ColorBandCalculator";

/**
 * E2E de casos inválidos y valores extremos.
 * En todos los escenarios se verifica explícitamente que la UI:
 *  1. Muestre el valor esperado en la unidad correcta.
 *  2. NUNCA renderice "NaN", "undefined" ni "Infinity".
 *  3. Siempre incluya una unidad válida (Ω, mΩ, kΩ, MΩ o GΩ).
 */

function selectColor(sectionLabel: RegExp, colorAriaLabel: RegExp) {
  const label = screen.getByText(sectionLabel).closest("label") as HTMLElement;
  const section = label.parentElement as HTMLElement;
  fireEvent.click(within(section).getByRole("button", { name: colorAriaLabel }));
}

function displayText() {
  const header = screen.getByText(/Valor de la Resistencia/i);
  return header.parentElement!.textContent || "";
}

function assertNoInvalidTokens(text: string) {
  expect(text).not.toMatch(/NaN/i);
  expect(text).not.toMatch(/undefined/i);
  expect(text).not.toMatch(/Infinity/i);
  // Unidad válida obligatoria
  expect(text).toMatch(/\d+(\.\d+)?\s*(m?Ω|kΩ|MΩ|GΩ)/);
}

describe("ColorBandCalculator — E2E: selecciones inválidas y valores extremos", () => {
  beforeEach(() => render(<ColorBandCalculator />));

  it("mínimo absoluto (0 Ω): Negro/Negro/Negro renderiza '0 Ω' sin NaN", () => {
    selectColor(/^Banda 1$/, /^Negro \(0\)$/);
    selectColor(/^Banda 2$/, /^Negro \(0\)$/);
    selectColor(/^Multiplicador$/, /^Negro \(×1\)$/);
    const text = displayText();
    expect(text).toMatch(/(?:^|[^0-9.])0\s*Ω/);
    assertNoInvalidTokens(text);
  });

  it("sub-Ohm (Plateado ×0.01): Marrón/Negro ⇒ 100 mΩ y unidad mΩ visible", () => {
    selectColor(/^Banda 1$/, /^Marrón \(1\)$/);
    selectColor(/^Banda 2$/, /^Negro \(0\)$/);
    selectColor(/^Multiplicador$/, /^Plateado \(×0\.01\)$/);
    const text = displayText();
    expect(text).toMatch(/100\s*mΩ/);
    assertNoInvalidTokens(text);
  });

  it("sub-Ohm (Dorado ×0.1): Marrón/Negro ⇒ 1 Ω (frontera mΩ/Ω)", () => {
    selectColor(/^Banda 1$/, /^Marrón \(1\)$/);
    selectColor(/^Banda 2$/, /^Negro \(0\)$/);
    selectColor(/^Multiplicador$/, /^Dorado \(×0\.1\)$/);
    const text = displayText();
    expect(text).toMatch(/(?:^|[^0-9.])1\s*Ω/);
    assertNoInvalidTokens(text);
  });

  it("extremo GΩ (4 bandas): Blanco/Blanco ×1G ⇒ resultado en GΩ finito", () => {
    selectColor(/^Banda 1$/, /^Blanco \(9\)$/);
    selectColor(/^Banda 2$/, /^Blanco \(9\)$/);
    selectColor(/^Multiplicador$/, /^Blanco \(×1G\)$/);
    const text = displayText();
    expect(text).toMatch(/GΩ/);
    assertNoInvalidTokens(text);
  });

  it("extremo GΩ (5 bandas): Blanco/Blanco/Blanco ×1G ⇒ resultado en GΩ", () => {
    fireEvent.click(screen.getByRole("button", { name: /^5 Bandas$/ }));
    selectColor(/^Banda 1$/, /^Blanco \(9\)$/);
    selectColor(/^Banda 2$/, /^Blanco \(9\)$/);
    selectColor(/^Banda 3$/, /^Blanco \(9\)$/);
    selectColor(/^Multiplicador$/, /^Blanco \(×1G\)$/);
    const text = displayText();
    expect(text).toMatch(/GΩ/);
    assertNoInvalidTokens(text);
  });

  it("cambio drástico de multiplicador (×1G → ×0.01) no deja valores inválidos", () => {
    selectColor(/^Banda 1$/, /^Blanco \(9\)$/);
    selectColor(/^Banda 2$/, /^Blanco \(9\)$/);
    selectColor(/^Multiplicador$/, /^Blanco \(×1G\)$/);
    assertNoInvalidTokens(displayText());
    // Salto extremo hacia sub-Ω
    selectColor(/^Multiplicador$/, /^Plateado \(×0\.01\)$/);
    assertNoInvalidTokens(displayText());
    // 99 · 0.01 = 0.99 Ω  → se formatea como mΩ (990 mΩ) o Ω decimal
    expect(displayText()).toMatch(/(990\s*mΩ|0\.99\s*Ω)/);
  });

  it("todas las tolerancias renderizan un porcentaje válido (nunca NaN%)", () => {
    const label = screen.getByText(/^Tolerancia$/).closest("label") as HTMLElement;
    const section = label.parentElement as HTMLElement;
    const buttons = within(section).getAllByRole("button");
    for (const btn of buttons) {
      fireEvent.click(btn);
      const text = displayText();
      expect(text).toMatch(/±\d+(\.\d+)?%/);
      expect(text).not.toMatch(/NaN|undefined/);
    }
  });

  it("recorrido rápido por todas las combinaciones (B1×B2×Mult) — 0 casos con NaN", () => {
    // Sondeo determinista: rota B1 en {0,2,5,9}, B2 en {0,3,7}, Multiplicador
    // en {×0.01, ×1, ×1k, ×1G}. Total 4·3·4 = 48 combinaciones.
    const b1 = [/^Negro \(0\)$/, /^Rojo \(2\)$/, /^Verde \(5\)$/, /^Blanco \(9\)$/];
    const b2 = [/^Negro \(0\)$/, /^Naranja \(3\)$/, /^Violeta \(7\)$/];
    const mult = [
      /^Plateado \(×0\.01\)$/,
      /^Negro \(×1\)$/,
      /^Naranja \(×1k\)$/,
      /^Blanco \(×1G\)$/,
    ];
    for (const a of b1) {
      for (const b of b2) {
        for (const m of mult) {
          selectColor(/^Banda 1$/, a);
          selectColor(/^Banda 2$/, b);
          selectColor(/^Multiplicador$/, m);
          assertNoInvalidTokens(displayText());
        }
      }
    }
  });
});
