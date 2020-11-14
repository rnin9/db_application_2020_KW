import React from 'react';
import { Menu } from 'antd';

function LeftMenu() {
  
  return (
    <div className="menu_left">
    <Menu mode="horizontal">
    <Menu.Item key="Home">
      <span role="img" aria-label="sun-flower"style={{fontSize:20, marginRight:7}}>
      🌻
      </span>
      <a className="logo" href="/" style={{fontSize:20}}>
      DB143
      </a>
    </Menu.Item>
    <Menu.Item key="KW" >
      <a style={{marginLeft:2,fontSize:15}} href="https://www.kw.ac.kr"  target="_blank" rel="noopener noreferrer" >
      KW
      </a>
    </Menu.Item>
    <Menu.Item key="KLAS">
      <a style={{marginLeft:2,fontSize:15}} target="_blank" rel="noopener noreferrer" href="https://klas.kw.ac.kr">
      KLAS
      </a>
    </Menu.Item>
  </Menu>
  </div>
  )
}

export default LeftMenu