importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Register route
workbox.routing.registerRoute(({ url }) => url.origin, new workbox.strategies.StaleWhileRevalidate());

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
workbox.precaching.precacheAndRoute([self.__WB_MANIFEST], {
	ignoreURLParametersMatching: [/.*/],
});
