// Api response
import {
	status,
	json,
	error,
	renderCompetition,
	renderCompetitionMatches,
	renderCompetitionStanding,
	renderCompetitionTeams,
} from './responseApi.js';

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

// Get one particular competition
export const getCompetition = (id, elementId, competitionImg) => {
	fetch(`${BASE_URL}v2/competitions/${id}`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			console.log(data);
			renderCompetition(data, elementId, competitionImg);
		})
		.catch(error);
};

// Get competition matches
export const getCompetitionMatches = () => {
	fetch(`${BASE_URL}v2/competitions/${COMPETITION_ID}/matches?status=SCHEDULED`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			console.log(data);
			renderCompetitionMatches(data);
		})
		.catch(error);
};

// Get competition standing
export const getCompetitionStanding = () => {
	fetch(`${BASE_URL}v2/competitions/${COMPETITION_ID}/standings`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			console.log(data);
			renderCompetitionStanding(data);
		})
		.catch(error);
};

export const getCompetitionTeams = () => {
	fetch(`${BASE_URL}v2/competitions/${COMPETITION_ID}/teams`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			console.log(data);
			renderCompetitionTeams(data);
		})
		.catch(message => error(message));
};
