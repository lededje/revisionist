import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { todosType, todosDefaultProps } from '../../types/todo';
import WrappedTodo from './WrappedTodo';


import styles from './styles.css';

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

const TodoList = ({ todos, createEvent }) => {
  const [value, setValue] = useState('');

  return (
    <div className={styles['todo-list']}>
      <h1>Todos</h1>
      { todos.map(event => (
        <WrappedTodo key={event.id} id={event.id} className={styles.event} label={event.label} duration={event.duration} />
      ))}
      <form onSubmit={e => onSubmit(e, createEvent, setValue)}>
        <input type="text" name="label" value={value} onChange={e => onChange(e, setValue)} />
      </form>
    </div>
  );
};

TodoList.propTypes = {
  ...todosType,
  createEvent: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  ...todosDefaultProps,
};

export default TodoList;
