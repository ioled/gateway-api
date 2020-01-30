const axios = require('axios');
const {defaultGetController} = require('./default');

const apiName = 'Dashboard';
const DASHBOARD_URL = process.env.DASHBOARD_URL;
if (DASHBOARD_URL === undefined) {
  console.log('[API-GATEWAY][ERROR] No Dashboard URL specified in the env variables');
}

exports.getRegistry = async (req, res) => {
  console.log(`[API-GATEWAY][GET][DASHBOARD][ /registry ]`);
  const query = '/registry';

  try {
    const data = await defaultGetController(apiName, DASHBOARD_URL, query);
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
    const data = await defaultGetController(apiName, DASHBOARD_URL, query);
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
  const query = `/devices/${id}/state-history`;

  try {
    const data = await defaultGetController(apiName, DASHBOARD_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getDeviceConfig = async () => {
  const {id} = req.params;
  const query = `/devices/${id}/config-history`;

  try {
    const data = await defaultGetController(apiName, DASHBOARD_URL, query);
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
  console.log(`[API-GATEWAY][PUT][DASHBOARD][ /devices/${id}/config ]`);
  const {device} = req.body;
  const {config} = device;

  if (config === undefined) {
    console.log(`[API-GATEWAY][PUT][DASHBOARD][ /devices/${id}/config ][ERROR]: Config Undefined`);
    return res.status(500).send({error: 'Config undefined'});
  }

  try {
    const {data} = await axios.put(`${DASHBOARD_URL}/devices/${id}/config`, config);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(`[API-GATEWAY][PUT][DASHBOARD][ /devices/${id}/config ][ERROR]`, error);
    res.status(500).json({
      error,
    });
  }
};

exports.getUserByDevice = async (req, res) => {
  const {id} = req.params;
  const query = `/devices/${id}/user`;

  try {
    const data = await defaultGetController(apiName, DASHBOARD_URL, query);
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
  const query = `/devices/${id}/state`;

  try {
    const data = await defaultGetController(apiName, DASHBOARD_URL, query);
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
  const query = `/devices/${id}/config`;

  try {
    const data = await defaultGetController(apiName, DASHBOARD_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
