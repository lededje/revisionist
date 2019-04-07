import React from 'react';
import moment from 'moment';

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
                  <Event label={event.label} startTime={event.startTime} duration={event.duration} />
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

const Event = ({ label, startTime, duration }) => {
  const startOfDay = moment(startTime).startOf('day');
  const startTimeMinutesPastMidnight = moment(startTime).diff(startOfDay, 'minutes');
  const endTimeMinutesPastMidnight = moment(startTime).add(duration, 'seconds').diff(startOfDay, 'minutes');

  const percentageThroughDayStart = startTimeMinutesPastMidnight / minutesInADay * 100;
  const percentageThroughDayEnd = endTimeMinutesPastMidnight / minutesInADay * 100;

  return (
    <div style={{
      top: `${ percentageThroughDayStart }%`,
      bottom: `${ 100 - percentageThroughDayEnd }%`
    }} className={styles.event}>
    { label }
    </div>
  );
}

export default Calendar;

// () => (
//   <Calendar>
//     <Day>
//       <CurrentTimeIndicator time={moment().toISOString()} />
//     </Day>
//     <Day>
//       <Event startTime={moment('Sat Apr 06 2019 9:21:25 GMT+0200').toISOString()} duration={3600/4*3} label="My event" />
//     </Day>
//     <Day>
//       <Event startTime={moment('Sat Apr 06 2019 9:21:25 GMT+0200').toISOString()} duration={3600/4*3} label="My event" />
//     </Day>
//   </Calendar>
// )
