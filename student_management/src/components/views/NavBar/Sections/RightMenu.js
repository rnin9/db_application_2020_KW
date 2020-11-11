// 상태에 따라 화면이 바뀔 메뉴 바.

import React from 'react';
import { Menu } from 'antd';
import {DingtalkOutlined} from '@ant-design/icons'

function RightMenu(props) {
  const{login,_logout} =props;
  return (
    <div className="menu_right">
    <Menu mode="horizontal">
    {!login? <Menu.Item key="rightLogin">
      <a href="/login" style={{fontSize:20}}> 
      로그인
      </a>
    </Menu.Item>:
    <Menu.Item key="rightLogin" onClick={()=>props._logout()}>
    <a style={{fontSize:20}}>
      로그아웃
    </a>
  </Menu.Item>
}  
    
  {!login?<Menu.Item key="rightRegister">
      <a href="/register" style={{fontSize:20}}>
      <DingtalkOutlined/>
        회원가입
      </a>
    </Menu.Item>:null}
    
    </Menu>
  </div>
  )
}

export default RightMenu