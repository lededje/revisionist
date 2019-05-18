import React from 'react';
import moment from 'moment';

import Scale from './Scale';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import Header from './Header';
import WrappedEvent from '../WrappedEvent';
import Day from './Day';
import CustomCalendarDragLayer from '../CustomCalendarDragLayer';

import { eventsType, eventsDefaultProps } from '../../types/event';

import styles from './styles.css';

const Calendar = ({ events, focusDateTime }) => {
  const startDate = moment(focusDateTime).startOf('week');
  const amountOfDays = 7;

  return (
    <div className={styles.calendar}>
      <Header startDate={startDate.toISOString()} amountOfDays={amountOfDays} />
      <section className={styles.body}>
        <Scale />
        <div className={styles['day-container']}>
          <CustomCalendarDragLayer />
          {new Array(amountOfDays).fill('').map((_, i) => {
            const today = moment(startDate).add(i, 'days');
            const isToday = today.isSame(moment(), 'day');
            return (
              <Day key={today.format()} date={today.toISOString()}>
                {isToday && <CurrentTimeIndicator time={moment().toISOString()} />}
                {events
                  .filter(event => moment(event.startTime).isSame(moment(startDate).add(i, 'days'), 'day'))
                  .map(event => (
                    <WrappedEvent
                      key={event.id}
                      id={event.id}
                      label={event.label}
                      startTime={event.startTime}
                      duration={event.duration}
                    />
                  ))}
              </Day>
            );
          })}
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
