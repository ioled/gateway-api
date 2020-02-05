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
} = require('../controllers/deviceControl');

const {protectedRoute} = require('../middlewares/authService');

router.route('/deviceControl/registry').get(getRegistry);
router.route('/deviceControl/devices').get(getDevices);
router.route('/deviceControl/device/:id/state-history').get(protectedRoute, getDeviceState);
router.route('/deviceControl/device/:id/state-config').get(protectedRoute, getDeviceConfig);
router.route('/deviceControl/device/:id/config').put(protectedRoute, upadateDeviceConfig);
router.route('/deviceControl/device/:id/user').get(protectedRoute, getUserByDevice);
router.route('/deviceControl/device/:id/state').get(protectedRoute, getDeviceLastState);
router.route('/deviceControl/device/:id/config').get(protectedRoute, getDeviceLastConfig);

module.exports = router;
