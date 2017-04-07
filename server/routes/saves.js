const express = require('express');
const passport = require('passport');
const savesController = require('../controllers').saves;
const subscriptionsController = require('../controllers').subscriptions;

const router = express.Router();

router.post('/', savesController.create);
router.get('/', (req, res, next) => {
  if (req.query.access_token) passport.authenticate('facebook-token')(req, res, next);
  else next();
}, savesController.list);
router.post('/:saveId/subscriptions', passport.authenticate('facebook-token'), subscriptionsController.create);

module.exports = router;
