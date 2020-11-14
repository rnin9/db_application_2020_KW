import React from 'react'
import { Image, Button } from 'antd';
import { SettingTwoTone }from '@ant-design/icons'
import {Link} from 'react-router-dom'
import sample from './Upload/sample.jpg'
import './MyInfoPage.css'

function InfoLeft(props){
    const leftInfo ={photo:'',id:'',name:'',position:''}        // 사용할 정보만 뺴냄.
    const info = Object.assign(leftInfo, props.info.data)       // 유저 기본정보
    const url =  '/user/info/modify/'+`${info.id}/${info.name}`
    return(
        <div>
        <div className="photo">     
            <Image width={200} src={sample} />
        </div>
        <div className="item">
            <div style={{paddingTop:20, paddingBottom:20, color:"white"}}>
            <h4 style={{ color:"white" }}>{info.id}</h4>
            </div>
            <p style={{fontSize:20, paddingBottom:20}}>{info.name}  [{info.position}]</p> 
        </div>    
            <div style={{paddingBottom:20}}>
            <Link to={url}>
                <Button><SettingTwoTone style={{paddingBottom:20}} /></Button>
            </Link>
            </div>
        </div>
    );
}


export default InfoLeft