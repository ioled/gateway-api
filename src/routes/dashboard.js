const express = require('express');
const router = express.Router();

const {
  getRegistry,
  getDevices,
  getDeviceState,
  getDeviceConfig,
  upadateDeviceConfig,
  getUserByDevice,
  getDeviceLastState,
  getDeviceLastConfig,
} = require('../controllers/dashboard');

const {protectedRoute} = require('../middlewares/checkJWT');

router.use(protectedRoute);

router.route('/dashboard/registry').get(getRegistry);
router.route('/dashboard/devices').get(getDevices);
router.route('/dashboard/devices/:id/state-history').get(getDeviceState);
router.route('/dashboard/devices/:id/state-config').get(getDeviceConfig);
router.route('/dashboard/devices/:id/config').put(upadateDeviceConfig);
router.route('/dashboard/devices/:id/user').get(getUserByDevice);
router.route('/dashboard/devices/:id/state').get(getDeviceLastState);
router.route('/dashboard/devices/:id/config').get(getDeviceLastConfig);
