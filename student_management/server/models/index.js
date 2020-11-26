'use strict';

const { request } = require('express');
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
    db.ABSENSE = require('./absense')(sequelize,Sequalize);
    db.GRADE = require('./GRADE')(sequelize,Sequalize);
	db.COURSE = require('./COURSE')(sequelize,Sequalize);
    db.EVALUATION = require('./EVALUATION')(sequelize,Sequalize);
    db.TAG = require('./TAG')(sequelize,Sequalize);
    db.UPVOTE = require('./UPVOTE')(sequelize,Sequalize);
    db.NOTICE = require('./notice')(sequelize,Sequalize);

    db.USER.hasMany(db.FRIEND,{foreignKey:"userID",targetKey:"userID"});
    db.USER.hasMany(db.FRIEND,{foreignKey:"friendID",targetKey:"userID"});
    db.FRIEND.belongsTo(db.USER,{foreignKey:"userID",sourceKey:"userID"});
    db.FRIEND.belongsTo(db.USER,{foreignKey:"friendID",sourceKey:"userID"});

    db.USER.hasMany(db.ABSENSE,{foreignKey:"userID",targetKey:"userID"});
    db.ABSENSE.belongsTo(db.USER,{foreignKey:"userID",sourceKey:"userID"});
    
    db.USER.hasMany(db.NOTICE,{foreignKey:"userID",targetKey:"userID"});
    db.NOTICE.belongsTo(db.USER,{foreignKey:"userID",sourceKey:"userID"});

    db.USER.hasMany(db.GRADE, {foreignKey:"user_id",targetKey:"userID"});
    db.GRADE.belongsTo(db.USER, {foreignKey:"user_id",sourceKey:"userID"});
    /*
    db.COURSE.hasMany(db.GRADE, {foreignKey:"course_code",targetKey:"Course_num"});
    db.GRADE.belongsTo(db.USER, {foreignKey:"course_code",sourceKey:"Course_num"});
    */
    db.USER.hasMany(db.EVALUATION, {foreignKey:"user_id",targetKey:"userID"});
    db.EVALUATION.belongsTo(db.USER, {foreignKey:"user_id",sourceKey:"userID"});
    /*
    db.COURSE.hasMany(db.EVALUATION, {foreignKey:"course_code",targetKey:"Course_num"});
    db.EVALUATION.belongsTo(db.USER, {foreignKey:"course_code",sourceKey:"Course_num"});
    */
    db.EVALUATION.hasMany(db.TAG, {foreignKey:"user_id",targetKey:"user_id"});
    db.TAG.belongsTo(db.EVALUATION, {foreignKey:"user_id",targetKey:"user_id"});
    db.EVALUATION.hasMany(db.TAG, {foreignKey:"course_code",targetKey:"course_code"});
    db.TAG.belongsTo(db.EVALUATION, {foreignKey:"course_code",targetKey:"course_code"});

    db.EVALUATION.hasMany(db.UPVOTE, {foreignKey:"reviewer_id",targetKey:"user_id"});
    db.UPVOTE.belongsTo(db.EVALUATION, {foreignKey:"reviewer_id",targetKey:"user_id"});
    db.EVALUATION.hasMany(db.UPVOTE, {foreignKey:"upvote_id",targetKey:"user_id"});
    db.UPVOTE.belongsTo(db.EVALUATION, {foreignKey:"upvote_id",targetKey:"user_id"});
    db.EVALUATION.hasMany(db.UPVOTE, {foreignKey:"course_code",targetKey:"course_code"});
    db.UPVOTE.belongsTo(db.EVALUATION, {foreignKey:"course_code",targetKey:"course_code"});

db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;
