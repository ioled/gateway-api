const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/env');

/**
 * @CristianValdivia
 * Create token with user google ID
 * @description Create a token with google ID user
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.signToken = (req, res) => {
  console.log('[Gateway-API][signToken][Request]', req.user, req.body);
  const token = jwt.sign({user: req.user.googleID}, JWT_KEY);
  res.json({token});
  console.log('[Gateway-API][signToken][Response]', {token: token});
};

/**
 * @CristianValdivia
 * Protect a route with JWT token
 * @description Define if a user can access to determine route
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.protectedRoute = (req, res, next) => {
  console.log('[Gateway-API][protectedRoute][Request]', req.params, req.body);
  let token = req.headers['authorization'];

  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][protectedRoute][Error]', {error: error.message});
        return res.status(500).json({error: 'Invalid Token'});
      } else {
        req.decoded = decoded;
        console.log('[Gateway-API][protectedRoute][Response]', req.decoded);
        next();
      }
    });
  } else {
    console.log('[Gateway-API][protectedRoute][Response]', {error: 'No token provided'});
    return res.status(500).json({error: 'No token provided'});
  }
};
