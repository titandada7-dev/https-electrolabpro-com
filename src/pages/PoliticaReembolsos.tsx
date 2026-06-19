import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowLeft, RotateCcw, Clock, CreditCard, Mail } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const PoliticaReembolsos = () => {
  usePageMeta({
    title: "Política de Reembolsos | ElectroLab Pro",
    description:
      "Política de reembolsos de ElectroLab Pro Premium: garantía de 30 días. Los reembolsos se gestionan a través de Paddle (Merchant of Record) desde paddle.net.",
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

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <RotateCcw className="w-8 h-8 text-primary" />
          Política de Reembolsos y Cancelaciones
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Última actualización: 19 de junio de 2026 · Responsable: <strong>J.A. Sánchez</strong> (ElectroLab Pro).
        </p>

        <p className="text-muted-foreground leading-relaxed mb-8">
          Esta política aplica a la suscripción <strong>ElectroLab Pro Premium</strong>. Los pagos son procesados
          por <strong>Paddle.com Market Limited</strong>, nuestro <em>Merchant of Record</em> (vendedor registrado),
          por lo que los reembolsos los emite Paddle por cuenta nuestra.
        </p>

        <Section icon={<Clock className="w-5 h-5 text-primary" />} title="1. Garantía de devolución de 30 días">
          <p>
            Ofrecemos una <strong>garantía de devolución de 30 días</strong> desde la fecha del cargo inicial.
            Si dentro de ese plazo no estás satisfecho con la suscripción Premium, puedes solicitar el reembolso
            íntegro del último pago, sin necesidad de justificar el motivo.
          </p>
          <p>
            Transcurridos los 30 días, los pagos de periodos ya facturados no son reembolsables salvo
            obligación legal aplicable o error de cobro demostrable (p. ej. cargo duplicado, fallo técnico
            que impidió el acceso al servicio durante un periodo significativo).
          </p>
        </Section>

        <Section icon={<CreditCard className="w-5 h-5 text-primary" />} title="2. Cómo solicitar un reembolso">
          <p>
            Los reembolsos se solicitan directamente a Paddle, ya que es quien procesa el pago y emite la factura:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Accede a{" "}
              <a
                href="https://paddle.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                paddle.net
              </a>{" "}
              e introduce el correo con el que realizaste la compra.
            </li>
            <li>Localiza la transacción correspondiente y solicita el reembolso desde el portal.</li>
            <li>
              Alternativamente, puedes escribir a{" "}
              <a href="mailto:contacto@electrolabpro.com" className="text-primary underline hover:text-primary/80">
                contacto@electrolabpro.com
              </a>{" "}
              y nosotros tramitaremos la solicitud con Paddle por ti.
            </li>
          </ul>
          <p>
            El importe se devuelve al mismo método de pago utilizado en la compra. Paddle suele procesar la
            devolución en un plazo de 3 a 10 días hábiles, según el banco emisor.
          </p>
        </Section>

        <Section icon={<RotateCcw className="w-5 h-5 text-primary" />} title="3. Cancelación de la suscripción">
          <p>
            Puedes cancelar tu suscripción en cualquier momento desde la página{" "}
            <Link to="/account" className="text-primary underline hover:text-primary/80">
              Mi cuenta
            </Link>{" "}
            o desde el portal de cliente de Paddle. Al cancelar:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>No se generarán nuevos cargos en futuras renovaciones.</li>
            <li>
              Conservas el acceso a las funciones Premium hasta el final del periodo de facturación que ya hayas
              pagado (no se prorratea el tiempo restante).
            </li>
            <li>Tras esa fecha, la cuenta vuelve automáticamente al plan gratuito.</li>
          </ul>
        </Section>

        <Section icon={<Mail className="w-5 h-5 text-primary" />} title="4. Contacto y resolución de disputas">
          <p>
            Para cualquier duda sobre reembolsos o facturación, escríbenos a{" "}
            <a href="mailto:contacto@electrolabpro.com" className="text-primary underline hover:text-primary/80">
              contacto@electrolabpro.com
            </a>
            . Las condiciones generales de compra aplicadas por Paddle están disponibles en{" "}
            <a
              href="https://www.paddle.com/legal/checkout-buyer-terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              paddle.com/legal/checkout-buyer-terms
            </a>{" "}
            y la política de reembolsos de Paddle en{" "}
            <a
              href="https://www.paddle.com/legal/refund-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              paddle.com/legal/refund-policy
            </a>
            .
          </p>
        </Section>

        <div className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground">
          Consulta también nuestros{" "}
          <Link to="/terminos-y-condiciones" className="text-primary hover:underline">
            Términos y Condiciones
          </Link>{" "}
          y la{" "}
          <Link to="/privacidad" className="text-primary hover:underline">
            Política de Privacidad
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 pl-7">{children}</div>
  </section>
);

export default PoliticaReembolsos;
