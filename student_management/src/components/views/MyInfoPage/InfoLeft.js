import React from 'react'
import { Image, Button } from 'antd';
import { SettingTwoTone }from '@ant-design/icons'
import {Link} from 'react-router-dom'
import sample from './samples.jpg'
import './MyInfoPage.css'

function InfoLeft(props){
    const leftInfo ={photo:'',id:'',address:'',email:'',password:'',name:'',position:''}        // 사용하고, 보낼 정보 뺴냄.
    const info = Object.assign(leftInfo, props.info.data)       // 유저 기본정보
    const url =  '/user/info/modify/'+`${info.id}/${info.name}`
    const userPhoto = '/image/'+`${info.photo}`                 // 사진 경로
    return(
        <div>
        <div className="photo">
            {info.photo==='0'? 
            <Image width={200} src={sample} />:                 // 이미지방식
            <Image width={200} src={userPhoto}/>
            }
        </div>
        <div className="item">
            <div style={{paddingTop:20, paddingBottom:20, color:"white"}}>
            <h4 style={{ color:"white" }}>{info.id}</h4>
            </div>
            <p style={{fontSize:20, paddingBottom:20}}>{info.name}  [{info.position}]</p> 
        </div>    
            <div style={{paddingBottom:20}}>
            <Link to={{
                pathname:url,
                state:{
                    email:info.email,
                    password:info.password,
                    address:info.address,
                    photo:info.photo
                }
            }}>
                <Button><SettingTwoTone style={{paddingBottom:20}} /></Button>
            </Link>
            </div>
        </div>
    );
}


export default InfoLeft