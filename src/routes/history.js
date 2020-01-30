const express = require('express');
const router = express.Router();

const {getDayGraph, getWeekGraph, getMonthGraph} = require('../controllers/history');

const {protectedRoute} = require('../middlewares/checkJWT');

router.use(protectedRoute);

router.route('/history/day/:device').get(getDayGraph);
router.route('/history/week/:device').get(getWeekGraph);
router.route('/history/month/:device').get(getMonthGraph);

module.exports = router;
