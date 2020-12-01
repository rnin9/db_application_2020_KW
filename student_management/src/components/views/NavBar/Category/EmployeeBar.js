import { Menu } from 'antd';
import {FormOutlined, TeamOutlined} from '@ant-design/icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon}  from 'mdbreact';
import React from 'react';
import '../NavBar.css';

const { SubMenu } = Menu;

function EmployeeBar(props) {
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
          <MDBIcon icon="users" />    
          </span>
          <span>학생관리</span>
        </span>
      }
    >
      <Menu.Item key="1"><a href="/employee/studentInfo">학생조회</a></Menu.Item>
      <Menu.Item key="2">성적조회</Menu.Item>
    </SubMenu>

    <SubMenu
      key="sub2"
      title={
        <span>
          <FormOutlined />
          <span>휴학</span>
        </span>
      }
    >
      <Menu.Item key="3"><a href="/employee/studentAbsense">휴학생 정보</a></Menu.Item>
    </SubMenu>   
    <SubMenu key="sub4" icon={<TeamOutlined />} title="친구">
    <Menu.Item key="6"><a href="/user/friend/list">친구목록</a></Menu.Item>
      <Menu.Item key="7"><a href="/user/friend/add">친구추가</a></Menu.Item>
    </SubMenu>
  </Menu>  
  </div>
  )
}
export default EmployeeBar