/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { AutoComplete, Carousel } from 'antd';
import './LandingPage.css'
import axios from 'axios';
import { requestReceived } from '../../../redux/_actions/friend_actions';
import p1 from './LandingImage/1.jpg'
import p2 from './LandingImage/2.jpg'
import p3 from './LandingImage/3.jpg'


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
function LandingPage(props) {
  const [list, setlist] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    _getData()
    dispatch(requestReceived(id))
  }, [])

  const _getData = async () => {
    const res = await axios.get('/api/user');
    if (res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);       // response 데이터들 push
      setlist(cover)
    } else
      setlist(res.data);
  }

  return (
    <div style={{ margin: AutoComplete }}>
      <Carousel autoplay style={{display:"flex", justifyContent:"center"}}>
        <div className="land_img">
        <a href="https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=34156&tpage=1&searchKey=1&searchVal=%EA%B3%B5%EA%B0%90&srCategoryId="  target="_blank" rel="noopener noreferrer"
        >
          <img src={p1} style={{width: '100%',display:"flex", justifyContent:"center",paddingRight:70, paddingLeft:70}}></img>
        </a>
        </div>
        <div className="land_img">
        <a href="https://www.kw.ac.kr/ko/life/newsletter.jsp?BoardMode=view&DUID=33812"  target="_blank" rel="noopener noreferrer" >
        <img src={p2} style={{width: '100%',display:"flex", justifyContent:"center",paddingRight:70, paddingLeft:70}}></img>
        </a>
       </div>
        <div className="land_img">
        <a href="https://www.kw.ac.kr/ko/life/corona.jsp"  target="_blank" rel="noopener noreferrer" >
        <img src={p3} style={{width: '100%',display:"flex", justifyContent:"center",paddingRight:70, paddingLeft:70}}></img>
        </a>
        </div>
        </Carousel>
      <div className="table_user">
      </div>
    </div>

  )
};

export default LandingPage;