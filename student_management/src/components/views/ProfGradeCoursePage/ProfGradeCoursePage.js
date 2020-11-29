import React, { Component } from 'react';
import { AutoComplete, Col, Table, } from 'antd';
import './ProfGradePage.css'
import axios from 'axios';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';


const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
//const cCode = this.props.location.state.ccode;
const columns = [
  {
    title: '학정번호',
    dataIndex: 'Course_num',
    key: 'cid',
  },
  {
    title: '과목명',
    dataIndex: 'Course_name',
    key: 'cname',
  },
  
  {
    title: '수업시간',
    dataIndex: 'class_time',
    key: 'ctime',
  },
  {
    title: '이수구분',
    dataIndex: 'classification',
    key: 'cf',
  },
  {
    title: '수강생',
    dataIndex: 'headcount_now',
    key: 'hn',
  },
];


class GradeCoursePage extends Component{

    constructor(props) {
        super(props)
        this.state = {
          name : '',
          list : [],
          credit : [],
          update : false,
        }    
      }
    
    componentDidMount(){
      this._getData()
    }
    _getData = async () => {
      
      const res = await axios.get('/api/profCourse',{params:userID});
      //let cover2 = {};
      if(res.data === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }


    render(){
        const { list } = this.state;
        const { credit } = this.state;
        return(
          <div style={{margin: AutoComplete}}>
          

          <div className="table">            
            <h3>{userName} 교수님의 수업 목록입니다.</h3>
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
            
        )};
}

export default GradeCoursePage;