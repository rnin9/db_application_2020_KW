import React, {useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { Chart } from "react-google-charts";
import {
  Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text,
} from 'grommet';

import { Select, AutoComplete, Button } from 'antd';
import axios from 'axios';
// import './TimeTablePage.css'

const { Option } = Select;
const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');


function Score() {
  const location = useLocation();
  const friendID = location.state.friendID;
  
  const chart_data =[['term','my_score','friend_score'],];

  const [list, setlist] = useState([])

  useEffect(() => {
    _getData()
    
  }, [])  
  
  const _getData = async () => {
    const my_res = await axios.get('/api/userGradeGraph', {params:userID});
    const fr_res = await axios.get('/api/userGradeGraph', {params:friendID});
    if(my_res.data.length > fr_res.data.length){
      for(let i=0;i<fr_res.data.length;i++){
        chart_data.push([i+1,my_res.data[i].grade,fr_res.data[i].grade]);
      }
      for(let i=fr_res.data.length;i<my_res.data.length;i++){
        chart_data.push([i+1,my_res.data[i].grade,'0']);
      }
    } else{
      for(let i=0;i<my_res.data.length;i++){
        chart_data.push([i+1,my_res.data[i].grade,fr_res.data[i].grade]);
      }
      for(let i=my_res.data.length;i<fr_res.data.length;i++){
        chart_data.push([i+1,'0',fr_res.data[i].grade]);
      }
    }
    console.log(chart_data);
    setlist(chart_data);
  }


  return (
    <div style={{margin: AutoComplete}}>

      <div className="table">
        <h3>{userName} 학생과 {friendID} 학생의 성적 비교표입니다.</h3>
      </div>
      <div className="table_grade" style={{ display : 'flex'}}>
          <Chart
              className="table_grade"
              width={800}
              height={400}
              chartType="LineChart"
              loader={<div>Loading CHART</div>}
              data={list}
              options={{
                title:'학기별 성적 분포',
                hAxis:{
                  title:'수강 학기',
                },
                vAxis:{
                  title:'성적',
                  minValue: 0,
                  maxValue: 5,
                },
              }}
            />
      </div>
    </div>
    
  )
}

export default  Score
