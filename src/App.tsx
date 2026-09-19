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
  ? lazyWithRetry(() => import("./components/DomainDebugBanner"))
  : null;
// Banners no críticos: lazy para no bloquear el render inicial / LCP de Home.
const CookieBanner = lazyWithRetry(() => import("./components/CookieBanner"));
const PWAInstallPrompt = lazyWithRetry(() => import("./components/PWAInstallPrompt"));

// Páginas legales y secundarias en lazy: reducen el JS inicial cargado en Home
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy"));
const Contacto = lazyWithRetry(() => import("./pages/Contacto"));
const AvisoLegal = lazyWithRetry(() => import("./pages/AvisoLegal"));
const SobreNosotros = lazyWithRetry(() => import("./pages/SobreNosotros"));
const TerminosCondiciones = lazyWithRetry(() => import("./pages/TerminosCondiciones"));
const PoliticaReembolsos = lazyWithRetry(() => import("./pages/PoliticaReembolsos"));
const Glosario = lazyWithRetry(() => import("./pages/Glosario"));
const AprendeJugando = lazyWithRetry(() => import("./pages/AprendeJugando"));
const DocumentacionTecnica = lazyWithRetry(() => import("./pages/DocumentacionTecnica"));
const GuiaResistencias = lazyWithRetry(() => import("./pages/GuiaResistencias"));
const GuiaMultimetro = lazyWithRetry(() => import("./pages/GuiaMultimetro"));
const Auth = lazyWithRetry(() => import("./pages/Auth"));
const Premium = lazyWithRetry(() => import("./pages/Premium"));
const Account = lazyWithRetry(() => import("./pages/Account"));
const Unsubscribe = lazyWithRetry(() => import("./pages/Unsubscribe"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const PremiumHub = lazyWithRetry(() => import("./pages/premium/PremiumHub"));
const PremiumSimulador = lazyWithRetry(() => import("./pages/premium/SimuladorCircuitos"));
const PremiumCalculadoras = lazyWithRetry(() => import("./pages/premium/CalculadorasAvanzadas"));
const PremiumBiblioteca = lazyWithRetry(() => import("./pages/premium/Biblioteca"));
const PalettePreview = lazyWithRetry(() => import("./pages/PalettePreview"));

// Artículos en lazy: cada uno es un chunk separado, sólo descarga al navegar
const CodigoColoresResistencias = lazyWithRetry(() => import("./pages/articles/CodigoColoresResistencias"));
const Condensadores = lazyWithRetry(() => import("./pages/articles/Condensadores"));
const Diodos = lazyWithRetry(() => import("./pages/articles/Diodos"));
const LeyDeOhm = lazyWithRetry(() => import("./pages/articles/LeyDeOhm"));
const Multimetro = lazyWithRetry(() => import("./pages/articles/Multimetro"));
const CircuitosSerieParalelo = lazyWithRetry(() => import("./pages/articles/CircuitosSerieParalelo"));
const Transistores = lazyWithRetry(() => import("./pages/articles/Transistores"));
const Arduino = lazyWithRetry(() => import("./pages/articles/Arduino"));
const Osciloscopio = lazyWithRetry(() => import("./pages/articles/Osciloscopio"));
const FuentesAlimentacion = lazyWithRetry(() => import("./pages/articles/FuentesAlimentacion"));
const Soldadura = lazyWithRetry(() => import("./pages/articles/Soldadura"));
const ProtocoloI2C = lazyWithRetry(() => import("./pages/articles/ProtocoloI2C"));
const SensoresArduino = lazyWithRetry(() => import("./pages/articles/SensoresArduino"));
const PantallaOled = lazyWithRetry(() => import("./pages/articles/PantallaOled"));
const BlogPrimerLaboratorio = lazyWithRetry(() => import("./pages/articles/BlogPrimerLaboratorio"));
const BlogProyectosArduino = lazyWithRetry(() => import("./pages/articles/BlogProyectosArduino"));
const BlogDisenoPCB = lazyWithRetry(() => import("./pages/articles/BlogDisenoPCB"));
const QueArduinoComprar = lazyWithRetry(() => import("./pages/articles/QueArduinoComprar"));
const PwmArduino = lazyWithRetry(() => import("./pages/articles/PwmArduino"));
const ReguladoresVoltaje = lazyWithRetry(() => import("./pages/articles/ReguladoresVoltaje"));
const LeerDatasheet = lazyWithRetry(() => import("./pages/articles/LeerDatasheet"));

// Calculadoras con URL propia (SEO + metadatos por página + prerender SSG)
const OhmCalculatorPage = lazyWithRetry(() => import("./pages/calculators/OhmCalculatorPage"));
const LedCalculatorPage = lazyWithRetry(() => import("./pages/calculators/LedCalculatorPage"));
const ResistorCalculatorPage = lazyWithRetry(() => import("./pages/calculators/ResistorCalculatorPage"));
const VoltageDividerPage = lazyWithRetry(() => import("./pages/calculators/VoltageDividerPage"));
const RCFilterPage = lazyWithRetry(() => import("./pages/calculators/RCFilterPage"));
const Timer555Page = lazyWithRetry(() => import("./pages/calculators/Timer555Page"));
const SmdDecoderPage = lazyWithRetry(() => import("./pages/calculators/SmdDecoderPage"));
const CapacitiveReactancePage = lazyWithRetry(() => import("./pages/calculators/CapacitiveReactancePage"));
const UnitConverterPage = lazyWithRetry(() => import("./pages/calculators/UnitConverterPage"));

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
        <Route path="/paleta" element={<PalettePreview />} />
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

        {/* Calculadoras con URL propia (SEO SEA/AdSense) */}
        <Route path="/ley-de-ohm" element={<OhmCalculatorPage />} />
        <Route path="/calculadora-led" element={<LedCalculatorPage />} />
        <Route path="/calculadora-resistencias" element={<ResistorCalculatorPage />} />
        <Route path="/divisor-de-voltaje" element={<VoltageDividerPage />} />
        <Route path="/filtro-rc" element={<RCFilterPage />} />
        <Route path="/temporizador-555" element={<Timer555Page />} />
        <Route path="/decodificador-smd" element={<SmdDecoderPage />} />
        <Route path="/reactancia-capacitiva" element={<CapacitiveReactancePage />} />
        <Route path="/conversor-unidades" element={<UnitConverterPage />} />

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
