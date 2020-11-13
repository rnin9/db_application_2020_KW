// 상태에 따라 화면이 바뀔 메뉴 바.

import React from 'react';
import { Menu } from 'antd';
import {DingtalkOutlined,LoginOutlined, LogoutOutlined, SettingTwoTone} from '@ant-design/icons'

function RightMenu(props) {
  const {login, id, name} = props;
  return (
    <div className="menu_right">
    <Menu mode="horizontal">
      {!login? null :
        
        <a href="/user/info">
        <SettingTwoTone/>
        <span style={{color:"black", margin:5}}>{id}({name})</span>
        </a>
          
      }
    {!login? <Menu.Item key="rightLogin">
      <a href="/login" style={{fontSize:15}}> {/*3항 연산자로 로그인시, 아닐시 보일 view 설정*/}
      <LoginOutlined/>
      로그인
      </a>
    </Menu.Item>:
    <Menu.Item key="rightLogin" onClick={()=>props._logout()}>
    <a href="/" style={{fontSize:15}}>
      <LogoutOutlined/>
      로그아웃
    </a>
  </Menu.Item>
}  

                                                {/*내 정보 보이게 만들기!!!!!!*/}
  {!login?<Menu.Item key="rightRegister">
      <a href="/register" style={{fontSize:15}}>
      <DingtalkOutlined/>
        회원가입
      </a>
    </Menu.Item>:null}
    
    </Menu>
  </div>
  )
}

export default RightMenu