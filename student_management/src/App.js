/* src/app.js */

import React, { Component, Suspense } from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import Register from './components/views/RegisterPage/RegisterPage.js'
import LandingPage from './components/views/LandingPage/LandingPage.js'
import Header from './components/views/Header/Header.js'
import AuthRoute from './helpers/AuthRoute.js'
import FriendPage from './components/views/FriendPage/FriendPage.js'
import Login from './components/views/LoginPage/LoginPage.js'
import NavBar from './components/views/NavBar/NavBar.js'
import MyInfoPage from './components/views/MyInfoPage/MyInfoPage.js'
import MyInfoEditPage from './components/views/MyInfoPage/Edit/MyInfoEditPage'
import Grade from './components/views/GradePage/GradePage.js'
import './App.css';
// import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      position: "",           // 기본 state  admin은 직원, 교수용
      id:"",
      name:"",
      friend: 0      //삭제!!
    }
  }
  componentDidMount(){
    if(localStorage.login)   // session이 login상태이면, login true
      this.setState({ 
        login : true,
        position : localStorage.getItem('position'),
        id : localStorage.getItem('id'),
        name : localStorage.getItem('name'), 
        friend : localStorage.getItem('friend')
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
    const {login, position, name, id, friend} = this.state;
    const { _login, _logout} = this;      // login , 권한정보 설정
    return(
      <Suspense fallback={(<div>Loading...</div>)}>
      <Header login={login} id={id} name ={name} friend={friend}  _logout={_logout}/>     {/*path routing* , 정보 담아서 state or props로 사용*/}
      <NavBar login={login} position={position}/>
        
        <div className='App'>        
        <BrowserRouter>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <AuthRoute exact path="/user/friend/add" component={FriendPage}></AuthRoute>
          <AuthRoute exact path="/user/grade" component={Grade}></AuthRoute> {/*유저권한확인*/}
          <AuthRoute exact path="/user/info" component={MyInfoPage}></AuthRoute>  
          <AuthRoute exact path="/user/info/modify/:id/:name" component={MyInfoEditPage}></AuthRoute>
        </BrowserRouter>        
    </div>
    </Suspense>
    );
  
}}

export default App;