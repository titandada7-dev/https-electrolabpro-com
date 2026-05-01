import "@testing-library/jest-dom";

// Polyfill IntersectionObserver para jsdom (lo usan CalculatorHub y otros).
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error — definimos el global para entornos de test
globalThis.IntersectionObserver = IntersectionObserverMock;
// @ts-expect-error — algunos componentes lo leen desde window
window.IntersectionObserver = IntersectionObserverMock;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
