import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FileText, ArrowLeft } from "lucide-react";

const TerminosCondiciones = () => {
  usePageMeta({
    title: "Términos y Condiciones - ElectroLab Pro",
    description:
      "Términos y condiciones de uso del sitio web ElectroLab Pro. Conoce las reglas de uso, limitaciones de responsabilidad y derechos de propiedad intelectual.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <ArrowLeft className="w-4 h-4" /> ElectroLab Pro
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs />
      </div>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Términos y Condiciones de Uso</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8">
          Última actualización: 10 de abril de 2026
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Aceptación de los términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar el sitio web ElectroLab Pro (electrolabpro.com), en adelante "el Sitio",
              aceptas cumplir con estos Términos y Condiciones de Uso. Si no estás de acuerdo con alguno
              de estos términos, te rogamos que no utilices el Sitio. El uso continuado del Sitio tras la
              publicación de cambios en estos términos constituye la aceptación de dichos cambios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Descripción del servicio</h2>
            <p className="text-muted-foreground leading-relaxed">
              ElectroLab Pro es una plataforma educativa gratuita que ofrece herramientas de cálculo
              electrónico (calculadoras de resistencias, Ley de Ohm, LEDs, divisores de tensión, etc.),
              guías técnicas, artículos educativos y recursos para el aprendizaje de la electrónica.
              El servicio se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Uso permitido</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El usuario se compromete a utilizar el Sitio de forma lícita y conforme a estos términos.
              Queda prohibido:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Reproducir, distribuir o modificar el contenido del Sitio sin autorización previa por escrito.</li>
              <li>Utilizar el Sitio para fines ilegales o no autorizados.</li>
              <li>Intentar acceder de forma no autorizada a los sistemas o servidores del Sitio.</li>
              <li>Utilizar técnicas de scraping, bots o mecanismos automatizados para extraer contenido masivamente.</li>
              <li>Interferir con el funcionamiento normal del Sitio o sus servicios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Propiedad intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo el contenido del Sitio, incluyendo pero no limitado a textos, gráficos, logotipos,
              iconos, imágenes, código fuente, calculadoras, guías técnicas y diseño visual, es propiedad
              de J.A. Sánchez y ElectroLab Pro, o se utiliza bajo licencia. Este contenido está protegido
              por las leyes de propiedad intelectual aplicables. Se permite la cita parcial con atribución
              y enlace al contenido original.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Limitación de responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Las herramientas de cálculo y el contenido educativo proporcionados por ElectroLab Pro son
              estrictamente para fines educativos, de referencia y de prototipado. En ningún caso deben
              utilizarse como sustituto de cálculos profesionales en aplicaciones críticas o industriales.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ElectroLab Pro y su autor no se hacen responsables de:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Daños directos o indirectos derivados del uso de las calculadoras o la información proporcionada.</li>
              <li>Lesiones personales o daños materiales causados por el uso inadecuado de circuitos electrónicos.</li>
              <li>Errores u omisiones en el contenido técnico, aunque se realiza un esfuerzo continuo por mantener la precisión.</li>
              <li>La disponibilidad continua e ininterrumpida del servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Enlaces a terceros y programa de afiliados</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El Sitio puede contener enlaces a sitios web de terceros, incluyendo enlaces de afiliado
              del Programa de Asociados de Amazon EU (ID: electrolabp0c-21). Estos enlaces generan una
              comisión por las compras elegibles realizadas a través de ellos, sin coste adicional para el usuario.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ElectroLab Pro no tiene control sobre el contenido, políticas de privacidad o prácticas de
              sitios web de terceros. La inclusión de un enlace no implica respaldo ni responsabilidad
              sobre su contenido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Publicidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              El Sitio utiliza Google AdSense y otras tecnologías publicitarias para mostrar anuncios
              personalizados. Estos servicios pueden utilizar cookies y tecnologías similares para ofrecer
              publicidad relevante. Para más información, consulta nuestra{" "}
              <Link to="/privacidad" className="text-primary hover:underline">
                Política de Privacidad y Cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Disponibilidad y modificaciones del servicio</h2>
            <p className="text-muted-foreground leading-relaxed">
              ElectroLab Pro se reserva el derecho de modificar, suspender o discontinuar cualquier
              aspecto del servicio en cualquier momento y sin previo aviso. Asimismo, nos reservamos el
              derecho de actualizar estos Términos y Condiciones. Los cambios entrarán en vigor a partir
              de su publicación en esta página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Legislación aplicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos Términos y Condiciones se rigen por la legislación española. Para cualquier
              controversia derivada de la interpretación o el cumplimiento de estos términos, las partes
              se someten a la jurisdicción de los juzgados y tribunales competentes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes alguna pregunta sobre estos Términos y Condiciones, podés contactarnos a través
              de nuestra{" "}
              <Link to="/contacto" className="text-primary hover:underline">
                página de contacto
              </Link>{" "}
              o enviando un correo a{" "}
              <a href="mailto:contacto@electrolabpro.com" className="text-primary hover:underline">
                contacto@electrolabpro.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <Link to="/" className="text-primary hover:underline text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Volver a ElectroLab Pro
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TerminosCondiciones;
