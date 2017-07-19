const express = require('express');
const { category } = require('../controllers');
const {
  clientAuthentication,
  adminAuthentication
} = require('../middleware/authentication');

const router = express.Router();


router.get('/', clientAuthentication(true), category.listActive);
router.get('/all', adminAuthentication(), category.list);
router.get('/:id', adminAuthentication(), category.show);
router.post('/', adminAuthentication(), category.create);
router.put('/:id', adminAuthentication(), category.update);
router.delete('/:id', adminAuthentication(), category.delete);

module.exports = router;
