const webPush = require('web-push');

// Public key and private key
const PUBLIC_KEY = 'BBYCasg8puJp7mU50slAxRrFHvH4yX_tr5UpuVwgB9FpEok8cQHV-mxioJVKRcxBNidMbadv8ndL-mo-fPtII0g';
const PRIVATE_KEY = 'KrAiodpcxQVt1cFUE8i81ztu6HB0_vsF2VzLjVu6Gpw';

// Notifications payload setup
const vapidKeys = {
	publicKey: PUBLIC_KEY,
	privateKey: PRIVATE_KEY,
};

webPush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

const pushSubscription = {
	endpoint:
		'https://fcm.googleapis.com/fcm/send/cK_LVN7gPZQ:APA91bE0zRA_X9aF4l2zkuZcjEY1DrkRB4supf3rn3GRVhOJ4Srl7VJ-YNlyCi-ULKafhzx4KMtheBgg47v-BBf0DX-U7AML8Flsy4Fk5fZ_oNTZnw9O2dU5AUs0FQpkGq5qv1wUQfjV',
	keys: {
		p256dh: 'BHi2IvSPX1+ZOBTNo8IMvPwl6aLn3jsOp2r5Y2M5/DN5OnTkjW43PIyanz4NmHnxDxvl63NKc0/ksMrnLcOHrYg=',
		auth: 'nyuyYkMUBJjVIx0BrqScYQ==',
	},
};

const payload = 'Application can receive push notification';

const options = {
	gcmAPIKey: '940729100277',
	TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
