import moment from 'moment';

const durationToHumanReadable = (duration) => {
  const momentDuration = moment.duration().add(duration, 'seconds');

  let string = '';

  if (momentDuration.get('hours') >= 1) {
    string += `${momentDuration.get('hours')} hr `;
  }

  if (momentDuration.get('minutes') > 0) {
    string += `${momentDuration.get('minutes')} m`;
  }

  return string.trim();
};

export default durationToHumanReadable;
