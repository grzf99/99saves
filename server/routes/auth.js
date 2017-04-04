const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/facebook', passport.authenticate('facebook'));
router.get('/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
