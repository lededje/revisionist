import React from 'react';

import withRedux from '../components/withRedux';
import LoginForm from '../components/LoginForm';

const Login = () => (
  <>
    <h1>Login</h1>
    <div>Login</div>
    <LoginForm />
  </>
);

export default withRedux(Login);
