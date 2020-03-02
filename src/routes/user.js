const express = require('express');
const router = express.Router();

const {
  currentUser,
  getDevices,
  saveDevice,
  linkUser,
  getUserByDevice,
  getAllDevices,
} = require('../controllers/user');

const {protectedRoute, adminRoute} = require('../middlewares/authService');

router.route('/user/currentUser').get(currentUser);
router.route('/user/devices').get(getDevices);
router.route('/user/saveDevice').post(protectedRoute, saveDevice);
router.route('/user/linkUser/:userId/:deviceId').put(adminRoute, linkUser);
router.route('/user/allDevices').get(adminRoute, getAllDevices);
router.route('/user/device/:id/user').get(adminRoute, getUserByDevice);

module.exports = router;
