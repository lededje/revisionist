import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import DragTypes from '../../consts/DragTypes';
import { updateEvent } from '../../actions/events';

import styles from './styles.css';

const minutesInADay = 1440;

const dayTarget = {
  drop: (props, monitor, component) => {
    const node = component.getNode();

    if (!node) {
      return;
    }

    const mouseOffset = monitor.getClientOffset();
    const originalMouseOffset = monitor.getSourceClientOffset();
    const dayBoundingRectangle = node.getBoundingClientRect();

    const mouseY = mouseOffset.y;
    const dayHeight = dayBoundingRectangle.height;
    const dayTop = dayBoundingRectangle.top;
    const mouseOffsetWithinDay = mouseY - originalMouseOffset.y;

    const minutesPastMidnight = ((mouseY - dayTop - mouseOffsetWithinDay) / dayHeight) * minutesInADay;

    const computedNewTime = moment(props.date)
      .startOf('day')
      .add(minutesPastMidnight, 'minutes');

    props.actions.updateEvent({
      ...monitor.getItem(),
      startTime: computedNewTime.toISOString(),
    });
  },
};

const collect = (collect, monitor) => ({
  connectDropTarget: collect.dropTarget(),
  isOver: monitor.isOver(),
});

const Day = React.forwardRef(({ children, connectDropTarget }, ref) => {
  const elementRef = useRef(null);
  connectDropTarget(elementRef);

  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current,
  }));

  return (
    <div ref={elementRef} className={styles.day}>
      {children}
    </div>
  );
});

Day.propTypes = {
  children: PropTypes.node.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  dispatch => ({
    actions: bindActionCreators({ updateEvent }, dispatch),
  }),
)(DropTarget(DragTypes.EVENT, dayTarget, collect)(Day));
