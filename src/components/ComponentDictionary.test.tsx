import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ComponentDictionary from "./ComponentDictionary";

/**
 * E2E-style tests for the component dictionary modal:
 * - opens on card click
 * - focus moves inside the dialog (Radix focus scope)
 * - Escape closes it
 * - the close (X) button closes it
 * - the "Ver precios en Amazon" anchor has the correct href, target, rel and
 *   affiliate tag; the "Comprar Kit" button opens the Amazon search URL with
 *   the same tag via window.open.
 */

function openResistor() {
  const card = screen.getByRole("button", { name: /Resistor/i });
  fireEvent.click(card);
  return screen.getByRole("dialog");
}

describe("ComponentDictionary — modal", () => {
  beforeEach(() => render(<ComponentDictionary />));

  it("abre el modal al hacer click en una tarjeta", () => {
    const dialog = openResistor();
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("role", "dialog");
    // Radix marca aria-modal para lectores de pantalla
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("mueve el foco dentro del diálogo al abrir (focus trap)", () => {
    const dialog = openResistor();
    // Radix FocusScope garantiza que el foco activo esté dentro del diálogo.
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("se cierra con la tecla Escape", () => {
    openResistor();
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "Escape",
      code: "Escape",
    });
    // Radix desmonta el contenido del diálogo tras Escape
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("se cierra con el botón X (aria 'Close')", () => {
    const dialog = openResistor();
    const closeBtn = within(dialog).getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("ComponentDictionary — Amazon tracking", () => {
  beforeEach(() => render(<ComponentDictionary />));
  afterEach(() => vi.restoreAllMocks());

  it("el enlace 'Ver precios en Amazon' apunta a amazon.es con el tag afiliado, target=_blank y rel seguro", () => {
    const dialog = openResistor();
    const anchor = within(dialog).getByRole("link", { name: /Ver precios en Amazon/i });
    const href = anchor.getAttribute("href") || "";
    expect(href).toMatch(/^https:\/\/www\.amazon\.es\/s\?k=/);
    expect(href).toContain("Resistor+electronics");
    expect(href).toContain("tag=electrolabp0c-21");
    expect(anchor.getAttribute("target")).toBe("_blank");
    // Seguridad: rel debe incluir noopener y noreferrer (evita tabnabbing)
    const rel = anchor.getAttribute("rel") || "";
    expect(rel).toMatch(/noopener/);
    expect(rel).toMatch(/noreferrer/);
  });

  it("'Comprar Kit' abre búsqueda Amazon con el tag afiliado en pestaña nueva", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const dialog = openResistor();
    const buyBtn = within(dialog).getByRole("button", { name: /Comprar Kit de Resistor/i });
    fireEvent.click(buyBtn);
    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target] = openSpy.mock.calls[0];
    expect(String(url)).toMatch(/^https:\/\/www\.amazon\.es\/s\?k=resistencias\+electronica\+kit/);
    expect(String(url)).toContain("tag=electrolabp0c-21");
    expect(target).toBe("_blank");
  });

  it("todos los enlaces externos a Amazon en el modal usan rel seguro", () => {
    const dialog = openResistor();
    const anchors = within(dialog).getAllByRole("link");
    const amazonLinks = anchors.filter((a) =>
      (a.getAttribute("href") || "").includes("amazon."),
    );
    expect(amazonLinks.length).toBeGreaterThan(0);
    amazonLinks.forEach((a) => {
      expect(a.getAttribute("target")).toBe("_blank");
      const rel = a.getAttribute("rel") || "";
      expect(rel).toMatch(/noopener/);
      expect(rel).toMatch(/noreferrer/);
    });
  });
});
