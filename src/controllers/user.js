const jwt = require('jsonwebtoken');
const axios = require('axios');
const {JWT_KEY} = require('../config/env');
const {USER_URL} = require('../config/env');

exports.currentUser = async (req, res) => {
  console.log('[Gateway-API][GET][USER API][ /currentUser ][Request]', req.params, req.body);
  let token = req.headers['authorization'];
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, JWT_KEY, async (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][GET][USER API][ /currentUser ][Error]: Invalid token');
        return res.send(false);
      } else {
        const {user} = decoded;
        try {
          const {data} = await axios.post(`${USER_URL}/user`, {user});
          console.log('[Gateway-API][GET][USER API][ /currentUser ][Response]', data);
          res.status(200).send(data);
        } catch (error) {
          console.log('[Gateway-API][GET][USER API][ /currentUser ][Error]', error);
          return res.json({error});
        }
      }
    });
  } else {
    console.log('[Gateway-API][GET][USER API][ /currentUser ][Error]: No token');
    return res.send(false);
  }
};

exports.getDevices = async (req, res) => {
  console.log('[Gateway-API][GET][USER API][ /devices ][Request]', req.params, req.body);
  let token = req.headers['authorization'];
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, JWT_KEY, async (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][GET][USER API][ /devices ][Error]: Invalid token');
        return res.send(false);
      } else {
        const {user} = decoded;
        try {
          const {data} = await axios.post(`${USER_URL}/devices`, {user});
          console.log('[Gateway-API][GET][USER API][ /devices ][Response]', data);
          res.status(200).send(data);
        } catch (error) {
          console.log('[Gateway-API][GET][USER API][ /devices ][Error]', error);
          return res.json({error});
        }
      }
    });
  } else {
    console.log('[Gateway-API][GET][USER API][ /currentUser ][Error]: No token');
    return res.send(false);
  }
};
