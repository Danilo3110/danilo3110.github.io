/* RHMZ demo app shell. Scope is restricted to /rhmz-demo/. */
const CACHE = 'rhmz-shell-f862e9ace21e6a41';
const BASE = "/rhmz-demo/";
const ASSETS = ["/rhmz-demo/","/rhmz-demo/assets/About-CyZArGlt.js","/rhmz-demo/assets/ContentLink-BiqYnyMJ.js","/rhmz-demo/assets/ContentPage-C5MppfKP.js","/rhmz-demo/assets/Directory-BT1jtDw5.js","/rhmz-demo/assets/DocumentPage-CIyv99a6.js","/rhmz-demo/assets/Forecast-CYgUDkc0.js","/rhmz-demo/assets/HydroStation-DBBXvED8.js","/rhmz-demo/assets/Hydrology-0lwvNCOf.js","/rhmz-demo/assets/Leadership-lxiDHESy.js","/rhmz-demo/assets/News-ygQdnIKN.js","/rhmz-demo/assets/Observations-Xhx81H8Q.js","/rhmz-demo/assets/Portal-uUNPc30Q.js","/rhmz-demo/assets/ProductLinks-DS8qZ1tK.js","/rhmz-demo/assets/Products-YLahZdBY.js","/rhmz-demo/assets/Projects-DlLvZ2kb.js","/rhmz-demo/assets/Search-RB7ngL_D.js","/rhmz-demo/assets/Services-DYJpsmQs.js","/rhmz-demo/assets/Shared-D5etdvqE.js","/rhmz-demo/assets/Warnings-C2HSEdJK.js","/rhmz-demo/assets/WaterChart-CbGDv0hK.js","/rhmz-demo/assets/content-CZumAq1j.js","/rhmz-demo/assets/content-catalogue-DqK-Cxwp.js","/rhmz-demo/assets/directory-DkXdghW6.js","/rhmz-demo/assets/index-C3_Hs0k6.js","/rhmz-demo/assets/index-Ctd61H39.css","/rhmz-demo/assets/iso-e5_0sTI7.js","/rhmz-demo/assets/manrope-cyrillic-wght-normal-Dvxsihut.woff2","/rhmz-demo/assets/manrope-greek-wght-normal-DL7QRZyv.woff2","/rhmz-demo/assets/manrope-latin-ext-wght-normal-Ch3YOpNY.woff2","/rhmz-demo/assets/manrope-latin-wght-normal-DHIcAJRg.woff2","/rhmz-demo/assets/manrope-vietnamese-wght-normal-usUDDRr7.woff2","/rhmz-demo/assets/portal-DNYWoueQ.js","/rhmz-demo/icons/apple-touch-icon.png","/rhmz-demo/icons/icon-192.png","/rhmz-demo/icons/icon-512.png","/rhmz-demo/icons/maskable-512.png","/rhmz-demo/index.html","/rhmz-demo/licenses/manrope.txt","/rhmz-demo/manifest.webmanifest","/rhmz-demo/rhmz-logo.png","/rhmz-demo/serbia-flag.png"];
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
