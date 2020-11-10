const sequelize = require('./models').sequelize;
const {
    USER,
    // Sequelize: { Op } //연산
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports ={

    add:{
        user : (body, callback) => {
            USER.count({
                where : { userID : body.id }
            })
            .then(cnt => {
              if(cnt > 0) {
                   callback(false);     // 확인하는함수
                   alert('이미 존재하는 아이디입니다.');
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