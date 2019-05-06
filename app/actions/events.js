import cuid from 'cuid';

const createEvent = ({ label, duration }) => ({
  id: cuid(),
  type: 'CREATE_EVENT',
  label,
  duration,
});

const updateEvent = ({
  id, label, duration, startTime,
}) => ({
  type: 'UPDATE_EVENT',
  id,
  label,
  duration,
  startTime,
});

export { createEvent, updateEvent };
