import React, { Component } from 'react';
import { Table, } from 'antd';
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
        cover.push(res.data);
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }


    render(){
        const { list } = this.state;
        console.log(list);
        return(
          <div className="table_menu">
            <h3>유저 정보</h3>
            <div className="table_user">
           
            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small"/>
              : null}
          </div>
          </div>
            
        )};
}

export default LandingPage;