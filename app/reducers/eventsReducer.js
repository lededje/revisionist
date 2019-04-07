const initialState = {
  events: [{
    id: 1,
    start: 'Sat Apr 06 2019 9:21:25 GMT+0200',
    duration: 3600,
    label: 'Lorem',
  }, {
    id: 2,
    start: 'Sat Apr 06 2019 12:21:25 GMT+0200',
    duration: 1800,
    label: 'dolor',
  }, {
    id: 2,
    start: 'Sun Apr 07 2019 12:21:25 GMT+0200',
    duration: 1800,
    label: 'amet',
  }]
};

const eventsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default: return state;
  }
};

export default eventsReducer;
