const express = require('express');
const router = express.Router();

const {currentUser} = require('../controllers/user');

router.route('/user/currentUser').get(currentUser);

module.exports = router;
