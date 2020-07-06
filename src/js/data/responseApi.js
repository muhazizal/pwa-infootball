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

// Render html competition
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

export const renderCompetitionMatches = data => {
	let elementHtml = '';
	data.matches.forEach(match => {
		let matchDate = match.utcDate.substr(0, 10) + ' - ' + match.utcDate.substr(11, 18);
		elementHtml += `
		<li class="collection-item col s12 m6 l4">
			<div class="center-align block">
				<p>${match.awayTeam.name}</p>
				<p>VS</p>
				<p>${match.homeTeam.name}</p>
				<p id="matchDate">${matchDate}</p>
				<a class="waves-effect waves-light btn">Save Match</a>
			</div>
		</li>
		`;
		document.querySelector('.collection').innerHTML = elementHtml;
	});
};
