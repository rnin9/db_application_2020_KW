import React from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css';


function NavBar(props) {
  const { login, admin, _login, _logout }  = props;
  return (
    <nav className="menu">
      
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>
          <div className="menu_rigth">
            <RightMenu login={login} _logout={_logout} mode="horizontal" />
          </div>
        </div>
    </nav>
  )
}

export default NavBar