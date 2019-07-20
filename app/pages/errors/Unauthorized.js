import React from 'react';

import withRedux from '../components/withRedux';
import LoginForm from '../components/LoginForm';

const Login = () => (
  <>
    <h1>Unauthorized</h1>
    <div>Maybe logging in will help</div>
    <LoginForm />
  </>
);

export default withRedux(Login);
