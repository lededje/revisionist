import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import styles from './styles.css';

const Header = ({ startDate, amountOfDays }) => (
  <section className={styles.header}>
    {
      new Array(amountOfDays).fill('').map((_, i) => {
        const humanReadableDate = moment(startDate).add(i, 'days').format('ddd Do');
        return (
          <div key={humanReadableDate} className={styles.day}>{humanReadableDate}</div>
        );
      })
    }
  </section>
);

Header.propTypes = {
  startDate: PropTypes.instanceOf(moment).isRequired,
  amountOfDays: PropTypes.number,
};

Header.defaultProps = {
  amountOfDays: 7,
};

export default Header;
