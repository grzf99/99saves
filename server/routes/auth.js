const express = require('express');
const passport = require('passport');
const { auth } = require('../controllers');

const router = express.Router();

router.get('/login', auth.login);
router.get('/facebook', passport.authenticate('facebook-token'), auth.facebook);

module.exports = router;
