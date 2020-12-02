import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { AutoComplete, Table, Tag, Button, message } from 'antd';
import { Chart } from "react-google-charts";
import { LikeOutlined, StarTwoTone, LoadingOutlined } from '@ant-design/icons';
import './EvaluationDetailPage.css'
import axios from 'axios';

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');

function EvaluationDetailPage(){

  const [list, setlist] = useState([])
  const [barGraph, setBar] = useState([])
  const [pieGraph, setPie] = useState([])
  const location = useLocation();
  const Ccode = location.state.ccode;
  const Cname = location.state.cname;

  const pieGraph_data = [['College','count'],];
  const barGraph_data =[['성별','비율',{role:'style'}],];

  const columns = [
    {
      title: '평점',
      dataIndex: 'rating',
      key: 'rating',
      render : (key) => (
        <div><StarTwoTone twoToneColor="#FFE400"/> {key}</div>
      )
    },
    {
      title: '내용',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '추천수',
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
            if(tag === '꿀잼' || tag === 'A폭격기' || tag === '인터넷강의'){
              color = 'green';
            }
            else if(tag ==='F폭격기' || tag === '노잼' || tag === '조별과제'){
              color = 'volcano';
            }
            else{
              color = 'default';
            }
            return(
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title : '좋아요',
      key : 'upvoteBtn',
      render : (text, record) => (
        <Button type='primary' onClick={onClick} id={record.user_id}><LikeOutlined /></Button>
      )
    }
  ];

  useEffect(() => {
    _getData()
  }, [])

  // 좋아요를 누른적이 없다면 좋아요+1로 업데이트 기록이 있다면 불가능
  // 좋아요를 누른 user_id(userID), 리뷰 작성자의 user_id, 학정번호 3가지가 필요(Ccdoe)
  const onClick = (e)=>{
    console.log(e.currentTarget.id);
    const datas = {upvoteID:userID, reviewerID:e.currentTarget.id, ccode:Ccode};
    axios('/update/upvote', {method:'POST', headers:new Headers(), data:datas})
      .then(res =>{
        console.log(res.data);
        if(res.data[0].success === 'success') message.success('성공적으로 반영되었습니다.');
        else message.error('한 리뷰에 대해 좋아요는 한 번만 가능합니다.');
      });
  }

  const _getData = async () => {
      const pie = await axios.get('/api/Eval/depart',{params:Ccode});
      const bar = await axios.get('/api/Eval/sex',{params:Ccode});
      const res = await axios.get('/api/userEval/datail',{params:Ccode});
      var all=0;
      for(let i=0;i<bar.data.length;i++){
        all = all + bar.data[i].cnt;
      }
      for(let i=0;i<bar.data.length;i++){
        var sex;
        if(bar.data[i].gender==='여성') sex='color: #C5A5CF';
        else sex='color: gold'
        console.log(sex);
        barGraph_data.push([bar.data[i].gender,(bar.data[i].cnt/all*100),sex]);
      }
      for(let i=0;i<pie.data.length;i++){
        console.log(pie.data[i].college);
        pieGraph_data.push([pie.data[i].college,pie.data[i].cnt]);
      }
      setBar(barGraph_data);
      setPie(pieGraph_data);
      let cover2=[];
      for(let i=0;i<res.data.length;i++){
        var cover = {
          idx:0,
          user_id:'',
          Course_name:'',
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
        cover.Course_name=res.data[i].Course_name;
        cover.course_code=res.data[i].course_code;
        cover.year=res.data[i].year;
        cover.semester=res.data[i].semester;
        cover.rating=res.data[i].rating;
        cover.content=res.data[i].content;
        cover.upvote=res.data[i].upvote;
        console.log(cover.user_id);
        
        const res2 = await axios.get('/api/userEval/detail/tag',{params:{user_id:cover.user_id, course_code:cover.course_code}});
        for(let j=0;j<res2.data.length;j++){
          cover.tags.push(res2.data[j].tag);
        }
        cover2.push(cover);
        
      }
      
      setlist(cover2);
      
    }


        return(
          <div style={{margin: AutoComplete}}> 
          <div className="table">
            <h2>{Cname} 강의평</h2>
          </div>
          
          
          <div className="table_eval">
            <div className="add_Eval">
              <Button type="primary" style={{float:"right"}}>
                <a href="/write/eval">
                수강평 작성
                </a>
              </Button>
            </div>

            <div className="table_chart">
              <Chart
                width={450}
                height={300}
                chartType="Bar"
                loader={<div><LoadingOutlined/></div>}
                data={barGraph}
                options={{
                  chartArea:{width:'30%'},
                  title:'수강생 성별 비율',
                  vAxis:{
                    title:'비율',
                    minValue:0,
                    maxValue:100,
                  }
                }}
              />
              <Chart
                width={470}
                height={300}
                chartType="PieChart"
                loader={<div style={{marginLeft:10}}>Loading...</div>}
                data={pieGraph}
                options={{
                  title:'수강생 단과대학 비율',
                }}
              />
            </div>

            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="course_code"/>
              : null}
              

          </div>
          <br></br>
          <br></br>
          </div>
            
        );
}

export default EvaluationDetailPage;