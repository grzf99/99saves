const express = require('express');
const { users } = require('../controllers');

const router = express.Router();

router.get('/', users.list);

module.exports = router;
