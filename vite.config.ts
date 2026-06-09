import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync, existsSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

const buildId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const buildTime = new Date().toISOString();

const versionJsonPlugin = (): Plugin => ({
  name: "electrolab-version-json",
  generateBundle() {
    const payload = JSON.stringify({ buildId, buildTime, name: "electrolab-pro" }, null, 2);
    this.emitFile({ type: "asset", fileName: "version.json", source: payload });
  },
  configureServer(server) {
    server.middlewares.use("/version.json", (_req: IncomingMessage, res: ServerResponse) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-store");
      res.end(JSON.stringify({ buildId, buildTime, name: "electrolab-pro", env: "dev" }));
    });
  },
});

// Salvaguarda: emite sitemap.xml directamente en dist/ aunque el hook
// `prebuild` no se haya ejecutado (algunos entornos de hosting compilan
// sin invocar los scripts npm pre/post).
const sitemapPlugin = (): Plugin => ({
  name: "electrolab-sitemap",
  generateBundle() {
    const sitemapPath = resolvePath("public/sitemap.xml");
    if (!existsSync(sitemapPath)) return;
    const source = readFileSync(sitemapPath, "utf-8");
    this.emitFile({ type: "asset", fileName: "sitemap.xml", source });
  },
});



export default defineConfig(({ mode }) => ({
  define: {
    __BUILD_ID__: JSON.stringify(buildId),
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    versionJsonPlugin(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        navigateFallbackDenylist: [/^\/~oauth/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      includeAssets: ["favicon.ico", "pwa-icon-192.png", "pwa-icon-512.png"],
      manifest: {
        name: "ElectroLab Pro - Innovación y Tecnología Electrónica",
        short_name: "ElectroLab Pro",
        description: "Calculadoras de electrónica, diccionario de componentes y artículos educativos. Tu laboratorio digital.",
        theme_color: "#2563eb",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        lang: "es",
        categories: ["education", "utilities"],
        icons: [
          {
            src: "/pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Sin manualChunks: Rollup gestiona el orden de evaluación de React
        // y evita el bug "Cannot read properties of undefined (reading 'useLayoutEffect')"
        // que aparecía al separar react/react-dom de librerías que dependen de él.
      },
    },
  },
}));
