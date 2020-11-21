import React from 'react';
import {useSelector} from 'react-redux'
import { Menu ,Badge} from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon}  from 'mdbreact';

function LeftMenu(props) {
  const {login} = props
  const friend = useSelector(state => state.friend.friendreqrec)
  return (
    <div className="menu_left">
    <Menu mode="horizontal">
    <Menu.Item key="Home">
      <span role="img" aria-label="sun-flower"style={{fontSize:25, paddingLeft:7}}>
      🌻
      </span>
      <a className="logo" href="/main" style={{fontSize:25,marginLeft:20}}>
      DB143
      </a>
    </Menu.Item>
    <Menu.Item key="KW" >
      <a style={{marginLeft:2,fontSize:20}} href="https://www.kw.ac.kr"  target="_blank" rel="noopener noreferrer" >
      <MDBIcon icon="school" />
      </a>
    </Menu.Item>
    <Menu.Item key="friend">
      {login ?
      <Badge count={friend&&friend.length} size="default" offset={[4,0]}>
      <a style={{marginLeft:2,fontSize:20}} href="/user/friend/handle">
      <MDBIcon icon="user-friends" />
      </a>
      </Badge>: null}
    </Menu.Item>
  </Menu>
  </div>
  )
}

export default LeftMenu