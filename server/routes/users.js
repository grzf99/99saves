const express = require('express');
const { users } = require('../controllers');
const { adminAuthentication } = require('../middleware/authentication');

const router = express.Router();

router.post('/', users.create);
router.get('/available', users.isAvailable);

router.post('/create-admin', adminAuthentication(), users.createAdmin);
router.get('/', adminAuthentication(), users.list);
router.get('/:id', adminAuthentication(), users.show);
router.put('/:id', adminAuthentication(), users.update);

module.exports = router;
