import { useState } from "react";
import LedCalculator from "./components/LedCalculator";
import OhmCalculator from "./components/OhmCalculator";
import ResistorCalculator from "./components/ResistorCalculator";
import AdBanner from "./components/AdBanner";
import { Button } from "./components/ui/button";
import { Zap, ArrowLeft } from "lucide-react";

function App() {
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {moduloActivo === "menu" && (
          <div className="text-center space-y-8">
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-foreground flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              ElectroLab Pro
            </h1>
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
            </div>
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
      </div>
    </div>
  );
}

export default App;
