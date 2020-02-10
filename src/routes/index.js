const express = require('express');
const app = express();

// ----- Import all routes here -----
const historyRouter = require('./history.js');
const authRouter = require('./auth.js');
const deviceControlRouter = require('./deviceControl.js');
const userRouter = require('./user.js');

// ----- Use all routes here -----
app.use(authRouter);
app.use(historyRouter);
app.use(deviceControlRouter);
app.use(userRouter);

// Export main router to use it in the main app.
module.exports = app;
