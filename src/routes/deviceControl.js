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

const {protectedRoute} = require('../middlewares/checkJWT');

router.use(protectedRoute);

router.route('/deviceControl/registry').get(getRegistry);
router.route('/deviceControl/devices').get(getDevices);
router.route('/deviceControl/device/:id/state-history').get(getDeviceState);
router.route('/deviceControl/device/:id/state-config').get(getDeviceConfig);
router.route('/deviceControl/device/:id/config').put(upadateDeviceConfig);
router.route('/deviceControl/device/:id/user').get(getUserByDevice);
router.route('/deviceControl/device/:id/state').get(getDeviceLastState);
router.route('/deviceControl/device/:id/config').get(getDeviceLastConfig);

module.exports = router;
