// Import materialize scss and js
import './js/materialize.min';
import './sass/materialize.scss';

// Import views
import './js/components/navbar.js';

// Register service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('./service-worker.js')
			.then(function () {
				console.log('Pendaftaran ServiceWorker berhasil');
			})
			.catch(function () {
				console.log('Pendaftaran ServiceWorker gagal');
			});
	});
} else {
	console.log('ServiceWorker belum didukung browser ini.');
}
