const initialState = {
  dateTime: null,
  focusDateTime: null,
  focusType: 'WEEK',
};

const calendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
