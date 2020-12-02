import React, { Component } from 'react';
import { AutoComplete, Table, Form, Button, message, Input, Space } from 'antd';
import './CourseRegPage.css'
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


const gyear = localStorage.getItem('year');
const gsem = localStorage.getItem('semester');



const rowSelection = {
  onChange:(selectedRowKeys, selectedRows, e) => {
  
    console.log(e.currentTarget.value)
  }
}
const id = localStorage.getItem('id')

class CourseRegPage extends Component{
  

    constructor(props) {
        super(props)
        this.state = {
          name : '',
          list : [],
          row :[],
          update : false,
          searchText: '',
          searchedColumn: '',
        }    
      }
    
    componentDidMount(){
      this._getData()
    }

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={'강의찾기'}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
  


    _getData = async () => {
      const res = await axios.get('/api/course', {params : {year : gyear, sem: gsem}});     
      if(res.data[0] === undefined) {
        let cover = [];
        cover.push(res.data);       // response 데이터들 push
        return this.setState({ list : cover })
      }
      this.setState({ list : res.data });
    }


    handleData = ()=>{
      const datas ={userID:id, Course_num: this.state.row.Course_num, year: gyear, semester: gsem}
      axios('/add/course',{ method: 'POST', headers: new Headers(), data: datas}) // 성공, 실패시 메시지
        .then(res=>{
          console.log(res.data[0].cnt);
          if(res.data[0].cnt===2){
            message.success("수강신청이 성공했습니다.")
          //return window.location.href='/course/register';
          }
          else if(res.data[0].cnt===0){
            message.error("같은 이름의 강의를 수강 중입니다.")
          }
          else if(res.data[0].cnt===3){
            message.info("재수강 수업으로 신청되었습니다.")
          }
          else{
            message.error("수강신청에 실패했습니다. 강의 시간을 확인해주세요.")
          }
      });      
    }

    onChange = (rowSelection, selectedRows)=>{
      this.setState({row: selectedRows[0]})
      }

    render(){
        const { list } = this.state;
        const columns = [
          {
            title: '학정번호',
            dataIndex: 'Course_num',
            key: 'Course_num',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.userGrade - b.userGrade,
          },
          {
            title: '과목명',
            dataIndex: 'Course_name',
            key: 'Course_name',
            ...this.getColumnSearchProps('Course_name'),
          },
          
          {
            title: '학과',
            dataIndex: 'major',
            key: 'major',
            filters: [
              {
                text: '컴정공',
                value: '컴퓨터정보공학',
              },
              {
                text: '컴소',
                value: '컴퓨터소프트웨어',
              },
              {
                text: '전기공',
                value: '전기공학',
              },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.major.indexOf(value) !== -1
          },
          {
            title: '이수',
            dataIndex: 'classification',
            key: 'classification',
            filters: [
              {
                text: '교양',
                value: '교',
              },
              {
                text: '전공',
                value: '전',
              },
              {
                text: '기초',
                value: '기',
              },
          ],
            filterMultiple: true,
            onFilter: (value, record) => record.classification.indexOf(value) !== -1
          },
          {
            title: '학점',
            dataIndex: 'credit',
            key: 'credit',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.credit - b.credit,
          },
          {
            title: '강의시간',
            dataIndex: 'class_time',
            key: 'class_time',
          },
        ];
        
        return(
          <div style={{margin: AutoComplete}}> 
            <div className="table">
              <h2>강의 정보</h2>
            </div>
            <div className="table_course">
              {list.length !== 0
                ? 
                <Table rowSelection={{type:'radio', onChange:this.onChange}}  pagination={{pageSize:10}} dataSource={list} columns={columns} size="small" rowKey="Course_num"/>
                : null}
            
            </div>
            
            <div>
              <Button type="primary" onClick={this.handleData}>수강 신청</Button>
            </div>
          </div>
            
        )};
}

export default CourseRegPage;