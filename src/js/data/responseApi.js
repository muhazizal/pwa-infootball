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

// Render html response
export const render = (data, elementId, img) => {
	let elementHtml = '';
	elementHtml += `
	<a href="/src/html/pages/competition.html?id=${data.id}">
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
