const passport = require('passport');
const routes = require('../routes');
const bodyParser = require('body-parser');
const cors = require('cors');

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
   * 1.cors
   * 2.passport.initialize
   * 3.passport.session
   * 4.app.router
   */

  app.use(cors());

  /* Passport middleware to use cookie session.
   * The user can be accessed by 'req.user' in the express request.
   */
  app.use(passport.initialize());
  app.use(passport.session());

  // Use all routes
  app.use(routes);
};
