import React, { Component } from 'react';

import { fetchLoginStatus } from '../../actions/user';

export default Page => class withAuth extends Component {
  static async getInitialProps(context) {
    const { req, res, store } = context;

    if (!store) {
      throw new Error(
        "withAuth depends on the withRedux Hoc. Check it's being used and is ordered correctly. withRedux must be called first.",
      );
    }

    const isServer = !!req;

    await store.dispatch(fetchLoginStatus());

    console.log('rawrawrawr');

    console.log('>>>', store.getState().user.id);

    if (!store.getState().user.id) {
      throw new Error('rawr');
    }
  }

  render() {
    return <Page {...this.props} />;
  }
};
