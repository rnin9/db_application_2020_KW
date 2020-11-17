module.exports = (sequelize, DataTypes,) =>{
            
    return sequelize.define('FRIEND',{   // User 데이터 정의
     userID:{
         type: DataTypes.STRING(30),
         allowNull: false,
        //  primaryKey: true,
         allowNull: false,
     },  
     friendID:{
        type: DataTypes.STRING(30),
        allowNull: false,
        // primaryKey:true,
        allowNull:false,
     },
     scheduleShare :{
         type:DataTypes.BOOLEAN,
         allowNull:false,
         defaultValue:false,
     },
     gradeShare :{
         type:DataTypes.BOOLEAN,
         allowNull:false,
         defaultValue:false,
     },
     friendGrant :{
         type:DataTypes.BOOLEAN,
         allowNull:false,
         defaultValue:false,
     },   
    },{ timestamps: false},);
}