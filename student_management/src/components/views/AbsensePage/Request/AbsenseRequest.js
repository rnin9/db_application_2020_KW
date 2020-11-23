import React, {useState, useEffect} from 'react'
import { DatePicker, Space, Select, Button, Modal, message} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import absense from './absense.jpg'
import './AbsenseRequest.css'
const { Option } = Select;
const { confirm } = Modal;

const { RangePicker } = DatePicker;

function AbsenseRequest() {
    const [data, setdata] = useState({start:'',end:'',criteria:''})
    const handleChange=(value)=>{
      setdata({...data,criteria:value})
    }
    const handleDate=(date,dateString)=>{
        setdata({...data,start:dateString[0], end:dateString[1]})
    }
    const showModal =()=>{
        confirm({
        title: '휴학신청하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        content: '신청후에는 취소할 수 없습니다.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          console.log(data);
          message.success('신청이 완료되었습니다!')
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    
    return (
        <div className="font_ab">
            <div className="absense_header">
                <h2>휴학 신청</h2>
            </div>
            <div className="absense_config">
          <Space direction="vertical" size={12}>
            <RangePicker
            format="YYYY-MM-DD" 
            onChange={handleDate}
            />
            </Space>
            <Select style={{ width: 120 }} onSelect={handleChange}>
                <Option value="군휴학">군휴학</Option>
                <Option value="일반휴학">일반휴학</Option>
                <Option value="병가휴학">병가휴학</Option>
           </Select>
           <Button type="primary" onClick={showModal}>신청</Button>
          </div>
          <div className="absense_img">
              <img src={absense}></img>
          </div>
          </div>
    )
}

export default AbsenseRequest
