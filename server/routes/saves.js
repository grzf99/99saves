const express = require('express');
const { saves, subscriptions, votes } = require('../controllers');
const {
  clientAuthentication,
  adminAuthentication
} = require('../middleware/authentication');

const router = express.Router();


router.get('/', adminAuthentication(), saves.list);
router.get('/:id', adminAuthentication(), saves.show);
router.post('/', adminAuthentication(), saves.create);
router.put('/:id', adminAuthentication(), saves.update);
router.delete('/:id', adminAuthentication(), saves.delete);

module.exports = router;
