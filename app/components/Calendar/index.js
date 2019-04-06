import React from 'react';
import moment from 'moment';

import styles from './styles.css';

const minutesInADay = 1440;

const Calendar = ({ children }) => (
  <div className={styles.calendar}>
    <div className={styles.scale}>
      <div className={styles.step}><span className={styles.label}>12:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>1:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>2:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>3:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>4:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>5:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>6:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>7:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>8:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>9:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>10:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>11:00 AM</span></div>
      <div className={styles.step}><span className={styles.label}>12:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>1:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>2:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>3:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>4:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>5:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>6:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>7:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>8:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>9:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>10:00 PM</span></div>
      <div className={styles.step}><span className={styles.label}>11:00 PM</span></div>
    </div>
    <div className={styles['day-container']}>
      { children }
    </div>
  </div>
);

const CurrentTimeIndicator = ({ time }) => {
  const minutesPastMidnight = moment(time).diff(moment(time).startOf('day'), 'minutes');

  return (
    <div style={{
      top: `${minutesPastMidnight / minutesInADay * 100}%`
    }} className={styles['current-time-indicator']} />
  )
}

const Day = ({ children }) => (
  <div className={styles.day}>
    { children }
  </div>
);

const Appointment = ({ name, startTime, duration }) => {
  const startOfDay = moment(startTime).startOf('day');
  const startTimeMinutesPastMidnight = moment(startTime).diff(startOfDay, 'minutes');
  const endTimeMinutesPastMidnight = moment(startTime).add(duration, 'seconds').diff(startOfDay, 'minutes');

  const percentageThroughDayStart = startTimeMinutesPastMidnight / minutesInADay * 100;
  const percentageThroughDayEnd = endTimeMinutesPastMidnight / minutesInADay * 100;

  return (
    <div style={{
      top: `${ percentageThroughDayStart }%`,
      bottom: `${ 100 - percentageThroughDayEnd }%`
    }} className={styles.appointment}>
    { name }
    </div>
  );
}

export default () => (
  <Calendar>
    <Day>
      <CurrentTimeIndicator time={moment().toISOString()} />
      <Appointment startTime={moment('Sat Apr 06 2019 3:21:25 GMT+0200').toISOString()} duration={3600*4} name="My event" />
    </Day>
    <Day>
      <Appointment startTime={moment('Sat Apr 06 2019 9:21:25 GMT+0200').toISOString()} duration={3600/4*3} name="My event" />
    </Day>
    <Day>
      <Appointment startTime={moment('Sat Apr 06 2019 9:21:25 GMT+0200').toISOString()} duration={3600/4*3} name="My event" />
    </Day>
  </Calendar>
)
