const express = require('express');
const app = express();

// ----- Import all routes here -----
const historyRoute = require('./history.js');
const authRoute = require('./auth.js');

// ----- Use all routes here -----
app.use(historyRoute);
app.use(authRoute);

// Export main router to use it in the main app.
module.exports = app;
