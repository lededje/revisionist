import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';

import Calendar from '../components/Calendar';
import HeatCalendar from '../components/HeatCalendar';
import ToDoList from '../components/ToDoList';
import withRedux from '../components/withRedux';

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
      <ToDoList events={todos} createEvent={actions.createEvent} />
    </aside>
  </div>
);

const connectedIndex = connect(
  (state) => {
    const {events, todos} = state.events.events.reduce((acc, event) => {
      const type = isUndefined(event.startTime) === false ? 'events' : 'todos';

      return {
        ...acc,
        [type]: [
          ...acc[type],
          event,
        ]
      }
    }, {events: [], todos: []})

    return {
      events,
      todos,
    };
  },
  (dispatch) => ({
    actions: bindActionCreators({ createEvent }, dispatch),
  })
)(index);

export default withRedux(connectedIndex);
