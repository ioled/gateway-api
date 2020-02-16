const express = require('express');
const router = express.Router();

const {currentUser, getDevices} = require('../controllers/user');

router.route('/user/currentUser').get(currentUser);

router.route('/user/devices').get(getDevices);

module.exports = router;
