const express = require('express');
const passport = require('passport');
const { saves, subscriptions, votes } = require('../controllers');

const router = express.Router();

router.post('/', saves.create);
router.get('/:id', saves.show);
router.get('/', (req, res, next) => {
  if (req.cookies['99-token'] || req.headers.Authorization) passport.authenticate('client-jwt')(req, res, next);
  else next();
}, saves.list);
router.put('/:id', saves.update);
router.delete('/:id', saves.delete);

router.post('/:saveId/subscriptions', passport.authenticate('client-jwt'), subscriptions.create);
// TODO: Adicionar autênticação
router.get('/:saveId/votes', passport.authenticate('client-jwt'), votes.show);
router.post('/:saveId/votes', passport.authenticate('client-jwt'), votes.create);

module.exports = router;
