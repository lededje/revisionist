import React from 'react';
import PropTypes from 'prop-types';
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
    };

  return (
    <div className={styles['day-container']}>
      <div className={styles.day} style={style}>
        <span className={styles.label}>{ label }</span>
      </div>
    </div>
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


const HeatCalendar = ({ focusDateTime, events }) => {
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
        {new Array(firstOfTheMonthDayIndex).fill('').map((_, index) => <Day key={firstOfTheMonthDayIndex - index} label="" blank />)}
        {new Array(numberOfDaysInMonth).fill('').map((_, index) => {
          const dayKey = moment(focusDateTime).startOf('month').add(index, 'days').startOf('day')
            .toISOString();
          const minutesBusy = eventCount[dayKey] || 0;
          const percentageBusy = minutesBusy / secondsInADay;
          /* eslint-disable-next-line react/no-array-index-key */
          return <Day key={index} label={String(index + 1)} percentage={percentageBusy} />;
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
};

HeatCalendar.defaultProps = {
  events: [],
};

export default HeatCalendar;
