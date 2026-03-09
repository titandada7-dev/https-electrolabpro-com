import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Cookie, Eye, Mail } from "lucide-react";

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          Política de Privacidad y Cookies
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Última actualización: Marzo 2026</p>

        {/* Responsable */}
        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="1. Responsable del sitio">
          <p>
            <strong>ElectroLab Pro</strong> (electrolabpro.com) es un proyecto educativo sobre electrónica creado y mantenido por
            <strong> J.A. Sanchez</strong>.
          </p>
          <p>
            Este sitio web no almacena datos personales sensibles ni requiere registro de usuarios.
          </p>
        </Section>

        {/* Datos recopilados */}
        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="2. Datos que recopilamos">
          <p>ElectroLab Pro puede recopilar de forma automática:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Cookies técnicas esenciales:</strong> necesarias para el funcionamiento básico del sitio (preferencias de consentimiento).</li>
            <li><strong>Cookies analíticas:</strong> datos anónimos de navegación mediante Google Analytics para mejorar la experiencia del usuario.</li>
            <li><strong>Cookies publicitarias:</strong> utilizadas por Google AdSense para mostrar anuncios personalizados según tus intereses.</li>
            <li><strong>Cookies de afiliados:</strong> Amazon Associates utiliza cookies para rastrear las compras realizadas a través de nuestros enlaces de afiliado.</li>
          </ul>
        </Section>

        {/* Cookies */}
        <Section icon={<Cookie className="w-5 h-5 text-primary" />} title="3. Política de Cookies">
          <p>
            Una cookie es un pequeño archivo de texto que se almacena en tu dispositivo al visitar un sitio web.
            Utilizamos los siguientes tipos de cookies:
          </p>

          <div className="mt-4 rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left p-3 font-semibold">Tipo</th>
                  <th className="text-left p-3 font-semibold">Proveedor</th>
                  <th className="text-left p-3 font-semibold">Finalidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3">Esenciales</td>
                  <td className="p-3">ElectroLab Pro</td>
                  <td className="p-3">Guardar preferencias de consentimiento</td>
                </tr>
                <tr>
                  <td className="p-3">Analíticas</td>
                  <td className="p-3">Google Analytics</td>
                  <td className="p-3">Estadísticas anónimas de uso</td>
                </tr>
                <tr>
                  <td className="p-3">Publicitarias</td>
                  <td className="p-3">Google AdSense</td>
                  <td className="p-3">Anuncios personalizados</td>
                </tr>
                <tr>
                  <td className="p-3">Afiliados</td>
                  <td className="p-3">Amazon Associates</td>
                  <td className="p-3">Seguimiento de compras por enlace de afiliado</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Puedes gestionar tus preferencias de cookies en cualquier momento haciendo clic en el botón de configuración del banner de cookies,
            o desactivándolas desde la configuración de tu navegador.
          </p>
        </Section>

        {/* Google AdSense */}
        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="4. Google AdSense y publicidad">
          <p>
            Este sitio utiliza Google AdSense para mostrar anuncios. Google y sus socios publicitarios pueden utilizar cookies
            para personalizar los anuncios en función de tus visitas a este sitio y a otros sitios de Internet.
          </p>
          <p className="mt-2">
            Puedes optar por la publicidad no personalizada visitando la{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              configuración de anuncios de Google
            </a>.
          </p>
        </Section>

        {/* Amazon */}
        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="5. Programa de Afiliados de Amazon">
          <p>
            ElectroLab Pro participa en el Programa de Afiliados de Amazon EU, un programa de publicidad para afiliados
            diseñado para ofrecer a sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo
            enlaces a Amazon.es.
          </p>
          <p className="mt-2">
            Los ingresos generados ayudan a mantener esta plataforma gratuita para estudiantes de electrónica.
          </p>
        </Section>

        {/* Derechos */}
        <Section icon={<Shield className="w-5 h-5 text-primary" />} title="6. Tus derechos (GDPR)">
          <p>
            De acuerdo con el Reglamento General de Protección de Datos (RGPD), tienes derecho a:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Acceder a tus datos personales</li>
            <li>Rectificar datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al tratamiento de tus datos</li>
            <li>Solicitar la portabilidad de tus datos</li>
            <li>Retirar tu consentimiento en cualquier momento</li>
          </ul>
        </Section>

        {/* Contacto */}
        <Section icon={<Mail className="w-5 h-5 text-primary" />} title="7. Contacto">
          <p>
            Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos,
            puedes contactarnos a través de nuestras redes sociales o canales oficiales de ElectroLab Pro.
          </p>
        </Section>

        {/* Cambios */}
        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="8. Cambios en esta política">
          <p>
            Nos reservamos el derecho de actualizar esta política de privacidad y cookies en cualquier momento.
            Los cambios serán publicados en esta página con la fecha de actualización correspondiente.
          </p>
        </Section>
      </main>

      <footer className="w-full py-6 bg-black/50 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A.Sanchez</span>
          </p>
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
