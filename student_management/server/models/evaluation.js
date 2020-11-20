module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('EVALUATION',{   // evaluation 데이터 정의
      idx:{
         type: DataTypes.INTEGER,
         unique: true,
         allowNull: false,
         autoIncrement: true
      },
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
      },
      semester:{
         type: DataTypes.DECIMAL(2,1),
         allowNull: false,
      },
      rating:{
         type: DataTypes.DECIMAL(2,1),
         allowNull: false,
      },
      content:{
         type: DataTypes.STRING(300),
         allowNull: false,
      },
      upvote:{
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },
    },{ timestamps: false});
}