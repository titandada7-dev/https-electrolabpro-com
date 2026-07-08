# Suite E2E — Modales, teclado y calculadora de resistencias

Este documento describe la suite E2E de ElectroLabPro, cómo se integra en CI
y cómo interpretar sus reportes.

## Stack elegido

- **Vitest** (`jsdom`) + **@testing-library/react** + **@testing-library/jest-dom**.
- No usamos Playwright: el 100% de los flujos cubiertos son de UI declarativa
  (React SPA sin backend en las páginas testeadas), por lo que ejecutar
  Testing Library sobre `jsdom` es más rápido, determinista y suficiente
  para validar accesibilidad, foco, eventos de teclado y cálculos.
- Radix UI (usado por `Dialog`) implementa su `FocusScope` sobre APIs DOM
  estándar que `jsdom` soporta, por lo que los tests de _focus trap_ y de
  cierre con `Escape` reflejan el comportamiento real de producción.

## Ficheros que componen la suite

| Fichero | Cubre |
| --- | --- |
| `src/components/ColorBandCalculator.test.tsx` | Cálculos con 4 y 5 bandas, tolerancias, multiplicadores (kΩ, MΩ, ×0.1). |
| `src/components/ColorBandCalculator.keyboard.test.tsx` | Todos los controles son `<button>` nativos, alcanzables por foco, con `ring` visible y activables con Enter/Space. |
| `src/components/ColorBandCalculator.edge.test.tsx` | Casos límite: 0 Ω, GΩ, sub-ohm (mΩ), transición 5→4 bandas, ausencia de variante de 3 bandas. |
| `src/components/ComponentDictionary.test.tsx` | Apertura del modal, _focus trap_ dentro del diálogo, cierre con `Escape` **y** con el botón X, y validación de los enlaces de Amazon (afiliado `electrolabp0c-21`, `target=_blank`, `rel` con `noopener noreferrer`). |

## Cómo se ejecuta en CI

En `.github/workflows/ci.yml` hay dos pasos de test:

1. **Test (report)** — ejecuta toda la suite Vitest y publica `reports/test-results.junit.xml`.
2. **E2E suite (modals + keyboard + calculator)** — ejecuta explícitamente
   los cuatro ficheros anteriores y publica un reporte independiente en
   `reports/e2e/`.

El build **falla** si cualquiera de los dos pasos falla (`steps.e2e.outcome == 'failure'`).
Ambos reportes se suben como artifacts:

- `lint-test-reports` — Vitest completo.
- `e2e-report` — solo la suite E2E (JUnit + JSON + salida tal cual).

## Cómo ejecutar la suite localmente

```bash
# Toda la suite
bunx vitest run

# Solo E2E
bunx vitest run \
  src/components/ColorBandCalculator.test.tsx \
  src/components/ColorBandCalculator.keyboard.test.tsx \
  src/components/ColorBandCalculator.edge.test.tsx \
  src/components/ComponentDictionary.test.tsx
```

## Convenciones al añadir nuevos tests E2E

- Un fichero por componente/flujo, sufijo `.test.tsx`.
- Usar selectores accesibles (`getByRole`, `getByLabelText`) — nunca `data-testid`
  salvo que no exista alternativa semántica.
- Verificar comportamiento **observable por el usuario** (texto renderizado,
  foco activo, atributos ARIA), no detalles de implementación.
- Los enlaces externos deben validar siempre `target="_blank"` **y**
  `rel` con `noopener noreferrer` (mitigación de tabnabbing).
- Los modales deben validar apertura, _focus trap_ y **al menos** dos vías
  de cierre (Escape + botón).
