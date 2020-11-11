const path = require('path');
const model = require('./model');
module.exports = {

  api:{
    sendLogin : (req, res) =>{
      const body = req.body;
    model.api.searchUser(body, result => {
      var obj={};
      if(result[0]){
        obj['success'] = true;
         
      } else{
        obj['success'] = false;
      }
      res.send(obj);

    });
    },
    user :(req, res)=>{
      model.api.getUser(result=>{
          res.send(result);
      });
    }
  },
    add:{
    user : (req, res) => {
      const data = req.body;
    model.add.user(data, result=>{
        res.send(result);
    });
    },
  },
}