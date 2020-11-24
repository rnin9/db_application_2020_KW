import React, { Component } from 'react';
import { AutoComplete, Dropdown, Tag, Button, Mentions, Form, Menu, message } from 'antd';
import './EvaluationPage.css'
import axios from 'axios';
import { BankOutlined, CodeOutlined, DesktopOutlined, DownOutlined, GlobalOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Mentions;
const userID = localStorage.getItem('id');
var depart = '';

function handleMenu(e){
  //depart=e;
  message.info(e.key);
  depart=e.key;
  console.log(depart);
}

const menu = (
  <Menu onClick={handleMenu}>
    <Menu.Item key="교양" icon={<BankOutlined/>}>
      교양
    </Menu.Item>
    <Menu.Item key="소프트웨어융합대학" icon={<CodeOutlined/>}>
      소프트웨어융합대학
    </Menu.Item>
    <Menu.Item key="전자정보공과대학" icon={<ThunderboltOutlined/>}>
      전자정보공과대학
    </Menu.Item>
    <Menu.Item key="인문사회과학대학" icon={<UserOutlined/>}>
      인문사회과학대학
    </Menu.Item>
    <Menu.Item key="동북아대학" icon={<GlobalOutlined/>} >
      동북아대학
    </Menu.Item>
  </Menu>
);

const onFinish = values => {                      // 제출 시 , POST 형식으로 /add/user request, response 대기
  /*
  const datas={ 
               user_id=userID,
               content:value.content
               };       
    
    axios('/add/eval',{ method: 'POST', headers: new Headers(), data: datas}) // 성공, 실패시 메시지
    .then(res=>{
      if(res.data){
      message.success("수강평이 등록되었습니다.")
      return window.location.href='/';
      } else{
      message.error("이미 해당 강의에 작성한 수강평이 존재합니다.")
      }
    });*/
    
};

class WriteEval extends Component{

    constructor(props) {
        super(props)
        this.state = {
          name : '',
          list : [],
          update : false,
      }
    }
    


    componentDidMount(){
      this._getData()
    }

    _getData = async () => {
     
      
    }


    render(){
        const { list } = this.state;
       
        return(
          <div style={{margin: AutoComplete}}> 
            <div className="table">
              <h2>수강평 작성</h2>
            </div>
            <div className="write_content">
              <Dropdown overlay={menu} placement="bottomLeft" size="middle">
                <Button>
                  학과 <DownOutlined/>
                </Button>
              </Dropdown>
            </div>
            <div className="write_content">
              <Form.Item name="content" label="내 용" labelCol={{span:1}} wrapperCol={{span: 14}} rules={[{ required:true}]} onFinish={onFinish} >
                <Mentions rows="4" placeholder="수강평을 작성해주세요.(300자 이내)" value="content">
                </Mentions>
              </Form.Item>
              <Form.Item wrapperCol={{span: 14, offset:5}}>
                <Button htmlType="submit" type="primary">
                  작성 완료
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button htmlType="button" href="/user/eval">
                  취소
                </Button>
              </Form.Item>
            </div>
          </div>
            
        )};
}

export default WriteEval;