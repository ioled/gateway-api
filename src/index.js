const express = require('express');
const expressConfig = require('./config/express');

const app = express();
expressConfig(app);

const PORT = process.env.PORT;

if (PORT === undefined) {
  console.log('[Gateway API][Error] No port specified in the env variables');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
