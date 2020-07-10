// Import database
import { saveTeam, deleteTeam, getSavedTeams } from './db.js';

// Base url
const BASE_URL = 'https://api.football-data.org/';

// Competition url
const COMPETTION_URL = new URLSearchParams(window.location.search);
const COMPETITION_ID = COMPETTION_URL.get('id');

// Fetch request
const fetchRequest = {
	headers: {
		'X-Auth-Token': '0d07875e201d427aba3e758b7280400c',
	},
};

// Preloader
let preloader = document.querySelector('.progress');

// Check response result
const status = response => {
	if (response.status !== 200) {
		console.log('Error: ' + response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
};

// Turn data response into json
const json = response => {
	return response.json();
};

// Show message on reject response
const error = error => {
	console.log('Error: ' + error);
};

// Render competition
const renderCompetition = (data, elementId, img) => {
	// Url
	const url = window.location.origin;
	let elementHtml = '';

	// Print element
	elementHtml += `
		<a class="competition" href="${url}/competition.html?id=${data.id}">
			<div class="card">
				<div class="card-image waves-effect waves-block waves-light">
					<img src="${img}">
				</div>
				<div class="card-content">
					<p>${data.name}</p>
				</div>
			</div>
		</a>
	`;

	document.getElementById(`${elementId}`).innerHTML = elementHtml;
};

// Render competition matches
const renderCompetitionMatches = data => {
	let elementHtml = '';
	const matchLength = data.matches.length;
	const competitionName = `<li class="collection-header center-align"><h5>${data.competition.name}</h5></li>`;

	// Loop data and print element
	data.matches.forEach(match => {
		let matchDate = match.utcDate.substr(0, 10) + ' | ' + match.utcDate.substr(11, 18);

		// If match array 0
		if (matchLength === 0) {
			elementHtml = `
				<div class="collection-item center-align">
					<h5>No upcoming matches.</h5>
				</div>
			`;
		}
		// If match array 1
		else if (matchLength === 1) {
			elementHtml += `
				<li class="collection-item col s12">
					<div class="center-align block">
						<p>${match.awayTeam.name}</p>
						<p>VS</p>
						<p>${match.homeTeam.name}</p>
						<p id="matchDate">${matchDate}</p>
					</div>
				</li>
			`;
		}
		// If match array > 1
		else {
			elementHtml += `
				<li class="collection-item col s12 m6 l4">
					<div class="center-align block">
						<p>${match.awayTeam.name}</p>
						<p>VS</p>
						<p>${match.homeTeam.name}</p>
						<p id="matchDate">${matchDate}</p>
					</div>
				</li>
			`;
		}
	});

	document.querySelector('.collection').innerHTML = competitionName + elementHtml;
};

// Render competition standing
const renderCompetitionStanding = data => {
	// Init element
	let elementHtml = '';
	const competitionName = `<th class="table__header" colspan="10">${data.competition.name}</th>`;
	const competitionHeader = `
		<th class="table__header">#</th>
		<th class="table__header">Team</th>
		<th class="table__header">PG</th>
		<th class="table__header hide-on-small-only">W</th>
		<th class="table__header hide-on-small-only">D</th>
		<th class="table__header hide-on-small-only">L</th>
		<th class="table__header hide-on-small-only">GF</th>
		<th class="table__header hide-on-small-only">GA</th>
		<th class="table__header">GD</th>
		<th class="table__header">Pts</th>
	`;

	// Looping total (away + home) matches
	data.standings[0].table.forEach(standing => {
		elementHtml += `
			<tr class="table__row">
				<td class="table__data">${standing.position}</td>
				<td class="table__data">${standing.team.name}</td>
				<td class="table__data">${standing.playedGames}</td>
				<td class="table__data hide-on-small-only">${standing.won}</td>
				<td class="table__data hide-on-small-only">${standing.draw}</td>
				<td class="table__data hide-on-small-only">${standing.lost}</td>
				<td class="table__data hide-on-small-only">${standing.goalsFor}</td>
				<td class="table__data hide-on-small-only">${standing.goalsAgainst}</td>
				<td class="table__data">${standing.goalDifference}</td>
				<td class="table__data">${standing.points}</td>
			</tr>
		`;
	});

	document.querySelector('#competition-name').innerHTML = competitionName;
	document.querySelector('#competition-header').innerHTML = competitionHeader;
	document.querySelector('.table__body').innerHTML = elementHtml;
};

// Render competition teams
const renderCompetitionTeams = data => {
	// Set header competition
	document.querySelector('.teams__header').innerHTML = data.competition.name;

	// Set team card
	const teams = data.teams;
	let elementHtml = '';

	// Loop for team card
	teams.forEach(team => {
		elementHtml += `
			<div class="col s12 m6 l4">
				<div class="card">
					<div class="card-image">
						<img src="${team.crestUrl}">
						<button value="${team.id}" class="btn-floating halfway-fab waves-effect waves-light addToFavorite">
							<i class="material-icons">favorite_border</i>
						</button>
					</div>
					<div class="card-content">
						<p><span>Name:</span> ${team.name}</p>
						<p><span>Venue:</span> ${team.venue}</p>
						<p><span>Founded:</span> ${team.founded}</p>
					</div>
				</div>
			</div>
		`;

		document.querySelector('.teams').innerHTML = elementHtml;
	});

	// Loop all button save
	document.querySelectorAll('.addToFavorite').forEach(btnSave => {
		// Init teamId and mdi-element
		const teamId = parseInt(btnSave.value);
		const favoriteMdi = btnSave.childNodes[1];

		// Check favorite teams
		getSavedTeams().then(savedTeams => {
			savedTeams.forEach(savedTeam => {
				// If match, turn favorite to red
				if (savedTeam.id === teamId) {
					favoriteMdi.innerHTML = 'favorite';
					favoriteMdi.style.color = 'red';
				}
			});
		});

		// Set saveTeam event listener for all button
		btnSave.addEventListener('click', () => {
			preloader.style.display = 'block';

			// If not saved, then save
			if (favoriteMdi.innerHTML === 'favorite_border') {
				fetch(`${BASE_URL}v2/teams/${teamId}`, fetchRequest)
					.then(status)
					.then(json)
					.then(data => {
						saveTeam(data);
					})
					.then(() => {
						favoriteMdi.innerHTML = 'favorite';
						favoriteMdi.style.color = 'red';
					});
			}

			// If saved, then delete
			if (favoriteMdi.innerHTML === 'favorite') {
				fetch(`${BASE_URL}v2/teams/${teamId}`, fetchRequest)
					.then(status)
					.then(json)
					.then(data => {
						deleteTeam(data);
					})
					.then(() => {
						favoriteMdi.innerHTML = 'favorite_border';
						favoriteMdi.style.color = 'black';
					});
			}
		});
	});
};

// Render favorite teams
const renderFavoriteTeams = teams => {
	// Init element
	let elementHtml = '';

	// Loop for team card
	teams.forEach(team => {
		elementHtml += `
			<div class="col s12 m6 l4">
				<div class="card">
					<div class="card-image">
						<img src="${team.crestUrl}">
					</div>
					<div class="card-content">
						<p><span>Name:</span> ${team.name}</p>
						<p><span>Venue:</span> ${team.venue}</p>
						<p><span>Founded:</span> ${team.founded}</p>
						
					</div>
					<div class="card-action center-align">
						<button value="${team.id}" class="btn waves-effect waves-light removeFromFavorite">
							Delete From Favorite
						</button>
					</div>
				</div>
			</div>
		`;
	});

	document.querySelector('#favorite-team').innerHTML = elementHtml;

	// Add event listener delete team for each button
	document.querySelectorAll('.removeFromFavorite').forEach(btn => {
		btn.addEventListener('click', () => {
			preloader.style.display = 'block';

			fetch(`${BASE_URL}v2/teams/${btn.value}`, fetchRequest)
				.then(status)
				.then(json)
				.then(data => {
					deleteTeam(data);
				})
				.then(() => {
					// Delete old card
					let favoriteTeamContainer = document.querySelectorAll('.col');
					favoriteTeamContainer.forEach(card => {
						card.parentNode.removeChild(card);
					});
				})
				.then(() => {
					// Render new card
					getFavoriteTeams();
				});
		});
	});
};

// Get one particular competition
export const getCompetition = (id, elementId, competitionImg) => {
	// If cached
	if ('caches' in window) {
		global.caches.match(`${BASE_URL}v2/competitions/${id}`).then(response => {
			if (response) {
				response.json().then(data => {
					renderCompetition(data, elementId, competitionImg);
				});
			}
		});
	}

	// Fetch competition
	fetch(`${BASE_URL}v2/competitions/${id}`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			renderCompetition(data, elementId, competitionImg);
		})
		.catch(error);
};

// Get competition matches
export const getCompetitionMatches = () => {
	// If cached
	if ('caches' in window) {
		global.caches.match(`${BASE_URL}v2/competitions/${COMPETITION_ID}/matches?status=SCHEDULED`).then(response => {
			if (response) {
				response.json().then(data => {
					renderCompetitionMatches(data);
				});
			}
		});
	}

	// Fetch competition matches
	fetch(`${BASE_URL}v2/competitions/${COMPETITION_ID}/matches?status=SCHEDULED`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			renderCompetitionMatches(data);
		})
		.catch(error);
};

// Get competition standing
export const getCompetitionStanding = () => {
	// If cached
	if ('caches' in window) {
		global.caches.match(`${BASE_URL}v2/competitions/${COMPETITION_ID}/standings`).then(response => {
			if (response) {
				response.json().then(data => {
					renderCompetitionStanding(data);
				});
			}
		});
	}

	// Render competition standings
	fetch(`${BASE_URL}v2/competitions/${COMPETITION_ID}/standings`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			renderCompetitionStanding(data);
		})
		.catch(error);
};

// Get competition teams
export const getCompetitionTeams = () => {
	// If cached
	if ('caches' in window) {
		global.caches.match(`${BASE_URL}v2/competitions/${COMPETITION_ID}/teams`).then(response => {
			if (response) {
				response.json().then(data => {
					renderCompetitionTeams(data);
				});
			}
		});
	}

	// Fetch competition teams
	fetch(`${BASE_URL}v2/competitions/${COMPETITION_ID}/teams`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			renderCompetitionTeams(data);
		})
		.catch(message => error(message));
};

// Get favorite teams
export const getFavoriteTeams = () => {
	getSavedTeams().then(teams => {
		renderFavoriteTeams(teams);
	});
};
