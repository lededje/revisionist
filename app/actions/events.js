import cuid from 'cuid';

const createEvent = ({
  label,
  duration,
}) => ({
  id: cuid(),
  type: 'CREATE_EVENT',
  label,
  duration,
});

export {
  createEvent,
};
