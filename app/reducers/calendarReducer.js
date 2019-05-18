const initialState = {
  dateTime: null,
  focusDateTime: null,
  focusType: 'WEEK',
  rect: null,
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
    case 'SET_RECT': {
      return {
        ...state,
        rect: action.rect || state.rect,
      };
    }
    default:
      return state;
  }
};

export default calendarReducer;
