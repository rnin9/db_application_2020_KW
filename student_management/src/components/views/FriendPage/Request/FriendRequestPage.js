import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { UserAddOutlined} from '@ant-design/icons';
import { Table, Tag, message, Space, Input, Button } from 'antd';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import './FriendRequestPage.css'
import { getFriendreq, requestFriend } from '../../../../redux/_actions/friend_actions';
const { Column} = Table;
const { Search } = Input;
const id = localStorage.getItem('id')


  function FriendPage(){
    //*************Redux************/
    const dispatch = useDispatch()
    const friendreqData = useSelector(state => state.friend.friendreqData)
    //******************************/
    useEffect(() => {
     dispatch(getFriendreq(id))
      .then(res=>{
       message.success('불러오기완료!')
      })
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [])

    const [data, setdata] = useState([]) //찾은user정보
    const [position, setposition] = useState('')
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
      }else{
     setdata(res.data);
     setposition(res.data[0].userPosition);
     setfriendreq({
       f_id: res.data[0].userID,
       u_id: localStorage.getItem('id')})}
    })
    .catch(err=>{
        console.log('err:',err);
    }) 
    :
    message.error('사용자를 입력해주세요!')
    }

    const handleAdd=()=>{
      if(friendreq.f_id!==friendreq.u_id){
        dispatch(requestFriend(friendreq.u_id,friendreq.f_id))
        .then(res=>{
        if(res.payload.success===true){
        message.success('친구요청하였습니다!')
      }
        else{
          message.error('이미 친구신청한 상대입니다.')
        }
       })
       .catch(err=>{
        console.log(err)
        message.error('친구요청에 실패했습니다')
       })
      
      }
       else{
         message.error('본인은 친구신청할 수 없습니다.')
       }
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
      key="position"
      render={()=>(
        position ==='학부생'?
      <Tag color="blue">{position}</Tag>
        : position==='교수'?
      <Tag color="red">{position}</Tag>
        :<Tag color="yellow">{position}</Tag>
      )}/>
    <Column
      title=""
      key="action"
      render={() => (
        <Space size="middle">
          <Button type="primary"style={{fontSize:15}} onClick={handleAdd}><UserAddOutlined /></Button>
        </Space>
      )}
    />
  </Table>
      </div>


      <div className="friend_table_menu">
        <h2>친구신청목록</h2>
       
      </div>
       <div className="friend_table_user">
       
      
    <Table dataSource={ friendreqData } rowKey="friendID">
    <Column title="ID" dataIndex="friendID" key="ids" />
    <Column title="시간표공개여부" dataIndex="scheduleShare" key="s" />
    <Column title="성적공개여부" dataIndex="gradeShare" key="g" />
    <Column title="상태" dataIndex="friendGrant" key="f" />
  </Table>
      </div>
      </div>
       
      );
}
  export default FriendPage;