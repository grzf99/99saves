const express = require('express');
const savesRouter = require('./saves');
const usersRouter = require('./users');
const authRouter = require('./auth');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: '🤘',
}));

router.use('/saves', savesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;
