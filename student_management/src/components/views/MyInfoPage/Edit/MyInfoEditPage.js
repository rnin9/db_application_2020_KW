import React,{useState} from 'react'
import { Form, Input,Button,message} from 'antd';
import { DingtalkOutlined} from '@ant-design/icons'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBIcon}  from 'mdbreact';
import sample from '../samples.jpg'
import './MyInfoEditPage.css'
import axios from 'axios'


function MyInfoEditPage({match,location}){
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
    const email = location.state.email
    const address =location.state.address
    const password = location.state.password
    const photo = location.state.photo

    const [file, setFile] = useState(""); // 파일 base64
    const [previewURL, setPrevURL] = useState(sample);	//파일
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
            photo : filename==='0' && photo!=='0' ? photo:filename
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

    const handleResetPhoto = ()=>{
        setfilename('0')
        setPrevURL(sample)
        return
    }

    return(
    <div className="reg">
        <h2 style={{width:300, height:60}}><DingtalkOutlined/> 정보수정</h2>
      <div className="reg_font2">
      
      
        <Form {...layout} name="nest-messages" onFinish={onFinish} >
        <div>
        <h4>{name}</h4>
        </div>
        <div className="photoEdit">
        <img src ={previewURL} alt="prev"/>
        <input type='file' 
          accept='image/jpg,impge/png,image/jpeg,image/gif'
          name='profile_img' 
          onChange={handleFileOnChange}>
        </input>
        <Button type="default" onClick={handleResetPhoto}>
        <MDBIcon far icon="trash-alt" />
          </Button>
        </div>
        <Form.Item name={['user','password']} label="비밀번호" initialValue={password}>
          <Input.Password style={{ width: 250 }}/>
        </Form.Item>
        <Form.Item name={['user', 'email']} label="이메일" initialValue={email}>
          <Input style={{ width: 250 }} />
        </Form.Item>
       <Form.Item name={['user', 'address']} label="주소" initialValue={address}>
          <Input style={{width: 250 }}/>
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