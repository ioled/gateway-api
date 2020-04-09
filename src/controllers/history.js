const {defaultGetController} = require('./default');
const {HISTORY_URL} = require('../config/env');

const apiName = 'History';

exports.getDayData = async (req, res) => {
  const {id} = req.params;

  const query = `/day/${id}`;

  try {
    const {data} = await defaultGetController(apiName, HISTORY_URL, query);
    res.status(200).json({historyDay: data});
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getWeekData = async (req, res) => {
  const {id} = req.params;
  const query = `/week/${id}`;

  try {
    const {data} = await defaultGetController(apiName, HISTORY_URL, query);
    res.status(200).json({historyWeek: data});
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getMonthData = async (req, res) => {
  const {id} = req.params;
  const query = `/week/${id}`;

  try {
    const {data} = await defaultGetController(apiName, HISTORY_URL, query);
    res.status(200).json({historyMonth: data});
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
