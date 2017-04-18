const express = require('express');
const { users } = require('../controllers');

const router = express.Router();

router.get('/', users.list);
router.post('/', users.create);

module.exports = router;
