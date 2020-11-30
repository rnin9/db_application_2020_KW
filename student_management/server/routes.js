const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('./controller');

router.post('/add/user', controller.add.user);              // signup 정보 추가
router.post('/add/friend',controller.add.friend);
router.post('/add/absense',controller.add.absense);
router.post('/add/eval',controller.add.eval);//수강 평가 추가
router.post('/add/notice',controller.add.notice);

router.post('/add/course',controller.add.course);//수강 내용 추가

router.post('/api/sendLogin',controller.api.sendLogin);     // login request
router.post('/update/userInfo',controller.update.userInfo); // update 유저 정보
router.post('/update/userPhoto',controller.update.userPhoto); //사진 업로드시, 받음
router.post('/update/userFriend/request',controller.update.requestHandle); //친구요청 받기 or 거절하기
router.post('/update/absense',controller.update.absense);
router.post('/update/noticeFile',controller.update.noticeFile);
router.post('/update/grade',controller.update.grade); // (교수가) 학생 성적 변경
router.post('/update/upvote',controller.update.upvote); // 좋아요 반영. 한 유저는 한 리뷰에 한 번만 좋아요 가능


router.get('/api/user',controller.api.user);                // 모든 유저의 정보 get
router.get('/api/userInfo',controller.api.userInfo);        // 특정 유저 정보 get

router.get('/api/userFriend/list',controller.api.userFriendList);    // 친구목록
router.get('/api/userFriend/request',controller.api.userFriendreq); // 친구요청했고, 아직 응답받지않은 목록
router.get('/api/userFriend/request/received',controller.api.userFriendreqrec); // 친구요청받은목록들 

router.get('/api/student/list',controller.api.studentList);

router.get('/api/userGrade',controller.api.userGrade);
router.get('/api/userMajorSubCredit',controller.api.userMajorSubCredit);
router.get('/api/userLiberalSubCredit',controller.api.userLiberalSubCredit);
router.get('/api/userEtcSubCredit',controller.api.userEtcSubCredit);
router.get('/api/userAllSubCredit',controller.api.userAllSubCredit);
router.get('/api/userMajorGetCredit',controller.api.userMajorGetCredit);
router.get('/api/userLiberalGetCredit',controller.api.userLiberalGetCredit);
router.get('/api/userEtcGetCredit',controller.api.userEtcGetCredit);
router.get('/api/userAllGetCredit',controller.api.userAllGetCredit);
router.get('/api/userMajorGrade',controller.api.userMajorGrade);
router.get('/api/userLiberalGrade',controller.api.userLiberalGrade);
router.get('/api/userEtcGrade',controller.api.userEtcGrade);
router.get('/api/userAllGrade',controller.api.userAllGrade);

router.get('/api/userEval',controller.api.userEval);
router.get('/api/userEval/tag',controller.api.userEvalTag);
router.get('/api/userEval/datail',controller.api.userEvalDetail);
router.get('/api/userEval/detail/tag',controller.api.userEvalDetailTag);

router.get('/api/absense/list',controller.api.absenseList);
router.get('/api/absense/continue/list',controller.api.absensectnList);

router.get('/api/notice/course',controller.api.noticeCourse);
router.get('/api/notice/course/professor',controller.api.noticeCourseProf);

router.get('/api/notice/list',controller.api.noticeList); // 교수용

router.get('/api/course',controller.api.course);
router.get('/api/profCourse',controller.api.profCourse);
router.get('/api/profCourseStudent',controller.api.profCourseStudent);
router.get('/api/timetable',controller.api.timeTable);

router.delete('/delete/friend/request',controller.delete.friendreq);
router.delete('/delete/absense',controller.delete.absense);
module.exports = router;
