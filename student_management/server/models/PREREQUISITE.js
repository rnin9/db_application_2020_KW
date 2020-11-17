module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('PREREQUISITE',{   // PREREQUISITE table
      post_course:{
         type: DataTypes.varchar(20),
         allowNull: false,
         primaryKey: true,
      },
      pre_course:{
         type: DataTypes.varchar(20),
      },
      department:{
         type: DataTypes.varchar(12),
      },
   },{ timestamps: false});
}