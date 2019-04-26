import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './styles.css';

const Header = ({ startDate, amountOfDays }) => (
  <section className={styles.header}>
    {
      new Array(amountOfDays).fill('').map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className={styles.day}>{moment(startDate).add(i, 'days').format('ddd Do')}</div>
      ))
    }
  </section>
);

Header.propTypes = {
  startDate: PropTypes.string.isRequired,
  amountOfDays: PropTypes.number.isRequired,
};

export default Header;
