const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/env');
const {getDevice, getUser, isAdmin} = require('../services/firestore');

/**
 * @CristianValdivia
 * Create token with user google ID
 * @description Create a token with google ID user
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.signToken = (req, res) => {
  console.log('[Gateway-API][signToken][Request]', req.user);
  const token = jwt.sign({user: req.user.googleID}, JWT_KEY);
  const htmlWithEmbeddedJWT = `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('JWT_token', '${token}');
        // Redirect browser to root of application
        window.location.href = '/';
      </script>
    </html>
    `;

  res.send(htmlWithEmbeddedJWT);
  console.log('[Gateway-API][signToken][Response]', {token: token});
};

/**
 * @CristianValdivia & @DiegoSepulveda
 * Protect a route with JWT token
 * @description Define if a user can access to determine route
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.protectedRoute = (req, res, next) => {
  console.log('[Gateway-API][protectedRoute][Request]', req.params);
  let token = req.headers['authorization'];
  const deviceId = req.params.id;

  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, JWT_KEY, async (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][protectedRoute][Error]', {err});
        return res.status(500).json({error: 'Invalid Token'});
      } else {
        req.decoded = decoded;
        const googleID = decoded.user;
        try {
          const {userId, user} = await getUser(googleID);
          if (user === null) {
            console.log('[Gateway-API][protectedRoute][Error]', {error: 'User not found'});
            return res.status(500).json({error: 'User not found'});
          }

          const isAdminFlag = isAdmin(user);

          let userDeviceId = '';
          let device = {};

          if (!isAdminFlag) {
            device = await getDevice(userId);
          } else {
            device = null;
          }

          if (device === null && !isAdminFlag) {
            console.log('[Gateway-API][protectedRoute][Error]', {
              error: 'Device not found',
            });
            return res.status(500).json({error: 'No devices were found'});
          }

          if (device != null) {
            userDeviceId = device.deviceId;
          }

          if (userDeviceId === deviceId || isAdminFlag) {
            console.log('[Gateway-API][protectedRoute][Response]', req.decoded);
            next();
          } else {
            console.log('[Gateway-API][protectedRoute][Error]', {
              error: 'No right permissions for this device',
            });
            return res.status(500).json({error: 'Device does not match user'});
          }
        } catch (error) {
          console.log('[Gateway-API][protectedRoute][Error]', {error});
          return res.status(500).json({error});
        }
      }
    });
  } else {
    console.log('[Gateway-API][protectedRoute][Error]', {error: 'No token provided'});
    return res.status(500).json({error: 'No token provided'});
  }
};

/**
 * @CristianValdivia & @DiegoSepulveda
 * Route only available for admins
 * @description Define if the user accesing this route is an admin
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.adminRoute = (req, res, next) => {
  console.log('[Gateway-API][adminRoute][Request]', req.params);
  let token = req.headers['authorization'];

  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, JWT_KEY, async (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][adminRoute][Error]', {err});
        return res.status(500).json({error: 'Invalid Token'});
      } else {
        req.decoded = decoded;
        const googleID = decoded.user;
        try {
          const {userId, user} = await getUser(googleID);
          if (user === null) {
            console.log('[Gateway-API][adminRoute][Error]', {error: 'User not found'});
            return res.status(500).json({error: 'User not found'});
          }

          const isAdminFlag = isAdmin(user);

          if (isAdminFlag) {
            console.log('[Gateway-API][adminRoute][Response]', req.decoded);
            next();
          } else {
            console.log('[Gateway-API][adminRoute][Error]', {
              error: 'User is not an admin',
            });
            return res.status(500).json({error: 'User is not an admin'});
          }
        } catch {
          console.log('[Gateway-API][adminRoute][Error]', {error});
          return res.status(500).json({error});
        }
      }
    });
  } else {
    console.log('[Gateway-API][adminRoute][Error]', {error: 'No token provided'});
    return res.status(500).json({error: 'No token provided'});
  }
};

/**
 * @DixonOrtiz & @DiegoSepulveda
 * Route only available for admins
 * @description Define if the user accesing this route is an admin
 * @param  {object} req Request
 * @param  {object} res Response
 * @param  {Function} next Callback function
 */
exports.checkUser = (req, res, next) => {
  console.log('[Gateway-API][checkUser][Request]', req.params);
  let token = req.headers['authorization'];

  if (token) {
    token = token.replace('Bearer ', '');

    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][checkUser][Error]', {err});
        return res.status(500).json({error: 'Invalid Token'});
      } else {
        req.decoded = decoded;
        const googleID = decoded.user;

        if (req.body.user === googleID) {
          console.log('[Gateway-API][checkUser][Response]', req.decoded);
          next();
        } else {
          return res.status(500).json({error: "User doesn't match token"});
        }
      }
    });
  }
};
