const jwt = require('jsonwebtoken');
const axios = require('axios');
const {defaultGetController} = require('./default');
const {JWT_KEY} = require('../config/env');
const {USER_URL} = require('../config/env');

const apiName = 'User';

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

exports.saveDevice = async (req, res) => {
  console.log(`[Gateway API][POST][USER API][ /saveDevice ][Request]`, req.params, req.body);

  try {
    const {user, deviceID, power} = req.body;

    const device = {
      user,
      deviceID,
      power,
    };

    const resp = await axios.post(`${USER_URL}/saveDevice`, device);
    const {newDevice} = resp.data;

    console.log(`[Gateway API][POST][USER API][ /saveDevice ][Response]`, {newDevice});
    res.status(200).json({newDevice});
  } catch (error) {
    console.log(`[Gateway API][POST][USER API][ /saveDevice ][Error]`, error);
    res.status(500).json({
      error,
    });
  }
};

exports.changeDevice = async (req, res) => {
  console.log(`[Gateway API][POST][USER API][ /changeDevice ][Request]`, req.params, req.body);

  try {
    const {device} = req.body;
    const resp = await axios.post(`${USER_URL}/changeDevice`, device);
    console.log(`[Gateway API][POST][USER API][ /changeDevice ][Response]`, resp.config.data);
    res.status(200).json({
      message: 'Config updated',
    });
  } catch (error) {
    console.log(`[Gateway API][POST][USER API][ /changeDevice ][Error]`, error);
    res.status(500).json({
      error,
    });
  }
};

exports.linkUser = async (req, res) => {
  console.log(`[Gateway API][PUT][USER API][ /linkUser ][Request]`, req.params, res.body);

  try {
    const {userId, deviceId} = req.params;
    const resp = await axios.put(`${USER_URL}/linkUser/${userId}/${deviceId}`);
    const {updatedDevice} = resp.data;

    console.log(`[Gateway API][PUT][USER API][ /linkUser ][Response]`, {updatedDevice});
    res.status(200).json({updatedDevice});
  } catch (error) {
    console.log(`[Gateway API][POPUTST][USER API][ /linkUser ][Error]`, error);
    res.status(500).json({
      error,
    });
  }
};

exports.getAllDevices = async (req, res) => {
  const query = '/allDevices';

  try {
    const {data} = await defaultGetController(apiName, USER_URL, query);
    res.status(200).json({devices: data});
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getUserByDevice = async (req, res) => {
  console.log('FLAG!');
  const {id} = req.params;
  const query = `/device/${id}/user`;
  console.log('QUERY:', query);

  try {
    const {data} = await defaultGetController(apiName, USER_URL, query);
    res.status(200).json({user: data});
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
