import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, FormOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons';
const {SubMenu} = Menu;


function LeftMenu(props) {
  
  return (
    <Menu mode="horizontal">

    <Menu.Item key="Home" icon={<HomeOutlined/>}>
      <a href="/">
        광운대학교
      </a>
    </Menu.Item>

    <SubMenu key="SubMenu" icon={<UserOutlined />} title="학생 정보">
      <Menu.ItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>

    <SubMenu key="SubMenu2" icon={<FormOutlined />} title="수강현황">
      <Menu.ItemGroup title="Item 3">
        <Menu.Item key="setting:5">Option 1</Menu.Item>
        <Menu.Item key="setting:6">Option 2</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Item 4">
        <Menu.Item key="setting:7">Option 3</Menu.Item>
        <Menu.Item key="setting:8">Option 4</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>

    <Menu.Item key="SubMenu3" icon={<TeamOutlined/>}>  
      <a href="/friend" target="_blank" rel="noopener noreferrer" > {/*새로운 페이지에서 보여줌.*/} 
        친구
      </a>
    </Menu.Item>
    
  </Menu>
  )
}

export default LeftMenu