const sequelize = require('./models').sequelize;
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const {
    USER, FRIEND  
  } = require('./models');
const { GRADE } = require('./models');
const friend = require('./models/friend');
sequelize.query('SET NAMES utf8;');

module.exports ={

    api:{
        searchUser :(body,callback) =>{     // 데이터를 이용해서 쿼리 수행
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
        getUser:(callback) =>{        // 쿼리만 수행 (get)
            USER.findAll()
            .then(data=>{
                callback(data)        // data를 controller로 보냄,
            })
            .catch(err=>{
                throw err;
            })
        },
        getUserInfo:(body,callback)=>{
            USER.findAll({
                where: {userID:body}
            })
            .then(data=>{
                callback(data)
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserGrade:(body,callback)=>{
            GRADE.findAll({
                where: {user_id:body},
                //include: COURSE
            })
            .then(data=>{
                callback(data)
            })
            .catch(err =>{
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
                   callback(false);     // 중복 확인하는함수
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
        },
        friend:(body, callback)=>{
            FRIEND.count({
                where: {[Op.and]: [{userID: body.u_id, friendID: body.f_id}]}  
            })
            .then(cnt => {
                if(cnt > 0) {
                     callback(false);     // 중복 확인하는함수
                 }
                 else{
                      FRIEND.create({
                          userID:body.u_id,  
                          friendID:body.f_id
                      }).then(() => callback(true));
                  }
              })
        } 
    },
    update:{
        setUserInfo:(body,callback)=>{      // 유저정보 업데이트
            USER.update(
                {userPassword: body.password,
                 userAddress: body.address,
                 userEmail : body.email,
                 userPhoto : body.photo},
                {where: {userID: body.id}})
        .then(result => {
         callback(true);
         })
        .catch(err => {
         callback(false);
          throw err;
         });
        },
    }
       
}