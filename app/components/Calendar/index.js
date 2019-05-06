import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import useRect from '../useRect';

import Scale from './Scale';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import Header from './Header';
import WrappedEvent from '../WrappedEvent';
import Day from './Day';

import { setHeight, setDayWidth } from '../../actions/calendar';

import { eventsType, eventsDefaultProps } from '../../types/event';

import styles from './styles.css';

const Calendar = ({ events, focusDateTime, actions, calendarHeight, dayWidth }) => {
  const startDate = moment(focusDateTime).startOf('week');
  const amountOfDays = 7;

  const calendarRef = useRef(null);
  const firstDayRef = useRef(null);
  const { height, width } = useRect(calendarRef);

  if(calendarHeight !== height) {
    actions.setHeight({ height });
  }

  const newDayWidth = width / 7;
  if(dayWidth !== newDayWidth) {
    actions.setDayWidth({ dayWidth: newDayWidth });
  }

  return (
    <div className={styles.calendar} ref={calendarRef}>
      <Header startDate={startDate.toISOString()} amountOfDays={amountOfDays} />
      <section className={styles.body}>
        <Scale />
        <div className={styles['day-container']}>
          {
            new Array(amountOfDays).fill('').map((_, i) => {
              const today = moment(startDate).add(i, 'days');
              const isToday = today.isSame(moment(), 'day');
              return (
                <Day key={today.format()} date={today.toISOString()}>
                  {isToday && <CurrentTimeIndicator time={moment().toISOString()} />}
                  {events.filter(event => moment(event.startTime).isSame(moment(startDate).add(i, 'days'), 'day')).map(event => (
                    <WrappedEvent key={event.id} id={event.id} label={event.label} startTime={event.startTime} duration={event.duration} />
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

export default connect(
  (state) => ({
    calendarHeight: state.calendar.height,
    dayWidth: state.calendar.dayWidth,
  }),
  (dispatch) => ({
    actions: bindActionCreators({ setHeight, setDayWidth }, dispatch),
  }),
)(Calendar);
