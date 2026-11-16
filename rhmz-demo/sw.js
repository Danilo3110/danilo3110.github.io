/* RHMZ demo app shell. Scope is restricted to /rhmz-demo/. */
const CACHE = 'rhmz-shell-34f37ff2af08357f';
const BASE = "/rhmz-demo/";
const ASSETS = ["/rhmz-demo/","/rhmz-demo/assets/About-Bx4Ule97.js","/rhmz-demo/assets/ContentLink-BL2tTKH-.js","/rhmz-demo/assets/ContentPage-DMEXFRDo.js","/rhmz-demo/assets/Directory-ClLW7Ixg.js","/rhmz-demo/assets/DocumentPage-D351Ansd.js","/rhmz-demo/assets/Forecast-DYh01JRV.js","/rhmz-demo/assets/HydroStation-BKRjOWkb.js","/rhmz-demo/assets/Hydrology-D0Mdm9UQ.js","/rhmz-demo/assets/Leadership-DgQrx6yY.js","/rhmz-demo/assets/News-BXu6vWDt.js","/rhmz-demo/assets/Observations-BmKxIxC2.js","/rhmz-demo/assets/Portal-DZliCIyR.js","/rhmz-demo/assets/ProductLinks-Br-qwVTi.js","/rhmz-demo/assets/Products-i7Ommlrf.js","/rhmz-demo/assets/Projects-CckDbf7O.js","/rhmz-demo/assets/Search-nks0OlOk.js","/rhmz-demo/assets/Services-B3Mo6UF9.js","/rhmz-demo/assets/Shared-DmpL3Dvl.js","/rhmz-demo/assets/Warnings-BCkOh_w3.js","/rhmz-demo/assets/WaterChart-BEVGtz3V.js","/rhmz-demo/assets/content-Do7XVik7.js","/rhmz-demo/assets/content-catalogue-C0dAHWIA.js","/rhmz-demo/assets/directory-DkXdghW6.js","/rhmz-demo/assets/index-DOs_621G.css","/rhmz-demo/assets/index-Qv0MJfUl.js","/rhmz-demo/assets/iso-e5_0sTI7.js","/rhmz-demo/assets/manrope-cyrillic-wght-normal-Dvxsihut.woff2","/rhmz-demo/assets/manrope-greek-wght-normal-DL7QRZyv.woff2","/rhmz-demo/assets/manrope-latin-ext-wght-normal-Ch3YOpNY.woff2","/rhmz-demo/assets/manrope-latin-wght-normal-DHIcAJRg.woff2","/rhmz-demo/assets/manrope-vietnamese-wght-normal-usUDDRr7.woff2","/rhmz-demo/assets/portal-DNYWoueQ.js","/rhmz-demo/icons/apple-touch-icon.png","/rhmz-demo/icons/icon-192.png","/rhmz-demo/icons/icon-512.png","/rhmz-demo/icons/maskable-512.png","/rhmz-demo/index.html","/rhmz-demo/licenses/manrope.txt","/rhmz-demo/manifest.webmanifest","/rhmz-demo/rhmz-logo.png","/rhmz-demo/serbia-flag.png"];
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
