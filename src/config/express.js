const cookieSession = require('cookie-session');
const passport = require('passport');
const routes = require('../routes');
const bodyParser = require('body-parser');

/**
 * Load express configuration
 * @module express/config
 * @param app The express app.
 */
//  Express configuration
module.exports = (app) => {
  // Use body-parser middleware.
  app.use(bodyParser.json());
  /* Important: follow this order to use express middlewares.
   * 1.cookie
   * 2.session
   * 3.passport.initialize
   * 4.passport.session
   * 5.app.router
   */
  app.use(
    cookieSession({
      name: 'session',

      // Time to expire in ms.
      maxAge: 24 * 60 * 60 * 1000,
      // Key to encrypt the cookie.
      keys: ['ioled'],
      //secure: true,
      //httpOnly: true,
    }),
  );

  /* Passport middleware to use cookie session.
   * The user can be accessed by 'req.user' in the express request.
   */
  app.use(passport.initialize());
  app.use(passport.session());

  // Use all routes
  app.use(routes);
};
