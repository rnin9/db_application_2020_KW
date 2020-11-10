const express = require('express');
const router = express.Router();
const controller = require('./controller');



router.post('/add/user', controller.add.user);


module.exports = router;