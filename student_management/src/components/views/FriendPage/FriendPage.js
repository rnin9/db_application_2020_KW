import React,{useState} from 'react';
import { UserAddOutlined} from '@ant-design/icons';
import { Table,message, Tag, Space, Input, Button } from 'antd';
import axios from 'axios'
import './FriendPage.css'
const { Column} = Table;


const { Search } = Input;

  function FriendPage(){

    const [data, setdata] = useState([]) //user정보
    const [friendreq, setfriendreq] = useState({
      f_id :'',
      u_id :''
    })
    const onSearch = value =>{
    value!=='' ?
    axios.get('/api/userInfo',{params:value})
    .then(res=>{
      if(res.data[0] === undefined) {
        message.error('사용자가 없습니다!')
      }
     setdata(res.data);
     setfriendreq({
       f_id: res.data[0].userID,
       u_id: localStorage.getItem('id')})
    })
    .catch(err=>{
        console.log('err:',err);
    }) 
    :
    message.error('사용자를 입력해주세요!')
    }

    const handleAdd=()=>{
      
      axios('/add/friend',{ method: 'POST', headers: new Headers(), data: friendreq})
       .then(req=>{
        console.log(req)
        message.success('친구요청하였습니다!')
       })
       .catch(err=>{
        console.log(err)
        message.error('친구요청에 실패했습니다')
       })
      }



      return (
        <div style={{margin:'auto'}}>
        <div className="friend_table_menu">
        <h2>친구 신청</h2>
        <div className="friend_search">
        <Search
      placeholder="아이디를 입력하세요!"
      onSearch={onSearch}
      enterButton="검색"
      
      />
      </div>
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
      key="tags"
    />
    <Column
      title=""
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <Button type="primary"style={{fontSize:15}} onClick={handleAdd}><UserAddOutlined /></Button>
        </Space>
      )}
    />
  </Table>
      </div>
      </div>
       
      );
}
  export default FriendPage;