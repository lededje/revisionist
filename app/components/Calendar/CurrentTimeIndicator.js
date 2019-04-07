import React from 'react';
import moment from 'moment';

import styles from './styles.css';

const minutesInADay = 1440;

const CurrentTimeIndicator = ({ time }) => {
  const minutesPastMidnight = moment(time).diff(moment(time).startOf('day'), 'minutes');

  return (
    <div style={{
      top: `${minutesPastMidnight / minutesInADay * 100}%`
    }} className={styles['current-time-indicator']} />
  )
}

export default CurrentTimeIndicator;
