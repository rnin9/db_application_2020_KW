import React,{ useState } from 'react'
import { useLocation } from "react-router";
import { Table, Form, Select, Button, Input, message} from 'antd';
import {BookOutlined} from '@ant-design/icons';

import {useHistory} from "react-router";

import './NoticeWrite.css'
import Axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

function NoticeWrite() {

    const location = useLocation();
    const course = location.state.course;
    const history = useHistory();
    const [filename, setfilename] = useState('0')

    const id = localStorage.getItem('id')
    const handleFileOnChange = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const formData = new FormData();
            
        const config ={
            header: {'content-type': 'multipart/form-data'}     // frontend에서 보낸 데이터를 backend에서 잘 저장
        }
        formData.append("file",file)
        Axios.post('/update/noticeFile',formData, config)
          .then(res=>{
              console.log(res)
              if(res.data.success){
                message.success('파일을 저장하는데 성공했습니다.')
                setfilename(res.data.filename);
              }else{
                console.log(res)
                message.error('파일을 저장하는데 실패했습니다.')
              }
          })

    }

    const onFinish = (value) => {
        const datas = { id:id, 
                    title:value.notice.title, 
                    name:value.notice.name, 
                    content:value.notice.content,
                    criteria:value.notice.criteria,
                    file:filename
                }
        Axios.post('/add/notice',{data:datas})
        .then(res=>{
            if(res.data===true){
                message.success('작성에 성공했습니다!')
                history.push('/prof/notice')
            }
            else{
                message.error('작성에 실패했습니다!')
            }
        })
        
    }

    const handleCancel=()=>{
        history.push('/prof/notice') 
    }
    return (
        <div className="nwt_font">
            <h2 style={{paddingTop:30}}>공지사항 작성</h2>
            <Form onFinish={onFinish} >
                <Form.Item name={['notice', 'name']}>
                    <Select
                        placeholder="please select Course"
                        style={{ width: 520 }}
                    >
                        {course.map(c => (
                            <Option key={c.Course_num}>{"[" + c.Course_num + "] "}{c.Course_name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name={['notice','title']}>
                <Input placeholder="Notice Title" prefix={<BookOutlined />}/>
                </Form.Item>
                <div className="nwt_menu2">
                    <Form.Item name={['notice', 'criteria']}>

                        <Select
                            style={{ width: 100, marginRight:50 }}
                        >
                            <Option key='공지'>공지</Option>
                            <Option key='과제'>과제</Option>
                            <Option key='필독'>필독</Option>

                        </Select>
                    </Form.Item>
                   
                        <input type='file'
                            // accept='image/jpg,impge/png,image/jpeg,image/gif,docx,pdf,hwp'
                            name='file'
                            onChange={handleFileOnChange}
                        />
                    
                </div>
                <Form.Item name={['notice','content']}>
                <TextArea rows={10} placeholder="Content" />
                </Form.Item>
                <Button type="primary" style={{marginRight:10}} htmlType="submit">
                        완료
                </Button>
                <Button type="primary" onClick={handleCancel}>
                        취소
                </Button>
            </Form>
        </div>
    )
}

export default NoticeWrite
