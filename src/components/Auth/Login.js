import React from 'react';
import { Link } from 'react-router-dom';
import SocialLogins from './SocialLogins';

const Login = () => (
  <div className="login-bg">
    <div className="login-button-container">
      <div className="logo" />
      <SocialLogins />
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  </div>
);

export default Login;
