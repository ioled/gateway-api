const express = require('express');
const router = express.Router();

const {currentUser, getDevices, saveDevice, likUser} = require('../controllers/user');

const {adminRoute} = require('../middlewares/authService');

router.route('/user/currentUser').get(currentUser);

router.route('/user/devices').get(getDevices);

router.route('/user/saveDevice').post(adminRoute, saveDevice);

router.route('/user/linkUser/:userId/:deviceId').put(adminRoute, likUser);

module.exports = router;
