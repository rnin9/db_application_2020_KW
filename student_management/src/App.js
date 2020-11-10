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
      admin: false,    
    }
  }
  componentDidMount(){
    if(sessionStorage.login)
      this.setState({ 
        login : true,        
      })
    }
  
 
  _login =()=>{    
    this.setState({ login : true})
      return sessionStorage.setItem('login',true);
  }

  _logout =()=>{
    this.setState({ login : false})
    return sessionStorage.removeItem('login');
  }

  render() {
    const {login, admin} = this.state;
    const { _login, _logout} = this;
    return(
      <div className='App'>
        <NavBar login={login} _login={_login} _logout={_logout}/>
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