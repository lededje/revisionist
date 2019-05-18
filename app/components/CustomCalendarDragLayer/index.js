import React, { useRef } from 'react';
import { DragLayer } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flowRight from 'lodash/flowRight';
import get from 'lodash/get';
import moment from 'moment';
import classNames from 'classnames';

import { setHeight, setDayWidth } from '../../actions/calendar';

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
    }),
    dispatch => ({
      actions: bindActionCreators({ setHeight, setDayWidth }, dispatch),
    }),
  ),
  DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  })),
);

const CustomCalendarDragLayer = ({
  initialOffset,
  currentOffset,
  item,
  actions,
  calendarHeight,
  dayWidth,
}) => {
  if (!initialOffset || !currentOffset || !item) return <div className={styles.layer} />;

  const layerRef = useRef(null);
  const {
    height, width, top, left,
  } = useRect(layerRef);

  if (calendarHeight !== height) {
    actions.setHeight({ height });
  }

  const newDayWidth = width / 7;
  if (dayWidth !== newDayWidth) {
    actions.setDayWidth({ dayWidth: newDayWidth });
  }

  const [snappedX, snappedY] = snapToGrid(
    currentOffset.x - left,
    currentOffset.y - top,
    width / 7,
    height / fiveMinuteBlocksInADay,
  );

  const style = {
    transform: `translate(${snappedX}px, ${snappedY}px)`,
    height: (get(item, 'duration', defaultEventSize) / secondsInDay) * height,
    width: dayWidth - 20,
  };

  return (
    <div className={styles.layer} ref={layerRef}>
      <Event
        {...item}
        label={`${item.label} calendar drag layer`}
        className={classNames(item.className, styles['custom-event'])}
        style={style}
      />
    </div>
  );
};

export default enhance(CustomCalendarDragLayer);
