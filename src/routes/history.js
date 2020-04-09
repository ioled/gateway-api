const express = require('express');
const router = express.Router();

const {getDayData, getWeekData, getMonthData} = require('../controllers/history');

const {protectedRoute} = require('../middlewares/authService');

router.route('/history/day/:id').get(protectedRoute, getDayData);
router.route('/history/week/:id').get(protectedRoute, getWeekData);
router.route('/history/month/:id').get(protectedRoute, getMonthData);

module.exports = router;
