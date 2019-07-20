const getEvents = () => ({
  type: 'GET_EVENT',
  endpoint: '/api/task',
});

const createEvent = ({ label, duration }) => ({
  type: 'CREATE_EVENT',
  endpoint: '/api/task',
  options: {
    method: 'POST',
    body: {
      label,
      duration,
      startTime: null,
    },
  },
});

const updateEvent = ({
  id, label, duration, startTime,
}) => ({
  type: 'UPDATE_EVENT',
  endpoint: '/api/task',
  options: {
    method: 'PATCH',
    body: {
      id,
      label,
      duration,
      startTime,
    },
  },
});

export { createEvent, updateEvent, getEvents };
