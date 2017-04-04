const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/facebook', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    res.status(200).send({
      user: req.user,
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
