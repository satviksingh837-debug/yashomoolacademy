const CACHE_NAME = "yashomool-v2"; // Version update

const urlsToCache = [
  "/",                          // Root
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-72.png"
];

// 🔥 INSTALL - Cache सब files
self.addEventListener("install", event => {
  self.skipWaiting(); // Immediately activate
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("✅ Caching files");
        return cache.addAll(urlsToCache);
      })
  );
});

// 🔥 FETCH - Offline support
self.respondWith = (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).catch(() => {
          // Offline fallback
          return caches.match('/index.html');
        });
      })
  );
};

// 🔥 ACTIVATE - Old caches delete
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("🗑️ Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 🔥 Background Sync (Optional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    // Future sync logic
  }
});