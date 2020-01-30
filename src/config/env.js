const JWT_KEY = process.env.JWT_KEY;
const MONGO_URI = process.env.MONGO_URI;

if (JWT_KEY === undefined) {
  console.log('[API-GATEWAY][ERROR] No JWT Key specified in the env variables');
}

if (MONGO_URI === undefined) {
  console.log('[API-GATEWAY][ERROR] No Mongo URI specified in the env variables');
}

module.exports = {JWT_KEY, MONGO_URI};
