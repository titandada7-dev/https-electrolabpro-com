import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/AvisoLegal";
import CookieBanner from "./components/CookieBanner";

function App() {
  return (
    <BrowserRouter>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 text-center">
              Página no encontrada
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
