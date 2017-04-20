const express = require('express');
const passport = require('passport');
const { auth } = require('../controllers');

const router = express.Router();

router.post('/login', auth.clientLogin);
router.post('/login/admin', auth.adminLogin);
router.get('/facebook', passport.authenticate('facebook-token'), auth.facebook);

module.exports = router;
