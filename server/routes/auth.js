const express = require('express');
const { auth } = require('../controllers');

const router = express.Router();

router.post('/login', auth.clientLogin);
router.post('/login/admin', auth.adminLogin);
router.post('/forgot-password', auth.forgotPassword);

module.exports = router;
