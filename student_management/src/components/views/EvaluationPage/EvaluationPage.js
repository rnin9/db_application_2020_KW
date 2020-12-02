import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router";
import { AutoComplete, Table, Tag, Button, Input, Space } from 'antd';
import { StarTwoTone, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './EvaluationPage.css'
import axios from 'axios';

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');

function EvaluationPage(){

  const [list, setlist] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={ searchInput }
            placeholder={'Search'}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              검색
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              초기화
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {    setTimeout(() => searchInput.current.select());   }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  };

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };


  const columns = [
    {
      title: '과목명',
      dataIndex: 'Course_name',
      key: 'cname',
      ...getColumnSearchProps('Course_name'),
      //강의명 클릭시 디테일 페이지로 넘어감
      render : (text, record) => (
        <Button type='link' onClick={handleClick} id={record.course_code+','+record.Course_name}>{text}</Button>
      )
    },
    
    {
      title: '교수명',
      dataIndex: 'professor_name',
      key: 'professor_name',
      ...getColumnSearchProps('professor_name'),

    },
    {
      title: '평점',
      dataIndex: 'rating',
      key: 'rating',
      sorter: {
        compare: (a, b) => a.rating - b.rating,
        multiple: 3,
      },
      render : (key) => (
        <div><StarTwoTone twoToneColor="#FFE400"/> {key}</div>
      )
    },
    {
      title: '태그',
      dataIndex : 'tags',
      key : 'tags',
      ...getColumnSearchProps('tags'),
      render: tags =>(
        <>
          {tags.map(tag => {
            let color;
            if(tag === '꿀잼' || tag === 'A폭격기' || tag === '인터넷강의'){
              color = 'green';
            }
            else if(tag ==='F폭격기' || tag === '노잼' || tag === '조별과제'){
              color = 'volcano';
            }
            else{
              color = 'default';
            }
            return(
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    }
  ];

  useEffect(() => {
    _getData()
  }, [])

  //강의명 클릭시 페이지 넘어가면서 학정번호 넘겨줘야함
  const handleClick = (e)=>{
    console.log(e.currentTarget.id);
    const split=e.currentTarget.id.split(',');
    history.push({
      pathname: "/user/eval/detail",
      state: {      
          ccode:split[0],
          cname:split[1],
      }
    })
  }

  const _getData = async () => {
      const res = await axios.get('/api/userEval');
      let cover2=[];
      for(let i=0;i<res.data.length;i++){
        console.log('res.data');
        console.log(res.data[i]);
        var cover = {
          course_code:'',
          Course_name:'',
          professor_name:'',
          rating:0.0,
          tags:[],
        }
        cover.course_code=res.data[i].Course_num;
        cover.Course_name=res.data[i].Course_name;
        cover.professor_name=res.data[i].userName;
        cover.rating=res.data[i].rating;
        console.log('cover');
        console.log(cover);
        
        const res2 = await axios.get('/api/userEval/tag',{params: cover.course_code});
        for(let j=0;j<res2.data.length;j++){
          cover.tags.push(res2.data[j].tag);
        }
        cover2.push(cover);
        
      }
      
      setlist(cover2);
      setisLoading(false);
    }


        return(
          <div style={{margin: AutoComplete}}>
          {!isLoading ? ( 
            <div>
            <div className="table">
            <h2>수업 평가</h2>
          </div>
          
          
          <div className="table_eval">
            <div className="add_Eval">
              <Button type="primary" style={{float:"right"}}>
                <a href="/write/eval">
                수강평 작성
                </a>
              </Button>
            </div>

            {list.length !== 0
              ? 
              <Table dataSource={list} columns={columns} size="small" rowKey="course_code"/>
              : null}
              

          </div>
          <br></br>
          <br></br>
          </div>):(<div className="eval_loading"><LoadingOutlined style={{fontSize:30, marginRight:10}}/> Loading...</div>)}
          </div>
        );
}

export default EvaluationPage;