import omit from 'lodash/omit';

const initialState = {
  events: [
    {
      id: 'cjld2cjxh0000qzrmn831i7rn',
      startTime: '2019-05-05T07:21:25.000Z',
      duration: 3600,
      label: 'Lorem',
    },
    {
      id: 'cjld2cjxh0000qzrmn831i7r3',
      startTime: '2019-04-21T08:20:25.000Z',
      duration: 1800,
      label: 'dolor',
    },
    {
      id: 'cjld2cjxh0000qzrmn8317r22',
      startTime: '2019-04-25T12:21:25.000Z',
      duration: 1800,
      label: 'amet',
    },
    {
      id: 'cjld2cjxh0000qzrmn831i7rv',
      startTime: '2019-04-26T12:21:25.000Z',
      duration: 7200,
      label: 'amet',
    },
    {
      id: 'cjld2cjxh0000qzrmn83137rn',
      duration: 7200,
      label: 'amet',
    },
  ],
};

const defaultEventLength = 60 * 30; // 30 minutes

const eventsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CREATE_EVENT': {
      return {
        ...state,
        events: [
          ...state.events,
          {
            id: action.id,
            label: action.label,
            duration: typeof action.duration === 'number' ? action.duration : defaultEventLength,
          },
        ],
      };
    }
    case 'UPDATE_EVENT': {
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id !== action.id) return event;
          return {
            ...event,
            ...omit(action, 'type'),
          };
        }),
      };
    }
    default:
      return state;
  }
};

export default eventsReducer;
