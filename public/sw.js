// Service Worker for News Caching
const CACHE_NAME = 'unifyo-news-v1';
const NEWS_CACHE_NAME = 'unifyo-news-data-v1';
const STATIC_CACHE_NAME = 'unifyo-static-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

// News-specific cache patterns
const NEWS_PATTERNS = [
  /api\.allorigins\.win/,
  /corsproxy\.io/,
  /api\.codetabs\.com/,
  /cors-anywhere\.herokuapp\.com/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== NEWS_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle news API requests with network-first strategy
  if (NEWS_PATTERNS.some(pattern => pattern.test(url.href))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(NEWS_CACHE_NAME)
              .then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Return a basic offline response for news requests
              return new Response(
                JSON.stringify({
                  error: 'Offline',
                  message: 'News data unavailable offline'
                }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            });
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  if (STATIC_ASSETS.includes(url.pathname) || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE_NAME)
                  .then((cache) => cache.put(event.request, responseClone));
              }
              return response;
            });
        })
    );
    return;
  }

  // Default network-first for other requests
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// Background sync for news updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'news-update') {
    event.waitUntil(updateNewsCache());
  }
});

// Update news cache in background
async function updateNewsCache() {
  try {
    const cache = await caches.open(NEWS_CACHE_NAME);
    // This would be called when the app wants to refresh news data
    // Implementation would depend on your specific news API endpoints
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_NEWS_CACHE') {
    caches.delete(NEWS_CACHE_NAME);
  }
});
