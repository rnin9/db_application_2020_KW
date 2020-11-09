// 상태에 따라 화면이 바뀔 메뉴 바.

import React from 'react';
import { Menu } from 'antd';

function RightMenu(props) {
  
  return (
    <Menu mode="horizontal">

    <Menu.Item key="rightLogin">
      <a href="/login">
        로그인
      </a>
    </Menu.Item>


    <Menu.Item key="rightRegister">
      <a href="/register">
        회원가입
      </a>
    </Menu.Item>
    </Menu>
   
  )
}

export default RightMenu