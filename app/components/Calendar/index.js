import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Scale from './Scale';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import Header from './Header';
import WrappedEvent from './WrappedEvent';

import { eventsType, eventsDefaultProps } from '../../types/event';

import styles from './styles.css';


const Day = ({ children }) => (
  <div className={styles.day}>
    { children }
  </div>
);

Day.propTypes = {
  children: PropTypes.node.isRequired,
};

const Calendar = ({ events }) => {
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
              const today = moment(startDate).add(i, 'days');
              const isToday = today.isSame(moment(), 'day');
              return (
                <Day key={today.format()}>
                  {isToday && <CurrentTimeIndicator time={moment().toISOString()} />}
                  {events.filter(event => moment(event.startTime).isSame(moment(startDate).add(i, 'days'), 'day')).map(event => (
                    <WrappedEvent key={`${event.label}-${event.label}-${event.duration}`} label={event.label} startTime={event.startTime} duration={event.duration} />
                  ))}
                </Day>
              );
            })
          }
        </div>
      </section>
    </div>
  );
};

Calendar.propTypes = {
  ...eventsType,
};

Calendar.defaultProps = {
  ...eventsDefaultProps,
};

export default Calendar;
