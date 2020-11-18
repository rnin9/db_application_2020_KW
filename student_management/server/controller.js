const path = require('path');
const model = require('./model');
module.exports = {

  api:{
    sendLogin : (req, res) =>{        //api key를 이용한 values (sendLogin)
      const body = req.body;
    model.api.searchUser(body, result => {
      var obj={};
      if(result[0]){                
        obj['success'] = true;
        obj['id'] = result[0].dataValues.userID;
        obj['name'] = result[0].dataValues.userName;
        obj['position'] = result[0].dataValues.userPosition; //로그인시 정보 보내기
         
      } else{
        obj['success'] = false;
      }
      res.send(obj);                // result를 대기했던 axios로 전달

    });
    },
    user :(req, res)=>{        //api key를 이용한 values (user)
      model.api.getUser(result=>{
          res.send(result);     // result를 대기했던 axios로 전달
    
      });
    },
    userInfo:(req, res)=>{
      const body = req.query[0]
      model.api.getUserInfo(body,result=>{
        if(result[0])
        res.send(result);
        });
    },
    userGrade:(req, res)=>{
      const body = req.query[0]
      model.api.getUserGrade(body,result=>{
        if(result[0])
        res.send(result);
        });
    },
    userEval:(req, res)=>{        //api key를 이용한 values (user)
      model.api.getUserEval(result=>{
          res.send(result);     // result를 대기했던 axios로 전달
    
      });
    },
  },
    add:{
    user : (req, res) => {   //add key를 이용한 values (user)
      const data = req.body;
    model.add.user(data, result=>{
        res.send(result);   // result를 대기했던 axios로 전달
    });
    },
  },
  update:{
    userInfo : (req, res)=>{
      const data = req.body
    model.update.setUserInfo(data, result=>{
      res.send(result);
    })
    }
  }
}