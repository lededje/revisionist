import React, { useEffect, useState } from 'react';
import fetch from 'universal-fetch';
import { withRouter } from 'next/router';

import PropTypes from 'prop-types';

const activate = ({ router }) => {
  const [activationStatus, setActivationStatus] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/activate/${router.query.verificationToken}`, {
          method: 'PATCH',
        });
        setActivationStatus(response.status);
      } catch (e) {
        setActivationStatus(500);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading && 'Activating...'}
      {!loading
        && activationStatus
        && (() => {
          switch (activationStatus) {
            case 404:
              return 'Verification token not found';
            case 400:
              return 'Invalid verification token';
            case 204:
              return 'Account activated, proceed to login';
            case 500:
            default:
              return 'Internal server error';
          }
        })()}
    </>
  );
};

activate.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      verificationToken: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(activate);
