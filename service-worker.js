/* MySpace offline service worker. Keep this file beside index.html. */
const CACHE_NAME = "myspace-offline-v2";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/myspace-1024.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_FILES.map(path => new Request(new URL(path, self.registration.scope), { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("myspace-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      if (request.mode === "navigate") {
        return (await cache.match(new URL("./index.html", self.registration.scope))) ||
          new Response("MySpace is not available offline yet. Connect to the internet once to install it.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
      }
      return cached || new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
    }
  })());
});
