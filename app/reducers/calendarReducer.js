const initialState = {
  dateTime: null,
  focusDateTime: null,
  focusType: 'WEEK',
  height: 0,
  dayWidth: 0,
};

const calendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_DAY_WIDTH': {
      return {
        ...state,
        dayWidth: action.dayWidth,
      }
    }
    case 'SET_HEIGHT': {
      return {
        ...state,
        height: action.height,
      }
    }
    case 'SET_FOCUS': {
      return {
        ...state,
        focusDateTime: action.focusDateTime || state.focusDateTime,
        focusType: action.focusType || state.focusType,
      };
    }
    default: return state;
  }
};

export default calendarReducer;
