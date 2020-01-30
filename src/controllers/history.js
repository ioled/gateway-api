const {defaultGetController} = require('./default');

const apiName = 'History';
const HISTORY_URL = process.env.HISTORY_URL;
if (HISTORY_URL === undefined) {
  console.log('[API-GATEWAY][ERROR] No History URL specified in the env variables');
}

exports.getDayGraph = async (req, res) => {
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

exports.getWeekGraph = async (req, res) => {
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

exports.getMonthGraph = async (req, res) => {
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
