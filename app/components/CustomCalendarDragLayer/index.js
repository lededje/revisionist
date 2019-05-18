import React, { useRef } from 'react';
import { DragLayer } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import clamp from 'lodash/clamp';
import moment from 'moment';
import classNames from 'classnames';

import { setHeight, setDayWidth, setFocus } from '../../actions/calendar';

import snapToGrid from '../../utils/snapToGrid';

import Event from '../Event';
import useRect from '../useRect';

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
  connect(
    state => ({
      calendarHeight: state.calendar.height,
      dayWidth: state.calendar.dayWidth,
      isDraggingOver: state.calendar.isDraggingOver,
    }),
    dispatch => ({
      actions: bindActionCreators({ setHeight, setDayWidth, setFocus }, dispatch),
    }),
  ),
  DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  })),
);

const isOverDragLayer = ({
  height, width, top, left, clientOffset,
}) => clientOffset.x > left
  && clientOffset.x < left + width
  && clientOffset.y > top
  && clientOffset.y < top + height;

const CustomCalendarDragLayer = ({
  initialOffset,
  currentOffset,
  clientOffset,
  item,
  isDraggingOver,
  actions,
  calendarHeight,
  dayWidth,
}) => {
  if (!initialOffset || !currentOffset || !item) return null;

  const layerRef = useRef(null);
  const {
    height, width, top, left,
  } = useRect(layerRef);

  const isHovering = isOverDragLayer({
    height,
    width,
    top,
    left,
    clientOffset,
  });

  if (calendarHeight !== height) {
    actions.setHeight({ height });
  }

  const newDayWidth = width / 7;
  if (dayWidth !== newDayWidth) {
    actions.setDayWidth({ dayWidth: newDayWidth });
  }

  if (isDraggingOver !== isHovering && layerRef.current !== null) {
    actions.setFocus({ isDraggingOver: isHovering });
  }

  if (isHovering === false && layerRef.current !== null) {
    return null;
  }

  const eventHeight = (get(item, 'duration', defaultEventSize) / secondsInDay) * height;

  const [snappedX, snappedY] = snapToGrid(
    currentOffset.x - left,
    currentOffset.y - top,
    width / 7,
    height / fiveMinuteBlocksInADay,
  );

  const clampedX = clamp(snappedX, 0, (width / 7) * 6);
  const clampedY = clamp(snappedY, 0, height - eventHeight);

  const style = {
    transform: `translate(${clampedX}px, ${clampedY}px)`,
    height: eventHeight,
    width: dayWidth - 20,
  };

  return (
    <div className={styles.layer} ref={layerRef}>
      <Event
        {...item}
        className={classNames(item.className, styles['custom-event'])}
        style={style}
      />
    </div>
  );
};

export default enhance(CustomCalendarDragLayer);
