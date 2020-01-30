const express = require('express');
const router = express.Router();

const {auth} = require('../controllers/auth');

router.route('/auth/user/:id/device/:device').get(auth);

module.exports = router;
