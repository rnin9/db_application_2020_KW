/* src/app.js */

import React, { Component } from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import Register from './components/views/RegisterPage/RegisterPage.js'
import LandingPage from './components/views/LandingPage/LandingPage.js'
import NavBar from './components/views/NavBar/NavBar.js'
import Friend from './components/views/FriendPage/FriendPage.js'
import Login from './components/views/LoginPage/LoginPage.js'
import './App.css';
// import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      admin: false,           // 기본 state  admin은 직원, 교수용
    }
  }
  componentDidMount(){
    if(sessionStorage.login)    // session이 login상태이면, login true
      this.setState({ 
        login : true,        
      })
    }
  
 
  _login =()=>{    
    this.setState({ login : true})
      return sessionStorage.setItem('login',true);    // login 시 실행
  }

  _logout =()=>{
    this.setState({ login : false})
    return sessionStorage.removeItem('login');      // logout 시 실행
  }

  render() {
    const {login, admin} = this.state;
    const { _login, _logout} = this;      // login , 권한정보 설정
    return(
      <div className='App'>
        <NavBar login={login} _login={_login} _logout={_logout}/>       {/*path routing* , 정보 담아서 state or props로 사용*/}
        <BrowserRouter>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/friend" component={Friend}></Route>
        </BrowserRouter>
    </div>
    );
  
}}

export default App;