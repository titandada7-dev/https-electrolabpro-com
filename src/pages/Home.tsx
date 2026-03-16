import { useState } from "react";
import { Link } from "react-router-dom";
import LedCalculator from "../components/LedCalculator";
import OhmCalculator from "../components/OhmCalculator";
import ResistorCalculator from "../components/ResistorCalculator";
import VoltageDividerCalculator from "../components/VoltageDividerCalculator";
import Timer555Calculator from "../components/Timer555Calculator";
import SmdDecoderCalculator from "../components/SmdDecoderCalculator";
import CapacitiveReactanceCalculator from "../components/CapacitiveReactanceCalculator";
import AdBanner from "../components/AdBanner";
import { Button } from "../components/ui/button";
import { Zap, ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Home() {
  usePageMeta({
    title: "ElectroLab Pro | Calculadoras electrónicas online",
    description: "Herramienta online con Ley de Ohm, código de colores y calculadora de resistencia para LED.",
  });
  const [moduloActivo, setModuloActivo] = useState("menu");

  const volverAlMenu = (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 font-mono mb-4"
      onClick={() => setModuloActivo("menu")}
    >
      <ArrowLeft className="w-4 h-4" />
      Volver
    </Button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
        {moduloActivo === "menu" && (
          <div className="text-center space-y-8">
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-foreground flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              ElectroLab Pro
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              ElectroLab Pro es una herramienta online gratuita para realizar cálculos electrónicos rápidos como Ley de Ohm, códigos de colores de resistencias y cálculo de resistencias para LEDs. Diseñada para estudiantes, técnicos y entusiastas de la electrónica.
            </p>
            <div className="grid gap-4">
              <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("ohm")}
              >
                ⚡ Ley de Ohm
              </Button>
              <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("resistencias")}
              >
                🎨 Código de Colores
              </Button>
              <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("led")}
              >
                💡 Resistencia LED
              </Button>
              <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("divisor")}
              >
                🔌 Divisor de Voltaje
              </Button>
              <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("555")}
              >
                ⏱️ Temporizador 555
              </Button>
              <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("smd")}
              >
                🔍 Decodificador SMD
              </Button>
              <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("reactancia")}
              >
                〰️ Reactancia Capacitiva
              </Button>
            </div>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
              Estas calculadoras permiten resolver cálculos comunes en electrónica de forma rápida desde el celular o la computadora.
            </p>
          </div>
        )}

        {moduloActivo === "ohm" && (
          <div>
            {volverAlMenu}
            <OhmCalculator />
            <AdBanner slot="2222222222" className="mt-6" />
          </div>
        )}

        {moduloActivo === "resistencias" && (
          <div>
            {volverAlMenu}
            <ResistorCalculator />
            <AdBanner slot="2222222222" className="mt-6" />
          </div>
        )}

        {moduloActivo === "led" && (
          <div>
            {volverAlMenu}
            <LedCalculator />
            <AdBanner slot="2222222222" className="mt-6" />
          </div>
        )}

        {moduloActivo === "divisor" && (
          <div>
            {volverAlMenu}
            <VoltageDividerCalculator />
            <AdBanner slot="2222222222" className="mt-6" />
          </div>
        )}

        {moduloActivo === "555" && (
          <div>
            {volverAlMenu}
            <Timer555Calculator />
            <AdBanner slot="2222222222" className="mt-6" />
          </div>
        )}

        {moduloActivo === "smd" && (
          <div>
            {volverAlMenu}
            <SmdDecoderCalculator />
            <AdBanner slot="2222222222" className="mt-6" />
          </div>
        )}

        {moduloActivo === "reactancia" && (
          <div>
            {volverAlMenu}
            <CapacitiveReactanceCalculator />
          </div>
        )}
        </div>
      </div>

      <footer className="w-full py-6 border-t border-border bg-background/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado por <span className="font-semibold">J.A. Sanchez</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
