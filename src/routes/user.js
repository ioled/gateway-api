const express = require('express');
const router = express.Router();

const {
  currentUser,
  getDevices,
  saveDevice,
  linkUser,
  getUserByDevice,
  getAllDevices,
  changeDevice,
} = require('../controllers/user');

const {adminRoute, checkUser} = require('../middlewares/authService');

router.route('/user/currentUser').get(currentUser);
router.route('/user/devices').get(getDevices);
router.route('/user/saveDevice').post(checkUser, saveDevice);
router.route('/user/changeDevice').post(changeDevice);
router.route('/user/linkUser/:userId/:deviceId').put(adminRoute, linkUser);
router.route('/user/allDevices').get(adminRoute, getAllDevices);
router.route('/user/device/:id/user').get(adminRoute, getUserByDevice);

module.exports = router;
