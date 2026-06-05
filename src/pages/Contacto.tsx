import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Zap, ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/use-page-meta";
import AdBanner from "@/components/AdBanner";

const Contacto = () => {
  usePageMeta({
    title: "Contacto | ElectroLab Pro",
    description: "¿Tienes dudas sobre electrónica o sugerencias? Contacta con ElectroLab Pro a través de nuestro formulario o correo electrónico. Te respondemos lo antes posible.",
  });
  const [formData, setFormData] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.asunto.trim() || !formData.mensaje.trim()) {
      toast({ title: "Error", description: "Por favor completa todos los campos.", variant: "destructive" });
      return;
    }
    setSending(true);
    const mailtoLink = `mailto:titandada7@gmail.com?subject=${encodeURIComponent(formData.asunto)}&body=${encodeURIComponent(`Nombre: ${formData.nombre}\nEmail: ${formData.email}\n\n${formData.mensaje}`)}`;
    window.open(mailtoLink, "_blank");
    setSending(false);
    toast({ title: "¡Gracias!", description: "Se ha abierto tu cliente de correo para enviar el mensaje." });
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

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
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20" style={{ background: "linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(0 0% 4%) 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]" style={{ background: 'hsl(199 89% 60% / 0.4)' }} />
        <div className="relative container mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            Contacto
          </div>
          <h1 className="text-3xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
            Contacto
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            ¿Tienes dudas, sugerencias o quieres colaborar? Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* AdSense: Header banner */}
      <div className="container mx-auto px-4 pt-6">
        <AdBanner slot={AD_SLOT_INLINE} format="auto" className="min-h-[100px] md:min-h-[120px]" fallbackUrl="/" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Intro text */}
          <div className="p-6 rounded-xl border border-border bg-card/80 backdrop-blur space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Si tienes dudas técnicas, sugerencias para mejorar nuestras calculadoras o consultas comerciales, puedes escribirnos directamente a nuestros correos oficiales:
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <a href="mailto:titandada7@gmail.com" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold">
                <Mail className="w-4 h-4" /> titandada7@gmail.com
              </a>
              <a href="mailto:andresanchez87@live.com.ar" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold">
                <Mail className="w-4 h-4" /> andresanchez87@live.com.ar
              </a>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              También puedes usar el siguiente formulario y te responderemos lo antes posible.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-primary/20 bg-card/80 backdrop-blur space-y-5">
            <h2 className="text-lg font-mono font-bold text-foreground text-center">Formulario de Contacto</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Tu nombre" maxLength={100} value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" maxLength={255} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="asunto">Asunto</Label>
              <Input id="asunto" placeholder="Asunto de tu mensaje" maxLength={200} value={formData.asunto} onChange={(e) => setFormData({ ...formData, asunto: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje</Label>
              <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." maxLength={2000} className="min-h-[120px]" value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} />
            </div>
            <Button type="submit" disabled={sending} className="w-full gap-2">
              <Send className="w-4 h-4" />
              Enviar Mensaje
            </Button>
          </form>

          {/* FAQ */}
          <div className="space-y-4">
            <h2 className="text-xl font-mono font-bold text-foreground text-center">Preguntas Frecuentes</h2>
            <div className="space-y-3">
              {[
                { q: "¿Puedo usar las calculadoras de forma gratuita?", a: "Sí. Todas las herramientas de ElectroLab Pro son completamente gratuitas y siempre lo serán. Nos financiamos a través de publicidad y enlaces de afiliados." },
                { q: "¿Los cálculos son fiables?", a: "Nuestros algoritmos están verificados, pero siempre recomendamos comprobar los valores con un multímetro real antes de montar un circuito. Los cálculos son para fines educativos." },
                { q: "¿Puedo sugerir nuevas funcionalidades?", a: "¡Por supuesto! Envíanos un email con tu idea y la evaluaremos para futuras actualizaciones." },
                { q: "¿Los enlaces de Amazon son de afiliados?", a: "Sí. ElectroLab Pro participa en el Programa de Afiliados de Amazon EU. Al comprar a través de nuestros enlaces, nos ayudas a mantener la plataforma gratuita sin coste adicional para ti." },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-card/60 hover:border-primary/30 transition-all duration-300">
                  <h3 className="font-mono font-bold text-foreground text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm tracking-wide mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            © 2026 ElectroLab Pro | Diseñado y Desarrollado por <span className="font-semibold">José Andrés Sánchez</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/privacidad" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Privacidad</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/aviso-legal" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Aviso Legal</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/contacto" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Contacto</Link>
            <span className="text-muted-foreground/40 text-[10px]">|</span>
            <Link to="/sobre-nosotros" className="text-muted-foreground text-[10px] uppercase tracking-wider hover:text-foreground transition-colors">Sobre Nosotros</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contacto;
