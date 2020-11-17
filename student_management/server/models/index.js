'use strict';

const path = require('path');
const Sequalize = require('sequelize');     //연결정보가 들어있는 index.js

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','config','config.json'))[env];
const db ={};

let sequelize = new Sequalize(
    config.database,
    config.username, 
    config.password, 
    config,{
        define:{
            charset:'utf8',
            collate:'utf8_genetal_ci'                   //db 연결
        }
    });

    db.sequelize = sequelize;
    db.Sequalize = Sequalize;

    db.sequelize
    .authenticate()
    .then(()=>{
        console.log('Connection has been established Successfully!') // mysql잘 연동됨
    })
    .catch(err=>{
        console.log('Unable to connect to the DB',err);     // 연결 에러시, 출력
    });

    db.USER = require('./USER')(sequelize,Sequalize);
    db.FRIEND = require('./friend')(sequelize,Sequalize);
    db.GRADE = require('./GRADE')(sequelize,Sequalize);
    db.EVALUATION = require('./EVALUATION')(sequelize,Sequalize);
    db.TAG = require('./TAG')(sequelize,Sequalize);
    db.UPVOTE = require('./UPVOTE')(sequelize,Sequalize);

db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;