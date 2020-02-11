const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/env');
const {users, devices} = require('../services/mongodb');
const {ObjectId} = require('mongoose').Types;

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

const getUser = async (googleID) => {
  const user = await users.findOne({googleID});
  return user;
};

const getDevice = async (userId) => {
  const device = await devices.findOne({_user: new ObjectId(userId)});
  return device;
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
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][protectedRoute][Error]', {err});
        return res.status(500).json({error: 'Invalid Token'});
      } else {
        req.decoded = decoded;
        const googleID = decoded.user;
        try {
          getUser(googleID).then(
            (userResp) => {
              const user = userResp;
              if (user) {
                const userId = user._id;

                getDevice(userId).then(
                  (deviceResp) => {
                    const device = deviceResp;
                    if (device) {
                      if (device.deviceId === deviceId) {
                        console.log('[Gateway-API][protectedRoute][Response]', req.decoded);
                        next();
                      } else {
                        console.log('[Gateway-API][protectedRoute][Error]', {
                          error: 'Device does not match user',
                        });
                        return res.status(500).json({error: 'Device does not match user'});
                      }
                    } else {
                      console.log('[Gateway-API][protectedRoute][Error]', {
                        error: 'Device not found',
                      });
                      return res.status(500).json({error: 'No devices were found'});
                    }
                  },
                  (error) => {
                    console.log('[Gateway-API][protectedRoute][Error]', {error});
                    return res.status(500).json({error});
                  },
                );
                // TODO: Add user: 'admin' logic
              } else {
                console.log('[Gateway-API][protectedRoute][Error]', {error: 'User not found'});
                return res.status(500).json({error: 'User not found'});
              }
            },
            (error) => {
              console.log('[Gateway-API][protectedRoute][Error]', {error});
              return res.status(500).json({error});
            },
          );
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
