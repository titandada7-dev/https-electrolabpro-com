import { Link } from "react-router-dom";
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

        <Section icon={<Cookie className="w-5 h-5 text-primary" />} title="1. Uso de Cookies">
          <p>
            Este sitio utiliza cookies para mejorar la experiencia del usuario, permitir el correcto funcionamiento
            de nuestras herramientas interactivas (calculadoras, diccionario de componentes) y para mostrar anuncios
            relevantes a través de servicios de publicidad de terceros.
          </p>
        </Section>

        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="2. Google AdSense">
          <p>
            Google, como proveedor de terceros, utiliza cookies para publicar anuncios en nuestro sitio. El uso de
            la cookie de publicidad de Google permite a Google y a sus socios publicar anuncios basados en las visitas
            de los usuarios a nuestro sitio y a otros sitios de Internet.
          </p>
          <p>
            Nuestro ID de editor es: <strong>pub-9393284878747603</strong>. Los usuarios pueden inhabilitar la
            publicidad personalizada visitando la{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Configuración de anuncios de Google
            </a>.
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
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A.Sanchez</span>
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
