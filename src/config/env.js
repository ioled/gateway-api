const JWT_KEY = process.env.JWT_KEY;
if (JWT_KEY === undefined) {
  console.log('[Gateway API][Error] No JWT Key specified in the env variables');
  process.exit(1);
}

const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI === undefined) {
  console.log('[Gateway API][Error] No Mongo URI specified in the env variables');
  process.exit(1);
}

const HISTORY_URL = process.env.HISTORY_URL;
if (HISTORY_URL === undefined) {
  console.log('[Gateway API][Error] No History URL specified in the env variables');
  process.exit(1);
}

const DEVICE_CONTROL_URL = process.env.DEVICE_CONTROL_URL;
if (DEVICE_CONTROL_URL === undefined) {
  console.log('[Gateway API][Error] No Device Control URL specified in the env variables');
  process.exit(1);
}

const googleClientID = '384917616977-ki9fleqmcg3crte84alco425emkqpm05.apps.googleusercontent.com';
if (googleClientID === undefined) {
  console.log('[Gateway API][Error] No google Client ID specified in the env variables');
  process.exit(1);
}

const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (googleClientSecret === undefined) {
  console.log('[Gateway API][Error] No google Client Secret specified in the env variables');
  process.exit(1);
}

module.exports = {
  MONGO_URI,
  JWT_KEY,
  HISTORY_URL,
  DEVICE_CONTROL_URL,
  googleClientID,
  googleClientSecret,
};
