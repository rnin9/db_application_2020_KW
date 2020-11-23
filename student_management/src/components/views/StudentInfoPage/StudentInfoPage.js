import React,{ useState } from 'react'
import {Table,  Form, Select, Button } from 'antd';
import './StudentInfoPage.css'
import Axios from 'axios';

const { Option } = Select;

const collegeData = ['소프트웨어융합대학', '전자정보공과대학','자연대학'];    // 단과대학, 전공 데이터
    const majorData = {
    소프트웨어융합대학: ['컴퓨터정보공학부', '소프트웨어학부', '정보융합학부'],
    전자정보공과대학: ['컴퓨터공학과', '전자공학과', '전자재료공학과'],
    자연대학: ['수학과', '전자바이오물리학과'],
    };

    const columns = [
        {
          title: 'Name',
          dataIndex: 'userName',
          filters: [
            {
              text: '강',
              value: '강',
            },
            {
              text: '김',
              value: '김',
            },
            {
              text: '이',
              value: '이',
            },
          ],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.userName.indexOf(value) === 0,
        },
        {
          title: '학번',
          dataIndex: 'userGrade',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.userGrade - b.userGrade,
        },
        {
            title: 'e-mail',
            dataIndex: 'userEmail',
            filters: [
              {
                text: '네이버',
                value: 'naver',
              },
              {
                text: '광운대',
                value: 'kw',
              },
              {
                text: '구글',
                value: 'gmail',
              },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.userEmail.indexOf(value) !== -1
          },
        {
          title: 'Address',
          dataIndex: 'userAddress',
          filters: [
            {
              text: '서울시',
              value: '서울시',
            },
            {
              text: '부산시',
              value: '부산시',
            },
          ],
          filterMultiple: false,
        onFilter: (value, record) => record.userAddress.includes(value),
        },
      ];

function StudentInfoPage() {
    const [Majors, setMajors] = useState(majorData[collegeData[0]])
    const [Major, setMajor] = useState(majorData[collegeData[0]][0])    
    const [data, setdata] = useState([])
    const handleCollegeChange = value => {  // 단과대학 변할 때 state 변화
            setMajors(majorData[value])
            setMajor(majorData[value][0])
       };
    
    const onMajorChange = value => {      // 전공 선택시
            setMajor(value)
      };
    
    const onFinish = value=>{
        const data = {college: value.college ,major: value.major}
        Axios.get('/api/student/list',{params:data})
        .then(res=>{
            setdata(res.data)
        })
    }
    
    return (
        <div className="font">
            <div className="studentInfo_header">
            <h2>학생 정보</h2>
            </div>
            <div className="studentInfo_spinner">
            <Form
             name="customized_form_controls"
             layout="inline"
             onFinish={onFinish}>
            <Form.Item  name="college">
            <Select

          style={{ width: 300 }}
          onChange={handleCollegeChange}
        >
          {collegeData.map(college => (
            <Option key={college}>{college}</Option>
          ))}
          </Select>
          </Form.Item>
          <Form.Item name="major">
          <Select 
          style={{ width: 250 }}
          onChange={onMajorChange}
          value={Major}
        >
          {Majors.map(major => (
            <Option key={major}>{major}</Option>
          ))}
        </Select>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          찾기
        </Button>
      </Form.Item>
        </Form>
            </div>
            <div className="studentInfo_table">
            <Table columns={columns} dataSource={data} rowKey="userID"/>
            </div>
        </div>
    )
}

export default StudentInfoPage
