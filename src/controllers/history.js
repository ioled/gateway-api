const {defaultGetController} = require('./default');
const {HISTORY_URL} = require('../config/env');

const apiName = 'History';

exports.getDayData = async (req, res) => {
  const {device} = req.params;

  const query = `/day/${device}`;

  try {
    const data = await defaultGetController(apiName, HISTORY_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getWeekData = async (req, res) => {
  const {device} = req.params;
  const query = `/week/${device}`;

  try {
    const data = await defaultGetController(apiName, HISTORY_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getMonthData = async (req, res) => {
  const {device} = req.params;
  const query = `/week/${device}`;

  try {
    const data = await defaultGetController(apiName, HISTORY_URL, query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
