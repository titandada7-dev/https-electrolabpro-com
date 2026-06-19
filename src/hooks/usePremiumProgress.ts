import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "elp:premium-visited";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("elp:premium-visited-changed"));
  } catch {
    /* ignore */
  }
}

export function usePremiumProgress() {
  const [visited, setVisited] = useState<string[]>(() => read());

  useEffect(() => {
    const refresh = () => setVisited(read());
    window.addEventListener("storage", refresh);
    window.addEventListener("elp:premium-visited-changed", refresh as EventListener);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("elp:premium-visited-changed", refresh as EventListener);
    };
  }, []);

  const has = useCallback((slug: string) => visited.includes(slug), [visited]);

  const reset = useCallback(() => {
    write([]);
    setVisited([]);
  }, []);

  return { visited, has, reset };
}

export function useMarkPremiumVisited(slug: string) {
  useEffect(() => {
    if (!slug) return;
    const current = read();
    if (!current.includes(slug)) {
      write([...current, slug]);
    }
  }, [slug]);
}
