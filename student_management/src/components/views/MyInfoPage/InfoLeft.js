import React from 'react'
import { Image } from 'antd';

function InfoLeft(props){
    const leftInfo ={photo:'',id:'',name:'',position:''}        // 사용할 정보만 뺴냄.
    const info = Object.assign(leftInfo, props.info.data)
   
    
    return(
        <div className="head">
            <div className="photo">
            <Image width={200}
                src='./Upload/sample.jpg'
            />
            </div>
            <div>
    <span>{info.id}/ {info.name}({info.position})</span>
            </div>
        </div>
    );
}


export default InfoLeft