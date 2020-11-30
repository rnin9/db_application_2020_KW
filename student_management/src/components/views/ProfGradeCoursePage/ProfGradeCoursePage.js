import React, { useState, useEffect } from 'react';
import { AutoComplete, Col, Table, Select, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation } from "react-router";
import './ProfGradeCoursePage.css'
import axios from 'axios';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';

const { Option } = Select;

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');

const score = ['A+','A0','B+','B0','C+','C0','D+','D0','F'];

var getScore ='성적 선택';




function GradeCoursePage (){

    const [list, setlist] = useState([])
    const location = useLocation();
    const Ccode = location.state.ccode;
    const Cyear = location.state.cyear;
    const Csem = location.state.csem;
    const Cname = location.state.cname;
    var setGrade = 0;

    const handleTermChange = value => {  // 성적 선택
      console.log(value);

      if(value === 'A+') setGrade=4.5;
      else if(value === 'A0') setGrade=4.0;
      else if(value === 'B+') setGrade=3.5;
      else if(value === 'B0') setGrade=3.0;
      else if(value === 'C+') setGrade=2.5;
      else if(value === 'C0') setGrade=2.0;
      else if(value === 'D+') setGrade=1.5;
      else if(value === 'D0') setGrade=1.0;
      else setGrade=0;
      
      console.log(setGrade);
    };
    
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
          <Select
            defaultValue={grade==='4.5'? 'A+' : grade==='4.0'? 'A0': grade==='3.5'?'B+':grade==='3.0'?'B0':grade==='2.5'?'C+':grade==='2.0'?'C0':grade==='1.5'?'D+':grade==='1.0'?'D0':grade==='0'?'F':'미입력'}
            style={{ width: 100 }}
            onSelect={handleTermChange}>
            {score.map(sc => (
                <Option key={sc}>{sc}</Option>
            ))}
        </Select>
        )
      },
      {
        title:'적용',
        key: 'button',
        render : (text, record) => (
          <Button type='primary' onClick={onClick} id={record.course_code+','+record.userID+','+record.year+','+record.semester}>적용</Button>
        )
      }
    ];

    const onClick = (e)=>{
      var split = e.currentTarget.id.split(',');
      console.log(split);
      const datas={grade:setGrade, code:split[0], id:split[1], year:split[2], sem:split[3]};
      // 성적 반영할 때 setGrade 중복 문제가 존재
      axios('/update/grade', {method:'POST', headers:new Headers(), data:datas})
        .then(res =>{
          console.log(res.data[0].changedRows);
          if(res.data[0].changedRows != '0') message.success('성공적으로 반영되었습니다.');
          else message.error('성적이 반영되지 않았습니다. 이미 반영되었을 수 있습니다.');
        });
    }

    useEffect(() => {
      _getData()
      
    }, [])  

    const _getData = async () => {
      const res = await axios.get('/api/profCourseStudent',{params:{Ccode:Ccode, Cyear:Cyear, Csem:Csem}});
      //let cover2 = {};
      if(res.data === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        return setlist(cover)
      }
      //console.log(res.data.length);
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
              <Table dataSource={list} columns={columns} pagination={30} size="small" rowKey="course_code"/>
              : null}          
          </div>

          

          <br></br>
          <br></br>
          </div>
            
    )
}

export default GradeCoursePage;