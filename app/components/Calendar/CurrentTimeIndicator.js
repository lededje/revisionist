import React, { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './styles.css';

const minutesInADay = 1440;

const CurrentTimeIndicator = () => {
  const [time, setTime] = useState();
  const minutesPastMidnight = moment(time).diff(moment(time).startOf('day'), 'minutes');

  useEffect(() => {
    const timer = setInterval(() => setTime(moment().toISOString()), 500);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div
      style={{
        top: `${(minutesPastMidnight / minutesInADay) * 100}%`,
      }}
      className={styles['current-time-indicator']}
    />
  );
};

export default CurrentTimeIndicator;
