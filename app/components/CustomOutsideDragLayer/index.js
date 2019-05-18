import React from 'react';
import { DragLayer } from 'react-dnd';
import { connect } from 'react-redux';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import moment from 'moment';
import classNames from 'classnames';

import Event from '../Event';
import styles from './styles.css';

const secondsInDay = moment
  .duration()
  .add(1, 'day')
  .as('seconds');
const defaultEventSize = moment
  .duration()
  .add(30, 'minutes')
  .as('seconds');

const enhance = flowRight(
  connect(state => ({
    calendarHeight: state.calendar.height,
    dayWidth: state.calendar.dayWidth,
  })),
  DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  })),
);

const CustomOutsideDragLayer = ({
  initialOffset,
  currentOffset,
  item,
  calendarHeight,
  dayWidth,
}) => {
  if (!initialOffset || !currentOffset || !item) return null;

  const style = {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    height: (get(item, 'duration', defaultEventSize) / secondsInDay) * calendarHeight,
    width: dayWidth - 20,
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

export default enhance(CustomOutsideDragLayer);
