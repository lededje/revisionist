import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';
import flowRight from 'lodash/flowRight';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Header from '../components/Header';
import Calendar from '../components/Calendar';
import HeatCalendar from '../components/HeatCalendar';
import ToDoList from '../components/ToDoList';
import CustomDragLayer from '../components/CustomDragLayer';
import withRedux from '../components/withRedux';

import { eventsType, eventsDefaultProps } from '../types/event';
import { todosType, todosDefaultProps } from '../types/todo';
import { createEvent, updateEvent, getEvents } from '../actions/events';
import { fetchLoginStatus } from '../actions/user';
import { setFocus } from '../actions/calendar';

import styles from './styles.css';

const index = ({
  events, todos, actions, focusDateTime,
}) => {
  useEffect(() => {
    actions.setFocus({
      dateTime: moment()
        .startOf('week')
        .toISOString(),
    });
  }, [actions.setFocus]);

  if (!focusDateTime) return <div />;

  return (
    <div className={styles.container}>
      <CustomDragLayer />
      <Header />
      <main className={styles.main}>
        <aside>
          <HeatCalendar events={events} focusDateTime={focusDateTime} setFocus={actions.setFocus} />
        </aside>
        <div className={styles['calendar-wrapper']}>
          <Calendar events={events} focusDateTime={focusDateTime} />
        </div>
        <aside>
          <ToDoList todos={todos} createEvent={actions.createEvent} />
        </aside>
      </main>
    </div>
  );
};

index.getInitialProps = async ({ store }) => {
  await store.dispatch(fetchLoginStatus());
  await store.dispatch(getEvents());

  return {};
};

index.propTypes = {
  ...eventsType,
  ...todosType,
  focusDateTime: PropTypes.string,
};

index.defaultProps = {
  ...eventsDefaultProps,
  ...todosDefaultProps,
  focusDatetime: null,
};

const connectedIndex = connect(
  (state) => {
    const { events, todos } = state.events.events.reduce(
      (acc, event) => {
        const type = isUndefined(event.startTime) || event.startTime === null ? 'todos' : 'events';

        return {
          ...acc,
          [type]: [...acc[type], event],
        };
      },
      { events: [], todos: [] },
    );

    return {
      events,
      todos,
      focusDateTime: state.calendar.focusDateTime,
    };
  },
  dispatch => ({
    actions: bindActionCreators({ createEvent, updateEvent, setFocus }, dispatch),
  }),
)(index);

const enhance = flowRight(
  DragDropContext(HTML5Backend),
  withRedux,
);

export default enhance(connectedIndex);
