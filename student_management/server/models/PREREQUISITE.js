module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('PREREQUISITE',{   // PREREQUISITE table
      major:{
         type: DataTypes.STRING(12),
      },
      post_course:{
         type: DataTypes.STRING(20),
         allowNull: false,
         primaryKey: true,
      },
      pre_course:{
         type: DataTypes.STRING(20),
      },
   },{ timestamps: false});
}