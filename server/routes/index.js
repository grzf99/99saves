const express = require('express');
const todosRouter = require('./todos');
const savesRouter = require('./saves');
const usersRouter = require('./users');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: '🤘',
}));

router.use('/todos', todosRouter);
router.use('/saves', savesRouter);
router.use('/users', usersRouter);

module.exports = router;
