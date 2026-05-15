## Objetivo
Evitar que los botones y banners fijos en la parte inferior queden ocultos bajo la home-indicator del iPhone u otros dispositivos con notch, usando `env(safe-area-inset-bottom)`.

## Archivos a modificar

1. **`src/components/NavButtons.tsx`** (línea 74) — barra flotante Atrás/Inicio/Adelante.
   - Cambiar `bottom-4` por `style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}`.

2. **`src/components/CookieBanner.tsx`** (línea 25) — banner GDPR `fixed bottom-0`.
   - Añadir `style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}` al contenedor (o ajustar el padding existente sumando la safe-area).

3. **`src/components/PWAInstallPrompt.tsx`** (línea 50) — prompt de instalación PWA `bottom-4`.
   - Misma técnica: `style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}`.

4. **`index.html`** — verificar que el `<meta name="viewport">` incluya `viewport-fit=cover`. Si no, añadirlo; sin esto, `env(safe-area-inset-*)` siempre devuelve `0` en iOS.

## Fuera de alcance
- `DomainDebugBanner.tsx`: solo se carga en hosts de preview de Lovable, no necesita ajuste para producción.
- Toasts (`ui/toast.tsx`) y drawer (`ui/drawer.tsx`): componentes shadcn estándar; no se tocan salvo que se reporte un problema.

## Verificación
- Abrir la preview en viewport móvil (iPhone) y comprobar que los tres elementos quedan por encima de la zona segura.
