import React from 'react';
import moment from 'moment';

import Calendar from '../components/Calendar';
import HeatCalendar from '../components/HeatCalendar';

export default () => (
  <>
    <HeatCalendar date={moment()} />
    <Calendar />
  </>
);
