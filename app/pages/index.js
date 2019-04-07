import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Calendar from '../components/Calendar';
import HeatCalendar from '../components/HeatCalendar';
import withRedux from '../components/withRedux';

import styles from './styles.css';

const index = ({ events }) => (
  <div className={styles.container}>
    <aside>
      <HeatCalendar date={moment().add(1, 'month')} />
    </aside>
    <main className={styles.main}>
      <Calendar events={events} />
    </main>
  </div>
);

const connectedIndex = connect(state => ({
  events: state.events.events,
}))(index);

export default withRedux(connectedIndex);
