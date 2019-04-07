const createEvent = ({
  label,
  duration,
}) => ({
  type: 'CREATE_EVENT',
  label,
  duration,
});

export {
  createEvent,
}
