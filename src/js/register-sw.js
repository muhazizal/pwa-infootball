// Public key and private key
const PUBLIC_KEY = 'BBYCasg8puJp7mU50slAxRrFHvH4yX_tr5UpuVwgB9FpEok8cQHV-mxioJVKRcxBNidMbadv8ndL-mo-fPtII0g';
const PRIVATE_KEY = 'KrAiodpcxQVt1cFUE8i81ztu6HB0_vsF2VzLjVu6Gpw';

// Encode url base64
const urlBase64ToUint8Array = base64String => {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

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

			navigator.serviceWorker.ready.then(() => {
				if ('PushManager' in window) {
					navigator.serviceWorker.getRegistration().then(registration => {
						registration.pushManager
							.subscribe({
								userVisibleOnly: true,
								applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
							})
							.then(subscribe => {
								console.log('Subscribe success at endpoint: ' + subscribe.endpoint);
								console.log(
									'Subscribe success with p256dh key: ',
									btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))))
								);
								console.log(
									'Subscribe success with auth key: ',
									btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))
								);
							})
							.catch(error => {
								console.log('Subscribe failed: ' + error.message);
							});
					});
				}
			});
		});
	}
};

// Register service worker and push notification
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('../sw.js')
			.then(registration => {
				console.log('SW registered: ', registration);
				return registration;
			})
			.catch(registrationError => {
				console.log('SW registration failed: ', registrationError);
			});
	});
	requestPermission();
} else {
	console.log('ServiceWorker belum didukung browser ini.');
}
