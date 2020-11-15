import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function AuthRoute ({ component: Component, ...rest }) {     //학생만 쓸 수 있는 route

    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('login')?(
                    <Component {...props} />
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

export default AuthRoute;