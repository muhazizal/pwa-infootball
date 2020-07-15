const DEBUG = false;

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
