import { useState } from "react";
import LedCalculator from "./components/LedCalculator";
import { Button } from "./components/ui/button";
import { Zap, ArrowLeft } from "lucide-react";

function App() {
  const [moduloActivo, setModuloActivo] = useState("menu");

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
                onClick={() => setModuloActivo("led")}
              >
                💡 Resistencia LED
              </Button>
              {/* Agregá más botones cuando tengas más módulos */}
              {/* <Button
                size="lg"
                className="w-full text-lg font-mono gap-2"
                onClick={() => setModuloActivo("ohm")}
              >
                ⚡ Ley de Ohm
              </Button> */}
            </div>
          </div>
        )}

        {moduloActivo === "led" && (
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 font-mono"
              onClick={() => setModuloActivo("menu")}
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <LedCalculator />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
