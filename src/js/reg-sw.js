// Public key and private key
const PUBLIC_KEY = 'BO4Wzzxp_ktERxJ87dIiQZ489unYQgcwggZuGs2Kmu4u_WUXTXiWz9XzY7uahsIdqXt_Bczg5tp2UswGjuDc5Ug';
const PRIVATE_KEY = 'sDOLzJ9h3vO-NgMfl62pLwfkYG_vIMlMTP48bLTX4kA';

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

			navigator.serviceWorker.getRegistration().then(reg => {
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
	requestPermission();
} else {
	console.log('ServiceWorker belum didukung browser ini.');
}
