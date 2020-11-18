import React,{useState, useEffect} from 'react';
import { UserAddOutlined} from '@ant-design/icons';
import { Table,message, Tag, Space, Input, Button } from 'antd';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import './FriendRequestPage.css'
import { requestHandle } from '../../../../store/modules/friendFunction';
const { Column} = Table;


const { Search } = Input;
const id = localStorage.getItem('id')
  function FriendPage(){
    const [data, setdata] = useState([]) //user정보
    const [reqData, setreqData] = useState([])
    const [friendreq, setfriendreq] = useState({
      f_id :'',
      u_id :''
    })
    const dispatch = useDispatch()
    const a =(id)=>{ axios('/api/userFriend',{ method:'GET', headers: new Headers(),params:id})
    .then(res=>{
      setreqData(res.data);
      message.success('요청목록 불러오기 완료!')
    })
  }

    useEffect(()=>{
      a(id)
    }, [])

    const onSearch = value =>{
    value!=='' ?
    axios.get('/api/userInfo',{params:value})
    .then(res=>{
      if(res.data[0] === undefined) {
        message.error('사용자가 없습니다!')
      }else{
     setdata(res.data);
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
      axios('/add/friend',{ method: 'POST', headers: new Headers(), data: friendreq})
       .then(res=>{
        if(res.data===true){
        message.success('친구요청하였습니다!')
      
        dispatch(requestHandle(0))

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


      <div className="friend_table_menu">
        <h2>친구신청목록</h2>
       
      </div>
       <div className="friend_table_user">
       
      
    <Table dataSource={reqData} rowKey="userID">
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