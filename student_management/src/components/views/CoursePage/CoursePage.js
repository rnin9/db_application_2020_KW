import React, { Component } from 'react';
import { AutoComplete, Table, } from 'antd';
import './CoursePage.css'
import axios from 'axios';

const columns = [
  {
    title: '학정번호',
    dataIndex: 'Course_num',
    key: 'cid',
  },
  {
    title: '과목명',
    dataIndex: 'course_code',
    key: 'cname',
  },
  
  {
    title: '학과',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: '분류',
    dataIndex: 'classification',
    key: 'classification',
  },
  {
    title: '학점',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: '장소',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: '년도',
    dataIndex: 'course_year',
    key: 'year',
  },
  {
    title: '학기',
    dataIndex: 'semester',
    key: 'semester',
  },
];

class CoursePage extends Component{

    constructor(props) {
        super(props)
        this.state = {
          name : '',
          list : [],
          update : false,
        }    
      }
    
    componentDidMount(){
      this._getData()
    }

    _getData = async () => {
      const res = await axios.get('/api/course');     
      if(res.data[0] === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }


    render(){
        const { list } = this.state;
        
        return(
          <div style={{margin: AutoComplete}}> 
          <div className="table">
            <h2>강의 정보</h2>
          </div>
           <div className="table_course">
           
            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="Course_num"/>
              : null}
          
          </div>
          </div>
            
        )};
}

export default CoursePage;