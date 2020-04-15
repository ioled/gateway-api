const express = require('express');
const expressConfig = require('./config/express');

// Create the express app and load all middlewares and configurations.
const app = express();
expressConfig(app);

// Include passport configuration.
require('./services/passport');

const PORT = process.env.PORT;

if (PORT === undefined) {
  console.log('[Gateway API][Error] No port specified in the env variables');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log('[Gateway API] Listening on port', PORT);
});
