const CACHE_NAME = 'a7x-player-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './gmb.jpg'
];

// Tahap Instalasi Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Tahap Aktivasi
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Strategi Fetch (Wajib untuk memicu tombol Install di Brave)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
