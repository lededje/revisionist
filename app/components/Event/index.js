import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import stringToMaterialColor from '../../utils/stringToMaterialColor';

import styles from './styles.css';

const durationToHumanReadable = (duration) => {
  const momentDuration = moment.duration().add(duration, 'seconds');

  let string = '';

  if(momentDuration.get('hours') >= 1) {
    string += `${momentDuration.get('hours')} hr `
  }

  if(momentDuration.get('minutes') > 0) {
    string += `${momentDuration.get('minutes')} `
    if(momentDuration.get('hours') === 0) {
      string += 'm'
    }
  }


  return string.trim();
}

const Event = ({ label, className, startTime, duration }) => (
  <div className={classNames(styles.event, className)} style={stringToMaterialColor(label).style}>
    {label}
    {startTime || duration ? <div className={styles.time}>{ moment(startTime).format('H:mm A') } ({durationToHumanReadable(duration)})</div> : null}
  </div>
)

export default Event;
