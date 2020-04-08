const CACHE_NAME = 'gallery-pwa';
let urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/css/main.css',
  '/static/js/main.js',
  '/sw.js',
  '/static/media/logo.svg',
  '/static/js/2.ad6afb67.chunk.js',
  '/static/css/main.5b456d02.chunk.css',
  '/static/js/main.721ec7a5.chunk.js'
];

let installPromptEvent;

self.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install-button').disabled = false;
});

// Install service worker
self.addEventListener('install', event => {
  // Perform the install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return the requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Return response as Cache is hit 
        if (response) {
          return response;
        } else {
          if (event.request.url === 'https://picsum.photos/v2/list') {
            fetch(event.request.url)
              .then(function (result) {
                return caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request.url, result.clone());
                  return result;
                });

              })
          }
        }
        return fetch(event.request);
      }
      )
      .catch(function (error) {
        console.log("cache not matched error")
      })
  );
});


// Update service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['gallery-pwa'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});