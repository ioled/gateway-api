const axios = require('axios');
const {defaultGetController} = require('./default');
const {DEVICE_CONTROL_URL} = require('../config/env');

const apiName = 'Device Control';

exports.getRegistry = async (req, res) => {
  console.log(`[Gateway API][GET][Device Control][ /registry ]`);
  const query = '/registry';

  try {
    const data = await defaultGetController(apiName, DEVICE_CONTROL_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getDevices = async (req, res) => {
  const query = '/devices';

  try {
    const data = await defaultGetController(apiName, DEVICE_CONTROL_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getDeviceState = async (req, res) => {
  const {id} = req.params;
  const query = `/device/${id}/state-history`;

  try {
    const data = await defaultGetController(apiName, DEVICE_CONTROL_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getDeviceConfig = async (req, res) => {
  const {id} = req.params;
  const query = `/device/${id}/config-history`;

  try {
    const data = await defaultGetController(apiName, DEVICE_CONTROL_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.upadateDeviceConfig = async (req, res) => {
  const {id} = req.params;
  console.log(`[Gateway API][PUT][Device Control][ /devices/${id}/config ]`);
  const {device} = req.body;
  const {config} = device;

  if (config === undefined) {
    console.log(
      `[Gateway API][PUT][Device Control][ /device/${id}/config ][Error]: Config Undefined`,
    );
    return res.status(500).send({error: 'Config undefined'});
  }

  try {
    const {data} = await axios.put(`${DEVICE_CONTROL_URL}/device/${id}`, req.body);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(`[Gateway API][PUT][Device Control][ /device/${id}/config ][Error]`, error);
    res.status(500).json({
      error,
    });
  }
};

exports.getUserByDevice = async (req, res) => {
  const {id} = req.params;
  const query = `/device/${id}/user`;

  try {
    const data = await defaultGetController(apiName, DEVICE_CONTROL_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getDeviceLastState = async (req, res) => {
  const {id} = req.params;
  const query = `/device/${id}/state`;

  try {
    const data = await defaultGetController(apiName, DEVICE_CONTROL_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getDeviceLastConfig = async (req, res) => {
  const {id} = req.params;
  const query = `/device/${id}/config`;

  try {
    const data = await defaultGetController(apiName, DEVICE_CONTROL_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
