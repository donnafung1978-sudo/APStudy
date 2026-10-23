/* Offline cache for the cross-platform PWA. Bump CACHE when content changes. */
const CACHE = "anatomy-ap-v10-flat";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./systems.js",
  "./cheatsheet.js",
  "./diagrams.js",
  "./correct.wav",
  "./wrong.wav",
  "./tap.wav",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./favicon-32.png",
  "./logo-mark.png",
  "./p04.jpg",
  "./p05.jpg",
  "./p06.jpg",
  "./p07.jpg",
  "./p08.jpg",
  "./p09.jpg",
  "./p10.jpg",
  "./p11.jpg",
  "./p12.jpg",
  "./p13.jpg",
  "./p14.jpg",
  "./p15.jpg",
  "./p16.jpg",
  "./p17.jpg",
  "./p18.jpg",
  "./p19.jpg",
  "./p20.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(ASSETS.map(url =>
        fetch(new Request(url, { cache: "reload" })).then(response => {
          if (!response || !response.ok) throw new Error("PWA cache failed: " + url);
          return cache.put(url, response);
        })
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html", { ignoreSearch: true })
        .then(hit => hit || fetch(request))
        .catch(() => caches.match("./index.html", { ignoreSearch: true }))
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
