module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('ABSENSE',{   // User 데이터 정의
     userID:{
         type: DataTypes.STRING(30),
         allowNull: false,
         primaryKey: true,
     },
     absenseStart:{
        type: DataTypes.DATEONLY,
        primaryKey: true,
        allowNull: false,
        defaultValue : '2020-01-01'
     },
     absenseFinish:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue : '2020-01-02'
     },
     absenseCriteria:{
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue : '일반휴학'
    },
    absenseReturning:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
    }
    },{ timestamps: false});
}