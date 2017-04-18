const express = require('express');
const passport = require('passport');
const { auth as authController } = require('../controllers');

const router = express.Router();

router.get('/login', authController.login);
router.get('/facebook', passport.authenticate('facebook-token'), authController.facebook);

module.exports = router;
