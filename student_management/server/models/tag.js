module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('TAG',{   // TAG 데이터 정의
      user_id:{
         type: DataTypes.STRING(30),
         allowNull: false,
         primaryKey: true,
      },
      course_code:{
         type: DataTypes.STRING(11),
         allowNull: false,
         primaryKey: true,
      },
      tag:{
         type: DataTypes.STRING(10),
         allowNull: false,
         primaryKey: true,
      },
   },{ timestamps: false});
}