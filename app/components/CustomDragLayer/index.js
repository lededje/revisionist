import React from 'react';
import { DragLayer } from 'react-dnd';
import { connect } from 'react-redux';
import flowRight from 'lodash/flowRight';
import moment from 'moment';

import { snapTime, snapDuration } from '../../utils/snap';
import { clampPeriod } from '../../utils/clamp';

import withCalendarCalculator from '../withCalendarCalculator';

import Event from '../Event';
import styles from './styles.css';
import DragTypes from '../../consts/DragTypes';

export const dragEvent = ({ item, getPositionTime, currentOffset }) => ({
  ...item,
  startTime: snapTime(getPositionTime(currentOffset), 5).toISOString(),
});

export const resizeEvent = ({ item, getPositionTime, currentOffset }) => {
  if (item.resizeDirection === 'up') {
    const snappedTime = snapTime(getPositionTime(currentOffset), 5).toISOString();
    const clampedTime = clampPeriod(snappedTime, 'day');
    return {
      ...item,
      startTime: clampedTime,
      duration: moment
        .duration(
          moment(item.startTime)
            .add(item.duration, 'seconds')
            .diff(clampedTime),
        )
        .as('seconds'),
    };
  }

  return {
    ...item,
    duration: snapDuration(
      moment.duration(getPositionTime(currentOffset).diff(moment(item.startTime))),
      5,
    ).as('seconds'),
  };
};

const CustomDragLayer = ({
  item,
  itemType,
  clientOffset,
  currentOffset,

  calendarRect,
  calendarDateTime,

  getPositionTime,
  getPositionPercentage,
  getTimePosition,
  isPositionOverCalendar,
  getDurationHeight,
}) => {
  if (!item || !currentOffset || !calendarRect) return null;

  const eventPropsBasedOnMouse = (() => {
    switch (itemType) {
      case DragTypes.EVENT_HANDLE: {
        return resizeEvent({ item, getPositionTime, currentOffset });
      }
      case DragTypes.EVENT: {
        return dragEvent({ item, getPositionTime, currentOffset });
      }
      default: {
        return null;
      }
    }
  })();
  const style = { width: calendarRect.width / 7 - 20 };

  const isOverCalendar = isPositionOverCalendar(clientOffset);

  if (isOverCalendar) {
    const newPosition = getTimePosition(eventPropsBasedOnMouse.startTime);
    style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`;
    style.height = getDurationHeight(
      moment.duration().add(eventPropsBasedOnMouse.duration, 'seconds'),
    );
  } else {
    style.transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
    style.height = getDurationHeight(moment.duration().add(item.duration, 'seconds'));
  }

  return (
    <div className={styles.layer}>
      <Event
        {...(isOverCalendar ? eventPropsBasedOnMouse : item)}
        style={style}
        className={styles['custom-event']}
      />
    </div>
  );
};

const enhance = flowRight(
  connect(state => ({
    calendarRect: state.calendar.rect,
    calendarDateTime: state.calendar.focusDateTime,
  })),
  DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
  })),
  withCalendarCalculator,
);

export default enhance(CustomDragLayer);
