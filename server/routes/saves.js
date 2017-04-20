const express = require('express');
const passport = require('passport');
const { saves, subscriptions, votes } = require('../controllers');

const router = express.Router();

router.post('/', saves.create);
router.get('/:id', saves.show);
router.get('/', (req, res, next) => {
  if (req.query.access_token) passport.authenticate('facebook-token')(req, res, next);
  else next();
}, saves.list);
router.put('/:id', saves.update);
router.delete('/:id', saves.delete);

router.post('/:saveId/subscriptions', passport.authenticate('facebook-token'), subscriptions.create);
// TODO: Adicionar autênticação
router.get('/:saveId/votes', passport.authenticate('facebook-token'), votes.show);
router.post('/:saveId/votes', passport.authenticate('facebook-token'), votes.create);

module.exports = router;
