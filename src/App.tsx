import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NavButtons from "./components/NavButtons";
import SplashScreen from "./components/SplashScreen";
import SidebarAd from "./components/SidebarAd";
import { installAuthAuditListener } from "./lib/auditLogger";

// Debug banner: solo se descarga si la URL contiene ?debug=domains o si estamos
// en un host de preview de Lovable. En producción no entra al bundle inicial.
const shouldLoadDomainDebug = (() => {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  if (host.includes("lovable.app") || host.includes("lovableproject.com")) return true;
  return new URLSearchParams(window.location.search).get("debug") === "domains";
})();
const DomainDebugBanner = shouldLoadDomainDebug
  ? lazy(() => import("./components/DomainDebugBanner"))
  : null;
// Banners no críticos: lazy para no bloquear el render inicial / LCP de Home.
const CookieBanner = lazy(() => import("./components/CookieBanner"));
const PWAInstallPrompt = lazy(() => import("./components/PWAInstallPrompt"));

// Páginas legales y secundarias en lazy: reducen el JS inicial cargado en Home
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Contacto = lazy(() => import("./pages/Contacto"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const SobreNosotros = lazy(() => import("./pages/SobreNosotros"));
const TerminosCondiciones = lazy(() => import("./pages/TerminosCondiciones"));
const PoliticaReembolsos = lazy(() => import("./pages/PoliticaReembolsos"));
const Glosario = lazy(() => import("./pages/Glosario"));
const AprendeJugando = lazy(() => import("./pages/AprendeJugando"));
const DocumentacionTecnica = lazy(() => import("./pages/DocumentacionTecnica"));
const GuiaResistencias = lazy(() => import("./pages/GuiaResistencias"));
const GuiaMultimetro = lazy(() => import("./pages/GuiaMultimetro"));
const Auth = lazy(() => import("./pages/Auth"));
const Premium = lazy(() => import("./pages/Premium"));
const Account = lazy(() => import("./pages/Account"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PremiumHub = lazy(() => import("./pages/premium/PremiumHub"));
const PremiumSimulador = lazy(() => import("./pages/premium/SimuladorCircuitos"));
const PremiumCalculadoras = lazy(() => import("./pages/premium/CalculadorasAvanzadas"));
const PremiumBiblioteca = lazy(() => import("./pages/premium/Biblioteca"));

// Artículos en lazy: cada uno es un chunk separado, sólo descarga al navegar
const CodigoColoresResistencias = lazy(() => import("./pages/articles/CodigoColoresResistencias"));
const Condensadores = lazy(() => import("./pages/articles/Condensadores"));
const Diodos = lazy(() => import("./pages/articles/Diodos"));
const LeyDeOhm = lazy(() => import("./pages/articles/LeyDeOhm"));
const Multimetro = lazy(() => import("./pages/articles/Multimetro"));
const CircuitosSerieParalelo = lazy(() => import("./pages/articles/CircuitosSerieParalelo"));
const Transistores = lazy(() => import("./pages/articles/Transistores"));
const Arduino = lazy(() => import("./pages/articles/Arduino"));
const Osciloscopio = lazy(() => import("./pages/articles/Osciloscopio"));
const FuentesAlimentacion = lazy(() => import("./pages/articles/FuentesAlimentacion"));
const Soldadura = lazy(() => import("./pages/articles/Soldadura"));
const ProtocoloI2C = lazy(() => import("./pages/articles/ProtocoloI2C"));
const SensoresArduino = lazy(() => import("./pages/articles/SensoresArduino"));
const PantallaOled = lazy(() => import("./pages/articles/PantallaOled"));
const BlogPrimerLaboratorio = lazy(() => import("./pages/articles/BlogPrimerLaboratorio"));
const BlogProyectosArduino = lazy(() => import("./pages/articles/BlogProyectosArduino"));
const BlogDisenoPCB = lazy(() => import("./pages/articles/BlogDisenoPCB"));
const QueArduinoComprar = lazy(() => import("./pages/articles/QueArduinoComprar"));
const PwmArduino = lazy(() => import("./pages/articles/PwmArduino"));
const ReguladoresVoltaje = lazy(() => import("./pages/articles/ReguladoresVoltaje"));
const LeerDatasheet = lazy(() => import("./pages/articles/LeerDatasheet"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3 text-muted-foreground">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <p className="text-sm font-medium">Cargando contenido…</p>
    </div>
  </div>
);

function App() {
  useEffect(() => { installAuthAuditListener(); }, []);
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <SplashScreen />
      <Suspense fallback={null}>
        <CookieBanner />
        <PWAInstallPrompt />
      </Suspense>
      {DomainDebugBanner && (
        <Suspense fallback={null}>
          <DomainDebugBanner />
        </Suspense>
      )}
      <Suspense fallback={<RouteFallback />}>
      <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/premium/contenido" element={<PremiumHub />} />
        <Route path="/premium/simulador-circuitos" element={<PremiumSimulador />} />
        <Route path="/premium/calculadoras-avanzadas" element={<PremiumCalculadoras />} />
        <Route path="/premium/biblioteca" element={<PremiumBiblioteca />} />
        <Route path="/account" element={<Account />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
        <Route path="/politica-reembolsos" element={<PoliticaReembolsos />} />
        <Route path="/glosario" element={<Glosario />} />
        <Route path="/aprende-jugando" element={<AprendeJugando />} />
        <Route path="/documentacion-tecnica" element={<DocumentacionTecnica />} />
        <Route path="/guia-resistencias" element={<GuiaResistencias />} />
        <Route path="/guia-multimetro" element={<GuiaMultimetro />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      </Suspense>
      <NavButtons />
      <SidebarAd />
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
