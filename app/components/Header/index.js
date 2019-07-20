import React from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';

import { logout } from '../../actions/user';

import styles from './styles.css';
import Container from '../Container';

const enhance = flowRight(
  connect(
    state => ({
      user: state.user,
    }),
    dispatch => ({ actions: bindActionCreators({ logout }, dispatch) }),
  ),
);

const Header = ({ user, actions }) => {
  const router = useRouter();
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
              <button type="button" className={styles.button} onClick={actions.logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" className={styles.button} onClick={() => router.push('/login')}>
                Login
              </button>
              <button type="button" className={styles.button} onClick={() => router.push('/join')}>
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
    id: PropTypes.number,
  }).isRequired,
};

export default enhance(Header);
