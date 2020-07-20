importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

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

// Precaching file
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
	ignoreURLParametersMatching: [/.*/],
});

const FALLBACK_HTML_URL = '/offline.html';

// Use a stale-while-revalidate strategy for all other requests.
workbox.routing.setDefaultHandler(new workbox.strategies.StaleWhileRevalidate());

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
workbox.routing.setCatchHandler(({ event }) => {
	// Use event, request, and url to figure out how to respond.
	switch (event.request.destination) {
		case 'document':
			// If using precached URLs:
			// return matchPrecache(FALLBACK_HTML_URL);
			return caches.match(FALLBACK_HTML_URL);
			break;

		default:
			// If we don't have a fallback, just return an error response.
			return Response.error();
	}
});
