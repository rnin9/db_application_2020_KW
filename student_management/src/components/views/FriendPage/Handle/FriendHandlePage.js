import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import { Table, Tag, message, Space, Input, Button } from 'antd';
import './FriendHandlePage.css'
import { requestReceived, requestHandle } from '../../../../redux/_actions/friend_actions';
const { Column} = Table;

function FriendHandlePage() {
   
    const friendrec = useSelector(state => state.friend)
    const dispatch = useDispatch()
    const id = localStorage.getItem('id')
      useEffect(() => {
         dispatch(requestReceived(id))
     }, [])

    const handleAccept=(event)=>{
      let friendID = {
        f_id: event.currentTarget.id,
        grant:true}
      
        console.log(event.currentTarget.id)
    dispatch(requestHandle(id,friendID)).then(res=>{
        message.success('요청을 수락하였습니다!')
      })
    }

    const handleDeny=(event)=>{
      let friendID = {
          f_id: event.currentTarget.id,
          grant:false}
      dispatch(requestHandle(id,friendID)).then(res=>{
        message.error('요청을 거절하였습니다!')
      })
    }

    return (
        <div>
        <div className="friend_table_menu" style={{fontSize:30, paddingBottom:40}}>
          친구 요청목록
        </div>
        <div className="friend_table_user">
       
      
       <Table dataSource={ friendrec.friendreqrec } rowKey="userID">
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
       <Column
      title=""
      key="action"
      render={(text,record) => (
        <Space size="middle">
          <Button type="text"style={{fontSize:18}} onClick={handleAccept} id={record.userID}><CheckCircleTwoTone /></Button>
          <Button type="text"style={{fontSize:18}} onClick={handleDeny} id ={record.userID}><CloseCircleTwoTone /></Button>
        </Space>
      )}
    />
     </Table>
         </div>
        </div>
    )
}

export default FriendHandlePage
