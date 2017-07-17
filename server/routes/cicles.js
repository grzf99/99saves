const express = require('express');
const { cicles, subscriptions, votes } = require('../controllers');
const {
  clientAuthentication,
  adminAuthentication
} = require('../middleware/authentication');

const router = express.Router();


router.get('/active', clientAuthentication(true), cicles.listActive);
router.get('/subscribed', clientAuthentication(), cicles.listSubscribed);
router.get('/all', adminAuthentication(), cicles.listAll);
router.get('/getCoupon/:id', clientAuthentication(), cicles.getCoupon);

// client
router.get('/:id', clientAuthentication(true), cicles.show);
router.get(
  '/:id/my-subscription',
  clientAuthentication(),
  cicles.mySubscription
);
router.post(
  '/:cicleId/subscriptions',
  clientAuthentication(),
  subscriptions.create
);
router.get('/:cicleId/votes', clientAuthentication(), votes.show);
router.post('/:cicleId/votes', clientAuthentication(), votes.create);

// admin
router.get('/:cicleId/cicle', adminAuthentication(), cicles.showCicle);
router.post('/', adminAuthentication(), cicles.create);
router.put('/:id', adminAuthentication(), cicles.update);
router.delete('/:id', adminAuthentication(), cicles.delete);
router.get(
  '/:cicleId/subscriptions',
  adminAuthentication(),
  cicles.listSubscriptions
);
router.get(
  '/:cicleId/users',
  adminAuthentication(),
  cicles.listUsers
);

router.get('/getScope/:scope', adminAuthentication(), cicles.getScope);

module.exports = router;
