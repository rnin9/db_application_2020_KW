module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('PREREQUISITE',{   // PREREQUISITE table
      post_course:{
         type: DataTypes.STRING(20),
         allowNull: false,
         primaryKey: true,
      },
      pre_course:{
         type: DataTypes.STRING(20),
      },
      department:{
         type: DataTypes.STRING(12),
      },
   },{ timestamps: false});
}
