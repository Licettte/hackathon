import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async () => {
  return {
    plugins: [
      react({
        // примеры полезных SWC-настроек (опционально)
        tsDecorators: true,
        plugins: [['@swc/plugin-styled-components', { displayName: true }]],
      }),
      tsconfigPaths(),
      svgr({ svgrOptions: { ref: true } }),
      checker({ typescript: true }),

      // === PWA ===
      VitePWA({
        registerType: 'autoUpdate',          // автопроверка апдейтов SW
        devOptions: { enabled: true },        // позволяет тестить PWA в dev
        includeAssets: [
          'favicon.svg',
          'robots.txt',
          'apple-touch-icon.png',
          'offline.html',
        ],
        manifest: {
          name: 'My PWA',
          short_name: 'MyPWA',
          description: 'React + TS + Redux Toolkit PWA',
          theme_color: '#111827',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'pwa-512x512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallback: '/index.html',
          navigateFallbackAllowlist: [/^\/$/, /^\/app\//],
          runtimeCaching: [
            // Google Fonts stylesheets
            {
              urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheets',
                expiration: { maxEntries: 20, maxAgeSeconds: 31536000 },
              },
            },
            // Google Fonts webfont files
            {
              urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: { maxEntries: 20, maxAgeSeconds: 31536000 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            // API: NetworkFirst (ждём сеть, иначе кэш)
            {
              urlPattern: ({ url }) =>
                url.origin === self.location.origin && url.pathname.startsWith('/api/'),
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 3,
                expiration: { maxEntries: 50, maxAgeSeconds: 3600 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            // Images
            {
              urlPattern: ({ request }) => request.destination === 'image',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'img-cache',
                expiration: { maxEntries: 100, maxAgeSeconds: 2592000 },
              },
            },
            // Fonts (локальные)
            {
              urlPattern: ({ request, url }) =>
                request.destination === 'font' && url.origin === self.location.origin,
              handler: 'CacheFirst',
              options: {
                cacheName: 'local-fonts',
                cacheableResponse: { statuses: [0, 200] },
                expiration: { maxEntries: 20, maxAgeSeconds: 31536000 },
              },
            },
            // CSS/JS
            {
              urlPattern: ({ request }) =>
                request.destination === 'style' || request.destination === 'script',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-resources',
                expiration: { maxEntries: 100, maxAgeSeconds: 2592000 },
              },
            },
          ],
        },
      }),
    ],

    server: {
      port: 3000,
      open: true,
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '',
        },
      },
    },

    resolve: {
      alias: {
        _helpers: path.resolve(__dirname, 'src/_helpers/'),
        entities: path.resolve(__dirname, 'src/entities'),
        widgets: path.resolve(__dirname, 'src/widgets'),
        features: path.resolve(__dirname, 'src/features'),
        shared: path.resolve(__dirname, 'src/shared'),
        pages: path.resolve(__dirname, 'src/pages'),
      },
    },

    build: {
      outDir: 'build',
    },
  };
});
