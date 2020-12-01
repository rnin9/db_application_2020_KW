/* src/app.js */

import React, { Component, Suspense } from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import Register from './components/views/RegisterPage/RegisterPage.js'
import LandingPage from './components/views/LandingPage/LandingPage.js'
import Header from './components/views/Header/Header.js'
import AuthRoute from './helpers/AuthRoute.js'
import FriendRequestPage from './components/views/FriendPage/Request/FriendRequestPage'
import FriendHandlePage from './components/views/FriendPage/Handle/FriendHandlePage'
import FriendListPage from './components/views/FriendPage/FriendPage'
import FriendSchedule from './components/views/FriendPage/Schedule/Schedule'
import FriendScore from './components/views/FriendPage/Score/score'
import Login from './components/views/LoginPage/LoginPage.js'
import NavBar from './components/views/NavBar/NavBar.js'
import MyInfoPage from './components/views/MyInfoPage/MyInfoPage.js'
import MyInfoEditPage from './components/views/MyInfoPage/Edit/MyInfoEditPage'
import Grade from './components/views/GradePage/GradePage.js'
import Evaluation from './components/views/EvaluationPage/EvaluationPage.js'
import EvaluationDetail from './components/views/EvaluationDetailPage/EvaluationDetailPage.js'
import WriteEval from './components/views/EvaluationPage/WriteEval.js'
import CourseRegPage from './components/views/CourseRegPage/CourseRegPage.js'
import CourseDeletePage from './components/views/CourseDeletePage/CourseDeletePage.js'
import TimeTablePage from './components/views/TimeTablePage/TimeTablePage.js'

import StudentInfoPage from './components/views/StudentInfoPage/StudentInfoPage'
import AbsenseRequestPage from './components/views/AbsensePage/Request/AbsenseRequest'
import AbsenseHandlePage from './components/views/AbsensePage/Handle/AbsenseHandlePage'

import NoticePage from './components/views/NoticePage/NoticePage'
import ProfNotice from './components/views/NoticePage/NoticeProfessor/NoticeProfessor'
import ProfNoticeWrite from './components/views/NoticePage/NoticeProfessor/NoticeWrite'

import ProfGrade from './components/views/ProfGradePage/ProfGradePage.js'
import ProfGradeCourse from './components/views/ProfGradeCoursePage/ProfGradeCoursePage.js'
import './App.css';
import ProfessorRoute from './helpers/ProfessorRoute.js';
import EmployeeRoute from './helpers/EmployeeRoute';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      position: "",           // 기본 state  admin은 직원, 교수용
      id:"",
      name:"",
      year:0,
      semester:0
    }
  }
  componentDidMount(){
    if(localStorage.login)   // session이 login상태이면, login true
      this.setState({ 
        login : true,
        position : localStorage.getItem('position'),
        id : localStorage.getItem('id'),
        name : localStorage.getItem('name'),
        year : localStorage.getItem('year'),
        semester : localStorage.getItem('semester')
      })
    }
  
 
  _login =()=>{    
    this.setState({ login : true})
      return localStorage.setItem('login', true);    // login 시 실행
  }

  _logout =()=>{
    this.setState({ login : false})
    return localStorage.clear();      // logout 시 실행
  }

  render() {
    const {login, position, name, id} = this.state;
    const { _login, _logout} = this; // eslint-disable-line no-unused-vars    
    // login , 권한정보 설정
    return(
      <Suspense fallback={(<div>Loading...</div>)}>
      <Header login={login} id={id} name ={name} _logout={_logout}/>     {/*path routing* , 정보 담아서 state or props로 사용*/}
      <NavBar login={login} position={position}/>
        
        <div className='App'>        
        <BrowserRouter>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          {/* <Route exact path="/login" component={Login}></Route> */}

          <AuthRoute exact path="/main" component={LandingPage}></AuthRoute>
          <AuthRoute exact path="/user/friend/add" component={FriendRequestPage}></AuthRoute>
          <AuthRoute exact path="/user/friend/handle" component={FriendHandlePage}></AuthRoute>
          <AuthRoute exact path="/user/friend/list" component={FriendListPage}></AuthRoute>
          <AuthRoute exact path="/user/info" component={MyInfoPage}></AuthRoute>  
          <AuthRoute exact path="/user/info/modify/:id/:name" component={MyInfoEditPage}></AuthRoute>
          <AuthRoute exact path="/user/absense/request" component={AbsenseRequestPage}></AuthRoute>  
          <AuthRoute exact path="/user/notice" component={NoticePage}></AuthRoute>
          
          <AuthRoute exact path="/friend/schedule" component={FriendSchedule}></AuthRoute>
          <AuthRoute exact path="/friend/score" component={FriendScore}></AuthRoute>
                    
          <AuthRoute exact path="/user/timetable" component={TimeTablePage}></AuthRoute>
          <AuthRoute exact path="/user/eval" component={Evaluation}></AuthRoute>
          <AuthRoute exact path="/user/eval/detail" component={EvaluationDetail}></AuthRoute>
          <AuthRoute exact path="/write/eval" component={WriteEval}></AuthRoute>
          <AuthRoute exact path="/user/grade" component={Grade}></AuthRoute> {/*유저권한확인*/}
          <AuthRoute exact path="/course/register" component={CourseRegPage}></AuthRoute>
          <AuthRoute exact path="/course/delete" component={CourseDeletePage}></AuthRoute>
          
          <AuthRoute exact path="/professor/studentInfo" component={StudentInfoPage}></AuthRoute>
          <AuthRoute exact path="/employee/studentInfo" component={StudentInfoPage}></AuthRoute>
          <EmployeeRoute exact path="/employee/studentAbsense" component={AbsenseHandlePage}></EmployeeRoute>

          <ProfessorRoute exact path="/prof/grade" component={ProfGrade}></ProfessorRoute>
          <ProfessorRoute exact path="/prof/grade/course" component={ProfGradeCourse}></ProfessorRoute>
          <ProfessorRoute exact path="/prof/notice" component={ProfNotice}></ProfessorRoute>
          <ProfessorRoute exact path="/prof/notice/write" component={ProfNoticeWrite}></ProfessorRoute>
        </BrowserRouter>        
    </div>
    </Suspense>
    );
  
}}

export default App;
