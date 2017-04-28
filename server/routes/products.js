const express = require('express');
const { products } = require('../controllers');
const { adminAuthentication } = require('../middleware/authentication');

const router = express.Router();

router.get('/', adminAuthentication(), products.list);
router.get('/:id', adminAuthentication(), products.show);
router.post('/', adminAuthentication(), products.create);
router.put('/:id', adminAuthentication(), products.update);
router.delete('/:id', adminAuthentication(), products.delete);

module.exports = router;
