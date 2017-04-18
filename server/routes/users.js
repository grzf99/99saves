const express = require('express');
const { users } = require('../controllers');

const router = express.Router();

router.get('/', users.list);
router.post('/', usersController.post);

module.exports = router;
