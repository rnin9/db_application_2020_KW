
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('NOTICE', {   // GRADE 데이터 정의
        noticeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        userID: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        noticeName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        courseID: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        noticeContent: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        noticeFiles: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        noticeCriteria: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    }, { timestamps: true });
}