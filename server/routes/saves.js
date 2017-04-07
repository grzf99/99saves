const express = require('express');
const savesController = require('../controllers').saves;

const router = express.Router();

router.post('/', savesController.create);
router.get('/', savesController.list);
router.put('/:id', savesController.update);
router.delete('/:id', savesController.delete);

module.exports = router;
