import { message } from 'antd';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function EmployeeRoute ({ component: Component, ...rest }) {     //학생만 쓸 수 있는 route

    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('login')?(
                    localStorage.getItem('position')==='직원' ? 
                    <Component {...props} /> : 
                    
                    (
                        <Redirect to={{
                                         pathname: '/main', 
                                         state: {from: props.location}
                                       }}
                                 message="메인화면으로 이동합니다."
                         />
                     )
                ) : (
                   <Redirect to={{
                                    pathname: '/login', 
                                    state: {from: props.location}
                                  }}
                    />
                   
                )
            }
        />
    )
}

export default EmployeeRoute;