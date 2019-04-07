import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Calendar from '../components/Calendar';
import HeatCalendar from '../components/HeatCalendar';
import ToDoList from '../components/ToDoList';
import withRedux from '../components/withRedux';

import { eventsType, eventsDefaultProps } from '../types/event';
import { todosType, todosDefaultProps } from '../types/todo';

import { createEvent } from '../actions/events';

import styles from './styles.css';

const index = ({ events, todos, actions }) => (
  <div className={styles.container}>
    <aside>
      <HeatCalendar events={events} date={moment()} />
    </aside>
    <main className={styles.main}>
      <Calendar events={events} />
    </main>
    <aside>
      <ToDoList todos={todos} createEvent={actions.createEvent} />
    </aside>
  </div>
);

index.propTypes = {
  ...eventsType,
  ...todosType,
};

index.defaultProps = {
  ...eventsDefaultProps,
  ...todosDefaultProps,
};

const connectedIndex = connect(
  (state) => {
    const { events, todos } = state.events.events.reduce((acc, event) => {
      const type = isUndefined(event.startTime) === false ? 'events' : 'todos';

      return {
        ...acc,
        [type]: [
          ...acc[type],
          event,
        ],
      };
    }, { events: [], todos: [] });

    return {
      events,
      todos,
    };
  },
  dispatch => ({
    actions: bindActionCreators({ createEvent }, dispatch),
  }),
)(index);

export default DragDropContext(HTML5Backend)(withRedux(connectedIndex));
