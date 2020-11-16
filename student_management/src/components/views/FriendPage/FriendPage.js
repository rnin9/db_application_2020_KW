import React from 'react';
import { UserAddOutlined} from '@ant-design/icons';
import { Table, Tag, Space, Input, Button } from 'antd';
import './FriendPage.css'
const { Column, ColumnGroup } = Table;


const { Search } = Input;

  function FriendPage(){

    const onSearch = value => console.log(value);
    const data = [
      {
        key: '1',
        id: '2014722090',
        name: '강민주',
        major: '컴퓨터정보공학부',
        gender: '남자',
        tags: ['학부생'],
      },
      {
        key: '2',
        id: '20147',
        name: '이기훈',
        major: '컴퓨터정보공학부',
        gender: '남자',
        tags: ['교수'],
      },
      {
        key: '3',
        id: '22034',
        name: '나직원',
        major: '컴퓨터정보공학부',
        gender: '남자',
        tags: ['직원'],
      },
    ];


      return (
        <div style={{margin:'auto'}}>
        <div className="friend_table_menu">
        <h2>친구 신청</h2>
        <div className="friend_search">
        <Search
      placeholder="아이디를 입력하세요!"
      allowClear
      onSearch={onSearch}
      enterButton
      />
      </div>
      </div>
       <div className="friend_table_user">
       
      
       <Table dataSource={data}>
    <Column title="ID" dataIndex="id" key="lastName" />
    <Column title="이름" dataIndex="name" key="age" />
    <Column title="성별" dataIndex="gender" key="address" />
    <Column title="학과" dataIndex="major" key="address" />
    <Column
      title="직급"
      dataIndex="tags"
      key="tags"
      render={tags => (
        <>
          {tags.map(tag => (
            tag ==='학부생'?
            <Tag color="geekblue" key={tag}>
              {tag}
            </Tag>
            : tag ==='교수' ?
            <Tag color="red" key={tag}>
              {tag}
            </Tag> :
            <Tag color="green" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title=""
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <Button type="primary"style={{fontSize:15}} ><UserAddOutlined /></Button>
        </Space>
      )}
    />
  </Table>
      </div>
      </div>
       
      );
}
  export default FriendPage;