const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/env');
const {users, devices, isAdmin} = require('../services/mongodb');
const {ObjectId} = require('mongoose').Types;

const getUser = async (googleID) => {
  try {
    const user = await users.findOne({googleID});
    return user;
  } catch (error) {
    console.log('[Gateway-API][getUser]', error);
    return null;
  }
};

const getDevice = async (userId) => {
  try {
    const device = await devices.findOne({_user: new ObjectId(userId)});
    return device;
  } catch (error) {
    console.log('[Gateway-API][getUser]', error);
    return null;
  }
};

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
          const user = await getUser(googleID);
          if (user === undefined) {
            console.log('[Gateway-API][protectedRoute][Error]', {error: 'User not found'});
            return res.status(500).json({error: 'User not found'});
          }
          const userId = user._id;

          let userDeviceId = '';
          let device = {};

          if (!isAdmin(userId)) {
            console.log(userId);
            device = await getDevice(userId);
          } else {
            device = null;
          }

          if (device === null && !isAdmin(userId)) {
            console.log('[Gateway-API][protectedRoute][Error]', {
              error: 'Device not found',
            });
            return res.status(500).json({error: 'No devices were found'});
          }

          if (device != null) {
            userDeviceId = device.deviceId;
          }

          if (userDeviceId === deviceId || isAdmin(userId)) {
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
