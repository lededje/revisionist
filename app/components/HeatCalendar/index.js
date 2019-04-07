import React from 'react';
import moment from 'moment';

import chroma from 'chroma-js';

import styles from './styles.css';

const secondsInADay = 1440 * 8;

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

const HeatCalendar = ({ date, events }) => {

  const eventCount = events.reduce((acc, event) => {
    const eventDate = moment(event.startTime).startOf('day').toISOString();
    return {
      ...acc,
      [eventDate]: acc[eventDate] ? acc[eventDate] + event.duration : event.duration
    };
  }, {})

  const firstOfTheMonthDayIndex = moment(date).startOf('month').day();
  const lastOfTheMonthDayIndex = moment(date).endOf('month').day();
  const numberOfDaysInMonth = moment(date).daysInMonth();

  return (
    <div>
      <h1>{moment(date).format('MMMM YYYY')}</h1>
      <div className={styles['heat-calendar']}>
        {new Array(firstOfTheMonthDayIndex).fill('').map((_, i) => <Day label="" blank />)}
        {new Array(numberOfDaysInMonth).fill('').map((_, i) => {
          const dayKey = moment(date).startOf('month').add(i + 1, 'days').startOf('day').toISOString();
          const minutesBusy = eventCount[dayKey] || 0;
          const percentageBusy = minutesBusy / secondsInADay;
          return <Day label={i + 1} percentage={percentageBusy} />
        })}
        {new Array(6 - lastOfTheMonthDayIndex).fill('').map((_, i) => <Day label="" blank />)}
      </div>
    </div>
  );
}

export default HeatCalendar;
