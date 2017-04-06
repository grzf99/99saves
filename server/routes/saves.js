const express = require('express');
const passport = require('passport');
const savesController = require('../controllers').saves;
const subscriptionsController = require('../controllers').subscriptions;

const router = express.Router();

router.post('/', savesController.create);
router.get('/', savesController.list);
router.post('/:saveId/subscriptions', passport.authenticate('facebook-token'), subscriptionsController.create);

module.exports = router;
