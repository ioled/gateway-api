const express = require('express');
const app = express();

// ----- Import all routes here -----
const historyRouter = require('./history.js');
const authRouter = require('./auth.js');
const deviceControlRouter = require('./deviceControl.js');

// ----- Use all routes here -----
app.use(historyRouter);
app.use(authRouter);
app.use(deviceControlRouter);

// Export main router to use it in the main app.
module.exports = app;
