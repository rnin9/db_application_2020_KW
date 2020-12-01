import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router";
import { AutoComplete } from 'antd';
import { Chart } from "react-google-charts";
// import '../GradePage/GradePage.css'
import axios from 'axios';

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');


function GradeGraph() {
    const [lineGraph, setLineGraph] = useState([])
    const location = useLocation();
    const friendID = location.state.friendID;
    const friendName = location.state.friendName;
    const lineChart_data = [['term', userName, friendName]];
    console.log(friendID, friendName)
    useEffect(() => {
        _getData()

    }, [])

    const _getData = async () => {
        const chart_res = await axios.get('/api/userGradeGraph', { params: userID });
        const chart_res2 = await axios.get('/api/userGradeGraph', { params: friendID });
        let len;
        if(chart_res.data.length >= chart_res2.data.length)
            len = chart_res.data.length
        else
            len = chart_res2.data.length

        for (let i = 0; i < len; i++) {
            if(chart_res.data[i]===undefined)
            var sem_f = parseFloat(chart_res2.data[i].sem);
            else
            var sem_f = parseFloat(chart_res.data[i].sem);
            
            if (chart_res.data[i]===undefined)
            var str = chart_res2.data[i].year;
            else
            var str = chart_res.data[i].year;

            if (sem_f === 2.0) str = str + '년도 2학기';
            else if (sem_f === 1.0) str = str + '년도 1학기';
            else if (sem_f === 1.5) str = str + '년도 여름 학기';
            else if (sem_f === 2.5) str = str + '년도 겨울 학기';
            
            if(chart_res2.data[i]===undefined && chart_res.data[i]===undefined)
            lineChart_data.push([str, 0, 0]);
            else if( chart_res.data[i]===undefined)
            lineChart_data.push([str, 0, parseFloat(chart_res2.data[i].grade)]);
            else if( chart_res2.data[i]===undefined)
            lineChart_data.push([str, parseFloat(chart_res.data[i].grade), 0]);
            else
            lineChart_data.push([str, parseFloat(chart_res.data[i].grade),  parseFloat(chart_res2.data[i].grade)]);
  
        }
        setLineGraph(lineChart_data);

    }

    return (
        <div style={{ margin: AutoComplete }}>
            <div className="table">
                <h2>{friendName}의 성적과 대조</h2>
            </div>
            <div className="table_chart">
                <Chart
                    // className="table_grade"
                    width={500}
                    height={250}
                    chartType="LineChart"
                    loader={<div>Loading CHART</div>}
                    data={lineGraph}
                    options={{
                        title: '학기별 성적 분포',
                        hAxis: {
                            title: '수강 학기',
                        },
                        vAxis: {
                            title: '성적',
                            minValue: 0,
                            maxValue: 5,
                        },
                        legend: 'none',
                    }}
                />

            </div>
        </div>
    )
}

export default GradeGraph;