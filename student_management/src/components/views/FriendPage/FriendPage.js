/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router";
import { Table, Tag, Space, Button, } from 'antd';
import axios from 'axios'
import './Request/FriendRequestPage.css'
import { CalendarTwoTone, FundTwoTone } from '@ant-design/icons';
const { Column } = Table;
const position = localStorage.getItem('position')
function FriendPage() {

  const [friend, setFriend] = useState([])
  const id = localStorage.getItem('id')
  const history = useHistory();
  useEffect(() => {
    axios.get('/api/userFriend/list', { params: id })
      .then(res => {
        setFriend(res.data)
      })
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps   

  const handleClick = (e) => {
    history.push({
      pathname: "/friend/schedule",
      state: {
        friendID: e.currentTarget.id,
        friendName: e.currentTarget.name
      }
    })
  }

  const handleGrade = (e) => {
    history.push({
      pathname: "/friend/grade",
      state: {
        friendID: e.currentTarget.id,
        friendName: e.currentTarget.name
      }
    })
  }
  return (

    <div>
      <div className="friend_table_menu" style={{ fontSize: 30, paddingBottom: 40 }}>
        친구 목록
        </div>
      <div className="friend_table_user">


        <Table dataSource={friend} rowKey="userID" pagination={{ pageSize: 5 }}>
          <Column title="ID" dataIndex="userID" key="ids" />
          <Column title="이름" dataIndex="userName" key="s" />
          <Column title="직급" dataIndex='userPosition' key="p"
            render={p => (
              <>
                {p === '학부생' ?
                  <Tag color="blue">{p}</Tag>
                  : p === '교수' ?
                    <Tag color="red">{p}</Tag>
                    : <Tag color="green">{p}</Tag>
                }</>)}
          />
          <Column title="소속" dataIndex="userCollege" key="c" />
          <Column title="주소" dataIndex="userAddress" key="ad" />
          <Column
            title="시간표"
            key="f"
            dataIndex="noticeFiles"
            render={(text, record) => (
              <Space size="middle">
                { record.userPosition === '학부생' ?
                  <Button type="text" style={{ fontSize: 18 }} id={record.userID} name={record.userName} onClick={handleClick}><CalendarTwoTone /></Button>
                  : null}
              </Space>
            )} />

          <Column
            title="성적"
            key="grade"
            dataIndex="noticeFiles"
            render={(text, record) => (
              <Space size="middle">
                { record.userPosition === '학부생' ?
                  <Button type="text" style={{ fontSize: 18 }} id={record.userID} name={record.userName} onClick={handleGrade}><FundTwoTone/></Button>
                  : null}
              </Space>
            )} />
        </Table>
      </div>
    </div>
  )
}

export default FriendPage

