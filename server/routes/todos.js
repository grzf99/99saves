const express = require('express');
const todosController = require('../controllers').todos;

const router = express.Router();

router.post('/', todosController.create);
router.get('/', todosController.list);
router.get('/:todoId', todosController.retrieve);
router.put('/:todoId', todosController.update);
router.delete('/:todoId', todosController.destroy);

module.exports = router;
