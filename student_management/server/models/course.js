module.exports = (sequelize, DataTypes) =>{
   return sequelize.define('course',{   // Course table
      Course_num:{
         type: DataTypes.char(11),// 아직 test 데이터베이스에선 varchar(15)로 되어있으니 수정 필요.
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
         type: DataTypes.char(12)
      },
      classification:{
         type: DataTypes.INTEGER//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
      },
      Course_name:{
         type: DataTypes.varchar(20)
      },
      headcount_now:{
         type: DataTypes.INTEGER.unsigned//SMALLINT가 없어서 INTEGER로 대체
      },
      headcount_maximum:{
         type: DataTypes.INTEGER.unsigned//SMALLINT가 없어서 INTEGER로 대체
      },
      ct_mon:{//class time monday
         type: DataTypes.INTEGER.unsigned,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_tue:{
         type: DataTypes.INTEGER.unsigned,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_wed:{
         type: DataTypes.INTEGER.unsigned,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_thr:{
         type: DataTypes.INTEGER.unsigned,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      ct_fri:{
         type: DataTypes.INTEGER.unsigned,//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
		 defaultValue : 0
      },
      credit:{
         type: DataTypes.INTEGER.unsigned//TINYINT가 존재하지 않아서 일단 INTEGER로 대체.
      },
      room:{
         type: DataTypes.varchar(20)
      },
      professor_id:{
         type: DataTypes.varchar(30)
      },
   },{ timestamps: false});
}
