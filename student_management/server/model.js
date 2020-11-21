const sequelize = require('./models').sequelize;
const _ = require("lodash");
const { AccessDeniedError } = require('sequelize');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const {
    USER, FRIEND  
  } = require('./models');

const { GRADE, EVALUATION } = require('./models');


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
        getUserFriend:(body,callback)=>{
            FRIEND.findAll({
                where: {[Op.and]: [{userID: body, friendGrant: true}]}
            })
            .then(data=>{
                callback(data)
            })
            .catch(err=>{
                throw err;
            })
        },
        getUserFriendreq:(body,callback)=>{
            FRIEND.findAll({
                include: [
                    {
                      model: USER,
                      required:true,
                      attributes: ['userName','userPosition'],
                    }],
                where: {[Op.and]: [{userID: body, friendGrant: false}]},   //INNER JOIN
            })
            .then(data=>{
                callback(data)
            })
            .catch(err=>{
                throw err;
            })
        },
        getUserFriendreqrec:(body,callback)=>{
           let infos=[]
           FRIEND.findAll({
          where: {[Op.and]: [{friendID: body, friendGrant: false, }]},   //INNER JOIN
            }).then((data)=>{
               data.map(dataValues=>{
                    USER.findAll({
                        where:{userID:dataValues.userID}
                    }).then(datas=>{
                    infos.push(datas[0].dataValues)
                    })
                  }) 
           })
           setTimeout(function(){callback(infos)},100) //임의로 시간줘서 데이터 다 받아오기
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
        getUserEval:(callback) =>{        // 쿼리만 수행 (get)
            EVALUATION.findAll()
            .then(data=>{
                callback(data)        // data를 controller로 보냄,
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
                    }).then(() => callback(true)).catch(err=>{throw err});
                }
            })
        },
        friend:(body,callback)=>{
            FRIEND.count({
                where: {[Op.and]: [{userID: body.u_id, friendID: body.f_id}]}  
            })
            .then(cnt => {
                if(cnt > 0) {
                    FRIEND.findAll({
                        include: [
                            {
                              model: USER,
                              required:true,
                              attributes: ['userName','userPosition'],
                            }],
                        where: {[Op.and]: [{userID: body.u_id, friendGrant: false}]},    //넣지 않고, 데이터 넘김
                                
                    }).then(data=>{
                            let datas = {success:false,data:data}
                            callback(datas)
                        }).catch(err=>{throw err})
                 }
                 else{
                      FRIEND.create({
                          userID:body.u_id,  
                          friendID:body.f_id
                      }).then(() => {
                          FRIEND.findAll({
                            include: [
                                {
                                  model: USER,
                                  required:true,
                                  attributes: ['userName','userPosition'],
                                }],
                          where: {[Op.and]: [{userID: body.u_id, friendGrant: false}]}  // 넣고 넘김
                          }).then(data=>{
                              callback(data)
                          }).catch(err=>{throw err})
                      })
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
    },
    delete:{
        deleteFriendreq:(body,callback)=>{
            FRIEND.destroy({
                where:{[Op.and]: [{userID:body.u_id, friendID:body.f_id}]}
            }).then(()=>{
                FRIEND.findAll({
                    include: [
                        {
                          model: USER,
                          required:true,
                          attributes: ['userName','userPosition'],
                        }],
                    where:{[Op.and]: [{userID:body.u_id, friendGrant:false}]}
                }).then(data=>{
                        callback(data)
                }).catch(err=>{throw err})
            }).catch(err=>{throw err})
        }
    },
       
}