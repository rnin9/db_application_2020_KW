module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('COURSE',{   // Course table
      Course_num:{
         type: DataTypes.STRING(15),// -도 포함한다면 14정도의 길이가 됨
         allowNull: false,
         primaryKey: true,
      },
      course_year:{
         type: DataTypes.INTEGER,// year이 없어서 integer로 대체
         primaryKey: true,
      },
      semester:{
         type: DataTypes.DECIMAL(2,1),
         primaryKey: true,
      },
      department:{
         type: DataTypes.STRING(12)
      },
      classification:{
         type: DataTypes.INTEGER//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
      },
      Course_name:{
         type: DataTypes.STRING(20)
      },
      headcount_now:{
         type: DataTypes.INTEGER.UNSIGNED//SMALLINT가 없어서 INTEGER로 대체
      },
      headcount_maximum:{
         type: DataTypes.INTEGER.UNSIGNED//SMALLINT가 없어서 INTEGER로 대체
      },
      ct_mon:{//class time monday
         type: DataTypes.INTEGER.UNSIGNED,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_tue:{
         type: DataTypes.INTEGER.UNSIGNED,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_wed:{
         type: DataTypes.INTEGER.UNSIGNED,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_thr:{
         type: DataTypes.INTEGER.UNSIGNED,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_fri:{
         type: DataTypes.INTEGER.UNSIGNED,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      credit:{
         type: DataTypes.INTEGER.UNSIGNED//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
      },
      room:{
         type: DataTypes.STRING(20)
      },
      professor_id:{
         type: DataTypes.STRING(30)
      },
   },{ timestamps: false});
}
