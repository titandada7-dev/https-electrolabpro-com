import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import DomainDebugBanner from "./components/DomainDebugBanner";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/AvisoLegal";
import CookieBanner from "./components/CookieBanner";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import CodigoColoresResistencias from "./pages/articles/CodigoColoresResistencias";
import Condensadores from "./pages/articles/Condensadores";
import Diodos from "./pages/articles/Diodos";
import LeyDeOhm from "./pages/articles/LeyDeOhm";
import Multimetro from "./pages/articles/Multimetro";
import CircuitosSerieParalelo from "./pages/articles/CircuitosSerieParalelo";
import Transistores from "./pages/articles/Transistores";
import Arduino from "./pages/articles/Arduino";
import Osciloscopio from "./pages/articles/Osciloscopio";
import FuentesAlimentacion from "./pages/articles/FuentesAlimentacion";
import Soldadura from "./pages/articles/Soldadura";
import ProtocoloI2C from "./pages/articles/ProtocoloI2C";
import SensoresArduino from "./pages/articles/SensoresArduino";
import PantallaOled from "./pages/articles/PantallaOled";
import BlogPrimerLaboratorio from "./pages/articles/BlogPrimerLaboratorio";
import BlogProyectosArduino from "./pages/articles/BlogProyectosArduino";
import BlogDisenoPCB from "./pages/articles/BlogDisenoPCB";
import QueArduinoComprar from "./pages/articles/QueArduinoComprar";
import PwmArduino from "./pages/articles/PwmArduino";
import ReguladoresVoltaje from "./pages/articles/ReguladoresVoltaje";
import LeerDatasheet from "./pages/articles/LeerDatasheet";
import SobreNosotros from "./pages/SobreNosotros";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import Glosario from "./pages/Glosario";
import AprendeJugando from "./pages/AprendeJugando";

function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <CookieBanner />
      <PWAInstallPrompt />
      <DomainDebugBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
        <Route path="/glosario" element={<Glosario />} />
        <Route path="/aprende-jugando" element={<AprendeJugando />} />
        <Route path="/articulos/codigo-colores-resistencias" element={<CodigoColoresResistencias />} />
        <Route path="/articulos/condensadores" element={<Condensadores />} />
        <Route path="/articulos/diodos" element={<Diodos />} />
        <Route path="/articulos/ley-de-ohm" element={<LeyDeOhm />} />
        <Route path="/articulos/multimetro" element={<Multimetro />} />
        <Route path="/articulos/circuitos-serie-paralelo" element={<CircuitosSerieParalelo />} />
        <Route path="/articulos/transistores" element={<Transistores />} />
        <Route path="/articulos/arduino" element={<Arduino />} />
        <Route path="/articulos/osciloscopio" element={<Osciloscopio />} />
        <Route path="/articulos/fuentes-de-alimentacion" element={<FuentesAlimentacion />} />
        <Route path="/articulos/soldadura-electronica" element={<Soldadura />} />
        <Route path="/articulos/protocolo-i2c" element={<ProtocoloI2C />} />
        <Route path="/articulos/sensores-arduino" element={<SensoresArduino />} />
        <Route path="/articulos/pantalla-oled-ssd1306" element={<PantallaOled />} />
        <Route path="/articulos/que-arduino-comprar" element={<QueArduinoComprar />} />
        <Route path="/articulos/pwm-arduino" element={<PwmArduino />} />
        <Route path="/articulos/reguladores-voltaje" element={<ReguladoresVoltaje />} />
        <Route path="/articulos/leer-datasheet" element={<LeerDatasheet />} />
        <Route path="/blog/mi-primer-laboratorio" element={<BlogPrimerLaboratorio />} />
        <Route path="/blog/mis-5-proyectos-arduino-favoritos" element={<BlogProyectosArduino />} />
        <Route path="/blog/como-disene-mi-primer-pcb-kicad" element={<BlogDisenoPCB />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
              <h1 className="text-3xl font-bold mb-4">404</h1>
              <p className="mb-6">La página que buscas no existe.</p>
              <a href="/" className="text-primary underline">
                Volver a ElectroLab Pro
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
