import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import chroma from 'chroma-js';

import styles from './styles.css';

const secondsInADay = 1440 * 8;

const scale = chroma.scale(['a7c0cd', '4b636e']);

const Day = ({
  label, percentage, blank, onClick, today,
}) => {
  const style = blank === true
    ? {}
    : {
      background: scale(percentage).hex(),
      color: percentage > 0.5 ? '#fff' : '#000',
    };

  const todayStyles = {
    border: '1px solid red',
  };

  const classes = classNames({
    [styles['day-container']]: true,
    [styles.pointer]: typeof onClick === 'function',
  });

  return (
    <a className={classes} onClick={onClick} style={style}>
      <div className={styles.day} style={today ? todayStyles : {}}>
        <span className={styles.label}>{ label }</span>
      </div>
    </a>
  );
};

Day.propTypes = {
  label: PropTypes.string,
  percentage: PropTypes.number,
  blank: PropTypes.bool,
};

Day.defaultProps = {
  label: '',
  percentage: 0,
  blank: false,
};

const setCalendarFocus = (setFocus, dateTime) => (e) => {
  e.preventDefault();

  setFocus({
    dateTime,
  });
};

const HeatCalendar = ({ focusDateTime, events, setFocus }) => {
  const eventCount = events.reduce((acc, event) => {
    const eventDate = moment(event.startTime).startOf('day').toISOString();
    return {
      ...acc,
      [eventDate]: acc[eventDate] ? acc[eventDate] + event.duration : event.duration,
    };
  }, {});

  const firstOfTheMonthDayIndex = moment(focusDateTime).startOf('month').day();
  const lastOfTheMonthDayIndex = moment(focusDateTime).endOf('month').day();
  const numberOfDaysInMonth = moment(focusDateTime).daysInMonth();

  return (
    <div>
      <h1>{moment(focusDateTime).format('MMMM YYYY')}</h1>
      <div className={styles['heat-calendar']}>
      { /* eslint-disable-next-line react/no-array-index-key */ }
        {new Array(7).fill('').map((_, index) => <Day key={moment().startOf('week').add(index, 'days').format('dd')} label={moment().startOf('week').add(index, 'days').format('dd').slice(0, 1)} blank />)}
        { /* eslint-disable-next-line react/no-array-index-key */ }
        {new Array(firstOfTheMonthDayIndex).fill('').map((_, index) => <Day key={firstOfTheMonthDayIndex - index} label="" blank />)}
        {new Array(numberOfDaysInMonth).fill('').map((_, index) => {
          const dayKey = moment(focusDateTime).startOf('month').add(index, 'days').startOf('day')
            .toISOString();
          const minutesBusy = eventCount[dayKey] || 0;
          const percentageBusy = minutesBusy / secondsInADay;
          /* eslint-disable-next-line react/no-array-index-key */
          return <Day onClick={setCalendarFocus(setFocus, dayKey)} key={index} label={String(index + 1)} percentage={percentageBusy} today={moment(dayKey).isSame(moment(), 'day')} />;
        })}
        { /* eslint-disable-next-line react/no-array-index-key */ }
        {new Array(6 - lastOfTheMonthDayIndex).fill('').map((_, index) => <Day key={lastOfTheMonthDayIndex + index} label="" blank />)}
      </div>
    </div>
  );
};

HeatCalendar.propTypes = {
  focusDateTime: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    startTime: PropTypes.string,
    duration: PropTypes.number,
  })),
  setFocus: PropTypes.func.isRequired,
};

HeatCalendar.defaultProps = {
  events: [],
};

export default HeatCalendar;
