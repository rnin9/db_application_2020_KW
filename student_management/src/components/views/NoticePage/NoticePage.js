import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router";
import { Table, Form, Select, Button, Tag, Space, Collapse, Pagination } from 'antd';
import { SaveTwoTone } from '@ant-design/icons';

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
        if (number % 2 === 0) {
            let date = { id: id, year: (number - 2) / 10, term: 2 }
            Axios.get('/api/notice/course', { params: date })
                .then(res => {
                    setcourse(res.data)
                })

        } else {
            let date = { id: id, year: (number - 1) / 10, term: 1 }
            Axios.get('/api/notice/course', { params: date })
                .then(res => {
                    setcourse(res.data)                   
                })

        }
    };

    const onCourseChange = value => {      // 전공 선택시
        const p = course[course.findIndex(obj=> obj.Course_num === value)].professor_id
        const data = { code: value, year: course[0].year, term: course[0].semester, id: p }
        Axios.get('/api/notice/list', { params: data })
            .then(res => {
                setnotice(res.data)
            })
    };

    return (
        <div className="font_ntc">

            <h2 style={{paddingTop:30, marginBottom:20}}>공지사항</h2>
            <Select

                style={{ width: 203 }}
                onSelect={handleTermChange}
            >
                {termData.map(term => (
                    <Option key={term}>{term}</Option>
                ))}
            </Select>
            <Select
                style={{ width: 520 }}
                onSelect={onCourseChange}
            >
                {course.map(Course => (
                   <Option key={Course.Course_num}>{'['+Course.Course_num+'] '}{Course.Course_name}</Option>
                ))}
            </Select>

            <div className="notice_table_user">

                <Table dataSource={notice} rowKey="noticeID"
                    expandableRowIcon={<SaveTwoTone/>}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.noticeContent}</p>}
                >
                    <Column title="번호" dataIndex="noticeID" key="id" />
                    <Column
                        title="제목"
                        key="action"
                        dataIndex="noticeName"
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
                    <Column title="작성자" dataIndex={['USER','userName']} key="u" />

                    <Column title="작성일" dataIndex="createdAt" key="c" />

                    <Column
                        title=""
                        key="f"
                        dataIndex="noticeFiles"
                        render={f => (
                            <Space size="middle">
                            { f !=='0'?
                            <a href={`/file/${f}`} target="_blank" rel="noopener noreferrer" download>
                            <Button type="text" style={{ fontSize: 18 }} id={f}><SaveTwoTone /></Button>
                            </a>
                            : null}
                            </Space>
                        )}
                    />
                    {/* <Pagination defaultCurrent={1}
                                defaultPageSize={4}
                                total={2}
                    ></Pagination> */}
                </Table>
            </div>
        </div>


    )
}

export default NoticePage
