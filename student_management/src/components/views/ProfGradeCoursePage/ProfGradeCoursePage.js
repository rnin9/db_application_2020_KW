import React, { useState, useEffect } from 'react';
import { AutoComplete, Col, Table, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation } from "react-router";
import './ProfGradeCoursePage.css'
import axios from 'axios';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';


const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
const onClick = ({ key }) => {
  //if(key=0)
  console.log(key);
  //console.log( GradeCoursePage().list );
};
const score=(
  <Menu onClick={onClick}>
    <Menu.Item key='0'>
      A+
    </Menu.Item>
    <Menu.Item key='4'>
      A0
    </Menu.Item>
    <Menu.Item key='3.5'>
      B+
    </Menu.Item>
    <Menu.Item>
      B0
    </Menu.Item>
    <Menu.Item>
      C+
    </Menu.Item>
    <Menu.Item>
      C0
    </Menu.Item>
    <Menu.Item>
      D+
    </Menu.Item>
    <Menu.Item>
      D0
    </Menu.Item>
    <Menu.Item>
      F
    </Menu.Item>
  </Menu>
);
var getScore ='성적 선택';
const columns = [
  {
    title: '학번',
    dataIndex: 'user_id',
    key: 'uid',
  },
  {
    title: '성명',
    dataIndex: 'userName',
    key: 'uname',
  },
  
  {
    title: '학년',
    dataIndex: 'userGrade',
    key: 'uGrade',
  },
  {
    title: '재수강여부',
    dataIndex: 'Retake',
    key: 'rt',
  },
  {
    title: '성적',
    dataIndex: 'grade',
    key: 'grade',
    render : (grade) => (
      <Dropdown overlay={score}>
        <a className="ant-dropdown-link">
          {grade = 'null' ? '미입력' : grade}<DownOutlined/>
        </a>
      </Dropdown>
    )
  },
];


function GradeCoursePage (){

    const [list, setlist] = useState([])
    const location = useLocation();
    const Ccode = location.state.ccode;
    const Cyear = location.state.cyear;
    const Csem = location.state.csem;
    const Cname = location.state.cname;
    useEffect(() => {
      _getData()
      
    }, [])  

    const _getData = async () => {
      console.log(location.state)
      const res = await axios.get('/api/profCourseStudent',{params:{Ccode:Ccode, Cyear:Cyear, Csem:Csem}});
      //let cover2 = {};
      if(res.data === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        return setlist(cover)
      }
      console.log(res.data.length);
      if(res.data[0].grade='null') getScore='미입력 상태';
      else getScore=res.data[0].grade;
      setlist(res.data);
    }

    return(
        <div style={{margin: AutoComplete}}>
          

          <div className="table">            
            <h3>{userName} 교수님의 {Cname} 수업 정보입니다.</h3>
          </div>
          
          <div className="table_grade">          
            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="course_code"/>
              : null}          
          </div>

          

          <br></br>
          <br></br>
          </div>
            
    )
}

export default GradeCoursePage;