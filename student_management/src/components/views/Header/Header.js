import React from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Header.css';


function Header(props) {
  const { login, _logout, name, id, friend }  = props;   // props 사용
  return (
    <nav className="menu">
      <div className="menu__container">             {/*left menu 설정 */}
          <div className="menu_left">
            <LeftMenu mode="horizontal" login={login} friend={friend} />          
          </div>
          <div className="menu_right">
            <RightMenu login={login} _logout={_logout} name={name} id={id} mode="horizontal" /> {/*left menu 설정, Login상태에 따라 변함 */}
          </div>
        </div>
    </nav>
  )
}

export default Header