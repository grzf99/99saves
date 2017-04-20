const express = require('express');
const { providers } = require('../controllers');

const router = express.Router();

router.get('/', providers.list);
router.post('/', providers.create);
router.get('/:id', providers.show);
router.put('/:id', providers.update);
router.delete('/:id', providers.delete);

module.exports = router;
