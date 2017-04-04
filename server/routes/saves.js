const express = require('express');
const savesController = require('../controllers').saves;

const router = express.Router();

router.get('/', savesController.list);

module.exports = router;
