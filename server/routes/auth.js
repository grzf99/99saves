const express = require('express');
const { auth } = require('../controllers');

const router = express.Router();

router.post('/login', auth.clientLogin);
router.post('/login/admin', auth.adminLogin);
router.post('/login/provider', auth.providerAdmin);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);

module.exports = router;
