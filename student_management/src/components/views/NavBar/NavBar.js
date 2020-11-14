import React from 'react';
import StduentBar from './Category/StudentBar.js'
import ProfessorBar from './Category/ProfessorBar.js'
import EmployeeBar from './Category/EmployeeBar'

import './NavBar.css';

function NavBar(props) {
  const { login, position}  = props;   // props 사용
  return (
    // /*if admin => EmpolyeeBar else StduentBar*/
  <div className="navigation" style={{height: '100vh'}}>

    {!login ? null: position==='학부생' ? <StduentBar/> : position==='교수' ? <ProfessorBar/> : position==='직원' ? <EmployeeBar/>: null}
  </div>

  )
}
export default NavBar