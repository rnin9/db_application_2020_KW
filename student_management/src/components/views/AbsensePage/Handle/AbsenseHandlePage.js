import React, { useState } from 'react'
import Axios from 'axios'
import {  CloseCircleTwoTone, CheckCircleOutlined, SyncOutlined, ContactsTwoTone , ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Input, Space, Button, Tag, message, Select, Modal } from 'antd'
import './AbsenseHandlePage.css'

const { Search } = Input;
const {Option} = Select;
const { Column } = Table;
const { confirm } = Modal;

function AbsenseHandlePage() {
    const [data, setdata] = useState([])
    const [handleData, sethandleData] =useState([])
    const handleAbsense = () => {
        console.log('handle Absense')
    }
    const onSearchAbsense = (value) => {
        Axios.get('/api/absense/list', { params: value })
            .then(res => {
                if (res.data === false)
                    message.error('휴학생이 아닙니다!')
                else {
                    setdata(res.data)
                }
            })
    }
    const onSearchReturning = (value) => {
        Axios.get('/api/absense/continue/list', { params: value })
            .then(res => {
                if (res.data === false)
                    message.error('휴학생이 아닙니다!')
                else {
                    sethandleData(res.data)
                }
            })
    }

    const handleDelete = () => {
        confirm({
            title: '삭제하시겠습니까? ',
            icon: <ExclamationCircleOutlined />,
            content: '삭제 후엔 복구 할 수 없습니다.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                let datas = {id: handleData[0].userID, start: handleData[0].absenseStart}
              Axios.delete('/delete/absense',{data:datas})
              .then(res=>{
                  if(res.data ===false){
                      message.error('삭제에 실패했습니다!')
                  }
                  else{
                      sethandleData([])
                      message.success('휴학생 정보를 삭제했습니다!')
                  }
              })
            },
            onCancel() {
              message.warning('삭제를 취소하였습니다.')
            },
          });
    }

    const handleReturning = (value) => {
        confirm({
            title: '복학처리하시겠습니까? ',
            icon: <ExclamationCircleOutlined />,
            content: '복학 처리 후 수정할 수 없습니다.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                let datas = {id: handleData[0].userID, start: handleData[0].absenseStart, return: true}
              Axios.post('/update/absense',{data:datas})
              .then(res=>{
                  if(res.data ===false){
                      message.error('변경에 실패했습니다!')
                  }
                  else{
                      sethandleData([])
                      message.success('복학 처리되었습니다!')
                  }
              })
            },
            onCancel() {
              message.warning('변경을 취소하였습니다.')
            },
          });
    }

    return (
        <div className="font_abh">
            <div>
                <h2 style={{ paddingTop: 20 }}>휴학 정보</h2>
            </div>

            <div className="friend_search">
                <Search
                    placeholder="아이디를 입력하세요!"
                    onSearch={onSearchAbsense}
                    enterButton="검색"

                />
            </div>
            <div className="absense_table_user">

                <Table dataSource={data} rowKey="absenseStart">
                    <Column title="ID" dataIndex="userID" key="id" />
                    <Column title="이름" dataIndex={['USER', 'userName']} key="name" />
                    <Column title="학번" dataIndex={['USER', 'userGrade']} key="g" />
                    <Column title="휴학시작일" dataIndex="absenseStart" key="start" />
                    <Column title="복학예정일" dataIndex="absenseFinish" key="finish" />
                    <Column title="복학신청" dataIndex="absenseReturning" key="r"
                        render={r => (
                            <>
                                {r === true ?
                                    <Tag icon={<CheckCircleOutlined style={{ marginBottom: 3 }} />} color="success">완료</Tag>
                                    : <Tag icon={<SyncOutlined spin />} color="processing">휴학중</Tag>
                                }</>)} />
                    <Column title="분류" dataIndex="absenseCriteria" key="c"
                        render={c => (
                            <>
                                {c === '일반휴학' ?
                                    <Tag color="blue">{c}</Tag>
                                    : c === '병가휴학' ?
                                        <Tag color="red">{c}</Tag>
                                        : <Tag color="green">{c}</Tag>
                                }</>)}
                    />
                </Table>
            </div>
            <div>
                <h2 style={{marginTop:10}}>휴학 관리</h2>
            </div>
            <div className="friend_search">
                <Search
                    placeholder="아이디를 입력하세요!"
                    onSearch={onSearchReturning}
                    enterButton="검색"

                />
            </div>
            <div className="absense_table_user">
            <Table dataSource={handleData} rowKey="absenseStart">
                <Column title="ID" dataIndex="userID" key="id" />
                <Column title="이름" dataIndex={['USER', 'userName']} key="name" />
                <Column title="학번" dataIndex={['USER', 'userGrade']} key="g" />
                <Column title="복학예정일" dataIndex="absenseFinish" key="finish" />
                <Column title="분류" dataIndex="absenseCriteria" key="c"
                    render={c => (
                        <>
                            {c === '일반휴학' ?
                                <Tag color="blue">{c}</Tag>
                                : c === '병가휴학' ?
                                    <Tag color="red">{c}</Tag>
                                    : <Tag color="green">{c}</Tag>
                            }</>)}
                />
                <Column
                    title=""
                    key="action"
                    render={() => (
                        <Space size="middle">
                            <Button type="text" style={{ fontSize: 20 }} onClick={handleReturning}><ContactsTwoTone /></Button>
                            <Button type="text" style={{ fontSize: 18 }} onClick={handleDelete}><CloseCircleTwoTone /></Button>
                        </Space>
                    )}
                />
            </Table>
            </div>
        </div>
    )
}

export default AbsenseHandlePage
