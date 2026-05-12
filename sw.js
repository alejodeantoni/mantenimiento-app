const CACHE_NAME = 'mantenimiento-app-v1';
const ASSETS = [
  './', './index.html', './manifest.json',
  'https://unpkg.com/@phosphor-icons/web',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // No cacheamos JSONBin para asegurar datos frescos
  if (e.request.url.includes('jsonbin.io')) return;
  // Network First para el resto
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});