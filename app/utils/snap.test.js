import moment from 'moment';

import { snap, snapTime, snapDuration } from './snap';

describe('snap', () => {
  it.each([[13, 5], [13, 100], [213, 100], [21.123, 10], [-102, 5]])(
    'snaps %i to the nearest %i',
    (val, snapTo) => {
      expect(snap(val, snapTo)).toMatchSnapshot();
    },
  );
});

describe('snapTime', () => {
  it.each([
    ['1907-01-04T08:38:28.000Z', 5, 'minutes'],
    ['1924-11-04T03:06:58.000Z', 1, 'hour'],
    ['1932-11-28T22:52:21.000Z', 10, 'seconds'],
    ['1939-04-24T13:24:29.000Z', 2, 'years'],
    ['1939-11-16T03:20:52.000Z', 10, 'hours'],
    ['2055-06-30T11:44:58.000Z', 7, 'minutes'],
  ])('correctly snaps %s to %i %s increments', (time, snapTo, snapType) => {
    expect(snapTime(time, snapTo, snapType).toISOString()).toMatchSnapshot();
  });
});

describe('snapDuration', () => {
  it.each([
    [11, 'minutes', 5, 'minutes'],
    [21, 'hours', 30, 'hours'],
    [382, 'minutes', 5, 'minutes'],
    [113, 'years', 5, 'year'],
  ])('snaps a moment duration of %i %s to %i %s increments', (amount, type, snapTo, snapType) => {
    expect(
      snapDuration(moment.duration().add(amount, type), snapTo, snapType).as(snapType),
    ).toMatchSnapshot();
  });
});
