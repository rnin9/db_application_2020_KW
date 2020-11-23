import { message } from 'antd';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProfessorRoute ({ component: Component, ...rest }) {     //학생만 쓸 수 있는 route

    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('login')?(
                    localStorage.getItem('position')==='교수' ? 
                    <Component {...props} /> :  (
                        <Redirect to={{
                                         pathname: '/main', 
                                         state: {from: props.location}
                                       }}
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

export default ProfessorRoute;