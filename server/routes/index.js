const express = require('express');
const todosRouter = require('./todos');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: '🤘',
}));

router.use('/todos', todosRouter);

module.exports = router;
