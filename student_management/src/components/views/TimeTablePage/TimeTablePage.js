import React, {useEffect, useState } from 'react';
import { AutoComplete, Select } from 'antd';
import './TimeTablePage.css'
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import axios from 'axios';

const { Option } = Select;

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');
const year = localStorage.getItem('year')
const sem = localStorage.getItem('semester')
const termData = ['2020년도 2학기', '2020년도 1학기', '2019년도 2학기','2019년도 1학기'];


// const daynames = ['MON','TUE','WED','THR','FRI'];
// const container = document.getElementById('calendar');
//   const options = {
//     taskView:false,
//     scheduleView:'time',
//     defaultView: 'week',          // 캘린더가 초기에 그려지는 뷰 타입을 주간 뷰로 지정
//     week: {                       // 주간 뷰 시간 지정
//       workweek:true,
//       startDayOfWeek:1,
//       hourStart: 8,
//       hourEnd: 20,
//     }
//   };
// const calendar = new Calendar(container,options);


function TimeTablePage(){

  const [list, setlist] = useState([])  
 
  const calendar = new Calendar('#calendar',{
    defaultView:'week',
    isReadOnly:true,

    week:{
      workweek:true,
      startDayOfWeek:1,
      hourStart:9,
      hourEnd:20,
    }
  });

  const handleTermChange = value => {  // 단과대학 변할 때 state 변화
    console.log(year+'/'+sem);  
  };

  useEffect(() => {
    _getData()
  }, [])

  
  const _getData = async () => {
    const res = await axios.get('/api/timeTable',{params:{user_id:userID, year:year,sem:sem}});
    if(res.data === undefined) {
      let cover = [];
      cover.push(res.data);       // response 데이터들 push
      return setlist(cover)
    }
    console.log(res.data);    
    setlist(res.data);
  }
  


  for(let i=0;i<=1;i++){
    var data ={Course_name:''}
    Object.assign(data,list[i])

    console.log(data.Course_name);
    calendar.createSchedules([
      {
        id : i,
        calendarId : 'course',
        category:'time',
        title : data.Course_name,
        start: '2020-11-30T09:30:00',
        end: '2020-11-30T011:30:00',
        isReadOnly:true,
      }
    ]);
  }
  calendar.render(true);


  return(
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
    </div>
    
    
    

    <br></br>
    
    <br></br>
    </div>
      
  );
}

export default TimeTablePage;

// import React from 'react'
// import Timetables from 'timetables'
// function TimeTablePage() {
//   var timetables = [
//     ['大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修'],
//     ['','','信号与系统@11302','信号与系统@11302','模拟电子技术基础@16204','模拟电子技术基础@16204','','','','','',''],
//     ['大学体育(Ⅳ)','大学体育(Ⅳ)','形势与政策(Ⅳ)@15208','形势与政策(Ⅳ)@15208','','','电路、信号与系统实验','电路、信号与系统实验','','','',''],
//     ['','','','','电装实习@11301','电装实习@11301','','','','大学体育','大学体育',''],
//     ['','','数据结构与算法分析','数据结构与算法分析','','','','','信号与系统','信号与系统','',''],
// ];
// var timetableType = [
//     [{index: '1',name: '8:30'}, 1],
//     [{index: '2',name: '9:30'}, 1],
//     [{index: '3',name: '10:30'}, 1],
//     [{index: '4',name: '11:30'}, 1],
//     [{index: '5',name: '12:30'}, 1],
//     [{index: '6',name: '14:30'}, 1],
//     [{index: '7',name: '15:30'}, 1],
//     [{index: '8',name: '16:30'}, 1],
//     [{index: '9',name: '17:30'}, 1],
//     [{index: '10',name: '18:30'}, 1],
//     [{index: '11',name: '19:30'}, 1],
//     [{index: '12',name: '20:30'}, 1]
// ];
// var week =  ['周一', '周二', '周三', '周四', '周五'];
// var highlightWeek = new Date().getDay();
// var styles = {
// Gheight: 50,
// leftHandWidth: 50,
// palette: ['#ff6633', '#eeeeee']
// };

// // 实例化(初始化课表)
// var Timetable = new Timetables({
// el: '#coursesTable',
// timetables: timetables,
// week: week,
// timetableType: timetableType,
// highlightWeek: highlightWeek,
// gridOnClick: function (e) {
//   alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
//   console.log(e)
// },
// styles: styles
// });

//重新设置参数 渲染
// function onChange() {
// Timetable.setOption({
// timetables: courseListOther,
// week: ['一', '二', '三', '四', '五', '六', '日'],
// styles:{
//   palette: ['#dedcda', '#ff4081']
// },
// timetableType:courseType,
// gridOnClick: function (e) {
//   console.log(e)
// }})
// };


//   return (
//     <div>
//       abc      
//     </div>
//   )
// }

// export default TimeTablePage

// import React from 'react'
// import {
//   Table, TableBody, TableCell, TableFooter, TableHeader, TableRow,
//   Text,
// } from 'grommet';
// function TimeTablePage() {

//   const DATA = [
//     {
//       id: 1, name: '0', email: 'eric@local', amount: 3775,
//     },
//     {
//       id: 2, name: '1', email: 'chris@local', amount: 5825,
//     },
//     {
//       id: 3, name: '2', email: 'alan@local', amount: 4300,
//     },
//   ];
  
//   let TOTAL = 0;
//   DATA.forEach((datum) => { TOTAL += datum.amount; });
  
//   const amountFormatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//   });
  
//   const COLUMNS = [
//     {
//       property: 'name',
//       label: 'Name',
//       dataScope: 'row',
//       format: datum => <strong>{datum.name}</strong>,
//     },
//     {
//       property: 'email',
//       label: 'Email',
//     },
//     {
//       property: 'amount',
//       label: 'Amount',
//       align: 'end',
//       footer: amountFormatter.format(TOTAL / 100),
//       format: datum => amountFormatter.format(datum.amount / 100),
//     },
//   ];
  


//   return (
//     <div>
//         <Table caption='Simple Table'>
//       <TableHeader>
//         <TableRow>
//           {COLUMNS.map(c => (
//             <TableCell key={c.property} scope='col' border='bottom' align={c.align}>
//               <Text>{c.label}</Text>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {DATA.map(datum => (
//           <TableRow key={datum.id}>
//             {COLUMNS.map(c => (
//               <TableCell key={c.property} scope={c.dataScope} align={c.align}>
//                 <Text>
//                   {c.format ? c.format(datum) : datum[c.property]}
//                 </Text>
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           {COLUMNS.map(c => (
//             <TableCell key={c.property} border='top' align={c.align}>
//               <Text>{c.footer}</Text>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableFooter>
//     </Table>
//     </div>
//   )
// }

// export default TimeTablePage
