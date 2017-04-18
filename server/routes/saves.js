const express = require('express');
const passport = require('passport');
const savesController = require('../controllers').saves;
const subscriptionsController = require('../controllers').subscriptions;
const votesController = require('../controllers').votes;

const router = express.Router();

router.post('/', savesController.create);
router.get('/:id', savesController.show);
router.get('/', (req, res, next) => {
  if (req.query.access_token) passport.authenticate('facebook-token')(req, res, next);
  else next();
}, savesController.list);
router.put('/:id', savesController.update);
router.delete('/:id', savesController.delete);

router.post('/:saveId/subscriptions', passport.authenticate('facebook-token'), subscriptionsController.create);
// TODO: Adicionar autênticação
router.get('/:saveId/votes', /* passport.authenticate('facebook-token'), */votesController.show);
router.post('/:saveId/votes', /* passport.authenticate('facebook-token'), */votesController.create);

module.exports = router;
