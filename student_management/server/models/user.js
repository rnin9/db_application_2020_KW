module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('USER',{   // User 데이터 정의
     userID:{
         type: DataTypes.STRING(30),
         allowNull: false,
         primaryKey: true,
         unique: true,
         allowNull: false,
     },  
     userPassword:{
        type: DataTypes.STRING(30),
        allowNull: false,
     },
     userName:{
        type: DataTypes.STRING(30),
        allowNull: false,
     },
     userPhoto:{
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue : 0
     },
     userCollege:{
        type: DataTypes.STRING(30),
        allowNull: false,
     },
     userMajor:{
        type: DataTypes.STRING(30),
        allowNull: false,
     },
     userGender:{
        type: DataTypes.STRING(10),
        allowNull: false,
     },
     userGrade:{
        type: DataTypes.INTEGER,
        allowNull: false,
     },
     userPosition:{
        type: DataTypes.STRING(20),
        allowNull: false,
     },
     userEmail:{
        type: DataTypes.STRING(50),
        allowNull: false,
     },
     userPhoneNumber:{
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue : 0
     },
     userAddress:{
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue : 0
     },
     leaveOfAbsense:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
     },
   
    },{ timestamps: false});
}