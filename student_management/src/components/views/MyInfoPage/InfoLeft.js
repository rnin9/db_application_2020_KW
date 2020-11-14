import React from 'react'
import { Image, Button } from 'antd';
import { SettingTwoTone }from '@ant-design/icons'
import sample from './Upload/sample.jpg'
import './MyInfoPage.css'

function InfoLeft(props){
    const leftInfo ={photo:'',id:'',name:'',position:''}        // 사용할 정보만 뺴냄.
    const info = Object.assign(leftInfo, props.info.data)
   
    
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
            <Button><SettingTwoTone style={{paddingBottom:20}} /></Button>
            </div>
        </div>
    );
}


export default InfoLeft