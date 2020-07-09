import {
	getCompetition,
	getCompetitionMatches,
	getCompetitionStanding,
	getCompetitionTeams,
	getFavoriteTeams,
} from './data/api.js';

// Import league images
import premierImg from '../assets/images/premier.svg';
import laligaImg from '../assets/images/laliga.svg';
import serieAImg from '../assets/images/serieA.svg';

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

					// If page is home
					if (page === 'home') {
						// Activate carousel on homepage
						const el = document.querySelectorAll('.carousel');
						M.Carousel.init(el, {
							numVisible: 3,
						});

						// Load competition carousel
						getCompetition('2021', 'english', premierImg);
						getCompetition('2014', 'spain', laligaImg);
						getCompetition('2019', 'serieA', serieAImg);
					}

					if (page === 'favorite') {
						getFavoriteTeams();
					}

					// if page is matches
					if (page === 'matches') {
						getCompetitionMatches();
					}

					// if page is standing
					if (page === 'standing') {
						getCompetitionStanding();
					}

					// if page is teams
					if (page === 'teams') {
						getCompetitionTeams();
					}

					// Set link back icon and url logo
					if (window.location.pathname === '/competition.html') {
						const url = window.location.origin + '/';
						const back = document.querySelector('.back');
						const brandLogo = document.querySelector('.brand-logo');

						back.setAttribute('href', url);
						brandLogo.setAttribute('href', url);
					}
				} else if (this.status === 404) {
					content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
				} else {
					content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
				}
			}
		};

		xhttp.open('GET', `/html/pages/${page}.html`, true);
		xhttp.send();
	};
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

		xhttp.open('GET', '/html/navbar.html', true);
		xhttp.send();
	};
	// End load navigation

	// Load tabs
	const loadTabs = () => {
		const xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status !== 200) return;

				document.querySelector('.tabs').innerHTML = xhttp.responseText;

				document.querySelectorAll('.tabs .tab').forEach(el => {
					el.addEventListener('click', event => {
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};

		xhttp.open('GET', '/html/tabs.html', true);
		xhttp.send();
	};
	// End load tabs

	// Check url pathname and url hash
	const path = window.location.pathname;
	let page = window.location.hash.substr(1);

	// if path load index.html
	if (path === '/') {
		if (page === '') {
			page = 'home';
		}
	}

	// if path load competition.html
	if (path === '/competition.html') {
		if (page === '') {
			page = 'matches';
		}
		loadTabs();
	}

	loadPage(page);
	loadNav();
});
