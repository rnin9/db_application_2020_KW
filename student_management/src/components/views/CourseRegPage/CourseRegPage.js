import React, { Component } from 'react';
import { AutoComplete, Table, Radio, Divider, Button } from 'antd';
import './CourseRegPage.css'
import axios from 'axios';

const columns = [
  {
    title: '학정번호',
    dataIndex: 'Course_num',
    key: 'Course_num',
  },
  {
    title: '과목명',
    dataIndex: 'Course_name',
    key: 'Course_name',
  },
  
  {
    title: '학과',
    dataIndex: 'major',
    key: 'major',
  },
  {
    title: '이수',
    dataIndex: 'classification',
    key: 'classification',
  },
  {
    title: '학점',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: '강의시간',
    dataIndex: 'class_time',
    key: 'class_time',
  },
];

const rowSelection = {
  onChange:(selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys+' / '+selectedRows);
  }
}

class CourseRegPage extends Component{
  

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
                <Table rowSelection={{type:Radio}} pagination={{ pageSize : 30 }} dataSource={list} columns={columns} size="small" rowKey="Course_num"/>
                : null}
            
            </div>
            
            <div>
              <Button type="primary">수강 신청</Button>
            </div>
          </div>
            
        )};
}

export default CourseRegPage;