const express = require('express');
const { saves, subscriptions, votes } = require('../controllers');
const {
  clientAuthentication,
  adminAuthentication
} = require('../middleware/authentication');

const router = express.Router();

// client
router.get('/:id', clientAuthentication(true), saves.show);
router.get('/', clientAuthentication(true), saves.list);
router.post(
  '/:saveId/subscriptions',
  clientAuthentication(),
  subscriptions.create
);
router.get('/:saveId/votes', clientAuthentication(), votes.show);
router.post('/:saveId/votes', clientAuthentication(), votes.create);

// admin
router.post('/', adminAuthentication(), saves.create);
router.put('/:id', adminAuthentication(), saves.update);
router.delete('/:id', adminAuthentication(), saves.delete);

module.exports = router;
