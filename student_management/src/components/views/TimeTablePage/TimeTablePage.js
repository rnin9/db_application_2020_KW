import React, {useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text,
} from 'grommet';
import { Select, AutoComplete, Button } from 'antd';
import axios from 'axios';
import './TimeTablePage.css'

const { Option } = Select;





function TimeTablePage() {

  const userID = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const year = localStorage.getItem('year')
  const sem = localStorage.getItem('semester')
  const termData = ['2020년도 2학기', '2020년도 1학기', '2019년도 2학기', '2019년도 1학기'];

  const [list, setlist] = useState([])
  const [DATAs, setDATAs] = useState([])
  const [v, setv] = useState('')

  // useEffect(() => {
  //   _getData()
  // }, [])


  // const _getData = async () => {
  //   const res = await axios.get('/api/timeTable', { params: { user_id: userID, year: year, sem: sem } });
  //   if (res.data === undefined) {
  //     let cover = [];
  //     cover.push(res.data);       // response 데이터들 push
  //     return setlist(cover)
  //   }
  //   setlist(res.data);
  // }
    const handle=()=>{
      console.log('ok')
    }
    const handleClick=()=>{
      const value = v
      const DATA = [
        {
          id: 0, name: '0', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 1, name: '1', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 2, name: '2', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 3, name: '3', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 4, name: '4', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 5, name: '5', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 6, name: '6', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 7, name: '7', m: '', t: '', w: '', th: '', f: '',
        },
      ];

      const number = value.replace(/[^0-9]/g, '');
      setv(value)
        if (number % 2 === 0) {
          let date = { user_id: userID, year: (number - 2) / 10, sem: 2 }
            axios.get('/api/timeTable', { params: date })
                .then(res => {
                  setlist(res.data);
                })

        } else {
            let date = { user_id: userID, year: (number - 1) / 10, sem: 1 }
            axios.get('/api/timeTable', { params: date })
                .then(res => {
                  setlist(res.data);  
                })

        }

    list.map(c=>{
      const a = c.class_time
        var temp;
        if((temp = a.indexOf("월")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                      DATA[index].m=c.Course_name
                    
                }
            }
          }
          if((temp = a.indexOf("화")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                      DATA[index].t=c.Course_name
                    
                }
            }
          }
          if((temp = a.indexOf("수")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                    DATA[index].w =c.Course_name
                }
            }
          }
          
          if((temp = a.indexOf("목")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                      DATA[index].th=c.Course_name
                    
                }
            }
          }
            if((temp = a.indexOf("금")) > -1){
              temp +=2;
              var startPoint = temp;
              var endPoint = temp;
              for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                  if(a.charAt(i)=='[')
                  {
                      startPoint = i;
                  }
                  if(a.charAt(i)==']')
                  {
                      endPoint = i;
                      var index = parseInt(a.substring(startPoint + 1, endPoint));
                        DATA[index].f=c.Course_name
                      
                  }
              }
        }
    })
    setDATAs(DATA)
    }
    const handleTermChange = (value) => {  // 단과대학 변할 때 state 변화
      
      const DATA = [
        {
          id: 0, name: '0', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 1, name: '1', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 2, name: '2', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 3, name: '3', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 4, name: '4', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 5, name: '5', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 6, name: '6', m: '', t: '', w: '', th: '', f: '',
        },
        {
          id: 7, name: '7', m: '', t: '', w: '', th: '', f: '',
        },
      ];

      const number = value.replace(/[^0-9]/g, '');
        if (number % 2 === 0) {
          let date = { user_id: userID, year: (number - 2) / 10, sem: 2 }
            axios.get('/api/timeTable', { params: date })
                .then(res => {
                  setlist(res.data);
                })

        } else {
            let date = { user_id: userID, year: (number - 1) / 10, sem: 1 }
            axios.get('/api/timeTable', { params: date })
                .then(res => {
                  setlist(res.data);  
                })

        }

    list.map(c=>{
      const a = c.class_time
        var temp;
        if((temp = a.indexOf("월")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                      DATA[index].m=c.Course_name
                    
                }
            }
          }
          if((temp = a.indexOf("화")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                      DATA[index].t=c.Course_name
                    
                }
            }
          }
          if((temp = a.indexOf("수")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                    DATA[index].w =c.Course_name
                }
            }
          }
          
          if((temp = a.indexOf("목")) > -1){
            temp +=2;
            var startPoint = temp;
            var endPoint = temp;
            for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                if(a.charAt(i)=='[')
                {
                    startPoint = i;
                }
                if(a.charAt(i)==']')
                {
                    endPoint = i;
                    var index = parseInt(a.substring(startPoint + 1, endPoint));
                      DATA[index].th=c.Course_name
                    
                }
            }
          }
            if((temp = a.indexOf("금")) > -1){
              temp +=2;
              var startPoint = temp;
              var endPoint = temp;
              for(var i= temp; i< a.length && a.charAt(i) !=':'; i++){
                  if(a.charAt(i)=='[')
                  {
                      startPoint = i;
                  }
                  if(a.charAt(i)==']')
                  {
                      endPoint = i;
                      var index = parseInt(a.substring(startPoint + 1, endPoint));
                        DATA[index].f=c.Course_name
                      
                  }
              }
        }
    })
    setDATAs(DATA)
  }
  
  

  const COLUMNS = [
    {
      property: 'name',
      label: '',
      dataScope: 'row',
      format: datum => <strong style={{width:20}}>{datum.name}</strong>,
    },
    {
      property: 'm',
      label: '월',
    },
    {
      property: 't',
      label: '화',
    },
    {
      property: 'w',
      label: '수',
    },
    {
      property: 'th',
      label: '목',
    },
    {
      property: 'f',
      label: '금',
    },
  ];



  return (
    <div style={{margin: AutoComplete}}>

      <div className="table">
        <h3>{userName} 학생의 시간표입니다.</h3>
      </div>
      <Select
        style={{ width: 250 }}
        onSelect={handleTermChange}>
        {termData.map(term => (
          <Option key={term}>{term}</Option>
        ))}
      </Select>
      <Button onClick={handleClick}>
        확인
      </Button>
      <br></br>
      <div className="table_grade">
      <Table caption=''>
        <TableHeader>
          <TableRow>
            {COLUMNS.map(c => (
              <TableCell className='table_cell1' key={c.property} scope='col' align={c.align} border='all' background='#e6f7ff'>
                <Text>{c.label}</Text>
              </TableCell>

            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {DATAs.map(datum => (
            <TableRow key={datum.id}>
              {COLUMNS.map(c => (
                <TableCell key={c.property} scope={c.dataScope} align={c.align}  border='all' background='white'>
                  <Text>
                    {c.format ? c.format(datum) : datum[c.property]}
                  </Text>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {COLUMNS.map(c => (
              <TableCell key={c.property} border='top' align={c.align}>
                <Text>{c.footer}</Text>
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      </Table>
      </div>
    </div>
    
  )
}

export default TimeTablePage
