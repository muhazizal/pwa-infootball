import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// Request push notification permission
const requestPermission = () => {
	if ('Notification' in window) {
		Notification.requestPermission().then(result => {
			if (result === 'denied') {
				console.log('Notification permission denied');
				return;
			} else if (result === 'default') {
				console.log('Box dialog has been closed');
				return;
			}

			navigator.serviceWorker.getRegistration().then(reg => {
				reg.showNotification('Notification granted');
			});
		});
	}
};

// Register service worker and push notification
if ('serviceWorker' in navigator) {
	const registration = runtime.register();
	requestPermission();
} else {
	console.log('ServiceWorker belum didukung browser ini.');
}
