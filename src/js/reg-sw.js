import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// Register service worker
if ('serviceWorker' in navigator) {
	const registration = runtime.register();
} else {
	console.log('ServiceWorker belum didukung browser ini.');
}
