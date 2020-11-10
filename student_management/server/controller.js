const path = require('path');
const model = require('./model');
module.exports = {
 

add:{
user : (req, res) => {
    const data = req.body;
    model.add.user(data, result=>{
        res.send(result);
    })
  }
},
}