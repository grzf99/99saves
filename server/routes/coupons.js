const express = require('express');
const { coupons } = require('../controllers');
const { adminAuthentication } = require('../middleware/authentication');

const router = express.Router();

router.get('/', adminAuthentication(), coupons.list);
router.put('/:id', adminAuthentication(), coupons.update);
router.delete('/:id', adminAuthentication(), coupons.delete);

module.exports = router;
