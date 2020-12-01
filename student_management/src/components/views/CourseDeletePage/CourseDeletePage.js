import React, { useEffect, useState } from 'react';
import { AutoComplete, Table, Tag, Button, message } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import './CourseDeletePage.css'
import axios from 'axios';

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
const year =localStorage.getItem('year');
const sem = localStorage.getItem('semester');

function CourseDeletePage(){

  const [list, setlist] = useState([])

  const columns = [
    {
      title: '학정번호',
      dataIndex: 'course_code',
      key: 'course_code',
    },
    {
      title: '과목명',
      dataIndex: 'Course_name',
      key: 'cname',
    },
    
    {
      title: '개설학과',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: '이수구분',
      dataIndex: 'classification',
      key: 'classification',
    },
    {
      title: '학점',
      dataIndex: 'credit',
      key: 'credit',
    },
    {
      title: '인증구분',
      dataIndex: 'classification',
      key: 'classification',
    },
    {
      title: '수강삭제',
      key: 'delete',
      render : (text,record) =>(
        <div><Button type='primary' danger onClick={onClick} id={record.course_code}><MinusOutlined /></Button></div>
      )
    },
  ];

  useEffect(() => {
    _getData()
  }, [])

  // 클릭시 수강삭제
  const onClick = (e)=>{
    
    console.log(e.currentTarget.id);
    const datas = {userID:userID, ccode:e.currentTarget.id ,year:year,sem:sem};
    axios('/delete/course', {method:'delete', headers:new Headers(), data:datas})
      .then(res =>{
        console.log(res.data);
        return window.location.href='/course/delete';
      });
  }

  const _getData = async () => {
    //현재 학기 수강정보만 불러옴
    const res = await axios.get('/api/userGradeNow',{params:{userID:userID,year:year,sem:sem}});
      console.log(res.data);
      
      for(let i=0;i<res.data.length;i++)

      setlist(res.data);
      
    }


        return(
          <div style={{margin: AutoComplete}}> 
          <div className="table">
            <h2>현재 학기({year}년 {sem==='2'?'2':sem==='1'?'1':sem==='1.5'?'여름':'겨울'}학기) 수강 정보</h2>
          </div>
          
          
          <div className="table_eval">

            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="course_code"/>
              : null}              

          </div>
          <br></br>
          <br></br>
          </div>
            
        );
}

export default CourseDeletePage;