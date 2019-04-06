import React from 'react';
import moment from 'moment';

import chroma from 'chroma-js';

import styles from './styles.css';

const scale = chroma.scale(['D8E6E7', '218380']);


const Day = ({ label, percentage, blank }) => {
  const style = blank === true
      ? {}
      : {
      background: scale(percentage).hex(),
      color: percentage > 0.5 ? '#fff' : '#000',
    }

  return (
    <div className={styles['day-container']}>
        <div className={styles.day} style={style}>
          <span className={styles.label}>{ label }</span>
        </div>
    </div>
  );
}

const HeatCalendar = ({ date }) => {
  const firstOfTheMonthDayIndex = moment(date).startOf('month').day();
  const lastOfTheMonthDayIndex = moment(date).endOf('month').day();
  const numberOfDaysInMonth = moment(date).daysInMonth();

  return (
    <div className={styles['heat-calendar']}>
      {new Array(firstOfTheMonthDayIndex).fill('').map((_, i) => <Day label="" blank />)}
      {new Array(numberOfDaysInMonth).fill('').map((_, i) => <Day label={i + 1} percentage={Math.random()} />)}
      {new Array(6 - lastOfTheMonthDayIndex).fill('').map((_, i) => <Day label="" blank />)}
    </div>
  );
}

export default HeatCalendar;
