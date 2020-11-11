const sequelize = require('./models').sequelize;
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const {
    USER  
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports ={

    api:{
        searchUser :(body,callback) =>{
            USER.findAll({
                where: {[Op.and]: [{userID: body.id, userPassword: body.password}]}
            })
            .then(data=>{
                callback(data)
            })
            .catch(err =>{
                throw err;
            })
        },
        getUser:(callback) =>{
            USER.findAll()
            .then(data=>{
                callback(data)
            })
            .catch(err=>{
                throw err;
            })
        },
    },

    add:{
        user : (body, callback) => {
            USER.count({
                where : { userID : body.id }
            })
            .then(cnt => {
              if(cnt > 0) {
                   callback(false);     // 확인하는함수
               }
               else{
                    USER.create({
                        userID:body.id,  
                        userPassword:body.password,
                        userName:body.name,
                        userCollege:body.college,
                        userMajor:body.major,
                        userGrade:body.grade,
                        userGender:body.gender,
                        userPosition:body.position,
                        userEmail:body.email,
                        userAddress:body.address,
                    }).then(() => callback(true));
                }
            })
        } 
    }
       
}