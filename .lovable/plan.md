## Objetivo

Eliminar el cartel persistente de "Anuncio no disponible" y dejar el sistema de anuncios más robusto, con diagnóstico real y slots correctos por formato.

## Pasos (en orden)

### 1. Verificar estado real en producción
- Abrir `https://electrolabpro.com/?debug=ads` y revisar el overlay de diagnóstico que ya existe en `AdBanner.tsx` (estados `loading` / `filled` / `timeout` / `blocked`).
- Confirmar si el problema es: dominio no aprobado, AdBlock, unfilled real, o slot mal configurado.
- Entregable: reporte breve por cada slot (`3756475501` y demás) con el estado observado.

### 2. Separar slots por formato
Hoy `3756475501` se reusa como vertical (sidebar) y como auto/horizontal (calculadoras, inline). AdSense lo crea con un formato fijo y devuelve `unfilled` si no coincide.

- Definir 3 constantes de slot en un único archivo `src/config/adsense.ts`:
  - `AD_SLOT_HEADER` (horizontal, 970x90 / responsive)
  - `AD_SLOT_SIDEBAR` (vertical, 160x600)
  - `AD_SLOT_INLINE`  (auto / in-article)
- Reemplazar los usos hardcodeados en:
  - `src/components/SidebarAd.tsx`
  - `src/components/AdSenseSlot.tsx` (cuando se llama sin slot explícito)
  - `src/components/CapacitiveReactanceCalculator.tsx` y resto de calculadoras que tengan `<AdBanner slot="3756475501" />`
- Por ahora los 3 IDs apuntan al mismo `3756475501` como placeholder; el usuario los reemplaza luego con los IDs reales generados en AdSense → Anuncios → Por unidad.

### 3. Suavizar el fallback visual
En `AdBanner.tsx`, cuando el estado sea `timeout` / `blocked` / `error`:

- Opción A (recomendada): **colapsar la caja entera** (sin altura mínima, sin borde, sin texto) para que no quede el cartel "Anuncio no disponible" visible.
- Mantener el overlay de diagnóstico solo cuando `?debug=ads` esté activo.
- Quitar el `<Link>` de "Volver al inicio" del fallback (ruido visual innecesario en producción).

### 4. Subir el timeout de detección
En `AdBanner.tsx`:

- Cambiar el `setTimeout` de **6000 ms → 12000 ms** para reducir falsos negativos en conexiones lentas o cuando AdSense tarda en responder con `data-ad-status`.
- Mantener el `MutationObserver` que ya marca `filled` apenas llega el anuncio.

## Detalles técnicos

- Archivos tocados: `src/components/AdBanner.tsx`, `src/components/SidebarAd.tsx`, `src/components/AdSenseSlot.tsx`, calculadoras con slot hardcodeado, nuevo `src/config/adsense.ts`.
- No se tocan: `public/ads.txt`, IDs de Analytics, script de AdSense en `index.html`, ni el patrón `.tool-interactive`.
- Sin cambios de diseño ni de rutas. Sin migraciones de DB.
- Respeta la memoria: dominio `electrolabpro.com`, no alterar tracking IDs, no romper calculadoras.

## Fuera de alcance

- Crear los slots reales en la cuenta de AdSense (lo hace el usuario y me pasa los IDs).
- Cambios en el CMP de cookies o en el script global de AdSense.
