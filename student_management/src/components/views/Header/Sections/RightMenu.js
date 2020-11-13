// 상태에 따라 화면이 바뀔 메뉴 바.

import React from 'react';
import { Menu } from 'antd';
import {DingtalkOutlined,LoginOutlined, LogoutOutlined} from '@ant-design/icons'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon}  from 'mdbreact';

function RightMenu(props) {
  const {login, id, name} = props;
  return (
    <div className="menu_right">
    <Menu mode="horizontal">
      {!login? null :
        <Menu.Item>
        <a href="/user/info">
        <span style={{fontSize:15, marginRight:6}}>
        <MDBIcon icon="cog" />
        </span>
        <span style={{color:"black"}}>{id}({name})</span>
        </a>
        </Menu.Item>  
      }
    {!login? <Menu.Item key="rightLogin">
      <a href="/login" style={{fontSize:15}}> {/*3항 연산자로 로그인시, 아닐시 보일 view 설정*/}
      <span  style={{marginRight:10}}>
        <MDBIcon icon="sign-in-alt" />
          </span>
      로그인
      </a>
    </Menu.Item>:
    <Menu.Item key="rightLogin" onClick={()=>props._logout()}>
    <a href="/" style={{fontSize:15}}>
    <span style={{marginRight:6}}>
    <MDBIcon icon="sign-out-alt" />
    </span>
      로그아웃
    </a>
  </Menu.Item>
}  

                                                {/*내 정보 보이게 만들기!!!!!!*/}
  {!login?<Menu.Item key="rightRegister">
      <a href="/register" style={{fontSize:15}}>
      <span style={{marginRight:6}}>
      <MDBIcon icon="dragon" />
      </span>
        회원가입
      </a>
    </Menu.Item>:null}
    
    </Menu>
  </div>
  )
}

export default RightMenu