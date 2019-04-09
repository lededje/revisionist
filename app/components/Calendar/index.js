import React from 'react';
import moment from 'moment';

import Event from '../Event';

import Scale from './Scale';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import Header from './Header';

import styles from './styles.css';

const minutesInADay = 1440;

const Calendar = ({ children, events }) => {

  const startDate = moment().startOf('week');
  const amountOfDays = 7;

  return (
    <div className={styles.calendar}>
      <Header startDate={startDate} amountOfDays={amountOfDays} />
      <section className={styles.body}>
        <Scale />
        <div className={styles['day-container']}>
          {
            new Array(amountOfDays).fill('').map((_, i) => {
              const isToday = moment(startDate).add(i, 'days').isSame(moment(), 'day');
              return (
                <Day>
                {isToday && <CurrentTimeIndicator time={moment().toISOString()} />}
                {events.filter((event) => moment(event.startTime).isSame(moment(startDate).add(i, 'days'), 'day')).map((event) => (
                  <WrappedEvent label={event.label} startTime={event.startTime} duration={event.duration} />
                ))}
                </Day>
              );
            })
          }
        </div>
      </section>
    </div>
  );
}

const Day = ({ children }) => (
  <div className={styles.day}>
    { children }
  </div>
);

const WrappedEvent = ({ label, startTime, duration }) => {
  const startOfDay = moment(startTime).startOf('day');
  const startTimeMinutesPastMidnight = moment(startTime).diff(startOfDay, 'minutes');
  const endTimeMinutesPastMidnight = moment(startTime).add(duration, 'seconds').diff(startOfDay, 'minutes');

  const percentageThroughDayStart = startTimeMinutesPastMidnight / minutesInADay * 100;
  const percentageThroughDayEnd = endTimeMinutesPastMidnight / minutesInADay * 100;

  return (
    <div style={{
      top: `${ percentageThroughDayStart }%`,
      bottom: `${ 100 - percentageThroughDayEnd }%`
    }} className={styles['event-wrapper']}>
      <Event label={label} className={styles['event']} />
    </div>
  );
}

export default Calendar;
