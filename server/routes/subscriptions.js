const express = require('express');
const { subscriptions } = require('../controllers');
const { clientAuthentication } = require('../middleware/authentication');

const router = express.Router();

router.put('/:id', clientAuthentication(), subscriptions.update);

module.exports = router;
