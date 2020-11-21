import { Menu } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {TeamOutlined} from'@ant-design/icons'
import {MDBIcon}  from 'mdbreact';
import React from 'react';
import '../NavBar.css';


const { SubMenu } = Menu;

function ProfessorBar(props) {
  return (
    
    // /*if position === student*/

  <div className="navigation" style={{height: '100vh'}}>
   <Menu
    style={{ width: 256 }}
    mode="inline"
  >
     <SubMenu
      key="sub1"
      title={
        <span>
      <span style={{marginRight:10}}>
      <MDBIcon far icon="address-book" />
      </span>
          <span>학생관리</span>
        </span>
      }
    >
      <Menu.Item key="1">학생조회</Menu.Item>
      <Menu.Item key="2">성적조회</Menu.Item>
    </SubMenu>

    <SubMenu
      key="sub2"
      title={
        <span>
          <span style={{fontSize:13,marginRight:3}}>
          <MDBIcon icon="chalkboard-teacher"/>
          </span>
          <span> 강의관리</span>
        </span>
      }
    >
      <Menu.Item key="3">공지사항</Menu.Item>
      <Menu.Item key="4">게시판</Menu.Item>
    </SubMenu>  
    <SubMenu key="sub3" icon={<TeamOutlined />} title="친구">
    <Menu.Item key="5"><a href="/user/friend/list">친구목록</a></Menu.Item>
      <Menu.Item key="6"><a href="/user/friend/add">친구추가</a></Menu.Item>
    </SubMenu>
  </Menu>  
  </div>

  )
}
export default ProfessorBar