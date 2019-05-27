import moment from 'moment';

const minutesInDay = moment
  .duration()
  .add(1, 'day')
  .as('minutes');

const percentageToDuration = percentage => moment.duration().add(minutesInDay * percentage, 'minutes');

const timeToPercentage = (time) => {
  const startOfDay = moment(time).startOf('day');
  return moment.duration(moment(time).diff(startOfDay)).as('minutes') / minutesInDay;
};

const durationToPercentage = duration => duration.as('minutes') / minutesInDay;

export { percentageToDuration, timeToPercentage, durationToPercentage };
