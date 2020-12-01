import React, { useEffect, useState } from 'react';
import { Input, Button, Mentions, Form, Select, Rate, message } from 'antd';
import './EvaluationPage.css'
import Axios from 'axios';
import { BookOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";

const { Option } = Mentions;
const { TextArea } = Input;

const id = localStorage.getItem('id');
const year = localStorage.getItem('year');
const semester = localStorage.getItem('semester');
function WriteEval() {

  const history = useHistory();
  const [course, setcourse] = useState([])
  useEffect(() => {
    let date = { id: id, year: 2020, term: 2 }
    Axios.get('/api/notice/course', { params: date })
      .then(res => {
        setcourse(res.data)
      })

  }, [])

  const onFinish = (value) => {
    const datas = {
      id: id,
      cname: value.eval.cname,
      year: year,
      semester: semester,
      content: value.eval.content,
      tags: value.eval.tags,
      rate: (value.eval.rate) * 2
    }
    console.log(datas)
    Axios.post('/add/evaluation', { data: datas })
      .then(res => {
        if (res.data === true) {
          message.success('작성에 성공했습니다!')
          history.push('/user/eval')
        }
        else {
          message.error('작성에 실패했습니다!')
        }
      })

  }

  const handleChange = (values) => {
    console.log(values)
  }
  const handleCancel = () => {
    history.push('/user/eval')
  }

  return (
    <div className="eval_font">
      <h2 style={{ paddingTop: 30, paddingBottom: 20 }}>수강평 작성</h2>
      <Form onFinish={onFinish} >

        <div className="eval_menu2">
          <Form.Item name={['eval', 'cname']}>
            <Select
              placeholder="please select course"
              style={{ width: 310 }}
            >
              {course.map(c => (
                <Option key={c.Course_num}>{"[" + c.Course_num + "] "}{c.Course_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['eval', 'rate']} initialValue={2.5}>
            <Rate allowHalf style={{ width: 210 }} />
          </Form.Item>
        </div>
        <Form.Item name={['eval', 'tags']}>
          <Select mode="tags" style={{ width: 520 }} placeholder="Tags" onChange={handleChange}>
          </Select>
        </Form.Item>

        <Form.Item name={['eval', 'content']}>
          <TextArea rows={10} placeholder="Content" style={{ width: 520 }} />
        </Form.Item>
        <Button type="primary" style={{ marginRight: 10 }} htmlType="submit">
          완료
              </Button>
        <Button type="primary" onClick={handleCancel}>
          취소
              </Button>
      </Form>
    </div>
  )
}

export default WriteEval;