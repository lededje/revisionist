import moment from 'moment';

export const clampTime = (time, past, future) => moment.max(moment.min(time, future), past);
export const clampPeriod = (time, period) => clampTime(time, moment(time).startOf(period), moment(time).endOf(period));
