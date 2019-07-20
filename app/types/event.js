import PropTypes from 'prop-types';

const eventType = {
  id: PropTypes.number.isRequired,
  startTime: PropTypes.string,
  duration: PropTypes.number,
  label: PropTypes.string,
};

const eventDefaultProps = {
  startTime: '',
  duration: 0,
  label: '',
};

const eventsType = {
  events: PropTypes.arrayOf(PropTypes.shape(eventType)),
};

const eventsDefaultProps = {
  events: [],
};

export {
  // singular
  eventType,
  eventDefaultProps,
  // plural
  eventsType,
  eventsDefaultProps,
};
