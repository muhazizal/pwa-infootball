const DEBUG = false;

const { assets } = global.serviceWorkerOption;

const CACHE_NAME = 'pwa-infootball-v2';

let assetsToCache = [...assets, './'];

assetsToCache = assetsToCache.map(path => {
	return new URL(path, global.location).toString();
});

// When the service worker is first added to a computer.
self.addEventListener('install', event => {
	// Perform install steps.
	if (DEBUG) {
		console.log('[SW] Install event');
	}

	// Add core website files to cache during serviceworker installation.
	event.waitUntil(
		global.caches
			.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(assetsToCache);
			})
			.then(() => {
				if (DEBUG) {
					console.log('Cached assets: main', assetsToCache);
				}
			})
			.catch(error => {
				console.error(error);
				throw error;
			})
	);
});

// After the install event.
self.addEventListener('activate', event => {
	if (DEBUG) {
		console.log('[SW] Activate event');
	}

	// Clean the caches
	event.waitUntil(
		global.caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					// Delete the caches that are not the current one.
					if (cacheName.indexOf(CACHE_NAME) === 0) {
						return null;
					}

					return global.caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('message', event => {
	switch (event.data.action) {
		case 'skipWaiting':
			if (self.skipWaiting) {
				self.skipWaiting();
				self.clients.claim();
			}
			break;
		default:
			break;
	}
});

// Fetch assets for working offline
self.addEventListener('fetch', event => {
	if (DEBUG) {
		console.log('[SW] Fetch event');
	}

	const BASE_URL = 'https://api.football-data.org/';

	if (event.request.url.indexOf(BASE_URL) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(cache => {
				return fetch(event.request).then(response => {
					if (DEBUG) {
						console.log('[SW] Cache');
					}

					cache.put(event.request.url, response.clone());
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then(response => {
				if (DEBUG) {
					console.log('[SW] Fetch');
				}

				return response || fetch(event.request);
			})
		);
	}
});

// Push notification
self.addEventListener('push', event => {
	let body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}

	const options = {
		body: body,
		icon: './assets/icons/favicon.png',
		badge: './assets/icons/favicon.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};

	event.waitUntil(self.registration.showNotification('Push Notification', options));
});
