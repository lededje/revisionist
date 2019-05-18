import React, { useEffect } from 'react';
import moment from 'moment';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Event from '../Event';

import DragTypes from '../../consts/DragTypes';

import { eventType, eventDefaultProps } from '../../types/event';

import styles from './styles.css';

const minutesInADay = 1440;

const eventSource = {
  beginDrag: props => props,
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

const WrappedEvent = ({
  label, startTime, duration, connectDragSource, connectDragPreview,
}) => {
  useEffect(() => {
    connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }, [connectDragPreview]);

  const wrapperProps = {};
  if (startTime) {
    const startOfDay = moment(startTime).startOf('day');
    const startTimeMinutesPastMidnight = moment(startTime).diff(startOfDay, 'minutes');
    const endTimeMinutesPastMidnight = moment(startTime)
      .add(duration, 'seconds')
      .diff(startOfDay, 'minutes');

    const percentageThroughDayStart = (startTimeMinutesPastMidnight / minutesInADay) * 100;
    const percentageThroughDayEnd = (endTimeMinutesPastMidnight / minutesInADay) * 100;

    wrapperProps.style = {
      top: `${percentageThroughDayStart}%`,
      bottom: `${100 - percentageThroughDayEnd}%`,
    };
    wrapperProps.className = styles['event-wrapper'];
  } else {
    wrapperProps.className = styles['todo-wrapper'];
  }

  return connectDragSource(
    <div {...wrapperProps}>
      <Event label={label} className={styles.event} startTime={startTime} duration={duration} />
    </div>,
  );
};

WrappedEvent.propTypes = {
  ...eventType,
};

WrappedEvent.defaultProps = {
  ...eventDefaultProps,
};

export default DragSource(DragTypes.EVENT, eventSource, collect)(WrappedEvent);
