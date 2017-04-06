const express = require('express');
const savesController = require('../controllers').saves;

const router = express.Router();

router.post('/', savesController.create);
router.get('/', savesController.list);

module.exports = router;
