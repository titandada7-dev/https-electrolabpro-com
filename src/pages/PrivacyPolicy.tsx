import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowLeft, Shield, Cookie, Eye, Mail } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const PrivacyPolicy = () => {
  usePageMeta({
    title: "Política de Privacidad | ElectroLab Pro",
    description: "Conoce cómo ElectroLab Pro protege tus datos personales, el uso de cookies, Google Analytics y publicidad de Google AdSense en nuestro sitio.",
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </Link>
          <span className="text-lg font-mono font-bold">
            Electro<span className="text-primary">Lab</span> — Legal
          </span>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs />
      </div>

      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <p className="text-muted-foreground mb-6">
          En ElectroLab Pro, gestionado por <strong>J.A. Sanchez</strong>, la privacidad de nuestros visitantes es
          una prioridad. Esta página detalla cómo se recopila y utiliza la información.
        </p>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          Política de Privacidad - ElectroLab Pro
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Última actualización: 9 de marzo de 2026</p>

        <Section icon={<Cookie className="w-5 h-5 text-primary" />} title="1. Uso de Cookies y Consentimiento">
          <p>
            Este sitio utiliza cookies propias y de terceros para mejorar la experiencia del usuario, permitir el
            correcto funcionamiento de nuestras herramientas interactivas (calculadoras, diccionario de componentes)
            y mostrar anuncios relevantes mediante servicios de publicidad de terceros.
          </p>
          <p>
            En tu primera visita mostramos un banner donde podés <strong>Aceptar</strong>, <strong>Rechazar</strong> o
            <strong> Configurar</strong> el uso de cookies analíticas y publicitarias. Las cookies estrictamente
            necesarias siempre están activas porque permiten que la web funcione. Si rechazás las cookies de
            publicidad, los anuncios personalizados de Google AdSense no se cargarán. Podés cambiar tu decisión en
            cualquier momento borrando las cookies del navegador.
          </p>
        </Section>

        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="2. Google AdSense y consentimiento publicitario">
          <p>
            Google, como proveedor de terceros, utiliza cookies para publicar anuncios en nuestro sitio. El uso de
            la cookie de publicidad de Google permite a Google y a sus socios publicar anuncios basados en las visitas
            de los usuarios a nuestro sitio y a otros sitios de Internet. Nuestro ID de editor es{" "}
            <strong>pub-9393284878747603</strong>.
          </p>
          <p>
            <strong>Mensaje de privacidad propio:</strong> antes de cargar el script de Google AdSense
            (<code className="text-xs bg-muted px-1 py-0.5 rounded">pagead2.googlesyndication.com</code>) mostramos un
            banner propio donde podés <strong>Aceptar</strong> o <strong>Rechazar</strong> la publicidad personalizada.
            Mientras la decisión esté pendiente o sea "Rechazar", el script de AdSense no se inyecta y no se descargan
            cookies publicitarias de Google. Si aceptás, el script se carga de forma diferida cuando un slot entra cerca
            del viewport. Tu decisión se guarda en{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">localStorage["adsense-consent"]</code> y podés
            cambiarla en cualquier momento borrando las cookies y datos del sitio en tu navegador.
          </p>
          <p>
            Para gestionar tus preferencias de publicidad a nivel de Google podés visitar la{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Configuración de anuncios de Google
            </a>{" "}
            o consultar las{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              políticas de partners de Google
            </a>.
          </p>
          <p>
            Los anuncios se ubican únicamente en zonas de contenido (encabezados de página, dentro de artículos
            educativos y barras laterales). <strong>Nunca</strong> colocamos anuncios dentro de las calculadoras
            interactivas, encima de botones o en lugares donde puedan inducir clics accidentales, conforme a las
            políticas del programa AdSense.
          </p>
        </Section>

        <Section icon={<Shield className="w-5 h-5 text-primary" />} title="3. Cookie DART">
          <p>
            Google utiliza la cookie DART para mostrar anuncios a los usuarios en función de su visita a nuestro sitio
            y a otros sitios de Internet. Los usuarios pueden inhabilitar el uso de la cookie de DART a través de la{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              política de privacidad de la red de anuncios y contenido de Google
            </a>.
          </p>
        </Section>

        <Section icon={<Cookie className="w-5 h-5 text-primary" />} title="4. Programa de Afiliados de Amazon">
          <p>
            ElectroLab Pro participa en el Programa de Afiliados de Amazon Services LLC. Esto significa que recibimos
            una pequeña comisión por las compras realizadas a través de nuestros enlaces de productos recomendados
            (ID de seguimiento: <strong>electrolabp0c-21</strong>), sin costo adicional para el usuario.
          </p>
        </Section>

        <Section icon={<Mail className="w-5 h-5 text-primary" />} title="5. Contacto">
          <p>
            El responsable de este sitio web es <strong>J.A. Sanchez</strong>. Para cualquier duda sobre esta política,
            puedes contactarnos a través de nuestra web oficial:{" "}
            <a href="https://electrolabpro.com" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              electrolabpro.com
            </a>{" "}
            o visitando nuestra{" "}
            <Link to="/contacto" className="text-primary underline hover:text-primary/80">
              página de contacto
            </Link>.
          </p>
        </Section>
      </main>

      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A. Sanchez</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4 mb-3">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Contacto</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Sobre Nosotros</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/terminos-y-condiciones" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Términos</Link>
          </div>
          <p className="text-muted-foreground/60 text-[10px] leading-relaxed max-w-xl mx-auto italic mb-4">
            En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
          </p>
          <div className="border-t border-border pt-4 mt-2">
            <p className="text-primary/80 text-[10px] font-semibold uppercase tracking-wider mb-1">⚠️ Aviso de Seguridad</p>
            <p className="text-muted-foreground/50 text-[9px] leading-relaxed max-w-2xl mx-auto">
              La electrónica implica riesgos inherentes. Siempre verifica los valores de los componentes con un multímetro real antes de energizar un circuito para evitar daños personales o materiales.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    <div className="text-muted-foreground leading-relaxed space-y-2 pl-7">
      {children}
    </div>
  </section>
);

export default PrivacyPolicy;
