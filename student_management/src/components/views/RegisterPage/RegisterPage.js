import React,{Component} from 'react'
import { Form, Input, InputNumber, Button, Radio, Select } from 'antd';
import './RegisterPage.css'
const { Option } = Select;

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 4 },
};



const collegeData = ['소프트웨어융합대학', '전자정보공과대학','자연대학'];
const majorData = {
  소프트웨어융합대학: ['컴퓨터정보공학부', '소프트웨어학부', '정보융합학부'],
  전자정보공과대학: ['컴퓨터공학과', '전자공학과', '전자재료공학과'],
  자연대학: ['수학과', '전자바이오물리학과'],
};

const validateMessages = {
  required: '${label}, 꼭 작성해 주세요!',
  types: {
    email: ' 유효한${label}이 아닙니다!',
    number: '학생이 아니면,"0"을 입력하세요!',
    password:' ${label}를 작성해 주세요!',
    ID:'유효한 ID가 아닙니다! 학번을 작성해주세요'
  },
  number: {
    range: '${label}은 ${min}와 ${max} 사이여야 합니다'
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
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

      <Form.Item name={['user', 'ID']} label="ID (학번)" rules={[{ required: true }]}>
        <Input style={{ width: 380 }}/>
      </Form.Item>

      <Form.Item name={['user','password']} label="Password" rules={[{ required: true}]}>
        <Input.Password style={{ width: 380 }} />
      </Form.Item>

      <Form.Item name={['user', 'name']} label="이름">
        <Input style={{ width: 380 }} />
      </Form.Item>
      
      <div className="colleges">
      <div className="college">
      <Form.Item name={['user','college']}label="전공" labelCol={{ ...layout.labelCol}}>
      <Select
          style={{ width: 200 }}
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
      <Form.Item name={['user','major']} wrapperCol={{ ...layout.wrapperCol}}>
        <Select 
          style={{ width: 150 }}
          onChange={this.onMajorChange}
          value={this.state.majors}
        >
          {majors.map(major => (
            <Option key={major}>{major}</Option>
          ))}
        </Select>
      </Form.Item>
      </div>
      </div>

      <Form.Item name={['user','position']} label="직급">
     <Radio.Group style={{ width: 380 }}>
      <Radio.Button value="학부생">학부생</Radio.Button>
      <Radio.Button value="대학원">대학원</Radio.Button>
      <Radio.Button value="교수">교수</Radio.Button>
      <Radio.Button value="직원">직원</Radio.Button>
    </Radio.Group>
    
      </Form.Item>
      <Form.Item name={['user', 'Grade']} label="학년" rules={[{ required: true,type: 'number', min: 0, max: 5 }]}>
        <InputNumber style={{ width: 50 }}/>
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input style={{ width: 380 }} />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea style={{width: 380 }} />
      </Form.Item>
      
      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );}
};
  export default Register;