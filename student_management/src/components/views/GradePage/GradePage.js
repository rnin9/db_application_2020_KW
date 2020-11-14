import React, { Component } from 'react';
import { AutoComplete, Table, } from 'antd';
import './GradePage.css'
import axios from 'axios';

const columns = [
  {
    title: '학정번호',
    dataIndex: 'user_id',
    key: 'cid',
  },
  {
    title: '과목명',
    dataIndex: 'course_code',
    key: 'cname',
  },
  
  {
    title: '개설학과',
    dataIndex: 'depart',
    key: 'depart',
  },
  {
    title: '이수구분',
    dataIndex: 'userEmail',
    key: 'email',
  },
  {
    title: '학점',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: '성적',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: '인증구분',
    dataIndex: 'grade',
    key: 'add',
  },
  {
    title: '재수강여부',
    dataIndex: 'Retake',
    key: 'retake',
  },
];

class GradePage extends Component{

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
      const res = await axios.get('/api/userGrade');     
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
            <h2>성적/수강 정보</h2>
          </div>
           <div className="table_grade">
           
            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="course_code"/>
              : null}
          
          </div>
          </div>
            
        )};
}

export default GradePage;