// Import competition
import { getCompetition, getCompetitionMatches, getCompetitionStanding, getCompetitionTeams } from './data/api.js';

// League images
import bundesligaImg from '../assets/images/bundesliga.svg';
import eredivisieImg from '../assets/images/eredivisie.svg';
import laligaImg from '../assets/images/laliga.svg';
import ligue1Img from '../assets/images/ligue1.svg';
import premierImg from '../assets/images/premier.svg';

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

					if (page === 'home') {
						// Activate carousel on homepage
						const el = document.querySelectorAll('.carousel');
						M.Carousel.init(el, {
							numVisible: 3,
						});

						// Load competition carousel
						getCompetition('2002', 'germany', bundesligaImg);
						getCompetition('2003', 'netherland', eredivisieImg);
						getCompetition('2014', 'spain', laligaImg);
						getCompetition('2015', 'france', ligue1Img);
						getCompetition('2021', 'english', premierImg);
					} else if (page === 'matches') {
						// Set link back icon and url logo
						const url = window.location.origin + '/';
						const back = document.querySelector('.back');
						const brandLogo = document.querySelector('.brand-logo');
						back.setAttribute('href', url);
						brandLogo.setAttribute('href', url);

						// Load competition matches
						getCompetitionMatches();
					} else if (page === 'standing') {
						// Load competition standing
						getCompetitionStanding();
					} else if (page === 'teams') {
						getCompetitionTeams();
					} else {
						console.log('no pages');
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
		xhttp.open('GET', '/src/html/navbar.html', true);
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
		xhttp.open('GET', '/src/html/tabs.html', true);
		xhttp.send();
	};

	// End load tabs

	// Check pathname for routing
	const path = window.location.pathname;
	let page = '';

	if (path === '/') {
		page = 'home';
		loadPage(page);
		loadNav();
	} else if (path === '/competition.html') {
		page = 'matches';
		loadPage(page);
		loadTabs();
	} else {
		console.log('no path');
	}
});
