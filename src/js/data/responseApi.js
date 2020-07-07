// Check response result
export const status = response => {
	if (response.status !== 200) {
		console.log('Error: ' + response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
};

// Turn response into json
export const json = response => {
	return response.json();
};

// Show message on error response
export const error = error => {
	console.log('Error: ' + error);
};

// Render competition
export const renderCompetition = (data, elementId, img) => {
	const url = window.location.origin;
	let elementHtml = '';

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
export const renderCompetitionMatches = data => {
	let elementHtml = '';
	const matchLength = data.matches.length;
	const competitionName = ` <li class="collection-header center-align"><h5>${data.competition.name}</h5></li>`;

	data.matches.forEach(match => {
		let matchDate = match.utcDate.substr(0, 10) + ' | ' + match.utcDate.substr(11, 18);

		// If match array 0
		if (matchLength === 0) {
			console.log('kosong');
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

		document.querySelector('.collection').innerHTML = competitionName + elementHtml;
	});
};

// Render competition standing
export const renderCompetitionStanding = data => {
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

	// Looping total away + home matches
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

export const renderCompetitionTeams = data => {
	// Set element header
	const tagNode = document.createElement('h5');
	const textNode = document.createTextNode(`${data.competition.name}`);
	tagNode.appendChild(textNode);

	// Insert element header
	const container = document.querySelector('.teams__container');
	container.insertBefore(tagNode, container.firstChild);

	let elementHtml = '';

	data.teams.forEach(team => {
		elementHtml += `
		<div class="col s12 m6 l4">
			<div class="card">
				<div class="card-image">
					<img src="${team.crestUrl}">
					<a class="btn-floating halfway-fab waves-effect waves-light"><i class="material-icons">favorite_border</i></a>
				</div>
				<div class="card-content">
					<p><span>Name:</span> ${team.name}</p>
					<p><span>Venue:</span> ${team.venue}</p>
					<p><span>Founded:</span> ${team.founded}</p>
				</div>
			</div>
		</div>
		`;
	});

	document.querySelector('.teams').innerHTML = elementHtml;

	document.querySelectorAll('.material-icons').forEach(el => {
		el.addEventListener('click', () => {
			if (el.innerHTML === 'favorite_border') {
				el.innerHTML = 'favorite';
				el.style.color = 'red';
			} else if (el.innerHTML === 'favorite') {
				el.innerHTML = 'favorite_border';
				el.style.color = 'black';
			} else {
				console.log('no property');
			}
		});
	});
};
