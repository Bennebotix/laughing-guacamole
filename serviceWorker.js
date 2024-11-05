const cacheName = 'client'
const assets = [
  "/",
  "/index.html",
  "/images/icon512_maskable.png",
  "/images/icon512_rounded.png",
  "/css/style.css",
  "/js/app.js",
  "serviceWorker.js",
  "manifest.json",
  "README.md"
]

self.addEventListener('notificationclick', function (event) {
  event.notification.close(); // Do anything here
  clients.openWindow("https://www.google.com"); // On app I think
});

// Installing the Service Worker
self.addEventListener("install", async (event) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(assets);
  } catch (error) {
    console.error("Service Worker installation failed:", error);
  }
});

// Fetching resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);

      try {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          console.log("cachedResponse: ", event.request.url);
          return cachedResponse;
        }

        const fetchResponse = await fetch(event.request);
        if (fetchResponse) {
          console.log("fetchResponse: ", event.request.url);
          await cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        }
      } catch (error) {
        console.log("Fetch failed: ", error);
        const cachedResponse = await cache.match("index.html");
        return cachedResponse;
      }
    })()
  );
});
