import React, { useState, useEffect } from 'react';
import { AutoComplete, Col, Table} from 'antd';
import { Chart } from "react-google-charts";
import { LoadingOutlined} from '@ant-design/icons';
import './GradePage.css'
import axios from 'axios';
// import { select } from 'd3';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';




const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
const columns = [
  {
    title: '학정번호',
    dataIndex: 'course_code',
    key: 'course_code',
  },
  {
    title: '과목명',
    dataIndex: 'Course_name',
    key: 'cname',
  },
  
  {
    title: '개설학과',
    dataIndex: 'major',
    key: 'major',
    filters: [
      {
        text: '컴정공',
        value: '컴퓨터정보공학',
      },
      {
        text: '컴소',
        value: '컴퓨터소프트웨어',
      },
      {
        text: '전기공',
        value: '전기공학',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.major.indexOf(value) !== -1
  },
  {
    title: '년도',
    dataIndex: 'year',
    key: 'year',

    // filters: [
    //   {
    //     text: '2020',
    //     value: 2020,
    //   },
    //   {
    //     text: '2019',
    //     value: 2019,
    //   },
    //   {
    //     text: '2018',
    //     value: 2018,
    //   },
    // ],
    // filterMultiple: false,
    // onFilter: (value, record) => (record.year == value)
    
  },
  {
    title: '학기',
    dataIndex: 'semester',
    key: 'semester',
  },
  {
    title: '이수구분',
    dataIndex: 'classification',
    key: 'classification',
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
    render : (grade) => (
      <div>{grade==='4.5'? 'A+' : grade==='4.0'? 'A0': grade==='3.5'?'B+':grade==='3.0'?'B0':grade==='2.5'?'C+':grade==='2.0'?'C0':grade==='1.5'?'D+':grade==='1.0'?'D0':grade==='0'?'F':'미입력'}</div>
    )
  },
  {
    title: '인증구분',
    dataIndex: 'classification',
    key: 'classification',
  },
  {
    title: '재수강여부',
    dataIndex: 'Retake',
    key: 'retake',
    render : (key) =>(
      <div>{key===0?'X' :'O' }</div>
    )
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



function GradePage (){
    const [list, setlist] = useState([])
    const [lineGraph, setLineGraph] = useState([])
    const [pieGraph, setPieGraph] = useState([])
    const [credit, setcredit] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const lineChart_data = [['term','score'],];
    const pieChart_data = [['classification', 'credit'],];

    useEffect(() => {
      _getData()
      
    }, [])  
    
    const _getData = async () => {
      const chart_res = await axios.get('/api/userGradeGraph', {params:userID});
      for(let i=0;i<chart_res.data.length;i++){
        const sem_f=parseFloat( chart_res.data[i].sem );
        var str =chart_res.data[i].year;
        if(sem_f===2.0) str=str+'년도 2학기';
        else if(sem_f===1.0) str=str+'년도 1학기';
        else if(sem_f===1.5) str=str+'년도 여름 학기';
        else if(sem_f===2.5) str=str+'년도 겨울 학기';

        lineChart_data.push([str, parseFloat(chart_res.data[i].grade)]);
      }
      setLineGraph(lineChart_data);

      const pie_res = await axios.get('/api/userClassificationGraph', {params:userID});
      for(let i=0;i<pie_res.data.length;i++){
        pieChart_data.push([pie_res.data[i].classification, parseInt(pie_res.data[i].credit,10)]);
      }
      setPieGraph(pieChart_data);
      console.log(pieChart_data);

      const res = await axios.get('/api/userGrade',{params:userID});     
      var res2 = await axios.get('/api/userMajorSubCredit',{params:userID});
      //let cover2 = {};
      if(res.data === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        setlist(cover)
        setisLoading(false)
        return
      }
      setlist(res.data);
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
      setcredit(cover2);
      setisLoading(false);

    }

        return(
          <div style={{margin: AutoComplete, overflowY:"scroll"}}>
            {!isLoading ? (<div>
          <div className="table">
            <h2>성적/수강 정보</h2>
          </div>
          <div className="table_chart">
            <Chart
              // className="table_grade"
              width={500}
              height={250}
              chartType="LineChart"
              loader={<div>Loading CHART</div>}
              data={lineGraph}
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
                legend:'none',
              }}
            />

            <Chart
              // className="table_grade"
              width={300}
              height={250}
              chartType="PieChart"
              loader={<div>Loading CHART</div>}
              data={pieGraph}
              options={{
                title:'전공/교양 학점 비율',
              }}
            />
          </div>
          <div className="table_grade">
            <Table size="small" bordered dataSource={credit} loading={false} rowKey="sub_major">
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
          <div style={{height:200}}>

          <div className="table">            
            <h3>{userName} 학생의 학기별 수강 정보입니다.</h3>
          </div>
          
          <div className="table_grade">          
            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="course_code"/>
              :null}         
          </div>
          </div>
          </div>
          ):  (<div className="grade_loading"><LoadingOutlined style={{fontSize:30, marginRight:10}}/> Loading...</div>)}
          

          <br></br>
          <br></br>
          <div style={{paddingBottom:30}}>

          </div>
          </div>
            
        )
}

export default GradePage;