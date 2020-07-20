// Init idb from idb.js
// Using idb.js from dicoding version, not from node_modules
const { default: idb } = require('./idb');

// Create teams object store and index
const dbPromised = idb.open('pwa-infootball', 1, upgradeDb => {
	const teamsObjectStore = upgradeDb.createObjectStore('teams', {
		keyPath: 'id',
	});
	teamsObjectStore.createIndex('name', 'name', { unique: true, multiEntry: true });
});

// Preloader
const preloader = document.querySelector('.progress');

// Save favorite team
export const saveTeam = team => {
	dbPromised
		.then(db => {
			const tx = db.transaction('teams', 'readwrite');
			const store = tx.objectStore('teams');

			store.add(team);
			return tx.complete;
		})
		.then(() => {
			preloader.style.display = 'none';
			M.toast({
				html: `${team.name} has been added to favorite`,
				displayLength: 2000,
			});
		})
		.catch(() => {
			preloader.style.display = 'none';
		});
};

// Delete favorite team
export const deleteTeam = team => {
	dbPromised
		.then(db => {
			const tx = db.transaction('teams', 'readwrite');
			const store = tx.objectStore('teams');

			store.delete(team.id);
			return tx.complete;
		})
		.then(() => {
			preloader.style.display = 'none';
			M.toast({
				html: `${team.name} has been deleted from favorite`,
				displayLength: 3000,
			});
		})
		.catch(() => {
			preloader.style.display = 'none';
		});
};

// Get all saved teams
export const getSavedTeams = () => {
	return new Promise((resolve, reject) => {
		dbPromised
			.then(db => {
				const tx = db.transaction('teams', 'readonly');
				const store = tx.objectStore('teams');

				return store.getAll();
			})
			.then(teams => {
				resolve(teams);
			});
	});
};
