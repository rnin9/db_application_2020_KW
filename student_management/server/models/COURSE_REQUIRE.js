module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('COURSE_REQUIRE',{   // COURSE_REQUIRE table
      department:{
         type: DataTypes.varchar(12),
         primaryKey: true,
      },
      course_name:{
         type: DataTypes.varchar(20),
         primaryKey: true,
      },
      EITHER:{
         type: DataTypes.BOOLEAN,
      },
      num:{
         type: DataTypes.INTEGER,//tinyint가 없어서 INTEGER사용.
      },
   },{ timestamps: false});
}