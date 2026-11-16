/* RHMZ demo app shell. Scope is restricted to /rhmz-demo/. */
const CACHE = 'rhmz-shell-a2d647c83b158036';
const BASE = "/rhmz-demo/";
const ASSETS = ["/rhmz-demo/","/rhmz-demo/assets/About-0K9ZiHI7.js","/rhmz-demo/assets/ContentLink-BGb4NpxC.js","/rhmz-demo/assets/ContentPage-Bq9h3B-L.js","/rhmz-demo/assets/Directory-CQcFl2d4.js","/rhmz-demo/assets/DocumentPage-ClyEEowc.js","/rhmz-demo/assets/Forecast-Btdx9cev.js","/rhmz-demo/assets/HydroStation-DBVRJwyU.js","/rhmz-demo/assets/Hydrology-z3QZRkGH.js","/rhmz-demo/assets/Leadership-BL_ZamsZ.js","/rhmz-demo/assets/News-ByT_dm-1.js","/rhmz-demo/assets/Observations-sFc8kuuQ.js","/rhmz-demo/assets/Portal-CB3Nf6CW.js","/rhmz-demo/assets/ProductLinks-Dr_BEfZH.js","/rhmz-demo/assets/Products-Dn9K-LVj.js","/rhmz-demo/assets/Projects-BzYauMqL.js","/rhmz-demo/assets/Search-BM1IKALe.js","/rhmz-demo/assets/Services-CkhMKOPV.js","/rhmz-demo/assets/Shared-Cw9TdeSk.js","/rhmz-demo/assets/Warnings-fbq7_2_H.js","/rhmz-demo/assets/WaterChart-BsfoStk4.js","/rhmz-demo/assets/content-Do7XVik7.js","/rhmz-demo/assets/content-catalogue-C0dAHWIA.js","/rhmz-demo/assets/directory-DkXdghW6.js","/rhmz-demo/assets/index-CFfRFQUK.js","/rhmz-demo/assets/index-DOs_621G.css","/rhmz-demo/assets/iso-e5_0sTI7.js","/rhmz-demo/assets/manrope-cyrillic-wght-normal-Dvxsihut.woff2","/rhmz-demo/assets/manrope-greek-wght-normal-DL7QRZyv.woff2","/rhmz-demo/assets/manrope-latin-ext-wght-normal-Ch3YOpNY.woff2","/rhmz-demo/assets/manrope-latin-wght-normal-DHIcAJRg.woff2","/rhmz-demo/assets/manrope-vietnamese-wght-normal-usUDDRr7.woff2","/rhmz-demo/assets/portal-DNYWoueQ.js","/rhmz-demo/icons/apple-touch-icon.png","/rhmz-demo/icons/icon-192.png","/rhmz-demo/icons/icon-512.png","/rhmz-demo/icons/maskable-512.png","/rhmz-demo/index.html","/rhmz-demo/licenses/manrope.txt","/rhmz-demo/manifest.webmanifest","/rhmz-demo/rhmz-logo.png","/rhmz-demo/serbia-flag.png"];
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
