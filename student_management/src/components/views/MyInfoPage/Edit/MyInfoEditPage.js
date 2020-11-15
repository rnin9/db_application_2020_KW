import React,{useState} from 'react'
import { Form, Input,Button,message} from 'antd';
import { DingtalkOutlined} from '@ant-design/icons'
import './MyInfoEditPage.css'
import axios from 'axios'


function MyInfoEditPage({match}){
    const layout = {
        labelCol: { 
          xs:{span:24},
          sm:{span:5},
         },
        wrapperCol: { 
          xs:{span: 24},
          sm:{span: 8},
      }
      };
    
    const id = match.params.id
    const name = match.params.name
    const [file, setFile] = useState(""); // 파일 base64
    const [previewURL, setPrevURL] = useState(null);	//파일
    const [filename,setfilename] =useState('0');	  // 파일이름 default 0 => 수정사항없을 시.

    const handleFileOnChange = (event) => {
      event.preventDefault();
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        setFile(file);
        setPrevURL(reader.result)
      }
      reader.readAsDataURL(file);
      if(file!==""){
      const formData = new FormData();
            
      const config ={
          header: {'content-type': 'multipart/form-data'}     // frontend에서 보낸 데이터를 backend에서 잘 저장
      }
      formData.append("file",file)

      axios.post('/update/userPhoto',formData, config)
          .then(res=>{
              if(res.data.success){
                message.success('파일을 저장하는데 성공했습니다.')
                setfilename(res.data.filename);
              }else{
                console.log(res)
                message.error('파일을 저장하는데 실패했습니다.')
              }
          })
    }
    }
    
    const onFinish= (values)=>{
        const datas={
            id: id,
            name : name,
            address : values.user.address,
            email : values.user.email,
            password : values.user.password,
            photo : filename
        }
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
      
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <div>
        <h4>{name}</h4>
        </div>
        <div className="photoEdit">
        
        <img src ={previewURL}/>
          <input type='file' 
          accept='image/jpg,impge/png,image/jpeg,image/gif' 
          name='profile_img' 
          onChange={handleFileOnChange}>
        </input>
        </div>

        <Form.Item name={['user','password']} label="비밀번호">
          <Input.Password style={{ width: 250 }} />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="이메일">
          <Input style={{ width: 250 }} />
        </Form.Item>
       <Form.Item name={['user', 'address']} label="주소">
          <Input style={{width: 250 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            수정하기
          </Button>
        </Form.Item>
      </Form>
      </div>
      </div>
    )
}

export default MyInfoEditPage