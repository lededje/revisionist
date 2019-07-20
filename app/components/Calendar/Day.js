import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import flowRight from 'lodash/flowRight';

import { resizeEvent, dragEvent } from '../CustomDragLayer';

import DragTypes from '../../consts/DragTypes';
import { updateEvent } from '../../actions/events';

import withCalendarCalculator from '../withCalendarCalculator';

import styles from './styles.css';

const dayTarget = {
  drop: (props, monitor, component) => {
    const node = component.getNode();
    if (!node) return;

    const type = monitor.getItemType();

    const updatedEvent = (() => {
      switch (type) {
        case DragTypes.EVENT: {
          return dragEvent({
            item: monitor.getItem(),
            getPositionTime: props.getPositionTime,
            currentOffset: monitor.getSourceClientOffset(),
          });
        }
        case DragTypes.EVENT_HANDLE: {
          return resizeEvent({
            item: monitor.getItem(),
            getPositionTime: props.getPositionTime,
            currentOffset: monitor.getSourceClientOffset(),
          });
        }
        default: {
          return {
            ...monitor.getItem(),
          };
        }
      }
    })();

    props.actions.updateEvent(updatedEvent);
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

const enhance = flowRight(
  withCalendarCalculator,
  connect(
    undefined,
    dispatch => ({
      actions: bindActionCreators({ updateEvent }, dispatch),
    }),
  ),
  DropTarget([DragTypes.EVENT, DragTypes.EVENT_HANDLE], dayTarget, collect),
);

export default enhance(Day);
