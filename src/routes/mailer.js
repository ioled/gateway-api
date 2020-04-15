const {Router} = require('express');
const router = Router();

const {sendMail} = require('../controllers/mailer');

router.route('/sendMail').post(sendMail);

module.exports = router;
