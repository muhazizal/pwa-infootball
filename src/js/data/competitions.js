// Api response
import { status, json, error, render } from './responseApi.js';

// BASE URL
const BASE_URL = 'https://api.football-data.org/';

// Fetch request
const fetchRequest = {
	headers: {
		'X-Auth-Token': '0d07875e201d427aba3e758b7280400c',
	},
};

export const getCompetition = (id, elementId, competitionImg) => {
	fetch(`${BASE_URL}v2/competitions/${id}`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			render(data, elementId, competitionImg);
		})
		.catch(error);
};
