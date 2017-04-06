const express = require('express');
const savesController = require('../controllers').saves;

const router = express.Router();

router.post('/', savesController.create);
router.get('/', savesController.list);
router.put('/:id', savesController.update);

module.exports = router;
