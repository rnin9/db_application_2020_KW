import React from 'react';
import { Menu } from 'antd';
import {HomeTwoTone} from '@ant-design/icons';
const {SubMenu} = Menu;


function LeftMenu() {
  
  return (
    <div className="menu_left">
    <Menu mode="horizontal">
    <Menu.Item key="Home" icon={<HomeTwoTone style={{ fontSize: '20px'}}/>}>
      <a className="logo" href="/" style={{fontSize:20}}>
      DB143
      </a>
    </Menu.Item>
  </Menu>
  </div>
  )
}

export default LeftMenu