import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PlayCTA from "./PlayCTA";

const renderWithRouter = (ui: React.ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("PlayCTA", () => {
  it("renderiza el botón principal con texto correcto", () => {
    renderWithRouter(<PlayCTA />);
    expect(screen.getByRole("link", { name: /Jugá ElectroLab Play/i })).toBeInTheDocument();
  });

  it("apunta a /aprende-jugando", () => {
    renderWithRouter(<PlayCTA />);
    const link = screen.getByRole("link", { name: /Jugá ElectroLab Play/i });
    expect(link).toHaveAttribute("href", "/aprende-jugando");
  });

  it("muestra el badge 'Nuevo · Gratis'", () => {
    renderWithRouter(<PlayCTA />);
    expect(screen.getByText(/Nuevo · Gratis/i)).toBeInTheDocument();
  });

  it("usa copy específico para topic='ohm'", () => {
    renderWithRouter(<PlayCTA topic="ohm" />);
    expect(screen.getByText(/¿Ya entendiste la Ley de Ohm\?/i)).toBeInTheDocument();
  });

  it("usa copy específico para topic='arduino'", () => {
    renderWithRouter(<PlayCTA topic="arduino" />);
    expect(screen.getByText(/¿Te animás a un quiz sobre Arduino\?/i)).toBeInTheDocument();
  });

  it("usa copy específico para topic='resistencias'", () => {
    renderWithRouter(<PlayCTA topic="resistencias" />);
    expect(screen.getByText(/¿Sabés leer cualquier resistencia\?/i)).toBeInTheDocument();
  });

  it("usa copy 'general' por defecto cuando no se pasa topic", () => {
    renderWithRouter(<PlayCTA />);
    expect(screen.getByText(/Aprende jugando/i)).toBeInTheDocument();
  });

  it("tiene aria-label accesible", () => {
    renderWithRouter(<PlayCTA topic="ohm" />);
    expect(screen.getByRole("complementary", { name: /Jugá ElectroLab Play/i })).toBeInTheDocument();
  });
});
