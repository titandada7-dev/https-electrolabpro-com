import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FileText, ArrowLeft } from "lucide-react";

const TerminosCondiciones = () => {
  usePageMeta({
    title: "Términos y Condiciones - ElectroLab Pro",
    description:
      "Términos y condiciones de uso de ElectroLab Pro: suscripción Premium, condiciones de pago y facturación vía Paddle (Merchant of Record), cancelación, reembolsos y limitación de responsabilidad.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Términos y Condiciones de Uso</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-8">
          Última actualización: 19 de junio de 2026 · Vendedor: <strong>J.A. Sánchez</strong> (ElectroLab Pro).
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Aceptación de los términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar el sitio web ElectroLab Pro (electrolabpro.com), en adelante "el Sitio",
              aceptas cumplir con estos Términos y Condiciones de Uso. Si no estás de acuerdo con alguno de
              estos términos, te rogamos que no utilices el Sitio. El uso continuado del Sitio tras la
              publicación de cambios en estos términos constituye la aceptación de dichos cambios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Identificación del vendedor</h2>
            <p className="text-muted-foreground leading-relaxed">
              El responsable del Sitio y vendedor de la suscripción Premium es <strong>J.A. Sánchez</strong>,
              que opera bajo el nombre comercial <strong>ElectroLab Pro</strong>. Contacto:{" "}
              <a href="mailto:contacto@electrolabpro.com" className="text-primary hover:underline">
                contacto@electrolabpro.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Descripción del servicio</h2>
            <p className="text-muted-foreground leading-relaxed">
              ElectroLab Pro es una plataforma educativa de electrónica que combina un nivel gratuito (calculadoras,
              guías y artículos) y un nivel <strong>Premium</strong> de pago (simuladores interactivos, calculadoras
              avanzadas y biblioteca técnica). El servicio se proporciona "tal cual" y "según disponibilidad", sin
              garantías de ningún tipo más allá de las exigidas por la legislación aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Uso permitido</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El usuario se compromete a utilizar el Sitio de forma lícita y conforme a estos términos.
              Queda prohibido:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Reproducir, distribuir o modificar el contenido del Sitio sin autorización previa por escrito.</li>
              <li>Utilizar el Sitio para fines ilegales, fraudulentos o de envío de spam.</li>
              <li>Intentar acceder de forma no autorizada a los sistemas o servidores del Sitio, introducir malware o realizar pruebas de intrusión.</li>
              <li>Compartir credenciales de acceso o el contenido Premium con terceros.</li>
              <li>Utilizar técnicas de scraping, bots o mecanismos automatizados para extraer contenido masivamente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Propiedad intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo el contenido del Sitio (textos, gráficos, logotipos, iconos, imágenes, código fuente,
              calculadoras, guías técnicas y diseño visual) es propiedad de J.A. Sánchez y ElectroLab Pro, o se
              utiliza bajo licencia. Se permite la cita parcial con atribución y enlace al contenido original.
              El usuario obtiene una licencia limitada, no exclusiva e intransferible para uso personal del
              servicio dentro del plan contratado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Limitación de responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Las herramientas de cálculo y el contenido educativo son estrictamente para fines educativos,
              de referencia y de prototipado, y no sustituyen cálculos profesionales en aplicaciones críticas
              o industriales.
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
            <h2 className="text-xl font-semibold mb-3">7. Suscripción Premium, pago y facturación</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              La suscripción Premium se ofrece como un servicio de pago recurrente con las siguientes condiciones:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Precio y ciclo de facturación:</strong> el precio vigente y la periodicidad (mensual o anual)
                se muestran en la página de{" "}
                <Link to="/premium" className="text-primary hover:underline">suscripción Premium</Link>{" "}
                antes de confirmar la compra. Los importes se expresan con los impuestos aplicables según tu país,
                calculados por Paddle.
              </li>
              <li>
                <strong>Renovación automática:</strong> la suscripción se renueva automáticamente al final de cada
                periodo de facturación al precio entonces vigente, salvo cancelación previa.
              </li>
              <li>
                <strong>Cancelación:</strong> puedes cancelar en cualquier momento desde la página{" "}
                <Link to="/account" className="text-primary hover:underline">Mi cuenta</Link>{" "}
                o desde el portal de cliente de Paddle. Conservarás el acceso Premium hasta el final del periodo
                ya pagado y no se generarán nuevos cargos.
              </li>
              <li>
                <strong>Reembolsos:</strong> se rigen por nuestra{" "}
                <Link to="/politica-reembolsos" className="text-primary hover:underline">Política de Reembolsos</Link>{" "}
                (garantía de 30 días). Las solicitudes se tramitan a través de Paddle en{" "}
                <a href="https://paddle.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">paddle.net</a>.
              </li>
              <li>
                <strong>Cambios de precio:</strong> cualquier modificación se notificará por correo con al menos
                30 días de antelación a la siguiente renovación.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Paddle como Merchant of Record</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro proceso de pedido lo gestiona nuestro vendedor en línea <strong>Paddle.com Market Limited</strong>.
              Paddle.com es el <strong>Merchant of Record</strong> (vendedor registrado) de todos nuestros pedidos
              y se ocupa de la atención al cliente relacionada con pagos, así como de las devoluciones, los
              impuestos aplicables y la facturación. Los datos de pago se recogen y custodian directamente por
              Paddle; nosotros únicamente recibimos metadatos de la transacción necesarios para activar y gestionar
              tu suscripción.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Las condiciones de compra de Paddle están disponibles en{" "}
              <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                paddle.com/legal/checkout-buyer-terms
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Suspensión y terminación</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos suspender o terminar el acceso al servicio en caso de incumplimiento material de estos
              términos, falta de pago, riesgo de fraude o uso indebido reiterado. En caso de terminación por
              nuestra parte sin causa imputable al usuario, reembolsaremos la parte proporcional del periodo
              de suscripción no consumido a través de Paddle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Enlaces a terceros y programa de afiliados</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              El Sitio puede contener enlaces a sitios web de terceros, incluyendo enlaces de afiliado del
              Programa de Asociados de Amazon EU (ID: <strong>electrolabp0c-21</strong>). Estos enlaces generan
              una comisión por las compras elegibles, sin coste adicional para el usuario.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ElectroLab Pro no tiene control sobre el contenido o las políticas de los sitios de terceros.
              La inclusión de un enlace no implica respaldo ni responsabilidad sobre su contenido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Publicidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              El Sitio utiliza Google AdSense y otras tecnologías publicitarias para mostrar anuncios
              personalizados. Para más información consulta nuestra{" "}
              <Link to="/privacidad" className="text-primary hover:underline">
                Política de Privacidad y Cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Modificaciones del servicio y los términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en
              cualquier momento. Igualmente, podemos actualizar estos Términos; los cambios entrarán en vigor a
              partir de su publicación en esta página y, cuando sean sustanciales, se notificarán por correo a
              los suscriptores Premium.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Legislación aplicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos Términos se rigen por la legislación española. Para cualquier controversia derivada de su
              interpretación o cumplimiento, las partes se someten a los juzgados y tribunales competentes
              conforme a la normativa de consumo aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes alguna pregunta sobre estos Términos y Condiciones, contáctanos a través de nuestra{" "}
              <Link to="/contacto" className="text-primary hover:underline">página de contacto</Link>{" "}
              o escribiendo a{" "}
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
      </div>
    </div>
  );
};

export default TerminosCondiciones;
