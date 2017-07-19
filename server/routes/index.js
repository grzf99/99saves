const express = require('express');
const categoryRouter = require('./category');
const savesRouter = require('./saves');
const ciclesRouter = require('./cicles');
const usersRouter = require('./users');
const authRouter = require('./auth');
const providersRouter = require('./providers');
const productsRouter = require('./products');
const couponsRouter = require('./coupons');
const subscriptionsRouter = require('./subscriptions');

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).send({
    message: '🤘'
  })
);

router.use('/categories', categoryRouter);
router.use('/saves', savesRouter);
router.use('/cicles', ciclesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/providers', providersRouter);
router.use('/products', productsRouter);
router.use('/coupons', couponsRouter);
router.use('/subscriptions', subscriptionsRouter);

if (process.env.NODE_ENV !== 'production') {
  const emailsRouter = require('./emails');
  router.use('/emails', emailsRouter);
}

module.exports = router;
