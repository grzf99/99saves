const express = require('express');
const { auth } = require('../controllers');

const router = express.Router();

router.post('/login', auth.clientLogin);
router.post('/login/admin', auth.adminLogin);

module.exports = router;
