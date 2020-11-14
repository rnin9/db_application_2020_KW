module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('GRADE',{   // GRADE 데이터 정의
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
      year:{
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
      },
      semester:{
         type: DataTypes.DECIMAL(2,1),
         allowNull: false,
         primaryKey: true,
      },
      grade:{
         type: DataTypes.DECIMAL(2,1),
         allowNull: true
      },
      Retake:{
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue : false
      },
  
   },{ timestamps: false});
}