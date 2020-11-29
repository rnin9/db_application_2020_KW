import React from 'react'
import { Descriptions } from 'antd';
import './InfoStudent.css'


function InfoProfessor(props) {
    const leftInfo = { address: '', email: '', college: '', major: '' }        // 사용할 정보만 뺴냄.
    const info = Object.assign(leftInfo, props.info.data)       // 유저 상세정보!

    return (
        <div className="right_page">
            <h3>information</h3>
            <div className="info_data">
                <Descriptions bordered>
                    <Descriptions.Item label="이메일" span={3}>{info.email}</Descriptions.Item>
                    <Descriptions.Item label="주소" span={3}>{info.address}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>

    );
}


export default InfoProfessor