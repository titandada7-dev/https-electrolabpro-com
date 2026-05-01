import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  /** Optional canonical path or full URL. Defaults to current pathname on electrolabpro.com */
  canonical?: string;
}

const SITE_ORIGIN = "https://electrolabpro.com";

function resolveCanonical(input?: string): string {
  if (input) {
    if (input.startsWith("http")) return input;
    return `${SITE_ORIGIN}${input.startsWith("/") ? input : `/${input}`}`;
  }
  if (typeof window !== "undefined") {
    return `${SITE_ORIGIN}${window.location.pathname}`;
  }
  return SITE_ORIGIN;
}

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    // Canonical link — critical for AdSense / SEO duplicate-content checks
    const href = resolveCanonical(canonical);
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = href;

    // Keep og:url in sync with canonical
    setMeta('meta[property="og:url"]', "property", "og:url", href);
  }, [title, description, canonical]);
}

