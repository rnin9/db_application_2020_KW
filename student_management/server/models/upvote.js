module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('UPVOTE',{   // UPVOTE 데이터 정의
      course_code:{
         type: DataTypes.STRING(11),
         allowNull: false,
         primaryKey: true,
      },
      reviewer_id:{
         type: DataTypes.STRING(30),
         allowNull: false,
         primaryKey: true,
      },
      upvote_id:{
         type: DataTypes.STRING(30),
         allowNull: false,
         primaryKey: true,
      },
   },{ timestamps: false});
}