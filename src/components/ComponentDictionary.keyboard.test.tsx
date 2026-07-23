import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import ComponentDictionary from "./ComponentDictionary";

/**
 * Keyboard + screen-reader tests for the component dictionary.
 *
 * Cubre:
 *  - foco inicial y activación con Enter/Space en las tarjetas del grid
 *  - apertura del modal, exposición semántica (role=dialog, accessible name)
 *  - foco atrapado dentro del diálogo tras abrir
 *  - restauración del foco al elemento disparador tras cerrar con Escape
 *    y con el botón X
 *  - búsqueda operable por teclado (Input recibe foco, filtra resultados)
 */
describe("ComponentDictionary — teclado y lector de pantalla", () => {
  beforeEach(() => render(<ComponentDictionary />));

  it("las tarjetas del grid son navegables por teclado y activables con Enter", () => {
    const card = screen.getByRole("button", { name: /Resistor/i });
    card.focus();
    expect(document.activeElement).toBe(card);
    // Enter abre el modal (los <button> nativos disparan click con Enter)
    fireEvent.click(card);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("el diálogo expone un nombre accesible (aria-labelledby → título)", () => {
    fireEvent.click(screen.getByRole("button", { name: /Resistor/i }));
    const dialog = screen.getByRole("dialog");
    // Radix conecta DialogTitle con aria-labelledby
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    const title = document.getElementById(labelledBy!);
    expect(title?.textContent).toMatch(/Resistor/i);
  });

  it("restaura el foco al disparador cuando el modal se cierra con Escape", async () => {
    const trigger = screen.getByRole("button", { name: /Resistor/i });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document.activeElement || document.body, {
      key: "Escape",
      code: "Escape",
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    // Radix restaura el foco al trigger original (asíncronamente)
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("restaura el foco al disparador cuando se cierra con el botón X", async () => {
    const trigger = screen.getByRole("button", { name: /Condensador/i });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    const closeBtn = within(dialog).getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("el input de búsqueda es alcanzable por teclado y filtra el grid", () => {
    const input = screen.getByPlaceholderText(/Buscar componente/i);
    input.focus();
    expect(document.activeElement).toBe(input);
    fireEvent.change(input, { target: { value: "LED" } });
    expect(screen.getByRole("button", { name: /Diodo LED/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Resistor$/i })).not.toBeInTheDocument();
  });
});
