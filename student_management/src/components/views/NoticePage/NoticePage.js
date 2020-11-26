import React, { useState } from 'react'
import { Table, Form, Select, Button, Tag, Space } from 'antd';
import Axios from 'axios';
import './NoticePage.css'

const { Column } = Table;
const { Option } = Select;

const termData = ['2020년도 1학기', '2020년도 2학기', '2019년도 1학기'];    // 단과대학, 전공 데이터



function NoticePage() {
    const [course, setcourse] = useState([])
    const [notice, setnotice] = useState([])
    const id = localStorage.getItem('id')
    const handleTermChange = value => {  // 단과대학 변할 때 state 변화
        const number = value.replace(/[^0-9]/g, '');
        const courses = []
        if (number % 2 === 0) {
            let date = { id: id, year: (number - 2) / 10, term: 2 }
            Axios.get('/api/notice/course', { params: date })
                .then(res => {
                    res.data.map(c => {
                        courses.push(c)
                    })
                })

        } else {
            let date = { id: id, year: (number - 1) / 10, term: 1 }
            Axios.get('/api/notice/course', { params: date })
                .then(res => {
                    res.data.map(c => {
                        courses.push(c)
                    })
                })

        }
        setTimeout(function () {
            setcourse(courses)
        }, 100) //임의로 시간줘서 데이터 다 받아오기
    };

    const onCourseChange = value => {      // 전공 선택시
        const data = { code: value, year: course[0].year, term: course[0].semester }
        Axios.get('/api/notice/list', { params: data })
            .then(res => {
                setnotice(res.data)
            })
    };



    const handleChange = (value) => {
        console.log(value)
    }

    const handleChange2 = (value) => {
        console.log(value)
    }

    return (
        <div className="font_ntc">
            <Select

                style={{ width: 300 }}
                onSelect={handleTermChange}
            >
                {termData.map(college => (
                    <Option key={college}>{college}</Option>
                ))}
            </Select>
            <Select
                style={{ width: 250 }}
                onSelect={onCourseChange}
            >
                {course.map(Course => (
                    <Option key={Course.course_code}>{Course.course_code}</Option>
                ))}
            </Select>

            <div className="notice_table_user">

                <Table dataSource={notice} rowKey="noticeID">
                    <Column title="번호" dataIndex="noticeID" key="id" />
                    <Column
                        title="제목"
                        key="action"
                        dataIndex="noticeName"
                        render={action => (
                            <Space size="middle">
                                <a href="/user/notice/spec">{action}</a>
                            </Space>
                        )}
                    />
                    <Column title="범주" dataIndex="noticeCriteria" key="c"
                        render={c => (
                            <>
                                {c === '공지' ?
                                    <Tag color="blue">{c}</Tag>
                                    : c === '과제' ?
                                        <Tag color="red">{c}</Tag>
                                        : <Tag color="green">{c}</Tag>
                                }</>)}
                    />
                    <Column title="작성자" dataIndex="userID" key="u" />
                    <Column title="작성일" dataIndex="createdAt" key="c" />

                </Table>
            </div>
        </div>


    )
}

export default NoticePage
