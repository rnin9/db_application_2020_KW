import React, {useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { AutoComplete, Col, Table, Button } from 'antd';
import './TimeTablePage.css'
import axios from 'axios';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';


const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
function TimeTablePage(){

  const [list, setlist] = useState([])
  const history = useHistory();

  useEffect(() => {
    _getData()
  }, [])

  
  const _getData = async () => {
    
    const res = await axios.get('/api/timeTable',{params:userID});
    if(res.data === undefined) {
      let cover = [];
      cover.push(res.data);       // response 데이터들 push
      return setlist(cover)
    }
    console.log(res.data);
    setlist(res.data);
  }
  

  return(
    <div style={{margin: AutoComplete}}>
    

    <div className="table">            
      <h3>{userName} 학생의 시간표입니다.</h3>
    </div>
    
    <div className="table_grade">   
           
      {/*list.length !== 0
        ? 
        <Table dataSource={list} columns={columns} size="small" rowKey="course_code"/>
      : null*/}          
    </div>

    

    <br></br>
    <br></br>
    </div>
      
  );
}

export default TimeTablePage;