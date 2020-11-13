import { Menu } from 'antd';
import {  UserOutlined, FormOutlined, TeamOutlined} from '@ant-design/icons';
import React from 'react';
import './NavBar.css';

const { SubMenu } = Menu;

const handleClick = e => {
  console.log('click ', e);
};

function NavBar(props) {
  const { login, admin, _login, _logout }  = props;   // props 사용
  return (
    
    // /*if admin => EmpolyeeBar else StduentBar*/

  <div className="navigation" style={{height: '100vh'}}>
    { login ?
    <Menu
    // onClick={handleClick}
    style={{ width: 256 }}
    mode="inline"
  >
    <SubMenu
      key="sub1"
      title={
        <span>
          <UserOutlined />
          <span>대학생활</span>
        </span>
      }
    >
      <Menu.ItemGroup key="g1" title="수강관리">
        <Menu.Item key="1">시간표</Menu.Item>
        <Menu.Item key="2">수강신청</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="g2" title="학습결과">
        <Menu.Item key="3">성적조회</Menu.Item>
        <Menu.Item key="4">수강평가</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
    <SubMenu
      key="sub2"
      title={
        <span>
          <FormOutlined />
          <span>학습지원</span>
        </span>
      }
    >
      <Menu.Item key="5">강의 공지사항</Menu.Item>
      <Menu.Item key="6">게시판</Menu.Item>
      <Menu.Item key="7">휴학신청</Menu.Item>
    </SubMenu>
    <SubMenu key="sub3" icon={<TeamOutlined />} title="친구">
      <Menu.Item key="8">친구관리</Menu.Item>
      <SubMenu key="sub4" title="공유">
        <Menu.Item key="9">시간표</Menu.Item>
        <Menu.Item key="10">성적</Menu.Item>
      </SubMenu>
    </SubMenu>
  </Menu>  
  : null}
  </div>

  )
}

export default NavBar