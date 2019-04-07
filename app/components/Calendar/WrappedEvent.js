import React from 'react';
import moment from 'moment';
import { DragSource } from 'react-dnd';

import Event from '../Event';

import { eventType, eventDefaultProps } from '../../types/event';

import styles from './styles.css';

const minutesInADay = 1440;

const Types = {
  EVENT: 'event',
};

const eventSource = {
  beginDrag: props => props,
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const WrappedEvent = ({
  label, startTime, duration, connectDragSource, isDragging,
}) => {
  const startOfDay = moment(startTime).startOf('day');
  const startTimeMinutesPastMidnight = moment(startTime).diff(startOfDay, 'minutes');
  const endTimeMinutesPastMidnight = moment(startTime).add(duration, 'seconds').diff(startOfDay, 'minutes');

  const percentageThroughDayStart = startTimeMinutesPastMidnight / minutesInADay * 100;
  const percentageThroughDayEnd = endTimeMinutesPastMidnight / minutesInADay * 100;

  return connectDragSource(
    <div
      style={{
        top: `${percentageThroughDayStart}%`,
        bottom: `${100 - percentageThroughDayEnd}%`,
      }}
      className={styles['event-wrapper']}
    >
      <Event label={label} className={styles.event} />
    </div>,
  );
};

WrappedEvent.propTypes = {
  ...eventType,
};

WrappedEvent.defaultProps = {
  ...eventDefaultProps,
};

export default DragSource(Types.EVENT, eventSource, collect)(WrappedEvent);
