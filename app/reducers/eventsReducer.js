const initialState = {
  events: [],
};

const defaultEventLength = 60 * 30; // 30 minutes

const eventsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_EVENT_SUCCESS': {
      return {
        ...state,
        events: action.payload.tasks,
      };
    }
    case 'CREATE_EVENT_SUCCESS': {
      return {
        ...state,
        events: [
          ...state.events,
          {
            id: action.payload.id,
            label: action.payload.label,
            duration:
              typeof action.payload.duration === 'number'
                ? action.payload.duration
                : defaultEventLength,
          },
        ],
      };
    }
    case 'UPDATE_EVENT_SUCCESS': {
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id !== action.payload.id) return event;
          return action.payload;
        }),
      };
    }
    case 'LOGOUT_SUCCESS': {
      return initialState;
    }
    default:
      return state;
  }
};

export default eventsReducer;
