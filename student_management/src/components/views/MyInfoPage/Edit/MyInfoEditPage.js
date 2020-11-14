import React from 'react'
import { Form, Input, InputNumber, Button, Radio, Select, message} from 'antd';
import { DingtalkOutlined } from '@ant-design/icons'
import './MyInfoEditPage.css'
import axios from 'axios'


function MyInfoEditPage({match}){
    const layout = {
        labelCol: { 
          xs:{span:24},
          sm:{span:6},
         },
        wrapperCol: { 
          xs:{span: 24},
          sm:{span: 8},
      }
      };
      
      const layout2={
        labelCol: { 
          xs:{span:24},
          sm:{span:3},
         },
        wrapperCol: { 
          xs:{span: 24},
          sm:{span: 10},
      }}

      const validateMessages = {            // Validation check
        // eslint-disable-next-line
        required: '${label} is Required',
        types: {
          // eslint-disable-next-line
          email: '${label}이 아닙니다!', 
          number: '학생이 아니면,"0"을 입력하세요!',
          // eslint-disable-next-line
          password:'${label}를 작성해 주세요!',  
          ID:'유효한 ID가 아닙니다! 학번을 작성해주세요',
        }
      };

    const id = match.params.id
    const name = match.params.name
    const onFinish= (values)=>{
        const datas={
            id: id,
            name : name,
            address : values.user.address,
            email : values.user.email,
            password : values.user.password
        }
        console.log(datas)
        axios('/update/userInfo', {
            method : 'POST',
            data : datas,
            headers: new Headers()
          })
          .then(res=>{
            if(res){
                message.success('수정을 완료했습니다!')
                return window.location.href='/user/info';    //성공!
            }
                message.error('수정에 실패했습니다!')
        
        })
        .catch(err=>{
            throw err;
        })
    }
    return(
    <div className="reg">
        <h2 style={{width:300, height:60}}><DingtalkOutlined/> 정보수정</h2>
      <div className="reg_font2">
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
        <div className="pw">
        <Form.Item name={['user','password']} label="비밀번호" rules={[{ required: true}]}>
          <Input.Password style={{ width: 300 }} />
        </Form.Item>
        </div> 
  
        <div>
        <div className="email">
        <Form.Item name={['user', 'email']} label="이메일" rules={[{type:'email', required: true }]}>
          <Input style={{ width: 300 }} />
        </Form.Item>
        </div>
        <div className="address">
        <Form.Item name={['user', 'address']} label="주소">
          <Input style={{width: 300 }} />
        </Form.Item>
        </div>
        </div>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="수정하기">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
      </div>
    )
}

export default MyInfoEditPage