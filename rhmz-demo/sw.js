/* RHMZ demo app shell. Scope is restricted to /rhmz-demo/. */
const CACHE = 'rhmz-shell-4657b20882580421';
const BASE = "/rhmz-demo/";
const ASSETS = ["/rhmz-demo/","/rhmz-demo/assets/About-DchpYStM.js","/rhmz-demo/assets/ContentLink-7ixqB9wH.js","/rhmz-demo/assets/ContentPage-DZ85VZ9g.js","/rhmz-demo/assets/Directory-Cqt6EMqX.js","/rhmz-demo/assets/DocumentPage-DGK0DM0O.js","/rhmz-demo/assets/Forecast-D0slSlUx.js","/rhmz-demo/assets/ForecastTrend-0XCky88Q.js","/rhmz-demo/assets/HydroStation-844IvzNv.js","/rhmz-demo/assets/Hydrology-B1NN3TKK.js","/rhmz-demo/assets/Leadership-CH4geYoq.js","/rhmz-demo/assets/News-DIRSbaV8.js","/rhmz-demo/assets/Observations-DjPr5WYL.js","/rhmz-demo/assets/Portal-Dt_NSTno.js","/rhmz-demo/assets/ProductLinks-EiK6Cfq3.js","/rhmz-demo/assets/Products-Lb3L65Re.js","/rhmz-demo/assets/Projects-DQaGam-l.js","/rhmz-demo/assets/Search-DAQvPfix.js","/rhmz-demo/assets/Services-BB3QQ2mE.js","/rhmz-demo/assets/Warnings-D1ynfiHl.js","/rhmz-demo/assets/WaterChart-Dcsxl220.js","/rhmz-demo/assets/content-catalogue-DqK-Cxwp.js","/rhmz-demo/assets/content-gMi7ndkS.js","/rhmz-demo/assets/directory-DkXdghW6.js","/rhmz-demo/assets/index-CVMqDyse.css","/rhmz-demo/assets/index-y7fp4tUo.js","/rhmz-demo/assets/manrope-cyrillic-wght-normal-Dvxsihut.woff2","/rhmz-demo/assets/manrope-greek-wght-normal-DL7QRZyv.woff2","/rhmz-demo/assets/manrope-latin-ext-wght-normal-Ch3YOpNY.woff2","/rhmz-demo/assets/manrope-latin-wght-normal-DHIcAJRg.woff2","/rhmz-demo/assets/manrope-vietnamese-wght-normal-usUDDRr7.woff2","/rhmz-demo/assets/portal-DNYWoueQ.js","/rhmz-demo/icons/apple-touch-icon.png","/rhmz-demo/icons/icon-192.png","/rhmz-demo/icons/icon-512.png","/rhmz-demo/icons/maskable-512.png","/rhmz-demo/index.html","/rhmz-demo/licenses/manrope.txt","/rhmz-demo/manifest.webmanifest","/rhmz-demo/rhmz-logo.png","/rhmz-demo/serbia-flag.png"];
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
