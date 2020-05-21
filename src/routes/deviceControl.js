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
router.route('/deviceControl/device/:id/state-history').get(getDeviceState);
router.route('/deviceControl/device/:id/config-history').get(getDeviceConfig);
router.route('/deviceControl/device/:id/config').put(upadateDeviceConfig);
router.route('/deviceControl/device/:id/state').get(getDeviceLastState);
router.route('/deviceControl/device/:id/config').get(getDeviceLastConfig);

module.exports = router;
