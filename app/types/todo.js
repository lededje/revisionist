import pick from 'lodash/pick';
import PropTypes from 'prop-types';

import { eventType, eventDefaultProps } from './event';

const todoProps = ['id', 'label', 'duration'];

const todoType = pick(eventType, todoProps);
const todoDefaultProps = pick(eventDefaultProps, todoProps);

const todosType = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoType)),
};

const todosDefaultProps = {
  todos: [],
};

export {
  todoType,
  todoDefaultProps,
  todosType,
  todosDefaultProps,
};
