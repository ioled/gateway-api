const express = require('express');
const router = express.Router();

const {
  getRegistry,
  getDeviceState,
  getDeviceConfig,
  upadateDeviceConfig,
  getDeviceLastState,
  getDeviceLastConfig,
} = require('../controllers/deviceControl');

const {protectedRoute, adminRoute} = require('../middlewares/authService');

router.route('/deviceControl/registry').get(adminRoute, getRegistry);
router.route('/deviceControl/device/:id/state-history').get(protectedRoute, getDeviceState);
router.route('/deviceControl/device/:id/config-history').get(protectedRoute, getDeviceConfig);
router.route('/deviceControl/device/:id/config').put(protectedRoute, upadateDeviceConfig);
router.route('/deviceControl/device/:id/state').get(protectedRoute, getDeviceLastState);
router.route('/deviceControl/device/:id/config').get(protectedRoute, getDeviceLastConfig);

module.exports = router;
