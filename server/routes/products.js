const express = require('express');
const { products } = require('../controllers');

const router = express.Router();

router.get('/', products.list);
router.get('/:id', products.show);
router.post('/', products.create);
router.put('/:id', products.update);
router.delete('/:id', products.delete);

module.exports = router;
