import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom'

 const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={props => 
    localStorage.getItem("user") ? (
      <Component {...props} />
    ) : (
      <Redirect to={
        "/login"
      }
      />
    )
    }
    />
)

export default PrivateRoute;