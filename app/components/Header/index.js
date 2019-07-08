import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';

import styles from './styles.css';
import Container from '../Container';

const enhance = flowRight(
  connect(state => ({
    user: state.user,
  })),
);

const Header = ({ user }) => {
  const isLoggedIn = typeof get(user, 'id') === 'number';
  return (
    <header className={styles.bar}>
      <Container className={styles['two-columns']}>
        <button type="button" className={styles.logo}>
          The Revisionist
        </button>
        <nav>
          {isLoggedIn ? (
            <>
              <button type="button" className={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" className={styles.button}>
                Login
              </button>
              <button type="button" className={styles.button}>
                Join Free
              </button>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default enhance(Header);
