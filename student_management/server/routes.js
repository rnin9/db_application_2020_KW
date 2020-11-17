const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('./controller');

router.post('/add/user', controller.add.user);              // signup 정보 추가
router.post('/add/friend',controller.add.friend);

router.post('/api/sendLogin',controller.api.sendLogin);     // login request
router.post('/update/userInfo',controller.update.userInfo); // update 유저 정보
router.post('/update/userPhoto',controller.update.userPhoto); //사진 업로드시, 받음


router.get('/api/user',controller.api.user);                // 모든 유저의 정보 get
router.get('/api/userInfo',controller.api.userInfo);        // 특정 유저 정보 get
router.get('/api/userGrade',controller.api.userGrade);

module.exports = router;