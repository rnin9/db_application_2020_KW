import React, { Component } from 'react';
import { AutoComplete, Table, } from 'antd';
import './EvaluationPage.css'
import axios from 'axios';


const columns = [
  {
    title: '번호',
    dataIndex: 'idx',
    key: 'idx',
  },
  {
    title: '과목명',
    dataIndex: 'course_code',
    key: 'cname',
  },
  
  {
    title: '수강연도',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: '수강학기',
    dataIndex: 'semester',
    key: 'semester',
  },
  {
    title: '평점',
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: '내용',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '좋아요',
    dataIndex: 'upvote',
    key: 'upvote',
  },
];

class EvaluationPage extends Component{

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
      const res = await axios.get('/api/userEval');     
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
            <h2>수업 평가</h2>
          </div>
          
          <div className="table">
            
          
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
            
        )};
}

export default EvaluationPage;