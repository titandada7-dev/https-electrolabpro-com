import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircuitBoard, Zap, Target, Lightbulb, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeDetailsProps {
  scrollTo: (id: string) => void;
}

const HomeDetails = ({ scrollTo }: HomeDetailsProps) => {
  return (
    <section id="detalles" className="py-14 sm:py-20 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
          Aprende <span className="text-gradient-primary">Electrónica</span>
        </h2>

        <Accordion type="multiple" defaultValue={["intro"]} className="space-y-4">
          {/* Acordeón: ¿Qué es ElectroLabPro? */}
          <AccordionItem value="intro" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <CircuitBoard className="h-5 w-5 text-primary shrink-0" />
                ¿Qué es ElectroLabPro?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-5 pb-6">
              <p>
                <strong className="text-foreground">ElectroLabPro</strong> es una plataforma diseñada para estudiantes, técnicos y aficionados a la electrónica. Aquí podés encontrar herramientas interactivas, calculadoras verificadas y guías técnicas con contenido educativo de calidad.
              </p>
              <p>
                Nuestro objetivo es simplificar los cálculos y ayudarte a comprender mejor los conceptos fundamentales de la electrónica, con ejemplos claros y fáciles de aplicar en la práctica.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Acordeón: ¿Qué es la Ley de Ohm? */}
          <AccordionItem value="ley-ohm" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary shrink-0" />
                ¿Qué es la Ley de Ohm?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-5 pb-6">
              <p>
                La ley de Ohm es una de las bases de la electrónica. Relaciona el voltaje (V), la corriente (I) y la resistencia (R) mediante la fórmula:
              </p>
              <p className="text-center">
                <code className="px-4 py-2 rounded-lg bg-accent text-foreground font-mono text-lg font-bold">V = I × R</code>
              </p>
              <p>
                Esto significa que si conocés dos de estos valores, podés calcular el tercero fácilmente usando nuestras herramientas.
              </p>
              <div className="text-center pt-2">
                <Button variant="outline" className="gap-2" onClick={() => scrollTo("calculadora")}>
                  <Calculator className="h-4 w-4" /> Ir a la calculadora de Ley de Ohm
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Acordeón: ¿Cómo usar las calculadoras? */}
          <AccordionItem value="como-usar" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary shrink-0" />
                ¿Cómo usar las calculadoras?
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                {[
                  { step: "1", title: "Ingresá los valores conocidos", desc: "Completá los campos con voltaje, corriente o resistencia según lo que tengas disponible.", icon: <Target className="h-6 w-6" /> },
                  { step: "2", title: "Seleccioná la opción de cálculo", desc: "Elegí qué querés calcular: la calculadora detecta automáticamente el valor faltante.", icon: <Zap className="h-6 w-6" /> },
                  { step: "3", title: "Obtené el resultado automáticamente", desc: "Las calculadoras están diseñadas para ser rápidas, precisas y fáciles de usar.", icon: <Lightbulb className="h-6 w-6" /> },
                ].map((item) => (
                  <div key={item.step} className="relative rounded-2xl border border-border bg-accent/30 p-7 text-center">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md">
                      {item.step}
                    </div>
                    <div className="flex justify-center mb-4 mt-2 text-primary">{item.icon}</div>
                    <h3 className="font-semibold text-foreground text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Acordeón: Ejemplo práctico */}
          <AccordionItem value="ejemplo" className="rounded-2xl border border-primary/20 bg-primary/5 shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-primary shrink-0" />
                Ejemplo práctico: LED con fuente de 12V
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4 pb-6">
              <p>
                Si tenés una fuente de <strong className="text-foreground">12V</strong> y querés conectar un LED que trabaja a <strong className="text-foreground">2V</strong> con una corriente de 20mA, necesitás calcular la resistencia en serie.
              </p>
              <p>
                Con nuestra calculadora podés hacerlo en segundos y evitar errores que puedan dañar tus componentes.
              </p>
              <div className="text-center pt-2">
                <Button size="lg" className="gap-2" onClick={() => scrollTo("calculadora")}>
                  Probalo ahora →
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Acordeón: Electrónica básica */}
          <AccordionItem value="seo-basica" className="rounded-2xl border border-border bg-card shadow-sm px-6 overflow-hidden">
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
              <span className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-primary shrink-0" />
                Electrónica básica: todo lo que necesitás saber
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed space-y-5 pb-6">
              <p>
                La <strong className="text-foreground">electrónica básica</strong> es el estudio de los circuitos eléctricos y los componentes que los conforman. Todo circuito electrónico tiene tres elementos fundamentales: voltaje, corriente y resistencia.
              </p>
              <p>
                Entre los conceptos más importantes están: la <strong className="text-foreground">Ley de Ohm</strong> (que relaciona voltaje, corriente y resistencia), las <strong className="text-foreground">leyes de Kirchhoff</strong> (para análisis de circuitos) y la <strong className="text-foreground">potencia</strong> (medida en watts).
              </p>
              <p>
                Si estás empezando, te recomendamos explorar nuestras guías sobre <Link to="/articulos/ley-de-ohm" className="text-primary hover:underline font-medium">Ley de Ohm</Link>, <Link to="/articulos/codigo-colores-resistencias" className="text-primary hover:underline font-medium">Código de colores</Link> y <Link to="/articulos/multimetro" className="text-primary hover:underline font-medium">cómo usar un multímetro</Link>.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

import { Calculator } from "lucide-react";
export default HomeDetails;
