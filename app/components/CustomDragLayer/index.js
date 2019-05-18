import React from 'react';
import { DragLayer } from 'react-dnd';
import { connect } from 'react-redux';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import clamp from 'lodash/clamp';
import moment from 'moment';
import classNames from 'classnames';
import snapToGrid from '../../utils/snapToGrid';

import Event from '../Event';
import styles from './styles.css';

const secondsInDay = moment
  .duration()
  .add(1, 'day')
  .as('seconds');
const fiveMinuteBlocksInADay = moment
  .duration()
  .add(1, 'day')
  .as('minutes') / 5;
const defaultEventSize = moment
  .duration()
  .add(30, 'minutes')
  .as('seconds');

const enhance = flowRight(
  connect(state => ({
    calendarRect: state.calendar.rect,
  })),
  DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  })),
);

const isOverRect = ({ rect, cords }) => cords.x > rect.left
  && cords.x < rect.left + rect.width
  && cords.y > rect.top
  && cords.y < rect.top + rect.height;

const CustomDragLayer = ({
  initialOffset, currentOffset, clientOffset, item, calendarRect,
}) => {
  if (!initialOffset || !currentOffset || !item || !calendarRect) return null;

  const eventHeight = (get(item, 'duration', defaultEventSize) / secondsInDay) * calendarRect.height;

  let eventX = currentOffset.x;
  let eventY = currentOffset.y;

  if (isOverRect({ rect: calendarRect, cords: currentOffset })) {
    const [snappedX, snappedY] = snapToGrid(
      eventX - calendarRect.left,
      eventY - calendarRect.top,
      calendarRect.width / 7,
      calendarRect.height / fiveMinuteBlocksInADay,
    );

    const repositionedX = snappedX + calendarRect.left;
    const repositionedY = snappedY + calendarRect.top;

    const clampedX = clamp(repositionedX, 0, calendarRect.width + calendarRect.left);
    const clampedY = clamp(repositionedY, 0, calendarRect.height + calendarRect.top - eventHeight);

    eventX = clampedX;
    eventY = clampedY;
  }

  const style = {
    transform: `translate(${eventX}px, ${eventY}px)`,
    height: eventHeight,
    width: calendarRect.width / 7 - 20,
  };

  return (
    <div className={styles.layer}>
      <Event
        {...item}
        className={classNames(item.className, styles['custom-event'])}
        style={style}
      />
    </div>
  );
};

export default enhance(CustomDragLayer);
