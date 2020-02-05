const express = require('express');
const router = express.Router();

// Import all controllers for authentication.
const {authRequest, authCallback, authRedirect} = require('../controllers/auth');
const {verifyToken} = require('../middlewares/authService');

// Router middleware to handle auth routes.
router.route('/auth/google').get(authRequest);
router.route('/auth/google/callback').get(authCallback, authRedirect);

router.route('/verify').get(verifyToken);

// Export router to use it in the main app.
module.exports = router;
