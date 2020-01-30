const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/env');

exports.protectedRoute = (req, res, next) => {
  let token = req.headers['authorization'];

  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        console.log(token);
        return res.status(500).json({error: 'Invalid Token'});
      } else {
        req.decoded = decoded;
        console.log('MIDDLEWARE', req.decoded);
        next();
      }
    });
  } else {
    return res.status(500).json({error: 'No token provided'});
  }
};
