module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('REQUIREMENT',{   // COURSE_REQUIRE table
      major:{
         type: DataTypes.STRING(12),
         primaryKey: true,
      },
      count:{
         type: DataTypes.INTEGER.UNSIGNED
      },
   },{ timestamps: false});
}