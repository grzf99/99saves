const express = require('express');
const providersController = require('../controllers').providers;

const router = express.Router();

router.get('/', providersController.list);
router.post('/', providersController.create);
router.get('/:id', providersController.show);
router.put('/:id', providersController.update);
router.delete('/:id', providersController.delete);

module.exports = router;
