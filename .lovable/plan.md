## Objetivo
Aplicar las utilidades metálicas ya definidas en `src/index.css` (`text-gradient-primary`, `text-gradient-gold`, `text-gradient-silver`, `card-glow`, `bg-dot-grid`) a los componentes del Home, sin tocar lógica ni romper layouts.

## Archivos a modificar
Componentes en `src/components/sections/` usados por `src/pages/Home.tsx`:

- `HomeHero.tsx`
- `HomeServices.tsx`
- `HomeCalculator.tsx`
- `HomeComponentDict.tsx`
- `HomeTools.tsx`
- `HomeRecentArticles.tsx`
- `HomeEducation.tsx`
- `HomeResources.tsx`
- `HomeStats.tsx`
- `HomeFaq.tsx`
- `HomeDetails.tsx`
- `HomeMiniProjects.tsx` (la card de `MiniProjects` si aplica)
- `HomeFooter.tsx` (solo subtítulos plata si encaja)

Voy a leer cada uno antes de editar para no inventar clases ni cambiar estructura.

## Reglas de asignación (roles fijos)

1. **Títulos H1/H2 destacados** → envolver la palabra clave en `<span className="text-gradient-primary">…</span>`. En `HomeHero` ya existe; lo mantengo y replico el patrón en H2 de Servicios, Calculadora, Diccionario, Herramientas, Educación, Recursos, FAQ, etc.
2. **Tags / badges / pills tipo "NUEVO", "PRO", "Nivel 1/2/3", "Quiz"** → reemplazar `text-primary` por `text-gradient-gold` (y quitar el color sólido del texto sólo en el span del badge). El icono y el fondo del pill se mantienen.
3. **Subtítulos / descripciones cortas bajo el H2** (un solo `<p>` introductorio por sección) → añadir `text-gradient-silver`. No se aplica a párrafos largos de cuerpo ni a `muted-foreground` en listas (evita ilegibilidad).
4. **Cards de artículos y herramientas** (tarjetas en `HomeTools`, `HomeRecentArticles`, `HomeEducation`, `HomeResources`, `HomeServices`):
   - Añadir `card-glow` si no la tienen.
   - Añadir `bg-dot-grid` al contenedor de la card (encima del `bg-card`) para la grilla técnica.
   - Mantener `border border-border` y radios actuales.
5. **Botones primarios** (`<Button>` shadcn con `variant` por defecto) → sin cambios, ya usan `--primary` azul. Verificar que no haya `text-gradient-*` aplicado sobre botones.

## Qué NO se toca
- Lógica, props, imports de datos, rutas, SEO, JSON-LD.
- Componentes interactivos (calculadoras, inputs) — su estilo ya viene de `.tool-interactive`.
- AdSense, AuthorBio, CookieBanner, navegación, footer legal.
- Terminología ("Estación de Soldadura"), contadores de palabras, animaciones (se respeta el límite 0.3s, sin transforms Y en scroll).

## Verificación post-cambio
- Build pasa.
- Inspección visual del Home en preview: H2 con degradado azul, badges en oro, subtítulos plata, cards con grilla de puntos y hover oro+azul.
- Contraste en dark mode legible (los gradientes plata/oro sólo en textos cortos de ≥18px).

## Detalles técnicos
- Los gradientes usan `background-clip: text; color: transparent;` → no combinar con `text-foreground` ni `text-primary` en el mismo elemento; se quita el color sólido cuando se aplica el gradiente.
- `bg-dot-grid` se suma a `bg-card` (el patrón es transparente sobre el fondo de la card).
- `card-glow` ya incluye transición de borde a oro y sombra azul inferior; no añadir `hover:border-primary` redundante.

¿Apruebas para implementar?