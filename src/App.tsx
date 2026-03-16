import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/AvisoLegal";
import CookieBanner from "./components/CookieBanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  );
}

export default App;
