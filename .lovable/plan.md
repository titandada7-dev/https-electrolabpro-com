## Diagnóstico

Las clases que se aplicaron en el turno anterior rompieron el navbar:

- `<nav>` recibió `px-[147px] py-[95px]` → barra de ~190 px de alto y márgenes laterales gigantes que en mobile sacan el contenido fuera de pantalla.
- Cada link recibió `px-[72px]` → 144 px de padding horizontal por enlace, lo que hace que la fila no entre ni en desktop 1359 px.
- `<header>` recibió combinaciones contradictorias (`px-0 py-0` + `pr-[11px] pb-[10px] mr-[2px] mb-px`) que solo agregan ruido sin aportar diseño.
- El dropdown de "Artículos" sigue con `w-56` y `left-0`, así que con los nuevos paddings se desborda por la derecha en pantallas chicas.

## Objetivo

Unificar paddings/márgenes del navbar a valores razonables, alineados con el patrón limpio del proyecto (memoria *Navbar Rules* + *Clean Engineering Style*), y arreglar el dropdown para que no se salga del viewport.

## Cambios propuestos

### 1. `<header>` (Home.tsx línea 265)
Volver al estilo original limpio, sin paddings/márgenes residuales:
```
sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl
```

### 2. `<nav>` contenedor (línea 266)
Usar padding responsive estándar en lugar de los 147/95 px absolutos:
```
container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5
```

### 3. Wrapper de links desktop (línea 275)
Quitar `mx-0` redundante:
```
hidden items-center gap-5 md:flex
```

### 4. Enlaces del menú (líneas 276-281, 283, 297-299)
Unificar a un padding pequeño y consistente, sin `px-[72px]`. El espaciado entre items ya lo da `gap-5` del wrapper:
```
text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md
```
Aplicar exactamente la misma clase a los 9 links + al `<button>` de "Artículos" para alineación uniforme.

### 5. Dropdown "Artículos" (línea 286)
Para que no se desborde en pantallas medianas:
- Cambiar `left-0` por `right-0` (ancla a la derecha del trigger, que está más cerca del centro/derecha del navbar).
- Mantener `w-56 max-h-[70vh] overflow-y-auto` que ya estaba bien.

### 6. Verificación
Tras aplicar los cambios, capturar screenshot del navbar en desktop (1359 px, viewport actual) y mobile (375 px) para confirmar:
- Logo + links + botones caben en una línea en desktop.
- En mobile el menú desktop se oculta correctamente (`md:flex`) y solo queda el logo.
- El dropdown de Artículos no desborda por la derecha al hacer hover.

## Archivos a modificar
- `src/pages/Home.tsx` (líneas 265–299, solo clases CSS)

## Sin cambios
- Lógica de navegación, handlers, rutas, estructura DOM.
- Otros componentes (`DocumentacionTecnica.tsx` mantiene su header propio).
