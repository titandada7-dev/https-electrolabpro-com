## Objetivo
Deshabilitar los botones "Atrás" y "Adelante" del `NavButtons` global cuando no haya historial disponible, para evitar clics que no llevan a ningún lado.

## Problema
React Router (v6) y la History API del navegador **no exponen directamente** si hay entradas anteriores o siguientes en el stack. Hay que rastrearlo manualmente.

## Enfoque
Mantener un contador de posición dentro del historial de la sesión usando `history.state` + un índice propio:

1. Al montar `NavButtons`, leer/inicializar un índice en `window.history.state` (ej: `{ idx: 0 }`).
2. Escuchar cambios de ruta con `useLocation()`:
   - Si es navegación nueva (PUSH) → incrementar índice y conocer el "tope".
   - Si es POP (atrás/adelante) → leer el índice del nuevo `history.state`.
3. Guardar en estado React: `canGoBack = idx > 0` y `canGoForward = idx < maxIdx`.
4. Aplicar `disabled` + estilos (`opacity-50 cursor-not-allowed`) a los botones cuando no aplique. Botón "Inicio" siempre activo.

## Detalles técnicos
- Usar `useNavigationType()` de `react-router-dom` para distinguir PUSH / POP / REPLACE.
- Mantener `maxIdx` en un `useRef` para no perderlo entre renders.
- Tras un PUSH nuevo, `maxIdx = idx` (se trunca el "adelante" como hace el navegador).
- Limitación conocida: si el usuario entra directo a una URL profunda, el índice arranca en 0 y "Atrás" quedará deshabilitado hasta que navegue. Es el comportamiento correcto (no hay historial real dentro de la app).
- Accesibilidad: usar atributo `disabled` real + `aria-disabled="true"` para lectores de pantalla.

## Archivos a modificar
- `src/components/NavButtons.tsx` — añadir lógica de tracking de historial y estado `disabled` en los botones Atrás/Adelante.

## Sin cambios
- `src/App.tsx` y el resto del sitio quedan igual.
- No se cambian estilos base ni la posición del componente.
