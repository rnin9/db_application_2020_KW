module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('USER',{
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
     },
     userAddress:{
        type: DataTypes.STRING(30),
        allowNull: false,
     },
     leaveOfAbsense:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
     },
   
    },{ timestamps: false});
}