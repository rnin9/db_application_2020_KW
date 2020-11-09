import React,{Component} from 'react'
import { Form, Input, InputNumber, Button, Radio, Select } from 'antd';
import './RegisterPage.css'
const { Option} = Select;

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 4 },
};

const collegeData = ['소프트웨어융합대학', '전자정보공과대학'];
const majorData = {
  소프트웨어융합대학: ['컴퓨터정보공학부', '소프트웨어학부', '정보융합학부'],
  전자정보공과대학: ['컴퓨터공학과', '전자공학과', '전자재료공학과'],
};

const validateMessages = {
  required: '${label}, 꼭 작성해 주세요!',
  types: {
    email: ' 유효한${label}이 아닙니다!',
    number: '${label} 유효한 숫자가 아닙니다.!',
    password:' ${label}를 작성해 주세요!',
    ID:'유효한 ID가 아닙니다! 학번을 작성해주세요'
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
  ID:{
  }
};

const onFinish = values => {
  console.log(values);
};

class Register extends Component{
  

  onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  state = {
    majors: majorData[collegeData[0]],
    major: majorData[collegeData[0]][0],
  };

  handleCollegeChange = value => {
    this.setState({
      majors: majorData[value],
      major: majorData[value][0],
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
    <div className="register">
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

      <Form.Item name={['user', 'ID']} label="ID (학번)" rules={[{ required: true }]}>
        <Input style={{ width: 300 }}/>
      </Form.Item>

      <Form.Item name={['user','password']} label="Password" rules={[{ required: true}]}>
        <Input.Password style={{ width: 300 }} />
      </Form.Item>

      <Form.Item name={['user', 'name']} label="이름">
        <Input style={{ width: 300 }} />
      </Form.Item>
      <nav>
      <div>
      <div className="college">
      <Form.Item name={['user','college']}label="단과대학">
      <Select
          defaultValue={collegeData[0]}
          style={{ width: 240 }}
          onChange={this.handleCollegeChange}
          value={this.state.collegeData}
        >
          {collegeData.map(college => (
            <Option key={college}>{college}</Option>
          ))}
          </Select>
      </Form.Item>
      </div>
      <div className="major">
      <Form.Item name={['user','major']}label="전공">
        <Select 
          style={{ width: 240 }}
          onChange={this.onMajorChange}
        >
          {majors.map(major => (
            <Option key={major}>{major}</Option>
          ))}
        </Select>
      </Form.Item>
      </div>
      </div>
      </nav>
      <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber style={{ width: 300 }}/>
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input style={{ width: 300 }} />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea style={{ width: 300 }} />
      </Form.Item>
      <Form.Item name={['user','position']} label="직급">
     <Radio.Group defaultValue="a" style={{ width: 300 }}>
      <Radio.Button value="a">학부생</Radio.Button>
      <Radio.Button value="b">대학원</Radio.Button>
      <Radio.Button value="c">교수</Radio.Button>
      <Radio.Button value="d">직원</Radio.Button>
    </Radio.Group>
      </Form.Item>
      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );}
};
  export default Register;