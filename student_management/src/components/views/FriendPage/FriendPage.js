import React,{useState, useEffect} from 'react'
import { Table, Tag, message, Space, Input, Button } from 'antd';
import axios from 'axios'
import './Request/FriendRequestPage.css'
const { Column} = Table;

function FriendPage() {

    const [friend, setFriend] = useState([])
    const id = localStorage.getItem('id')
    useEffect(() => {
        axios.get('/api/userFriend/list',{params:id})
        .then(res=>{
            console.log(res)
            setFriend(res.data)
        })
    }, [])
    return (

        <div>
         <div className="friend_table_menu" style={{fontSize:30, paddingBottom:40}}>
          친구 목록
        </div>
        <div className="friend_table_user">
       
      
       <Table dataSource={ friend } rowKey="userID">
       <Column title="ID" dataIndex="userID" key="ids" />
         <Column title="이름" dataIndex="userName"key="s" />
       <Column title="직급" dataIndex='userPosition' key="p"
       render={p=>( 
         <>
         {p==='학부생'?
       <Tag color="blue">{p}</Tag>
         : p==='교수'?
       <Tag color="red">{p}</Tag>
         :<Tag color="green">{p}</Tag>
       }</>)}
       />
         <Column title="소속" dataIndex="userCollege"key="c" />
         <Column title="주소" dataIndex="userAddress"key="ad" />         

     </Table>
         </div>   
        </div>
    )
}

export default FriendPage

