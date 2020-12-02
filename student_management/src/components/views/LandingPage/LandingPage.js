/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { AutoComplete, Carousel, Card, Modal} from 'antd';
import './LandingPage.css'
import axios from 'axios';
import { requestReceived } from '../../../redux/_actions/friend_actions';
import p1 from './LandingImage/1.jpg'
import p2 from './LandingImage/2.jpg'
import p3 from './LandingImage/3.jpg'
import favicon from './LandingImage/favicons.png'
import { GithubFilled, TeamOutlined, YoutubeFilled } from '@ant-design/icons';

const userID = localStorage.getItem('id')

function LandingPage (){
  const dispatch = useDispatch()  
 useEffect(() => {
      dispatch(requestReceived(userID))
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [])
 
    const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  const handleClick = ()=>{
    Modal.info({
      title: 'Team : 143',
      content: (
        <div>
          <p>2014722090 강민주 (팀장)</p>
          <p>2014722092 오영헌</p>
          <p>2014722034 이영주</p>
        </div>
      ),
      onOk() {},
    });
  
  }

return (
  <div style={{ margin: AutoComplete }} className="head">
    <div className='header'>
    <h2 > 학생 관리 프로그램 </h2>
    </div>
    <Carousel autoplay style={{ display: "flex", justifyContent: "center" }}>
      <div className="land_img">
        <a href="https://www.kw.ac.kr/ko/life/notice.jsp?BoardMode=view&DUID=34156&tpage=1&searchKey=1&searchVal=%EA%B3%B5%EA%B0%90&srCategoryId=" target="_blank" rel="noopener noreferrer"
        >
          <img src={p1} style={{ width: '100%', display: "flex", justifyContent: "center", paddingRight: 70, paddingLeft: 70 }}></img>
        </a>
      </div>
      <div className="land_img">
        <a href="https://www.kw.ac.kr/ko/life/newsletter.jsp?BoardMode=view&DUID=33812" target="_blank" rel="noopener noreferrer" >
          <img src={p2} style={{ width: '100%', display: "flex", justifyContent: "center", paddingRight: 70, paddingLeft: 70 }}></img>
        </a>
      </div>
      <div className="land_img">
        <a href="https://www.kw.ac.kr/ko/life/corona.jsp" target="_blank" rel="noopener noreferrer" >
          <img src={p3} style={{ width: '100%', display: "flex", justifyContent: "center", paddingRight: 70, paddingLeft: 70 }}></img>
        </a>
      </div>
    </Carousel>

    <div className="table_user">
    <Card title="Quick Menu">
    <a href="https://klas.kw.ac.kr" target="_blank" rel="noopener noreferrer" >
<Card.Grid style={gridStyle}><span style={{color:'black'}}><img src={favicon} style={{marginRight:3}}></img>KLAS</span></Card.Grid>
    </a>
    <a href="https://youtu.be/YYzqUc34p8I" target="_blank" rel="noopener noreferrer" >
    <Card.Grid style={gridStyle}><YoutubeFilled style={{marginRight:3, color:'red'}}/><span style={{color:'black'}}>Youtube</span></Card.Grid>
    </a>
    <a href="https://github.com/rnin9/db_application_2020_KW" target="_blank" rel="noopener noreferrer" >
   <Card.Grid style={gridStyle}><GithubFilled style={{marginRight:3, color:"black"}}/><span style={{color:'black'}}>Github</span></Card.Grid>
    </a>
    <a onClick={handleClick}>
    <Card.Grid style={gridStyle}><TeamOutlined style={{marginRight:3}}/>Developers</Card.Grid>
    </a>
    </Card>
    </div>
  </div>

)
};

export default LandingPage;