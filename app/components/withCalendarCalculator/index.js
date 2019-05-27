import React from 'react';
import { connect } from 'react-redux';
import flowRight from 'lodash/flowRight';
import clamp from 'lodash/clamp';
import moment from 'moment';

const minutesInDay = moment
  .duration()
  .add(1, 'day')
  .as('minutes');

const isOverRect = (rect, position) => {
  if (!position) return false;
  return (
    position.x > rect.left
    && position.x < rect.left + rect.width
    && position.y > rect.top
    && position.y < rect.top + rect.height
  );
};

// Return true if the cursor is over the calendar rect, false if not
const isPositionOverCalendar = (calendarRect, position) => {
  if (!position) return false;
  return isOverRect(calendarRect, position);
};

// Returns a position that replaces pixels with percentage through day and week
const getPositionPercentage = (calendarRect, position) => {
  if (!position) return 0;

  const clampedX = clamp(position.x - calendarRect.left, 0, calendarRect.width);
  const clampedY = clamp(position.y - calendarRect.top, 0, calendarRect.height);

  return {
    x: clampedX / calendarRect.width,
    y: clampedY / calendarRect.height,
  };
};

// return a pixel set of chords based on the time being passed. null if out of bounds
const getTimePosition = (calendarRect, time, calendarDateTime, timePeriod) => {
  if (!time) return 0;

  // How many days and minutes past the start of the current calendar view is the time
  const daysPastCalendar = moment.duration(moment(time).diff(moment(calendarDateTime)));
  const minutesPastCalendar = moment.duration(moment(time).diff(moment(time).startOf('day')));

  const positionThroughCalendarX = daysPastCalendar.get('days') * (calendarRect.width / timePeriod);
  const positionThroughCalendarY = minutesPastCalendar.as('minutes') * (calendarRect.height / minutesInDay);

  return {
    x: positionThroughCalendarX + calendarRect.left,
    y: positionThroughCalendarY + calendarRect.top,
  };
};

const getDurationHeight = (calendarRect, duration) => {
  if (!duration) return 0;

  return (duration.as('minutes') / minutesInDay) * calendarRect.height;
};

// Get the date of a set of positions. If it's not over the calendar return null
const getPositionTime = (calendarRect, position, calendarDateTime, timePeriod) => {
  if (!position) return null;

  const positionPercentage = getPositionPercentage(calendarRect, position);

  const minutesThroughDay = minutesInDay * positionPercentage.y;
  const daysThroughTimePeriod = Math.round(timePeriod * positionPercentage.x);

  return moment(calendarDateTime)
    .add(daysThroughTimePeriod, 'days')
    .add(minutesThroughDay, 'minutes');
};

const withCalendarCalculator = Component => ({
  _calendarRect: calendarRect,
  _calendarDateTime: calendarDateTime,
  ...props
}) => {
  const timePeriod = 7;

  return (
    <Component
      {...props}
      getPositionTime={position => getPositionTime(calendarRect, position, calendarDateTime, timePeriod)
      }
      getDurationHeight={duration => getDurationHeight(calendarRect, duration)}
      getTimePosition={time => getTimePosition(calendarRect, time, calendarDateTime, timePeriod)}
      getPositionPercentage={position => getPositionPercentage(calendarRect, position)}
      isPositionOverCalendar={position => isPositionOverCalendar(calendarRect, position)}
    />
  );
};

const enhance = flowRight(
  connect(state => ({
    _calendarRect: state.calendar.rect,
    _calendarDateTime: state.calendar.focusDateTime,
  })),
  withCalendarCalculator,
);

export default enhance;
