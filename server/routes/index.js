const express = require('express');
const savesRouter = require('./saves');
const usersRouter = require('./users');
const authRouter = require('./auth');
const providersRouter = require('./providers');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: '🤘',
}));

router.use('/saves', savesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/providers', providersRouter);

module.exports = router;
