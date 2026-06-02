## Contexto

La página `/guia-multimetro` ya existe con: hero, tabs (Digital/Analógico/Pinza), tarjetas DT830B/AN8008/Fluke 101, tabla de simbología, anatomía interactiva y alertas de seguridad.

El PDF adjunto aporta **contenido nuevo** que aún no está en la página: guías paso a paso de medición. Propongo ampliar la página existente (no recrearla) integrando ese material.

## Cambios en `src/pages/GuiaMultimetro.tsx`

1. **Nueva sección "Cómo medir Voltaje paso a paso"** (después de la simbología)
   - 4 pasos visuales en cards numeradas con iconos Lucide (`Cable`, `RotateCw`, `Gauge`, `GitMerge`):
     1. Conectar cable negro a COM, rojo a VΩmA.
     2. Seleccionar V⎓ (baterías) o V~ (red).
     3. Si es manual, empezar por el rango más alto.
     4. Conectar **en paralelo** sobre los terminales.

2. **Nueva sección "Medir Resistencia (Ω)"** con bloque destacado
   - Regla de oro: circuito **desenergizado** y de preferencia desoldado.
   - Caja visual con el símbolo `OL` explicando "Open Loop / circuito abierto".
   - Icono `PowerOff` + `Sigma`.

3. **Nueva sección "Continuidad y Corriente"** en dos columnas
   - Columna 1 — Chicharra de continuidad: pitido cuando R < 30–50 Ω, ideal para cables rotos o cortocircuitos. Icono `Volume2`.
   - Columna 2 — Amperaje: medir **siempre en serie**, nunca en paralelo. Reforzar con badge de peligro. Icono `AlertTriangle`.

4. **Ajuste del CTA final**: mantener las 3 alertas de seguridad existentes al final, después de las nuevas secciones, como cierre.

## Detalles técnicos

- Reutilizar componentes ya en uso: `Card`, `Alert`, `Badge` de shadcn.
- Mantener el sistema de diseño actual: tokens semánticos (`bg-card`, `text-foreground`, `text-primary`), acentos cian/verde con `text-cyan-400` / `border-cyan-500/30` ya presentes en el archivo.
- Solo iconos de `lucide-react` (añadir `GitMerge`, `PowerOff` al import existente).
- Sin cambios en `App.tsx`, `Home.tsx` ni en rutas — la página ya está enlazada.
- Sin tocar lógica, backend ni SEO meta (ya configurados vía `ArticleLayout`).

## Fuera de alcance

- No se importan imágenes del PDF (son fotos de stock con copyright externo).
- No se modifica el resto del sitio.
