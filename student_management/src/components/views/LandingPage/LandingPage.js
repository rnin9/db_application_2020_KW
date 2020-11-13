import React, { Component } from 'react';
import { AutoComplete, Table, } from 'antd';
import './LandingPage.css'
import axios from 'axios';

const columns = [
  {
    title: 'ID',
    dataIndex: 'userID',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'userName',
    key: 'name',
  },
  
  {
    title: 'Password',
    dataIndex: 'userPassword',
    key: 'pw',
  },
  {
    title: '이메일',
    dataIndex: 'userEmail',
    key: 'email',
  },
  {
    title: '주소',
    dataIndex: 'userAddress',
    key: 'add',
  },
];

class LandingPage extends Component{

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
      const res = await axios.get('/api/user');     
      if(res.data[0] === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }


    render(){
        const { list } = this.state;
        
        return(
          <div style={{margin: AutoComplete}}> 
          <div className="table_menu">
            <h2>유저 정보</h2>
          </div>
           <div className="table_user">
           
            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="userID"/>
              : null}
          
          </div>
          </div>
            
        )};
}

export default LandingPage;