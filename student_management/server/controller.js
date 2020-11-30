const path = require('path');
const model = require('./model');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

var storages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/file/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})


var upload = multer({ storage: storage }).single('file')
var uploads = multer({ storage: storages }).single('file')



module.exports = {

  api: {
    sendLogin: (req, res) => {        //api key를 이용한 values (sendLogin)
      const body = req.body;
      model.api.searchUser(body, result => {
        var obj = {};
        if (result[0]) {
          obj['success'] = true;
          obj['id'] = result[0].dataValues.userID;
          obj['name'] = result[0].dataValues.userName;
          obj['position'] = result[0].dataValues.userPosition; //로그인시 정보 보내기
          obj['year'] = 2020;
          obj['semester'] = 2;

        } else {
          obj['success'] = false;
        }
        res.send(obj);                // result를 대기했던 axios로 전달

      });
    },
    user: (req, res) => {        //api key를 이용한 values (user)
      model.api.getUser(result => {
        res.send(result);     // result를 대기했던 axios로 전달

      });
    },
    userInfo: (req, res) => {
      const body = req.query[0]
      model.api.getUserInfo(body, result => {
        res.send(result);
      });
    },
    userFriendList: (req, res) => {
      const body = req.query[0]
      model.api.getUserFriendList(body, result => {
        res.send(result);
      })
    },
    timeTable: (req, res) => {
      const body = req.query
      console.log(body);
      model.api.getTimeTable(body, result => {
        res.send(result);
      })
    },
    userGrade: (req, res) => {
      const body = req.query[0]

      model.api.getUserGrade(body,result=>{
        if(result[0]){
          //console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userGradeNow: (req, res) => {
      const body = req.query;
      model.api.getUserGradeNow(body,result=>{
        if(result[0]){
          //console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userClassificationGraph: (req, res) => {
      const body = req.query[0];
      console.log(body);
      model.api.getUserClassificationGraph(body,result=>{
        if(result[0]){
          //console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userGradeGraph: (req, res) => {
      const body = req.query[0];
      console.log(body);
      model.api.getUserGradeGraph(body,result=>{
        if(result[0]){
          //console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userMajorSubCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserMajorSubCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userLiberalSubCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserLiberalSubCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userEtcSubCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserEtcSubCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userAllSubCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserAllSubCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userMajorGetCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserMajorGetCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userLiberalGetCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserLiberalGetCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
      });
    },


    userEtcGetCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserEtcGetCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
        });
    },
    userAllGetCredit:(req, res)=>{
      const body = req.query[0]
      model.api.getUserAllGetCredit(body,result=>{
        if(result[0]){
          console.log(result[0]);
          res.send(result[0]);
        }
      });
    },
    userGetCredit: (req, res) => {
      const body = req.query[0]
      model.api.getUserGetCredit(body, result => {
        if (result[0])
          res.send(result[0]);
      });
    },

    userMajorGrade:(req, res)=>{
      const body = req.query[0]
      model.api.getUserMajorGrade(body,result=>{
        if(result[0])
        res.send(result[0]);
        });
    },
    userLiberalGrade:(req, res)=>{
      const body = req.query[0]
      model.api.getUserLiberalGrade(body,result=>{
        if(result[0])
        res.send(result[0]);
        });
    },
    userEtcGrade:(req, res)=>{
      const body = req.query[0]
      model.api.getUserEtcGrade(body,result=>{
        if(result[0])
        res.send(result[0]);
        });
    },
    userAllGrade:(req, res)=>{
      const body = req.query[0]
      model.api.getUserAllGrade(body, result => {
        if (result[0])
          res.send(result[0]);
      });
    },
    userEval: (req, res) => {        //api key를 이용한 values (user)
      model.api.getUserEval(result => {
        res.send(result);     // result를 대기했던 axios로 전달
  });
    },
    userFriendreq: (req, res) => {
      const body = req.query[0]
      model.api.getUserFriendreq(body, result => {
        return res.send(result)
      })
    },

    course: (req, res) => {
      const body =req.query;
      model.api.getCourse(body, result => {
        console.log(result[0]);
        res.send(result[0]);
      })
    },
    profCourse: (req, res) => {
      const body = req.query[0];
      console.log(req.query[0]);
      model.api.getProfCourse(body,result => {
        
        res.send(result[0]);
      })
    },
    profCourseStudent: (req, res) => {
      const body = req.query;
      model.api.getProfCourseStudent(body,result => {
        
        res.send(result[0]);
      })
    },
    userEval:(req, res)=>{        //api key를 이용한 values (user)
      model.api.getUserEval(result=>{
        res.send(result[0]);     // result를 대기했던 axios로 전달    
      });
    },
    userEvalTag:(req, res)=>{
      const body = req.query[0];
      //console.log(req.query);
      model.api.getUserEvalTag(body,result=>{
        if(result[0])
          //console.log(result[0]);
          res.send(result[0]);
      });
    },
    userEvalDetailTag:(req, res)=>{
      const body = req.query;
      console.log(req.query);
      model.api.getUserEvalDetailTag(body,result=>{
        if(result[0])
          console.log(result[0]);
          res.send(result[0]);
      });
    },
    userEvalDetail:(req, res)=>{        //api key를 이용한 values (user)
      const body = req.query[0];
      console.log(body);
      model.api.getUserEvalDetail(body,result=>{
        res.send(result[0]);     // result를 대기했던 axios로 전달    
      });
    },
    userFriendreqrec: (req, res) => {
      const body = req.query[0]
      model.api.getUserFriendreqrec(body, result => {
        return res.status(200).json({ success: true, friendreqrec: result })
      })
    },
    studentList: (req, res) => {
      const body = req.query
      model.api.getStudentList(body, result => {
        res.send(result)
      })
    },
    absenseList:(req, res)=>{
      const body = req.query[0]
      model.api.getAbsenseList(body, result=>{
        if(result[0])
        res.send(result)
        else
        res.send(false)
      })
    },
    absensectnList:(req, res)=>{
      const body = req.query[0]
      model.api.getAbsensectnList(body, result=>{
        if(result[0])
        res.send(result)
        else
        res.send(false)
      })
    },
    noticeCourse:(req,res)=>{
      const body = req.query
      model.api.getNoticeCourse(body, result=>{
        res.send(result)
      })
    },
    noticeCourseProf:(req,res)=>{
      const body =req.query
      model.api.getNoticeCourseProf(body, result=>{
        res.send(result)
      })
    },
    noticeList:(req,res)=>{
      const body =req.query
      console.log(body)
      model.api.getNoticeList(body,result=>{
        res.send(result)
      })
    }
  },
  add: {
    user: (req, res) => {   //add key를 이용한 values (user)
      const data = req.body;
      model.add.user(data, result => {
        res.send(result);   // result를 대기했던 axios로 전달
      });
    },
    friend: (req, res) => {
      const data = req.body.data;
      model.add.friend(data, result => {
        if (result.success === false) {
          return res.json({ success: false, friendreqInfo: result.data })
        }
        else {
          return res.json({ success: true, friendreqInfo: result })
        }
      })
    },
    absense: (req, res) => {
      const data = req.body.data;
      model.add.absense(data, result => {
        return res.send(result)
      })
    },
    course:(req,res) => {
      const data = req.body;
      model.add.course(data, result => {
        return res.send(result)
      })
    },
    evaluation:(req,res)=>{
      const data =req.body.data;
      model.add.evaluation(data,result=>{
          return res.send(result)
      })
    },
    notice:(req,res)=>{
      const data =req.body.data;
      model.add.notice(data,result=>{
        res.send(result)
      })
    }
  },
  update: {
    userInfo: (req, res) => {
      const data = req.body
      model.update.setUserInfo(data, result => {
        res.send(result);
      })
    },
    userPhoto: (req, res) => {
      upload(req, res, err => {
        if (err) {
          return req.json({ success: false, err })
        }
        return res.json({ success: true, filepath: res.req.file.path, filename: res.req.file.filename })
      })
    },
    requestHandle: (req, res) => {
      const data = req.body
      model.update.setHandle(data, result => {
        res.send(result)
      })
    },
    absense:(req,res)=>{
      const data = req.body
      model.update.absenseReturning(data,result=>{
        res.send(result)
      })
    },
    grade:(req,res)=>{
      const data = req.body
      model.update.grade(data,result=>{
        res.send(result)
      })
    },
    upvote:(req,res)=>{
      const data=req.body;
      console.log(data);
      model.update.upvote(data,result=>{
        res.send(result);
      })
    },
    noticeFile:(req,res)=>{
      uploads(req, res, err => {
        if (err) {
          return req.json({ success: false, err })
        }
        return res.json({ success: true, filepath: res.req.file.path, filename: res.req.file.filename })
       })
    },
  },
  delete: {
    friendreq: (req, res) => {
      const data = req.body
      model.delete.deleteFriendreq(data, result => {
        return res.json({ success: true, friendreqInfo: result })
      })
    },
    absense:(req,res)=>{
      const data = req.body
      model.delete.deleteAbsense(data,result=>{
        res.send(result)
      })
    },
    course:(req,res)=>{
      const data = req.body
      model.delete.deleteCourse(data,result=>{
        res.send(result)
      })
    },
  }
}
