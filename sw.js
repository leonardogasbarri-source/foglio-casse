// Foglio Casse: funziona anche senza connessione dopo la prima apertura.
// Le richieste all'API di Claude (lettura foto) non passano mai dalla cache.
var CACHE = "foglio-casse-v2";
var FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Prima la rete (così gli aggiornamenti arrivano subito), poi la copia salvata.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var u = new URL(e.request.url);
  if (u.hostname === "api.anthropic.com") return;
  var salvabile = u.origin === self.location.origin || u.hostname === "cdnjs.cloudflare.com" || u.hostname.indexOf("fonts.g") === 0;
  e.respondWith(
    fetch(e.request).then(function (r) {
      if (r.ok && salvabile) { var copia = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copia); }); }
      return r;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match("./index.html"); });
    })
  );
});
