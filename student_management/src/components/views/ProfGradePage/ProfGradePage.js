import React, { Component } from 'react';
import { AutoComplete, Col, Table, } from 'antd';
import './ProfGradePage.css'
import axios from 'axios';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';


const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
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

const c_columns= [
  {
    title: '신청학점',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: '취득학점',
    dataIndex: 'credit',
    key: 'credit',
  },
  {
    title: '평량평균',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: '평량평균',
    dataIndex: 'grade',
    key: 'grade',
  },
];

const cover3 ={
  sub_sum:0,
  sub_liberal:0,
  sub_etc:0,
  sub_major:0,
  get_sum:0,
  get_liberal:0,
  get_etc:0,
  get_major:0,
  grade_sum:0,
  grade_liberal:0,
  grade_etc:0,
  grade_major:0,
}

class GradePage extends Component{

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
      
      const res = await axios.get('/api/userGrade',{params:userID});     
      var res2 = await axios.get('/api/userMajorSubCredit',{params:userID});
      //let cover2 = {};
      if(res.data === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
      cover3.sub_major= res2.data[0].sub_major;
      res2 = await axios.get('/api/userAllSubCredit',{params:userID});
      cover3.sub_sum=res2.data[0].sub_sum;
      res2 = await axios.get('/api/userLiberalSubCredit',{params:userID});
      cover3.sub_liberal=res2.data[0].sub_liberal;
      res2 = await axios.get('/api/userEtcSubCredit',{params:userID});
      cover3.sub_etc=res2.data[0].sub_etc;

      
      res2 = await axios.get('/api/userAllGetCredit',{params:userID});
      cover3.get_sum=res2.data[0].get_sum;
      res2 = await axios.get('/api/userMajorGetCredit',{params:userID});
      cover3.get_major=res2.data[0].get_major;
      res2 = await axios.get('/api/userLiberalGetCredit',{params:userID});
      cover3.get_liberal=res2.data[0].get_liberal;
      res2 = await axios.get('/api/userEtcGetCredit',{params:userID});
      cover3.get_etc=res2.data[0].get_etc;

      res2 = await axios.get('/api/userAllGrade',{params:userID});
      cover3.grade_sum=res2.data[0].grade_sum;
      res2 = await axios.get('/api/userMajorGrade',{params:userID});
      cover3.grade_major=res2.data[0].grade_major;
      res2 = await axios.get('/api/userLiberalGrade',{params:userID});
      cover3.grade_liberal=res2.data[0].grade_liberal;
      res2 = await axios.get('/api/userEtcGrade',{params:userID});
      cover3.grade_etc=res2.data[0].grade_etc;

      let cover2 = [];
      cover2.push(cover3);
      this.setState({ credit : cover2 })
      /*
      if(res2.data[0] === undefined){
        cover2[0]=(res2.data);
        console.log("CREDIT : "+res2.data);
        return this.setState({ credit : cover2 })
      }
      this.setState({ credit : res2.data });

      const res3 = await axios.get('/api/userAllSubCredit',{params:userID});

      if(res3.data[0] === undefined){
        cover2[1]=(res3.data);
        console.log("CREDIT : "+res3.data);
        return this.setState({ credit : cover2 })
      }
      this.setState({ credit : cover2 });
      */
    }


    render(){
        const { list } = this.state;
        const { credit } = this.state;
        return(
          <div style={{margin: AutoComplete}}> 
          <div className="table">
            <h2>성적/수강 정보</h2>
          </div>
          
          <div className="table_grade">
            <Table size="small" bordered dataSource={credit} loading={false}>
                <ColumnGroup title="신청학점">
                  <Column title="전공" dataIndex="sub_major" key="sub_major"/>
                  <Column title="교양" dataIndex="sub_liberal" key="sub_liberal"/>
                  <Column title="기타" dataIndex="sub_etc" key="sub_etc"/>
                  <Column title="계" dataIndex="sub_sum" key="sub_sum"/>
                </ColumnGroup>
                <ColumnGroup title="취득학점">
                  <Column title="전공" dataIndex="get_major" key="get_major"/>
                  <Column title="교양" dataIndex="get_liberal" key="get_liberal"/>
                  <Column title="기타" dataIndex="get_etc" key="get_etc"/>
                  <Column title="계" dataIndex="get_sum" key="get_sum"/>
                </ColumnGroup>
                <ColumnGroup title="평량평균">
                <Column title="전공" dataIndex="grade_major" key="grade_major"/>
                  <Column title="교양" dataIndex="grade_liberal" key="grade_liberal"/>
                  <Column title="기타" dataIndex="grade_etc" key="grade_etc"/>
                  <Column title="계" dataIndex="grade_sum" key="grade_sum"/>
                </ColumnGroup>
              </Table>
          </div>

          <div className="table">            
            <h3>{userName} 학생의 학기별 수강 정보입니다.</h3>
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

export default GradePage;