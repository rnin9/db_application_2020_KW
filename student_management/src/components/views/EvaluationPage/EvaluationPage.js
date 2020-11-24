import React, { Component } from 'react';
import { AutoComplete, Table, Tag, Button } from 'antd';
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
  {
    title: '태그',
    dataIndex : 'tags',
    key : 'tags',
    render: tags =>(
      <>
        {tags.map(tag => {
          let color;
          if(tag === '꿀잼보장' || tag === 'A폭격기' || tag === '인터넷강의'){
            color = 'green';
          }
          else if(tag ==='F폭격기' || tag === '수면제수업' || tag === '조별과제'){
            color = 'volcano';
          }
          else{
            color = 'stop';
          }
          return(
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  }
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
      let cover2=[];
      for(let i=0;i<res.data.length;i++){
        var cover = {
          idx:0,
          user_id:'',
          course_code:'',
          year:0,
          semester:0,
          rating:0,
          content:'',
          upvote:0,
          tags:[],
        }
        cover.idx=res.data[i].idx;
        cover.user_id=res.data[i].user_id;
        cover.course_code=res.data[i].course_code;
        cover.year=res.data[i].year;
        cover.semester=res.data[i].semester;
        cover.rating=res.data[i].rating;
        cover.content=res.data[i].content;
        cover.upvote=res.data[i].upvote;
        
        
        const res2 = await axios.get('/api/userEvalTag',{params:{user_id:cover.user_id, course_code:cover.course_code}});
        for(let j=0;j<res2.data.length;j++){
          cover.tags.push(res2.data[j].tag);
        }
        cover2.push(cover);
      }
      
      this.setState({ list : cover2 });
    }


    render(){
        const { list } = this.state;
       
        return(
          <div style={{margin: AutoComplete}}> 
          <div className="table">
            <h2>수업 평가</h2>
          </div>
          
          
          <div className="table_eval">
            <div className="add_Eval">
              <Button type="primary">
                <a href="/write/eval">
                수강평 작성
                </a>
              </Button>
            </div>

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