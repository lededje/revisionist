import React from 'react';
import { DragSource } from 'react-dnd';

import { todoType, todoDefaultProps } from '../../types/todo';

import Event from '../Event';
import DragTypes from '../../consts/DragTypes';

const eventSource = {
  beginDrag: props => props,
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const WrappedTodo = ({
  id,
  label,
  className,
  connectDragSource,
  isDragging,
}) => connectDragSource(<div><Event className={className} id={id} label={label} /></div>);

WrappedTodo.propTypes = {
  ...todoType,
};

WrappedTodo.defaultProps = {
  ...todoDefaultProps,
};

export default DragSource(DragTypes.EVENT, eventSource, collect)(WrappedTodo);
