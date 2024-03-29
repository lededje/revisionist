import React, { useEffect } from 'react';
import moment from 'moment';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import WrappedHandle from './WrappedHandle';

import Event from '../Event';

import DragTypes from '../../consts/DragTypes';

import { eventType, eventDefaultProps } from '../../types/event';

import { timeToPercentage } from '../../utils/percentageDay';

import styles from './styles.css';

const eventSource = {
  beginDrag: props => props,
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

const WrappedEvent = ({
  id,
  label,
  startTime,
  duration,
  connectDragSource,
  connectDragPreview,
  isDragging,
  resize,
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
    const endTime = moment(startTime).add(duration, 'seconds');

    const percentageThroughDayStart = timeToPercentage(startTime) * 100;
    const percentageThroughDayEnd = timeToPercentage(endTime) * 100;

    wrapperProps.style = {
      top: `${percentageThroughDayStart}%`,
      bottom: `${100 - percentageThroughDayEnd}%`,
    };
    wrapperProps.className = styles['event-wrapper'];
  } else {
    wrapperProps.className = styles['todo-wrapper'];
  }

  const classes = {
    [styles.event]: true,
    [styles.dragging]: isDragging,
  };

  const eventProps = {
    id,
    label,
    startTime,
    duration,
  };

  return connectDragSource(
    <div {...wrapperProps}>
      {resize && <WrappedHandle resizeDirection="up" {...eventProps} />}
      <Event className={classes} {...eventProps} />
      {resize && <WrappedHandle resizeDirection="down" {...eventProps} />}
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
