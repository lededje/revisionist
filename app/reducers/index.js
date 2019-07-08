import { combineReducers } from 'redux';

import events from './eventsReducer';
import calendar from './calendarReducer';
import request from './requestReducer';
import user from './userReducer';

export default combineReducers({
  events,
  calendar,
  request,
  user,
});
