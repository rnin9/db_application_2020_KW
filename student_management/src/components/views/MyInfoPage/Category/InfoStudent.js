import React from 'react'
import { Descriptions, Badge } from 'antd';
import './InfoStudent.css'


function InfoStudent(props){
    const leftInfo ={address:'',email:'',grade:'',leaveofabsense:0,college:'',major:''}        // 사용할 정보만 뺴냄.
    const info = Object.assign(leftInfo, props.info.data)       // 유저 상세정보!

    return(
        <div className="right_page">
            <h3>information</h3>
            <div className="info_data">
            <Descriptions bordered>
    <Descriptions.Item label="학번" span={3}>{info.grade}</Descriptions.Item>
    <Descriptions.Item label="단과대학"span={3}>{info.college}</Descriptions.Item>
    <Descriptions.Item label="전공" span={3}>{info.major}</Descriptions.Item>
    <Descriptions.Item label="학적상태" span={3}>
        {info.leaveofabsense==0 ?
      <Badge status="processing" text="재학중" />:
      <Badge status="error" text="휴학중" />     
    }
    </Descriptions.Item>
    <Descriptions.Item label="이메일"span={3}>{info.email}</Descriptions.Item>
<Descriptions.Item label="주소" span={3}>{info.address}</Descriptions.Item>
  </Descriptions> 
            </div>
        </div>

    );
}


export default InfoStudent