// Api response
import { status, json, error, renderCompetition } from './responseApi.js';

// BASE URL
const BASE_URL = 'https://api.football-data.org/';

// Fetch request
const fetchRequest = {
	headers: {
		'X-Auth-Token': '0d07875e201d427aba3e758b7280400c',
	},
};

// Get one particular competition
export const getCompetition = (id, elementId, competitionImg) => {
	fetch(`${BASE_URL}v2/competitions/${id}`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			renderCompetition(data, elementId, competitionImg);
		})
		.catch(error);
};

// Get competition standing
export const getCompetitionStanding = () => {
	const url = new URLSearchParams(window.location.search);
	const id = url.get('id');

	fetch(`${BASE_URL}v2/competitions/${id}/standings`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			console.log(data);
		})
		.catch(() => {
			error();
			console.log('test');
		});
};
