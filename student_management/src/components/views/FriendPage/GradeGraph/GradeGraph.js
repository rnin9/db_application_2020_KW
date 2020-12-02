import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router";
import { AutoComplete, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Chart } from "react-google-charts";
import './GradeGraph.css'
import axios from 'axios';

const userID = localStorage.getItem('id');
const userName = localStorage.getItem('name');


function GradeGraph() {
    const [lineGraph, setLineGraph] = useState([])
    const location = useLocation();
    const history = useHistory();
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
        let long, short, who;
        if (chart_res.data.length >= chart_res2.data.length) {
            who = 1;
            long = chart_res.data.length;
            short = chart_res2.data.length;
        } else {
            who = 2;
            long = chart_res2.data.length;
            short = chart_res.data.length;
        }
        console.log(short, long);
        if (short === 0) {
            if (who === 1) lineChart_data.push(['1학기', parseFloat(chart_res.data[0].grade), 0]);
            else lineChart_data.push(['1학기', 0, parseFloat(chart_res2.data[0].grade)]);
        }
        for (let i = 0; i < short; i++) {
            lineChart_data.push([(i + 1) + '학기', parseFloat(chart_res.data[i].grade), parseFloat(chart_res2.data[i].grade)]);

        }
        if (short === 0) short = 1;
        for (let i = short; i < long; i++) {
            if (who === 1) lineChart_data.push([(i + 1) + '학기', chart_res.data[i].grade, 0]);
            else lineChart_data.push([(i + 1) + '학기', 0, chart_res2.data[i].grade]);
        }
        setLineGraph(lineChart_data);

    }

    const handleBack=()=>{
        history.push('/user/friend/list')
    }
    return (
        <div style={{ margin: AutoComplete }}>
            <div className="table_graph">
                <h2 style={{ paddingTop: 30, paddingBottom: 20 }}>{friendName}의 성적과 대조</h2>
            </div>
            <div className="table_chart_graph">
                <Chart
                    // className="table_grade"
                    width={500}
                    height={250}
                    chartType="LineChart"
                    loader={<div><LoadingOutlined/> Loading...</div>}
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
                    }}
                />
            </div>
            <Button onClick={handleBack} type="primary">
                목록으로
      </Button>
        </div>
    )
}

export default GradeGraph;