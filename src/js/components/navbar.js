document.addEventListener('DOMContentLoaded', () => {
	// Activate sidenav
	const el = document.querySelectorAll('.sidenav');
	M.Sidenav.init(el);

	// Load page
	const loadPage = page => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4) {
				const content = document.querySelector('#main-content');

				if (this.status === 200) {
					content.innerHTML = xhttp.responseText;

					// Activate carousel on homepage
					if (page === 'home') {
						const el = document.querySelectorAll('.carousel');
						M.Carousel.init(el, {
							numVisible: 3,
						});
					}
				} else if (this.status === 404) {
					content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
				} else {
					content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
				}
			}
		};
		xhttp.open('GET', `/src/html/pages/${page}.html`, true);
		xhttp.send();
	};

	let page = window.location.hash.substr(1);
	if (page === '') page = 'home';
	loadPage(page);
	// End load page

	// Load navigation
	const loadNav = () => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status !== 200) return;

				// Load list menu
				document.querySelectorAll('.topnav, .sidenav').forEach(el => {
					el.innerHTML = xhttp.responseText;
				});

				// Add event listener on list menu
				document.querySelectorAll('.sidenav a, .topnav a').forEach(el => {
					el.addEventListener('click', event => {
						// Close sidenav
						const sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();

						// Load selected navigation
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open('GET', '/src/html/components/navbar.html', true);
		xhttp.send();
	};
	loadNav();
	// End load navigation
});
