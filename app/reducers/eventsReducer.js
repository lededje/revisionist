const initialState = {
  events: [{
    id: 1,
    startTime: 'Mon Apr 08 2019 9:21:25 GMT+0200',
    duration: 3600,
    label: 'Lorem',
  }, {
    id: 2,
    startTime: 'Wed Apr 10 2019 21:00:25 GMT+0200',
    duration: 1800,
    label: 'dolor',
  }, {
    id: 3,
    startTime: 'Tue Apr 09 2019 12:21:25 GMT+0200',
    duration: 1800,
    label: 'amet',
  }, {
    id: 4,
    startTime: 'Thur Apr 11 2019 12:21:25 GMT+0200',
    duration: 7200,
    label: 'amet',
  }, {
    id: 4,
    duration: 7200,
    label: 'amet',
  }]
};

const eventsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CREATE_EVENT': {
      return {
        ...state,
        events: [
          ...state.events,
          {
            label: action.label,
            duration: action.duration,
          },
        ],
      };
    }
    default: return state;
  }
};

export default eventsReducer;
