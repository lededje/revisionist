import React from 'react';
import PropTypes from 'prop-types';

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
  if (typeof get(user, 'id') === 'number') return null;
  return (
    <header className={styles.bar}>
      <Container className={styles['two-columns']}>
        <button type="button" className={styles.logo}>
          The Revisionist
        </button>
        <nav>
          <button type="button" className={styles.button} onClick={actions.logout}>
            Logout
          </button>
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
