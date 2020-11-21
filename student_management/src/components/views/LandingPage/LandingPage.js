import React,{useState, useEffect}from 'react';
import {useDispatch} from 'react-redux'
import { AutoComplete, Table, } from 'antd';
import './LandingPage.css'
import axios from 'axios';
import { getFriendreq, requestFriend, requestReceived } from '../../../redux/_actions/friend_actions';

const columns = [
  {
    title: 'ID',
    dataIndex: 'userID',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'userName',
    key: 'name',
  },
  
  {
    title: 'Password',
    dataIndex: 'userPassword',
    key: 'pw',
  },
  {
    title: '이메일',
    dataIndex: 'userEmail',
    key: 'email',
  },
  {
    title: '주소',
    dataIndex: 'userAddress',
    key: 'add',
  },
];
const id = localStorage.getItem('id')
function LandingPage (props){
    const [list, setlist] = useState([])
    const dispatch = useDispatch()
    
    useEffect(() => {
      _getData()
      dispatch(requestReceived(id))
    }, [])

    const _getData = async () => {
      const res = await axios.get('/api/user');     
      if(res.data[0] === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        setlist(cover)
      }else
      setlist(res.data);
    }
        
        return(
          <div style={{margin: AutoComplete}}> 
          <div className="table_menu">
            <h2>유저 정보</h2>
          </div>
           <div className="table_user">
           
            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="userID"/>
              : null}
          
          </div>
          </div>
            
        )};

export default LandingPage;