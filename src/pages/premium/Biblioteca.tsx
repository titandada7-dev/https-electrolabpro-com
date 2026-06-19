import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookMarked, Search, ExternalLink, FileText, Wrench } from "lucide-react";
import PremiumGate from "@/components/PremiumGate";
import { useMarkPremiumVisited } from "@/hooks/usePremiumProgress";

type Item = {
  kind: "datasheet" | "proyecto";
  title: string;
  desc: string;
  tags: string[];
  url: string;
};

const ITEMS: Item[] = [
  { kind: "datasheet", title: "NE555 — Timer", desc: "Pinout, modos astable/monoestable y fórmulas de tiempos.", tags: ["555", "timer", "oscilador"], url: "https://www.ti.com/lit/ds/symlink/ne555.pdf" },
  { kind: "datasheet", title: "LM317 — Regulador ajustable", desc: "Vout = 1.25·(1+R2/R1). Corriente hasta 1.5A.", tags: ["regulador", "fuente"], url: "https://www.ti.com/lit/ds/symlink/lm317.pdf" },
  { kind: "datasheet", title: "ATmega328P (Arduino UNO)", desc: "MCU AVR de 8 bits, 32 KB Flash. Pinout completo.", tags: ["arduino", "mcu"], url: "https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf" },
  { kind: "datasheet", title: "L298N — Driver dual H-bridge", desc: "Control de motores DC y paso a paso, hasta 2A por canal.", tags: ["motor", "driver"], url: "https://www.st.com/resource/en/datasheet/l298.pdf" },
  { kind: "datasheet", title: "2N2222 — Transistor NPN", desc: "Pequeña señal, Ic=800mA. Conmutación y amplificación.", tags: ["transistor", "npn"], url: "https://www.onsemi.com/pdf/datasheet/p2n2222a-d.pdf" },
  { kind: "datasheet", title: "BC547 — NPN propósito general", desc: "Beta típico 200, Ic=100mA.", tags: ["transistor", "audio"], url: "https://www.onsemi.com/pdf/datasheet/bc546-d.pdf" },
  { kind: "datasheet", title: "LM358 — OpAmp dual", desc: "Operacional dual de propósito general, alimentación simple.", tags: ["opamp", "amplificador"], url: "https://www.ti.com/lit/ds/symlink/lm358.pdf" },
  { kind: "proyecto", title: "Fuente regulable 1.25–25V con LM317", desc: "Esquemático, BOM y PCB para una fuente de banco básica.", tags: ["fuente", "lm317", "laboratorio"], url: "https://www.electronics-tutorials.ws/blog/variable-voltage-power-supply.html" },
  { kind: "proyecto", title: "Sensor de temperatura con NTC y Arduino", desc: "Lectura, linealización Steinhart–Hart y display OLED.", tags: ["arduino", "sensor", "ntc"], url: "https://learn.adafruit.com/thermistor" },
  { kind: "proyecto", title: "Detector de presencia con PIR + relé", desc: "Activación de carga AC con aislamiento por optoacoplador.", tags: ["pir", "relé", "domotica"], url: "https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor" },
  { kind: "proyecto", title: "Amplificador clase A con BJT", desc: "Diseño paso a paso del punto de operación y ganancia.", tags: ["audio", "bjt", "amplificador"], url: "https://www.electronics-tutorials.ws/amplifier/amp_5.html" },
  { kind: "proyecto", title: "Inversor 12V→220V cuadrada con 555", desc: "Inversor didáctico de baja potencia con transformador.", tags: ["inversor", "555", "transformador"], url: "https://www.electroschematics.com/inverter-circuit/" },
];

function Library() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "datasheet" | "proyecto">("all");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ITEMS.filter((it) => {
      if (filter !== "all" && it.kind !== filter) return false;
      if (!term) return true;
      return (
        it.title.toLowerCase().includes(term) ||
        it.desc.toLowerCase().includes(term) ||
        it.tags.some((t) => t.includes(term))
      );
    });
  }, [q, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, tag (ej: arduino, 555, opamp)…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "datasheet", "proyecto"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f === "all" ? "Todo" : f === "datasheet" ? "Datasheets" : "Proyectos"}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((it) => {
          const Icon = it.kind === "datasheet" ? FileText : Wrench;
          return (
            <Card key={it.url} className="p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {it.kind === "datasheet" ? "Datasheet" : "Proyecto"}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{it.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 flex-1">{it.desc}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {it.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">#{t}</span>
                ))}
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={it.url} target="_blank" rel="noopener noreferrer">
                  Abrir <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </a>
              </Button>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-2 text-center py-8">
            Sin resultados para “{q}”.
          </p>
        )}
      </div>
    </div>
  );
}

export default function Biblioteca() {
  useMarkPremiumVisited("biblioteca");
  useEffect(() => {
    document.title = "Biblioteca técnica · Premium · ElectroLab Pro";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PremiumGate
        title="Biblioteca de datasheets y proyectos"
        intro="Colección curada de hojas de datos y proyectos paso a paso para tener todo a mano cuando estés diseñando o reparando."
        bullets={[
          "Datasheets clave: 555, LM317, ATmega328P, L298N, LM358, BC547…",
          "Proyectos con esquemático y BOM listos para armar",
          "Buscador por nombre y tags (arduino, sensor, opamp…)",
          "Se actualiza cada mes con nuevo material",
        ]}
        preview={
          <div className="p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {ITEMS.slice(0, 4).map((it) => (
                <Card key={it.url} className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookMarked className="h-4 w-4 text-primary" />
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{it.kind}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{it.title}</h3>
                  <p className="text-sm text-muted-foreground">{it.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        }
      >
        <div className="container mx-auto max-w-5xl px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Biblioteca técnica</h1>
          <p className="text-muted-foreground mb-8">{ITEMS.length} recursos curados · acceso Premium</p>
          <Library />
        </div>
      </PremiumGate>
    </div>
  );
}
