// import React, {useEffect, useState } from 'react';
// import { AutoComplete, Select } from 'antd';
// import './TimeTablePage.css'
// import Calendar from 'tui-calendar';
// import 'tui-calendar/dist/tui-calendar.css';
// import axios from 'axios';

// const { Option } = Select;

// const userID = localStorage.getItem('id');
// const userName = localStorage.getItem('name');
// const year = localStorage.getItem('year')
// const sem = localStorage.getItem('semester')
// const termData = ['2020년도 2학기', '2020년도 1학기', '2019년도 2학기','2019년도 1학기'];


// // const daynames = ['MON','TUE','WED','THR','FRI'];
// // const container = document.getElementById('calendar');
// //   const options = {
// //     taskView:false,
// //     scheduleView:'time',
// //     defaultView: 'week',          // 캘린더가 초기에 그려지는 뷰 타입을 주간 뷰로 지정
// //     week: {                       // 주간 뷰 시간 지정
// //       workweek:true,
// //       startDayOfWeek:1,
// //       hourStart: 8,
// //       hourEnd: 20,
// //     }
// //   };
// // const calendar = new Calendar(container,options);


// function TimeTablePage(){

//   const [list, setlist] = useState([])  

//   const calendar = new Calendar('#calendar',{
//     defaultView:'week',
//     isReadOnly:true,

//     week:{
//       workweek:true,
//       startDayOfWeek:1,
//       hourStart:9,
//       hourEnd:20,
//     }
//   });

//   const handleTermChange = value => {  // 단과대학 변할 때 state 변화
//     console.log(year+'/'+sem);  
//   };

//   useEffect(() => {
//     _getData()
//   }, [])


//   const _getData = async () => {
//     const res = await axios.get('/api/timeTable',{params:{user_id:userID, year:year,sem:sem}});
//     if(res.data === undefined) {
//       let cover = [];
//       cover.push(res.data);       // response 데이터들 push
//       return setlist(cover)
//     }
//     console.log(res.data);    
//     setlist(res.data);
//   }



//   for(let i=0;i<=1;i++){
//     var data ={Course_name:''}
//     Object.assign(data,list[i])

//     console.log(data.Course_name);
//     calendar.createSchedules([
//       {
//         id : i,
//         calendarId : 'course',
//         category:'time',
//         title : data.Course_name,
//         start: '2020-11-30T09:30:00',
//         end: '2020-11-30T011:30:00',
//         isReadOnly:true,
//       }
//     ]);
//   }
//   calendar.render(true);


//   return(
//     <div style={{margin: AutoComplete}}>


//     <div className="table">            
//       <h3>{userName} 학생의 시간표입니다.</h3>
//     </div>
//     <Select
//         defaultValue={termData[0]}
//         style={{ width: 250 }}
//         onSelect={handleTermChange}>
//         {termData.map(term => (
//             <Option key={term}>{term}</Option>
//         ))}
//     </Select>
//     <br></br>

//     <div className="table_grade">
//     </div>




//     <br></br>

//     <br></br>
//     </div>

//   );
// }

// export default TimeTablePage;


import React, {useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
  Text,
} from 'grommet';
import { Select, AutoComplete } from 'antd';
import axios from 'axios';
import './TimeTablePage.css'

const { Option } = Select;

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



function TimeTablePage() {

  const userID = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const year = localStorage.getItem('year')
  const sem = localStorage.getItem('semester')
  const termData = ['2020년도 2학기', '2020년도 1학기', '2019년도 2학기', '2019년도 1학기'];

  const [list, setlist] = useState([])
  const [DATAs, setDATAs] = useState([])

  useEffect(() => {
    _getData()
  }, [])


  const _getData = async () => {
    const res = await axios.get('/api/timeTable', { params: { user_id: userID, year: year, sem: sem } });
    if (res.data === undefined) {
      let cover = [];
      cover.push(res.data);       // response 데이터들 push
      return setlist(cover)
    }
    setlist(res.data);
  }

    const handleTermChange = () => {  // 단과대학 변할 때 state 변화
  
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
  
  

  

  // let TOTAL = 0;
  // DATA.forEach((datum) => { TOTAL += datum.amount; });

  // const amountFormatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 2,
  // });

  const COLUMNS = [
    {
      property: 'name',
      label: '',
      dataScope: 'row',
      format: datum => <strong>{datum.name}</strong>,
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
        defaultValue={termData[0]}
        style={{ width: 250 }}
        onSelect={handleTermChange}>
        {termData.map(term => (
          <Option key={term}>{term}</Option>
        ))}
      </Select>
      <br></br>
      <div className="table_grade">
      <Table caption=''>
        <TableHeader>
          <TableRow>
            {COLUMNS.map(c => (
              <TableCell key={c.property} scope='col' border='bottom' align={c.align}>
                <Text>{c.label}</Text>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {DATAs.map(datum => (
            <TableRow key={datum.id} style={{ borderBlockColor: 'red' }}>
              {COLUMNS.map(c => (
                <TableCell key={c.property} scope={c.dataScope} align={c.align}>
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
