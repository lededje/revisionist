import React from 'react';
import moment from 'moment';

import styles from './styles.css';

const Header = ({ startDate, amountOfDays }) => (
  <section className={styles.header}>
    {
      new Array(amountOfDays).fill('').map((_, i) => (
        <div className={styles.day}>{moment(startDate).add(i, 'days').format('ddd Do')}</div>
      ))
    }
  </section>
);

export default Header;
