import moment from 'moment';

export const snap = (val, click) => Math.round(val / click) * click;

// These time functions actually ceil instead of round.
export const snapTime = (time, click, clickType = 'minutes') => moment(time)
  .add(click - (moment(time).minute() % click), clickType)
  .startOf(clickType);
export const snapDuration = (duration, click, clickType = 'minutes') => duration.add(click - (duration.as(clickType) % click), clickType);
