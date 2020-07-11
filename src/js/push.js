const webPush = require('web-push');

// Public key and private key
const PUBLIC_KEY = 'BO4Wzzxp_ktERxJ87dIiQZ489unYQgcwggZuGs2Kmu4u_WUXTXiWz9XzY7uahsIdqXt_Bczg5tp2UswGjuDc5Ug';
const PRIVATE_KEY = 'sDOLzJ9h3vO-NgMfl62pLwfkYG_vIMlMTP48bLTX4kA';

// Notifications payload setup
const vapidKeys = {
	publicKey: PUBLIC_KEY,
	privateKey: PRIVATE_KEY,
};

webPush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

const pushSubscription = {
	endpoint:
		'https://fcm.googleapis.com/fcm/send/c3yWx41XP9k:APA91bFQJ3bD_vHmqgeB_gYr4T6nzlISBNE0jRgOibgSMD0aXAGy-4dnf4APKk_SVXhsAgy91a8gQMAEks01izbcpcuaR-Ymdt2adlks6NZQvQNkfWTSrS9ruWdI0XB_cX6YruRDwfTG',
	keys: {
		p256dh: 'BKOWDJYjTts2NMO48tHtho1VyVjfzfRhvTTX06cFb9PIc+DcE24DErzMO/qGYS+c8kVyCNj7wUMQ2/HCTvMfICg=',
		auth: 'lZCIt5QCdoK6S4H7xWphxg==',
	},
};

const payload = 'Application can receive push notification';

const options = {
	gcmAPIKey: '940729100277',
	TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
