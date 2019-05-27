import { clampPeriod } from './clamp';

describe('clampPeriod', () => {
  it.each([
    ['2019-05-27T15:21:59+01:00', 'day'],
    ['2019-05-27T15:21:59+01:00', 'year'],
    ['2019-05-27T15:21:59+01:00', 'hour'],
    ['2019-05-27T15:21:59+01:00', 'minute'],
  ])('clamps date %s to increment %s', (date, period) => {
    expect(clampPeriod(date, period)).toMatchSnapshot();
  });
});
