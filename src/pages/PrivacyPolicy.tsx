import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowLeft, Shield, Cookie, Eye, Mail, Database, Scale, Clock, UserCheck, Lock, Globe, CreditCard } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const PrivacyPolicy = () => {
  usePageMeta({
    title: "Política de Privacidad | ElectroLab Pro",
    description:
      "Política de privacidad de ElectroLab Pro: base legal RGPD, datos recopilados, Paddle como procesador de pagos, cookies, Google AdSense, derechos del usuario y conservación de datos.",
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
          <Shield className="w-8 h-8 text-primary" />
          Política de Privacidad
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Última actualización: 19 de junio de 2026</p>

        <p className="text-muted-foreground leading-relaxed mb-8">
          En ElectroLab Pro, gestionado por <strong>J.A. Sánchez</strong> (responsable del tratamiento, en
          adelante "nosotros"), la privacidad de nuestros visitantes y suscriptores es una prioridad.
          Esta política explica qué datos recopilamos, con qué base legal, con quién los compartimos
          (incluido <strong>Paddle</strong> como procesador de pagos) y cuáles son tus derechos.
          Contacto: <a href="mailto:contacto@electrolabpro.com" className="text-primary underline hover:text-primary/80">contacto@electrolabpro.com</a>.
        </p>

        <Section icon={<Database className="w-5 h-5 text-primary" />} title="1. Categorías de datos que recopilamos">
          <p>Tratamos distintas categorías de datos según el tipo de usuario:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Visitantes anónimos:</strong> datos técnicos del dispositivo (IP truncada, navegador, sistema operativo, idioma), páginas visitadas y métricas agregadas de uso vía Google Analytics y Google AdSense.</li>
            <li><strong>Usuarios registrados:</strong> dirección de correo electrónico, identificador de usuario, fecha de registro, preferencias de notificaciones y progreso en el contenido Premium.</li>
            <li><strong>Suscriptores Premium (de pago):</strong> identificador de cliente de Paddle, identificador de suscripción, estado de la suscripción (activa, cancelada, en periodo de gracia), fechas de inicio y fin del periodo de facturación y plan contratado. <strong>No almacenamos números de tarjeta ni datos bancarios</strong>: esa información la recoge y custodia directamente Paddle.</li>
            <li><strong>Comunicaciones:</strong> contenido de los mensajes que nos envías por el formulario de contacto o por correo.</li>
          </ul>
        </Section>

        <Section icon={<Scale className="w-5 h-5 text-primary" />} title="2. Finalidades y base legal (RGPD)">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Prestación del servicio gratuito</strong> (acceso a calculadoras, guías, cuenta de usuario) — <em>ejecución de contrato</em> (art. 6.1.b RGPD).</li>
            <li><strong>Gestión de la suscripción Premium</strong> (alta, renovaciones, cancelaciones, control de acceso) — <em>ejecución de contrato</em> (art. 6.1.b).</li>
            <li><strong>Cobro y facturación</strong> a través de Paddle — <em>ejecución de contrato</em> y <em>obligación legal</em> (art. 6.1.b y 6.1.c).</li>
            <li><strong>Envío de correos transaccionales</strong> (bienvenida Premium, cambios de suscripción, recuperación de contraseña) — <em>ejecución de contrato</em>.</li>
            <li><strong>Notificaciones de contenido Premium nuevo</strong> — <em>consentimiento</em> explícito (art. 6.1.a), revocable en cualquier momento desde el Hub Premium o el enlace de baja del correo.</li>
            <li><strong>Cookies analíticas y publicitarias</strong> (Google Analytics, AdSense) — <em>consentimiento</em> gestionado en el banner de cookies.</li>
            <li><strong>Seguridad, prevención del fraude y registro de auditoría</strong> — <em>interés legítimo</em> (art. 6.1.f) en proteger el servicio.</li>
          </ul>
        </Section>

        <Section icon={<CreditCard className="w-5 h-5 text-primary" />} title="3. Paddle como procesador de pagos (Merchant of Record)">
          <p>
            Los pagos de la suscripción Premium son procesados por <strong>Paddle.com Market Limited</strong>,
            con sede en Irlanda, que actúa como nuestro <em>Merchant of Record</em> (vendedor registrado).
            Esto significa que Paddle es el comerciante oficial de registro para cada transacción: gestiona
            el cobro, la facturación, el cálculo y la declaración de impuestos, el cumplimiento fiscal y
            la atención al comprador relacionada con el pedido. A efectos de privacidad, Paddle actúa como
            responsable independiente del tratamiento de los datos de pago que recoge directamente de ti.
          </p>
          <p><strong>3.1. Datos de pago que compartimos con Paddle</strong></p>
          <p>
            Cuando inicias una suscripción Premium, Electrolab Pro transmite a Paddle los datos necesarios
            para vincular tu cuenta con el pedido y activar tu acceso:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Identidad de contacto:</strong> nombre completo y dirección de correo electrónico asociados a tu cuenta.</li>
            <li><strong>Identificador de cuenta:</strong> identificador interno de tu usuario en ElectroLab Pro, para poder activar o desactivar el acceso Premium.</li>
            <li><strong>Plan contratado:</strong> nombre del plan, periodicidad (mensual/anual) y precio acordado en el momento de la compra.</li>
            <li><strong>Dirección IP:</strong> dirección IP desde la que se realiza la compra, usada por Paddle para seguridad, antifraude y determinación fiscal.</li>
          </ul>
          <p>
            Además, Paddle recoge directamente de ti —a través de su pasarela de pago segura— la siguiente
            información sensible, que <strong>ElectroLab Pro no almacena ni puede acceder</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Datos de facturación:</strong> dirección postal, ciudad, provincia, código postal, país y, cuando sea obligatorio, número de identificación fiscal (NIF/CIF/VAT).</li>
            <li><strong>Datos del método de pago:</strong> número de tarjeta completo, fecha de caducidad, CVV, token de pago o datos de PayPal/Apple Pay/Google Pay. Paddle custodia estos datos con proveedores acreditados de tokenización y cumplimiento PCI-DSS.</li>
            <li><strong>Últimos 4 dígitos de la tarjeta y red de pago:</strong> visibles en tu factura y en el resumen de pago, sin que Electrolab Pro los guarde.</li>
            <li><strong>Importes y referencias de la transacción:</strong> importe cobrado, moneda, comisiones, impuestos aplicados, número de pedido y referencias de suscripción.</li>
          </ul>
          <p><strong>3.2. Finalidades del tratamiento de datos de pago</strong></p>
          <p>Paddle trata los datos anteriores para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Procesar el cobro</strong> de la suscripción y gestionar renovaciones, pagos fallidos, periodos de gracia y cancelaciones.</li>
            <li><strong>Emitir facturas</strong> conforme a la legislación fiscal del país del comprador.</li>
            <li><strong>Calcular, recaudar y declarar impuestos</strong> (IVA, GST, sales tax u otros tributos aplicables).</li>
            <li><strong>Prevenir fraudes</strong> mediante verificación de identidad, análisis de riesgo y cumplimiento normativo.</li>
            <li><strong>Ofrecer atención al comprador</strong> sobre pedidos, reembolsos, actualizaciones de método de pago y gestión del portal de cliente.</li>
          </ul>
          <p><strong>3.3. Base legal</strong></p>
          <p>
            El tratamiento de tus datos de pago por Paddle se ampara en la <em>ejecución del contrato</em>
            (art. 6.1.b RGPD) —pagar la suscripción y activar el acceso Premium— y en el <em>cumplimiento
            de obligaciones legales</em> (art. 6.1.c RGPD) en materia fiscal, contable y de lucha contra el fraude.
          </p>
          <p><strong>3.4. Qué datos recibe Electrolab Pro</strong></p>
          <p>
            Una vez completado el pedido, Paddle notifica a ElectroLab Pro únicamente los metadatos necesarios
            para gestionar tu acceso: identificador de cliente de Paddle, identificador de suscripción, estado
            de la suscripción (activa, pasada por pagos, cancelada, etc.), fechas de inicio y fin del periodo de
            facturación, plan contratado e importe. No recibimos ni almacenamos tu número de tarjeta completo
            ni tus datos bancarios.
          </p>
          <p><strong>3.5. Conservación de los datos de pago</strong></p>
          <p>
            Los datos de pago gestionados por Paddle se conservan durante el tiempo necesario para cumplir con
            las obligaciones legales y contractuales de Paddle, incluyendo el periodo de facturación vigente y
            los plazos de conservación fiscal aplicables. Para más detalles, consulta la política de privacidad de
            Paddle en{" "}
            <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              paddle.com/legal/privacy
            </a>{" "}
            y sus{" "}
            <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              términos para compradores
            </a>.
          </p>
          <p><strong>3.6. Ejercicio de derechos sobre tus datos de pago</strong></p>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión u oposición sobre los datos directamente
            gestionados por Paddle a través de su portal de cliente (accesible desde el enlace de gestión de
            suscripción dentro del Hub Premium) o contactando con Paddle en{" "}
            <a href="https://www.paddle.com/help" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              paddle.com/help
            </a>.
            Para cualquier cuestión relacionada con el acceso a contenido Premium, sigue siendo válido el
            contacto con ElectroLab Pro en{" "}
            <a href="mailto:contacto@electrolabpro.com" className="text-primary underline hover:text-primary/80">contacto@electrolabpro.com</a>.
          </p>
        </Section>

        <Section icon={<Eye className="w-5 h-5 text-primary" />} title="4. Destinatarios y encargados del tratamiento">
          <p>Tus datos pueden ser tratados por los siguientes proveedores, todos ellos sujetos a contratos de tratamiento de datos:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Paddle</strong> — procesamiento de pagos, suscripciones, facturación y cumplimiento fiscal.</li>
            <li><strong>Supabase</strong> (Lovable Cloud) — alojamiento de la base de datos, autenticación y funciones de backend.</li>
            <li><strong>Resend</strong> — envío de correos transaccionales y notificaciones de contenido.</li>
            <li><strong>Google Analytics y Google AdSense</strong> — analítica y publicidad personalizada (sujeto al consentimiento de cookies). ID de editor: <strong>pub-9393284878747603</strong>.</li>
            <li><strong>Programa de Afiliados de Amazon</strong> — seguimiento de clics en enlaces de afiliado (ID: <strong>electrolabp0c-21</strong>).</li>
            <li>Autoridades públicas cuando exista obligación legal de comunicación.</li>
          </ul>
        </Section>

        <Section icon={<Globe className="w-5 h-5 text-primary" />} title="5. Transferencias internacionales">
          <p>
            Algunos de los proveedores anteriores están ubicados fuera del Espacio Económico Europeo
            (principalmente EE. UU. y Reino Unido). Cuando esto ocurre, las transferencias se amparan
            en las <strong>Cláusulas Contractuales Tipo</strong> aprobadas por la Comisión Europea o en
            decisiones de adecuación (p. ej. el marco UE-EE. UU. de Privacidad de Datos).
          </p>
        </Section>

        <Section icon={<Clock className="w-5 h-5 text-primary" />} title="6. Plazos de conservación">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Datos de cuenta:</strong> mientras la cuenta permanezca activa. Tras su cancelación, se eliminan en un plazo máximo de 30 días, salvo obligación legal de conservación.</li>
            <li><strong>Datos de facturación y suscripción:</strong> 6 años desde el final de la relación contractual, conforme a las obligaciones mercantiles y fiscales aplicables.</li>
            <li><strong>Comunicaciones por correo o contacto:</strong> hasta 2 años desde el último intercambio.</li>
            <li><strong>Logs técnicos y de seguridad:</strong> hasta 12 meses.</li>
            <li><strong>Cookies analíticas y publicitarias:</strong> según el plazo declarado por cada proveedor (máx. 24 meses) o hasta que retires el consentimiento.</li>
          </ul>
        </Section>

        <Section icon={<UserCheck className="w-5 h-5 text-primary" />} title="7. Tus derechos (RGPD)">
          <p>Puedes ejercer en cualquier momento los siguientes derechos escribiendo a <a href="mailto:contacto@electrolabpro.com" className="text-primary underline hover:text-primary/80">contacto@electrolabpro.com</a>:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Acceso a tus datos personales.</li>
            <li>Rectificación de datos inexactos.</li>
            <li>Supresión ("derecho al olvido").</li>
            <li>Limitación del tratamiento.</li>
            <li>Portabilidad de los datos que nos hayas facilitado.</li>
            <li>Oposición al tratamiento basado en interés legítimo.</li>
            <li>Retirada del consentimiento (cookies, notificaciones) sin efecto retroactivo.</li>
            <li>Presentar una reclamación ante la <strong>Agencia Española de Protección de Datos</strong> (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">aepd.es</a>).</li>
          </ul>
          <p>Responderemos a tu solicitud en un plazo máximo de 1 mes.</p>
        </Section>

        <Section icon={<Lock className="w-5 h-5 text-primary" />} title="8. Medidas de seguridad">
          <p>
            Aplicamos medidas técnicas y organizativas razonables: cifrado TLS en todas las comunicaciones,
            cifrado en reposo de la base de datos, autenticación con contraseñas <em>hash</em>, políticas
            de acceso por filas (RLS) en backend, registro de auditoría de accesos y principio de mínimo
            privilegio para las claves de servicio.
          </p>
        </Section>

        <Section icon={<Cookie className="w-5 h-5 text-primary" />} title="9. Cookies, Google AdSense y cookie DART">
          <p>
            Utilizamos cookies esenciales (necesarias para el funcionamiento del sitio), analíticas y publicitarias.
            Google, como proveedor de terceros, utiliza la cookie <strong>DART</strong> para publicar anuncios
            basados en tu visita a este y otros sitios. Puedes gestionar tus preferencias en el banner de cookies
            o desactivar la publicidad personalizada en{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Configuración de anuncios de Google
            </a>{" "}
            y en la{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              política de anuncios de Google
            </a>.
          </p>
        </Section>

        <Section icon={<Cookie className="w-5 h-5 text-primary" />} title="10. Programa de Afiliados de Amazon">
          <p>
            ElectroLab Pro participa en el Programa de Afiliados de Amazon Services LLC. Recibimos una pequeña
            comisión por las compras elegibles realizadas a través de nuestros enlaces (ID de seguimiento:{" "}
            <strong>electrolabp0c-21</strong>), sin coste adicional para el usuario.
          </p>
        </Section>

        <Section icon={<Mail className="w-5 h-5 text-primary" />} title="11. Contacto y cambios en esta política">
          <p>
            Responsable del tratamiento: <strong>J.A. Sánchez</strong> · ElectroLab Pro ·{" "}
            <a href="mailto:contacto@electrolabpro.com" className="text-primary underline hover:text-primary/80">contacto@electrolabpro.com</a>{" "}
            ·{" "}
            <Link to="/contacto" className="text-primary underline hover:text-primary/80">página de contacto</Link>.
          </p>
          <p>
            Si actualizamos materialmente esta política, te avisaremos por correo o mediante un aviso destacado
            en el sitio antes de que los cambios entren en vigor.
          </p>
        </Section>
      </div>

      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">J.A. Sánchez</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-4 mb-3">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Privacidad</Link>
            <span className="text-muted-foreground/70 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Aviso Legal</Link>
            <span className="text-muted-foreground/70 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Contacto</Link>
            <span className="text-muted-foreground/70 text-[10px]">|</span>
            <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Sobre Nosotros</Link>
            <span className="text-muted-foreground/70 text-[10px]">|</span>
            <Link to="/terminos-y-condiciones" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Términos</Link>
            <span className="text-muted-foreground/70 text-[10px]">|</span>
            <Link to="/politica-reembolsos" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-primary hover:underline transition-colors min-h-[36px] flex items-center">Reembolsos</Link>
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
    <div className="text-muted-foreground leading-relaxed space-y-3 pl-7">
      {children}
    </div>
  </section>
);

export default PrivacyPolicy;
