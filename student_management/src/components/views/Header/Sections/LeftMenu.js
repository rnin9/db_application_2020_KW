import React from 'react';
import { Menu } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon}  from 'mdbreact';

function LeftMenu() {
  
  return (
    <div className="menu_left">
    <Menu mode="horizontal">
    <Menu.Item key="Home">
      <span role="img" aria-label="sun-flower"style={{fontSize:25, paddingLeft:7}}>
      🌻
      </span>
      <a className="logo" href="/" style={{fontSize:25,marginLeft:20}}>
      DB143
      </a>
    </Menu.Item>
    <Menu.Item key="KW" >
      <a style={{marginLeft:2,fontSize:20}} href="https://www.kw.ac.kr"  target="_blank" rel="noopener noreferrer" >
      <MDBIcon icon="school" />
      </a>
    </Menu.Item>
    <Menu.Item key="friend">
      <a style={{marginLeft:2,fontSize:20}} href="/friend/add">
      <MDBIcon icon="user-friends" />
      </a>
    </Menu.Item>
  </Menu>
  </div>
  )
}

export default LeftMenu