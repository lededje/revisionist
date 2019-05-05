import React, { useState, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DragTypes from '../../consts/DragTypes';
import { updateEvent } from '../../actions/events';

import { todosType, todosDefaultProps } from '../../types/todo';
import WrappedTodo from './WrappedTodo';

import styles from './styles.css';

const todoTarget = {
  drop: (props, monitor, component) => {
    const node = component.getNode();
    if(!node) {
      return;
    }
    props.actions.updateEvent({
      ...monitor.getItem(),
      startTime: undefined,
    });
  }
}

const collect = (collect, monitor) => ({
  connectDropTarget: collect.dropTarget(),
  isOver: monitor.isOver(),
});

const onSubmit = (e, createEvent, setValue) => {
  e.preventDefault();

  const formData = new window.FormData(e.currentTarget);

  if (formData.get('label') === '') return;

  createEvent({
    label: formData.get('label'),
  });

  setValue('');
};

const onChange = (e, setValue) => {
  e.preventDefault();
  setValue(e.target.value);
};

const TodoList = React.forwardRef(({ todos, createEvent, connectDropTarget }, ref) => {
  const [value, setValue] = useState('');

  const elementRef = useRef(null);
  connectDropTarget(elementRef);

  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current,
  }));

  return (
    <div ref={elementRef} className={styles['todo-list']}>
      <h1>Todos</h1>
      { todos.map(event => (
        <WrappedTodo key={event.id} id={event.id} className={styles.event} label={event.label} duration={event.duration} />
      ))}
      <form onSubmit={e => onSubmit(e, createEvent, setValue)}>
        <input type="text" name="label" value={value} onChange={e => onChange(e, setValue)} />
      </form>
    </div>
  );
});

TodoList.propTypes = {
  ...todosType,
  createEvent: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  ...todosDefaultProps,
};

export default connect(
  undefined,
  dispatch => ({
    actions: bindActionCreators({ updateEvent }, dispatch),
  })
)(DropTarget(DragTypes.EVENT, todoTarget, collect)(TodoList));
