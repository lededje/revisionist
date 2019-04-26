import { combineReducers } from 'redux';

import events from './eventsReducer';
import calendar from './calendarReducer';

export default combineReducers({
  events,
  calendar,
});
