const axios = require('axios');
const {MAILER_URL} = require('../config/env');

exports.sendMail = async (req, res) => {
  console.log(`[Gateway API][POST][Mailer][ /sendMail ]`, req.body);

  const {name, email, phone, commune, size, topic} = req.body;

  const body = {
    name,
    email,
    phone,
    commune,
    size,
    topic,
  };

  try {
    const {data} = await axios.post(`${MAILER_URL}/send`, body);
    res.status(200).json({emailSent: data});
  } catch (error) {
    console.log(`[Gateway API][POST][Mailer][ /sendMail ][Error]`, error);
    res.status(500).json({
      error,
    });
  }
};
