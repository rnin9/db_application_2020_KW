import React, {useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { AutoComplete, Col, Table, Button, Select } from 'antd';
import './TimeTablePage.css'
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import axios from 'axios';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';

const { Option } = Select;

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
var year = 2020;
var sem=2;
const termData = ['2020년도 2학기', '2020년도 1학기', '2019년도 2학기'];

/*
const daynames = ['MON','TUE','WED','THR','FRI'];
const container = document.getElementById('calendar');
  const options = {
    taskView:false,
    scheduleView:'time',
    defaultView: 'week',          // 캘린더가 초기에 그려지는 뷰 타입을 주간 뷰로 지정
    week: {                       // 주간 뷰 시간 지정
      workweek:true,
      startDayOfWeek:1,
      hourStart: 8,
      hourEnd: 20,
    }
  };
const calendar = new Calendar(container,options);
*/

function TimeTablePage(){

  const [list, setlist] = useState([])
  const history = useHistory();

  
  /*
  const calendar = new Calendar('#calendar',{
    defaultView:'week',
    isReadOnly:true,

    week:{
      workweek:true,
      startDayOfWeek:1,
      hourStart:9,
      hourEnd:20,
    }
  });
*/
  const handleTermChange = value => {  // 단과대학 변할 때 state 변화
    const h_year = value.substring(0,4);
    const h_sem = value.substring(7,8);
    console.log(h_year+'/'+h_sem);
    year=h_year;
    sem=h_sem;
  };

  useEffect(() => {
    _getData()
  }, [])

  
  const _getData = async () => {
    const res = await axios.get('/api/timeTable',{params:{user_id:userID, year:year,sem:sem}});
    if(res.data === undefined) {
      let cover = [];
      cover.push(res.data);       // response 데이터들 push
      return setlist(cover)
    }
    console.log(res.data);
    /*
    for(let i=0;i<=1;i++){
      console.log(res.data[i].Course_name);
      calendar.createSchedules([
        {
          id : i+1,
          calendarId : 'course',
          category:'time',
          title : res.data[i].Course_name,
          start: '2020-11-30T09:30:00',
          end: '2020-11-30T011:30:00',
          isReadOnly:true,
        }
      ]);
    }
    calendar.render(true);
    */
    setlist(res.data);
  }
  

  return(
    <div style={{margin: AutoComplete}}>
    

    <div className="table">            
      <h3>{userName} 학생의 시간표입니다.</h3>
    </div>
    <Select
        defaultValue={termData[0]}
        style={{ width: 250 }}
        onSelect={handleTermChange}>
        {termData.map(term => (
            <Option key={term}>{term}</Option>
        ))}
    </Select>
    <br></br>
    
    <div className="table_grade">
    </div>
    
    
    

    <br></br>
    
    <br></br>
    </div>
      
  );
}

export default TimeTablePage;