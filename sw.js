// Service worker بسيط: بيخلّي التطبيق قابل للتثبيت ويفتح بسرعة
var CACHE = "rate-4.0-1790722296843";
var SHELL = ["./", "index.html", "manifest.webmanifest", "manifest-seller.webmanifest", "icon-c-192.png", "icon-c-512.png", "icon-s-192.png", "icon-s-512.png"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var u = new URL(e.request.url);
  if (u.origin !== location.origin || e.request.method !== "GET") return; // الداتا الحقيقية دايماً من جوجل مباشرة
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(function () { return caches.match(new URL("index.html", self.registration.scope).href); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function (hit) { return hit || fetch(e.request); }));
});
