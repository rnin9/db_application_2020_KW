const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/add/user', controller.add.user);
router.post('/api/sendLogin',controller.api.sendLogin);


module.exports = router;