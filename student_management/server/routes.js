const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/add/user', controller.add.user);
router.post('/api/sendLogin',controller.api.sendLogin);
router.post('/update/userInfo',controller.update.userInfo);
router.get('/api/user',controller.api.user);
router.get('/api/userInfo',controller.api.userInfo);
router.get('/api/userGrade',controller.api.userGrade);

module.exports = router;