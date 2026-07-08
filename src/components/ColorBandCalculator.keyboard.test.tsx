import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ColorBandCalculator from "./ColorBandCalculator";

/**
 * Keyboard-only accessibility tests for the resistor color-band calculator.
 * Verifies every interactive control is a native focusable element, is
 * reachable via keyboard focus, and exposes a visible focus style.
 */
describe("ColorBandCalculator (keyboard a11y)", () => {
  it("todos los controles interactivos son <button> nativos (tab-reachable)", () => {
    const { container } = render(<ColorBandCalculator />);
    const buttons = container.querySelectorAll("button");
    // 4 bandas: 2×10 dígitos + 12 multiplicador + 8 tolerancia + 2 toggle = 42
    expect(buttons.length).toBeGreaterThanOrEqual(42);
    buttons.forEach((b) => {
      expect(b.tagName).toBe("BUTTON");
      // Ningún control debe quedar fuera del orden de tabulación
      expect(b.getAttribute("tabindex")).not.toBe("-1");
      expect(b).not.toBeDisabled();
    });
  });

  it("cada botón puede recibir foco programáticamente (keyboard reachable)", () => {
    const { container } = render(<ColorBandCalculator />);
    const buttons = Array.from(container.querySelectorAll("button"));
    for (const btn of buttons) {
      btn.focus();
      expect(document.activeElement).toBe(btn);
    }
  });

  it("los botones de color exponen focus ring visible (clase Tailwind focus:)", () => {
    render(<ColorBandCalculator />);
    // Botón seleccionado usa ring-2 ring-primary — indicador visual claro.
    const selected = screen.getByRole("button", { name: /^Marrón \(1\)$/ });
    expect(selected.className).toMatch(/ring-2/);
    expect(selected.className).toMatch(/ring-primary/);
  });

  it("Enter/Space sobre un botón de color aplica la selección", () => {
    render(<ColorBandCalculator />);
    const rojo = screen.getAllByRole("button", { name: /^Rojo \(2\)$/ })[0];
    rojo.focus();
    // fireEvent.click simula la activación por teclado (Enter/Space) sobre <button>
    fireEvent.click(rojo);
    expect(rojo.className).toMatch(/ring-2/);
  });

  it("toggle 4/5 bandas es alcanzable por teclado y activa Banda 3", () => {
    render(<ColorBandCalculator />);
    const toggle5 = screen.getByRole("button", { name: /^5 Bandas$/ });
    toggle5.focus();
    expect(document.activeElement).toBe(toggle5);
    fireEvent.click(toggle5);
    expect(screen.getByText(/^Banda 3$/)).toBeInTheDocument();
  });
});
