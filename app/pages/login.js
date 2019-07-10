import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flowRight from 'lodash/flowRight';
import PropTypes from 'prop-types';

import withRedux from '../components/withRedux';
import { login } from '../actions/user';

const enhance = flowRight(
  withRedux,
  connect(
    state => ({ auth: state.auth }),
    dispatch => ({ actions: bindActionCreators({ login }, dispatch) }),
  ),
);

const loginSubmit = (event, loginAction) => {
  event.preventDefault();

  const formData = new window.FormData(event.currentTarget);
  const email = formData.get('email');

  return loginAction(email);
};

const Login = ({ auth, actions }) => (
  <>
    {auth.code ? (
      <>
        <h1>Awaiting Confirmation</h1>
        <p>We sent an email to zeit@likeminded.io.</p>
        <p>Verify that the provided security code matches the following text:</p>
        <div>{auth.code}</div>
        <p>Waiting for your confirmation</p>
      </>
    ) : (
      <form onSubmit={event => loginSubmit(event, actions.login)}>
        Log in to The Revisionist
        <label htmlFor="email">
          Email:
          {' '}
          <input id="email" type="email" name="email" />
        </label>
        <button type="submit">Continue</button>
      </form>
    )}
  </>
);

Login.propTypes = {
  auth: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
};

export default enhance(Login);
