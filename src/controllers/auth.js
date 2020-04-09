const passport = require('passport');

/**
 * Send the user to google oauth flow to log in with a google account.
 * @description To export 'passport.authenticate', it must be invoked with (req, res, next).
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.authRequest = (req, res, next) => {
  console.log('[Gateway-API][authRequest][Request]');
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })(req, res, next);
  console.log('[Gateway-API][authRequest][Response]', []);
};

// Redirect to the server with the session established.
exports.authCallback = (req, res, next) => {
  console.log('[Gateway-API][authCallback][Request]');
  passport.authenticate('google', {session: false})(req, res, next);
  console.log('[Gateway-API][authCallback][Response]', []);
};
