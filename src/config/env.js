const JWT_KEY = process.env.JWT_KEY;

if (JWT_KEY === undefined) {
  console.log('[Gateway API][Error] No JWT Key specified in the env variables');
}

module.exports = {JWT_KEY};
