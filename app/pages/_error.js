import React from 'react';
import { PropTypes } from 'prop-types';

import InternalServerError from './errors/InternalServerError';
import NotFound from './errors/NotFound';
import Unauthorized from './errors/Unauthorized';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    switch (true) {
      case res.statusCode: {
        return { statusCode: res.statusCode };
      }
      case err.statusCode:
        return { statusCode: err.statusCode };
      default:
        return { statusCode: null };
    }
  }

  render() {
    const { statusCode } = this.props;
    switch (statusCode) {
      case 401:
        return <Unauthorized {...this.props} />;
      case 404:
        return <NotFound {...this.props} />;
      default:
        return <InternalServerError />;
    }
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
