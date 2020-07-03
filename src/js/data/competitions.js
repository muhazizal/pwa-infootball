import { status, json, error } from './messages.js';

// BASE URL
const BASE_URL = 'https://api.football-data.org/';

// Fetch request
const fetchRequest = {
	headers: {
		'X-Auth-Token': '0d07875e201d427aba3e758b7280400c',
	},
};

// League images
import championsImg from '../../assets/images/champions.svg';
import bundesligaImg from '../../assets/images/bundesliga.svg';
import eredivisieImg from '../../assets/images/eredivisie.svg';
import laligaImg from '../../assets/images/laliga.svg';
import ligue1Img from '../../assets/images/ligue1.svg';
import premierImg from '../../assets/images/premier.svg';

// Get champions league
export const getChampions = () => {
	fetch(`${BASE_URL}v2/competitions/2001`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			let championsHTML = '';
			championsHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${championsImg}">
					</div>
					<div class="card-content">
						<p>${data.name}</p>
					</div>
				</div>
			`;
			document.getElementById('champions').innerHTML = championsHTML;
		})
		.catch(error);
};

// Get germany league
export const getGermany = () => {
	fetch(`${BASE_URL}v2/competitions/2002`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			let germanyHTML = '';
			germanyHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${bundesligaImg}">
					</div>
					<div class="card-content">
						<p>${data.name}</p>
					</div>
				</div>
			`;
			document.getElementById('germany').innerHTML = germanyHTML;
		})
		.catch(error);
};

// Get netherland league
export const getNetherland = () => {
	fetch(`${BASE_URL}v2/competitions/2003`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			let netherlandHTML = '';
			netherlandHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${eredivisieImg}">
					</div>
					<div class="card-content">
						<p>${data.name}</p>
					</div>
				</div>
			`;
			document.getElementById('netherland').innerHTML = netherlandHTML;
		})
		.catch(error);
};

// Get english league
export const getEnglish = () => {
	fetch(`${BASE_URL}v2/competitions/2021`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			let englishHTML = '';
			englishHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${premierImg}">
					</div>
					<div class="card-content">
						<p>${data.name}</p>
					</div>
				</div>
			`;
			document.getElementById('english').innerHTML = englishHTML;
		})
		.catch(error);
};

// Get spain league
export const getSpain = () => {
	fetch(`${BASE_URL}v2/competitions/2014`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			let spainHTML = '';
			spainHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${laligaImg}">
					</div>
					<div class="card-content">
						<p>${data.name}</p>
					</div>
				</div>
			`;
			document.getElementById('spain').innerHTML = spainHTML;
		})
		.catch(error);
};

// Get france league
export const getFrance = () => {
	fetch(`${BASE_URL}v2/competitions/2015`, fetchRequest)
		.then(status)
		.then(json)
		.then(data => {
			let franceHTML = '';
			franceHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${ligue1Img}">
					</div>
					<div class="card-content">
						<p>${data.name}</p>
					</div>
				</div>
			`;
			document.getElementById('france').innerHTML = franceHTML;
		})
		.catch(error);
};
