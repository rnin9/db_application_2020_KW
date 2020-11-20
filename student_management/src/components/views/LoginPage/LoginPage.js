import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import './LoginPage.css';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 8,
  },
};

const onFinish = (values) => {
  const datas = {id:values.username,
                password:values.password}
  axios('/api/sendLogin',{ 
  method: 'POST', headers: new Headers(), data: datas})
  .then(res =>{
        if(res.data.success){         // 받은 데이터 확인
        message.success('로그인에 성공했습니다!')
        localStorage.setItem('login', true);
        localStorage.setItem('position',res.data.position);
        localStorage.setItem('id',res.data.id);
        localStorage.setItem('name',res.data.name);
        return window.location.href='/';    //성공!
        }
        else
        message.error('로그인에 실패했습니다.') // 실패!
  })
  .catch(err=>{
    console.log(err);
  });          
};


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


  class Login extends Component {
    
    render() {
      return (
        <div className="main">
          <h2> 로그인 </h2>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ID(학번)"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>
    
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password  allowClear/>
          </Form.Item>
    
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item {...tailLayout} wrapperCol={{...tailLayout.wrapperCol, offset:11}}>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </Form>
        </div>

      );
    }
  };
  
  export default Login;