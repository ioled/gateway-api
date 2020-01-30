const {users, devices} = require('../services/mongodb');
const {Types} = require('mongoose');
const jwt = require('jsonwebtoken');

const {JWT_KEY} = require('../config/env');

exports.auth = async (req, res) => {
  // const { id, device } = req.body;
  const {id, device} = req.params;
  try {
    const user = await users.findById(id);
    const userDevice = await devices.findOne({_user: id});
    if (userDevice.deviceId === device) {
      const token = jwt.sign({user: user._id, device: userDevice._id}, JWT_KEY);
      res.status(200).json({token});
    } else {
      res.status(500).json({error: 'No match between user and device'});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error});
  }
};
