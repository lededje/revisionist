import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flowRight from 'lodash/flowRight';
import isEmpty from 'lodash/isEmpty';
import { register } from '../actions/account';

import withRedux from '../components/withRedux';

const enhance = flowRight(
  withRedux,
  connect(
    state => ({ account: state.account }),
    dispatch => ({ actions: bindActionCreators({ register }, dispatch) }),
  ),
);

const registerSubmit = async (event, registerAction, setRegisterRequest) => {
  event.preventDefault();

  const formData = new window.FormData(event.currentTarget);
  const email = formData.get('email');
  const name = formData.get('name');

  const request = await registerAction({ email, name });

  setRegisterRequest(request);
};

const Join = ({ actions }) => {
  const [registerRequest, setRegisterRequest] = useState({});
  return (
    <>
      {registerRequest.status !== 200 && (
        <form onSubmit={event => registerSubmit(event, actions.register, setRegisterRequest)}>
          <div>
            <input type="text" name="name" placeholder="name" />
          </div>
          <div>
            <input type="email" name="email" placeholder="email" />
          </div>
          <button type="submit">Join free</button>
        </form>
      )}

      {(() => {
        switch (true) {
          case registerRequest.status === 400
            && registerRequest.payload.error === 'UNIQUE_CONSTRAINT_ERROR': {
            return 'Error: email already in use';
          }
          case registerRequest.status === 200: {
            return 'Registration successful. Verify via email.';
          }
          case isEmpty(registerRequest): {
            return null;
          }
          default:
            return 'An unknown error occurred';
        }
      })()}
    </>
  );
};

export default enhance(Join);
