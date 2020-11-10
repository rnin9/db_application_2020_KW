const path = require('path');
const model = require('./model');
module.exports = {

  api:{
    sendLogin : (req, res) =>{
      const body = req.body;
    model.api.searchUser(body, result => {
      if(result[0]){
        res.send(true);   
      } else{
        res.send(false);
      }
    });
    },
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