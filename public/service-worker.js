const CACHE_NAME = 'my-app-cache-v2'; // Increment the version
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/manifest.json',
    '/favicon.ico',
    // Add any other assets you want to cache
];

// Install event - caching resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    // Delete old caches that don't match the current CACHE_NAME
                    if (name !== CACHE_NAME) {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch event - network first strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Check if the response is valid and not a redirect
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
