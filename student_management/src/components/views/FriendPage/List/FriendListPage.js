import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { UserAddOutlined, DeleteFilled} from '@ant-design/icons';
import { Table, Tag, message, Space, Input, Button } from 'antd';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import './FriendListPage.css'
import { requestReceived, requestDelete, requestFriend } from '../../../../redux/_actions/friend_actions';
const { Column} = Table;

function FriendListPage() {
     const id = localStorage.getItem('id')
     const dispatch = useDispatch()
     const [friendreqData, setfriendreqData] = useState([])
     useEffect(() => {
         dispatch(requestReceived(id))
         .then(res=>{
             console.log(res)
             setfriendreqData(res.payload.friendreqrec)
         })         
     }, [])
     console.log(friendreqData)
    return (
        <div>
        {/* <div className="friend_table_menu">
        <h2>친구 목록</h2>
      
      </div>
       <div className="friend_table_user">
       
      
    <Table dataSource={data} rowKey="userID">
    <Column title="ID" dataIndex="userID" key="id" />
    <Column title="이름" dataIndex="userName" key="name" />
    <Column title="성별" dataIndex="userGender" key="gender" />
    <Column title="학과" dataIndex="userMajor" key="major" />
    <Column
      title="직급"
      dataIndex="userPosition"
      key="userPosition"
      render={userPosition=>( 
        <>
        {userPosition==='학부생'?
      <Tag color="blue">{userPosition}</Tag>
        : userPosition==='교수'?
      <Tag color="red">{userPosition}</Tag>
        :<Tag color="green">{userPosition}</Tag>
      }</>)}/>
  </Table>
      </div> */}

        <div>
            친구요청
        </div>
        <div className="friend_table_user">
       
      
       <Table dataSource={ friendreqData } rowKey="userID">
       <Column title="ID" dataIndex="userID" key="ids" />
         <Column title="이름" dataIndex="userName"key="s" />
       <Column title="직급" dataIndex={'userPosition'} key="p"
       render={p=>( 
         <>
         {p==='학부생'?
       <Tag color="blue">{p}</Tag>
         : p==='교수'?
       <Tag color="red">{p}</Tag>
         :<Tag color="green">{p}</Tag>
       }</>)}
       />
     </Table>
         </div>
        </div>
    )
}

export default FriendListPage
