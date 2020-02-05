const express = require('express');
const router = express.Router();

const {getDayData, getWeekData, getMonthData} = require('../controllers/history');

const {protectedRoute} = require('../middlewares/authService');

router.route('/history/day/:device').get(protectedRoute, getDayData);
router.route('/history/week/:device').get(protectedRoute, getWeekData);
router.route('/history/month/:device').get(protectedRoute, getMonthData);

module.exports = router;
