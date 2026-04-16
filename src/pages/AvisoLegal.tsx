import { Zap, ArrowLeft, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";

const AvisoLegal = () => {
  usePageMeta({
    title: "Aviso Legal | ElectroLab Pro",
    description: "Aviso legal de ElectroLab Pro: condiciones de uso, propiedad intelectual, enlaces de afiliados de Amazon y limitación de responsabilidad.",
  });
  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary glow-icon" />
            <span className="text-lg md:text-xl font-mono font-bold text-foreground">
              Electro<span className="text-primary">Lab</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)",
        }}
      >
        <div className="relative container mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <Scale className="w-3.5 h-3.5" />
            Documento Legal
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            Aviso Legal
          </h1>
          <p className="text-muted-foreground text-sm">
            Última actualización: 10 de marzo de 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <article className="max-w-3xl mx-auto space-y-8 text-muted-foreground leading-relaxed text-[15px]">
          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">1. Datos identificativos</h2>
            <p>
              En cumplimiento con el deber de información establecido en la normativa vigente, se comunica que el presente sitio web, <strong className="text-foreground">ElectroLab Pro</strong> (en adelante, "el Sitio"), es titularidad de <strong className="text-foreground">J.A. Sanchez</strong>.
            </p>
            <p>
              Correo electrónico de contacto: <Link to="/contacto" className="text-primary hover:underline">ver página de contacto</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">2. Objeto del sitio web</h2>
            <p>
              ElectroLab Pro es una plataforma educativa gratuita orientada a estudiantes, entusiastas e ingenieros de electrónica. Ofrece herramientas de cálculo (calculadora de resistencias, calculadora de Ley de Ohm), un diccionario de componentes electrónicos, artículos educativos y recomendaciones de equipamiento.
            </p>
            <p>
              Los contenidos y herramientas proporcionados tienen carácter exclusivamente <strong className="text-foreground">informativo y educativo</strong>, y no sustituyen el asesoramiento profesional ni la verificación práctica con instrumentos de medición reales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">3. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos del Sitio, incluyendo textos, gráficos, imágenes, diseño, código fuente, logotipos, marcas y demás elementos, son propiedad de J.A. Sanchez o de sus respectivos titulares, y están protegidos por las leyes de propiedad intelectual e industrial aplicables.
            </p>
            <p>
              Queda prohibida la reproducción total o parcial, distribución, comunicación pública, transformación o cualquier otra actividad que se pueda realizar con los contenidos del Sitio sin autorización previa y por escrito del titular.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">4. Exclusión de responsabilidad</h2>
            <p>
              J.A. Sanchez y ElectroLab Pro <strong className="text-foreground">no se hacen responsables</strong> de:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Daños materiales o personales derivados del uso de las calculadoras, datos o recomendaciones proporcionadas en el Sitio.</li>
              <li>La exactitud absoluta de los cálculos realizados por las herramientas. Siempre se debe verificar con un multímetro u otro instrumento de medición adecuado antes de energizar cualquier circuito.</li>
              <li>El contenido de sitios web de terceros enlazados desde ElectroLab Pro.</li>
              <li>La disponibilidad y continuidad del funcionamiento del Sitio.</li>
              <li>Los daños que puedan producirse por virus informáticos o fallos técnicos.</li>
            </ul>
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
              <p className="text-amber-400/90 text-sm font-semibold mb-2">⚠️ Aviso de Seguridad</p>
              <p className="text-sm">
                La electrónica implica riesgos inherentes. Trabajar con voltajes, corrientes y componentes electrónicos puede causar daños personales o materiales si no se toman las precauciones adecuadas. Siempre verifica los valores de los componentes con un multímetro real antes de energizar un circuito.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">5. Programa de Afiliados de Amazon</h2>
            <p>
              ElectroLab Pro participa en el <strong className="text-foreground">Programa de Afiliados de Amazon EU</strong> (ID de seguimiento: electrolabp0c-21), un programa de publicidad para afiliados diseñado para proporcionar a los sitios web un medio para obtener comisiones por publicidad mediante la inserción de enlaces a Amazon.es.
            </p>
            <p>
              Como Afiliado de Amazon, J.A. Sanchez obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. Estos ingresos ayudan a mantener la plataforma gratuita para estudiantes de electrónica.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">6. Publicidad</h2>
            <p>
              El Sitio utiliza <strong className="text-foreground">Google AdSense</strong> (ID de editor: pub-9393284878747603) para mostrar anuncios publicitarios. Google y sus socios pueden utilizar cookies para mostrar anuncios relevantes basados en visitas anteriores al Sitio u otros sitios web. El usuario puede desactivar la publicidad personalizada visitando la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">configuración de anuncios de Google</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">7. Enlaces a terceros</h2>
            <p>
              El Sitio puede contener enlaces a sitios web de terceros (Amazon, fabricantes de componentes, recursos educativos). Estos enlaces se proporcionan como referencia y comodidad para el usuario. J.A. Sanchez no tiene control sobre el contenido de estos sitios externos y no asume responsabilidad alguna por su contenido, políticas de privacidad o prácticas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">8. Legislación aplicable y jurisdicción</h2>
            <p>
              El presente Aviso Legal se rige por la legislación vigente. Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso del Sitio, las partes se someten a la jurisdicción de los juzgados y tribunales competentes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-mono font-bold text-foreground">9. Modificaciones</h2>
            <p>
              J.A. Sanchez se reserva el derecho de modificar en cualquier momento el presente Aviso Legal, siendo responsabilidad del usuario revisarlo periódicamente. El uso continuado del Sitio tras cualquier modificación implicará la aceptación de los nuevos términos.
            </p>
          </section>

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-center">
              ¿Tienes alguna pregunta? Visita nuestra <Link to="/contacto" className="text-primary hover:underline font-semibold">página de contacto</Link>.
            </p>
          </div>
        </article>
      </div>

      {/* Footer */}
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

export default AvisoLegal;
