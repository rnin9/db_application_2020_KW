const sequelize = require('./models').sequelize;
const _ = require("lodash");
const { AccessDeniedError } = require('sequelize');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const {
    USER, FRIEND, ABSENSE, NOTICE
} = require('./models');

const { COURSE, GRADE, EVALUATION } = require('./models');
const notice = require('./models/notice');


sequelize.query('SET NAMES utf8;');

module.exports = {

    api: {
        searchUser: (body, callback) => {     // 데이터를 이용해서 쿼리 수행
            USER.findAll({
                where: { [Op.and]: [{ userID: body.id, userPassword: body.password }] }
            })
                .then(data => {
                    callback(data)
                })
                .catch(err => {
                    throw err;
                })
        },
        getUser: (callback) => {        // 쿼리만 수행 (get)
            USER.findAll()
                .then(data => {
                    callback(data)        // data를 controller로 보냄,
                })
                .catch(err => {
                    throw err;
                })
        },
        getUserInfo: (body, callback) => {
            USER.findAll({
                where: { userID: body }
            })
                .then(data => {
                    callback(data)
                })
                .catch(err => {
                    throw err;
                })
        },
        getUserFriendList: (body, callback) => {
            let infos = []
            FRIEND.findAll({
                where: { [Op.and]: [{ friendID: body, friendGrant: true, }] },   //INNER JOIN
            }).then((data) => {
                data.map(dataValues => {
                    USER.findAll({
                        where: { userID: dataValues.userID }
                    }).then(datas => {
                        infos.push(datas[0].dataValues)
                    })
                })
            })
            setTimeout(function () {
                callback(infos)
            }, 100) //임의로 시간줘서 데이터 다 받아오기
        },
        getUserFriendreq: (body, callback) => {
            FRIEND.findAll({
                include: [
                    {
                        model: USER,
                        required: true,
                        attributes: ['userName', 'userPosition'],
                    }],
                where: { [Op.and]: [{ userID: body, friendGrant: false }] },   //INNER JOIN
            })
                .then(data => {
                    callback(data)
                })
                .catch(err => {
                    throw err;
                })
        },
        getUserFriendreqrec: (body, callback) => {
            let infos = []
            FRIEND.findAll({
                where: { [Op.and]: [{ friendID: body, friendGrant: false, }] },   //INNER JOIN
            }).then((data) => {
                data.map(dataValues => {
                    USER.findAll({
                        where: { userID: dataValues.userID }
                    }).then(datas => {
                        infos.push(datas[0].dataValues)
                    })
                })
            })
            setTimeout(function () { callback(infos) }, 100) //임의로 시간줘서 데이터 다 받아오기
        },

        getCourse:(callback)=>{//강의 목록 가져오기.
            sequelize.query("select * from COURSEs;")
            .then(data=>{
                callback(data)
            })
            .catch(err =>{
                throw err;
            })
        },
        getProfCourse:(body,callback)=>{//교수의 강의 목록 가져오기.
            sequelize.query("select * from COURSEs where professor_id=:user_id;", {replacements : {user_id:body}})
            .then(data=>{
                console.log(data);
                callback(data)
            })
            .catch(err =>{
                throw err;
            })
        },
        getProfCourseStudent:(body,callback)=>{//교수의 강의 목록 가져오기.
            sequelize.query("select * from GRADEs g join USERs u on g.user_id=u.userID where g.course_code=:code and g.year=:year and g.semester=:sem;"
            , {replacements : {code:body.Ccode, year:body.Cyear, sem:body.Csem}})
            .then(data=>{
                //console.log(data);
                callback(data)
            })
            .catch(err =>{
                throw err;
            })
        },
        getTimeTable: (body, callback) =>{
            sequelize.query("select c.Course_name, c.class_time, c.ct_mw, c.ct_tt, c.ct_fri from GRADEs g join COURSEs c on g.course_code=c.Course_num where g.user_id=:user_id and g.year=:year and g.semester=:semester;",
             { replacements: {
                  user_id: body.user_id,
                  year : body.year,
                  semester : body.sem
                } })
            .then(data => {
                console.log(data[0]);
                callback(data[0])
            })
            .catch(err => {
                throw err;
            })
        },
        getUserGrade: (body, callback) => {
            sequelize.query("select * from GRADEs g join COURSEs c on g.course_code=c.Course_num where g.user_id=:user_id;", { replacements: { user_id: body } })
                .then(data => {
                    //console.log("GRADE" +data);
                    callback(data)
                })
                .catch(err => {
                    throw err;
                })
        },
        getUserMajorSubCredit: (body, callback) => {
            //sequelize.query("call grade_graph(:user_id)", {replacements :{user_id : body}})

            sequelize.query("select IFNULL(SUM(c.credit),0) as sub_major from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id and c.classification like '전%'  order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                //console.log(data);
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserLiberalSubCredit: (body, callback) => {
            //sequelize.query("call grade_graph(:user_id)", {replacements :{user_id : body}})

            sequelize.query("select IFNULL(SUM(c.credit),0) as sub_liberal from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id and c.classification like '교%' order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                //console.log(data);
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserEtcSubCredit: (body, callback) => {
            //sequelize.query("call grade_graph(:user_id)", {replacements :{user_id : body}})

            sequelize.query("select IFNULL(SUM(c.credit),0) as sub_etc from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id and c.classification not like '교%' and c.classification not like '전%' order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                //console.log(data);
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserAllSubCredit: (body, callback) => {
            //sequelize.query("call grade_graph(:user_id)", {replacements :{user_id : body}})
            sequelize.query("select IFNULL(SUM(c.credit),0) as sub_sum from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                //console.log(data);
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserMajorGetCredit:(body,callback)=>{
            sequelize.query("select IFNULL(SUM(c.credit),0) as get_major from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id and g.retake != true and c.classification like '전%'  order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserLiberalGetCredit:(body,callback)=>{
            sequelize.query("select IFNULL(SUM(c.credit),0) as get_liberal from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id and g.retake != true and c.classification like '교%' order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserEtcGetCredit:(body,callback)=>{
            sequelize.query("select IFNULL(SUM(c.credit),0) as get_etc from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id and g.retake != true and c.classification not like '교%' and c.classification not like '전%' order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserAllGetCredit:(body,callback)=>{
            sequelize.query("select IFNULL(SUM(c.credit),0) as get_sum from GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "where g.user_id=:user_id and g.retake != true order by g.year desc, g.semester desc;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserGetCredit: (body, callback) => {
            GRADE.findAll({
                where: { user_id: body },
                //include: COURSE
            })
                .then(data => {
                    callback(data)
                })
                .catch(err => {
                    throw err;
                })
        },
        getUserMajorGrade:(body,callback)=>{
            sequelize.query("SELECT IFNULL(ROUND((SUM(g.grade*c.credit))/SUM(c.credit),2),0) as grade_major "+
           "FROM GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "WHERE user_id=:user_id and c.classification like '전%' and grade<5 and Retake=false;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserLiberalGrade:(body,callback)=>{
            sequelize.query("SELECT IFNULL(ROUND((SUM(g.grade*c.credit))/SUM(c.credit),2),0) as grade_liberal "+
           "FROM GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "WHERE user_id=:user_id and c.classification like '교%' and grade<5 and Retake=false;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserEtcGrade:(body,callback)=>{
            sequelize.query("SELECT IFNULL(ROUND((SUM(g.grade*c.credit))/SUM(c.credit),2),0) as grade_etc "+
           "FROM GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "WHERE user_id=:user_id and c.classification not like '전%' and c.classification not like '교%' and grade<5 and Retake=false;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserAllGrade:(body,callback)=>{
            sequelize.query("SELECT IFNULL(ROUND((SUM(g.grade*c.credit))/SUM(c.credit),2),0) as grade_sum "+
           "FROM GRADEs g join COURSEs c on g.course_code=c.Course_num "+
           "WHERE user_id=:user_id and grade<5 and Retake=false;", {replacements :{user_id : body}})
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },
        getUserEval: (callback) => {        // 쿼리만 수행 (get)
            sequelize.query("select * from EVALUATIONs e join COURSEs c on e.course_code=c.Course_num;")
            .then(data=>{
                callback(data);
            })
            .catch(err =>{
                throw err;
            })
        },

        getStudentList: (body, callback) => {
            USER.findAll({
                where: { [Op.and]: [{ userCollege: body.college, userMajor: body.major, userPosition: "학부생" }] },   //INNER JOIN
            }).then(data => {
                callback(data)
            })
        },
        getAbsenseList: (body, callback) => {
            ABSENSE.findAll({
                include: [
                    {
                        model: USER,
                        required: true,
                        attributes: ['userName', 'userGrade'],
                    }],
                where: { userID: body }
            }).then(data => {
                callback(data)
            })
        },
        getAbsensectnList: (body, callback) => {
            ABSENSE.findAll({
                include: [
                    {
                        model: USER,
                        required: true,
                        attributes: ['userName', 'userGrade'],
                    }],
                where: { [Op.and]: [{ userID: body, absenseReturning: false }] },
            }).then(data => {
                callback(data)
            })
        },
        getUserEvalTag: (body, callback) => {        // 쿼리만 수행 (get)
            console.log(body);
            sequelize.query("select tag from TAGs where user_id=:user_id and course_code=:course_code;", { replacements: { user_id: body.user_id, course_code: body.course_code } })
                .then(data => {
                    callback(data);
                })
                .catch(err => {
                    throw err;
                })
        },
        getNoticeCourse: (body, callback) => {
            sequelize.query("SELECT COURSEs.Course_num, COURSEs.Course_name, COURSEs.professor_id" +
                " FROM COURSEs JOIN GRADEs " + "ON GRADEs.course_code = COURSEs.Course_num " +
                "WHERE GRADEs.user_id=:user_id and GRADEs.year=:year and GRADEs.semester=:semester;",
                { replacements: { user_id: body.id, year: body.year, semester: body.term } })
                .then(data => {
                    callback(data[0])
                })
        },
        getNoticeCourseProf: (body, callback) => {
            sequelize.query("SELECT Course_num, Course_name" +
                " FROM COURSEs" + " WHERE professor_id=:user_id and year=:year and semester=:semester;",
                { replacements: { user_id: body.id, year: body.year, semester: body.term } })
                .then(data => { callback(data[0]) })
        },
        getNoticeList: (body, callback) => {
            NOTICE.findAll({
                include: [
                    {
                        model: USER,
                        required: true,
                        attributes: ['userName'],
                    }],
                where: { [Op.and]: [{ courseID: body.code , userID:body.id }] },
            }).then(data => callback(data))
        }
    },

    add: {
        user: (body, callback) => {
            USER.count({
                where: { userID: body.id }
            })
                .then(cnt => {
                    if (cnt > 0) {
                        callback(false);     // 중복 확인하는함수
                    }
                    else {
                        USER.create({
                            userID: body.id,
                            userPassword: body.password,
                            userName: body.name,
                            userCollege: body.college,
                            userMajor: body.major,
                            userGrade: body.grade,
                            userGender: body.gender,
                            userPosition: body.position,
                            userEmail: body.email,
                            userAddress: body.address,
                        }).then(() => callback(true)).catch(err => { throw err });
                    }
                })
        },
        friend: (body, callback) => {
            FRIEND.count({
                where: { [Op.and]: [{ userID: body.u_id, friendID: body.f_id }] }
            })
                .then(cnt => {
                    if (cnt > 0) {
                        FRIEND.findAll({
                            include: [
                                {
                                    model: USER,
                                    required: true,
                                    attributes: ['userName', 'userPosition'],
                                }],
                            where: { [Op.and]: [{ userID: body.u_id, friendGrant: false }] },    //넣지 않고, 데이터 넘김

                        }).then(data => {
                            let datas = { success: false, data: data }
                            callback(datas)
                        }).catch(err => { throw err })
                    }
                    else {
                        FRIEND.create({
                            userID: body.u_id,
                            friendID: body.f_id
                        }).then(() => {
                            FRIEND.findAll({
                                include: [
                                    {
                                        model: USER,
                                        required: true,
                                        attributes: ['userName', 'userPosition'],
                                    }],
                                where: { [Op.and]: [{ userID: body.u_id, friendGrant: false }] }  // 넣고 넘김
                            }).then(data => {
                                callback(data)
                            }).catch(err => { throw err })
                        })
                    }
                })
        },
        absense: (body, callback) => {
            ABSENSE.count({
                where: { userID: body.id, absenseStart: body.start }
            })
                .then(cnt => {
                    if (cnt > 0) {
                        let data = { success: false, reason: 'duplicate' }
                        callback(data);     // 중복 확인하는함수
                    }
                    ABSENSE.count({
                        where: { [Op.and]: [{ userID: body.id, absenseReturning: false }] }
                    }).then(cnt => {
                        if (cnt > 0) {
                            let data = { success: false, reason: 'manyAbsense' }
                            callback(data)
                        }
                        else {
                            ABSENSE.create({
                                userID: body.id,
                                absenseStart: body.start,
                                absenseFinish: body.finish,
                                absenseCriteria: body.criteria,
                            }).then(() => {
                                USER.update(
                                    { leaveOfAbsense: true },
                                    { where: { userID: body.id } })
                                    .then(callback({ success: true }));
                            }).catch(err => { throw err });
                        }
                    })
                })
        },
        course: (body, callback) => {
            console.log(body);
            sequelize.query("call insert_grade(:course_code, :year, :semester, :user_id);",
                { replacements: { user_id: body.userID, course_code: body.Course_num, year: body.year, semester: body.semester } })
                .then(data => {
                    callback(data);
                })
                .catch(err => {
                    throw err;
                })
        },
        Eval: (body, callback) => {
            sequelize.query("insert into EVALUATION(user_id,course_code,year,semester,rating,content) value(:user_id,:course_code, :year, :semester,:rating,:content);",
                { replacements: { user_id: body.user_id, course_code: body.course_code, year: body.year, semester: body.semester, rating: body.rating, content: body.content } })
                .then(data => {
                    callback(data);
                })
                .catch(err => {
                    throw err;
                })
        },
        notice: (body, callback)=>{
            NOTICE.create({
                userID:body.id,
                noticeName:body.title,
                courseID: body.name,
                noticeContent: body.content,
                noticeCriteria: body.criteria,
                noticeFiles: body.file
            }
            ).then(()=>{
                callback(true)
            }).catch(()=>{
                callback(false)
            })
        }
    },
    update: {
        setUserInfo: (body, callback) => {      // 유저정보 업데이트
            USER.update(
                {
                    userPassword: body.password,
                    userAddress: body.address,
                    userEmail: body.email,
                    userPhoto: body.photo
                },
                { where: { userID: body.id } })
                .then(result => {
                    callback(true);
                })
                .catch(err => {
                    callback(false);
                    throw err;
                });
        },

        setHandle: (body, callback) => {
            FRIEND.update(
                { friendGrant: body.data.grant },
                { where: { [Op.and]: [{ userID: body.data.f_id, friendID: body.data.u_id }] } }
            )
                .then(() => {
                    if (body.data.grant === false) {
                        FRIEND.destroy({
                            where: { [Op.and]: [{ userID: body.data.f_id, friendID: body.data.u_id }] }
                        }).then(() => {
                            const infos = []
                            FRIEND.findAll({
                                where: { [Op.and]: [{ friendID: body.data.u_id, friendGrant: false, }] },   //INNER JOIN
                            }).then((data) => {
                                data.map(dataValues => {
                                    USER.findAll({
                                        where: { userID: dataValues.userID }
                                    }).then(datas => {
                                        infos.push(datas[0].dataValues)
                                    })
                                })
                            })
                            setTimeout(function () { callback(infos) }, 100) //임의로 시간줘서 데이터 다 받아오기
                        })
                    } else {
                        FRIEND.create({
                            userID: body.data.u_id,
                            friendID: body.data.f_id,
                            friendGrant: true
                        })
                        const infos = []
                        FRIEND.findAll({
                            where: { [Op.and]: [{ friendID: body.data.u_id, friendGrant: false, }] },   //INNER JOIN
                        }).then((data) => {
                            data.map(dataValues => {
                                USER.findAll({
                                    where: { userID: dataValues.userID }
                                }).then(datas => {
                                    infos.push(datas[0].dataValues)
                                })
                            })
                        })
                        setTimeout(function () { callback(infos) }, 100) //임의로 시간줘서 데이터 다 받아오기
                    }
                })
        },
        absenseReturning: (body, callback) => {
            ABSENSE.update(
                { absenseReturning: body.data.return },
                { where: { [Op.and]: [{ userID: body.data.id, absenseStart: body.data.start }] } }
            ).then(() => {
                USER.update(
                    { leaveOfAbsense: false },
                    { where: { userID: body.data.id } }
                ).then(
                    callback(true)
                )
            })
        },
        grade:(body, callback) => {
            sequelize.query("update GRADEs set grade=:grade where user_id=:user_id and course_code=:course_code and year=:year and semester=:sem;",
                    { replacements: { user_id: body.id, course_code: body.code, grade: body.grade, year:body.year,sem:body.sem } })
                    .then(data => {
                        callback(data);
                    })
                    .catch(err => {
                        throw err;
                    })
        },
    },        
    delete: {
        deleteFriendreq: (body, callback) => {
            FRIEND.destroy({
                where: { [Op.and]: [{ userID: body.u_id, friendID: body.f_id }] }
            }).then(() => {
                FRIEND.findAll({
                    include: [
                        {
                            model: USER,
                            required: true,
                            attributes: ['userName', 'userPosition'],
                        }],
                    where: { [Op.and]: [{ userID: body.u_id, friendGrant: false }] }
                }).then(data => {
                    callback(data)
                }).catch(err => { throw err })
            }).catch(err => { throw err })
        },
        deleteAbsense: (body, callback) => {
            ABSENSE.destroy({
                where: { [Op.and]: [{ userID: body.id, absenseStart: body.start, absenseReturning: false }] }
            }).then(() => {
                USER.update(
                    { leaveOfAbsense: false },
                    { where: { userID: body.id } })
                    .then(callback(true));
            }).catch((err) => { throw err })
        }
    },

}
