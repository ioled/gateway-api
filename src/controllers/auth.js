const {users, devices} = require('../services/mongodb');
const jwt = require('jsonwebtoken');

const {JWT_KEY} = require('../config/env');

exports.auth = async (req, res) => {
  const {id, device} = req.params;
  console.log(`[Gateway API][Auth][GET]`);
  try {
    const user = await users.findById(id);
    const userDevice = await devices.findOne({_user: id});
    if (userDevice.deviceId === device) {
      const token = jwt.sign({user: user._id, device: userDevice._id}, JWT_KEY);
      console.log(`[Gateway API][Auth][Response]`);
      res.status(200).json({token});
    } else {
      res.status(500).json({error: 'No match between user and device'});
    }
  } catch (error) {
    console.log(`[Gateway API][Auth][Error]`, error.message);
    res.status(500).json({error});
  }
};
