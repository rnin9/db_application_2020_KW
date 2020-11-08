/* src/app.js */

import React, { Component } from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import Register from './components/views/RegisterPage/RegisterPage.js'
import LandingPage from './components/views/LandingPage/LandingPage.js'
import './App.css';
// import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    
    return(
      <div className='App'>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/register" component={Register}></Route>   
        </BrowserRouter>
    </div>
    );
  
}}

export default App;