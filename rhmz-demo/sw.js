/* RHMZ demo app shell. Scope is restricted to /rhmz-demo/. */
const CACHE = 'rhmz-shell-25d780996e1859f5';
const BASE = "/rhmz-demo/";
const ASSETS = ["/rhmz-demo/","/rhmz-demo/assets/About-DWvl1SO4.js","/rhmz-demo/assets/ContentLink-BJdNZipi.js","/rhmz-demo/assets/ContentPage-BcBGyBpj.js","/rhmz-demo/assets/Directory-Y1a0KtfX.js","/rhmz-demo/assets/DocumentPage-BrIaF1l6.js","/rhmz-demo/assets/Forecast-DrLJbHZd.js","/rhmz-demo/assets/HydroStation-RaOmO_-P.js","/rhmz-demo/assets/Hydrology-DjP8B4pb.js","/rhmz-demo/assets/Leadership-BZ95TDFg.js","/rhmz-demo/assets/News-BJiqDWH6.js","/rhmz-demo/assets/Observations-CxLbDulH.js","/rhmz-demo/assets/Portal-C_cHh0BW.js","/rhmz-demo/assets/ProductLinks-C0Rs10uE.js","/rhmz-demo/assets/Products-lB4FMu-C.js","/rhmz-demo/assets/Projects-Zjb01lx5.js","/rhmz-demo/assets/Search-B5__Mwxs.js","/rhmz-demo/assets/Services-CQaE2aEg.js","/rhmz-demo/assets/Shared-zEW462-C.js","/rhmz-demo/assets/Warnings-BAoMNHVW.js","/rhmz-demo/assets/WaterChart-BZQRjBNN.js","/rhmz-demo/assets/content-CZumAq1j.js","/rhmz-demo/assets/content-catalogue-DqK-Cxwp.js","/rhmz-demo/assets/directory-DkXdghW6.js","/rhmz-demo/assets/index-8GehyoNl.css","/rhmz-demo/assets/index-BsD4aYUd.js","/rhmz-demo/assets/iso-e5_0sTI7.js","/rhmz-demo/assets/manrope-cyrillic-wght-normal-Dvxsihut.woff2","/rhmz-demo/assets/manrope-greek-wght-normal-DL7QRZyv.woff2","/rhmz-demo/assets/manrope-latin-ext-wght-normal-Ch3YOpNY.woff2","/rhmz-demo/assets/manrope-latin-wght-normal-DHIcAJRg.woff2","/rhmz-demo/assets/manrope-vietnamese-wght-normal-usUDDRr7.woff2","/rhmz-demo/assets/portal-DNYWoueQ.js","/rhmz-demo/icons/apple-touch-icon.png","/rhmz-demo/icons/icon-192.png","/rhmz-demo/icons/icon-512.png","/rhmz-demo/icons/maskable-512.png","/rhmz-demo/index.html","/rhmz-demo/licenses/manrope.txt","/rhmz-demo/manifest.webmanifest","/rhmz-demo/rhmz-logo.png","/rhmz-demo/serbia-flag.png"];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((name) => name.startsWith('rhmz-shell-') && name !== CACHE).map((name) => caches.delete(name)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  // The application validates and separately caches data. Never intercept it here.
  if (url.pathname.startsWith(BASE + 'data/') || url.pathname.startsWith(BASE + 'pipeline/')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(async () => (await caches.open(CACHE)).match(BASE + 'index.html')));
    return;
  }
  if (ASSETS.includes(url.pathname)) event.respondWith(caches.open(CACHE).then(async (cache) => (await cache.match(event.request)) || fetch(event.request)));
});
