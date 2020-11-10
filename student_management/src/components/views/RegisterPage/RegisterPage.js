import React,{Component} from 'react'
import { Form, Input, InputNumber, Button, Radio, Select } from 'antd';
import axios from 'axios'
import './RegisterPage.css'
const { Option } = Select;

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


const collegeData = ['소프트웨어융합대학', '전자정보공과대학','자연대학'];
const majorData = {
  소프트웨어융합대학: ['컴퓨터정보공학부', '소프트웨어학부', '정보융합학부'],
  전자정보공과대학: ['컴퓨터공학과', '전자공학과', '전자재료공학과'],
  자연대학: ['수학과', '전자바이오물리학과'],
};

const validateMessages = {
  
  required: '${label}` is required',
  types: {
    email: '유효한${label}이 아닙니다!', 
    number: '학생이 아니면,"0"을 입력하세요!',
    password:' ${label}를 작성해 주세요!',  
    ID:'유효한 ID가 아닙니다! 학번을 작성해주세요',
  }
};

const onFinish = values => {
  const datas={ id: values.user.ID,
               password: values.user.password,
               name: values.user.name,
               gender:values.user.gender,
               college:values.user.college,
               major:values.user.major,
               grade:values.user.grade,
               position:values.user.position,
               email:values.user.email,
               address:values.user.address
               };             
    axios('/add/user',{ method: 'POST', headers: new Headers(), data: datas})
    .then(res=>{
      if(res.data){
      alert('회원가입에 성공했습니다!');
      return window.location.href='/';
      } else{
      alert('아이디가 중복됩니다!');
      }
    });
    
};
class Register extends Component{

  state = {
    majors: majorData[collegeData[0]],
    major: majorData[collegeData[0]][0],
    college: collegeData[0],

  };

  handleCollegeChange = value => {
    this.setState({
      majors: majorData[value],
      major: majorData[value][0],
      college: collegeData[value],
    });
  };

  onMajorChange = value => {
    this.setState({
      major: value,
    });
  };

  

  render(){

    const { majors } = this.state; 
  return (
    
    <div className="reg_font">
      <h2>회원가입</h2>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div className="id">
      <Form.Item name={['user', 'ID']} label="ID (학번)" rules={[{ required: true }]}>
        <Input style={{ width: 250 }}/>
      </Form.Item>
      </div>
      <div className="id">
      <Form.Item name={['user', 'name']} label="이름">
        <Input style={{ width:260 }} />
      </Form.Item>
      </div>
      <div>
      <div className="pw">
      <Form.Item name={['user','password']} label="비밀번호" rules={[{ required: true}]}>
        <Input.Password style={{ width: 250 }} />
      </Form.Item>
      </div>
      <div className="gender">
      <Form.Item name={['user','gender']} label="성별"labelCol={{...layout2.labelCol,offset:2}}>
      <Radio.Group style={{ width: 250 }}>
      <Radio.Button value="남성">남성</Radio.Button>
      <Radio.Button value="여성">여성</Radio.Button>
      </Radio.Group>
      </Form.Item>
      </div>
      </div> 
     <div className="college">
      <Form.Item name={['user','college']}label="단과대학"labelCol={{...layout.labelCol,offset:3}}>
      <Select
          style={{ width: 250 }}
          onChange={this.handleCollegeChange}
          value={this.state.college}
        >
          {collegeData.map(college => (
            <Option key={college}>{college}</Option>
          ))}
          </Select>
      </Form.Item>
      </div>
      <div className="major">
      <Form.Item name={['user','major']} label="학과"labelCol={{...layout2.labelCol,offset:1}}>
        <Select 
          style={{ width: 260 }}
          onChange={this.onMajorChange}
          value={this.state.majors}
        >
          {majors.map(major => (
            <Option key={major}>{major}</Option>
          ))}
        </Select>
      </Form.Item>
      </div>
      <div>
      <div className="grade">
      <Form.Item name={['user', 'grade']} label="학번" rules={[{type: 'number', min: 0, max: 22 }]}labelCol={{...layout2.labelCol,offset:3}}>
        <InputNumber style={{ width:250 }}/>
      </Form.Item>
      </div>
      <div className="position">
      <Form.Item name={['user','position']} label="직급"labelCol={{...layout2.labelCol,offset:4}}>
      <Radio.Group style={{ width: 270 }}>
      <Radio.Button value="학부생">학부생</Radio.Button>
      <Radio.Button value="대학원">대학원</Radio.Button>
      <Radio.Button value="교수">교수</Radio.Button>
      <Radio.Button value="직원">직원</Radio.Button>
      </Radio.Group>
      </Form.Item>
      </div>
      </div>

      <div>
      <div className="email">
      <Form.Item name={['user', 'email']} label="이메일" rules={[{type:'email'}]}>
        <Input style={{ width: 250 }} />
      </Form.Item>
      </div>
      <div className="address">
      <Form.Item name={['user', 'address']} label="주소">
        <Input style={{width: 250 }} />
      </Form.Item>
      </div>
      </div>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    
  );}
};
  export default Register;