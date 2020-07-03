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
