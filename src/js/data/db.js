const { default: idb } = require('./idb');

const dbPromised = idb.open('pwa-infootball', 1, upgradeDb => {
	const teamsObjectStore = upgradeDb.createObjectStore('teams', {
		keyPath: 'id',
	});
	teamsObjectStore.createIndex('name', 'name', { unique: true, multiEntry: true });
});

export const saveTeam = team => {
	dbPromised
		.then(db => {
			const tx = db.transaction('teams', 'readwrite');
			const store = tx.objectStore('teams');

			store.add(team);
			return tx.complete;
		})
		.then(() => {
			console.log('Team berhasil disimpan');
		})
		.catch(() => {
			console.log('Team gagal disimpan');
		});
};

export const deleteTeam = team => {
	dbPromised
		.then(db => {
			const tx = db.transaction('teams', 'readwrite');
			const store = tx.objectStore('teams');

			store.delete(team.id);
			return tx.complete;
		})
		.then(() => {
			console.log('Team deleted');
		})
		.catch(() => {
			console.log('Delete gagal');
		});
};

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
